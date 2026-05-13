"use client"

import { swapLineItemVariant, updateLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ChevronDown, Minus, Plus } from "lucide-react"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const isSize = (title?: string | null) =>
  title?.toLowerCase().includes("размер") || title?.toLowerCase() === "size"
const isColor = (title?: string | null) =>
  title?.toLowerCase().includes("цвет") || title?.toLowerCase() === "color"

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1 || updating) return
    setError(null)
    setUpdating(true)
    await updateLineItem({ lineId: item.id, quantity })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false))
  }

  const changeSize = async (newVariantId: string) => {
    if (newVariantId === item.variant_id || updating) return
    setError(null)
    setUpdating(true)
    await swapLineItemVariant({ lineId: item.id, quantity: item.quantity, variantId: newVariantId })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false))
  }

  const currentVariantOptions = item.variant?.options ?? []
  const currentColorValue = currentVariantOptions.find((o) => isColor(o.option?.title))?.value
  const currentSizeValue = currentVariantOptions.find((o) => isSize(o.option?.title))?.value

  const productVariants = (item as any).product?.variants as HttpTypes.StoreProductVariant[] | undefined

  const sizeOptions = productVariants
    ?.filter((v) => {
      if (!currentColorValue) return true
      const colorOpt = v.options?.find((o) => isColor(o.option?.title))
      return !colorOpt || colorOpt.value === currentColorValue
    })
    .map((v) => ({
      variantId: v.id ?? "",
      size: v.options?.find((o) => isSize(o.option?.title))?.value ?? v.title ?? "",
    }))
    .filter((s) => s.size && s.variantId) ?? []

  const colorLabel = currentColorValue ?? ""
  const sizeLabel = currentSizeValue ?? item.variant?.title ?? ""

  if (type === "preview") {
    return (
      <div className="flex gap-3 py-3 border-b border-ink-10 last:border-b-0">
        <LocalizedClientLink href={`/products/${item.product_handle}`} className="flex-shrink-0 w-16">
          <div className="aspect-product overflow-hidden bg-surface-silk">
            <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
          </div>
        </LocalizedClientLink>
        <div className="flex flex-1 justify-between gap-2">
          <div>
            <p className="text-2xs font-semibold uppercase text-brand-red leading-snug line-clamp-2">
              {item.product_title}
            </p>
            {sizeLabel && <p className="text-2xs text-ink-50 mt-0.5">{sizeLabel}</p>}
            <p className="text-2xs text-ink-50">{item.quantity} шт.</p>
          </div>
          <p className="text-xs font-bold whitespace-nowrap">
            {convertToLocale({ amount: (item.unit_price ?? 0) * item.quantity, currency_code: currencyCode })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-5 py-6 border-b border-ink-10 last:border-b-0" data-testid="product-row">
      {/* Image */}
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="flex-shrink-0 w-[120px] sm:w-[160px]"
      >
        <div className="aspect-product overflow-hidden bg-surface-silk">
          <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
        </div>
      </LocalizedClientLink>

      {/* Info + controls */}
      <div className="flex flex-1 justify-between gap-4 min-w-0">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <LocalizedClientLink href={`/products/${item.product_handle}`}>
            <h3 className="text-xs font-bold uppercase tracking-wide text-brand-red hover:opacity-75 transition-opacity leading-snug line-clamp-3">
              {item.product_title}
            </h3>
          </LocalizedClientLink>

          {item.variant?.sku && (
            <span className="text-2xs text-ink-50">арт. {item.variant.sku}</span>
          )}

          {colorLabel && (
            <span className="text-2xs text-ink-60 capitalize">Цвет: {colorLabel}</span>
          )}

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {/* Size selector */}
            {sizeOptions.length > 1 ? (
              <div className="relative">
                <select
                  value={item.variant_id ?? ""}
                  onChange={(e) => changeSize(e.target.value)}
                  disabled={updating}
                  className="appearance-none border border-ink-20 pl-3 pr-7 py-1 text-xs text-ink bg-white focus:outline-none focus:border-ink-40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[80px]"
                >
                  {sizeOptions.map((opt) => (
                    <option key={opt.variantId} value={opt.variantId}>
                      {opt.size}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-ink-50"
                />
              </div>
            ) : sizeLabel ? (
              <div className="border border-ink-20 px-3 py-1 text-xs text-ink min-w-[52px] text-center">
                {sizeLabel}
              </div>
            ) : null}

            {/* Quantity */}
            <div className="flex items-center border border-ink-20">
              <button
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1 || updating}
                className="w-8 h-8 flex items-center justify-center text-ink hover:text-brand-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Уменьшить количество"
              >
                <Minus size={12} strokeWidth={2} />
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-xs font-medium border-x border-ink-20">
                {updating ? "…" : item.quantity}
              </span>
              <button
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={updating}
                className="w-8 h-8 flex items-center justify-center text-ink hover:text-brand-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Увеличить количество"
              >
                <Plus size={12} strokeWidth={2} />
              </button>
            </div>
          </div>

          <DeleteButton
            id={item.id}
            className="text-2xs text-ink-50 hover:text-feedback-error transition-colors flex items-center gap-1 mt-1 w-fit"
            data-testid="product-delete-button"
          >
            Удалить
          </DeleteButton>

          {error && <p className="text-2xs text-feedback-error mt-1">{error}</p>}
        </div>

        {/* Line total */}
        <div className="flex-shrink-0 text-right">
          <span className="text-sm font-bold text-ink">
            {convertToLocale({ amount: (item.unit_price ?? 0) * item.quantity, currency_code: currencyCode })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Item
