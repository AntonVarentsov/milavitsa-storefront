"use client"

import { getRecentlyViewed, type RecentlyViewedItem } from "@lib/hooks/use-recently-viewed"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function RecentlyViewedSection() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([])

  useEffect(() => {
    setItems(getRecentlyViewed())
  }, [])

  if (!items.length) return null

  return (
    <section className="mt-16 border-t border-ink-10 pt-10">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
        Вы недавно смотрели
      </h2>
      <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 large:grid-cols-5 gap-x-4 gap-y-8">
        {items.map((item) => (
          <LocalizedClientLink
            key={item.handle}
            href={`/products/${item.handle}`}
            className="group block"
          >
            <div className="aspect-product overflow-hidden bg-surface-silk relative">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-surface-cream" />
              )}
            </div>
            <p className="mt-2 text-2xs uppercase tracking-wide text-ink truncate group-hover:text-brand-red transition-colors">
              {item.title}
            </p>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
