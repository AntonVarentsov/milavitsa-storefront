import { Metadata } from "next"
import { Heart, Sparkles, Award, Globe } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "О бренде Milavitsa — история с 1908 года",
  description:
    "Milavitsa — один из крупнейших производителей корсетных изделий в Восточной Европе. История бренда с 1908 года, присутствие в 27 странах, более 300 магазинов в России.",
}

const TIMELINE = [
  {
    year: "1908",
    text: "В Минске основана галантерейная фабрика «Франсуа-Турне» братьями Жаном и Франсуа-Виктором Турнье-Колле.",
  },
  {
    year: "1928",
    text: "Фабрика модернизирована немецким оборудованием и переименована в «Беларуска».",
  },
  {
    year: "1964",
    text: "Полный переход на производство женской одежды — начало истории нижнего белья Milavitsa.",
  },
  {
    year: "1991",
    text: "«Милавица» становится официальной торговой маркой и начинает путь к мировому признанию.",
  },
]

const QUALITY = [
  "Трёхкратный лауреат Правительственной премии Республики Беларусь за достижения в качестве (1999, 2002, 2005)",
  "В 1996 году получила первый в Республике Беларусь сертификат качества ISO 9001",
]

const PRESENCE = [
  "Представлена в 27 странах мира",
  "Более 300 магазинов в России",
  "80 магазинов на Украине",
  "Более 120 магазинов в других странах СНГ и Европейского Союза",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        {/* Заголовок страницы */}
        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          О бренде Milavitsa
        </h1>

        <div className="flex flex-col gap-6">

          {/* Легенда */}
          <section className="bg-surface-silk rounded-2xl border border-ink-20 p-8 md:p-10 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <Heart className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Легенда белорусского белья
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed mb-4">
              <strong className="text-ink font-bold">Milavitsa</strong> — один из крупнейших производителей корсетных изделий в Восточной Европе и признанный белорусский бренд женского нижнего белья премиум-класса.
            </p>
            <p className="text-sm text-ink-50 leading-relaxed">
              Название бренда создано писателем Владимиром Павловым по просьбе сотрудников, и с 1991 года «Милавица» стала постоянным и узнаваемым брендом, завоевавшим сердца миллионов женщин.
            </p>
          </section>

          {/* История */}
          <section className="bg-white rounded-2xl border border-ink-20 p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <Sparkles className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                История бренда
              </h2>
            </div>
            <div className="flex flex-col">
              {TIMELINE.map(({ year, text }, i) => (
                <div
                  key={year}
                  className={`py-5 ${i < TIMELINE.length - 1 ? "border-b border-ink-20" : ""}`}
                >
                  <p className="text-xs font-black uppercase tracking-widest text-brand-red mb-2">
                    {year} год
                  </p>
                  <p className="text-sm text-ink-50 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Достижения — 2 колонки */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl border border-ink-20 p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-primary">
                  <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-ink leading-tight">
                  Признание качества
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {QUALITY.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                    <span className="text-brand-red font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-2xl border border-ink-20 p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                  <Globe className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-ink leading-tight">
                  Мировое присутствие
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {PRESENCE.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                    <span className="text-brand-red font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Философия */}
          <section className="bg-surface-cream rounded-2xl border border-ink-20 p-8 md:p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-ink text-center mb-5">
              Философия бренда
            </h2>
            <p className="text-sm text-ink-50 leading-relaxed text-center max-w-2xl mx-auto">
              Milavitsa создаёт нижнее бельё, которое подчёркивает красоту и индивидуальность каждой
              женщины, сочетая более чем 60-летний опыт, европейское качество и элегантный дизайн.
              Каждое изделие создаётся с вниманием к деталям, чтобы дарить комфорт и уверенность.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-white rounded-2xl border border-ink-20 p-6 text-center shadow-soft">
            <p className="text-sm text-ink-50 mb-4">
              Хотите узнать больше о наших магазинах в Нижнем Новгороде?
            </p>
            <LocalizedClientLink
              href="/stores"
              className="inline-flex items-center gap-2 text-brand-red text-sm font-bold hover:underline transition-colors"
            >
              Посмотреть магазины →
            </LocalizedClientLink>
          </section>

        </div>
      </div>
    </main>
  )
}
