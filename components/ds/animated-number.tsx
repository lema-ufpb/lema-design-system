"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface AnimatedNumberProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof animatedNumberVariants> {
  value: number
  /** Animation duration in ms. */
  duration?: number
  decimals?: number
  locale?: UILocale
  prefix?: string
  suffix?: string
}

// ── Variants ──

export const animatedNumberVariants = cva(
  "inline-block font-semibold text-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──

/**
 * Counts up/down to `value` on mount and whenever it changes. Renders the
 * animated digits as decorative (`aria-hidden`) and exposes the final,
 * static value once via a `sr-only` span so assistive tech doesn't hear
 * every intermediate frame. Jumps straight to the final value under
 * `prefers-reduced-motion`.
 */
export function AnimatedNumber({
  value,
  duration = 800,
  decimals = 0,
  locale: localeProp,
  prefix = "",
  suffix = "",
  size = "md",
  className,
  ...props
}: AnimatedNumberProps) {
  const locale = useUILocale(localeProp)
  const [display, setDisplay] = React.useState(0)
  const fromRef = React.useRef(0)

  React.useEffect(() => {
    const from = fromRef.current
    const delta = value - from
    if (delta === 0) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const effectiveDuration = reducedMotion ? 0 : duration

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress =
        effectiveDuration === 0
          ? 1
          : Math.min((now - start) / effectiveDuration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + delta * eased)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  const format = React.useCallback(
    (n: number) =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n),
    [locale, decimals]
  )

  return (
    <span
      data-slot="animated-number"
      className={cn(animatedNumberVariants({ size }), className)}
      {...props}
    >
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
    </span>
  )
}
