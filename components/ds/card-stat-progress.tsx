import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatSize,
  type FormatOptions,
  applyFormat,
  formatValue,
  cardStatLabelVariants,
  cardStatValueVariants,
  cardStatDescriptionVariants,
  cardStatHeaderIconVariants,
  cardStatContentGapVariants,
} from "@/lib/card-stats-shared"

// ── Variants ──
export const cardStatTrackHVariants = cva("", {
  variants: {
    size: {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: { size: "md" },
})

export interface CardStatProgressProps extends FormatOptions {
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
  locale: pctLocale,
  ...fmt
}: CardStatProgressProps) {
  if (loading) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-progress">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent
          className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
        >
          <div className="flex items-baseline justify-between gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <Skeleton
            className={cn(cardStatTrackHVariants({ size }), "rounded-full")}
          />
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
      <Card size="sm" className={className} data-slot="card-stat-progress">
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
        <CardContent
          className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
        >
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                cardStatValueVariants({ size }),
                "text-muted-foreground/25"
              )}
            >
              —
            </p>
            <span
              className={cn(
                "shrink-0 text-muted-foreground/25",
                cardStatDescriptionVariants({ size })
              )}
            >
              / —
            </span>
          </div>
          <div
            className={cn(
              cardStatTrackHVariants({ size }),
              "w-full rounded-full border border-dashed border-muted-foreground/20"
            )}
          />
          <p
            className={cn(
              "text-center text-muted-foreground/50",
              cardStatDescriptionVariants({ size })
            )}
          >
            {pctLocale
              ? UI_I18N[pctLocale as UILocale].cardStatProgress.noGoalSet
              : "No goal set yet"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const displayValue = applyFormat(value, { locale: pctLocale, ...fmt })
  const displayGoal = applyFormat(goal, { locale: pctLocale, ...fmt })
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
    <Card size="sm" className={className} data-slot="card-stat-progress">
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
      <CardContent
        className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className={cardStatValueVariants({ size })}>{displayValue}</p>
          <span
            className={cn(
              "shrink-0 text-muted-foreground",
              cardStatDescriptionVariants({ size })
            )}
          >
            / {displayGoal}
          </span>
        </div>
        <Progress
          value={pct}
          className={cn(cardStatTrackHVariants({ size }), barColor)}
        />
        <div className="flex items-center justify-between">
          {description && (
            <p
              className={cn(
                "text-muted-foreground",
                cardStatDescriptionVariants({ size })
              )}
            >
              {description}
            </p>
          )}
          {showPercent && (
            <p
              className={cn(
                "ml-auto font-semibold tabular-nums",
                cardStatDescriptionVariants({ size }),
                pctColor
              )}
            >
              {formatValue(pct / 100, "percent", {
                decimals: 0,
                locale: pctLocale,
              })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
