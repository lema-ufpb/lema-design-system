import * as React from "react"

import { cn } from "@/lib/utils"
import type { UILocale } from "@/lib/ui-i18n"
import { VideoDialog } from "./video-dialog"

// ── Types ──

export interface GalleryVideoItem {
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  title?: string
}

export interface GalleryVideoProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryVideoItem[]
  columns?: 2 | 3 | 4
  locale?: UILocale
}

// ── Component ──

/**
 * A grid of video tiles, each opening its clip in a dialog on click —
 * composed from `VideoDialog`.
 */
export function GalleryVideo({
  items,
  columns = 3,
  locale,
  className,
  ...props
}: GalleryVideoProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4",
        columns === 3 && "sm:grid-cols-3",
        columns === 4 && "md:grid-cols-4",
        className
      )}
      data-slot="gallery-video"
      {...props}
    >
      {items.map((item) => (
        <VideoDialog
          key={item.videoSrc}
          videoSrc={item.videoSrc}
          thumbnailSrc={item.thumbnailSrc}
          thumbnailAlt={item.thumbnailAlt}
          title={item.title}
          locale={locale}
        />
      ))}
    </div>
  )
}
