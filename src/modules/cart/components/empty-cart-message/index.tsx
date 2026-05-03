import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingBag } from "lucide-react"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <ShoppingBag size={48} strokeWidth={1} className="text-ink-25 mb-6" />
      <h1 className="text-xl font-bold uppercase tracking-wide mb-4">
        Корзина пуста
      </h1>
      <p className="text-sm text-ink-50 mb-8 max-w-sm">
        В вашей корзине пока нет товаров. Перейдите в каталог, чтобы найти что-нибудь по душе.
      </p>
      <LocalizedClientLink
        href="/store"
        className="btn-primary px-8 py-3.5 text-sm tracking-widest"
      >
        Перейти в каталог
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
