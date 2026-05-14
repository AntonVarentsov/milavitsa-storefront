"use client"

import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
  customer: HttpTypes.StoreCustomer | null
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart, customer }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const { currency_code, total, subtotal, discount_subtotal } = cart

  return (
    <div className="flex flex-col gap-y-5">
      {/* Login prompt */}
      {!customer && (
        <p className="text-xs text-ink-60 leading-relaxed">
          <LocalizedClientLink href="/account" className="underline underline-offset-2 hover:text-brand-red transition-colors">
            Войдите или зарегистрируйтесь
          </LocalizedClientLink>
          , чтобы применить промокод или получить баллы за покупку.
        </p>
      )}

      <h2 className="text-sm font-bold uppercase tracking-widest">Ваш заказ</h2>

      {/* Free delivery banner */}
      <div className="bg-surface-cream px-4 py-2.5 text-center">
        <span className="text-xs text-ink-60">Доступна бесплатная экспресс доставка по РФ</span>
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-ink-50">Сумма заказа</span>
          <span className="text-xs font-medium" data-testid="cart-subtotal">
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>

        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-ink-50">Скидка</span>
            <span className="text-xs font-medium text-brand-red" data-testid="cart-discount">
              − {convertToLocale({ amount: discount_subtotal, currency_code })}
            </span>
          </div>
        )}

        <div className="border-t border-ink-10 pt-2.5 flex items-center justify-between">
          <span className="text-sm uppercase tracking-wide font-bold">Итого</span>
          <span className="text-sm font-bold" data-testid="cart-total">
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </span>
        </div>
      </div>

      {/* Checkout button */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full text-center py-3.5 text-xs font-bold uppercase tracking-widest bg-[#c8d8e8] text-ink hover:bg-[#b5c9dc] transition-colors"
      >
        Перейти к оформлению
      </LocalizedClientLink>

      {/* Promo note */}
      <div className="flex flex-col gap-1.5">
        <a href="#" className="text-2xs text-ink-60 underline underline-offset-2 hover:text-brand-red transition-colors">
          Условия акции 1+1 = 3 на бельё
        </a>
        <p className="text-2xs text-ink-40">Скидка округляется в пользу покупателя.</p>
      </div>
    </div>
  )
}

export default Summary
