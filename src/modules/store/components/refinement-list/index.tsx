"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  productTypes?: { id: string; value: string }[]
  selectedTypeId?: string
  'data-testid'?: string
}

const RefinementList = ({
  sortBy,
  productTypes,
  selectedTypeId,
  'data-testid': dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams)
      for (const [name, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      }
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString({ [name]: value })
    router.push(`${pathname}?${query}`)
  }

  const toggleType = (typeId: string) => {
    const query = createQueryString({
      typeId: selectedTypeId === typeId ? null : typeId,
      page: null,
    })
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-col gap-6 py-4 mb-8">
      {productTypes && productTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={`text-2xs uppercase tracking-wide px-3 py-1.5 border transition-colors ${
                selectedTypeId === type.id
                  ? "border-ink bg-ink text-surface"
                  : "border-ink-20 text-ink hover:border-ink"
              }`}
            >
              {type.value}
            </button>
          ))}
        </div>
      )}
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
    </div>
  )
}

export default RefinementList
