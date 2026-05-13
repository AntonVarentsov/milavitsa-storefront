import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
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
    <div className="py-8 small:py-12">
      <div className="content-container" data-testid="cart-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-2xs text-ink-50 mb-6">
          <LocalizedClientLink href="/" className="hover:text-brand-red transition-colors">
            Главная
          </LocalizedClientLink>
          <ChevronRight size={12} strokeWidth={1.5} />
          <span className="text-ink">Моя корзина</span>
        </nav>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_340px] gap-x-12 large:gap-x-16 items-start">
            {/* Left: items */}
            <div>
              <h1 className="text-xl font-bold uppercase tracking-widest mb-6">
                Корзина{" "}
                <span className="font-normal text-ink-40">({totalItems})</span>
              </h1>
              <ItemsTemplate cart={cart} />
            </div>

            {/* Right: summary */}
            <div className="sticky top-12 mt-[52px]">
              <Summary cart={cart as any} customer={customer} />
            </div>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  )
}

export default CartTemplate
