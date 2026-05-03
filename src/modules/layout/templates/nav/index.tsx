import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import Image from "next/image"
import { Search, User, Heart } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NotificationBar from "@modules/layout/components/notification-bar"

export default async function Nav() {
  const regions = await listRegions().then((r: StoreRegion[]) => r)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <NotificationBar />
      <header className="h-header-h bg-surface border-b border-ink-20 shadow-sm">
        <nav className="content-container flex items-center justify-between h-full">
          {/* Left: Burger */}
          <div className="flex-1 basis-0 flex items-center">
            <SideMenu regions={regions} />
          </div>

          {/* Center: Logo */}
          <div className="flex items-center">
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image
                src="/brand/milavitsa-logo.svg"
                alt="Milavitsa"
                width={140}
                height={48}
                className="h-9 w-auto"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-3 flex-1 basis-0 justify-end">
            <LocalizedClientLink
              href="/store"
              className="hidden md:flex items-center text-2xs uppercase tracking-wide font-bold hover:text-brand-red transition-colors"
            >
              Каталог
            </LocalizedClientLink>

            <button
              className="w-9 h-9 hidden md:flex items-center justify-center hover:text-brand-red transition-colors"
              aria-label="Поиск"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <LocalizedClientLink
              href="/account"
              className="w-9 h-9 flex items-center justify-center hover:text-brand-red transition-colors"
              data-testid="nav-account-link"
              aria-label="Личный кабинет"
            >
              <User size={20} strokeWidth={1.5} />
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/wishlist"
              className="hidden sm:flex w-9 h-9 items-center justify-center hover:text-brand-red transition-colors"
              aria-label="Избранное"
            >
              <Heart size={20} strokeWidth={1.5} />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="w-9 h-9 flex items-center justify-center hover:text-brand-red transition-colors relative"
                  data-testid="nav-cart-link"
                  aria-label="Корзина"
                >
                  <CartIconFallback />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

function CartIconFallback() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}
