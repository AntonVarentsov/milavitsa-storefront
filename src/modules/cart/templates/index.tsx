import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import RecentlyViewedSection from "@modules/cart/components/recently-viewed"
import { HttpTypes } from "@medusajs/types"
import { ChevronRight } from "lucide-react"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  return (
    <div className="py-8 sm:py-12">
      <div className="content-container" data-testid="cart-container">

        {/* Центрированная область корзины */}
        <div className="max-w-[1100px] mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-2xs text-ink-50 mb-6">
            <LocalizedClientLink href="/" className="hover:text-brand-red transition-colors">
              Главная
            </LocalizedClientLink>
            <ChevronRight size={12} strokeWidth={1.5} />
            <span className="text-ink">Моя корзина</span>
          </nav>

          {cart?.items?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_360px] items-start">
              {/* Left: items */}
              <div className="sm:pr-10 lg:pr-14">
                <h1 className="text-xl font-bold uppercase tracking-widest mb-6">
                  Корзина{" "}
                  <span className="font-normal text-ink-40">({totalItems})</span>
                </h1>
                <ItemsTemplate cart={cart} />
              </div>

              {/* Right: summary — с вертикальным разделителем слева */}
              <div className="mt-6 sm:mt-[52px] sm:sticky sm:top-12 sm:border-l sm:border-ink-10 sm:pl-10 lg:pl-14">
                <Summary cart={cart as any} customer={customer} />
              </div>
            </div>
          ) : (
            <EmptyCartMessage />
          )}

        </div>

        {/* Раздел "недавно смотрели" — на полную ширину content-container */}
        <RecentlyViewedSection />

      </div>
    </div>
  )
}

export default CartTemplate
