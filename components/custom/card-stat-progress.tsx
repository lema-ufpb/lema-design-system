import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatSize,
  type FmtProps,
  SIZE,
  applyFmt,
} from "./card-stats-shared"

export interface CardStatProgressProps extends FmtProps {
  label: string
  value: number
  goal: number
  description?: string
  icon?: React.ElementType
  showPercent?: boolean
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatProgress({
  label,
  value,
  goal,
  description,
  icon: Icon,
  showPercent = true,
  size = "md",
  className,
  loading,
  empty,
  ...fmt
}: CardStatProgressProps) {
  const s = SIZE[size]

  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className={cn(s.headerIcon, "rounded-md")} />
        </CardHeader>
        <CardContent className={cn("flex flex-col", s.contentGap)}>
          <div className="flex items-baseline justify-between gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <Skeleton className={cn(s.trackH, "rounded-full")} />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-32 rounded-md" />
            <Skeleton className="h-3 w-8 rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className={cn("truncate text-muted-foreground", s.label)}>
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className={s.headerIcon} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className={cn("flex flex-col", s.contentGap)}>
          <div className="flex items-baseline justify-between gap-2">
            <p className={cn(s.value, "text-muted-foreground/25")}>—</p>
            <span
              className={cn("shrink-0 text-muted-foreground/25", s.description)}
            >
              / —
            </span>
          </div>
          <div
            className={cn(
              s.trackH,
              "w-full rounded-full border border-dashed border-muted-foreground/20"
            )}
          />
          <p
            className={cn(
              "text-center text-muted-foreground/50",
              s.description
            )}
          >
            No goal set yet
          </p>
        </CardContent>
      </Card>
    )
  }

  const displayValue = applyFmt(value, fmt)
  const displayGoal = applyFmt(goal, fmt)
  const pct = Math.min(100, Math.round((value / goal) * 100))

  const pctColor =
    pct >= 100
      ? "text-success"
      : pct >= 75
        ? "text-highlight-sky"
        : pct >= 50
          ? "text-warning"
          : "text-muted-foreground"

  const barColor =
    pct >= 100
      ? "[&>[data-slot=progress-indicator]]:bg-success"
      : pct >= 75
        ? "[&>[data-slot=progress-indicator]]:bg-highlight-sky"
        : pct >= 50
          ? "[&>[data-slot=progress-indicator]]:bg-warning"
          : ""

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className={cn("truncate text-muted-foreground", s.label)}>
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className={s.headerIcon} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className={cn("flex flex-col", s.contentGap)}>
        <div className="flex items-baseline justify-between gap-2">
          <p className={s.value}>{displayValue}</p>
          <span className={cn("shrink-0 text-muted-foreground", s.description)}>
            / {displayGoal}
          </span>
        </div>
        <Progress value={pct} className={cn(s.trackH, barColor)} />
        <div className="flex items-center justify-between">
          {description && (
            <p className={cn("text-muted-foreground", s.description)}>
              {description}
            </p>
          )}
          {showPercent && (
            <p
              className={cn(
                "ml-auto font-semibold tabular-nums",
                s.description,
                pctColor
              )}
            >
              {pct}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
