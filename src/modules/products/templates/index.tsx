import React, { Suspense } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductActionsWrapper from "./product-actions-wrapper"

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

  return (
    <>
      <div className="content-container py-6 md:py-10" data-testid="product-container">
        <div className="flex flex-col md:flex-row md:items-start gap-6 lg:gap-10">
          {/* Галерея слева */}
          <div className="md:flex-1 md:min-w-0">
            <ImageGallery images={images} />
          </div>

          {/* Описание справа — sticky */}
          <div className="md:w-[380px] lg:w-[430px] flex-shrink-0 md:sticky md:top-[calc(var(--header-h,60px)+var(--notif-h,32px)+16px)] md:max-h-[calc(100vh-120px)] md:overflow-y-auto no-scrollbar">
            <Suspense
              fallback={
                <ProductActions disabled={true} product={product} region={region} />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <div className="mt-8">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Похожие товары */}
      <div className="content-container my-12 md:my-20" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
