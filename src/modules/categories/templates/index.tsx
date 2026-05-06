import { notFound } from "next/navigation"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { ChevronRight } from "lucide-react"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }
  getParents(category)

  const totalProducts = category.products?.length ?? 0

  return (
    <div className="catalog-container py-10" data-testid="category-container">
      {/* Breadcrumbs */}
      {parents.length > 0 && (
        <nav className="flex items-center gap-1 mb-4 text-2xs text-ink-50">
          <LocalizedClientLink href="/" className="hover:text-brand-red transition-colors">
            Главная
          </LocalizedClientLink>
          {parents.reverse().map((parent) => (
            <span key={parent.id} className="flex items-center gap-1">
              <ChevronRight size={10} />
              <LocalizedClientLink
                href={`/categories/${parent.handle}`}
                className="hover:text-brand-red transition-colors"
              >
                {parent.name}
              </LocalizedClientLink>
            </span>
          ))}
          <ChevronRight size={10} />
          <span className="text-ink">{category.name}</span>
        </nav>
      )}

      {/* Заголовок */}
      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="text-lg uppercase tracking-wide font-bold" data-testid="category-page-title">
          {category.name}
        </h1>
        {totalProducts > 0 && (
          <span className="text-sm text-ink-50">({totalProducts})</span>
        )}
      </div>

      {/* Описание */}
      {category.description && (
        <p className="mb-6 text-sm text-ink-50 max-w-2xl">{category.description}</p>
      )}

      {/* Подкатегории */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {category.category_children.map((c) => (
            <LocalizedClientLink
              key={c.id}
              href={`/categories/${c.handle}`}
              className="btn-secondary text-2xs py-1.5 px-4"
            >
              {c.name}
            </LocalizedClientLink>
          ))}
        </div>
      )}

      <Suspense
        fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
        />
      </Suspense>
    </div>
  )
}
