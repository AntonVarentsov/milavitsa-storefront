import { Metadata } from "next"
import { RotateCcw, AlertCircle, HelpCircle, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Возврат и обмен — Milavitsa",
  description:
    "Условия возврата и обмена товаров в интернет-магазине Milavitsa. Правила возврата белья, бракованных изделий, контакты для обращения.",
}

const COMPANY_PHONE = "8 800-555-3-987"
const COMPANY_EMAIL = "milavitsa-nn@mail.ru"

const CAN_RETURN = [
  "Товар надлежащего качества, кроме нательного и корсетного белья (см. ниже)",
  "Товар с обнаруженным производственным браком",
  "Товар, не соответствующий описанию или комплектации",
  "Товар, поставленный в результате технической ошибки",
]

const CANNOT_RETURN = [
  "Нательное и корсетное бельё надлежащего качества — п. 5 Перечня непродовольственных товаров (Постановление Правительства РФ № 2463)",
  "Товар, утративший товарный вид по вине покупателя",
  "Товар без оригинальной упаковки, ярлыков и фабричной маркировки",
  "Изделия, использованные после получения",
]

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="content-container max-w-4xl pt-28 pb-16">

        <h1 className="text-3xl md:text-[40px] font-black uppercase tracking-tight text-ink text-center mb-10">
          Возврат и обмен
        </h1>

        <div className="flex flex-col gap-6">

          {/* Политика возврата */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <RotateCcw className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Политика возврата
              </h2>
            </div>
            <p className="text-sm text-ink-50 leading-relaxed mb-5">
              Возврат и обмен товара осуществляется в соответствии с Законом РФ «О защите прав
              потребителей» и Постановлением Правительства РФ № 2463 от 31.12.2020. Срок возврата
              товара надлежащего качества — 7 дней с момента получения.
            </p>

            <p className="text-sm font-bold text-ink mb-3">Подлежит возврату:</p>
            <ul className="flex flex-col gap-3 mb-6">
              {CAN_RETURN.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                  <span className="text-brand-red font-bold mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm font-bold text-ink mb-3">Не подлежит возврату:</p>
            <ul className="flex flex-col gap-3">
              {CANNOT_RETURN.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-50">
                  <span className="text-ink-50 font-bold mt-0.5 shrink-0">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Бракованный товар */}
          <section className="bg-surface-silk rounded-2xl border border-ink-20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-primary">
                <AlertCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Брак или несоответствие
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-sm text-ink-50 leading-relaxed">
              <p>
                При обнаружении производственного брака или несоответствия товара описанию вы вправе
                в соответствии со ст. 18 Закона «О защите прав потребителей»:
              </p>
              <ul className="flex flex-col gap-2 pl-4">
                <li>· потребовать замены на товар той же марки или модели;</li>
                <li>· потребовать соразмерного уменьшения цены;</li>
                <li>· отказаться от исполнения договора и вернуть уплаченные средства.</li>
              </ul>
              <p>
                Денежные средства возвращаются на банковскую карту, с которой была произведена
                оплата, в течение 10 рабочих дней.
              </p>
            </div>
          </section>

          {/* Порядок оформления */}
          <section className="bg-white rounded-2xl border border-ink-20 shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-15">
                <HelpCircle className="w-6 h-6 text-brand-red" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-ink">
                Как оформить возврат
              </h2>
            </div>
            <ol className="flex flex-col gap-4 text-sm text-ink-50 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-brand-red font-black shrink-0">01</span>
                <span>Свяжитесь с нами по телефону или email и сообщите номер заказа.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-red font-black shrink-0">02</span>
                <span>Согласуйте с менеджером способ возврата и адрес доставки товара.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-red font-black shrink-0">03</span>
                <span>
                  Отправьте товар в оригинальной упаковке с ярлыками. К возврату приложите заявление
                  и копию чека.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-red font-black shrink-0">04</span>
                <span>
                  После получения и проверки товара мы вернём денежные средства в течение 10 рабочих
                  дней.
                </span>
              </li>
            </ol>
          </section>

          {/* Контакты */}
          <section className="bg-surface-cream rounded-2xl border border-ink-20 p-6 md:p-8">
            <h2 className="text-base font-black uppercase tracking-tight text-ink mb-4">
              Возникли вопросы?
            </h2>
            <p className="text-sm text-ink-50 leading-relaxed mb-4">
              Свяжитесь с нами — мы поможем разобраться с возвратом или обменом.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 hover:bg-surface-silk transition-colors"
              >
                <Phone className="w-5 h-5 text-brand-red shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-bold text-ink">{COMPANY_PHONE}</span>
              </a>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 hover:bg-surface-silk transition-colors"
              >
                <Mail className="w-5 h-5 text-brand-red shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-bold text-ink">{COMPANY_EMAIL}</span>
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
