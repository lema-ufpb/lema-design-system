"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { IntegrationTile, type IntegrationTileProps } from "./integration-tile"

// ── Types ──────────────────────────────────────────────────────────────────

export interface IntegrationsMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: IntegrationTileProps[][]
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function IntegrationsMarquee({
  className,
  rows,
  speed = "normal",
  pauseOnHover = true,
  ...props
}: IntegrationsMarqueeProps) {
  const duration = speed === "slow" ? "30s" : speed === "fast" ? "10s" : "20s"

  return (
    <div
      data-slot="integrations-marquee"
      className={cn("flex flex-col gap-4 overflow-hidden", className)}
      {...props}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={cn(
            "flex w-max items-center gap-4",
            "animate-[marquee-x_var(--duration)_linear_infinite]",
            pauseOnHover && "hover:[animation-play-state:paused]",
            rowIdx % 2 === 1 && "[animation-direction:reverse]"
          )}
          style={{ "--duration": duration } as React.CSSProperties}
        >
          {[...row, ...row].map((tile, idx) => (
            <div key={`${tile.name}-${idx}`} className="w-64 shrink-0">
              <IntegrationTile {...tile} size="sm" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
