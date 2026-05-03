"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { Heart, Package, CreditCard, ChevronRight } from "lucide-react"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({ product, disabled }: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null
    if (params.get("v_id") === value) return
    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }
    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) > 0) return true
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null
    setIsAdding(true)
    await addToCart({ variantId: selectedVariant.id, quantity: 1, countryCode })
    setIsAdding(false)
  }

  const canAddToCart = inStock && selectedVariant && !disabled && !isAdding && isValidVariant

  const buttonLabel = useMemo(() => {
    if (isAdding) return "Добавляем..."
    if (!selectedVariant && !options) return "Выберите вариант"
    if (!inStock || !isValidVariant) return "Нет в наличии"
    return "В КОРЗИНУ"
  }, [isAdding, selectedVariant, options, inStock, isValidVariant])

  return (
    <>
      <div className="flex flex-col gap-y-5" ref={actionsRef}>
        {/* Название */}
        <div>
          <h1 className="text-base font-normal normal-case text-ink leading-snug" data-testid="product-title">
            {product.title}
          </h1>
          {product.collection && (
            <p className="text-2xs uppercase tracking-wide text-ink-50 mt-1">
              Коллекция «{product.collection.title}»
            </p>
          )}
        </div>

        {/* Цена */}
        <ProductPrice product={product} variant={selectedVariant} />

        {/* Опции (цвет + размер) */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-5">
            {(product.options || []).map((option) => (
              <OptionSelect
                key={option.id}
                option={option}
                current={options[option.id]}
                updateOption={setOptionValue}
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            ))}
            <Divider />
          </div>
        )}

        {/* Наличие */}
        <div className="flex items-center gap-2 text-xs text-ink-50">
          <Package size={14} strokeWidth={1.5} />
          <span>{inStock ? "В наличии" : "Нет в наличии"}</span>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="btn-primary flex-1 py-3.5 text-sm tracking-widest disabled:opacity-40 disabled:pointer-events-none"
            data-testid="add-product-button"
          >
            {buttonLabel}
          </button>
          <button
            className="w-12 h-12 border border-ink-25 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
            aria-label="В избранное"
          >
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Оплата частями */}
        <div className="bg-surface-cream p-4 flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <CreditCard size={18} strokeWidth={1.5} className="text-ink-50" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide">Оплата частями</p>
              <p className="text-2xs text-ink-50">Без процентов и переплат</p>
            </div>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} className="text-ink-50 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}
