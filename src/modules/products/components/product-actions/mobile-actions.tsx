"use client"

import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useMemo } from "react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"
import { X, ChevronUp } from "lucide-react"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (optionId: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()
  const price = getProductPrice({ product, variantId: variant?.id })
  const selectedPrice = useMemo(() => {
    if (!price) return null
    return price.variantPrice || price.cheapestPrice || null
  }, [price])
  const isSimple = isSimpleProduct(product)

  const buttonLabel = useMemo(() => {
    if (isAdding) return "Добавляем..."
    if (!variant) return "Выберите вариант"
    if (!inStock) return "Нет в наличии"
    return "В КОРЗИНУ"
  }, [isAdding, variant, inStock])

  return (
    <>
      {/* Sticky bottom bar на мобильном */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
        data-testid="mobile-actions"
      >
        <div className="bg-surface border-t border-ink-20 px-4 pt-3 pb-safe-or-3">
          <div className="flex items-center gap-2 mb-2.5">
            {selectedPrice && (
              <span className="text-base font-bold text-ink">
                {selectedPrice.calculated_price}
              </span>
            )}
            {selectedPrice?.price_type === "sale" && (
              <span className="text-xs text-ink-50 line-through">
                {selectedPrice.original_price}
              </span>
            )}
          </div>
          <div className={`flex gap-2 ${isSimple ? "" : "grid grid-cols-2"}`}>
            {!isSimple && (
              <button
                onClick={open}
                className="btn-secondary w-full py-3 flex items-center justify-between px-4"
                data-testid="mobile-actions-button"
              >
                <span className="text-xs">
                  {variant ? Object.values(options).filter(Boolean).join(" / ") : "Выбрать"}
                </span>
                <ChevronUp size={14} />
              </button>
            )}
            <button
              onClick={handleAddToCart}
              disabled={!inStock || !variant || isAdding}
              className="btn-primary w-full py-3 text-xs tracking-widest disabled:opacity-40 disabled:pointer-events-none"
              data-testid="mobile-cart-button"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Modal для выбора вариантов */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ink-overlay" />
          </Transition.Child>
          <div className="fixed bottom-0 inset-x-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel
                className="w-full bg-surface px-6 pt-6 pb-10"
                data-testid="mobile-actions-modal"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs uppercase tracking-wide font-bold">Выберите вариант</h3>
                  <button onClick={close} data-testid="close-modal-button">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>
                {(product.variants?.length ?? 0) > 1 && (
                  <div className="flex flex-col gap-y-5">
                    {(product.options || []).map((option) => (
                      <OptionSelect
                        key={option.id}
                        option={option}
                        current={options[option.id]}
                        updateOption={updateOptions}
                        title={option.title ?? ""}
                        disabled={optionsDisabled}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={close}
                  className="btn-primary w-full mt-6 py-3.5 text-xs tracking-widest"
                >
                  Готово
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
