import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroMedia,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import {
  ImageGallery,
  type ImageGalleryColumns,
  type ImageGalleryItem,
} from "./image-gallery"

// ── Types ──

export interface GallerySplitProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  items: ImageGalleryItem[]
  columns?: ImageGalleryColumns
}

// ── Component ──

/**
 * Split section — copy on one side, an image collage on the other —
 * composed from `HeroSection` and `ImageGallery`.
 */
export function GallerySplit({
  kicker,
  title,
  description,
  actions,
  items,
  columns = 2,
  className,
  ...props
}: GallerySplitProps) {
  return (
    <HeroSection
      align="split"
      className={className}
      data-slot="gallery-split"
      {...props}
    >
      <div className="flex flex-col gap-6">
        {kicker && (
          <HeroHeader className="justify-start">
            <Badge variant="secondary">{kicker}</Badge>
          </HeroHeader>
        )}
        <HeroTitle as="h2">{title}</HeroTitle>
        {description && <HeroDescription>{description}</HeroDescription>}
        {actions && <HeroActions align="left">{actions}</HeroActions>}
      </div>

      <HeroMedia>
        <ImageGallery items={items} columns={columns} />
      </HeroMedia>
    </HeroSection>
  )
}
