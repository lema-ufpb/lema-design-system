"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart2 } from "lucide-react"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export type BoxPlotOrientation = "vertical" | "horizontal"

export interface BoxPlotItem {
  name: string
  min: number
  q1: number
  median: number
  /** Optional mean marker (diamond) */
  mean?: number
  q3: number
  max: number
  /** Individual outlier values outside min/max */
  outliers?: number[]
  /** Defaults to next --chart-N token */
  color?: string
}

export interface BoxPlotChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BoxPlotItem[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  /** "vertical" = boxes grow upward (default); "horizontal" = boxes grow rightward */
  orientation?: BoxPlotOrientation
  height?: number
  /** Draw background grid lines on the value axis */
  showGrid?: boolean
  /** Draw a diamond at the mean value */
  showMean?: boolean
  /** Draw dots for outlier values */
  showOutliers?: boolean
  /** Notch the box at the median — visually encodes median confidence */
  notched?: boolean
  /** Format value-axis tick labels and tooltip values */
  valueFormatter?: (value: number) => string
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

const MARGIN_V = { top: 16, right: 20, bottom: 36, left: 48 }
const MARGIN_H = { top: 8, right: 24, bottom: 8, left: 96 }

// ── Skeleton ───────────────────────────────────────────────────────────────

const BOXPLOT_SKELETON_BOXES = [
  { cx: 12, whiskerLo: 78, q1: 65, median: 50, q3: 32, whiskerHi: 18 },
  { cx: 35, whiskerLo: 82, q1: 72, median: 55, q3: 38, whiskerHi: 22 },
  { cx: 58, whiskerLo: 70, q1: 58, median: 40, q3: 25, whiskerHi: 15 },
  { cx: 81, whiskerLo: 88, q1: 76, median: 62, q3: 45, whiskerHi: 28 },
]
const YAXIS_TICK_WIDTHS = [28, 20, 24, 18, 22]

interface BoxPlotChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function BoxPlotChartSkeleton({
  height = 320,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: BoxPlotChartSkeletonProps) {
  const XAXIS_WIDTHS = [28, 36, 24, 32]

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="boxplot-chart-skeleton"
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
          {YAXIS_TICK_WIDTHS.map((w, i) => (
            <Skeleton
              key={i}
              className="h-2.5 rounded-sm"
              style={{ width: w, animationDelay: `${0.5 + i * 0.12}s` }}
            />
          ))}
        </div>

        {/* Chart area with SVG box plots */}
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
            {/* Box plots */}
            {BOXPLOT_SKELETON_BOXES.map((box, i) => (
              <g
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Whisker lines */}
                <line
                  x1={box.cx}
                  y1={box.whiskerLo}
                  x2={box.cx}
                  y2={box.q1}
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                <line
                  x1={box.cx}
                  y1={box.q3}
                  x2={box.cx}
                  y2={box.whiskerHi}
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                {/* Whisker caps */}
                <line
                  x1={box.cx - 4}
                  y1={box.whiskerLo}
                  x2={box.cx + 4}
                  y2={box.whiskerLo}
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                />
                <line
                  x1={box.cx - 4}
                  y1={box.whiskerHi}
                  x2={box.cx + 4}
                  y2={box.whiskerHi}
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                />
                {/* IQR box */}
                <rect
                  x={box.cx - 7}
                  y={box.q3}
                  width={14}
                  height={box.q1 - box.q3}
                  fill="var(--muted)"
                  fillOpacity={0.3}
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  rx={1}
                />
                {/* Median line */}
                <line
                  x1={box.cx - 7}
                  y1={box.median}
                  x2={box.cx + 7}
                  y2={box.median}
                  stroke="var(--muted)"
                  strokeWidth="2"
                />
              </g>
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

// ── Helpers ────────────────────────────────────────────────────────────────

function niceTicks(lo: number, hi: number, count = 5): number[] {
  const raw = (hi - lo) / (count - 1)
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const nice = [1, 2, 2.5, 5, 10].find((f) => f * mag >= raw) ?? 10
  const step = nice * mag
  const start = Math.floor(lo / step) * step
  const ticks: number[] = []
  for (
    let t = start;
    t <= hi + step * 0.001;
    t = Math.round((t + step) * 1e9) / 1e9
  ) {
    ticks.push(t)
  }
  return ticks
}

function resolveColors(data: BoxPlotItem[]): BoxPlotItem[] {
  return data.map((d, i) => ({
    ...d,
    color: d.color ?? CHART_COLORS[i % CHART_COLORS.length],
  }))
}

// ── Tooltip ────────────────────────────────────────────────────────────────

interface TooltipState {
  item: BoxPlotItem
  /** Position relative to the container element */
  left: number
  top: number
}

function BoxTooltip({
  item,
  left,
  top,
  valueFormatter,
}: {
  item: BoxPlotItem
  left: number
  top: number
  valueFormatter?: (v: number) => string
}) {
  const fmt = (v: number) => (valueFormatter ? valueFormatter(v) : String(v))

  return (
    <div
      className="pointer-events-none absolute z-50 min-w-40 rounded-lg border border-border bg-card px-3 py-2 shadow-lg"
      style={{ left, top, transform: "translate(-50%, calc(-100% - 10px))" }}
    >
      <p className="mb-1.5 text-xs font-semibold text-foreground">
        {item.name}
      </p>
      <div className="flex flex-col gap-0.5">
        {[
          { label: "Max", value: item.max },
          { label: "Q3", value: item.q3 },
          { label: "Median", value: item.median },
          ...(item.mean !== undefined
            ? [{ label: "Mean", value: item.mean }]
            : []),
          { label: "Q1", value: item.q1 },
          { label: "Min", value: item.min },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-12 text-xs text-muted-foreground">{label}</span>
            <span className="ml-auto text-xs font-semibold text-foreground tabular-nums">
              {fmt(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Box rendering helpers ──────────────────────────────────────────────────

interface BoxProps {
  item: BoxPlotItem
  cx: number // center x (vertical) or center y (horizontal)
  halfWidth: number
  // value → pixel coordinate
  scale: (v: number) => number
  orientation: BoxPlotOrientation
  notched: boolean
  showMean: boolean
  showOutliers: boolean
  onHover: (item: BoxPlotItem, ev: React.MouseEvent) => void
  onLeave: () => void
  isHovered: boolean
}

function BoxShape({
  item,
  cx,
  halfWidth,
  scale,
  orientation,
  notched,
  showMean,
  showOutliers,
  onHover,
  onLeave,
  isHovered,
}: BoxProps) {
  const color = item.color!
  const notchDepth = halfWidth * 0.28

  // All coordinates in SVG pixel space
  if (orientation === "vertical") {
    const yMin = scale(item.min)
    const yQ1 = scale(item.q1)
    const yMed = scale(item.median)
    const yMean = item.mean !== undefined ? scale(item.mean) : null
    const yQ3 = scale(item.q3)
    const yMax = scale(item.max)
    const x1 = cx - halfWidth
    const x2 = cx + halfWidth

    const boxPath = notched
      ? [
          `M ${x1} ${yQ3}`,
          `L ${x1} ${yMed + notchDepth}`,
          `L ${cx - notchDepth * 0.7} ${yMed}`,
          `L ${x1} ${yMed - notchDepth}`,
          `L ${x1} ${yQ1}`,
          `L ${x2} ${yQ1}`,
          `L ${x2} ${yMed - notchDepth}`,
          `L ${cx + notchDepth * 0.7} ${yMed}`,
          `L ${x2} ${yMed + notchDepth}`,
          `L ${x2} ${yQ3}`,
          "Z",
        ].join(" ")
      : null

    return (
      <g
        onMouseMove={(e) => onHover(item, e)}
        onMouseLeave={onLeave}
        opacity={isHovered ? 1 : 0.9}
        style={{ cursor: "default" }}
      >
        {/* Whisker: min → Q1 */}
        <line
          x1={cx}
          y1={yMin}
          x2={cx}
          y2={yQ1}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />
        {/* Whisker: Q3 → max */}
        <line
          x1={cx}
          y1={yQ3}
          x2={cx}
          y2={yMax}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />

        {/* Whisker caps */}
        <line
          x1={x1 - 2}
          y1={yMin}
          x2={x2 + 2}
          y2={yMin}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <line
          x1={x1 - 2}
          y1={yMax}
          x2={x2 + 2}
          y2={yMax}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* IQR Box */}
        {notched ? (
          <path
            d={boxPath!}
            fill={color}
            fillOpacity={isHovered ? 0.28 : 0.18}
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        ) : (
          <rect
            x={x1}
            y={yQ3}
            width={halfWidth * 2}
            height={yQ1 - yQ3}
            fill={color}
            fillOpacity={isHovered ? 0.28 : 0.18}
            stroke={color}
            strokeWidth={1.5}
            rx={2}
          />
        )}

        {/* Median line */}
        <line
          x1={x1}
          y1={yMed}
          x2={x2}
          y2={yMed}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Mean diamond */}
        {showMean && yMean !== null && (
          <polygon
            points={`${cx},${yMean - 5} ${cx + 5},${yMean} ${cx},${yMean + 5} ${cx - 5},${yMean}`}
            fill={color}
            stroke="var(--card)"
            strokeWidth={1.5}
          />
        )}

        {/* Outliers */}
        {showOutliers &&
          item.outliers?.map((v, idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={scale(v)}
              r={3}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              opacity={0.8}
            />
          ))}

        {/* Invisible hit area */}
        <rect
          x={x1 - 4}
          y={Math.min(yMax, yMin) - 4}
          width={halfWidth * 2 + 8}
          height={Math.abs(yQ1 - yQ3) + (yMin - yMax) + 8}
          fill="transparent"
        />
      </g>
    )
  }

  // Horizontal orientation — swap x/y semantics
  const xMin = scale(item.min)
  const xQ1 = scale(item.q1)
  const xMed = scale(item.median)
  const xMean = item.mean !== undefined ? scale(item.mean) : null
  const xQ3 = scale(item.q3)
  const xMax = scale(item.max)
  const y1 = cx - halfWidth
  const y2 = cx + halfWidth

  const boxPathH = notched
    ? [
        `M ${xQ1} ${y2}`,
        `L ${xMed - notchDepth} ${y2}`,
        `L ${xMed} ${y2 - notchDepth * 0.7}`,
        `L ${xMed + notchDepth} ${y2}`,
        `L ${xQ3} ${y2}`,
        `L ${xQ3} ${y1}`,
        `L ${xMed + notchDepth} ${y1}`,
        `L ${xMed} ${y1 + notchDepth * 0.7}`,
        `L ${xMed - notchDepth} ${y1}`,
        `L ${xQ1} ${y1}`,
        "Z",
      ].join(" ")
    : null

  return (
    <g
      onMouseMove={(e) => onHover(item, e)}
      onMouseLeave={onLeave}
      opacity={isHovered ? 1 : 0.9}
      style={{ cursor: "default" }}
    >
      {/* Whisker: min → Q1 */}
      <line
        x1={xMin}
        y1={cx}
        x2={xQ1}
        y2={cx}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="3 2"
      />
      {/* Whisker: Q3 → max */}
      <line
        x1={xQ3}
        y1={cx}
        x2={xMax}
        y2={cx}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="3 2"
      />

      {/* Whisker caps */}
      <line
        x1={xMin}
        y1={y1 - 2}
        x2={xMin}
        y2={y2 + 2}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line
        x1={xMax}
        y1={y1 - 2}
        x2={xMax}
        y2={y2 + 2}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* IQR Box */}
      {notched ? (
        <path
          d={boxPathH!}
          fill={color}
          fillOpacity={isHovered ? 0.28 : 0.18}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      ) : (
        <rect
          x={xQ1}
          y={y1}
          width={xQ3 - xQ1}
          height={halfWidth * 2}
          fill={color}
          fillOpacity={isHovered ? 0.28 : 0.18}
          stroke={color}
          strokeWidth={1.5}
          rx={2}
        />
      )}

      {/* Median line */}
      <line
        x1={xMed}
        y1={y1}
        x2={xMed}
        y2={y2}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Mean diamond */}
      {showMean && xMean !== null && (
        <polygon
          points={`${xMean - 5},${cx} ${xMean},${cx - 5} ${xMean + 5},${cx} ${xMean},${cx + 5}`}
          fill={color}
          stroke="var(--card)"
          strokeWidth={1.5}
        />
      )}

      {/* Outliers */}
      {showOutliers &&
        item.outliers?.map((v, idx) => (
          <circle
            key={idx}
            cx={scale(v)}
            cy={cx}
            r={3}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.8}
          />
        ))}

      {/* Invisible hit area */}
      <rect
        x={Math.min(xMin, xMax) - 4}
        y={y1 - 4}
        width={Math.abs(xMax - xMin) + 8}
        height={halfWidth * 2 + 8}
        fill="transparent"
      />
    </g>
  )
}

// ── BoxPlotChart ───────────────────────────────────────────────────────────

export function BoxPlotChart({
  data,
  title,
  subtitle,
  footer,
  orientation = "vertical",
  height = 320,
  showGrid = true,
  showMean = true,
  showOutliers = true,
  notched = false,
  valueFormatter,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: BoxPlotChartProps) {
  // Hooks must be called unconditionally before any early returns
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(480)
  const [tooltip, setTooltip] = React.useState<TooltipState | null>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  if (loading) {
    return (
      <BoxPlotChartSkeleton
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
        data-slot="boxplot-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div
            className={chartHeaderVariants()}
            data-slot="boxplot-chart-header"
          >
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="boxplot-chart-empty"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <BarChart2 className="size-5" />
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
            data-slot="boxplot-chart-footer"
          >
            {footer}
          </div>
        )}
      </div>
    )
  }

  const items = resolveColors(data)
  const fmt = (v: number) => (valueFormatter ? valueFormatter(v) : String(v))

  // Compute domain
  const allValues = items.flatMap((d) => [
    d.min,
    d.q1,
    d.median,
    d.q3,
    d.max,
    ...(d.mean !== undefined ? [d.mean] : []),
    ...(d.outliers ?? []),
  ])
  const domainMin = Math.min(...allValues)
  const domainMax = Math.max(...allValues)
  const pad = (domainMax - domainMin) * 0.08
  const lo = domainMin - pad
  const hi = domainMax + pad
  const ticks = niceTicks(lo, hi, 5)
  const tickLo = ticks[0]
  const tickHi = ticks[ticks.length - 1]

  const m = orientation === "vertical" ? MARGIN_V : MARGIN_H

  // Drawable area
  const drawW = Math.max(width - m.left - m.right, 60)
  const drawH = Math.max(height - m.top - m.bottom, 60)

  // Value axis scale (value → px from top-left of drawable area)
  const valueScale =
    orientation === "vertical"
      ? (v: number) => drawH - ((v - tickLo) / (tickHi - tickLo)) * drawH
      : (v: number) => ((v - tickLo) / (tickHi - tickLo)) * drawW

  // Category axis — evenly split across the band axis
  const n = items.length
  const bandSize = (orientation === "vertical" ? drawW : drawH) / n
  const boxHalf = Math.min(bandSize * 0.28, 32)
  const centerOf = (i: number) => bandSize * (i + 0.5)

  return (
    <div
      className={cn(chartWrapperVariants(), className)}
      data-slot="boxplot-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="boxplot-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full"
        data-slot="boxplot-chart-chart"
        style={{ height }}
      >
        <svg width={width} height={height} style={{ overflow: "visible" }}>
          <g transform={`translate(${m.left}, ${m.top})`}>
            {/* Grid & value-axis ticks */}
            {ticks.map((t) => {
              const px = valueScale(t)
              return (
                <g key={t}>
                  {showGrid && (
                    <line
                      x1={orientation === "vertical" ? 0 : px}
                      y1={orientation === "vertical" ? px : 0}
                      x2={orientation === "vertical" ? drawW : px}
                      y2={orientation === "vertical" ? px : drawH}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                  )}
                  {orientation === "vertical" ? (
                    <text
                      x={-8}
                      y={px + 4}
                      textAnchor="end"
                      fontSize={11}
                      fill="var(--muted-foreground)"
                    >
                      {fmt(t)}
                    </text>
                  ) : (
                    <text
                      x={px}
                      y={drawH + 18}
                      textAnchor="middle"
                      fontSize={11}
                      fill="var(--muted-foreground)"
                    >
                      {fmt(t)}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Category labels & boxes */}
            {items.map((item, i) => {
              const center = centerOf(i)
              const isHovered = tooltip?.item.name === item.name

              return (
                <g key={item.name}>
                  {/* Category label */}
                  {orientation === "vertical" ? (
                    <text
                      x={center}
                      y={drawH + 18}
                      textAnchor="middle"
                      fontSize={11}
                      fill={
                        isHovered
                          ? "var(--foreground)"
                          : "var(--muted-foreground)"
                      }
                      fontWeight={isHovered ? 600 : 400}
                    >
                      {item.name}
                    </text>
                  ) : (
                    <text
                      x={-8}
                      y={center + 4}
                      textAnchor="end"
                      fontSize={11}
                      fill={
                        isHovered
                          ? "var(--foreground)"
                          : "var(--muted-foreground)"
                      }
                      fontWeight={isHovered ? 600 : 400}
                    >
                      {item.name}
                    </text>
                  )}

                  <BoxShape
                    item={item}
                    cx={center}
                    halfWidth={boxHalf}
                    scale={valueScale}
                    orientation={orientation}
                    notched={notched}
                    showMean={showMean}
                    showOutliers={showOutliers}
                    onHover={(it, ev) => {
                      const rect = containerRef.current?.getBoundingClientRect()
                      if (!rect) return
                      setTooltip({
                        item: it,
                        left: ev.clientX - rect.left,
                        top: ev.clientY - rect.top,
                      })
                    }}
                    onLeave={() => setTooltip(null)}
                    isHovered={isHovered}
                  />
                </g>
              )
            })}

            {/* Axis border lines */}
            {orientation === "vertical" ? (
              <>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={drawH}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={drawH}
                  x2={drawW}
                  y2={drawH}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
              </>
            ) : (
              <>
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={drawH}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={drawH}
                  x2={drawW}
                  y2={drawH}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
              </>
            )}
          </g>
        </svg>

        {/* Floating tooltip */}
        {tooltip && (
          <BoxTooltip
            item={tooltip.item}
            left={tooltip.left}
            top={tooltip.top}
            valueFormatter={valueFormatter}
          />
        )}
      </div>

      {footer && (
        <div className={chartFooterVariants()} data-slot="boxplot-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
