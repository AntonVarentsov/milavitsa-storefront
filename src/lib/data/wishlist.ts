"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"

export type WishlistItemData = {
  id: string
  customer_id: string
  product_id: string
  created_at: string
}

export async function getWishlistItems(): Promise<WishlistItemData[]> {
  const headers = { ...(await getAuthHeaders()) }
  if (!headers.authorization) return []

  const next = { ...(await getCacheOptions("wishlist")) }

  return sdk.client
    .fetch<{ wishlist_items: WishlistItemData[] }>("/store/wishlist", {
      method: "GET",
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ wishlist_items }) => wishlist_items ?? [])
    .catch(() => [])
}

export async function addWishlistItem(productId: string): Promise<void> {
  const headers = { ...(await getAuthHeaders()) }
  if (!headers.authorization) return

  await sdk.client
    .fetch("/store/wishlist", {
      method: "POST",
      body: { product_id: productId },
      headers,
    })
    .catch(() => null)

  const tag = await getCacheTag("wishlist")
  if (tag) revalidateTag(tag)
}

export async function removeWishlistItem(productId: string): Promise<void> {
  const headers = { ...(await getAuthHeaders()) }
  if (!headers.authorization) return

  await sdk.client
    .fetch(`/store/wishlist/${productId}`, {
      method: "DELETE",
      headers,
    })
    .catch(() => null)

  const tag = await getCacheTag("wishlist")
  if (tag) revalidateTag(tag)
}
