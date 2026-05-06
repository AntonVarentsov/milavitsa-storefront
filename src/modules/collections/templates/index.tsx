import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="catalog-container py-10">
      <div className="mb-8">
        <h1 className="text-lg uppercase tracking-wide font-bold">
          {collection.title}
        </h1>
      </div>

      <Suspense
        fallback={
          <SkeletonProductGrid
            numberOfProducts={collection.products?.length}
          />
        }
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          collectionId={collection.id}
          countryCode={countryCode}
        />
      </Suspense>
    </div>
  )
}
