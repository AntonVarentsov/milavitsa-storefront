import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories, getCategorySeoByHandle } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://milavitsa.store"
  const categoryHandle = params.category.join("/")

  try {
    const [productCategory, { seo }] = await Promise.all([
      getCategoryByHandle(params.category),
      getCategorySeoByHandle(categoryHandle),
    ])

    const canonical =
      (seo?.canonical_url as string) ||
      `${baseUrl}/${params.countryCode}/categories/${categoryHandle}`

    return {
      title:
        (seo?.seo_title as string) ||
        `${productCategory.name} | Милавица`,
      description:
        (seo?.seo_description as string) ||
        productCategory.description ||
        `${productCategory.name} категория`,
      keywords: (seo?.seo_keywords as string) || undefined,
      robots: seo?.no_index
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      alternates: { canonical },
      openGraph: {
        title:
          (seo?.og_title as string) || productCategory.name,
        description:
          (seo?.og_description as string) ||
          productCategory.description ||
          productCategory.name,
        url: canonical,
        type: "website",
        images: seo?.og_image
          ? [{ url: seo.og_image as string }]
          : [],
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
