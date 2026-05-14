"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@lib/hooks/use-wishlist"

type Props = { productId: string }

export default function WishlistButton({ productId }: Props) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(productId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await toggleWishlist(productId)
  }

  return (
    <button
      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                 flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 hover:bg-white"
      aria-label={inWishlist ? "Убрать из избранного" : "Добавить в избранное"}
      onClick={handleClick}
    >
      <Heart
        size={14}
        strokeWidth={1.5}
        className={inWishlist ? "text-brand-red fill-brand-red" : "text-ink"}
      />
    </button>
  )
}
