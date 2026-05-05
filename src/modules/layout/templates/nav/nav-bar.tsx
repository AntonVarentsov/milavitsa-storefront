"use client"

import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import { Search, User, Heart } from "lucide-react"
import { usePathname } from "next/navigation"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "@modules/layout/components/side-menu"
import NotificationBar from "@modules/layout/components/notification-bar"

interface NavBarProps {
  regions: StoreRegion[]
  cartSlot: ReactNode
}

export default function NavBar({ regions, cartSlot }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Only homepage gets transparent header — other pages are always opaque
  const pathWithoutCountry = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/")
  const canBeTransparent = pathWithoutCountry === "/"

  const isOpaque = !canBeTransparent || scrolled || hovered

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Отслеживаем реальную высоту nav-блока (меняется при закрытии уведомления)
  // и пишем в CSS-переменную, чтобы Hero мог динамически скорректировать отступ
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--nav-height",
        `${entry.contentRect.height}px`
      )
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transition = "transition-colors duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"

  return (
    <div
      ref={wrapperRef}
      className="sticky top-0 inset-x-0 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NotificationBar isOpaque={isOpaque} />

      <header
        className={`h-header-h ${transition} ${
          isOpaque
            ? "bg-white border-b border-ink-20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="content-container flex items-center justify-between h-full">
          {/* Left: Burger */}
          <div className="flex-1 basis-0 flex items-center">
            <SideMenu regions={regions} isTransparent={!isOpaque} />
          </div>

          {/* Center: Logo */}
          <div className="flex items-center">
            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image
                src="/brand/milavitsa-logo.svg"
                alt="Milavitsa"
                width={140}
                height={48}
                className="h-9 w-auto"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Right: Icons */}
          <div
            className={`flex items-center gap-3 flex-1 basis-0 justify-end ${transition} ${
              isOpaque ? "text-ink-50" : "text-white"
            }`}
          >
            <LocalizedClientLink
              href="/store"
              className="hidden md:flex items-center text-2xs uppercase tracking-wide font-bold hover:text-brand-red transition-colors"
            >
              Каталог
            </LocalizedClientLink>

            <button
              className="w-9 h-9 hidden md:flex items-center justify-center hover:text-brand-red transition-colors"
              aria-label="Поиск"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <LocalizedClientLink
              href="/account"
              className="w-9 h-9 flex items-center justify-center hover:text-brand-red transition-colors"
              data-testid="nav-account-link"
              aria-label="Личный кабинет"
            >
              <User size={20} strokeWidth={1.5} />
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/wishlist"
              className="hidden sm:flex w-9 h-9 items-center justify-center hover:text-brand-red transition-colors"
              aria-label="Избранное"
            >
              <Heart size={20} strokeWidth={1.5} />
            </LocalizedClientLink>

            {cartSlot}
          </div>
        </nav>
      </header>
    </div>
  )
}
