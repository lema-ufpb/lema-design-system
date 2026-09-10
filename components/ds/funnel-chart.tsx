"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FunnelStage {
  name: string
  value: number
  /** Override bar color — accepts CSS custom property or hex. Defaults to --chart-N */
  color?: string
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FunnelStage[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  /** Chart canvas height in px */
  height?: number
  /** Show value labels inside/beside each bar */
  showLabels?: boolean
  /** Show conversion rate between consecutive stages */
  showPercentage?: boolean
  /** Custom value formatter — overrides format/decimals/locale/currency */
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const funnelChartContainerVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {},
  }
)

// ── Constants ──────────────────────────────────────────────────────────────

/** CSS chart tokens, cycled when more than 5 stages */
const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const SKELETON_WIDTHS = ["85%", "70%", "55%", "40%", "28%"]

// ── FunnelChart ────────────────────────────────────────────────────────────

export function FunnelChart({
  data,
  title,
  subtitle,
  footer,
  height = 300,
  showLabels = true,
  showPercentage = true,
  valueFormatter,
  format,
  decimals = 0,
  currency = "USD",
  abbreviate = false,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: FunnelChartProps) {
  const formatValue = React.useCallback(
    (v: number) => {
      if (valueFormatter) return valueFormatter(v)
      return formatChartValue(v, {
        format,
        decimals,
        locale,
        currency,
        abbreviate,
      })
    },
    [valueFormatter, format, decimals, locale, currency, abbreviate]
  )

  const maxValue = data.length > 0 ? Math.max(...data.map((s) => s.value)) : 1

  // ── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <CardHeader>
            {title && <Skeleton className="h-5 w-40" />}
            {subtitle && <Skeleton className="mt-1 h-4 w-56" />}
          </CardHeader>
        )}
        <CardContent>
          <div
            className="flex flex-col items-center gap-2"
            style={{ height }}
            aria-hidden="true"
          >
            {SKELETON_WIDTHS.map((w, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1"
                style={{ width: "100%", flex: 1 }}
              >
                <Skeleton
                  className="rounded-md"
                  style={{ width: w, height: "100%" }}
                />
              </div>
            ))}
          </div>
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  // ── Empty ─────────────────────────────────────────────────────────────────

  if (data.length === 0) {
    const t = UI_I18N[locale]
    return (
      <Card className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div
            className="flex items-center justify-center text-sm text-muted-foreground"
            style={{ height }}
          >
            {t.emptyState.noData}
          </div>
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  // ── Computed values ───────────────────────────────────────────────────────

  const barHeightPerStage = Math.floor(
    (height - (data.length - 1) * 8) / data.length
  )

  return (
    <Card className={cn("w-full", className)} {...props}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div
          role="img"
          aria-label={title ?? "Funnel chart"}
          className={funnelChartContainerVariants()}
          style={{ height }}
        >
          <div className="flex h-full flex-col items-center gap-2">
            {data.map((stage, i) => {
              const widthPct =
                maxValue > 0 ? Math.max(10, (stage.value / maxValue) * 100) : 10
              const color = stage.color ?? CHART_COLORS[i % CHART_COLORS.length]
              const conversionRate =
                i > 0 && data[i - 1]!.value > 0
                  ? (stage.value / data[i - 1]!.value) * 100
                  : null

              return (
                <React.Fragment key={stage.name}>
                  {/* Conversion rate between stages */}
                  {showPercentage && conversionRate !== null && (
                    <div className="flex items-center justify-center text-xs text-muted-foreground">
                      ↓{" "}
                      {new Intl.NumberFormat(locale, {
                        style: "percent",
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      }).format(conversionRate / 100)}
                    </div>
                  )}
                  {/* Stage bar */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: "100%",
                      height: barHeightPerStage,
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-md transition-all"
                      style={{
                        width: `${widthPct}%`,
                        height: "100%",
                        backgroundColor: color,
                      }}
                    >
                      {showLabels && (
                        <span className="truncate px-2 text-xs font-semibold text-white tabular-nums [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
                          {stage.name}: {formatValue(stage.value)}
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
