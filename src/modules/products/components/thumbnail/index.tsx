import Image from "next/image"
import React from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  const sizeClasses = {
    small: "w-[180px]",
    medium: "w-[290px]",
    large: "w-[440px]",
    full: "w-full",
    square: "w-full",
  }

  const aspectClass =
    size === "square"
      ? "aspect-square"
      : isFeatured
      ? "aspect-[2/3]"
      : "aspect-[2/3]"

  return (
    <div
      className={`relative overflow-hidden bg-surface-silk ${aspectClass} ${sizeClasses[size]} ${className || ""}`}
      data-testid={dataTestid}
    >
      {initialImage ? (
        <Image
          src={initialImage}
          alt="Изображение товара"
          className="absolute inset-0 object-cover object-center"
          draggable={false}
          quality={60}
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          fill
        />
      ) : (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          <svg width={size === "small" ? 16 : 24} height={size === "small" ? 16 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink-25">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Thumbnail
