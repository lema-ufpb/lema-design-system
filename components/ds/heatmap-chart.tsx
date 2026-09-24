"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Grid3X3 } from "lucide-react"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"

// ── Types ──────────────────────────────────────────────────────────────────

export type HeatmapPalette =
  "blue" | "green" | "orange" | "purple" | "red" | "custom"

export interface HeatmapCell {
  /** Column label */
  x: string
  /** Row label */
  y: string
  value: number
  /** Optional override label shown inside the cell */
  label?: string
}

export interface HeatmapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapCell[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  /** Preset color palette for the gradient scale */
  palette?: HeatmapPalette
  /** Low-end color for custom palette — any CSS color */
  colorFrom?: string
  /** High-end color for custom palette — any CSS color */
  colorTo?: string
  /** Display the numeric value inside each cell */
  showValues?: boolean
  /** Show a gradient legend bar below the heatmap */
  showScale?: boolean
  /** Fixed cell width in px; auto-sizes when omitted */
  cellSize?: number
  /** Fixed cell height in px — defaults to `cellSize` when set, or `32` for fluid-width cells */
  cellHeight?: number
  /** Gap between cells in px */
  gap?: number
  /** Format cell values in tooltips and inside cells */
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  /** Override the computed min (floor of the color scale) */
  min?: number
  /** Override the computed max (ceiling of the color scale) */
  max?: number
  /** Show animated skeleton in place of the chart while data loads */
  loading?: boolean
  locale?: UILocale
}

// ── Constants ──────────────────────────────────────────────────────────────

const PALETTES: Record<
  Exclude<HeatmapPalette, "custom">,
  { from: string; to: string }
