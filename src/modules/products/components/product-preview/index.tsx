import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import WishlistButton from "./wishlist-button"
import ProductPreviewImage from "./image"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  // Собираем все уникальные изображения: thumbnail первым, потом остальные
  const allImages = [
    ...(product.thumbnail ? [product.thumbnail] : []),
    ...(product.images?.map((img) => img.url).filter(Boolean) ?? []),
  ]
  const images = [...new Set(allImages)] as string[]

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
      data-testid="product-wrapper"
    >
      {/* Image container */}
      <div className="relative">
        <ProductPreviewImage
          images={images}
          title={product.title ?? ""}
          sizes="(max-width: 760px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Кнопка «Избранное» */}
        <WishlistButton />

        {/* Бейдж новинка */}
        {isFeatured && (
          <span className="absolute bottom-2.5 left-2.5 badge-gold">
            Новинка
          </span>
        )}
      </div>

      {/* Info */}
      <div className="pt-2.5 pb-1">
        <p
          className="text-2xs uppercase tracking-wide text-ink truncate mb-1"
          data-testid="product-title"
        >
          {product.title}
        </p>
        {cheapestPrice && (
          <div className="flex items-center gap-1">
            <PreviewPrice price={cheapestPrice} />
          </div>
        )}
      </div>
    </LocalizedClientLink>
  )
}
