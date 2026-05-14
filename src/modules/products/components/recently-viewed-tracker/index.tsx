"use client"

import { trackRecentlyViewed, type RecentlyViewedItem } from "@lib/hooks/use-recently-viewed"
import { trackEvent } from "@lib/hooks/use-analytics"
import { useEffect } from "react"

export default function RecentlyViewedTracker({ item }: { item: RecentlyViewedItem }) {
  useEffect(() => {
    trackRecentlyViewed(item)
    if (item.product_id) {
      trackEvent("product_view", { product_id: item.product_id })
    }
  }, [item.handle])

  return null
}
