import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatSize,
  type FmtProps,
  applyFmt,
  cardStatLabelVariants,
  cardStatDescriptionVariants,
  cardStatHeaderIconVariants,
  cardStatBadgePaddingVariants,
} from "./card-stats-shared"

// ── Variants ──
const cardStatGaugeMaxWVariants = cva("", {
  variants: {
    size: {
      sm: "max-w-[130px]",
      md: "max-w-[160px]",
      lg: "max-w-[200px]",
    },
  },
  defaultVariants: { size: "md" },
})

const cardStatGaugeValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-2xl font-semibold tracking-tight tabular-nums",
      md: "text-3xl font-semibold tracking-tight tabular-nums",
      lg: "text-4xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export interface CardStatGaugeZone {
  label: string
  color: string
  max: number
}

const DEFAULT_GAUGE_ZONES: CardStatGaugeZone[] = [
  { label: "Poor", color: "var(--color-risk-1)", max: 25 },
  { label: "Fair", color: "var(--color-risk-2)", max: 50 },
  { label: "Good", color: "var(--color-risk-3)", max: 75 },
  { label: "Excellent", color: "var(--color-risk-4)", max: 100 },
]

const GCX = 50,
  GCY = 52,
  GR = 38

function gaugePt(p: number): [number, number] {
  const a = Math.PI * (1 - p)
  return [GCX + GR * Math.cos(a), GCY - GR * Math.sin(a)]
}

function gaugeArc(p1: number, p2: number): string {
  const [x1, y1] = gaugePt(p1)
  const [x2, y2] = gaugePt(p2)
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${GR} ${GR} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function GaugeSvg({
  percent,
  zones,
}: {
  percent: number
  zones: CardStatGaugeZone[]
}) {
  const p = Math.min(100, Math.max(0, percent)) / 100
  const activeZone =
    zones.find((z) => percent <= z.max) ?? zones[zones.length - 1]
  const [dotX, dotY] = gaugePt(p)

  return (
    <svg viewBox="0 0 100 58" className="w-full" aria-hidden>
      {zones.map((zone, i) => {
        const p1 = (i === 0 ? 0 : zones[i - 1].max) / 100
        const p2 = zone.max / 100
        return (
          <path
            key={zone.label}
            d={gaugeArc(p1, p2)}
            fill="none"
            style={{ stroke: zone.color }}
            strokeWidth="6"
            strokeLinecap="butt"
            opacity="0.18"
          />
        )
      })}

      {p > 0 && (
        <path
          d={gaugeArc(0, p)}
          fill="none"
          style={{ stroke: activeZone.color }}
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}

      {p > 0 && (
        <circle
          cx={dotX.toFixed(2)}
          cy={dotY.toFixed(2)}
          r="4.5"
          style={{ fill: activeZone.color }}
          stroke="white"
          strokeWidth="1.5"
        />
      )}

      <circle
        cx={gaugePt(0)[0].toFixed(2)}
        cy={gaugePt(0)[1].toFixed(2)}
        r="3"
        style={{ fill: "var(--color-muted-foreground)" }}
        opacity="0.35"
      />
    </svg>
  )
}

export interface CardStatGaugeProps extends FmtProps {
  label: string
  value: number
  min?: number
  max?: number
  description?: string
  zones?: CardStatGaugeZone[]
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatGauge({
  label,
  value,
  min = 0,
  max = 100,
  description,
  zones = DEFAULT_GAUGE_ZONES,
  icon: Icon,
  size = "md",
  className,
  loading,
  empty,
  ...fmt
}: CardStatGaugeProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 pb-3">
          <Skeleton
            className={cn("w-full", cardStatGaugeMaxWVariants({ size }))}
            style={{
              aspectRatio: "2/1",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            }}
          />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-28 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span
            className={cn(
              "truncate text-muted-foreground",
              cardStatLabelVariants({ size })
            )}
          >
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className={cardStatHeaderIconVariants({ size })} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-1 pb-3">
          <div className={cn("w-full", cardStatGaugeMaxWVariants({ size }))}>
            <GaugeSvg percent={0} zones={zones} />
          </div>
          <p
            className={cn(
              "-mt-1 text-muted-foreground/25",
              cardStatGaugeValueVariants({ size })
            )}
          >
            —
          </p>
          <span
            className={cn(
              "rounded-full bg-muted/50 font-semibold text-muted-foreground/40",
              cardStatBadgePaddingVariants({ size }),
              cardStatDescriptionVariants({ size })
            )}
          >
            No reading
          </span>
          {description && (
            <p
              className={cn(
                "mt-1 text-center text-muted-foreground/40",
                cardStatDescriptionVariants({ size })
              )}
            >
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const activeZone = zones.find((z) => pct <= z.max) ?? zones[zones.length - 1]

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span
          className={cn(
            "truncate text-muted-foreground",
            cardStatLabelVariants({ size })
          )}
        >
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className={cardStatHeaderIconVariants({ size })} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-1 pb-3">
        <div className={cn("w-full", cardStatGaugeMaxWVariants({ size }))}>
          <GaugeSvg percent={pct} zones={zones} />
        </div>
        <p className={cn("-mt-1", cardStatGaugeValueVariants({ size }))}>
          {display}
        </p>
        <span
          className={cn(
            "rounded-full font-semibold text-white",
            cardStatBadgePaddingVariants({ size }),
            cardStatDescriptionVariants({ size })
          )}
          style={{ backgroundColor: activeZone.color }}
        >
          {activeZone.label}
        </span>
        {description && (
          <p
            className={cn(
              "mt-1 text-center text-muted-foreground",
              cardStatDescriptionVariants({ size })
            )}
          >
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
