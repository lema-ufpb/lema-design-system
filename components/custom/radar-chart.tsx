"use client"

import * as React from "react"
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { cva } from "class-variance-authority"
import { Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"

// ── Types ──────────────────────────────────────────────────────────────────

export type RadarGridShape = "polygon" | "circle"
export type LegendPosition = "top" | "bottom" | "left" | "right"

export interface RadarChartKey {
  key: string
  label?: string
  /** Defaults to the next --chart-N token */
  color?: string
  /**
   * Fill the area of this series with a semi-transparent color.
   * When omitted, falls back to the component-level `filled` prop.
   */
  filled?: boolean
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, string | number>[]
  /** Keys to plot — accepts plain strings or { key, label, color, filled } objects */
  dataKeys: RadarChartKey[] | string[]
  /** Object key whose values become the axis spoke labels */
  categoryKey: string
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  /** Fill each radar area with a semi-transparent color (default: true) */
  filled?: boolean
  /** Fill opacity applied to every filled series (default: 0.18) */
  fillOpacity?: number
  /** Show a dot at each data vertex */
  dots?: boolean
  /** Background grid shape (default: "polygon") */
  gridShape?: RadarGridShape
  /** Show the radial value axis ticks */
  showRadiusAxis?: boolean
  height?: number
  showLegend?: boolean
  /** @default "bottom" */
  legendPosition?: LegendPosition
  showTooltip?: boolean
  /** Format radial axis ticks and tooltip values */
  valueFormatter?: (value: number) => string
  /** Show animated skeleton in place of the chart while data loads */
  loading?: boolean
  locale?: UILocale
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const LEGEND_LAYOUT: Record<
  LegendPosition,
  {
    verticalAlign: "top" | "middle" | "bottom"
    align: "left" | "center" | "right"
    layout: "horizontal" | "vertical"
  }
> = {
  top: { verticalAlign: "top", align: "center", layout: "horizontal" },
  bottom: { verticalAlign: "bottom", align: "center", layout: "horizontal" },
  left: { verticalAlign: "middle", align: "left", layout: "vertical" },
  right: { verticalAlign: "middle", align: "right", layout: "vertical" },
}

// ── Skeleton ───────────────────────────────────────────────────────────────

// 6 outer points at 60-degree intervals starting from top
const RADAR_OUTER = [
  [50, 12],
  [82, 31],
  [82, 69],
  [50, 88],
  [18, 69],
  [18, 31],
] as [number, number][]

function scalePolygon(pts: [number, number][], scale: number): string {
  return pts
    .map(([x, y]) => `${50 + (x - 50) * scale},${50 + (y - 50) * scale}`)
    .join(" ")
}

const RADAR_DATA_RADII = [0.65, 0.82, 0.55, 0.78, 0.6, 0.72]

interface RadarChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function RadarChartSkeleton({
  height = 300,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: RadarChartSkeletonProps) {
  const dataPoints = RADAR_OUTER.map(([x, y], i) => {
    const r = RADAR_DATA_RADII[i]
    return `${50 + (x - 50) * r},${50 + (y - 50) * r}` as string
  }).join(" ")

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="radar-chart-skeleton"
    >
      {(hasTitle || hasSubtitle) && (
        <div className="flex flex-col gap-1.5 px-1 pb-4">
          {hasTitle && (
            <Skeleton
              className="h-3.5 w-44 rounded-md"
              style={{ animationDelay: "0s" }}
            />
          )}
          {hasSubtitle && (
            <Skeleton
              className="mt-0.5 h-2.5 w-28 rounded-md"
              style={{ animationDelay: "0.1s" }}
            />
          )}
        </div>
      )}

      <div className="flex items-center justify-center" style={{ height }}>
        <svg
          viewBox="0 0 100 100"
          width={Math.min(height, 260)}
          height={Math.min(height, 260)}
        >
          {/* Concentric polygon rings */}
          {[0.3, 0.55, 0.78, 1.0].map((s, i) => (
            <polygon
              key={i}
              points={scalePolygon(RADAR_OUTER, s)}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="0.8"
              opacity={0.6}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {/* Axis spokes */}
          {RADAR_OUTER.map(([x, y], i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="var(--muted)"
              strokeWidth="0.6"
              opacity={0.5}
            />
          ))}
          {/* Data polygon */}
          <polygon
            points={dataPoints}
            fill="var(--muted)"
            fillOpacity={0.2}
            stroke="var(--muted)"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          {/* Vertex dots */}
          {RADAR_OUTER.map(([x, y], i) => {
            const r = RADAR_DATA_RADII[i]
            return (
              <circle
                key={i}
                cx={50 + (x - 50) * r}
                cy={50 + (y - 50) * r}
                r="2"
                fill="var(--muted)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            )
          })}
        </svg>
      </div>

      {hasFooter && (
        <div className="mt-4 flex items-center gap-2 border-t border-border px-1 pt-3">
          <Skeleton
            className="h-3.5 w-3.5 shrink-0 rounded-full"
            style={{ animationDelay: "0.7s" }}
          />
          <Skeleton
            className="h-2.5 w-36 rounded-md"
            style={{ animationDelay: "0.8s" }}
          />
          <Skeleton
            className="ml-auto h-2.5 w-20 rounded-md"
            style={{ animationDelay: "0.9s" }}
          />
        </div>
      )}
    </div>
  )
}

// ── Variants ───────────────────────────────────────────────────────────────

const chartWrapperVariants = cva("flex w-full flex-col")

const chartHeaderVariants = cva("flex flex-col px-1 pb-4")

const chartTitleVariants = cva(
  "text-sm leading-tight font-semibold text-foreground"
)

const chartSubtitleVariants = cva("mt-0.5 text-xs text-muted-foreground")

const chartFooterVariants = cva(
  "mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground"
)

// ── Custom Tooltip ─────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string
  value: number
  stroke: string
  color: string
}

function ChartTooltip({
  active,
  payload,
  label,
  fmt,
}: {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
  fmt: (v: number) => string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="min-w-36 rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="mb-1.5 text-xs font-semibold text-foreground">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="inline-block size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.stroke ?? entry.color }}
            />
            <span className="text-xs text-muted-foreground">{entry.name}</span>
            <span className="ml-auto pl-6 text-xs font-semibold text-foreground tabular-nums">
              {fmt(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Custom Legend ──────────────────────────────────────────────────────────

interface LegendPayloadEntry {
  value: string
  color: string
}

function ChartLegend({
  payload,
  hiddenSeries,
  onToggle,
  vertical = false,
}: {
  payload?: LegendPayloadEntry[]
  hiddenSeries?: Set<string>
  onToggle?: (name: string) => void
  vertical?: boolean
}) {
  if (!payload?.length) return null

  return (
    <div
      className={cn(
        "flex gap-y-1",
        vertical
          ? "flex-col px-2 py-1"
          : "flex-wrap items-center justify-center gap-x-4 pt-3"
      )}
    >
      {payload.map((entry, i) => {
        const hidden = hiddenSeries?.has(entry.value)
        return (
          <div
            key={entry.value ?? i}
            role="button"
            tabIndex={0}
            aria-pressed={hidden}
            onClick={() => onToggle?.(entry.value)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onToggle?.(entry.value)
            }
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 select-none",
              "transition-opacity focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
              hidden ? "opacity-40" : "hover:opacity-70"
            )}
          >
            <span
              className="inline-block size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function normalizeKeys(
  raw: RadarChartKey[] | string[]
): Required<RadarChartKey>[] {
  return raw.map((k, i) => {
    const color = CHART_COLORS[i % CHART_COLORS.length]
    if (typeof k === "string")
      return {
        key: k,
        label: k,
        color,
        filled: undefined as unknown as boolean,
      }
    return {
      label: k.key,
      filled: undefined as unknown as boolean,
      ...k,
      color: k.color ?? color,
    }
  })
}

// ── RadarChart ─────────────────────────────────────────────────────────────

export function RadarChart({
  data,
  dataKeys,
  categoryKey,
  title,
  subtitle,
  footer,
  filled = true,
  fillOpacity = 0.18,
  dots = false,
  gridShape = "polygon",
  showRadiusAxis = false,
  height = 300,
  showLegend = false,
  legendPosition = "bottom",
  showTooltip = true,
  valueFormatter,
  loading = false,
  locale = "en-US",
  format,
  decimals,
  currency,
  abbreviate,
  className,
  ...props
}: RadarChartProps) {
  // Hooks must be called unconditionally before any early returns
  const fmt = React.useCallback(
    (v: number) =>
      formatChartValue(v, {
        format,
        decimals,
        locale,
        currency,
        abbreviate,
        valueFormatter,
      }),
    [valueFormatter, format, decimals, locale, currency, abbreviate]
  )

  const [hiddenSeries, setHiddenSeries] = React.useState<Set<string>>(new Set())
  const toggleSeries = React.useCallback((name: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  if (loading) {
    return (
      <RadarChartSkeleton
        height={height}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        className={className}
      />
    )
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(chartWrapperVariants(), className)}
        data-slot="radar-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div className={chartHeaderVariants()} data-slot="radar-chart-header">
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="radar-chart-empty"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Target className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {UI_I18N[locale].emptyState.noData}
            </p>
            <p className="mt-0.5 text-xs">
              {UI_I18N[locale].emptyState.dataWillAppear}
            </p>
          </div>
        </div>
        {footer && (
          <div className={chartFooterVariants()} data-slot="radar-chart-footer">
            {footer}
          </div>
        )}
      </div>
    )
  }

  const keys = normalizeKeys(dataKeys)
  const axisStyle = { fontSize: 12, fill: "var(--muted-foreground)" }

  return (
    <div
      className={cn(chartWrapperVariants(), className)}
      data-slot="radar-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="radar-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer
        width="100%"
        height={height}
        data-slot="radar-chart-chart"
      >
        <RechartsRadarChart
          data={data}
          margin={{ top: 12, right: 24, bottom: 12, left: 24 }}
        >
          <PolarGrid gridType={gridShape} stroke="var(--border)" radialLines />

          <PolarAngleAxis
            dataKey={categoryKey}
            tick={axisStyle}
            tickLine={false}
          />

          {showRadiusAxis && (
            <PolarRadiusAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={fmt}
            />
          )}

          {showTooltip && <Tooltip content={<ChartTooltip fmt={fmt} />} />}

          {showLegend && (
            <Legend
              {...LEGEND_LAYOUT[legendPosition]}
              content={({ payload }) => (
                <ChartLegend
                  payload={payload as LegendPayloadEntry[]}
                  hiddenSeries={hiddenSeries}
                  onToggle={toggleSeries}
                  vertical={
                    legendPosition === "left" || legendPosition === "right"
                  }
                />
              )}
            />
          )}

          {keys.map((k) => {
            const isFilled = k.filled !== undefined ? k.filled : filled
            return (
              <Radar
                key={k.key}
                dataKey={k.key}
                name={k.label ?? k.key}
                stroke={k.color}
                strokeWidth={2}
                fill={isFilled ? k.color : "transparent"}
                fillOpacity={isFilled ? fillOpacity : 0}
                dot={
                  dots
                    ? {
                        r: 3,
                        fill: k.color,
                        stroke: "var(--card)",
                        strokeWidth: 2,
                      }
                    : false
                }
                hide={hiddenSeries.has(k.label ?? k.key)}
              />
            )
          })}
        </RechartsRadarChart>
      </ResponsiveContainer>

      {footer && (
        <div className={chartFooterVariants()} data-slot="radar-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
