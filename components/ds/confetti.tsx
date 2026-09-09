"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ConfettiOptions {
  /** Number of confetti pieces */
  particleCount?: number
  /** Spread angle in degrees */
  spread?: number
  /** Initial velocity (pixels per frame) */
  startVelocity?: number
  /** Decay factor — how quickly particles slow down (0–1) */
  decay?: number
  /** Gravity (1 = normal, 0 = floating) */
  gravity?: number
  /** Drift (1 = right) */
  drift?: number
  /** Particle colors — defaults to LEMA chart tokens */
  colors?: string[]
  /** Confetti shapes */
  shapes?: ("square" | "circle" | "star")[]
  /** Scalar for particle size */
  scalar?: number
  /** X origin (0 = left, 1 = right, 0.5 = center) */
  originX?: number
  /** Y origin (0 = top, 1 = bottom) */
  originY?: number
  /** Z-index of the canvas */
  zIndex?: number
}

export type ConfettiVariant = "burst" | "fireworks" | "rain" | "sides"

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, fires the confetti animation */
  trigger?: boolean
  /** Preset animation variant */
  variant?: ConfettiVariant
  /** Fine-grained options forwarded to canvas-confetti */
  options?: ConfettiOptions
  /** Children are rendered inside the wrapper — useful for wrapping a success button */
  children?: React.ReactNode
}

// ── Variants ───────────────────────────────────────────────────────────────

export const confettiContainerVariants = cva("relative inline-flex", {
  variants: {},
  defaultVariants: {},
})

// ── Default colors (LEMA chart token equivalents) ─────────────────────────

const DEFAULT_COLORS = [
  "#6366f1", // chart-1 violet
  "#f59e0b", // chart-2 amber
  "#10b981", // chart-3 emerald
  "#3b82f6", // chart-4 blue
  "#f43f5e", // chart-5 rose
  "#8b5cf6", // extra violet
  "#06b6d4", // extra cyan
]

// ── Confetti firing logic ─────────────────────────────────────────────────

async function fireConfetti(
  variant: ConfettiVariant,
  options: ConfettiOptions
) {
  const confetti = (await import("canvas-confetti")).default

  const base: Parameters<typeof confetti>[0] = {
    particleCount: options.particleCount ?? 80,
    spread: options.spread ?? 70,
    startVelocity: options.startVelocity ?? 45,
    decay: options.decay ?? 0.9,
    gravity: options.gravity ?? 1,
    drift: options.drift ?? 0,
    colors: options.colors ?? DEFAULT_COLORS,
    shapes: options.shapes ?? ["square", "circle"],
    scalar: options.scalar ?? 1,
    zIndex: options.zIndex ?? 9999,
    origin: {
      x: options.originX ?? 0.5,
      y: options.originY ?? 0.6,
    },
  }

  switch (variant) {
    case "burst":
      await confetti({ ...base })
      break

    case "fireworks": {
      const duration = 2000
      const end = Date.now() + duration
      const frame = () => {
        confetti({
          ...base,
          particleCount: 6,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
      break
    }

    case "rain":
      await confetti({
        ...base,
        particleCount: 200,
        spread: 160,
        startVelocity: 25,
        gravity: 0.4,
        origin: { x: 0.5, y: -0.1 },
      })
      break

    case "sides":
      await Promise.all([
        confetti({ ...base, origin: { x: 0, y: 0.6 }, angle: 60 }),
        confetti({ ...base, origin: { x: 1, y: 0.6 }, angle: 120 }),
      ])
      break
  }
}

// ── Confetti ───────────────────────────────────────────────────────────────

export function Confetti({
  trigger = false,
  variant = "burst",
  options = {},
  children,
  className,
  ...props
}: ConfettiProps) {
  const prevTrigger = React.useRef(false)

  React.useEffect(() => {
    if (trigger && !prevTrigger.current) {
      fireConfetti(variant, options).catch(console.error)
    }
    prevTrigger.current = trigger
  }, [trigger, variant, options])

  if (!children) return null

  return (
    <div className={cn(confettiContainerVariants(), className)} {...props}>
      {children}
    </div>
  )
}

// ── useConfetti hook ───────────────────────────────────────────────────────

/**
 * Programmatic confetti — call `fire()` directly without the wrapper component.
 *
 * @example
 * const { fire } = useConfetti()
 * <Button onClick={() => fire("fireworks")}>Celebrate</Button>
 */
export function useConfetti() {
  const fire = React.useCallback(
    (variant: ConfettiVariant = "burst", options: ConfettiOptions = {}) => {
      fireConfetti(variant, options).catch(console.error)
    },
    []
  )
  return { fire }
}
