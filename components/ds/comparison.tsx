"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  altBefore?: string
  altAfter?: string
}

// ── Component ──────────────────────────────────────────────────────────────

export function Comparison({
  className,
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  altBefore = "Before",
  altAfter = "After",
  ...props
}: ComparisonProps) {
  const [pos, setPos] = React.useState(50)
  const dragging = React.useRef(false)

  const handleMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, x)))
  }

  return (
    <div
      data-slot="comparison"
      className={cn(
        "relative h-64 w-full overflow-hidden rounded-2xl border bg-card select-none",
        className
      )}
      onPointerMove={handleMove}
      onPointerUp={() => (dragging.current = false)}
      onPointerDown={(e) => {
        dragging.current = true
        handleMove(e)
      }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt={altAfter}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur">
        {afterLabel}
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt={altBefore}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          style={{ width: `${100 / (pos / 100)}%` }}
        />
        <div className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur">
          {beforeLabel}
        </div>
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card shadow-md" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-2 mx-auto h-2 w-32 cursor-ew-resize"
        aria-label={`${beforeLabel} vs ${afterLabel}`}
        aria-valuenow={pos}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
