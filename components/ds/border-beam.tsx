import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface BorderBeamProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof borderBeamVariants> {
  /** Diameter of the beam's glow, in pixels. */
  size?: number
}

// ── Variants ──

export const borderBeamVariants = cva(
  "pointer-events-none absolute top-0 left-0 -z-10 aspect-square animate-[border-beam-move_var(--beam-duration)_linear_infinite] rounded-full [offset-anchor:50%_50%] [offset-path:rect(0_auto_auto_0_round_var(--radius))] [offset-rotate:0deg] motion-reduce:hidden",
  {
    variants: {
      tone: {
        primary: "[--beam-color:var(--primary)]",
        violet: "[--beam-color:var(--highlight-violet)]",
        sky: "[--beam-color:var(--highlight-sky)]",
      },
      speed: {
        slow: "[--beam-duration:9s]",
        normal: "[--beam-duration:6s]",
        fast: "[--beam-duration:3s]",
      },
    },
    defaultVariants: { tone: "primary", speed: "normal" },
  }
)

// ── Component ──

/**
 * A small glow that travels around the border of its (relatively
 * positioned, rounded) parent, following the exact rectangle path via
 * `offset-path` — unlike a rotated conic-gradient, this stays correct at
 * any aspect ratio. Sits at `-z-10` so sibling content always paints above
 * it. Pure CSS; hidden under `prefers-reduced-motion`.
 *
 * Usage: place inside a `relative isolate` container that owns the border
 * radius, alongside — not wrapping — the real content, e.g.
 * `<Card className="relative isolate overflow-hidden"><BorderBeam />…real content…</Card>`.
 * The `isolate` matters: without it, `position:relative` alone doesn't
 * establish a stacking context, so this `-z-10` layer can end up compared
 * against ancestors far outside the card instead of staying local to it.
 */
export const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      tone = "primary",
      speed = "normal",
      size = 80,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-slot="border-beam"
        className={cn(borderBeamVariants({ tone, speed }), className)}
        style={{
          width: size,
          background:
            "radial-gradient(circle closest-side, var(--beam-color) 0%, color-mix(in oklch, var(--beam-color) 40%, transparent) 55%, transparent 100%)",
          ...style,
        }}
        {...props}
      />
    )
  }
)
BorderBeam.displayName = "BorderBeam"
