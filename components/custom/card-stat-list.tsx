import * as React from "react"
import { InboxIcon } from "lucide-react"

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

export interface CardStatListItem extends FmtProps {
  label: string
  value: string | number
  trend?: CardStatTrend | boolean
  trendValue?: string
}

export interface CardStatListProps {
  label: string
  items: CardStatListItem[]
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

const SKELETON_ROW_WIDTHS = ["w-36", "w-28", "w-40", "w-32"] as const

export function CardStatList({
  label,
  items,
  icon: Icon,
  size = "md",
  className,
  loading,
  empty,
}: CardStatListProps) {
  const s = SIZE[size]

  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className={cn(s.headerIcon, "rounded-md")} />
        </CardHeader>
        <CardContent className="p-0">
          <ul>
            {SKELETON_ROW_WIDTHS.map((w, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-center justify-between gap-3 px-4",
                  s.listRowPy,
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <Skeleton className={cn("h-3.5 rounded-md", w)} />
                <div className="flex shrink-0 items-center gap-2">
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                  <Skeleton className="h-3.5 w-10 rounded-md" />
                </div>
              </li>
            ))}
          </ul>
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
        <CardContent>
          <CardStatEmptySlot
            icon={InboxIcon}
            message="List is empty"
            sub="Add metrics to start tracking"
          />
        </CardContent>
      </Card>
    )
  }

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
      <CardContent className="p-0">
        <ul>
          {items.map((item, i) => {
            const display = applyFmt(item.value, item)
            const trendDir = resolveTrend(item.trend)
            const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null
            const trendCls =
              trendDir === "up"
                ? "text-success"
                : trendDir === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"

            return (
              <li
                key={`${item.label}-${i}`}
                className={cn(
                  "flex items-center justify-between gap-3 px-4",
                  s.listRowPy,
                  "transition-colors hover:bg-muted/40",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <span
                  className={cn("truncate text-muted-foreground", s.listText)}
                >
                  {item.label}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={s.listValue}>{display}</span>
                  {trendDir && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5",
                        s.description,
                        trendCls
                      )}
                    >
                      {TrendIcon && (
                        <TrendIcon
                          className={cn(s.badgeIcon, "shrink-0")}
                          aria-hidden
                        />
                      )}
                      {item.trendValue && (
                        <span className="font-medium">{item.trendValue}</span>
                      )}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
