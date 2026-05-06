import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

const CURRENCY_LABELS: Record<string, string> = {
  RUB: "Руб.",
  BYN: "Руб.",
  USD: "$",
  EUR: "€",
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  const code = currency_code.toUpperCase()
  const label = CURRENCY_LABELS[code]

  if (label) {
    const number = new Intl.NumberFormat("en-US", {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping: false,
    }).format(amount)

    // Prefix symbols ($ €) stay before, suffix labels (Руб.) go after
    const isPrefix = ["$", "€"].includes(label)
    return isPrefix ? `${label}${number}` : `${number} ${label}`
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency_code,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
