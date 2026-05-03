"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const categories = [
  { name: "Бюстгальтеры", href: "/categories/byustgaltery" },
  { name: "Трусы и шортики", href: "/categories/trusy-i-shortiki" },
  { name: "Корсеты и боди", href: "/categories/korsety-i-bodi" },
  { name: "Купальники", href: "/categories/kupalniki" },
  { name: "Одежда для дома", href: "/categories/odezhda-dlya-doma" },
  { name: "Базовое бельё", href: "/categories/bazovoe-belyo" },
  { name: "Спортивное", href: "/categories/sportivnoe" },
]

const collections = [
  { name: "Венский вальс", href: "/collections/venskiy-vals" },
  { name: "Дольче вита", href: "/collections/dolche-vita" },
  { name: "Левада", href: "/collections/levada" },
  { name: "Нежное объятие", href: "/collections/nezhnoe-obiyatie" },
  { name: "Прибрежный сад", href: "/collections/pribrezhnyy-sad" },
  { name: "Прикосновение ветра", href: "/collections/prikosnovenie-vetra" },
  { name: "Фаворитка", href: "/collections/favoritka" },
  { name: "Цветочная магия", href: "/collections/tsvetochnaya-magiya" },
]

type SideMenuProps = {
  regions?: unknown
  locales?: unknown
  currentLocale?: unknown
}

export default function SideMenu(_props: SideMenuProps) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<"catalog" | "collections" | null>(null)

  return (
    <>
      {/* Кнопка бургер */}
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col gap-[5px] justify-center items-center w-10 h-10 hover:opacity-70 transition-opacity"
        aria-label="Меню"
        data-testid="nav-menu-button"
      >
        <span className="w-6 h-[1.5px] bg-ink" />
        <span className="w-6 h-[1.5px] bg-ink" />
        <span className="w-4 h-[1.5px] bg-ink" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-overlay"
          onClick={() => { setOpen(false); setActiveSection(null) }}
          data-testid="side-menu-backdrop"
        />
      )}

      {/* Drawer */}
      <div
        data-testid="nav-menu-popup"
        className={`fixed top-0 left-0 h-full w-[min(400px,100vw)] z-50 bg-surface flex flex-col
          shadow-elegant transform transition-transform duration-300 ease-soft
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[60px] border-b border-ink-20">
          <LocalizedClientLink href="/" onClick={() => setOpen(false)}>
            <Image
              src="/brand/milavitsa-logo.svg"
              alt="Milavitsa"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </LocalizedClientLink>
          <button
            onClick={() => { setOpen(false); setActiveSection(null) }}
            className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Закрыть меню"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          {/* Каталог */}
          <div className="mb-8">
            <button
              className="flex items-center justify-between w-full mb-4 text-xs uppercase tracking-wide font-bold text-ink"
              onClick={() => setActiveSection(activeSection === "catalog" ? null : "catalog")}
            >
              <span>Каталог</span>
              <ChevronRight
                size={16}
                className={`transition-transform ${activeSection === "catalog" ? "rotate-90" : ""}`}
              />
            </button>
            {activeSection === "catalog" && (
              <ul className="flex flex-col gap-3 pl-2">
                {categories.map((cat) => (
                  <li key={cat.href}>
                    <LocalizedClientLink
                      href={cat.href}
                      className="text-sm text-ink hover:text-brand-red transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {cat.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Коллекции */}
          <div className="mb-8">
            <button
              className="flex items-center justify-between w-full mb-4 text-xs uppercase tracking-wide font-bold text-ink"
              onClick={() => setActiveSection(activeSection === "collections" ? null : "collections")}
            >
              <span>Коллекции</span>
              <ChevronRight
                size={16}
                className={`transition-transform ${activeSection === "collections" ? "rotate-90" : ""}`}
              />
            </button>
            {activeSection === "collections" && (
              <ul className="flex flex-col gap-3 pl-2">
                {collections.map((col) => (
                  <li key={col.href}>
                    <LocalizedClientLink
                      href={col.href}
                      className="text-sm text-ink hover:text-brand-red transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {col.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ссылки */}
          <div className="border-t border-ink-20 pt-6 flex flex-col gap-4">
            <LocalizedClientLink
              href="/store"
              className="text-xs uppercase tracking-wide font-bold hover:text-brand-red transition-colors"
              onClick={() => setOpen(false)}
            >
              Все товары
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              className="text-xs uppercase tracking-wide font-bold hover:text-brand-red transition-colors"
              onClick={() => setOpen(false)}
            >
              Личный кабинет
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cart"
              className="text-xs uppercase tracking-wide font-bold hover:text-brand-red transition-colors"
              onClick={() => setOpen(false)}
            >
              Корзина
            </LocalizedClientLink>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-ink-20 bg-surface-cream">
          <p className="text-2xs text-ink uppercase tracking-wide">
            © {new Date().getFullYear()} Milavitsa. Нижнее бельё с 1908 года.
          </p>
        </div>
      </div>
    </>
  )
}
