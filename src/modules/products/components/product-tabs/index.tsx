"use client"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { Truck, RefreshCw, RotateCcw, MapPin } from "lucide-react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Описание",
      component: <DescriptionTab product={product} />,
    },
    {
      label: "Состав и уход",
      component: <MaterialTab product={product} />,
    },
    {
      label: "Доставка и возврат",
      component: <ShippingTab />,
    },
    {
      label: "Наличие в магазинах",
      component: <StoreAvailabilityTab />,
    },
  ]

  return (
    <div className="w-full border-t border-ink-20">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const DescriptionTab = ({ product }: ProductTabsProps) => (
  <div className="py-4 text-sm text-ink leading-relaxed">
    {product.description || "Описание отсутствует."}
  </div>
)

const MaterialTab = ({ product }: ProductTabsProps) => (
  <div className="py-4 text-sm text-ink space-y-2">
    {product.material && (
      <div>
        <span className="text-2xs uppercase tracking-wide font-bold text-ink-50 block mb-0.5">Состав</span>
        <p>{product.material}</p>
      </div>
    )}
    {product.origin_country && (
      <div>
        <span className="text-2xs uppercase tracking-wide font-bold text-ink-50 block mb-0.5">Страна производства</span>
        <p>{product.origin_country}</p>
      </div>
    )}
    {!product.material && !product.origin_country && (
      <p className="text-ink-50">Информация не указана.</p>
    )}
    <div className="mt-3 text-xs text-ink-50">
      <p>Рекомендуем стирку при 30°С в деликатном режиме.</p>
      <p>Не отбеливать. Не сушить в машинке.</p>
    </div>
  </div>
)

const ShippingTab = () => (
  <div className="py-4 flex flex-col gap-4">
    {[
      {
        icon: <Truck size={16} strokeWidth={1.5} />,
        title: "Доставка по России",
        desc: "Курьером в Москве за 1–2 дня. СДЭК и Почта России — 3–7 дней. Бесплатно при заказе от 5 000 ₽.",
      },
      {
        icon: <RefreshCw size={16} strokeWidth={1.5} />,
        title: "Обмен",
        desc: "Обменяем изделие в течение 14 дней с момента получения при сохранении товарного вида.",
      },
      {
        icon: <RotateCcw size={16} strokeWidth={1.5} />,
        title: "Возврат",
        desc: "Возврат в течение 14 дней. Деньги вернём на карту в течение 3–5 рабочих дней.",
      },
    ].map((item) => (
      <div key={item.title} className="flex gap-3">
        <div className="mt-0.5 text-ink-50 flex-shrink-0">{item.icon}</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-1">{item.title}</p>
          <p className="text-xs text-ink-50 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
)

const StoreAvailabilityTab = () => (
  <div className="py-4">
    <div className="flex gap-3">
      <MapPin size={16} strokeWidth={1.5} className="text-ink-50 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-ink-50 mb-2">Проверить наличие в розничных магазинах Milavitsa.</p>
        <button className="btn-secondary text-2xs py-2 px-4">
          Найти магазин
        </button>
      </div>
    </div>
  </div>
)

export default ProductTabs
