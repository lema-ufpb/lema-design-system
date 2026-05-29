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
  applyFmt,
  resolveTrend,
  TREND_ICONS,
  CardStatEmptySlot,
  cardStatLabelVariants,
} from "./card-stats-shared"

// ── Variants ──
export const cardStatHighlightBoxVariants = cva("", {
  variants: {
    size: {
      sm: "size-8 rounded-lg",
      md: "size-9 rounded-xl",
      lg: "size-11 rounded-xl",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHighlightIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHighlightValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-2xl font-semibold tracking-tight tabular-nums",
      md: "text-3xl font-semibold tracking-tight tabular-nums",
      lg: "text-4xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHighlightDescVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHighlightTrendIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export type CardStatHighlightVariant =
  | "primary"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "sky"
  | "white"

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
        white: "bg-highlight-white text-highlight-white-foreground",
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
  const isWhiteVariant = variant === "white"

  const overlayBg = isWhiteVariant ? "bg-muted/10" : "bg-white/20"
  const circleBg = isWhiteVariant ? "bg-muted/10" : "bg-white/10"
  const circleBg2 = isWhiteVariant ? "bg-muted/5" : "bg-white/5"

  const decorativeCircles = (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-32 rounded-full",
          circleBg
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-4 -bottom-12 size-40 rounded-full",
          circleBg2
        )}
      />
    </>
  )

  const skeletonBg = isWhiteVariant ? undefined : "bg-white/20"

  if (loading) {
    return (
      <Card
        size="sm"
        className={cn(cardStatHighlightVariants({ variant }), className)}
      >
        {decorativeCircles}
        <CardHeader className="relative flex flex-row items-start justify-between">
          <Skeleton className={cn("h-3 w-24", skeletonBg)} />
          <Skeleton
            className={cn(cardStatHighlightBoxVariants({ size }), skeletonBg)}
          />
        </CardHeader>
        <CardContent className="relative flex flex-col gap-2">
          <Skeleton className={cn("h-9 w-40", skeletonBg)} />
          <Skeleton className={cn("h-5 w-32", skeletonBg)} />
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
          <span className={cn("opacity-75", cardStatLabelVariants({ size }))}>
            {label}
          </span>
          {Icon && (
            <CardAction>
              <div
                className={cn(
                  "flex items-center justify-center",
                  cardStatHighlightBoxVariants({ size }),
                  overlayBg
                )}
              >
                <Icon className={cardStatHighlightIconVariants({ size })} />
              </div>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="relative">
          <CardStatEmptySlot
            icon={BarChart2Icon}
            message="No spotlight yet"
            sub="Your headline KPI will appear here"
            inverted={!isWhiteVariant}
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
        <span className={cn("opacity-75", cardStatLabelVariants({ size }))}>
          {label}
        </span>
        {Icon && (
          <CardAction>
            <div
              className={cn(
                "flex items-center justify-center",
                cardStatHighlightBoxVariants({ size }),
                overlayBg
              )}
            >
              <Icon className={cardStatHighlightIconVariants({ size })} />
            </div>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="relative flex flex-col gap-1.5">
        <p className={cardStatHighlightValueVariants({ size })}>{display}</p>
        {(trendDir || description) && (
          <p
            className={cn(
              "flex items-center gap-1.5 opacity-80",
              cardStatHighlightDescVariants({ size })
            )}
          >
            {TrendIcon && (
              <TrendIcon
                className={cn(
                  cardStatHighlightTrendIconVariants({ size }),
                  "shrink-0"
                )}
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
