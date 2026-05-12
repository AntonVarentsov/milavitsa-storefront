import { Metadata } from "next"
import { Ruler, BookOpen, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "Размерная таблица — Milavitsa",
  description:
    "Как правильно подобрать размер белья Milavitsa. Таблицы размеров бюстгальтеров и трусов, инструкция по снятию мерок, соответствие RU/EU/UK/US.",
}

const BRA_SIZES = [
  { band: "65", a: "65A", b: "65B", c: "65C", d: "—", e: "—" },
  { band: "70", a: "70A", b: "70B", c: "70C", d: "70D", e: "—" },
  { band: "75", a: "75A", b: "75B", c: "75C", d: "75D", e: "75E" },
  { band: "80", a: "80A", b: "80B", c: "80C", d: "80D", e: "80E" },
  { band: "85", a: "85A", b: "85B", c: "85C", d: "85D", e: "85E" },
  { band: "90", a: "—", b: "90B", c: "90C", d: "90D", e: "90E" },
  { band: "95", a: "—", b: "95B", c: "95C", d: "95D", e: "95E" },
]

const PANTY_SIZES = [
  { ru: "42", eu: "36", uk: "8", us: "4", letter: "XS", waist: "60–64", hips: "86–90" },
  { ru: "44", eu: "38", uk: "10", us: "6", letter: "S", waist: "64–68", hips: "90–94" },
  { ru: "46", eu: "40", uk: "12", us: "8", letter: "M", waist: "68–72", hips: "94–98" },
  { ru: "48", eu: "42", uk: "14", us: "10", letter: "L", waist: "72–76", hips: "98–102" },
  { ru: "50", eu: "44", uk: "16", us: "12", letter: "XL", waist: "76–82", hips: "102–106" },
  { ru: "52", eu: "46", uk: "18", us: "14", letter: "XXL", waist: "82–88", hips: "106–110" },
]

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          Размерная таблица
        </h1>

        <div className="flex flex-col gap-6">

          {/* Как снять мерки */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <Ruler className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Как снять мерки
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <p className="text-sm font-bold text-ink mb-2">Обхват под грудью</p>
                <p className="text-sm text-ink-50 leading-relaxed">
                  Измеряется горизонтально по самому узкому месту под грудной клеткой. Сантиметровая
                  лента должна прилегать плотно, но не сжимать.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-ink mb-2">Обхват груди</p>
                <p className="text-sm text-ink-50 leading-relaxed">
                  Измеряется горизонтально по самым выступающим точкам груди. Лента не натягивается
                  и не провисает.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-ink mb-2">Обхват талии</p>
                <p className="text-sm text-ink-50 leading-relaxed">
                  Измеряется по самому узкому месту корпуса, обычно на 2–3 см выше пупка.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-ink mb-2">Обхват бёдер</p>
                <p className="text-sm text-ink-50 leading-relaxed">
                  Измеряется по самым выступающим точкам ягодиц. Стопы вместе, тело расслаблено.
                </p>
              </div>
            </div>
          </section>

          {/* Бюстгальтеры */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <BookOpen className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Бюстгальтеры
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed mb-5">
              Размер бюстгальтера состоит из числа (обхват под грудью) и буквы (полнота чашки).
              Разница между обхватом груди и обхватом под грудью определяет чашку: A ≈ 13 см,
              B ≈ 15 см, C ≈ 17 см, D ≈ 19 см, E ≈ 21 см.
            </p>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-silk text-ink text-xs uppercase tracking-widest">
                    <th className="text-left p-3 font-bold">Под грудью</th>
                    <th className="p-3 font-bold">A</th>
                    <th className="p-3 font-bold">B</th>
                    <th className="p-3 font-bold">C</th>
                    <th className="p-3 font-bold">D</th>
                    <th className="p-3 font-bold">E</th>
                  </tr>
                </thead>
                <tbody>
                  {BRA_SIZES.map((row) => (
                    <tr key={row.band} className="border-b border-ink-20 last:border-0">
                      <td className="p-3 font-bold text-ink">{row.band}</td>
                      <td className="p-3 text-center text-ink-50">{row.a}</td>
                      <td className="p-3 text-center text-ink-50">{row.b}</td>
                      <td className="p-3 text-center text-ink-50">{row.c}</td>
                      <td className="p-3 text-center text-ink-50">{row.d}</td>
                      <td className="p-3 text-center text-ink-50">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Трусы */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <BookOpen className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Трусы и другие изделия
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed mb-5">
              Соответствие размеров и обхватов (см).
            </p>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-silk text-ink text-xs uppercase tracking-widest">
                    <th className="p-3 font-bold">RU</th>
                    <th className="p-3 font-bold">EU</th>
                    <th className="p-3 font-bold">UK</th>
                    <th className="p-3 font-bold">US</th>
                    <th className="p-3 font-bold">Буква</th>
                    <th className="p-3 font-bold">Талия</th>
                    <th className="p-3 font-bold">Бёдра</th>
                  </tr>
                </thead>
                <tbody>
                  {PANTY_SIZES.map((row) => (
                    <tr key={row.ru} className="border-b border-ink-20 last:border-0">
                      <td className="p-3 text-center font-bold text-ink">{row.ru}</td>
                      <td className="p-3 text-center text-ink-50">{row.eu}</td>
                      <td className="p-3 text-center text-ink-50">{row.uk}</td>
                      <td className="p-3 text-center text-ink-50">{row.us}</td>
                      <td className="p-3 text-center text-ink-50">{row.letter}</td>
                      <td className="p-3 text-center text-ink-50">{row.waist}</td>
                      <td className="p-3 text-center text-ink-50">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Совет */}
          <section className="bg-surface-cream rounded-2xl border border-ink-20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <Lightbulb className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Совет от Milavitsa
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed">
              Если вы попадаете между двумя размерами, при выборе бюстгальтера ориентируйтесь на
              меньший обхват под грудью и большую чашку. Лучше всего размер определяется при примерке —
              приходите в наши фирменные магазины Нижнего Новгорода, наши консультанты помогут найти
              идеально сидящую модель.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
