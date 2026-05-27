import * as React from "react"
import { BarChart2Icon } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatFormat,
  type CardStatTrend,
  type CardStatSize,
  applyFmt,
  resolveTrend,
  TREND_ICONS,
  TREND_COLORS,
} from "./card-stats-shared"

// ── Variants ──
// Value scale (text-xl/text-2xl/text-3xl) is intentionally larger than the
// standard typography table (text-xs/text-sm/text-base) because CardStat
// displays prominent KPI/card values that need visual emphasis at the top
// of dashboard views.

export const cardStatLabelVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs font-medium tracking-wide uppercase",
      md: "text-sm font-medium tracking-wide uppercase",
      lg: "text-base font-medium tracking-wide uppercase",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-xl font-semibold tracking-tight tabular-nums",
      md: "text-2xl font-semibold tracking-tight tabular-nums",
      lg: "text-3xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatDescriptionVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHeaderIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatContentGapVariants = cva("", {
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──

export interface CardStatProps {
  label: string
  value: string | number
  format?: CardStatFormat
  decimals?: number
  locale?: string
  currency?: string
  description?: string
  trend?: CardStatTrend | boolean
  icon?: React.ElementType
  size?: CardStatSize
  valueFormatter?: (value: number | string) => string
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStat({
  label,
  value,
  format,
  decimals,
  locale,
  currency,
  description,
  trend = false,
  icon: Icon,
  size = "md",
  valueFormatter,
  className,
  loading,
  empty,
}: CardStatProps) {
  if (loading) {
    return (
      <Card size="sm" className={cn(className)} data-slot="card-stat">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent
          className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
        >
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={cn(className)} data-slot="card-stat">
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
            <CardAction className="text-muted-foreground/40">
              <Icon className={cardStatHeaderIconVariants({ size })} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent
          className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
        >
          <p
            className={cn(
              cardStatValueVariants({ size }),
              "text-muted-foreground/25"
            )}
          >
            —
          </p>
          <p
            className={cn(
              "flex items-center gap-1 text-muted-foreground/50",
              cardStatDescriptionVariants({ size })
            )}
          >
            <BarChart2Icon className="size-2.5 shrink-0" aria-hidden />
            Nothing to measure yet
          </p>
        </CardContent>
      </Card>
    )
  }

  const displayValue = applyFmt(value, {
    format,
    decimals,
    locale,
    currency,
    valueFormatter,
  })

  const trendDir: CardStatTrend | false = resolveTrend(trend)
  const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null

  return (
    <Card size="sm" className={cn(className)} data-slot="card-stat">
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
      <CardContent
        className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
      >
        <p className={cardStatValueVariants({ size })}>{displayValue}</p>
        {description && (
          <p
            className={cn(
              "flex items-center gap-1",
              cardStatDescriptionVariants({ size }),
              trendDir ? TREND_COLORS[trendDir] : "text-muted-foreground"
            )}
          >
            {TrendIcon && (
              <TrendIcon className="size-2.5 shrink-0" aria-hidden />
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
