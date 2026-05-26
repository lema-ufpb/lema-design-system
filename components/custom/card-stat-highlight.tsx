import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { BarChart2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatTrend,
  type CardStatSize,
  type FmtProps,
  SIZE,
  applyFmt,
  resolveTrend,
  TREND_ICONS,
  CardStatEmptySlot,
} from "./card-stats-shared"

export type CardStatHighlightVariant =
  | "primary"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "sky"

export const cardStatHighlightVariants = cva(
  "relative overflow-hidden shadow-lg ring-0 dark:shadow-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        emerald: "bg-success text-success-foreground",
        amber: "bg-warning text-warning-foreground",
        rose: "bg-destructive text-white",
        violet: "bg-highlight-violet text-highlight-violet-foreground",
        sky: "bg-highlight-sky text-highlight-sky-foreground",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

export interface CardStatHighlightProps
  extends FmtProps, VariantProps<typeof cardStatHighlightVariants> {
  label: string
  value: string | number
  description?: string
  trend?: CardStatTrend | boolean
  trendValue?: string
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatHighlight({
  label,
  value,
  description,
  trend,
  trendValue,
  icon: Icon,
  variant = "primary",
  size = "md",
  className,
  loading,
  empty,
  ...fmt
}: CardStatHighlightProps) {
  const s = SIZE[size]

  const decorativeCircles = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-white/10"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-12 size-40 rounded-full bg-white/5"
      />
    </>
  )

  if (loading) {
    return (
      <Card
        size="sm"
        className={cn(cardStatHighlightVariants({ variant }), className)}
      >
        {decorativeCircles}
        <CardHeader className="relative flex flex-row items-start justify-between">
          <Skeleton className="h-3 w-24 bg-white/20" />
          <Skeleton className={cn(s.highlightBox, "bg-white/20")} />
        </CardHeader>
        <CardContent className="relative flex flex-col gap-2">
          <Skeleton className="h-9 w-40 bg-white/20" />
          <Skeleton className="h-5 w-32 bg-white/20" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card
        size="sm"
        className={cn(cardStatHighlightVariants({ variant }), className)}
      >
        {decorativeCircles}
        <CardHeader className="relative flex flex-row items-start justify-between">
          <span className={cn("opacity-75", s.label)}>{label}</span>
          {Icon && (
            <CardAction>
              <div
                className={cn(
                  "flex items-center justify-center bg-white/20",
                  s.highlightBox
                )}
              >
                <Icon className={s.highlightIcon} />
              </div>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="relative">
          <CardStatEmptySlot
            icon={BarChart2Icon}
            message="No spotlight yet"
            sub="Your headline KPI will appear here"
            inverted
          />
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)
  const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null

  return (
    <Card
      size="sm"
      className={cn(cardStatHighlightVariants({ variant }), className)}
    >
      {decorativeCircles}

      <CardHeader className="relative flex flex-row items-start justify-between">
        <span className={cn("opacity-75", s.label)}>{label}</span>
        {Icon && (
          <CardAction>
            <div
              className={cn(
                "flex items-center justify-center bg-white/20",
                s.highlightBox
              )}
            >
              <Icon className={s.highlightIcon} />
            </div>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="relative flex flex-col gap-1.5">
        <p className={s.highlightValue}>{display}</p>
        {(trendDir || description) && (
          <p
            className={cn(
              "flex items-center gap-1.5 opacity-80",
              s.highlightDesc
            )}
          >
            {TrendIcon && (
              <TrendIcon
                className={cn(s.contentIcon, "shrink-0")}
                aria-hidden
              />
            )}
            {trendValue && <span className="font-semibold">{trendValue}</span>}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
