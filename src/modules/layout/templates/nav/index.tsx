import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavBar from "./nav-bar"

export default async function Nav() {
  const regions = await listRegions().then((r: StoreRegion[]) => r)

  return (
    <NavBar
      regions={regions}
      cartSlot={
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
      }
    />
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
