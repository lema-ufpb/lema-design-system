import * as React from "react"
import { ArrowLeftRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useOptionalUILocale } from "@/components/ds/locale-provider"

import {
  type CardStatTrend,
  type CardStatSize,
  type FormatOptions,
  applyFormat,
  TrendBadge,
  formatValue,
  cardStatLabelVariants,
  cardStatValueVariants,
  cardStatDescriptionVariants,
  cardStatHeaderIconVariants,
  cardStatContentGapVariants,
} from "@/lib/card-stats-shared"

export interface CardStatComparisonProps extends FormatOptions {
  label: string
  current: number
  previous: number
  currentLabel?: string
  previousLabel?: string
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatComparison({
  label,
  current,
  previous,
  currentLabel,
  previousLabel,
  icon: Icon,
  size = "sm",
  className,
  loading,
  empty,
  locale: fmtLocaleProp,
  ...fmt
}: CardStatComparisonProps) {
  const fmtLocale = useOptionalUILocale(fmtLocaleProp)
  const uiLocale = (fmtLocale ?? "en-US") as UILocale
  currentLabel ??= UI_I18N[uiLocale].cardStats.thisPeriod
  previousLabel ??= UI_I18N[uiLocale].cardStats.lastPeriod

  if (loading) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-comparison">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent
          className={cn("flex flex-col", cardStatContentGapVariants({ size }))}
          data-slot="card-stat-comparison-skeleton"
        >
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1.5 pr-4">
              <Skeleton className="h-2.5 w-20 rounded-md" />
              <Skeleton className="h-7 w-24" />
            </div>
            <div className="flex flex-col gap-1.5 border-l pl-4">
              <Skeleton className="h-2.5 w-20 rounded-md" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-comparison">
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
          data-slot="card-stat-comparison-empty"
        >
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-0.5 pr-4">
              <p
                className={cn(
                  "text-muted-foreground",
                  cardStatLabelVariants({ size })
                )}
              >
                {currentLabel}
              </p>
              <p
                className={cn(
                  cardStatValueVariants({ size }),
                  "text-muted-foreground/25"
                )}
              >
                —
              </p>
            </div>
            <div className="flex flex-col gap-0.5 border-l pl-4">
              <p
                className={cn(
                  "text-muted-foreground",
                  cardStatLabelVariants({ size })
                )}
              >
                {previousLabel}
              </p>
              <p
                className={cn(
                  cardStatValueVariants({ size }),
                  "text-muted-foreground/20"
                )}
              >
                —
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-muted/30 px-3 py-2">
            <ArrowLeftRightIcon
              className="size-3 text-muted-foreground/40"
              aria-hidden
            />
            <span
              className={cn(
                "text-muted-foreground/50",
                cardStatDescriptionVariants({ size })
              )}
            >
              {UI_I18N[uiLocale].cardStats.noComparison}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const f = (v: number) => applyFormat(v, { ...fmt, locale: fmtLocale })
  const delta =
    previous !== 0 ? ((current - previous) / Math.abs(previous)) * 100 : 0
  const trendDir: CardStatTrend =
    delta > 0.05 ? "up" : delta < -0.05 ? "down" : "neutral"
  const deltaLabel = `${delta > 0 ? "+" : ""}${formatValue(Math.abs(delta) / 100, "percent", { decimals: 1, locale: fmtLocale })}`

  return (
    <Card size="sm" className={className} data-slot="card-stat-comparison">
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
        data-slot="card-stat-comparison"
      >
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-0.5 pr-4">
            <p
              className={cn(
                "text-muted-foreground",
                cardStatLabelVariants({ size })
              )}
            >
              {currentLabel}
            </p>
            <p className={cardStatValueVariants({ size })}>{f(current)}</p>
          </div>
          <div className="flex flex-col gap-0.5 border-l pl-4">
            <p
              className={cn(
                "text-muted-foreground",
                cardStatLabelVariants({ size })
              )}
            >
              {previousLabel}
            </p>
            <p
              className={cn(
                cardStatValueVariants({ size }),
                "text-muted-foreground/60"
              )}
            >
              {f(previous)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
          <TrendBadge trend={trendDir} value={deltaLabel} size={size} />
          <span
            className={cn(
              "text-muted-foreground",
              cardStatDescriptionVariants({ size })
            )}
          >
            vs {previousLabel.toLowerCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
