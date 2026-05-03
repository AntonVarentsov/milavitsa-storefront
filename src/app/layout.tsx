import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Milavitsa — нижнее бельё с 1908 года",
    template: "%s | Milavitsa",
  },
  description:
    "Официальный интернет-магазин Milavitsa. Женское нижнее бельё, купальники и одежда для дома.",
  themeColor: "#C82230",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-57x57.png", sizes: "57x57" },
      { url: "/favicon-60x60.png", sizes: "60x60" },
      { url: "/favicon-72x72.png", sizes: "72x72" },
      { url: "/favicon-76x76.png", sizes: "76x76" },
      { url: "/favicon-114x114.png", sizes: "114x114" },
      { url: "/favicon-120x120.png", sizes: "120x120" },
      { url: "/favicon-144x144.png", sizes: "144x144" },
      { url: "/favicon-152x152.png", sizes: "152x152" },
      { url: "/favicon-180x180.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Milavitsa",
    images: [
      {
        url: "/brand/milavitsa-logo.svg",
        width: 192,
        height: 65,
        alt: "Milavitsa",
      },
    ],
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
