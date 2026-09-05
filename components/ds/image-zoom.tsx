"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ImageZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  zoom?: number
}

// ── Component ──────────────────────────────────────────────────────────────

export function ImageZoom({ className, src, alt = "Zoom image", zoom = 2, ...props }: ImageZoomProps) {
  const [pos, setPos] = React.useState({ x: 50, y: 50 })
  const [hover, setHover] = React.useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <div
      data-slot="image-zoom"
      className={cn("relative overflow-hidden rounded-2xl border bg-card", className)}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="h-64 w-full object-cover" />
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
