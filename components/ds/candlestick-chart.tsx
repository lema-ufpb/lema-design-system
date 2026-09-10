"use client"

import * as React from "react"
import {
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine as RechartsReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { CandlestickChart as CandlestickIcon } from "lucide-react"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import { measureAxisWidth } from "@/lib/chart-axis-width"

// ── Types ──────────────────────────────────────────────────────────────────

export type LegendPosition = "top" | "bottom" | "left" | "right"

export interface CandleDataPoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume?: number
  [key: string]: string | number | undefined
}

export interface MovingAverageConfig {
  period: number
  /** Defaults to next --chart-N token */
  color?: string
  label?: string
  /** Render as dashed stroke */
  dashed?: boolean
}

export interface CandlestickReferenceLine {
  value: number
  label?: string
  color?: string
  /** @default true */
  dashed?: boolean
}

export interface CandlestickChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CandleDataPoint[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  /** Color for bullish candles (close ≥ open). Default: green. */
  positiveColor?: string
  /** Color for bearish candles (close < open). Default: red. */
  negativeColor?: string
  /** Compute and overlay simple moving average lines */
  movingAverages?: MovingAverageConfig[]
  /** Horizontal price reference lines — targets, support/resistance levels */
  referenceLines?: CandlestickReferenceLine[]
  /** Render volume bars in the lower section of the chart */
  showVolume?: boolean
  showGrid?: boolean
  showLegend?: boolean
  /** @default "bottom" */
  legendPosition?: LegendPosition
  showTooltip?: boolean
  showBrush?: boolean
  /** Format price values (Y axis ticks + tooltip) */
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  /** Format date strings (X axis ticks + tooltip header) */
  dateFormatter?: (date: string) => string
  /** Show animated skeleton in place of the chart while data loads */
  loading?: boolean
  locale?: UILocale
}

// ── Constants ──────────────────────────────────────────────────────────────

const POSITIVE_COLOR = "var(--success)"
const NEGATIVE_COLOR = "var(--destructive)"

/** Colors assigned in order to movingAverages when no color is specified */
const MA_COLORS = [
  "var(--chart-1)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// ── Skeleton ───────────────────────────────────────────────────────────────

// 10 candles: alternating up/down, x positions 5..95
const CANDLE_DATA = [
  { x: 5, high: 18, open: 52, close: 38, low: 68 }, // down (close < open)
  { x: 15, high: 28, open: 40, close: 55, low: 72 }, // up
  { x: 25, high: 22, open: 58, close: 42, low: 75 }, // down
  { x: 35, high: 32, open: 44, close: 60, low: 78 }, // up
  { x: 45, high: 20, open: 55, close: 40, low: 70 }, // down
  { x: 55, high: 35, open: 42, close: 58, low: 80 }, // up
  { x: 65, high: 25, open: 60, close: 45, low: 82 }, // down
  { x: 75, high: 30, open: 48, close: 62, low: 76 }, // up
  { x: 85, high: 15, open: 62, close: 48, low: 85 }, // down
  { x: 95, high: 38, open: 45, close: 60, low: 78 }, // up
]

const CANDLE_YAXIS_WIDTHS = [28, 20, 24, 18, 22]
const CANDLE_XAXIS_WIDTHS = [24, 28, 22, 26, 24, 28, 22, 26, 24, 28]

interface CandlestickChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function CandlestickChartSkeleton({
  height = 360,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: CandlestickChartSkeletonProps) {
  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="candlestick-chart-skeleton"
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

      <div className="relative overflow-hidden" style={{ height }}>
        {/* Y-axis tick labels */}
        <div className="absolute top-2 bottom-8 left-0 flex w-9 flex-col items-end justify-between pr-1">
          {CANDLE_YAXIS_WIDTHS.map((w, i) => (
            <Skeleton
              key={i}
              className="h-2.5 rounded-sm"
              style={{ width: w, animationDelay: `${0.5 + i * 0.12}s` }}
            />
          ))}
        </div>

        {/* Chart area with SVG candles */}
        <div className="absolute top-2 right-1 bottom-8 left-11">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* Horizontal grid lines */}
            {[25, 50, 75].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="var(--muted)"
                strokeWidth="0.6"
                opacity={0.5}
                strokeDasharray="3 3"
              />
            ))}
            {/* Candles */}
            {CANDLE_DATA.map((c, i) => (
              <g
                key={i}
                className="motion-safe:animate-pulse"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Wick */}
                <line
                  x1={c.x}
                  y1={c.high}
                  x2={c.x}
                  y2={c.low}
                  stroke="var(--muted)"
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={c.x - 3}
                  y={Math.min(c.open, c.close)}
                  width={6}
                  height={Math.abs(c.close - c.open)}
                  fill="var(--muted)"
                  rx={0.5}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* X-axis tick labels */}
        <div className="absolute right-1 bottom-0 left-11 flex h-7 items-center justify-around">
          {CANDLE_XAXIS_WIDTHS.map((w, i) => (
            <Skeleton
              key={i}
              className="h-2.5 rounded-sm"
              style={{ width: w, animationDelay: `${0.05 + i * 0.08}s` }}
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
const chartTitleVariants = cva("text-sm leading-tight font-semibold text-foreground")
const chartSubtitleVariants = cva("mt-0.5 text-xs text-muted-foreground")
const chartFooterVariants = cva("mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground")

// ── Helpers ────────────────────────────────────────────────────────────────

function defaultDateFmt(date: string, locale = "en-US"): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return date
    return d.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    })
  } catch {
    return date
  }
}

