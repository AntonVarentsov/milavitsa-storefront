"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type StorePageSeo = {
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical_url: string | null
  no_index: boolean
}

export type StorePage = {
  id: string
  handle: string
  title: string
  excerpt: string | null
  content: string | null
  cover_image_url: string | null
  status: "published"
  published_at: string | null
  sort_order: number
  metadata: Record<string, unknown> | null
  seo: StorePageSeo | null
}

type ListResponse = { pages: StorePage[] }
type GetResponse = { page: StorePage }

export const listPages = async (): Promise<StorePage[]> => {
  const next = {
    ...(await getCacheOptions("pages")),
  }
  return sdk.client
    .fetch<ListResponse>("/store/pages", { next, cache: "force-cache" })
    .then(({ pages }) => pages)
    .catch(() => [])
}

export const getPageByHandle = async (handle: string): Promise<StorePage | null> => {
  const next = {
    ...(await getCacheOptions("pages")),
  }
  return sdk.client
    .fetch<GetResponse>(`/store/pages/${encodeURIComponent(handle)}`, {
      next,
      cache: "force-cache",
    })
    .then(({ page }) => page)
    .catch(() => null)
}