> = {
  blue: { from: "var(--card)", to: "var(--chart-1)" },
  green: { from: "var(--card)", to: "var(--chart-2)" },
  orange: { from: "var(--card)", to: "var(--chart-3)" },
  purple: { from: "var(--card)", to: "var(--chart-4)" },
  red: { from: "var(--card)", to: "var(--chart-5)" },
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

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

/** CSS color-mix interpolation between two colors at `t` (0 = from, 1 = to) */
function mixColor(from: string, to: string, t: number) {
  const pct = Math.round(clamp(t, 0, 1) * 100)
  return `color-mix(in oklch, ${to} ${pct}%, ${from})`
}

// ── Skeleton ───────────────────────────────────────────────────────────────

interface HeatmapChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function HeatmapChartSkeleton({
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: HeatmapChartSkeletonProps) {
  const rows = 6
  const cols = 8

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="heatmap-chart-skeleton"
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

      <div className="w-full overflow-x-auto">
        <div className="w-full" style={{ padding: 2 }}>
          {/* X-axis header row */}
          <div className="mb-1 flex" style={{ paddingLeft: 96, gap: 3 }}>
            {Array.from({ length: cols }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-3 flex-1 rounded-sm"
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              />
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: rows }).map((_, row) => (
            <div
              key={row}
              className="flex items-center"
              style={{ marginBottom: 3 }}
            >
              {/* Y-axis label */}
              <div className="flex w-24 shrink-0 justify-end pr-2">
                <Skeleton
                  className="h-2.5 rounded-sm"
                  style={{
                    width: 40 + (row % 3) * 12,
                    animationDelay: `${row * 0.08}s`,
                  }}
                />
              </div>

              {/* Cells */}
              <div className="flex flex-1" style={{ gap: 3 }}>
                {Array.from({ length: cols }).map((_, col) => (
                  <Skeleton
                    key={col}
                    className="flex-1 rounded-sm"
                    style={{
                      height: 32,
                      animationDelay: `${Math.min((row * cols + col) * 0.03, 1.5)}s`,
                    }}
                  />
                ))}
              </div>
            </div>
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

// ── Sub-components ─────────────────────────────────────────────────────────

interface CellTooltipProps {
  x: string
  y: string
  formatted: string
}

function CellTooltip({ x, y, formatted }: CellTooltipProps) {
  return (
    <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg border border-border bg-card px-3 py-2 whitespace-nowrap shadow-lg">
      <p className="text-xs font-semibold text-foreground">
        {y} · {x}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{formatted}</p>
    </div>
  )
}

// ── HeatmapChart ───────────────────────────────────────────────────────────

export function HeatmapChart({
  data,
  title,
  subtitle,
  footer,
  palette = "blue",
  colorFrom,
  colorTo,
  showValues = false,
  showScale = true,
  cellSize,
  cellHeight,
  gap = 3,
  valueFormatter,
  format,
  decimals,
  currency,
  abbreviate,
  min: minProp,
  max: maxProp,
  loading = false,
  locale: localeProp,
  className,
  ...props
}: HeatmapChartProps) {
  const locale = useUILocale(localeProp)
  // Hooks must be called unconditionally before any early returns
  const [hovered, setHovered] = React.useState<{ x: string; y: string } | null>(
    null
  )

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

  const lookup = React.useMemo(() => {
    const m = new Map<string, HeatmapCell>()
    data.forEach((d) => m.set(`${d.y}|||${d.x}`, d))
    return m
  }, [data])

  if (loading) {
    return (
      <HeatmapChartSkeleton
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
        data-slot="heatmap-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div
            className={chartHeaderVariants()}
            data-slot="heatmap-chart-header"
          >
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="heatmap-chart-empty"
          style={{ height: 200 }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Grid3X3 className="size-5" />
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
            data-slot="heatmap-chart-footer"
          >
            {footer}
          </div>
        )}
      </div>
    )
  }

  // Derive ordered axis labels
  const xLabels = unique(data.map((d) => d.x))
  const yLabels = unique(data.map((d) => d.y))

  // Color scale
  const values = data.map((d) => d.value)
  const computedMin = minProp ?? Math.min(...values)
  const computedMax = maxProp ?? Math.max(...values)
  const range = computedMax - computedMin || 1

  const { from, to } =
    palette === "custom"
      ? { from: colorFrom ?? "var(--card)", to: colorTo ?? "var(--chart-1)" }
      : PALETTES[palette]

  const getCellColor = (value: number) =>
    mixColor(from, to, (value - computedMin) / range)

  // Text contrast: use foreground on light cells, card on dark cells
  const getTextColor = (value: number): string => {
    const t = (value - computedMin) / range
    return t > 0.55 ? "var(--card)" : "var(--foreground)"
  }

  const fixedCell = !!cellSize
  // Priority: explicit cellHeight > cellSize (when fixed) > 32px default (fluid mode)
  const effectiveHeight = cellHeight ?? (fixedCell ? cellSize : 32)
  const cellStyle = fixedCell
    ? { width: cellSize, height: effectiveHeight, flexShrink: 0 }
    : { flex: 1, minWidth: 0, height: effectiveHeight }

  return (
    <div
      className={cn(chartWrapperVariants(), className)}
      data-slot="heatmap-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="heatmap-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      {/* Grid */}
      <div className="w-full overflow-x-auto" data-slot="heatmap-chart-grid">
        <div className="w-full" style={{ padding: 2 }}>
          {/* X-axis labels */}
          <div className="mb-1 flex" style={{ paddingLeft: 96, gap }}>
            {xLabels.map((x) => (
              <div
                key={x}
                className={cn(
                  "min-w-0 truncate text-center text-xs transition-colors duration-150",
                  fixedCell ? "shrink-0" : "flex-1",
                  hovered?.x === x
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
                style={fixedCell ? { width: cellSize } : { flex: 1 }}
                title={x}
              >
                {x}
              </div>
            ))}
          </div>

          {/* Rows */}
          {yLabels.map((y) => (
            <div
              key={y}
              className="flex items-center"
              style={{ marginBottom: gap }}
            >
              {/* Y-axis label */}
              <div
                className={cn(
                  "w-24 shrink-0 pr-2 text-right text-xs transition-colors duration-150",
                  hovered?.y === y
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
                title={y}
              >
                <span className="block truncate">{y}</span>
              </div>

              {/* Cells */}
              <div className="flex flex-1" style={{ gap }}>
                {xLabels.map((x) => {
                  const cell = lookup.get(`${y}|||${x}`)
                  const isHovered = hovered?.x === x && hovered?.y === y
                  const isFaded =
                    hovered !== null && (hovered.x !== x || hovered.y !== y)

                  if (!cell) {
                    return (
                      <div
                        key={x}
                        className="shrink-0 rounded-sm bg-muted/30"
                        style={cellStyle}
                      />
                    )
                  }

                  const bg = getCellColor(cell.value)
                  const textColor = getTextColor(cell.value)

                  return (
                    <div
                      key={x}
                      className={cn(
                        "relative shrink-0 cursor-default rounded-sm transition-all duration-150",
                        isHovered
                          ? "z-10 scale-110 shadow-md ring-2 ring-foreground/40"
                          : isFaded
                            ? "opacity-40"
                            : "hover:ring-1 hover:ring-foreground/20"
                      )}
                      style={{ ...cellStyle, backgroundColor: bg }}
                      onMouseEnter={() => setHovered({ x, y })}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Value label */}
                      {showValues && (
                        <span
                          className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs leading-none font-semibold tabular-nums"
                          style={{ color: textColor }}
                        >
                          {cell.label ?? fmt(cell.value)}
                        </span>
                      )}

                      {/* Tooltip */}
                      {isHovered && (
                        <CellTooltip x={x} y={y} formatted={fmt(cell.value)} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color scale legend */}
      {showScale && (
        <div className="mt-4 flex items-center gap-3 px-1">
          <span className="text-xs text-muted-foreground tabular-nums">
            {fmt(computedMin)}
          </span>
          <div
            className="h-2.5 flex-1 rounded-full"
            style={{
              background: `linear-gradient(to right, ${from}, ${to})`,
            }}
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {fmt(computedMax)}
          </span>
        </div>
      )}

      {footer && (
        <div className={chartFooterVariants()} data-slot="heatmap-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
