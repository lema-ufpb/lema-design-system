import * as React from "react"
import { cva } from "class-variance-authority"
import { ActivityIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatTrend,
  type CardStatSize,
  type FmtProps,
  applyFmt,
  resolveTrend,
  TrendBadge,
  cardStatDescriptionVariants,
} from "./card-stats-shared"

// ── Types ──
export interface CardStatCompactProps extends FmtProps {
  label: string
  value: string | number
  trend?: CardStatTrend | boolean
  trendValue?: string
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

// ── Variants ──
export const cardStatCompactValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-lg font-semibold tracking-tight tabular-nums",
      md: "text-xl font-semibold tracking-tight tabular-nums",
      lg: "text-2xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatIconBoxVariants = cva("", {
  variants: {
    size: {
      sm: "size-9 rounded-xl",
      md: "size-10 rounded-2xl",
      lg: "size-12 rounded-2xl",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatIconInnerVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
})

export function CardStatCompact({
  label,
  value,
  trend,
  trendValue,
  icon: Icon,
  size = "md",
  className,
  loading,
  empty,
  ...fmt
}: CardStatCompactProps) {
  if (loading) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-compact">
        <CardContent
          className="flex items-center gap-3 py-4"
          data-slot="card-stat-compact-skeleton"
        >
          <Skeleton
            className={cn(cardStatIconBoxVariants({ size }), "shrink-0")}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-2.5 w-20 rounded-md" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-compact">
        <CardContent
          className="flex items-center gap-3 py-4"
          data-slot="card-stat-compact-empty"
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-center bg-muted/50",
              cardStatIconBoxVariants({ size })
            )}
          >
            <ActivityIcon
              className={cn(
                cardStatIconInnerVariants({ size }),
                "text-muted-foreground/30"
              )}
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "truncate font-medium text-muted-foreground",
                cardStatDescriptionVariants({ size })
              )}
            >
              {label}
            </p>
            <p
              className={cn(
                cardStatCompactValueVariants({ size }),
                "text-muted-foreground/25"
              )}
            >
              —
            </p>
          </div>
          <span
            className={cn(
              cardStatDescriptionVariants({ size }),
              "text-muted-foreground/30"
            )}
          >
            No data
          </span>
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)

  return (
    <Card size="sm" className={className} data-slot="card-stat-compact">
      <CardContent className="flex items-center gap-3 py-4">
        {Icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center transition-colors",
              cardStatIconBoxVariants({ size }),
              trendDir === "up" && "bg-success/10",
              trendDir === "down" && "bg-destructive/10",
              !trendDir && "bg-muted"
            )}
          >
            <Icon
              className={cn(
                cardStatIconInnerVariants({ size }),
                trendDir === "up" && "text-success",
                trendDir === "down" && "text-destructive",
                !trendDir && "text-muted-foreground"
              )}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate font-medium text-muted-foreground",
              cardStatDescriptionVariants({ size })
            )}
          >
            {label}
          </p>
          <p className={cardStatCompactValueVariants({ size })}>{display}</p>
        </div>
        {trendDir && trendValue && (
          <TrendBadge trend={trendDir} value={trendValue} size={size} />
        )}
      </CardContent>
    </Card>
  )
}
