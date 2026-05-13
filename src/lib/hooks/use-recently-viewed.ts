const STORAGE_KEY = "recently_viewed"
const MAX_ITEMS = 8

export type RecentlyViewedItem = {
  handle: string
  title: string
  thumbnail: string | null
}

export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function trackRecentlyViewed(item: RecentlyViewedItem) {
  if (typeof window === "undefined") return
  try {
    const current = getRecentlyViewed().filter((i) => i.handle !== item.handle)
    const updated = [item, ...current].slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
}
