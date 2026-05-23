"use client"

import * as React from "react"
import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Gauge } from "lucide-react"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export type LegendPosition = "top" | "bottom" | "left" | "right"

export interface RadialChartItem {
  name: string
  value: number
  /** Overrides the auto --chart-N color for this bar */
  color?: string
}

export interface RadialChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadialChartItem[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  /**
   * Show a faint full-arc track behind each bar so the max extent is visible.
   * @default true
   */
  showTrack?: boolean
  showLegend?: boolean
  /** @default "bottom" */
  legendPosition?: LegendPosition
  showTooltip?: boolean
  /**
   * Text label rendered at the center of the chart.
   * When a single item is provided the item's value is shown above the label.
   */
  innerLabel?: string
  /**
   * Clamps the angular domain so all bars share the same maximum.
   * Ideal for percentage charts — pass `100` to keep all bars on a 0–100 scale.
   */
  maxValue?: number
  /** Start angle in degrees. 90 = top, 180 = left. @default 90 */
  startAngle?: number
  /** End angle in degrees. -270 = full circle CW, 0 = right. @default -270 */
  endAngle?: number
  /** Format bar values in the tooltip and center label */
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

function radialArcPath(
  cx: number,
  cy: number,
  r: number,
  fraction: number
): string {
  const startAngle = -Math.PI / 2 // top
  const endAngle = startAngle + fraction * 2 * Math.PI
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = fraction > 0.5 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

interface RadialChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  hasInnerLabel?: boolean
  className?: string
}

function RadialChartSkeleton({
  height = 320,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  hasInnerLabel = false,
  className,
}: RadialChartSkeletonProps) {
  const arcs = [
    { r: 42, fraction: 0.75, sw: 7 },
    { r: 32, fraction: 0.55, sw: 6 },
    { r: 22, fraction: 0.85, sw: 5 },
    { r: 12, fraction: 0.4, sw: 4 },
  ]

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

      <div
        className="relative flex items-center justify-center"
        style={{ height }}
      >
        <svg
          viewBox="0 0 100 100"
          width={Math.min(height, 260)}
          height={Math.min(height, 260)}
        >
          {arcs.map(({ r, fraction, sw }, i) => (
            <g key={i}>
              {/* Track (full circle) */}
              <circle
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={sw}
                opacity={0.2}
              />
              {/* Filled arc */}
              <path
                d={radialArcPath(50, 50, r, fraction)}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={sw}
                strokeLinecap="round"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            </g>
          ))}
          {hasInnerLabel && (
            <circle cx="50" cy="50" r="6" fill="var(--muted)" opacity={0.4} />
          )}
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

interface TooltipEntry {
  name?: string
  value?: number
  fill?: string
  payload?: Record<string, unknown>
}

function ChartTooltip({
  active,
  payload,
  valueFormatter,
}: {
  active?: boolean
  payload?: TooltipEntry[]
  valueFormatter?: (value: number) => string
}) {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const name = entry.name ?? (entry.payload?.name as string | undefined) ?? ""
  const value = entry.value ?? (entry.payload?.value as number | undefined)
  const color =
    entry.fill ??
    (entry.payload?.fill as string | undefined) ??
    "var(--chart-1)"

  return (
    <div className="min-w-36 rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="mb-1.5 text-xs font-semibold text-foreground">{name}</p>
      {value !== undefined && (
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="ml-auto text-xs font-semibold text-foreground tabular-nums">
            {valueFormatter ? valueFormatter(value) : value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Custom Legend ──────────────────────────────────────────────────────────

interface LegendItem {
  name: string
  color: string
}

function ChartLegend({
  items,
  hiddenItems,
  onToggle,
  vertical = false,
}: {
  items: LegendItem[]
  hiddenItems: Set<string>
  onToggle: (name: string) => void
  vertical?: boolean
}) {
  if (!items.length) return null

  return (
    <div
      className={cn(
        "flex gap-y-1",
        vertical
          ? "flex-col px-2 py-1"
          : "flex-wrap items-center justify-center gap-x-4 pt-3"
      )}
    >
      {items.map((item) => {
        const hidden = hiddenItems.has(item.name)
        return (
          <div
            key={item.name}
            role="button"
            tabIndex={0}
            aria-pressed={hidden}
            onClick={() => onToggle(item.name)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onToggle(item.name)
            }
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 select-none",
              "transition-opacity focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
              hidden ? "opacity-40" : "hover:opacity-70"
            )}
          >
            <span
              className="inline-block size-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function normalizeItems(
  raw: RadialChartItem[]
): (RadialChartItem & { fill: string })[] {
  return raw.map((item, i) => ({
    ...item,
    fill: item.color ?? CHART_COLORS[i % CHART_COLORS.length],
  }))
}

// ── RadialChart ────────────────────────────────────────────────────────────

export function RadialChart({
  data,
  title,
  subtitle,
  footer,
  height = 320,
  showTrack = true,
  showLegend = false,
  legendPosition = "bottom",
  showTooltip = true,
  innerLabel,
  maxValue,
  startAngle = 90,
  endAngle = -270,
  valueFormatter,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: RadialChartProps) {
  // Hooks must be called unconditionally before any early returns
  const items = React.useMemo(() => normalizeItems(data), [data])

  const [hiddenItems, setHiddenItems] = React.useState<Set<string>>(new Set())
  const toggleItem = React.useCallback((name: string) => {
    setHiddenItems((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const visibleItems = React.useMemo(
    () => items.filter((d) => !hiddenItems.has(d.name)),
    [items, hiddenItems]
  )

  const legendItems: LegendItem[] = items.map((d) => ({
    name: d.name,
    color: d.fill,
  }))

  if (loading) {
    return (
      <RadialChartSkeleton
        height={height}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        hasInnerLabel={!!innerLabel}
        className={className}
      />
    )
  }

  if (data.length === 0) {
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
            <Gauge className="size-5" />
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

  // Center label: show formatted value only for single-item charts
  const centerValue =
    innerLabel && visibleItems.length === 1
      ? valueFormatter
        ? valueFormatter(visibleItems[0].value)
        : visibleItems[0].value.toLocaleString()
      : undefined

  const isVerticalLegend =
    legendPosition === "left" || legendPosition === "right"

  return (
    <div className={cn(chartWrapperVariants(), className)} {...props}>
      {(title || subtitle) && (
        <div className={chartHeaderVariants()}>
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <RechartsRadialBarChart
            data={visibleItems}
            innerRadius="25%"
            outerRadius="90%"
            startAngle={startAngle}
            endAngle={endAngle}
            barSize={18}
            cx="50%"
            cy="50%"
          >
            {/* Fixed domain so every bar is scaled to the same max */}
            {maxValue !== undefined && (
              <PolarAngleAxis
                type="number"
                domain={[0, maxValue]}
                dataKey="value"
                angleAxisId={0}
                tick={false}
              />
            )}

            {showTooltip && (
              <Tooltip
                cursor={false}
                content={<ChartTooltip valueFormatter={valueFormatter} />}
              />
            )}

            {showLegend && (
              <Legend
                {...LEGEND_LAYOUT[legendPosition]}
                content={() => (
                  <ChartLegend
                    items={legendItems}
                    hiddenItems={hiddenItems}
                    onToggle={toggleItem}
                    vertical={isVerticalLegend}
                  />
                )}
              />
            )}

            <RadialBar
              dataKey="value"
              background={showTrack ? { fill: "var(--muted)" } : false}
              cornerRadius={6}
              isAnimationActive
              animationDuration={600}
            />
          </RechartsRadialBarChart>
        </ResponsiveContainer>

        {/* Center label overlay */}
        {innerLabel && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            {centerValue !== undefined && (
              <span className="text-2xl leading-none font-semibold text-foreground">
                {centerValue}
              </span>
            )}
            <span
              className={cn(
                "text-muted-foreground",
                centerValue !== undefined ? "text-xs" : "text-sm font-medium"
              )}
            >
              {innerLabel}
            </span>
          </div>
        )}
      </div>

      {footer && <div className={chartFooterVariants()}>{footer}</div>}
    </div>
  )
}
