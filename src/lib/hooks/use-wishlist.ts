"use client"

import { useState, useEffect, useCallback } from "react"
import { addWishlistItem, removeWishlistItem } from "@lib/data/wishlist"

const STORAGE_KEY = "wishlist"

function getLocalWishlist(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

function setLocalWishlist(ids: string[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {}
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    setWishlist(getLocalWishlist())
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.includes(productId)
    },
    [wishlist]
  )

  const addToWishlist = useCallback(
    async (productId: string) => {
      const updated = Array.from(new Set([...wishlist, productId]))
      setWishlist(updated)
      setLocalWishlist(updated)
      // Sync to server (silent fail for guests)
      await addWishlistItem(productId)
    },
    [wishlist]
  )

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      const updated = wishlist.filter((id) => id !== productId)
      setWishlist(updated)
      setLocalWishlist(updated)
      // Sync to server (silent fail for guests)
      await removeWishlistItem(productId)
    },
    [wishlist]
  )

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId)
      } else {
        await addToWishlist(productId)
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  )

  const count = wishlist.length

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    count,
  }
}

// Для вызова при логине/регистрации — синхронизирует localStorage с сервером
export async function syncWishlistToServer() {
  const items = getLocalWishlist()
  if (!items.length) return
  await Promise.all(items.map((productId) => addWishlistItem(productId)))
}
