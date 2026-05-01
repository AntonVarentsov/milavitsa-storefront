import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}

export const getCategoryPath = async (categoryId: string): Promise<string> => {
  return sdk.client
    .fetch<{ product_categories: Array<any> }>(
      `/store/product-categories`,
      {
        query: {
          id: categoryId,
          fields: "handle,parent_category.handle,parent_category.parent_category.handle,parent_category.parent_category.parent_category.handle",
        },
      }
    )
    .then(({ product_categories }) => {
      const cat = product_categories[0]
      if (!cat) return ""

      const parts: string[] = []
      const buildPath = (c: any) => {
        if (c.parent_category) buildPath(c.parent_category)
        parts.push(c.handle)
      }
      buildPath(cat)
      return parts.join("/")
    })
    .catch(() => "")
}

export const getCategorySeoByHandle = async (handle: string) => {
  return sdk.client
    .fetch<{ seo: Record<string, string | boolean | null> | null }>(
      `/store/categories/seo?handle=${encodeURIComponent(handle)}`
    )
    .catch(() => ({ seo: null }))
}
