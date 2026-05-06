import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div className="grid grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="aspect-[2/3] bg-surface-silk flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink-25">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px" data-testid="image-gallery">
      {images.map((image, index) => (
        <div
          key={image.id || index}
          className="relative overflow-hidden bg-surface-silk aspect-[2/3]"
          id={image.id}
        >
          {image.url && (
            <Image
              src={image.url}
              priority={index <= 1}
              className="object-cover object-top"
              alt={`Фото товара ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
