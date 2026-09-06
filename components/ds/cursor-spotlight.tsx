"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export type CursorSpotlightTone = "primary" | "violet" | "sky"

export interface CursorSpotlightProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cursorSpotlightVariants> {
  /** Diameter of the glow, in pixels. */
  size?: number
}

// ── Variants ──

export const cursorSpotlightVariants = cva("relative overflow-hidden", {
  variants: {
    tone: {
      primary: "[--spotlight-color:var(--primary)]",
      violet: "[--spotlight-color:var(--highlight-violet)]",
      sky: "[--spotlight-color:var(--highlight-sky)]",
    },
  },
  defaultVariants: { tone: "primary" },
})

// ── Component ──

/**
 * Wraps content with a radial glow that follows the pointer — the
 * interactive counterpart to `BackgroundGlow`'s static `spotlight`/`beam`
 * variants. Position updates write directly to CSS custom properties on the
 * glow layer (no re-render per pointermove). Falls back to a faint static
 * glow under `prefers-reduced-motion`.
 */
export const CursorSpotlight = React.forwardRef<
  HTMLDivElement,
  CursorSpotlightProps
>(({ tone = "primary", size = 500, className, children, ...props }, ref) => {
  const innerRef = React.useRef<HTMLDivElement>(null)
  const glowRef = React.useRef<HTMLDivElement>(null)
  const reducedMotionRef = React.useRef(false)

  React.useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref)
        (ref as React.RefObject<HTMLDivElement | null>).current = node
    },
    [ref]
  )

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotionRef.current) return
      const node = innerRef.current
      const glow = glowRef.current
      if (!node || !glow) return
      const rect = node.getBoundingClientRect()
      glow.style.setProperty("--x", `${event.clientX - rect.left}px`)
      glow.style.setProperty("--y", `${event.clientY - rect.top}px`)
      glow.style.opacity = "1"
    },
    []
  )

  const handlePointerLeave = React.useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0"
  }, [])

  return (
    <div
      ref={setRefs}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(cursorSpotlightVariants({ tone }), className)}
      data-slot="cursor-spotlight"
      {...props}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 motion-reduce:opacity-20"
        style={{
          background:
            "radial-gradient(" +
            size +
            "px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--spotlight-color) 15%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  )
})
CursorSpotlight.displayName = "CursorSpotlight"
