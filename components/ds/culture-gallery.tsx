import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface CultureGalleryItem {
  id: string | number
  image: string
  alt: string
  caption?: string
  aspectRatio?: "square" | "video" | "wide"
}

export interface CultureGalleryProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cultureGalleryVariants> {
  items: CultureGalleryItem[]
}

// ── Variants ──

export const cultureGalleryVariants = cva("w-full transition-all", {
  variants: {
    layout: {
      mosaic:
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    layout: "mosaic",
  },
})

// ── Component ──

export function CultureGallery({
  items,
  layout,
  className,
  ...props
}: CultureGalleryProps) {
  return (
    <div
      className={cn(cultureGalleryVariants({ layout }), className)}
      {...props}
    >
      {items.map((item, index) => {
        // No layout mosaic, o primeiro ou itens específicos ganham destaque em 2 colunas se houver mais de 3 itens
        const isFeatured = layout === "mosaic" && (index === 0 || index === 3)

        return (
          <figure
            key={item.id}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md",
              isFeatured && "sm:col-span-2 sm:row-span-2",
              item.aspectRatio === "video"
                ? "aspect-video"
                : item.aspectRatio === "wide"
                  ? "aspect-[2/1]"
                  : "aspect-square"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            />

            {item.caption && (
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                <span className="text-xs font-medium text-foreground">
                  {item.caption}
                </span>
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
