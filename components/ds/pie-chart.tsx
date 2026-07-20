"use client"

import * as React from "react"
import {
  Label,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts"
import type { PieSectorDataItem } from "recharts"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  formatChartValue,
  formatValue,
  type FormatPreset,
} from "@/lib/format-utils"
import { PieChart as PieChartIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export type PieChartVariant = "pie" | "donut"
export type LegendPosition = "top" | "bottom" | "left" | "right"

export interface PieChartItem {
  label: string
  value: number
  /** Overrides the auto --chart-N color for this slice */
  color?: string
}

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PieChartItem[]
  variant?: PieChartVariant
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  showLegend?: boolean
  /** @default "bottom" */
  legendPosition?: LegendPosition
  showTooltip?: boolean
  /** Show percentage labels on the outside of each slice */
  showLabels?: boolean
  /** Center label shown when no slice is hovered (donut only) — defaults to "Total" */
  innerLabel?: string
  /** Gap between slices in degrees */
  paddingAngle?: number
  /** Format slice values in the tooltip, legend, and donut center */
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  /** Locale used for default number and percentage formatting */
  locale?: UILocale
  /** Show animated skeleton in place of the chart while data loads */
  loading?: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────

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

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// ── Skeleton ───────────────────────────────────────────────────────────────

function sectorPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const toRad = (d: number) => (d * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startDeg - 90))
  const y1 = cy + r * Math.sin(toRad(startDeg - 90))
  const x2 = cx + r * Math.cos(toRad(endDeg - 90))
  const y2 = cy + r * Math.sin(toRad(endDeg - 90))
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

interface PieChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  isDonut?: boolean
  className?: string
}

