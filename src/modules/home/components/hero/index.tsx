"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { heroSlides } from "@lib/data/home-content"

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  // Автопрокрутка
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="-mt-[92px] relative overflow-hidden" style={{ height: "100svh" }}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {heroSlides.map((slide, i) => (
            <div key={slide.collectionHandle} className="flex-[0_0_100%] relative h-full">
              <Image
                src={slide.image}
                alt={slide.collection}
                fill
                className="object-cover object-top"
                priority={i === 0}
                sizes="100vw"
              />
              {/* Overlay сверху (для читаемости header) */}
              <div className="absolute inset-x-0 top-0 h-40 bg-header-overlay" />
              {/* Overlay снизу (для текста) */}
              <div className="absolute inset-x-0 bottom-0 h-2/3"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)" }}
              />

              {/* Контент */}
              <div className="absolute bottom-16 left-0 right-0 px-6 md:px-16 text-white">
                <p className="text-2xs uppercase tracking-widest text-white/70 mb-2">
                  {slide.subtitle}
                </p>
                <h2 className="text-2xl md:text-[40px] font-black uppercase tracking-tight leading-none mb-6">
                  {slide.collection}
                </h2>
                <LocalizedClientLink
                  href={`/collections/${slide.collectionHandle}`}
                  className="inline-block bg-white text-ink text-2xs uppercase tracking-widest font-bold px-8 py-3
                             hover:bg-brand-red hover:text-white transition-colors duration-200"
                >
                  {slide.cta}
                </LocalizedClientLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`transition-all duration-200 ${
              i === selectedIndex
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
