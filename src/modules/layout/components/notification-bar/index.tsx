"use client"

import { useState } from "react"
import { X } from "lucide-react"

const messages = [
  "Бесплатная доставка при заказе от 5 000 ₽",
  "Новая коллекция Fashion 1/2026 — уже в наличии",
  "Скидка 15% на первый заказ при подписке на рассылку",
]

export default function NotificationBar() {
  const [closed, setClosed] = useState(false)
  const [idx] = useState(0)

  if (closed) return null

  return (
    <div className="h-notif-h bg-brand-red text-white flex items-center justify-center relative">
      <p className="text-2xs uppercase tracking-wide font-bold px-8 text-center">
        {messages[idx % messages.length]}
      </p>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
        aria-label="Закрыть"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  )
}
