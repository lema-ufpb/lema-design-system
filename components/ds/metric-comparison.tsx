"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Variants ──

export const metricComparisonVariants = cva(
  "flex flex-col gap-3 rounded-xl border border-border bg-card p-4",
  {
    variants: {
      size: {
        sm: "gap-2 p-3",
        md: "gap-3 p-4",
        lg: "gap-4 p-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Types ──

export interface ComparisonItem {
  label: string
  value: number
  format?: (val: number) => string
  subtext?: string
}

export interface MetricComparisonProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricComparisonVariants> {
  /**
   * Title of comparison.
   */
  title?: string
  /**
   * Primary metric (e.g. Current period or Scenario A).
   */
  primaryMetric: ComparisonItem
  /**
   * Secondary metric (e.g. Previous period or Baseline).
   */
  secondaryMetric: ComparisonItem
  /**
   * Whether an increase is considered positive or negative.
   */
  sentiment?: "positiveIsGood" | "negativeIsGood"
  /**
   * Horizontal (side-by-side) or vertical stacked layout.
   */
  layout?: "horizontal" | "vertical"
  /**
   * Whether to display the visual relative proportion bar.
   */
  showBar?: boolean
  /**
   * Loading state.
   */
  loading?: boolean
  /**
   * Locale for translations and formatting.
   */
  locale?: UILocale
}

// ── Component ──

export const MetricComparison = React.forwardRef<
  HTMLDivElement,
  MetricComparisonProps
>(
  (
    {
      title,
      primaryMetric,
      secondaryMetric,
      sentiment = "positiveIsGood",
      layout = "horizontal",
      showBar = true,
      size = "md",
      loading = false,
      locale = "en-US",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].metricComparison

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(metricComparisonVariants({ size }), className)}
          {...props}
        >
          {title && <Skeleton className="h-4 w-32" />}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex flex-1 flex-col gap-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
            <div className="flex flex-1 flex-col items-end gap-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          {showBar && <Skeleton className="mt-1 h-2 w-full rounded-full" />}
        </div>
      )
    }

    const diff = primaryMetric.value - secondaryMetric.value
    const percentChange =
      secondaryMetric.value !== 0
        ? (diff / Math.abs(secondaryMetric.value)) * 100
        : 0

    const isPositive = diff > 0
    const isZero = diff === 0

    const isGood = sentiment === "positiveIsGood" ? isPositive : !isPositive

    const formatVal = (item: ComparisonItem) => {
      if (item.format) return item.format(item.value)
      return item.value.toLocaleString(locale)
    }

    const maxVal = Math.max(
      Math.abs(primaryMetric.value),
      Math.abs(secondaryMetric.value)
    )
    const primaryPercent =
      maxVal > 0 ? (Math.abs(primaryMetric.value) / maxVal) * 100 : 50
    const secondaryPercent =
      maxVal > 0 ? (Math.abs(secondaryMetric.value) / maxVal) * 100 : 50

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-4" : "size-3.5"

    return (
      <div
        ref={ref}
        className={cn(metricComparisonVariants({ size }), className)}
        {...props}
      >
        {title && (
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {title}
          </span>
        )}

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            layout === "vertical" && "flex-col items-stretch"
          )}
        >
          {/* Primary Metric */}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-xs font-medium text-muted-foreground">
              {primaryMetric.label}
            </span>
            <span
              className={cn(
                "truncate font-bold text-foreground tabular-nums",
                size === "sm" && "text-base",
                size === "md" && "text-xl",
                size === "lg" && "text-2xl"
              )}
            >
              {formatVal(primaryMetric)}
            </span>
            {primaryMetric.subtext && (
              <span className="truncate text-xs text-muted-foreground">
                {primaryMetric.subtext}
              </span>
            )}
          </div>

          {/* Delta Badge */}
          <div className="flex shrink-0 items-center justify-center">
            <Badge
              variant="outline"
              title={isZero ? t.noChange : isPositive ? t.increase : t.decrease}
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 font-semibold tabular-nums",
                isZero
                  ? "border-border text-muted-foreground"
                  : isGood
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
              )}
            >
              {isZero ? (
                <Minus className={iconSize} />
              ) : isPositive ? (
                <TrendingUp className={iconSize} />
              ) : (
                <TrendingDown className={iconSize} />
              )}
              <span>
                {isPositive ? "+" : ""}
                {percentChange.toFixed(1)}%
              </span>
            </Badge>
          </div>

          {/* Secondary Metric */}
          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              layout === "horizontal" && "items-end text-right"
            )}
          >
            <span className="truncate text-xs font-medium text-muted-foreground">
              {secondaryMetric.label}
            </span>
            <span
              className={cn(
                "truncate font-semibold text-muted-foreground tabular-nums",
                size === "sm" && "text-sm",
                size === "md" && "text-lg",
                size === "lg" && "text-xl"
              )}
            >
              {formatVal(secondaryMetric)}
            </span>
            {secondaryMetric.subtext && (
              <span className="truncate text-xs text-muted-foreground">
                {secondaryMetric.subtext}
              </span>
            )}
          </div>
        </div>

        {/* Comparison Bar */}
        {showBar && (
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex h-2 w-full items-center gap-1 overflow-hidden rounded-full bg-muted p-0.5">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isGood ? "bg-primary" : "bg-muted-foreground"
                )}
                style={{
                  width: `${Math.min(100, Math.max(5, primaryPercent))}%`,
                }}
              />
              <div
                className="h-full rounded-full bg-muted-foreground/30 transition-all"
                style={{
                  width: `${Math.min(100, Math.max(5, secondaryPercent))}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {primaryMetric.label}: {formatVal(primaryMetric)}
              </span>
              <span>
                {secondaryMetric.label}: {formatVal(secondaryMetric)}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)

MetricComparison.displayName = "MetricComparison"