function fullDateFmt(date: string, locale = "en-US"): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return date
    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return date
  }
}

function computeMA(
  data: CandleDataPoint[],
  period: number
): (number | undefined)[] {
  return data.map((_, i) => {
    if (i < period - 1) return undefined
    const sum = data
      .slice(i - period + 1, i + 1)
      .reduce((s, d) => s + d.close, 0)
    return sum / period
  })
}

function normalizeMA(
  raw: MovingAverageConfig[]
): Required<MovingAverageConfig>[] {
  return raw.map((ma, i) => ({
    period: ma.period,
    color: ma.color ?? MA_COLORS[i % MA_COLORS.length],
    label: ma.label ?? `MA ${ma.period}`,
    dashed: ma.dashed ?? false,
  }))
}

type EnrichedPoint = CandleDataPoint &
  Record<string, string | number | undefined>

function enrichData(
  data: CandleDataPoint[],
  mas: Required<MovingAverageConfig>[]
): EnrichedPoint[] {
  const result: EnrichedPoint[] = data.map((d) => ({ ...d }))
  mas.forEach((ma) => {
    const values = computeMA(data, ma.period)
    values.forEach((v, i) => {
      result[i][`_ma${ma.period}`] = v
    })
  })
  return result
}

/** Full high/low range — the bar spans the entire wick */
const candleRangeKey = (entry: unknown): [number, number] => {
  const d = entry as CandleDataPoint
  return [d.low, d.high]
}

// ── Candlestick Shape ──────────────────────────────────────────────────────

interface CandleShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: CandleDataPoint
  positiveColor: string
  negativeColor: string
}

function CandleShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
  positiveColor,
  negativeColor,
}: CandleShapeProps) {
  if (!payload || width <= 0 || height <= 0) return null

  const { open, close, high, low } = payload
  const isUp = close >= open
  const color = isUp ? positiveColor : negativeColor
  const center = x + width / 2

  const range = high - low
  const ratio = range > 0 ? height / range : 0

  // Body rect coordinates within the full wick bar
  const bodyTop = ratio > 0 ? y + (high - Math.max(open, close)) * ratio : y
  const bodyBottom = ratio > 0 ? y + (high - Math.min(open, close)) * ratio : y
  const bodyH = Math.max(bodyBottom - bodyTop, 1.5)

  // Body width — leave 1px inset on each side
  const bx = x + 1
  const bw = Math.max(width - 2, 2)

  return (
    <g>
      {/* Wick — thin vertical line covering the full high/low range */}
      <line
        x1={center}
        y1={y}
        x2={center}
        y2={y + height}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Body — fills between open and close */}
      <rect
        x={bx}
        y={bodyTop}
        width={bw}
        height={bodyH}
        fill={isUp ? "transparent" : color}
        stroke={color}
        strokeWidth={1.5}
        rx={1}
      />
    </g>
  )
}

