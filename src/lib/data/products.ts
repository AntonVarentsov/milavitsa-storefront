"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  // Если regionId уже известен, не дёргаем регион-эндпоинт повторно.
  let resolvedRegionId = regionId
  if (!resolvedRegionId && countryCode) {
    const region = await getRegion(countryCode)
    if (!region) {
      return {
        response: { products: [], count: 0 },
        nextPage: null,
      }
    }
    resolvedRegionId = region.id
  }

  if (!resolvedRegionId) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const userCacheOptions = await getCacheOptions("products")
  const next = {
    tags: [
      "products",
      ...("tags" in userCacheOptions ? userCacheOptions.tags : []),
    ],
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: resolvedRegionId,
          // Лёгкий дефолтный набор полей — оптимизирован под листинги (PLP, home, related).
          // PDP перекрывает их через queryParams.fields = PDP_PRODUCT_FIELDS.
          // ВАЖНО: используем только relation-expansion (`*foo`) и `+hidden`, не указываем
          // явных скалярных полей (`id,handle,title`) — иначе Medusa переключается в режим
          // «вернуть ТОЛЬКО перечисленное», и базовые скаляры/values отрезаются.
          // sku варианта приходит по дефолту вместе с *variants.calculated_price.
          // metadata — color_swatches на карточке; inventory_quantity — isInStock.
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,",
          ...queryParams,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

export const listProductTypes = async (): Promise<
  { id: string; value: string }[]
> => {
  return sdk.client
    .fetch<{ product_types: { id: string; value: string }[] }>(
      "/store/product-types",
      {
        method: "GET",
        next: { tags: ["product-types"] },
        cache: "force-cache",
      }
    )
    .then(({ product_types }) => product_types ?? [])
    .catch(() => [])
}

export const listProductTypeIdsForCategory = async (
  categoryId: string,
  countryCode: string
): Promise<string[]> => {
  const result = await listProducts({
    pageParam: 1,
    queryParams: {
      category_id: [categoryId],
      fields: "type_id",
      limit: 500,
    },
    countryCode,
  }).catch(() => null)

  if (!result) return []

  return [
    ...new Set(
      result.response.products
        .map((p) => p.type_id)
        .filter(Boolean) as string[]
    ),
  ]
}

export const getProductSeoByHandle = async (handle: string) => {
  return sdk.client
    .fetch<{ seo: Record<string, string | boolean | null> | null }>(
      `/store/products/seo?handle=${encodeURIComponent(handle)}`
    )
    .catch(() => ({ seo: null }))
}

/**
 * Быстрый путь для sortBy=created_at: фильтрация и сортировка делегируются бэку,
 * limit=12, страница приходит ровно той же, что и отображается.
 * Для price_asc/price_desc Medusa Store API не поддерживает сортировку по
 * variants.calculated_price.amount через ?order — используем fallback: тянем
 * до 100 товаров одной страницей, сортируем в памяти, режем slice.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
  regionId,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12
  const _page = Math.max(page, 1)

  const needsInMemorySort = sortBy === "price_asc" || sortBy === "price_desc"

  if (!needsInMemorySort) {
    // Быстрый путь: серверный order, серверный offset/limit
    const order = sortBy === "created_at" ? "-created_at" : undefined

    const {
      response: { products, count },
    } = await listProducts({
      pageParam: _page,
      queryParams: {
        ...queryParams,
        limit,
        ...(order ? { order } : {}),
      },
      countryCode,
      regionId,
    })

    const offset = (_page - 1) * limit
    const nextPage = count > offset + limit ? _page + 1 : null

    return {
      response: { products, count },
      nextPage,
      queryParams,
    }
  }

  // Fallback для сортировки по цене: тянем до 100 товаров, сортируем в памяти.
  // Это медленнее, но Medusa Store API не сортирует по calculated_price.
  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
    regionId,
  })

  const sortedProducts = sortProducts(products, sortBy)
  const offset = (_page - 1) * limit
  const nextPage = count > offset + limit ? _page + 1 : null
  const paginatedProducts = sortedProducts.slice(offset, offset + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
