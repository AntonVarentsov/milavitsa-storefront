import { Metadata } from "next"

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

const STATS = [
  { value: "27", label: "стран присутствия" },
  { value: "300+", label: "магазинов в России" },
  { value: "80+", label: "магазинов на Украине" },
  { value: "1996", label: "год получения ISO 9001" },
]

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-surface-cream pt-32 pb-20">
        <div className="content-container text-center">
          <p className="text-2xs uppercase tracking-widest text-ink-50 mb-3">
            с 1908 года
          </p>
          <h1 className="text-3xl md:text-[52px] font-black uppercase tracking-tight text-ink leading-none">
            О бренде
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-sm text-ink-50 leading-relaxed">
            Milavitsa — один из крупнейших производителей корсетных изделий
            в Восточной Европе и признанный белорусский бренд женского нижнего
            белья премиум-класса.
          </p>
        </div>
      </section>

      {/* ── История ── */}
      <section className="bg-surface-silk py-20">
        <div className="content-container max-w-2xl">
          <h2 className="text-2xs uppercase tracking-widest text-ink-50 mb-12">
            История бренда
          </h2>
          <ol className="relative border-l border-ink-20 space-y-10 pl-8">
            {TIMELINE.map(({ year, text }) => (
              <li key={year} className="relative">
                <span className="absolute -left-[2.35rem] top-0.5 w-4 h-4 rounded-full bg-brand-red ring-4 ring-surface-silk" />
                <p className="text-xs font-black uppercase tracking-widest text-brand-red mb-2">
                  {year}
                </p>
                <p className="text-sm text-ink-50 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Цифры ── */}
      <section className="bg-ink py-16">
        <div className="content-container">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <dt className="text-3xl md:text-[40px] font-black text-white leading-none mb-2">
                  {value}
                </dt>
                <dd className="text-2xs uppercase tracking-widest text-white/50">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Философия ── */}
      <section className="bg-white py-24">
        <div className="content-container max-w-2xl text-center">
          <h2 className="text-2xs uppercase tracking-widest text-ink-50 mb-8">
            Философия бренда
          </h2>
          <blockquote className="text-xl md:text-2xl font-bold uppercase tracking-tight text-ink leading-snug">
            Красота и индивидуальность каждой женщины — через качество,
            европейский дизайн и&nbsp;более 60 лет опыта.
          </blockquote>
          <p className="mt-8 text-sm text-ink-50 leading-relaxed">
            Каждое изделие Milavitsa создаётся с вниманием к деталям, чтобы
            дарить комфорт и уверенность — с первой примерки.
          </p>
        </div>
      </section>
    </main>
  )
}