// ── Volume Bar Shape ───────────────────────────────────────────────────────

interface VolumeShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  payload?: CandleDataPoint
  positiveColor: string
  negativeColor: string
}

function VolumeShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
  positiveColor,
  negativeColor,
}: VolumeShapeProps) {
  if (!payload || width <= 0 || height <= 0) return null
  const isUp = payload.close >= payload.open
  const color = isUp ? positiveColor : negativeColor
  return (
    <rect
      x={x + 1}
      y={y}
      width={Math.max(width - 2, 2)}
      height={height}
      fill={color}
      fillOpacity={0.3}
      rx={1}
    />
  )
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────

function CandleTooltip({
  active,
  payload,
  positiveColor,
  negativeColor,
  valueFmt,
  locale = "en-US",
}: {
  active?: boolean
  payload?: Array<{
    payload: EnrichedPoint
    name?: string
    value?: unknown
    color?: string
    strokeDasharray?: string
  }>
  positiveColor: string
  negativeColor: string
  valueFmt: (v: number) => string
  locale?: UILocale
}) {
  if (!active || !payload?.length) return null

  const candle = payload.find((p) => Array.isArray(p.value))?.payload as
    CandleDataPoint | undefined
  if (!candle) return null

  const isUp = candle.close >= candle.open
  const color = isUp ? positiveColor : negativeColor
  const change = candle.close - candle.open
  const changePct = candle.open !== 0 ? (change / candle.open) * 100 : 0
  const sign = change >= 0 ? "+" : ""

  // MA line entries
  const maEntries = payload.filter(
    (p) => !Array.isArray(p.value) && p.name && p.name.startsWith("MA ")
  )

  return (
    <div className="min-w-44 rounded-lg border border-border bg-card px-3 py-2.5 shadow-md">
      {/* Header: date + change badge */}
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-foreground">
          {fullDateFmt(candle.date, locale)}
        </p>
        <span
          className="rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {sign}
          {valueFmt(change)} ({sign}
          {changePct.toFixed(2)}%)
        </span>
      </div>

      {/* OHLC */}
      <div className="flex flex-col gap-0.5">
        {[
          {
            label: UI_I18N[locale].candlestick.open,
            value: candle.open,
            extra: false,
          },
          {
            label: UI_I18N[locale].candlestick.high,
            value: candle.high,
            extra: false,
          },
          {
            label: UI_I18N[locale].candlestick.low,
            value: candle.low,
            extra: false,
          },
          {
            label: UI_I18N[locale].candlestick.close,
            value: candle.close,
            extra: true,
          },
        ].map(({ label, value, extra }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-8 text-xs"
              style={{ color: extra ? color : undefined }}
            >
              <span
                className={extra ? "font-semibold" : "text-muted-foreground"}
              >
                {label}
              </span>
            </span>
            <span
              className="ml-auto text-xs tabular-nums"
              style={{
                color: extra ? color : undefined,
                fontWeight: extra ? 600 : 400,
              }}
            >
              {valueFmt(value)}
            </span>
          </div>
        ))}
      </div>

      {/* Volume */}
      {candle.volume !== undefined && (
        <div className="mt-1.5 flex items-center justify-between border-t border-border pt-1.5">
          <span className="text-xs text-muted-foreground">
            {UI_I18N[locale].candlestick.volume}
          </span>
          <span className="text-xs text-foreground tabular-nums">
            {formatChartValue(candle.volume, { locale })}
          </span>
        </div>
      )}

      {/* MA values */}
      {maEntries.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-0.5 border-t border-border pt-1.5">
          {maEntries.map((ma) => (
            <div key={ma.name} className="flex items-center gap-2">
              <svg width="12" height="6" className="shrink-0">
                <line
                  x1="0"
                  y1="3"
                  x2="12"
                  y2="3"
                  stroke={ma.color}
                  strokeWidth={1.5}
                  strokeDasharray={ma.strokeDasharray ? "4 2" : undefined}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs text-muted-foreground">{ma.name}</span>
              <span className="ml-auto text-xs font-semibold text-foreground tabular-nums">
                {typeof ma.value === "number" ? valueFmt(ma.value) : "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Custom Legend ──────────────────────────────────────────────────────────

interface LegendPayloadEntry {
  value: string
  color: string
  payload?: { strokeDasharray?: string }
}

function ChartLegend({
  payload,
  hiddenSeries,
  onToggle,
  positiveColor,
  negativeColor,
  vertical = false,
  locale = "en-US",
}: {
  payload?: LegendPayloadEntry[]
  hiddenSeries?: Set<string>
  onToggle?: (name: string) => void
  positiveColor: string
  negativeColor: string
  vertical?: boolean
  locale?: UILocale
}) {
  const maItems = payload ?? []

  return (
    <div
      className={cn(
        "flex gap-y-1",
        vertical
          ? "flex-col px-2 py-1"
          : "flex-wrap items-center justify-center gap-x-5 pt-3"
      )}
    >
      {/* Static bull/bear indicators */}
      {[
        {
          label: UI_I18N[locale].candlestick.bullish,
          color: positiveColor,
          hollow: true,
        },
        {
          label: UI_I18N[locale].candlestick.bearish,
          color: negativeColor,
          hollow: false,
        },
      ].map(({ label, color, hollow }) => (
        <div key={label} className="flex items-center gap-1.5 px-1 py-0.5">
          <svg width="10" height="10" className="shrink-0">
            <rect
              x="0"
              y="0"
              width="10"
              height="10"
              rx="1"
              fill={hollow ? "transparent" : color}
              stroke={color}
              strokeWidth="1.5"
            />
          </svg>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}

      {/* Toggleable MA line items */}
      {maItems.map((entry, i) => {
        const isDashed = !!entry.payload?.strokeDasharray
        const hidden = hiddenSeries?.has(entry.value)
        return (
          <div
            key={entry.value ?? i}
            role="button"
            tabIndex={0}
            aria-pressed={hidden}
            aria-label={entry.value}
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
            <svg width="16" height="8" className="shrink-0">
              <line
                x1="0"
                y1="4"
                x2="16"
                y2="4"
                stroke={entry.color}
                strokeWidth={2}
                strokeDasharray={isDashed ? "4 2" : undefined}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs text-muted-foreground">{entry.value}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Reference Line Label ───────────────────────────────────────────────────

function ReferenceLineLabel({
  viewBox,
  label,
  color,
}: {
  viewBox?: { x?: number; width?: number; y?: number }
  label: string
  color: string
}) {
  const x = (viewBox?.x ?? 0) + (viewBox?.width ?? 0)
  const y = viewBox?.y ?? 0
  const pad = 6
  const estW = label.length * 6 + pad * 2
  return (
    <g>
      <rect
        x={x - estW - 4}
        y={y - 10}
        width={estW}
        height={16}
        rx={4}
        fill={color}
        fillOpacity={0.12}
      />
      <text
        x={x - estW / 2 - 4}
        y={y + 3}
        textAnchor="middle"
        fontSize={10}
        fontWeight={600}
        fill={color}
      >
        {label}
      </text>
    </g>
  )
}

// ── Brush Handle ───────────────────────────────────────────────────────────

function BrushHandle(props: {
  x?: number
  y?: number
  width?: number
  height?: number
}): React.ReactElement {
  const { x = 0, y = 0, width = 8, height = 30 } = props
  const midY = y + height / 2
  return (
    <g>
      <rect
        x={x}
        y={y + 5}
        width={width}
        height={height - 10}
        rx={3}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={1.5}
      />
      <line
        x1={x + 2}
        y1={midY - 3}
        x2={x + width - 2}
        y2={midY - 3}
        stroke="var(--muted-foreground)"
        strokeWidth={1}
        opacity={0.5}
      />
      <line
        x1={x + 2}
        y1={midY + 3}
        x2={x + width - 2}
        y2={midY + 3}
        stroke="var(--muted-foreground)"
        strokeWidth={1}
        opacity={0.5}
      />
    </g>
  )
}

// ── CandlestickChart ───────────────────────────────────────────────────────

export function CandlestickChart({
  data,
  title,
  subtitle,
  footer,
  height = 360,
  positiveColor = POSITIVE_COLOR,
  negativeColor = NEGATIVE_COLOR,
  movingAverages,
  referenceLines,
  showVolume = false,
  showGrid = true,
  showLegend = false,
  legendPosition = "bottom",
  showTooltip = true,
  showBrush = false,
  valueFormatter,
  format,
  decimals,
  currency,
  abbreviate,
  dateFormatter,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: CandlestickChartProps) {
  // Hooks must be called unconditionally before any early returns
  const valueFmt = React.useCallback(
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
  const dateFmt = React.useCallback(
    (d: string) => dateFormatter?.(d) ?? defaultDateFmt(d, locale),
    [dateFormatter, locale]
  )

  const resolvedMAs = React.useMemo(
    () => normalizeMA(movingAverages ?? []),
    [movingAverages]
  )
  const enrichedData = React.useMemo(
    () => enrichData(data, resolvedMAs),
    [data, resolvedMAs]
  )

  const legendPayload = React.useMemo(
    () =>
      resolvedMAs.map((ma) => ({
        value: ma.label,
        color: ma.color,
        payload: { strokeDasharray: ma.dashed ? "5 3" : undefined },
      })),
    [resolvedMAs]
  )

  const maxVolume = React.useMemo(
    () => Math.max(...data.map((d) => d.volume ?? 0)),
    [data]
  )

  const [hiddenSeries, setHiddenSeries] = React.useState<Set<string>>(new Set())
  const toggleSeries = React.useCallback((name: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }, [])

  const axisStyle = { fontSize: "12px", fill: "var(--muted-foreground)" }
  // Sized from the actual formatted tick values (not a fixed guess) so
  // abbreviated currency ("R$ 800,0 mi") never wraps or clips — see
  // lib/chart-axis-width.ts.
  const priceAxisWidth = measureAxisWidth(
    [0, ...data.flatMap((d) => [d.high, d.low, d.open, d.close])],
    valueFmt,
    { min: 56 }
  )

  if (loading) {
    return (
      <CandlestickChartSkeleton
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
        data-slot="candlestick-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div
            className={chartHeaderVariants()}
            data-slot="candlestick-chart-header"
          >
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="candlestick-chart-empty"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <CandlestickIcon className="size-5" />
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
          <div
            className={chartFooterVariants()}
            data-slot="candlestick-chart-footer"
          >
            {footer}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(chartWrapperVariants(), className)}
      data-slot="candlestick-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div
          className={chartHeaderVariants()}
          data-slot="candlestick-chart-header"
        >
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer
        width="100%"
        height={height}
        data-slot="candlestick-chart-chart"
      >
        <ComposedChart
          data={enrichedData}
          margin={{ top: 8, right: 8, bottom: 4, left: 4 }}
          barCategoryGap="20%"
          barGap={0}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
          )}

          <XAxis
            dataKey="date"
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            dy={6}
            tickFormatter={dateFmt}
          />

          {/* Price Y axis */}
          <YAxis
            yAxisId="price"
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={valueFmt}
            width={priceAxisWidth}
            domain={["auto", "auto"]}
          />

          {/* Volume Y axis — inflated domain pushes bars to the bottom ~20% */}
          {showVolume && maxVolume > 0 && (
            <YAxis yAxisId="vol" domain={[0, maxVolume * 5]} hide />
          )}

          {showTooltip && (
            <Tooltip
              content={(p) => (
                <CandleTooltip
                  active={p.active}
                  payload={p.payload as never}
                  positiveColor={positiveColor}
                  negativeColor={negativeColor}
                  valueFmt={valueFmt}
                  locale={locale}
                />
              )}
              cursor={{ fill: "var(--muted)", opacity: 0.15 }}
            />
          )}

          {/* Reference lines */}
          {referenceLines?.map((rl, i) => (
            <RechartsReferenceLine
              key={i}
              yAxisId="price"
              y={rl.value}
              stroke={rl.color ?? "var(--muted-foreground)"}
              strokeDasharray={rl.dashed !== false ? "4 3" : undefined}
              strokeWidth={1.5}
              label={
                rl.label
                  ? (labelProps: {
                      viewBox?: { x?: number; width?: number; y?: number }
                    }) => (
                      <ReferenceLineLabel
                        key={`rl-${i}`}
                        viewBox={labelProps.viewBox}
                        label={rl.label!}
                        color={rl.color ?? "var(--muted-foreground)"}
                      />
                    )
                  : undefined
              }
            />
          ))}

          {/* Volume bars — rendered first so candles appear on top */}
          {showVolume && maxVolume > 0 && (
            <Bar
              yAxisId="vol"
              dataKey="volume"
              isAnimationActive={false}
              legendType="none"
              shape={(shapeProps: unknown) => {
                const p = shapeProps as VolumeShapeProps & {
                  payload?: CandleDataPoint
                }
                return (
                  <VolumeShape
                    {...p}
                    positiveColor={positiveColor}
                    negativeColor={negativeColor}
                  />
                )
              }}
            />
          )}

          {/* Moving average lines */}
          {resolvedMAs.map((ma) => (
            <Line
              key={ma.period}
              yAxisId="price"
              type="monotone"
              dataKey={`_ma${ma.period}`}
              name={ma.label}
              stroke={ma.color}
              strokeWidth={1.5}
              strokeDasharray={ma.dashed ? "5 3" : undefined}
              dot={false}
              connectNulls
              isAnimationActive={false}
              hide={hiddenSeries.has(ma.label)}
            />
          ))}

          {/* Candlestick bars — rendered last to appear above volume */}
          <Bar
            yAxisId="price"
            dataKey={candleRangeKey}
            isAnimationActive={false}
            legendType="none"
            shape={(shapeProps: unknown) => {
              const p = shapeProps as CandleShapeProps & {
                payload?: CandleDataPoint
              }
              return (
                <CandleShape
                  {...p}
                  positiveColor={positiveColor}
                  negativeColor={negativeColor}
                />
              )
            }}
          />

          {showBrush && (
            <Brush
              dataKey="date"
              height={30}
              stroke="var(--border)"
              fill="var(--card)"
              travellerWidth={8}
              traveller={(<BrushHandle />) as React.ReactElement<SVGElement>}
              tickFormatter={() => ""}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {showLegend && (
        <ChartLegend
          payload={legendPayload}
          hiddenSeries={hiddenSeries}
          onToggle={toggleSeries}
          positiveColor={positiveColor}
          negativeColor={negativeColor}
          vertical={legendPosition === "left" || legendPosition === "right"}
          locale={locale}
        />
      )}

      {footer && (
        <div
          className={chartFooterVariants()}
          data-slot="candlestick-chart-footer"
        >
          {footer}
        </div>
      )}
    </div>
  )
}
