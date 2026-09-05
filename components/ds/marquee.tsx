"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface MarqueeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeVariants> {
  pauseOnHover?: boolean
  fadeEdges?: boolean
  repeat?: number
}

// ── Variants ──

export const marqueeVariants = cva("group relative flex overflow-hidden p-2", {
  variants: {
    direction: {
      left: "flex-row",
      right: "flex-row",
      up: "flex-col",
      down: "flex-col",
    },
    speed: {
      slow: "[--duration:40s]",
      normal: "[--duration:25s]",
      fast: "[--duration:15s]",
    },
  },
  defaultVariants: {
    direction: "left",
    speed: "normal",
  },
})

// ── Component ──

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      direction = "left",
      speed = "normal",
      pauseOnHover = true,
      fadeEdges = true,
      repeat = 4,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = direction === "up" || direction === "down"
    const isReverse = direction === "right" || direction === "down"

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Marquee"
        className={cn(
          marqueeVariants({ direction, speed }),
          fadeEdges &&
            (isVertical
              ? "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
              : "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"),
          className
        )}
        {...props}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn(
              "flex shrink-0 justify-around gap-4 [animation-duration:var(--duration)] [animation-iteration-count:infinite] [animation-timing-function:linear] motion-reduce:[animation-play-state:paused]",
              isVertical
                ? "flex-col [animation-name:marquee-y]"
                : "flex-row [animation-name:marquee-x]",
              isReverse && "[animation-direction:reverse]",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
          >
            {children}
          </div>
        ))}
      </div>
    )
  }
)
Marquee.displayName = "Marquee"
