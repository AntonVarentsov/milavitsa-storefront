import { Metadata } from "next"
import { Truck, CreditCard, Shield, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Доставка и оплата — Milavitsa Нижний Новгород",
  description:
    "Условия доставки и оплаты товаров в интернет-магазине Milavitsa. Курьерская доставка, пункты выдачи, оплата картой и СБП.",
}

const PAYMENT_METHODS = ["Visa", "MasterCard", "МИР", "СБП"]

const DELIVERY_METHODS = [
  {
    title: "Курьерская доставка",
    desc: "По Нижнему Новгороду — доставка в течение 1–3 рабочих дней. По области — 2–5 рабочих дней.",
  },
  {
    title: "Пункты выдачи СДЭК и Boxberry",
    desc: "Доставка в ближайший к вам пункт выдачи. Срок — от 2 рабочих дней.",
  },
  {
    title: "Самовывоз",
    desc: "Бесплатно из любого фирменного магазина Milavitsa в Нижнем Новгороде после получения уведомления о готовности заказа.",
  },
]

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          Доставка и оплата
        </h1>

        <div className="flex flex-col gap-6">

          {/* Доставка */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <Truck className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Способы доставки
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              {DELIVERY_METHODS.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className={`flex gap-4 ${i < DELIVERY_METHODS.length - 1 ? "pb-5 border-b border-ink-20" : ""}`}
                >
                  <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-bold text-ink mb-1">{title}</p>
                    <p className="text-sm text-ink-50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-2 bg-surface-silk rounded-xl p-4">
              <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-ink-50 leading-relaxed">
                Точная стоимость и сроки доставки рассчитываются на этапе оформления заказа.
              </p>
            </div>
          </section>

          {/* Оплата */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <CreditCard className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Способы оплаты
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed mb-5">
              Мы принимаем следующие способы оплаты:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {PAYMENT_METHODS.map((m) => (
                <div
                  key={m}
                  className="bg-surface-silk rounded-xl py-4 text-center text-sm font-bold uppercase tracking-wide text-ink"
                >
                  {m}
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-50 leading-relaxed">
              Оплата производится через защищённый платёжный шлюз. Данные банковской карты
              не хранятся на серверах магазина.
            </p>
          </section>

          {/* Безопасность */}
          <section className="bg-surface-cream rounded-2xl border border-ink-20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Безопасность платежей
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-sm text-ink-50 leading-relaxed">
              <p>
                Все платежи проходят через защищённое SSL-соединение. Мы используем
                современные технологии шифрования для защиты ваших данных.
              </p>
              <p>
                При оплате картой может потребоваться подтверждение операции через
                SMS-код от вашего банка (3D Secure).
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
