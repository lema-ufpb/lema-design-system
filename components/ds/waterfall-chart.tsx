"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ── Types ──────────────────────────────────────────────────────────────────

export type WaterfallEntryType = "start" | "positive" | "negative" | "end"

export interface WaterfallEntry {
  name: string
  value: number
  /** "start" = first total bar, "end" = final total bar, "positive" = gain, "negative" = loss */
  type?: WaterfallEntryType
}

export interface WaterfallChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: WaterfallEntry[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const waterfallChartContainerVariants = cva("w-full", {
  variants: {},
})

// ── Helpers ────────────────────────────────────────────────────────────────

interface WaterfallBarData {
  name: string
  value: number
  type: WaterfallEntryType
  /** Y offset for the floating bar */
  base: number
  /** Display value (absolute) for labels */
  displayValue: number
}

function computeWaterfallData(entries: WaterfallEntry[]): WaterfallBarData[] {
  let running = 0
  return entries.map((entry, i) => {
    const type = entry.type ?? (i === 0 ? "start" : "positive")
    const isTotal = type === "start" || type === "end"

    let base = 0
    let value = entry.value

    if (isTotal) {
      base = 0
      value = entry.value
    } else if (type === "positive") {
      base = running
      value = entry.value
    } else {
      // negative
      base = running + entry.value // entry.value is negative
      value = -entry.value // height is positive
    }

    if (isTotal) {
      running = entry.value
    } else {
      running += entry.value
    }

    return {
      name: entry.name,
      value,
      type,
      base,
      displayValue: entry.value,
    }
  })
}

// ── WaterfallChart ─────────────────────────────────────────────────────────

export function WaterfallChart({
  data,
  title,
  subtitle,
  footer,
  height = 320,
  showGrid = true,
  showTooltip = true,
  valueFormatter,
  format,
  decimals = 0,
  currency = "USD",
  abbreviate = false,
  loading = false,
  locale: localeProp,
  className,
  ...props
}: WaterfallChartProps) {
  const locale = useUILocale(localeProp)
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

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <CardHeader>
            {title && <Skeleton className="h-5 w-48" />}
            {subtitle && <Skeleton className="mt-1 h-4 w-64" />}
          </CardHeader>
        )}
        <CardContent>
          <Skeleton className="w-full rounded-lg" style={{ height }} />
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  // ── Empty ────────────────────────────────────────────────────────────────

  if (data.length === 0) {
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
            {UI_I18N[locale].emptyState.noData}
          </div>
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  // ── Compute ──────────────────────────────────────────────────────────────

  const computed = computeWaterfallData(data)

  const chartConfig: Record<string, { label: string; color: string }> = {
    value: { label: "Value", color: "var(--chart-1)" },
  }

  // Recharts trick: use a "base" invisible bar (no fill) to shift the real bar
  const rechartsData = computed.map((d) => ({
    name: d.name,
    base: d.base,
    value: d.value,
    type: d.type,
    displayValue: d.displayValue,
  }))

  const getBarColor = (type: WaterfallEntryType) => {
    if (type === "start" || type === "end") return "var(--muted-foreground)"
    if (type === "positive") return "var(--chart-1)"
    return "var(--destructive)"
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height }}>
          <RechartsBarChart
            data={rechartsData}
            margin={{ top: 16, right: 16, left: 0, bottom: 4 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
            )}
            <XAxis
              dataKey="name"
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatValue}
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            {showTooltip && (
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => {
                      const display = item.payload?.displayValue ?? value
                      return formatValue(Number(display))
                    }}
                    labelClassName="font-medium text-foreground"
                  />
                }
              />
            )}
            {/* Invisible "base" bar to lift the real bar */}
            <Bar dataKey="base" stackId="waterfall" fill="transparent" />
            {/* Real bar */}
            <Bar dataKey="value" stackId="waterfall" radius={[3, 3, 0, 0]}>
              {rechartsData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={getBarColor(entry.type as WaterfallEntryType)}
                  fillOpacity={
                    entry.type === "start" || entry.type === "end" ? 0.6 : 1
                  }
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
