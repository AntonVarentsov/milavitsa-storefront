import { Metadata } from "next"
import { Suspense } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import RefinementList from "@modules/store/components/refinement-list"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

type Params = {
  searchParams: Promise<{
    q?: string
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export async function generateMetadata({
  searchParams,
}: Params): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Поиск: "${q}" | Milavitsa` : "Поиск | Milavitsa",
  }
}

export default async function SearchPage({ params, searchParams }: Params) {
  const { countryCode } = await params
  const { q, sortBy, page } = await searchParams
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="catalog-container py-10" data-testid="search-container">
      <div className="mb-8">
        <h1
          className="text-lg uppercase tracking-wide font-bold"
          data-testid="search-page-title"
        >
          {q ? `Результаты поиска: «${q}»` : "Поиск"}
        </h1>
      </div>

      <RefinementList
        sortBy={sort}
        data-testid="sort-by-container"
      />

      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          countryCode={countryCode}
          q={q}
        />
      </Suspense>
    </div>
  )
}
