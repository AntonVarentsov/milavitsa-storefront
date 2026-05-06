"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

interface ProductPreviewImageProps {
  images: string[]
  title: string
  sizes: string
}

export default function ProductPreviewImage({
  images,
  title,
  sizes,
}: ProductPreviewImageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultiple = images.length > 1
  const rafRef = useRef<number | null>(null)
  const pendingIndex = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasMultiple) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const index = Math.min(
        Math.floor((x / rect.width) * images.length),
        images.length - 1
      )
      pendingIndex.current = index
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        setActiveIndex(pendingIndex.current)
        rafRef.current = null
      })
    },
    [hasMultiple, images.length]
  )

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    setActiveIndex(0)
  }

  if (images.length === 0) {
    return (
      <div className="relative aspect-product overflow-hidden bg-surface-silk">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink-25"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>
    )
  }

  const translateX = -(activeIndex * (100 / images.length))

  return (
    <div
      className="relative aspect-product overflow-hidden bg-surface-silk"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Горизонтальный трек: сдвигается влево/вправо по индексу */}
      <div
        className="flex h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(${translateX}%)`,
          transition: "transform 700ms cubic-bezier(0.25, 0, 0.35, 1)",
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-full flex-shrink-0"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={src}
              alt={i === 0 ? title : `${title} — фото ${i + 1}`}
              fill
              className="object-cover object-center"
              sizes={sizes}
              priority={i === 0}
              quality={75}
            />
          </div>
        ))}
      </div>

      {/* Полоски — сколько фото и где сейчас */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-2 right-2 flex gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {images.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-[2px] transition-colors duration-150 ${
                i === activeIndex ? "bg-white" : "bg-white/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
