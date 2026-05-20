"use client"

import { useState, useEffect, useRef, Fragment } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Dialog, Transition } from "@headlessui/react"
import { Search, X } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { countryCode } = useParams<{ countryCode: string }>()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // HeadlessUI manages focus, but we explicitly focus the input
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
      setResults([])
      setIsLoading(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timer = setTimeout(async () => {
      try {
        const {
          response: { products },
        } = await listProductsWithSort({
          page: 1,
          sortBy: "created_at",
          countryCode,
          q: query,
          queryParams: { limit: 6 },
        })
        setResults(products)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, countryCode])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(
        `/${countryCode}/search?q=${encodeURIComponent(query.trim())}`
      )
      onClose()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <Dialog.Panel className="absolute top-0 inset-x-0 bg-white shadow-lg">
              <div className="content-container py-4">
                {/* Input row */}
                <div className="flex items-center gap-3 border-b border-ink-20 pb-4">
                  <Search
                    size={20}
                    className="text-ink-50 shrink-0"
                    strokeWidth={1.5}
                  />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Поиск товаров..."
                    className="flex-1 outline-none text-ink placeholder:text-ink-50 text-sm bg-transparent"
                  />
                  <button
                    onClick={onClose}
                    aria-label="Закрыть поиск"
                    className="shrink-0"
                  >
                    <X
                      size={20}
                      className="text-ink-50 hover:text-ink transition-colors"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                {/* Loading */}
                {isLoading && (
                  <div className="py-8 text-center text-ink-50 text-sm">
                    Поиск...
                  </div>
                )}

                {/* Results */}
                {!isLoading && results.length > 0 && (
                  <>
                    <ul className="py-2 divide-y divide-ink-20/50">
                      {results.map((product) => {
                        const { cheapestPrice } = getProductPrice({ product })
                        const thumb =
                          product.thumbnail ?? product.images?.[0]?.url
                        return (
                          <li key={product.id}>
                            <LocalizedClientLink
                              href={`/products/${product.handle}`}
                              className="flex items-center gap-3 py-3 hover:bg-[#f8f8f8] transition-colors px-1"
                              onClick={onClose}
                            >
                              {thumb && (
                                <div className="w-12 h-12 shrink-0 overflow-hidden bg-[#f5f5f5]">
                                  <Image
                                    src={thumb}
                                    alt={product.title ?? ""}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-2xs uppercase tracking-wide text-ink truncate">
                                  {product.title}
                                </p>
                                {cheapestPrice && (
                                  <p className="text-2xs text-ink-50 mt-0.5">
                                    {cheapestPrice.calculated_price}
                                  </p>
                                )}
                              </div>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* "Show all" button */}
                    <div className="py-3 border-t border-ink-20">
                      <button
                        onClick={() => {
                          router.push(
                            `/${countryCode}/search?q=${encodeURIComponent(
                              query.trim()
                            )}`
                          )
                          onClose()
                        }}
                        className="text-2xs uppercase tracking-wide text-brand-red hover:underline"
                      >
                        Все результаты для «{query}»
                      </button>
                    </div>
                  </>
                )}

                {/* No results */}
                {!isLoading && query.length >= 2 && results.length === 0 && (
                  <div className="py-8 text-center text-ink-50 text-sm">
                    Ничего не найдено по запросу «{query}»
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
