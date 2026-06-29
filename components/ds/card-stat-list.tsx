import * as React from "react"
import { cva } from "class-variance-authority"
import { InboxIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatTrend,
  type CardStatSize,
  type FormatOptions,
  applyFormat,
  resolveTrend,
  TREND_ICONS,
  CardStatEmptySlot,
  cardStatLabelVariants,
  cardStatDescriptionVariants,
  cardStatHeaderIconVariants,
} from "@/lib/card-stats-shared"

// ── Variants ──
export const cardStatListRowPyVariants = cva("", {
  variants: {
    size: {
      sm: "py-2",
      md: "py-2.5",
      lg: "py-3",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatListTextVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs font-medium",
      md: "text-sm font-medium",
      lg: "text-base font-medium",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatListValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs font-semibold tabular-nums",
      md: "text-sm font-semibold tabular-nums",
      lg: "text-base font-semibold tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatListBadgeIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-2.5",
      md: "size-3",
      lg: "size-3.5",
    },
  },
  defaultVariants: { size: "md" },
})

export interface CardStatListItem extends FormatOptions {
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
  if (loading) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-list">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent className="p-0" data-slot="card-stat-list-skeleton">
          <ul>
            {SKELETON_ROW_WIDTHS.map((w, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-center justify-between gap-3 px-4",
                  cardStatListRowPyVariants({ size }),
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
      <Card size="sm" className={className} data-slot="card-stat-list">
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
              <Icon
                className={cardStatHeaderIconVariants({ size })}
                aria-hidden
              />
            </CardAction>
          )}
        </CardHeader>
        <CardContent data-slot="card-stat-list-empty">
          <CardStatEmptySlot
            icon={InboxIcon}
            message="List is empty"
            sub="Add metrics to start tracking"
            size={size}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card size="sm" className={className} data-slot="card-stat-list">
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
            <Icon
              className={cardStatHeaderIconVariants({ size })}
              aria-hidden
            />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {items.map((item, i) => {
            const display = applyFormat(item.value, item)
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
                  cardStatListRowPyVariants({ size }),
                  "transition-colors hover:bg-muted/40",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <span
                  className={cn(
                    "truncate text-muted-foreground",
                    cardStatListTextVariants({ size })
                  )}
                >
                  {item.label}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={cardStatListValueVariants({ size })}>
                    {display}
                  </span>
                  {trendDir && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5",
                        cardStatDescriptionVariants({ size }),
                        trendCls
                      )}
                    >
                      {TrendIcon && (
                        <TrendIcon
                          className={cn(
                            cardStatListBadgeIconVariants({ size }),
                            "shrink-0"
                          )}
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
