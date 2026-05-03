import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer className="bg-surface-cream border-t border-ink-20 w-full">
      <div className="content-container py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <LocalizedClientLink href="/">
              <Image
                src="/brand/milavitsa-logo.svg"
                alt="Milavitsa"
                width={140}
                height={48}
                className="h-10 w-auto mb-4"
              />
            </LocalizedClientLink>
            <p className="text-xs text-ink-50 leading-relaxed mb-4">
              Нижнее бельё с 1908 года. Качество, проверенное временем.
            </p>
            <div className="flex flex-col gap-1">
              <a href="tel:+74951234567" className="text-xs text-ink hover:text-brand-red transition-colors">
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@milavitsa.ru" className="text-xs text-ink hover:text-brand-red transition-colors">
                info@milavitsa.ru
              </a>
            </div>
          </div>

          {/* Каталог */}
          {productCategories && productCategories.length > 0 && (
            <div>
              <h3 className="text-2xs uppercase tracking-wide font-bold text-ink mb-4">
                Каталог
              </h3>
              <ul className="flex flex-col gap-2" data-testid="footer-categories">
                {productCategories
                  .filter((c) => !c.parent_category)
                  .slice(0, 7)
                  .map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        href={`/categories/${c.handle}`}
                        className="text-xs text-ink-50 hover:text-brand-red transition-colors"
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Коллекции */}
          {collections && collections.length > 0 && (
            <div>
              <h3 className="text-2xs uppercase tracking-wide font-bold text-ink mb-4">
                Коллекции
              </h3>
              <ul className="flex flex-col gap-2">
                {collections.slice(0, 8).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/collections/${c.handle}`}
                      className="text-xs text-ink-50 hover:text-brand-red transition-colors"
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Информация */}
          <div>
            <h3 className="text-2xs uppercase tracking-wide font-bold text-ink mb-4">
              Информация
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "О компании", href: "/about" },
                { label: "Доставка и оплата", href: "/shipping" },
                { label: "Возврат и обмен", href: "/returns" },
                { label: "Размерная таблица", href: "/size-guide" },
                { label: "Уход за изделием", href: "/care" },
                { label: "Контакты", href: "/contact" },
                { label: "Магазины", href: "/stores" },
              ].map((link) => (
                <li key={link.href}>
                  <LocalizedClientLink
                    href={link.href}
                    className="text-xs text-ink-50 hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ink-20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-2xs text-ink-50 uppercase tracking-wide">
            © {new Date().getFullYear()} Milavitsa. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <LocalizedClientLink
              href="/privacy"
              className="text-2xs text-ink-50 hover:text-brand-red transition-colors"
            >
              Политика конфиденциальности
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/terms"
              className="text-2xs text-ink-50 hover:text-brand-red transition-colors"
            >
              Условия использования
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
