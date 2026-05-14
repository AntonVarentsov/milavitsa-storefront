"use client"

import { HttpTypes } from "@medusajs/types"
import { useWishlist } from "@lib/hooks/use-wishlist"
import type { WishlistItemData } from "@lib/data/wishlist"

type Props = {
  customer: HttpTypes.StoreCustomer | null
  serverWishlistItems: WishlistItemData[]
}

export default function WishlistTemplate({ customer, serverWishlistItems }: Props) {
  const { wishlist, removeFromWishlist } = useWishlist()

  // Для авторизованных — серверные данные, для гостей — localStorage
  const productIds = customer
    ? serverWishlistItems.map((i) => i.product_id)
    : wishlist

  return (
    <div className="content-container py-12">
      <h1 className="text-2xl font-medium mb-8">Избранное</h1>

      {productIds.length === 0 ? (
        <div className="text-center py-16 text-ink-50">
          <p>В избранном пока ничего нет</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-ink-50 mb-6">
            {productIds.length}{" "}
            {productIds.length === 1 ? "товар" : "товара"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productIds.map((productId) => (
              <WishlistProductCard
                key={productId}
                productId={productId}
                onRemove={() => removeFromWishlist(productId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WishlistProductCard({
  productId,
  onRemove,
}: {
  productId: string
  onRemove: () => void
}) {
  return (
    <div className="relative border border-ink-10 rounded p-4">
      <p className="text-xs text-ink-50 font-mono truncate mb-2">{productId}</p>
      <button
        onClick={onRemove}
        className="text-xs text-brand-red hover:underline"
      >
        Удалить
      </button>
    </div>
  )
}