function PieChartSkeleton({
  height = 280,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  isDonut = false,
  className,
}: PieChartSkeletonProps) {
  // 5 sectors: 25%, 20%, 18%, 22%, 15% = angles 0→90, 90→162, 162→226.8, 226.8→306, 306→360
  const sectors: [number, number][] = [
    [0, 90],
    [90, 162],
    [162, 226.8],
    [226.8, 306],
    [306, 358.5],
  ]

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="pie-chart-skeleton"
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
          width={Math.min(height, 200)}
          height={Math.min(height, 200)}
          suppressHydrationWarning
        >
          {sectors.map(([start, end], i) => (
            <path
              key={i}
              d={sectorPath(50, 50, 40, start + 0.75, end - 0.75)}
              fill="var(--muted)"
              className="motion-safe:animate-pulse"
              style={{ animationDelay: `${i * 0.12}s` }}
              suppressHydrationWarning
            />
          ))}
          {isDonut && (
            <circle cx="50" cy="50" r={40 * 0.52} fill="var(--background)" />
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

// ── Active Shape ───────────────────────────────────────────────────────────

interface ActiveShapeProps {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
}

function ActiveShape(props: PieSectorDataItem): React.ReactElement {
  const {
    cx = 0,
    cy = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill,
    payload,
  } = props as ActiveShapeProps &
    PieSectorDataItem & { payload?: { color?: string } }

  const customFill = payload?.color ?? fill

  return (
    <g>
      {/* Main slice — expanded outward by 8px */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={customFill}
      />
      {/* Inner ring highlight shown only on donut variant */}
      {innerRadius > 0 && (
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 6}
          outerRadius={innerRadius - 2}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={customFill}
        />
      )}
    </g>
  )
}

// ── Donut Center Label ─────────────────────────────────────────────────────

interface CenterLabelProps {
  viewBox?: unknown
  value: number
  label: string
  percent: string | null
  fmt: (v: number) => string
}

function CenterLabel({
  viewBox,
  value,
  label,
  percent,
  fmt,
}: CenterLabelProps) {
  const { cx, cy } = (viewBox ?? {}) as { cx?: number; cy?: number }
  if (cx == null || cy == null) return <g />

  const display = fmt(value)
  const hasPercent = percent !== null

  return (
    <g>
      <text
        x={cx}
        y={cy - (hasPercent ? 12 : 7)}
        textAnchor="middle"
        fontSize={22}
        fontWeight={700}
        fill="var(--foreground)"
        fontFamily="inherit"
      >
        {display}
      </text>
      <text
        x={cx}
        y={cy + (hasPercent ? 7 : 10)}
        textAnchor="middle"
        fontSize={11}
        fill="var(--muted-foreground)"
        fontFamily="inherit"
      >
        {label}
      </text>
      {hasPercent && (
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          fontSize={11}
          fill="var(--muted-foreground)"
          fontFamily="inherit"
        >
          {percent}
        </text>
      )}
    </g>
  )
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string
  value: number
  payload: { color: string }
}

function ChartTooltip({
  active,
  payload,
  total,
  fmt,
  locale = "en-US",
}: {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  total: number
  fmt: (v: number) => string
  locale?: UILocale
}) {
  if (!active || !payload?.length) return null
  const entry = payload[0]

  const pct = formatValue(entry.value / total, "percent", {
    decimals: 1,
    locale,
  })

  return (
    <div className="min-w-36 rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <span
          className="inline-block size-2 shrink-0 rounded-full"
          style={{ backgroundColor: entry.payload.color }}
        />
        <span className="text-xs font-semibold text-foreground">
          {entry.name}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-4">
        <span className="text-xs text-muted-foreground tabular-nums">
          {fmt(entry.value)}
        </span>
        <span className="text-xs font-semibold text-foreground tabular-nums">
          {pct}
        </span>
      </div>
    </div>
  )
}

// ── Custom Legend ──────────────────────────────────────────────────────────

interface NormalizedPieItem {
  label: string
  value: number
  color: string
}

function ChartLegend({
  items,
  total,
  hiddenLabels,
  onToggle,
  fmt,
  position = "bottom",
  locale = "en-US",
}: {
  items: NormalizedPieItem[]
  total: number
  hiddenLabels: Set<string>
  onToggle: (label: string) => void
  fmt: (v: number) => string
  position?: LegendPosition
  locale?: UILocale
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-1",
        position === "top" ? "mb-2" : "mt-2"
      )}
      data-slot="pie-chart-legend"
    >
      {items.map((item) => {
        const hidden = hiddenLabels.has(item.label)
        const pct = formatValue(item.value / total, "percent", {
          decimals: 1,
          locale,
        })

        const display = fmt(item.value)

        return (
          <div
            key={item.label}
            role="button"
            tabIndex={0}
            aria-pressed={hidden}
            aria-label={item.label}
            onClick={() => onToggle(item.label)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onToggle(item.label)
            }
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 select-none",
              "transition-opacity focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
              hidden ? "opacity-40" : "hover:opacity-70"
            )}
          >
            <span
              className="inline-block size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {item.label}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {display}
            </span>
            <span className="w-12 text-right text-xs font-semibold text-foreground tabular-nums">
              {pct}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── PieChart ───────────────────────────────────────────────────────────────

export function PieChart({
  data,
  variant = "pie",
  title,
  subtitle,
  footer,
  height = 280,
  showLegend = true,
  legendPosition = "bottom",
  showTooltip = true,
  showLabels = false,
  innerLabel,
  paddingAngle = 0,
  valueFormatter,
  format,
  decimals,
  currency,
  abbreviate,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: PieChartProps) {
  const i18nInnerLabel =
    innerLabel ??
    UI_I18N[locale as UILocale]?.pieChart?.total ??
    UI_I18N["en-US"].pieChart.total
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

  const [activeLabel, setActiveLabel] = React.useState<string | null>(null)
  const [hiddenLabels, setHiddenLabels] = React.useState<Set<string>>(new Set())

  const toggleLabel = React.useCallback((label: string) => {
    setHiddenLabels((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }, [])

  const items = React.useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        color: d.color ?? CHART_COLORS[i % CHART_COLORS.length],
      })),
    [data]
  )

  // Items rendered in the pie — hidden ones are excluded so the remaining slices fill the space
  const visibleItems = React.useMemo(
    () => items.filter((d) => !hiddenLabels.has(d.label)),
    [items, hiddenLabels]
  )

  // Full total (used for legend percentages — stable even when slices are hidden)
  const total = React.useMemo(
    () => items.reduce((sum, d) => sum + d.value, 0),
    [items]
  )

  // Visible total (used for center label and tooltip)
  const visibleTotal = React.useMemo(
    () => visibleItems.reduce((sum, d) => sum + d.value, 0),
    [visibleItems]
  )

  const isDonut = variant === "donut"

  // Center label state — computed before early returns so renderCenterLabel hook is unconditional
  const centerItem =
    activeLabel !== null
      ? (visibleItems.find((i) => i.label === activeLabel) ?? null)
      : null
  const centerValue = centerItem?.value ?? visibleTotal
  const centerLabel = centerItem?.label ?? i18nInnerLabel
  const centerPercent = centerItem
    ? formatValue(centerItem.value / visibleTotal, "percent", {
        decimals: 1,
        locale,
      })
    : null

  const renderCenterLabel = React.useCallback(
    ({ viewBox }: { viewBox?: unknown }) => (
      <CenterLabel
        viewBox={viewBox}
        value={centerValue}
        label={centerLabel}
        percent={centerPercent}
        fmt={fmt}
      />
    ),
    [centerValue, centerLabel, centerPercent, fmt]
  )

  if (loading) {
    return (
      <PieChartSkeleton
        height={height}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        isDonut={isDonut}
        className={className}
      />
    )
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(chartWrapperVariants(), className)}
        data-slot="pie-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div className={chartHeaderVariants()} data-slot="pie-chart-header">
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="pie-chart-empty"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <PieChartIcon className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {UI_I18N[locale as UILocale]?.emptyState?.noData ??
                UI_I18N["en-US"].emptyState.noData}
            </p>
            <p className="mt-0.5 text-xs">
              {UI_I18N[locale as UILocale]?.emptyState?.dataWillAppear ??
                UI_I18N["en-US"].emptyState.dataWillAppear}
            </p>
          </div>
        </div>
        {footer && (
          <div className={chartFooterVariants()} data-slot="pie-chart-footer">
            {footer}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(chartWrapperVariants(), className)}
      data-slot="pie-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="pie-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      <ResponsiveContainer
        width="100%"
        height={height}
        data-slot="pie-chart-chart"
      >
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip
              content={
                <ChartTooltip total={visibleTotal} fmt={fmt} locale={locale} />
              }
            />
          )}

          {showLegend && (
            <Legend
              {...LEGEND_LAYOUT[legendPosition]}
              content={() => (
                <ChartLegend
                  items={items}
                  total={total}
                  hiddenLabels={hiddenLabels}
                  onToggle={toggleLabel}
                  fmt={fmt}
                  position={legendPosition}
                  locale={locale}
                />
              )}
            />
          )}

          <Pie
            data={visibleItems}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? "52%" : 0}
            outerRadius={showLabels ? "68%" : "78%"}
            paddingAngle={paddingAngle}
            strokeWidth={2}
            stroke="var(--card)"
            activeShape={ActiveShape}
            onMouseEnter={(d) =>
              setActiveLabel((d as unknown as { label: string }).label)
            }
            onMouseLeave={() => setActiveLabel(null)}
            label={
              showLabels
                ? ({ percent }: { percent?: number }) =>
                    (percent ?? 0) > 0.04
                      ? formatValue(percent ?? 0, "percent", {
                          decimals: 0,
                          locale,
                        })
                      : ""
                : false
            }
            labelLine={
              showLabels
                ? { stroke: "var(--muted-foreground)", strokeWidth: 1 }
                : false
            }
            shape={(props: unknown) => {
              const p = props as PieSectorDataItem & {
                payload?: { color?: string }
              }
              return <Sector {...p} fill={p.payload?.color ?? p.fill} />
            }}
          >
            {isDonut && <Label content={renderCenterLabel} position="center" />}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>

      {footer && (
        <div className={chartFooterVariants()} data-slot="pie-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
