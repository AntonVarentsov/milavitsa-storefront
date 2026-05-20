import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts, getProductSeoByHandle } from "@lib/data/products"
import { PDP_PRODUCT_FIELDS } from "@lib/data/product-fields"
import { getRegion, listRegions } from "@lib/data/regions"
import { getCategoryPath } from "@lib/data/categories"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

// ISR: страница продукта перевалидируется не реже раза в час.
// Точечная инвалидация — через POST /api/revalidate (см. revalidate/route.ts).
export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

/**
 * Подбирает дефолтный вариант продукта, когда пользователь зашёл на PDP без `?v_id`.
 * Логика: первый цвет (в порядке product.options.values), у которого есть
 * хотя бы один in-stock размер. Если все варианты out-of-stock — берём первый.
 */
function pickDefaultVariantId(
  product: HttpTypes.StoreProduct
): string | undefined {
  const variants = product.variants ?? []
  if (variants.length === 0) return undefined

  const colorOption = (product.options ?? []).find(
    (o) => (o.title ?? "").toLowerCase() === "цвет" || (o.title ?? "").toLowerCase() === "color"
  )
  const colorOrder = colorOption
    ? (colorOption.values ?? []).map((v) => v.value)
    : []

  const isInStock = (v: HttpTypes.StoreProductVariant): boolean => {
    if (!v.manage_inventory) return true
    if (v.allow_backorder) return true
    return (v.inventory_quantity ?? 0) > 0
  }

  const colorOfVariant = (v: HttpTypes.StoreProductVariant): string | undefined =>
    (v.options ?? []).find(
      (o) =>
        (o as { option?: { title?: string } }).option?.title?.toLowerCase() === "цвет" ||
        (o as { option?: { title?: string } }).option?.title?.toLowerCase() === "color"
    )?.value

  // Идём по цветам в порядке option values
  if (colorOrder.length > 0) {
    for (const colorName of colorOrder) {
      const sameColor = variants.filter((v) => colorOfVariant(v) === colorName)
      const inStock = sameColor.find(isInStock)
      if (inStock) return inStock.id
    }
  }

  // Fallback: первый in-stock variant, иначе первый вообще
  return (variants.find(isInStock) ?? variants[0]).id
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!product.variants) {
    return product.images
  }

  const variantId = selectedVariantId ?? pickDefaultVariantId(product)
  if (!variantId) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === variantId)
  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images!.filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle, countryCode } = params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://milavitsa.store"

  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const [{ response }, { seo }] = await Promise.all([
    listProducts({
      countryCode,
      queryParams: { handle, fields: PDP_PRODUCT_FIELDS },
    }),
    getProductSeoByHandle(handle),
  ])

  const product = response.products[0]

  if (!product) {
    notFound()
  }

  let canonical = (seo?.canonical_url as string) || undefined
  if (!canonical && seo?.main_category_id) {
    const categoryPath = await getCategoryPath(seo.main_category_id as string)
    canonical = categoryPath
      ? `${baseUrl}/${countryCode}/categories/${categoryPath}/products/${handle}`
      : `${baseUrl}/${countryCode}/products/${handle}`
  }
  if (!canonical) {
    canonical = `${baseUrl}/${countryCode}/products/${handle}`
  }

  return {
    title: (seo?.seo_title as string) || `${product.title} | Милавица`,
    description:
      (seo?.seo_description as string) ||
      product.description ||
      product.title,
    keywords: (seo?.seo_keywords as string) || undefined,
    robots: seo?.no_index
      ? "noindex,nofollow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    alternates: { canonical },
    openGraph: {
      title: (seo?.og_title as string) || product.title,
      description:
        (seo?.og_description as string) ||
        product.description ||
        product.title,
      url: canonical,
      type: "website",
      images: seo?.og_image
        ? [{ url: seo.og_image as string }]
        : product.thumbnail
          ? [{ url: product.thumbnail }]
          : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle, fields: PDP_PRODUCT_FIELDS },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
      images={images}
    />
  )
}
