import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColorOption = title.toLowerCase() === "цвет" || title.toLowerCase() === "color"

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
            const colorMap: Record<string, string> = {
              "Чёрный": "#1a1a1a",
              "Белый": "#f5f5f5",
              "Нюд": "#e8c4a0",
              "Пудровый": "#f0c4bf",
              "Голубой": "#a8cfe0",
              "Зелёный": "#a8c8a0",
              "Бежевый": "#e8ddd0",
            }
            const bg = colorMap[v] || "#ccc"
            const isSelected = v === current

            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                title={v}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                  ${isSelected ? "border-brand-red scale-110" : "border-transparent hover:border-ink-25"}`}
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
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                className={`min-w-[52px] h-9 px-3 text-xs border transition-all duration-150
                  ${isSelected
                    ? "bg-brand-red text-white border-brand-red font-bold"
                    : "bg-transparent text-ink border-ink-25 hover:border-brand-red hover:text-brand-red"
                  }
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
