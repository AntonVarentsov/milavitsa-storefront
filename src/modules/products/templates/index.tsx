import React, { Suspense } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductActionsWrapper from "./product-actions-wrapper"
import { ChevronRight } from "lucide-react"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) return notFound()

  // Берём первую категорию для хлебных крошек
  const category = product.categories?.[0]

  return (
    <>
      <div data-testid="product-container">
        {/* Хлебные крошки */}
        <nav className="catalog-container pt-5 pb-3 flex items-center gap-1 text-2xs text-ink-50">
          <LocalizedClientLink href="/" className="hover:text-brand-red transition-colors">
            Главная
          </LocalizedClientLink>
          {category && (
            <>
              <ChevronRight size={10} />
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
                className="hover:text-brand-red transition-colors"
              >
                {category.name}
              </LocalizedClientLink>
            </>
          )}
          <ChevronRight size={10} />
          <span className="text-ink truncate max-w-[280px]">{product.title}</span>
        </nav>

        {/* 3-колоночная сетка: фото1 | фото2 | инфо */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_1fr_380px] lg:grid-cols-[1fr_1fr_440px]">
          {/* Галерея — занимает 2 колонки */}
          <div className="md:col-span-2">
            <ImageGallery images={images} />
          </div>

          {/* Правая панель — sticky */}
          <div className="px-8 py-10 md:sticky md:top-[var(--nav-height,92px)] md:self-start md:max-h-[calc(100svh-var(--nav-height,92px))] md:overflow-y-auto no-scrollbar">
            <Suspense
              fallback={
                <ProductActions disabled={true} product={product} region={region} />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <div className="mt-10">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Похожие товары */}
      <div className="catalog-container my-12 md:my-20" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
