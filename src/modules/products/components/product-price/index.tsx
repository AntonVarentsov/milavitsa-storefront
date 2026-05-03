import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="w-32 h-8 bg-surface-silk animate-pulse" />
  }

  return (
    <div className="flex items-baseline gap-3">
      <span
        className={`text-xl font-bold ${selectedPrice.price_type === "sale" ? "text-feedback-error" : "text-ink"}`}
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && "от "}
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <span
            className="text-sm text-ink-50 line-through"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="text-xs text-feedback-error font-bold">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
