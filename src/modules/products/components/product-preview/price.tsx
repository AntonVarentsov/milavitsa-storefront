import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  return (
    <div className="flex items-center gap-1.5">
      {price.price_type === "sale" && (
        <span
          className="text-2xs text-ink-50 line-through"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className={`text-2xs font-bold ${price.price_type === "sale" ? "text-feedback-error" : "text-ink"}`}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </div>
  )
}
