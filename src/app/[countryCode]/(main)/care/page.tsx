import { Metadata } from "next"
import { Droplets, Wind, Package, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Уход за изделием — Milavitsa",
  description:
    "Как правильно ухаживать за нижним бельём Milavitsa. Рекомендации по стирке, сушке, хранению и эксплуатации изделий.",
}

const DO = [
  "Стирать вручную в тёплой воде (не выше 30 °C)",
  "Использовать мягкие моющие средства для деликатных тканей",
  "Застёгивать крючки бюстгальтеров перед стиркой",
  "Сушить в расправленном виде на горизонтальной поверхности",
  "Хранить бюстгальтеры в развёрнутом виде, не вкладывая чашку в чашку",
]

const DONT = [
  "Машинная стирка на интенсивных режимах",
  "Отбеливатели и хлорсодержащие средства",
  "Сушка в стиральной машине или на батарее",
  "Глажка элементов из эластана и кружева",
  "Хранение в сложенном виде с заломом чашек",
]

const STEPS = [
  {
    icon: Droplets,
    title: "Стирка",
    text: "Предпочтительна ручная стирка в воде до 30 °C с мягким моющим средством для деликатных тканей. Если используете машину — деликатный режим, температура не выше 30 °C, специальный мешок для белья. Бюстгальтеры стирайте с застёгнутыми крючками.",
  },
  {
    icon: Wind,
    title: "Сушка",
    text: "Аккуратно отожмите изделие, не выкручивая. Разложите на горизонтальной поверхности или сушите на плечиках вдали от прямого солнца и нагревательных приборов. Не используйте сушильную машину.",
  },
  {
    icon: Package,
    title: "Хранение",
    text: "Бюстгальтеры храните в развёрнутом виде, не складывая чашку внутрь чашки — это сохранит форму поролона и каркаса. Трусы и комплекты складывайте аккуратно, без сильных перегибов на кружеве.",
  },
]

export default function CarePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          Уход за изделием
        </h1>

        <p className="text-sm text-ink-50 leading-relaxed text-center max-w-2xl mx-auto mb-10">
          Правильный уход продлевает жизнь изделия и сохраняет его форму. Бережное обращение
          особенно важно для бюстгальтеров с поролоновыми чашками и элементами из кружева.
        </p>

        <div className="flex flex-col gap-6">

          {/* Шаги ухода */}
          {STEPS.map(({ icon: Icon, title, text }) => (
            <section
              key={title}
              className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-15">
                  <Icon className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                  {title}
                </h2>
              </div>
              <p className="text-sm text-ink-50 leading-relaxed">{text}</p>
            </section>
          ))}

          {/* Можно / Нельзя */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-surface-silk rounded-2xl border border-ink-20 p-6 md:p-8">
              <h3 className="text-lg font-black uppercase tracking-tight text-ink mb-5">
                Рекомендуется
              </h3>
              <ul className="flex flex-col gap-3">
                {DO.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                    <span className="text-brand-red font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-surface-cream rounded-2xl border border-ink-20 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-brand-red" strokeWidth={1.5} />
                <h3 className="text-lg font-black uppercase tracking-tight text-ink">
                  Избегайте
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {DONT.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                    <span className="text-ink font-bold mt-0.5 shrink-0">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <p className="text-2xs uppercase tracking-widest text-ink-50 text-center mt-2">
            Всегда сверяйтесь с ярлыком на изделии — он содержит точные требования производителя.
          </p>

        </div>
      </div>
    </main>
  )
}
