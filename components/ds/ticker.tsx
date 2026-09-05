"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TickerItem {
  symbol: string
  price: string
  change: string
  direction: "up" | "down"
}

export interface TickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tickerVariants> {
  items: TickerItem[]
  speed?: "slow" | "normal" | "fast"
}

// ── Variants ───────────────────────────────────────────────────────────────

export const tickerVariants = cva("relative flex w-full items-center overflow-hidden border bg-card py-2", {
  variants: {
    size: {
      sm: "h-8 text-xs",
      md: "h-9 text-xs",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Ticker({ className, items, speed = "normal", size = "md", ...props }: TickerProps) {
  const duration = speed === "slow" ? "30s" : speed === "fast" ? "10s" : "20s"
  const loop = [...items, ...items]

  return (
    <div data-slot="ticker" className={cn(tickerVariants({ size }), className)} {...props}>
      <div
        className="flex w-max items-center gap-6 animate-[marquee-x_var(--duration)_linear_infinite]"
        style={{ "--duration": duration } as React.CSSProperties}
      >
        {loop.map((it, idx) => (
          <span key={`${it.symbol}-${idx}`} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium">{it.symbol}</span>
            <span className="tabular-nums text-muted-foreground">{it.price}</span>
            <span className={cn("flex items-center gap-1 tabular-nums", it.direction === "up" ? "text-success" : "text-destructive")}>
              {it.direction === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
              {it.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
