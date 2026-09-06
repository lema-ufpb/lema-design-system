"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type ImageGalleryLayout = "grid" | "masonry" | "row"
export type ImageGalleryColumns = 2 | 3 | 4
export type ImageGalleryAspect = "square" | "video" | "portrait" | "auto"

export interface ImageGalleryItem {
  src: string
  alt: string
  /** Rendered in a bottom gradient scrim over the image. */
  caption?: React.ReactNode
  /** Overrides `caption` entirely (e.g. a play button, a like count). */
  overlay?: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface ImageGalleryProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof imageGalleryRootVariants> {
  items: ImageGalleryItem[]
  aspect?: ImageGalleryAspect
  loading?: boolean
  /** Number of skeleton tiles shown while loading. */
  skeletonCount?: number
}

// ── Variants ──

export const imageGalleryRootVariants = cva("", {
  variants: {
    layout: {
      grid: "grid gap-4",
      masonry: "columns-2 gap-4 md:columns-3 lg:columns-4",
      row: "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
    },
    columns: {
      2: "",
      3: "",
      4: "",
    },
  },
  compoundVariants: [
    { layout: "grid", columns: 2, className: "grid-cols-2" },
    { layout: "grid", columns: 3, className: "grid-cols-2 sm:grid-cols-3" },
    { layout: "grid", columns: 4, className: "grid-cols-2 md:grid-cols-4" },
  ],
  defaultVariants: { layout: "grid", columns: 3 },
})

export const imageGalleryItemVariants = cva(
  "group/gallery-item relative block overflow-hidden rounded-2xl bg-muted transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
  {
    variants: {
      layout: {
        grid: "",
        masonry: "mb-4 w-full break-inside-avoid",
        row: "w-72 shrink-0 snap-start",
      },
      aspect: {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-3/4",
        auto: "",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5",
        false: "",
      },
    },
    defaultVariants: { layout: "grid", aspect: "square", interactive: false },
  }
)

// ── Component ──

/**
 * A flexible image gallery — grid, masonry (CSS columns) or a horizontal
 * scroll-snap row — with an optional bottom-scrim caption/overlay per item.
 * Pass `href` or `onClick` on an item to make it interactive (e.g. to open a
 * `Lightbox`).
 */
export function ImageGallery({
  items,
  layout = "grid",
  columns = 3,
  aspect = "square",
  loading = false,
  skeletonCount,
  className,
  ...props
}: ImageGalleryProps) {
  if (loading) {
    return (
      <div
        className={cn(imageGalleryRootVariants({ layout, columns }), className)}
        data-slot="image-gallery-skeleton"
        {...props}
      >
        {Array.from({ length: skeletonCount ?? (items.length || 6) }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className={cn(
                imageGalleryItemVariants({ layout, aspect }),
                "bg-muted"
              )}
            />
          )
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(imageGalleryRootVariants({ layout, columns }), className)}
      data-slot="image-gallery"
      {...props}
    >
      {items.map((item, index) => {
        const interactive = Boolean(item.href || item.onClick)
        const content = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-300 group-hover/gallery-item:scale-105"
            />
            {(item.caption || item.overlay) && (
              <span className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-4 text-sm font-medium text-background">
                {item.overlay ?? item.caption}
              </span>
            )}
          </>
        )

        const itemClassName = cn(
          imageGalleryItemVariants({ layout, aspect, interactive })
        )

        if (item.onClick) {
          return (
            <button
              key={index}
              type="button"
              onClick={item.onClick}
              aria-label={item.alt}
              className={itemClassName}
            >
              {content}
            </button>
          )
        }

        if (item.href) {
          return (
            <a
              key={index}
              href={item.href}
              aria-label={item.alt}
              className={itemClassName}
            >
              {content}
            </a>
          )
        }

        return (
          <figure key={index} className={itemClassName}>
            {content}
          </figure>
        )
      })}
    </div>
  )
}
