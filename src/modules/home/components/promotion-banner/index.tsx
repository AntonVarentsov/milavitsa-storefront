import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromotionBanner() {
  return (
    <section className="bg-brand-red text-white py-8 px-6">
      <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-2xs uppercase tracking-widest text-white/70 mb-1">
            Специальное предложение
          </p>
          <h2 className="text-lg font-black uppercase tracking-tight">
            Бесплатная доставка от 5 000 ₽
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Для заказов по всей России. Без промокодов.
          </p>
        </div>
        <LocalizedClientLink
          href="/store"
          className="flex-shrink-0 bg-white text-brand-red text-2xs uppercase tracking-widest font-black px-8 py-3
                     hover:bg-surface-cream transition-colors duration-200"
        >
          Перейти в каталог
        </LocalizedClientLink>
      </div>
    </section>
  )
}
