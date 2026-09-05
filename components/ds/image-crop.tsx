"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ImageCropProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  zoom?: number
  onZoomChange?: (zoom: number) => void
  onCrop?: (data: { x: number; y: number; zoom: number }) => void
}

// ── Component ──────────────────────────────────────────────────────────────

export function ImageCrop({ className, src, alt = "Crop image", zoom: controlledZoom, onZoomChange, onCrop, ...props }: ImageCropProps) {
  const [zoom, setZoom] = React.useState(controlledZoom ?? 1)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const dragging = React.useRef(false)
  const last = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    if (controlledZoom !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- controlled sync for zoom
      setZoom(controlledZoom)
    }
  }, [controlledZoom])

  const resolvedZoom = controlledZoom ?? zoom

  const handleZoom = (v: number[]) => {
    const z = v[0]
    setZoom(z)
    onZoomChange?.(z)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    last.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setPos({ x: e.clientX - last.current.x, y: e.clientY - last.current.y })
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 10
    if (e.key === "ArrowUp") { e.preventDefault(); setPos((p) => ({ ...p, y: p.y - step })) }
    if (e.key === "ArrowDown") { e.preventDefault(); setPos((p) => ({ ...p, y: p.y + step })) }
    if (e.key === "ArrowLeft") { e.preventDefault(); setPos((p) => ({ ...p, x: p.x - step })) }
    if (e.key === "ArrowRight") { e.preventDefault(); setPos((p) => ({ ...p, x: p.x + step })) }
    if (e.key === "+" || e.key === "=") { e.preventDefault(); handleZoom([Math.min(3, resolvedZoom + 0.1)]) }
    if (e.key === "-") { e.preventDefault(); handleZoom([Math.max(1, resolvedZoom - 0.1)]) }
  }

  return (
    <div data-slot="image-crop" className={cn("flex flex-col gap-4 rounded-2xl border bg-card p-4", className)} {...props}>
      <div
        role="application"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-48 sm:h-64 w-full overflow-hidden rounded-xl bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute max-w-none select-none"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${resolvedZoom})`, left: "50%", top: "50%", marginLeft: "-50%", marginTop: "-50%" }}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 border-2 border-primary/50" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Zoom</span>
        <Slider aria-label="Zoom" value={[resolvedZoom]} min={1} max={3} step={0.1} onValueChange={handleZoom} className="flex-1" />
        {onCrop && (
          <Button size="sm" onClick={() => onCrop({ ...pos, zoom: resolvedZoom })} className="rounded-full">
            Crop
          </Button>
        )}
      </div>
    </div>
  )
}
