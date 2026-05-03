import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!products || products.length === 0) return null

  return (
    <div className="content-container py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-lg uppercase tracking-wide font-bold">{collection.title}</h2>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="text-2xs uppercase tracking-wide text-ink-50 hover:text-brand-red transition-colors border-b border-ink-25 pb-0.5"
        >
          Смотреть все
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-2.5 gap-y-8">
        {products.slice(0, 4).map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
