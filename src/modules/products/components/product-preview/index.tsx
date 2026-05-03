import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { Heart } from "lucide-react"
import PreviewPrice from "./price"

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

  const thumbnail = product.thumbnail || product.images?.[0]?.url

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
      data-testid="product-wrapper"
    >
      {/* Image container 2:3 */}
      <div className="relative aspect-product overflow-hidden bg-surface-silk">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={product.title ?? ""}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 760px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={75}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-silk">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink-25">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Кнопка «Избранное» */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-white"
          aria-label="Добавить в избранное"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={14} strokeWidth={1.5} className="text-ink" />
        </button>

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
