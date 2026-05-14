"use client"
import { sdk } from "@lib/config"

export type EventType =
  | "product_view"
  | "cart_add"
  | "cart_remove"
  | "wishlist_add"
  | "wishlist_remove"
  | "checkout_start"

function getAnonId(): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_anon_id="))
  return match?.split("=")[1] ?? ""
}

export async function trackEvent(
  eventType: EventType,
  data?: { product_id?: string; metadata?: Record<string, unknown> }
): Promise<void> {
  const anon_id = getAnonId()
  if (!anon_id) return

  // fire-and-forget — не блокируем UI
  sdk.client
    .fetch("/store/events", {
      method: "POST",
      body: {
        anon_id,
        event_type: eventType,
        product_id: data?.product_id ?? null,
        metadata: data?.metadata ?? null,
      },
    })
    .catch(() => null)
}
