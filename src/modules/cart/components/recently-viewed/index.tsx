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
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
        {items.map((item) => (
          <li key={item.handle}>
            <LocalizedClientLink href={`/products/${item.handle}`} className="group block">
              <div className="relative aspect-product overflow-hidden bg-surface-silk">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0,0.35,1)] group-hover:scale-105"
                    sizes="(max-width: 760px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-cream" />
                )}
              </div>
              <div className="pt-2.5 pb-1">
                <p className="text-2xs uppercase tracking-wide text-ink truncate">
                  {item.title}
                </p>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
