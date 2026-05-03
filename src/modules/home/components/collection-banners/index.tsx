import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { collectionBanners } from "@lib/data/home-content"

export default function CollectionBanners() {
  return (
    <section className="content-container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {collectionBanners.map((banner) => (
          <LocalizedClientLink
            key={banner.handle}
            href={`/collections/${banner.handle}`}
            className="group relative overflow-hidden aspect-[4/5] sm:aspect-[3/4]"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            <div className={`absolute bottom-8 px-8 ${banner.dark ? "text-white" : "text-white"}`}>
              <p className="text-2xs uppercase tracking-widest mb-1 opacity-80">
                {banner.subtitle}
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                {banner.title}
              </h3>
              <span className="text-2xs uppercase tracking-widest border-b border-white pb-0.5">
                Смотреть →
              </span>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
