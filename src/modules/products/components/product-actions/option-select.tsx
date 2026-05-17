import { HttpTypes } from "@medusajs/types"
import React from "react"

type ColorSwatch = { code: string; name: string; hex: string }

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  /** Цветовые свотчи из product.metadata.color_swatches; ключ — name цвета */
  colorSwatches?: ColorSwatch[]
  /**
   * Множество значений этой опции, совместимых с уже выбранными другими опциями.
   * Значения не из этого set рендерятся приглушёнными и не кликабельны.
   * Если undefined — все значения считаются доступными.
   */
  availableValues?: Set<string>
  disabled: boolean
  "data-testid"?: string
}

const FALLBACK_COLORS: Record<string, string> = {
  "Чёрный": "#1a1a1a",
  "Белый": "#f5f5f5",
  "Нюд": "#e8c4a0",
  "Пудровый": "#f0c4bf",
  "Голубой": "#a8cfe0",
  "Зелёный": "#a8c8a0",
  "Бежевый": "#e8ddd0",
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim()
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  colorSwatches,
  availableValues,
  "data-testid": dataTestId,
  disabled,
}) => {
  const isAvailable = (v: string): boolean =>
    !availableValues || availableValues.has(v)
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColorOption = title.toLowerCase() === "цвет" || title.toLowerCase() === "color"

  // Карта name → hex из metadata, плюс fallback на хардкоженную палитру
  const hexByName = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const sw of colorSwatches ?? []) {
      if (sw.hex) map.set(normalize(sw.name), sw.hex)
    }
    return map
  }, [colorSwatches])

  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wide font-bold text-ink">
          {title}
        </span>
        {current && (
          <span className="text-xs text-ink-50">{current}</span>
        )}
      </div>

      {isColorOption ? (
        /* Цветовые свотчи */
        <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
          {filteredOptions.map((v) => {
            const bg =
              hexByName.get(normalize(v)) ??
              FALLBACK_COLORS[v] ??
              "#ccc"
            const isSelected = v === current
            const available = isAvailable(v)

            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled || !available}
                title={available ? v : `${v} — недоступно для выбранного размера`}
                className={`relative w-6 h-6 rounded-full border-2 transition-all duration-150
                  ${isSelected ? "border-brand-red scale-110" : "border-transparent hover:border-ink-25"}
                  ${!available ? "opacity-30 cursor-not-allowed after:content-[''] after:absolute after:inset-0 after:bg-no-repeat after:bg-center after:[background-image:linear-gradient(45deg,transparent_45%,#888_45%,#888_55%,transparent_55%)]" : ""}`}
                style={{ backgroundColor: bg }}
                data-testid="option-button"
              />
            )
          })}
        </div>
      ) : (
        /* Размерные кнопки */
        <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
          {filteredOptions.map((v) => {
            const isSelected = v === current
            const available = isAvailable(v)
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled || !available}
                title={available ? v : `${v} — недоступно для выбранного цвета`}
                className={`min-w-[52px] h-9 px-3 text-xs border transition-all duration-150
                  ${isSelected
                    ? "bg-brand-red text-white border-brand-red font-bold"
                    : "bg-transparent text-ink border-ink-25 hover:border-brand-red hover:text-brand-red"
                  }
                  ${!available ? "opacity-30 line-through cursor-not-allowed pointer-events-none" : ""}
                  disabled:opacity-30 disabled:pointer-events-none`}
                data-testid="option-button"
              >
                {v}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OptionSelect
