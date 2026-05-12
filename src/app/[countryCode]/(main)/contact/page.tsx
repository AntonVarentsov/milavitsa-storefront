import { Metadata } from "next"
import { Phone, Mail, Building2, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Контакты — Milavitsa Нижний Новгород",
  description:
    "Контактные данные и реквизиты ИП Савлучинский Михаил Владимирович — продавца товаров Milavitsa в Нижнем Новгороде.",
}

const COMPANY = {
  phone: "8 800-555-3-987",
  email: "milavitsa-nn@mail.ru",
  hours: "Пн–Пт: 9:00–18:00",
  name: "ИП Савлучинский Михаил Владимирович",
  legalAddress: "119180, г. Москва, пер. Бродников, д. 7, кв. 2",
  postalAddress: "603116, г. Нижний Новгород, ул. Чехова, д. 1",
  inn: "526100216956",
  ogrnip: "304526113300013",
}

const DETAILS: { label: string; value: string }[] = [
  { label: "Название организации", value: COMPANY.name },
  { label: "Юридический адрес", value: COMPANY.legalAddress },
  { label: "Почтовый адрес", value: COMPANY.postalAddress },
  { label: "ИНН", value: COMPANY.inn },
  { label: "ОГРНИП", value: COMPANY.ogrnip },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          Контакты
        </h1>

        <div className="flex flex-col gap-6">

          {/* Контактные данные — 2 колонки */}
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
              className="group bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8 hover:border-brand-red transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-15">
                  <Phone className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
                </div>
                <h2 className="text-base font-black uppercase tracking-tight text-ink">
                  Телефон
                </h2>
              </div>
              <p className="text-xl font-bold text-ink group-hover:text-brand-red transition-colors mb-1">
                {COMPANY.phone}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-ink-50">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{COMPANY.hours}</span>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY.email}`}
              className="group bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8 hover:border-brand-red transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-15">
                  <Mail className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
                </div>
                <h2 className="text-base font-black uppercase tracking-tight text-ink">
                  Email
                </h2>
              </div>
              <p className="text-xl font-bold text-ink group-hover:text-brand-red transition-colors">
                {COMPANY.email}
              </p>
            </a>
          </div>

          {/* Реквизиты */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <Building2 className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Реквизиты организации
              </h2>
            </div>
            <dl className="flex flex-col">
              {DETAILS.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`grid sm:grid-cols-[14rem,1fr] gap-x-6 gap-y-1 py-3 ${i < DETAILS.length - 1 ? "border-b border-ink-20" : ""}`}
                >
                  <dt className="text-xs uppercase tracking-widest text-ink-50">
                    {label}
                  </dt>
                  <dd className="text-sm font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA магазины */}
          <section className="bg-surface-cream rounded-2xl border border-ink-20 p-6 md:p-8 text-center">
            <p className="text-sm text-ink-50 mb-4">
              Хотите приехать и примерить вживую?
            </p>
            <a
              href="/stores"
              className="inline-flex items-center gap-2 text-brand-red text-sm font-bold uppercase tracking-widest hover:underline"
            >
              Адреса наших магазинов →
            </a>
          </section>

        </div>
      </div>
    </main>
  )
}
