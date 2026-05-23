"use client"

import * as React from "react"
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Crosshair } from "lucide-react"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export type LegendPosition = "top" | "bottom" | "left" | "right"
export type ScatterDotShape =
  | "circle"
  | "cross"
  | "diamond"
  | "square"
  | "star"
  | "triangle"
  | "wye"

export interface ScatterPoint {
  x: number
  y: number
  /** Optional third dimension — encodes dot size when z values are present in any series */
  z?: number
  [key: string]: string | number | undefined
}

export interface ScatterSeries {
  name: string
  data: ScatterPoint[]
  /** Overrides the auto --chart-N color */
  color?: string
  /** @default "circle" */
  shape?: ScatterDotShape
}

export interface ScatterChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: ScatterSeries[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  /** @default "bottom" */
  legendPosition?: LegendPosition
  showTooltip?: boolean
  /**
   * Draw a dashed linear-regression line through each series.
   * Useful for spotting correlations and outliers.
   */
  showTrendLine?: boolean
  /** Label displayed below the X axis */
  xLabel?: string
  /** Label displayed beside the Y axis */
  yLabel?: string
  xFormatter?: (value: number) => string
  yFormatter?: (value: number) => string
  /**
   * Point size range for the z dimension `[min, max]`.
   * Ignored when no data point has a `z` value.
   * @default [40, 400]
   */
  bubbleRange?: [number, number]
  /**
   * Show a dual-handle range brush below the chart to pan and zoom the X axis.
   * Drag either handle to change the visible range, or drag the selection bar
   * to pan the entire window.
   */
  showBrush?: boolean
  /** Show animated skeleton in place of the chart while data loads */
  loading?: boolean
  locale?: UILocale
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

const SCATTER_DOTS: [number, number][] = [
  [15, 72],
  [28, 45],
  [42, 60],
  [55, 28],
  [68, 55],
  [80, 38],
  [22, 85],
  [35, 18],
  [50, 78],
  [62, 42],
  [75, 68],
  [88, 25],
  [10, 50],
  [45, 90],
  [72, 15],
]
const SCATTER_DOT_RADII = [
  3, 2.5, 3.5, 2.5, 4, 3, 2.5, 3.5, 3, 4, 2.5, 3, 3.5, 2.5, 4,
]

interface ScatterChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function ScatterChartSkeleton({
  height = 320,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: ScatterChartSkeletonProps) {
  const YAXIS_WIDTHS = [28, 20, 24, 18]
  const XAXIS_WIDTHS = [28, 36, 24, 32]

  return (
    <div className={cn("flex w-full flex-col", className)}>
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

      <div className="relative overflow-hidden" style={{ height }}>
        {/* Y-axis tick labels */}
        <div className="absolute top-2 bottom-8 left-0 flex w-9 flex-col items-end justify-between pr-1">
          {YAXIS_WIDTHS.map((w, i) => (
            <Skeleton
              key={i}
              className="h-2.5 rounded-sm"
              style={{ width: w, animationDelay: `${0.5 + i * 0.12}s` }}
            />
          ))}
        </div>

        {/* Chart area with SVG scatter dots */}
        <div className="absolute top-2 right-1 bottom-8 left-11">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* Grid lines */}
            {[25, 50, 75].map((v) => (
              <line
                key={`h${v}`}
                x1="0"
                y1={v}
                x2="100"
                y2={v}
                stroke="var(--muted)"
                strokeWidth="0.6"
                opacity={0.5}
              />
            ))}
            {[25, 50, 75].map((v) => (
              <line
                key={`v${v}`}
                x1={v}
                y1="0"
                x2={v}
                y2="100"
                stroke="var(--muted)"
                strokeWidth="0.6"
                opacity={0.5}
              />
            ))}
            {/* Dots */}
            {SCATTER_DOTS.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={SCATTER_DOT_RADII[i]}
                fill="var(--muted)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </svg>
        </div>

        {/* X-axis tick labels */}
        <div className="absolute right-1 bottom-0 left-11 flex h-7 items-center justify-around">
          {XAXIS_WIDTHS.map((w, i) => (
            <Skeleton
              key={i}
              className="h-2.5 rounded-sm"
              style={{ width: w, animationDelay: `${0.05 + i * 0.1}s` }}
            />
          ))}
        </div>
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

interface TooltipEntry {
  name?: string
  value?: number
  fill?: string
  payload?: Record<string, unknown>
}

function ChartTooltip({
  active,
  payload,
  label,
  xLabel,
  yLabel,
  xFormatter,
  yFormatter,
}: {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string | number
  xLabel?: string
  yLabel?: string
  xFormatter?: (v: number) => string
  yFormatter?: (v: number) => string
}) {
  if (!active || !payload?.length) return null

  const raw = payload[0]?.payload as Record<string, unknown> | undefined
  const seriesName =
    (typeof label === "string" && label) ||
    (raw?._series as string | undefined) ||
    ""
  const color =
    (raw?._color as string | undefined) ?? payload[0]?.fill ?? "var(--chart-1)"

  // payload order: x axis entry, y axis entry, z axis entry (optional)
  const xEntry = payload[0]
  const yEntry = payload[1]
  const zEntry = payload[2]

  const fmt = (entry: TooltipEntry, formatter?: (v: number) => string) =>
    entry.value !== undefined
      ? formatter
        ? formatter(entry.value)
        : entry.value.toLocaleString()
      : "—"

  return (
    <div className="min-w-40 rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      {seriesName && (
        <div className="mb-1.5 flex items-center gap-1.5">
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <p className="text-xs font-semibold text-foreground">{seriesName}</p>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {xEntry && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              {xLabel ?? xEntry.name ?? "X"}
            </span>
            <span className="text-xs font-semibold text-foreground tabular-nums">
              {fmt(xEntry, xFormatter)}
            </span>
          </div>
        )}
        {yEntry && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              {yLabel ?? yEntry.name ?? "Y"}
            </span>
            <span className="text-xs font-semibold text-foreground tabular-nums">
              {fmt(yEntry, yFormatter)}
            </span>
          </div>
        )}
        {zEntry && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              {zEntry.name ?? "Size"}
            </span>
            <span className="text-xs font-semibold text-foreground tabular-nums">
              {fmt(zEntry)}
            </span>
          </div>
        )}
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
  hiddenSeries: Set<string>
  onToggle: (name: string) => void
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
      {payload.map((entry) => {
        const hidden = hiddenSeries.has(entry.value)
        return (
          <div
            key={entry.value}
            role="button"
            tabIndex={0}
            aria-pressed={hidden}
            onClick={() => onToggle(entry.value)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onToggle(entry.value)
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

function assignColors(
  series: ScatterSeries[]
): (ScatterSeries & { fill: string })[] {
  return series.map((s, i) => ({
    ...s,
    fill: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
  }))
}

function linearRegression(
  points: ScatterPoint[]
): { slope: number; intercept: number } | null {
  const n = points.length
  if (n < 2) return null
  const sumX = points.reduce((s, p) => s + p.x, 0)
  const sumY = points.reduce((s, p) => s + p.y, 0)
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0)
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0)
  const denom = n * sumXX - sumX * sumX
  if (denom === 0) return null
  const slope = (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n
  return { slope, intercept }
}

function trendLinePoints(
  points: ScatterPoint[],
  slope: number,
  intercept: number
): { x: number; y: number }[] {
  const xs = points.map((p) => p.x)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  return [
    { x: xMin, y: slope * xMin + intercept },
    { x: xMax, y: slope * xMax + intercept },
  ]
}

// Invisible dot for trend-line scatter series
function TrendDot(): React.ReactElement {
  return <></>
}

// ── Continuous Brush ───────────────────────────────────────────────────────
// recharts Brush only works with indexed (categorical) data, so for the
// continuous numeric X axis of a scatter chart we implement our own.

interface ContinuousBrushProps {
  min: number
  max: number
  low: number
  high: number
  onChange: (low: number, high: number) => void
  formatter?: (v: number) => string
  locale?: UILocale
}

function ContinuousBrush({
  min,
  max,
  low,
  high,
  onChange,
  formatter,
  locale = "en-US",
}: ContinuousBrushProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const range = max - min || 1
  const lowPct = Math.max(0, Math.min(100, ((low - min) / range) * 100))
  const highPct = Math.max(0, Math.min(100, ((high - min) / range) * 100))

  const valueAt = React.useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return min
      return (
        min +
        Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * range
      )
    },
    [min, range]
  )

  // Returns a mousedown/touchstart handler for each interactive element
  const startDrag = React.useCallback(
    (role: "low" | "high" | "mid") =>
      (ev: React.MouseEvent | React.TouchEvent) => {
        ev.preventDefault()
        const startClientX =
          "touches" in ev ? ev.touches[0].clientX : ev.clientX
        const snapLow = low
        const snapHigh = high
        const window = snapHigh - snapLow
        const minGap = range * 0.02

        const onMove = (e: MouseEvent | TouchEvent) => {
          const cx = "touches" in e ? e.touches[0].clientX : e.clientX
          if (role === "mid") {
            const delta =
              ((cx - startClientX) /
                (trackRef.current?.getBoundingClientRect().width ?? 1)) *
              range
            const newLow = Math.max(
              min,
              Math.min(max - window, snapLow + delta)
            )
            onChange(newLow, newLow + window)
          } else if (role === "low") {
            const v = valueAt(cx)
            onChange(Math.max(min, Math.min(high - minGap, v)), high)
          } else {
            const v = valueAt(cx)
            onChange(low, Math.max(low + minGap, Math.min(max, v)))
          }
        }

        const onUp = () => {
          document.removeEventListener("mousemove", onMove)
          document.removeEventListener("mouseup", onUp)
          document.removeEventListener("touchmove", onMove)
          document.removeEventListener("touchend", onUp)
        }

        document.addEventListener("mousemove", onMove)
        document.addEventListener("mouseup", onUp)
        document.addEventListener("touchmove", onMove, { passive: false })
        document.addEventListener("touchend", onUp)
      },
    [min, max, low, high, range, onChange, valueAt]
  )

  const fmt = (v: number) =>
    formatter
      ? formatter(v)
      : v.toLocaleString(undefined, { maximumFractionDigits: 1 })

  return (
    <div className="mt-2 px-2 pb-1 select-none">
      <div ref={trackRef} className="relative flex h-6 items-center">
        {/* Base track */}
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-border" />

        {/* Selection highlight — draggable to pan */}
        <div
          className="absolute h-[3px] cursor-grab rounded-full bg-foreground/25 active:cursor-grabbing"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
          onMouseDown={startDrag("mid")}
          onTouchStart={startDrag("mid")}
        />

        {/* Low handle */}
        <div
          className="absolute flex h-5 w-2.5 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded border border-border bg-card shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          style={{ left: `${lowPct}%` }}
          role="slider"
          aria-label={UI_I18N[locale].scatterChart.rangeStart}
          aria-valuenow={low}
          aria-valuemin={min}
          aria-valuemax={high}
          tabIndex={0}
          onMouseDown={startDrag("low")}
          onTouchStart={startDrag("low")}
        >
          <div className="h-2.5 w-px rounded-full bg-muted-foreground/50" />
        </div>

        {/* High handle */}
        <div
          className="absolute flex h-5 w-2.5 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded border border-border bg-card shadow-sm transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          style={{ left: `${highPct}%` }}
          role="slider"
          aria-label={UI_I18N[locale].scatterChart.rangeEnd}
          aria-valuenow={high}
          aria-valuemin={low}
          aria-valuemax={max}
          tabIndex={0}
          onMouseDown={startDrag("high")}
          onTouchStart={startDrag("high")}
        >
          <div className="h-2.5 w-px rounded-full bg-muted-foreground/50" />
        </div>
      </div>

      {/* Value labels under handles */}
      <div className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
        <span>{fmt(low)}</span>
        <span>{fmt(high)}</span>
      </div>
    </div>
  )
}

// ── ScatterChart ───────────────────────────────────────────────────────────

export function ScatterChart({
  series,
  title,
  subtitle,
  footer,
  height = 320,
  showGrid = true,
  showLegend = false,
  legendPosition = "bottom",
  showTooltip = true,
  showTrendLine = false,
  xLabel,
  yLabel,
  xFormatter,
  yFormatter,
  bubbleRange = [40, 400],
  showBrush = false,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: ScatterChartProps) {
  // Hooks must be called unconditionally before any early returns
  const colored = React.useMemo(() => assignColors(series), [series])

  const [hiddenSeries, setHiddenSeries] = React.useState<Set<string>>(new Set())
  const toggleSeries = React.useCallback((name: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const visibleSeries = React.useMemo(
    () => colored.filter((s) => !hiddenSeries.has(s.name)),
    [colored, hiddenSeries]
  )

  // Enable ZAxis when any visible series has z values
  const hasBubble = visibleSeries.some((s) =>
    s.data.some((p) => p.z !== undefined)
  )

  // Enrich each point with series metadata for the tooltip
  const enrichedSeries = React.useMemo(
    () =>
      visibleSeries.map((s) => ({
        ...s,
        enrichedData: s.data.map((p) => ({
          ...p,
          _series: s.name,
          _color: s.fill,
        })),
      })),
    [visibleSeries]
  )

  // Global X extent across all series (used for the brush domain)
  const [globalXMin, globalXMax] = React.useMemo(() => {
    const xs = series.flatMap((s) => s.data.map((p) => p.x))
    if (!xs.length) return [0, 1]
    return [Math.min(...xs), Math.max(...xs)]
  }, [series])

  // brushX tracks the user-selected range; clampedBrush is what the chart consumes
  const [brushX, setBrushX] = React.useState<[number, number]>(() => [
    globalXMin,
    globalXMax,
  ])

  // When the underlying data domain changes, reset the brush to the new full range.
  // useEffect is the correct place for this secondary setState (React docs pattern).
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (showBrush) setBrushX([globalXMin, globalXMax])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalXMin, globalXMax])

  const xDomain = showBrush
    ? ([brushX[0], brushX[1]] as [number, number])
    : undefined

  const isVerticalLegend =
    legendPosition === "left" || legendPosition === "right"

  const axisStyle = {
    fontSize: 12,
    fill: "var(--muted-foreground)",
  }

  const axisLabelStyle = {
    fontSize: 11,
    fill: "var(--muted-foreground)",
  }

  // Expand chart margins when axis labels are present to avoid clipping
  const marginBottom = xLabel ? 28 : 8
  const marginLeft = yLabel ? 8 : 8
  // Give the rotated Y-axis label room to breathe away from the tick values
  const yAxisWidth = yLabel ? 60 : 40
  const yAxisLabelOffset = yLabel ? 0 : 8

  if (loading) {
    return (
      <ScatterChartSkeleton
        height={height}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        className={className}
      />
    )
  }

  if (series.length === 0) {
    return (
      <div className={cn(chartWrapperVariants(), className)} {...props}>
        {(title || subtitle) && (
          <div className={chartHeaderVariants()}>
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Crosshair className="size-5" />
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
        {footer && <div className={chartFooterVariants()}>{footer}</div>}
      </div>
    )
  }

  return (
    <div className={cn(chartWrapperVariants(), className)} {...props}>
      {(title || subtitle) && (
        <div className={chartHeaderVariants()}>
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart
          margin={{ top: 8, right: 16, bottom: marginBottom, left: marginLeft }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical
              horizontal
            />
          )}

          <XAxis
            type="number"
            dataKey="x"
            name={xLabel ?? "X"}
            domain={xDomain}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            tickFormatter={xFormatter}
            label={
              xLabel
                ? {
                    value: xLabel,
                    position: "insideBottom",
                    offset: -16,
                    style: axisLabelStyle,
                  }
                : undefined
            }
          />

          <YAxis
            type="number"
            dataKey="y"
            name={yLabel ?? "Y"}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            tickFormatter={yFormatter}
            width={yAxisWidth}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: "insideLeft",
                    offset: yAxisLabelOffset,
                    style: { ...axisLabelStyle, textAnchor: "middle" },
                  }
                : undefined
            }
          />

          {hasBubble && <ZAxis type="number" dataKey="z" range={bubbleRange} />}

          {showTooltip && (
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "var(--border)" }}
              content={
                <ChartTooltip
                  xLabel={xLabel}
                  yLabel={yLabel}
                  xFormatter={xFormatter}
                  yFormatter={yFormatter}
                />
              }
            />
          )}

          {showLegend && (
            <Legend
              {...LEGEND_LAYOUT[legendPosition]}
              content={({ payload }) => (
                <ChartLegend
                  payload={payload as LegendPayloadEntry[]}
                  hiddenSeries={hiddenSeries}
                  onToggle={toggleSeries}
                  vertical={isVerticalLegend}
                />
              )}
            />
          )}

          {/* Data series */}
          {enrichedSeries.map((s) => (
            <Scatter
              key={s.name}
              name={s.name}
              data={s.enrichedData}
              fill={s.fill}
              fillOpacity={0.85}
              shape={s.shape ?? "circle"}
            />
          ))}

          {/* Trend lines — one per visible series */}
          {showTrendLine &&
            enrichedSeries.map((s) => {
              const reg = linearRegression(s.data)
              if (!reg) return null
              const pts = trendLinePoints(s.data, reg.slope, reg.intercept)
              return (
                <Scatter
                  key={`${s.name}__trend`}
                  data={pts}
                  fill="transparent"
                  line={{
                    stroke: s.fill,
                    strokeWidth: 1.5,
                    strokeDasharray: "5 3",
                    strokeOpacity: 0.7,
                  }}
                  legendType="none"
                  shape={TrendDot}
                  isAnimationActive={false}
                />
              )
            })}
        </RechartsScatterChart>
      </ResponsiveContainer>

      {showBrush && (
        <ContinuousBrush
          min={globalXMin}
          max={globalXMax}
          low={brushX[0]}
          high={brushX[1]}
          onChange={(lo, hi) => setBrushX([lo, hi])}
          formatter={xFormatter}
          locale={locale}
        />
      )}

      {footer && <div className={chartFooterVariants()}>{footer}</div>}
    </div>
  )
}
