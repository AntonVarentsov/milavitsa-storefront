import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="content-container py-10" data-testid="category-container">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-lg uppercase tracking-wide font-bold" data-testid="store-page-title">
          Все товары
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        {/* Фильтры (сбоку на десктопе) */}
        <div className="md:min-w-[220px] md:sticky md:top-[calc(var(--header-h)+var(--notif-h)+16px)]">
          <RefinementList sortBy={sort} />
        </div>

        {/* Сетка товаров */}
        <div className="flex-1">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
