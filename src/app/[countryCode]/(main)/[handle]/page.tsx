import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPageByHandle, listPages } from "@lib/data/pages"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const pages = await listPages()
  if (!pages.length) return []

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  return countryCodes
    .map((countryCode) => pages.map((p) => ({ countryCode, handle: p.handle })))
    .flat()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const page = await getPageByHandle(params.handle)
  if (!page) return {}

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://milavitsa.store"
  const seo = page.seo
  const canonical =
    seo?.canonical_url ||
    `${baseUrl}/${params.countryCode}/${params.handle}`

  return {
    title: seo?.seo_title || `${page.title} | Милавица`,
    description: seo?.seo_description || page.excerpt || undefined,
    keywords: seo?.seo_keywords || undefined,
    robots: seo?.no_index
      ? "noindex,nofollow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    alternates: { canonical },
    openGraph: {
      title: seo?.og_title || page.title,
      description: seo?.og_description || page.excerpt || undefined,
      url: canonical,
      type: "article",
      images: seo?.og_image ? [{ url: seo.og_image }] : [],
    },
  }
}

export default async function DynamicPage(props: Props) {
  const params = await props.params
  const page = await getPageByHandle(params.handle)
  if (!page) notFound()

  return (
    <div className="content-container py-12 small:py-16">
      {page.cover_image_url && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={page.cover_image_url}
            alt={page.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <article className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-light tracking-tight text-ui-fg-base small:text-5xl">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="mt-4 text-lg text-ui-fg-subtle">{page.excerpt}</p>
          )}
        </header>

        {page.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-ui-fg-interactive"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </article>
    </div>
  )
}
