"use client"

import * as React from "react"
import { ChevronsLeftRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──

export interface CompareSliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  beforeSrc: string
  beforeAlt: string
  afterSrc: string
  afterAlt: string
  /** Initial handle position, 0-100. */
  defaultValue?: number
  /** Accessible label for the drag handle. */
  label?: string
}

// ── Component ──

/**
 * A before/after image comparison slider — drag the handle (or use the
 * native range input with arrow keys) to reveal more of either image. Uses
 * `clip-path` so neither image is stretched or squashed while dragging.
 */
export function CompareSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  defaultValue = 50,
  label = "Comparison slider",
  className,
  ...props
}: CompareSliderProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div
      className={cn(
        "relative aspect-video w-full touch-none overflow-hidden rounded-2xl select-none",
        className
      )}
      data-slot="compare-slider"
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg">
          <ChevronsLeftRightIcon className="size-4" aria-hidden="true" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 peer focus-visible:outline-none"
      />
    </div>
  )
}
