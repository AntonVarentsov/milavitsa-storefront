"use client"

import { Heart } from "lucide-react"

export default function WishlistButton() {
  return (
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
  )
}
