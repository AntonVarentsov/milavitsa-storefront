"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { ShoppingBag, X } from "lucide-react"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => { if (activeTimer) clearTimeout(activeTimer) }
  }, [activeTimer])

  const pathname = usePathname()
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton
          className="w-9 h-9 flex items-center justify-center hover:text-brand-red transition-colors relative focus:outline-none"
          data-testid="nav-cart-link"
          aria-label={`Корзина, ${totalItems} товаров`}
        >
          <LocalizedClientLink href="/cart" className="flex items-center justify-center w-full h-full relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                {totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden md:block absolute top-[calc(100%+1px)] right-0 bg-surface border border-ink-20 w-[420px] shadow-soft"
            data-testid="nav-cart-dropdown"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-ink-20">
              <h3 className="text-xs uppercase tracking-wide font-bold">
                Добавлено в корзину
              </h3>
              <button onClick={close} className="hover:text-brand-red transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[360px] px-5 flex flex-col gap-5 no-scrollbar py-4">
                  {cartState.items
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <div
                        className="flex gap-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="flex-shrink-0 w-[80px]"
                        >
                          <div className="aspect-product w-[80px] overflow-hidden bg-surface-silk">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <h4 className="text-xs font-normal text-ink truncate">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                                className="hover:text-brand-red transition-colors"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h4>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <span className="text-2xs text-ink-50" data-testid="cart-item-quantity">
                              Кол-во: {item.quantity}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                            <DeleteButton
                              id={item.id}
                              className="text-2xs text-ink-50 hover:text-feedback-error transition-colors"
                              data-testid="cart-item-remove-button"
                            >
                              Удалить
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="px-5 py-4 border-t border-ink-20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-50">Итого</span>
                    <span className="text-sm font-bold" data-testid="cart-subtotal">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={close}
                      className="btn-secondary flex-1 text-center text-xs py-2.5"
                    >
                      Продолжить
                    </button>
                    <LocalizedClientLink
                      href="/cart"
                      className="btn-primary flex-1 text-center text-xs py-2.5"
                      data-testid="go-to-cart-button"
                    >
                      В корзину
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 flex flex-col gap-4 items-center justify-center">
                <ShoppingBag size={40} strokeWidth={1} className="text-ink-25" />
                <p className="text-sm text-ink-50">Корзина пуста</p>
                <LocalizedClientLink href="/store" onClick={close}>
                  <span className="btn-primary text-xs py-2.5 px-6">
                    Перейти в каталог
                  </span>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
