"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// ── Types ──

export interface LightboxImage {
  src: string
  alt: string
  caption?: React.ReactNode
}

export interface LightboxProps {
  images: LightboxImage[]
  /** Currently shown image index (controlled). */
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
  /** Shows a strip of clickable thumbnails below the main image. */
  showThumbnails?: boolean
  locale?: UILocale
}

// ── Component ──

/**
 * A fullscreen image viewer with prev/next navigation, keyboard arrows, and
 * an optional thumbnail strip — pair with `ImageGallery` (each item's
 * `onClick` opens the lightbox at that index).
 */
export function Lightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
  showThumbnails = true,
  locale: localeProp,
}: LightboxProps) {
  const locale = useUILocale(localeProp)
  const t = UI_I18N[locale]?.lightbox ?? UI_I18N["en-US"].lightbox
  const image = images[index]

  const goPrevious = React.useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length)
  }, [index, images.length, onIndexChange])

  const goNext = React.useCallback(() => {
    onIndexChange((index + 1) % images.length)
  }, [index, images.length, onIndexChange])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrevious()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    }
  }

  if (!image) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onKeyDown={handleKeyDown}
        className="max-w-4xl overflow-hidden border-border/60 bg-foreground/95 p-1 sm:rounded-2xl"
      >
        <DialogTitle className="sr-only">{image.alt}</DialogTitle>

        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />

          {images.length > 1 && (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={goPrevious}
                aria-label={t.previous}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full"
              >
                <ChevronLeftIcon aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={goNext}
                aria-label={t.next}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full"
              >
                <ChevronRightIcon aria-hidden="true" />
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-3 pb-2">
          {image.caption && (
            <p className="truncate text-sm text-background/80">
              {image.caption}
            </p>
          )}
          {images.length > 1 && (
            <span className="ml-auto shrink-0 text-xs text-background/60 tabular-nums">
              {index + 1} {t.of} {images.length}
            </span>
          )}
        </div>

        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-3 pb-3">
            {images.map((thumb, thumbIndex) => (
              <button
                key={thumb.src}
                type="button"
                onClick={() => onIndexChange(thumbIndex)}
                aria-label={thumb.alt}
                aria-current={thumbIndex === index}
                className={cn(
                  "size-14 shrink-0 overflow-hidden rounded-lg opacity-50 ring-2 ring-transparent transition-all focus-visible:ring-ring focus-visible:outline-none",
                  thumbIndex === index && "opacity-100 ring-white"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
