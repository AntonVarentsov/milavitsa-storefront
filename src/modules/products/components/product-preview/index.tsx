import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import WishlistButton from "./wishlist-button"
import ProductPreviewImage from "./image"

type ColorSwatch = { code: string; name: string; hex: string }

/**
 * Базовая палитра — fallback, если в catalog-images-map.json нет hex.
 * Ключи нормализованы (lower + collapse whitespace).
 */
const FALLBACK_COLORS: Record<string, string> = {
  "чёрный": "#1a1a1a",
  "черный": "#1a1a1a",
  "белый": "#f5f5f5",
  "приглушенно-белый": "#f5f0e8",
  "нюд": "#e8c4a0",
  "пудровый": "#f0c4bf",
  "пудра": "#f0c4bf",
  "пастель": "#f5e6d6",
  "голубой": "#a8cfe0",
  "зелёный": "#a8c8a0",
  "зеленый": "#a8c8a0",
  "бежевый": "#e8ddd0",
  "бежевый нюд": "#dfc8a8",
  "кобальт": "#2a3d8f",
  "конфитюр": "#9a3a55",
  "красный": "#c8281d",
  "розовый": "#f0a4b8",
  "серый": "#9a9a9a",
  "графит": "#3a3a3a",
  "синий": "#2c4a8a",
  "коричневый": "#7a4a30",
  "шоколад": "#5a3825",
  "слоновая кость": "#f0e8d8",
  "молочный": "#f5ece0",
  "капучино": "#c9a78a",
  "карамель": "#c89060",
  "мокко": "#8a5a40",
  "лаванда": "#b8a8d8",
  "сирень": "#c8b0d8",
  "мятный": "#a8d8c8",
  "оливковый": "#7a8050",
  "хаки": "#8a7a4a",
  "бордо": "#6a1a25",
  "фуксия": "#c8208a",
}

const MAX_VISIBLE_SWATCHES = 5

function isInStock(v: HttpTypes.StoreProductVariant): boolean {
  if (!v.manage_inventory) return true
  if (v.allow_backorder) return true
  return (v.inventory_quantity ?? 0) > 0
}

/**
 * Извлекает colorCode из SKU вида `{article}-{colorCode}-{size}`.
 * Возвращает undefined если формат не подошёл (старые продукты, ручные SKU и т.п.).
 */
function colorCodeFromSku(sku: string | null | undefined): string | undefined {
  if (!sku) return undefined
  const parts = sku.split("-")
  if (parts.length < 3) return undefined
  return parts[1]
}

/**
 * Для заданного code возвращает variant_id — приоритет: первый in-stock,
 * иначе первый вообще. undefined если у цвета нет вариантов.
 */
function variantIdByColorCode(
  product: HttpTypes.StoreProduct,
  code: string
): string | undefined {
  const sameColor = (product.variants ?? []).filter(
    (v) => colorCodeFromSku(v.sku) === code
  )
  if (sameColor.length === 0) return undefined
  return (sameColor.find(isInStock) ?? sameColor[0]).id
}

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

  const swatches =
    ((product.metadata as Record<string, unknown> | null)
      ?.color_swatches as ColorSwatch[] | undefined) ?? []

  // Дефолтный variant_id: первый цвет swatches с in-stock; иначе первый цвет
  const defaultVariantId = (() => {
    if (swatches.length > 0) {
      for (const sw of swatches) {
        const id = variantIdByColorCode(product, sw.code)
        if (id) {
          const v = product.variants?.find((x) => x.id === id)
          if (v && isInStock(v)) return id
        }
      }
      return variantIdByColorCode(product, swatches[0].code)
    }
    return product.variants?.[0]?.id
  })()

  // Главное превью — без variant.images (их не запрашиваем на PLP, чтобы payload был лёгкий).
  // Используем product.thumbnail / product.images.
  const allImages = [
    ...(product.thumbnail ? [product.thumbnail] : []),
    ...(product.images?.map((img) => img.url).filter(Boolean) ?? []),
  ]
  const images = Array.from(new Set(allImages)) as string[]

  const defaultHref = defaultVariantId
    ? `/products/${product.handle}?v_id=${defaultVariantId}`
    : `/products/${product.handle}`

  const visibleSwatches = swatches.slice(0, MAX_VISIBLE_SWATCHES)
  const hiddenCount = Math.max(0, swatches.length - MAX_VISIBLE_SWATCHES)

  return (
    <div className="group block" data-testid="product-wrapper">
      <LocalizedClientLink href={defaultHref} className="block">
        <div className="relative">
          <ProductPreviewImage
            images={images}
            title={product.title ?? ""}
            sizes="(max-width: 760px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <WishlistButton productId={product.id!} />

          {isFeatured && (
            <span className="absolute bottom-2.5 left-2.5 badge-gold">
              Новинка
            </span>
          )}
        </div>

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

      {/* Ряд цветных свотчей под ценой (только если цветов больше одного) */}
      {swatches.length > 1 && (
        <div
          className="flex items-center gap-1.5 pt-1 pb-2"
          data-testid="product-color-swatches"
        >
          {visibleSwatches.map((sw) => {
            const vid = variantIdByColorCode(product, sw.code)
            const href = vid
              ? `/products/${product.handle}?v_id=${vid}`
              : `/products/${product.handle}`
            const bg =
              (sw.hex && sw.hex.startsWith("#") && sw.hex) ||
              FALLBACK_COLORS[sw.name.toLowerCase().replace(/\s+/g, " ").trim()] ||
              "#ccc"
            return (
              <LocalizedClientLink
                key={sw.code}
                href={href}
                title={sw.name}
                aria-label={`Цвет: ${sw.name}`}
                className="w-4 h-4 rounded-full border border-ink-25 hover:border-brand-red transition-colors"
                style={{ backgroundColor: bg }}
              />
            )
          })}
          {hiddenCount > 0 && (
            <span className="text-2xs text-ink-50 ml-1">+{hiddenCount}</span>
          )}
        </div>
      )}
    </div>
  )
}
