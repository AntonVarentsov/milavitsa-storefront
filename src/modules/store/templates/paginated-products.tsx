import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  type_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  typeId,
  productsIds,
  countryCode,
  q,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  typeId?: string
  productsIds?: string[]
  countryCode: string
  q?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (typeId) {
    queryParams["type_id"] = [typeId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    regionId: region.id,
    q,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (q && products.length === 0) {
    return (
      <p className="py-12 text-center text-ink-50 text-sm">
        По запросу «{q}» ничего не найдено
      </p>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full md:grid-cols-4 gap-x-3 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
