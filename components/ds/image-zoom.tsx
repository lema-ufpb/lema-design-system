"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ImageZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  /** Accessible description — required; falls back to UI_I18N[locale].imageZoom.alt when empty */
  alt: string
  zoom?: number
  locale?: UILocale
}

// ── Component ──────────────────────────────────────────────────────────────

export function ImageZoom({
  className,
  src,
  alt,
  locale: localeProp,
  zoom = 2,
  ...props
}: ImageZoomProps) {
  const locale = useUILocale(localeProp)
  const resolvedAlt = alt || UI_I18N[locale].imageZoom.alt
  const [pos, setPos] = React.useState({ x: 50, y: 50 })
  const [hover, setHover] = React.useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const t = e.touches[0]
    if (!t) return
    setPos({
      x: ((t.clientX - rect.left) / rect.width) * 100,
      y: ((t.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      data-slot="image-zoom"
      role="img"
      aria-label={resolvedAlt}
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      className={cn(
        "relative h-48 w-full overflow-hidden rounded-2xl border bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:h-64",
        className
      )}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={resolvedAlt}
        loading="lazy"
        decoding="async"
        className="h-64 w-full object-cover"
      />
      {hover && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
            backgroundSize: `${zoom * 100}%`,
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
