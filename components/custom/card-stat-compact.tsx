import * as React from "react"
import { ActivityIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatTrend,
  type CardStatSize,
  type FmtProps,
  SIZE,
  applyFmt,
  resolveTrend,
  TrendBadge,
} from "./card-stats-shared"

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
  const s = SIZE[size]

  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardContent className="flex items-center gap-3 py-4">
          <Skeleton className={cn(s.iconBox, "shrink-0")} />
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
      <Card size="sm" className={className}>
        <CardContent className="flex items-center gap-3 py-4">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center bg-muted/50",
              s.iconBox
            )}
          >
            <ActivityIcon
              className={cn(s.iconInner, "text-muted-foreground/30")}
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "truncate font-medium text-muted-foreground",
                s.description
              )}
            >
              {label}
            </p>
            <p className={cn(s.compactValue, "text-muted-foreground/25")}>—</p>
          </div>
          <span className={cn(s.description, "text-muted-foreground/30")}>
            No data
          </span>
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)

  return (
    <Card size="sm" className={className}>
      <CardContent className="flex items-center gap-3 py-4">
        {Icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center transition-colors",
              s.iconBox,
              trendDir === "up" && "bg-success/10",
              trendDir === "down" && "bg-destructive/10",
              !trendDir && "bg-muted"
            )}
          >
            <Icon
              className={cn(
                s.iconInner,
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
              s.description
            )}
          >
            {label}
          </p>
          <p className={s.compactValue}>{display}</p>
        </div>
        {trendDir && trendValue && (
          <TrendBadge trend={trendDir} value={trendValue} size={size} />
        )}
      </CardContent>
    </Card>
  )
}
