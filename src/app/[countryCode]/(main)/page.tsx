import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import PromotionBanner from "@modules/home/components/promotion-banner"
import CollectionBanners from "@modules/home/components/collection-banners"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { featuredCollectionHandles } from "@lib/data/home-content"

export const metadata: Metadata = {
  title: "Milavitsa — нижнее бельё с 1908 года",
  description:
    "Официальный интернет-магазин Milavitsa. Женское нижнее бельё, купальники и одежда для дома.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const featuredCollections = collections.filter((c) =>
    featuredCollectionHandles.includes(c.handle ?? "")
  )

  return (
    <>
      <Hero />
      <PromotionBanner />
      <div className="py-8">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={featuredCollections.length > 0 ? featuredCollections : collections.slice(0, 3)} region={region} />
        </ul>
      </div>
      <CollectionBanners />
    </>
  )
}
