"use client"

import { trackRecentlyViewed, type RecentlyViewedItem } from "@lib/hooks/use-recently-viewed"
import { useEffect } from "react"

export default function RecentlyViewedTracker({ item }: { item: RecentlyViewedItem }) {
  useEffect(() => {
    trackRecentlyViewed(item)
  }, [item.handle])

  return null
}
