import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections, getCollectionSeoByHandle } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://milavitsa.store"

  const [collection, { seo }] = await Promise.all([
    getCollectionByHandle(params.handle),
    getCollectionSeoByHandle(params.handle),
  ])

  if (!collection) {
    notFound()
  }

  const canonical =
    (seo?.canonical_url as string) ||
    `${baseUrl}/${params.countryCode}/collections/${params.handle}`

  return {
    title: (seo?.seo_title as string) || `${collection.title} | Милавица`,
    description:
      (seo?.seo_description as string) ||
      collection.description ||
      `${collection.title} коллекция`,
    keywords: (seo?.seo_keywords as string) || undefined,
    robots: seo?.no_index
      ? "noindex,nofollow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    alternates: { canonical },
    openGraph: {
      title: (seo?.og_title as string) || collection.title,
      description:
        (seo?.og_description as string) ||
        collection.description ||
        collection.title,
      url: canonical,
      type: "website",
      images: seo?.og_image
        ? [{ url: seo.og_image as string }]
        : [],
    },
  } as Metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
