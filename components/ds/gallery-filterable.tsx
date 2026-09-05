"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { UILocale } from "@/lib/ui-i18n"
import {
  ImageGallery,
  type ImageGalleryAspect,
  type ImageGalleryColumns,
  type ImageGalleryItem,
  type ImageGalleryLayout,
} from "./image-gallery"
import { PillGroup } from "./pill-group"

// ── Types ──

export interface GalleryFilterCategory {
  value: string
  label: string
}

export interface GalleryFilterableItem extends ImageGalleryItem {
  category: string
}

export interface GalleryFilterableProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: GalleryFilterCategory[]
  items: GalleryFilterableItem[]
  allLabel?: string
  layout?: ImageGalleryLayout
  columns?: ImageGalleryColumns
  aspect?: ImageGalleryAspect
  locale?: UILocale
}

const ALL_VALUE = "__all__"

// ── Component ──

/**
 * An image gallery with a category filter row above it — composed from
 * `ImageGallery` and `PillGroup`.
 */
export function GalleryFilterable({
  categories,
  items,
  allLabel = "All",
  layout,
  columns,
  aspect,
  locale,
  className,
  ...props
}: GalleryFilterableProps) {
  const [active, setActive] = React.useState<string>(ALL_VALUE)

  const filtered = React.useMemo(
    () =>
      active === ALL_VALUE
        ? items
        : items.filter((item) => item.category === active),
    [active, items]
  )

  const pillItems = React.useMemo(
    () => [{ value: ALL_VALUE, label: allLabel }, ...categories],
    [allLabel, categories]
  )

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      data-slot="gallery-filterable"
      {...props}
    >
      <PillGroup
        items={pillItems}
        value={active}
        onChange={(value) =>
          setActive(
            Array.isArray(value)
              ? (value[0] ?? ALL_VALUE)
              : (value ?? ALL_VALUE)
          )
        }
        locale={locale}
      />
      <ImageGallery
        items={filtered}
        layout={layout}
        columns={columns}
        aspect={aspect}
      />
    </div>
  )
}
