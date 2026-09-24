"use client"

import * as React from "react"
import { ResponsiveContainer, Treemap, Tooltip } from "recharts"
import { cva } from "class-variance-authority"
import { ChevronRight, Home, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TreeMapItem {
  name: string
  value?: number
  color?: string
  children?: TreeMapItem[]
}

interface EnrichedItem extends Omit<TreeMapItem, "children"> {
  color: string
  /** True when this node has drillable children */
  _hasChildren: boolean
  /** Enriched children for drill-down (separate from recharts' `children`) */
  _children?: EnrichedItem[]
  children?: EnrichedItem[]
  [key: string]: unknown
}

export interface TreeMapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeMapItem[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  aspectRatio?: number
  /** Show name + value labels inside each cell (hidden below size threshold) */
  showLabels?: boolean
  showTooltip?: boolean
  /** Format the numeric value displayed in labels and tooltip */
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
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

// ── Skeleton ───────────────────────────────────────────────────────────────

const TREEMAP_TILES = [
  { x: 0, y: 0, w: 57, h: 54 },
  { x: 57, y: 0, w: 43, h: 30 },
  { x: 57, y: 30, w: 43, h: 24 },
  { x: 0, y: 54, w: 34, h: 46 },
  { x: 34, y: 54, w: 28, h: 46 },
  { x: 62, y: 54, w: 38, h: 24 },
  { x: 62, y: 78, w: 38, h: 22 },
]

interface TreeMapChartSkeletonProps {
  height?: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function TreeMapChartSkeleton({
  height = 360,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: TreeMapChartSkeletonProps) {
  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="treemap-chart-skeleton"
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

      <div className="relative w-full" style={{ height }}>
        {TREEMAP_TILES.map((tile, i) => (
          <Skeleton
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${tile.x}%`,
              top: `${tile.y}%`,
              width: `calc(${tile.w}% - 4px)`,
              height: `calc(${tile.h}% - 4px)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
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
  payload?: Record<string, unknown>
}

function ChartTooltip({
  active,
  payload,
  fmt,
}: {
  active?: boolean
  payload?: TooltipEntry[]
  fmt: (v: number) => string
}) {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const name = entry.name ?? (entry.payload?.name as string | undefined) ?? ""
  const value = entry.value ?? (entry.payload?.value as number | undefined)
  const color = (entry.payload?.color as string | undefined) ?? "var(--chart-1)"

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
            {fmt(value)}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function enrichData(
  items: TreeMapItem[],
  idx = 0,
  parentColor?: string
): EnrichedItem[] {
  return items.map((item, i) => {
    const color =
      item.color ?? parentColor ?? CHART_COLORS[(idx + i) % CHART_COLORS.length]
    const enrichedChildren = item.children?.length
      ? enrichData(item.children, idx + i + 1, color)
      : undefined
    return {
      ...item,
      color,
      _hasChildren: !!item.children?.length,
      _children: enrichedChildren,
      children: enrichedChildren,
    }
  })
}

// ── CustomizedContent ─────────────────────────────────────────────────────

interface CellDataProps {
  x?: number
  y?: number
  width?: number
  height?: number
  depth?: number
  name?: string
  value?: number
  color?: string
  _hasChildren?: boolean
  _children?: EnrichedItem[]
}

interface CellBehaviorProps {
  showLabels: boolean
  fmt: (v: number) => string
  locale: string
  onNodeClick?: (name: string, children: EnrichedItem[]) => void
}

function CustomizedContent(props: CellDataProps & CellBehaviorProps) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    depth = 0,
    name = "",
    value = 0,
    color = "var(--chart-1)",
    _hasChildren = false,
    _children,
    showLabels,
    fmt,
    locale,
    onNodeClick,
  } = props

  const formatted = fmt(value)
  const canLabel = showLabels && width > 64 && height > 44
  const nameFontSize = Math.max(Math.min(width / 11, 13), 10)
  const valueFontSize = Math.max(Math.min(width / 14, 11), 9)

  const handleClick = () => {
    if (_hasChildren && _children?.length && onNodeClick) {
      onNodeClick(name, _children)
    }
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: "var(--card)",
          strokeWidth: depth <= 1 ? 2 : 1,
          cursor: _hasChildren ? "pointer" : "default",
          transition: "filter 0.15s ease",
        }}
        onClick={handleClick}
        className={_hasChildren ? "hover:brightness-110" : undefined}
      />
      {canLabel && (
        <foreignObject
          x={x + 4}
          y={y + 4}
          width={width - 8}
          height={height - 8}
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-1"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <span
              className="w-full truncate text-center leading-snug font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
              style={{ fontSize: `${nameFontSize}px` }}
            >
              {name}
            </span>
            {value > 0 && (
              <span
                className="mt-0.5 w-full truncate text-center leading-snug text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
                style={{ fontSize: `${valueFontSize}px` }}
              >
                {formatted}
              </span>
            )}
            {_hasChildren && height > 60 && (
              <span
                className="mt-1 rounded-full bg-white/20 px-1.5 py-0.5 text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
                style={{ fontSize: "8px", lineHeight: "1.2" }}
              >
                {UI_I18N[locale as UILocale]?.treemap?.explore ??
                  "click to explore"}
              </span>
            )}
          </div>
        </foreignObject>
      )}
    </g>
  )
}

// ── TreeMapChart ───────────────────────────────────────────────────────────

export function TreeMapChart({
  data,
  title,
  subtitle,
  footer,
  height = 360,
  aspectRatio = 4 / 3,
  showLabels = true,
  showTooltip = true,
  valueFormatter,
  format,
  decimals,
  currency,
  abbreviate,
  loading = false,
  locale: localeProp,
  className,
  ...props
}: TreeMapChartProps) {
  const locale = useUILocale(localeProp)
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

  const enrichedData = React.useMemo(() => enrichData(data), [data])

  const [drillStack, setDrillStack] = React.useState<
    { name: string; items: EnrichedItem[] }[]
  >([])

  const handleNodeClick = React.useCallback(
    (name: string, children: EnrichedItem[]) => {
      setDrillStack((prev) => [...prev, { name, items: children }])
    },
    []
  )

  const handleBreadcrumbClick = React.useCallback((index: number) => {
    setDrillStack((prev) => prev.slice(0, index))
  }, [])

  const [prevData, setPrevData] = React.useState(data)
  if (data !== prevData) {
    setPrevData(data)
    if (drillStack.length > 0) setDrillStack([])
  }

  const currentData =
    drillStack.length > 0
      ? drillStack[drillStack.length - 1].items
      : enrichedData

  if (loading) {
    return (
      <TreeMapChartSkeleton
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
        data-slot="treemap-chart"
        {...props}
      >
        {(title || subtitle) && (
          <div
            className={chartHeaderVariants()}
            data-slot="treemap-chart-header"
          >
            {title && <p className={chartTitleVariants()}>{title}</p>}
            {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
          </div>
        )}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-muted-foreground"
          data-slot="treemap-chart-empty"
          style={{ height }}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Layers className="size-5" />
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
            data-slot="treemap-chart-footer"
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
      data-slot="treemap-chart"
      {...props}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="treemap-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      {drillStack.length > 0 && (
        <nav
          aria-label={UI_I18N[locale].treemap.breadcrumb}
          className="mb-3 flex flex-wrap items-center gap-0.5 text-xs"
        >
          <button
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            onClick={() => handleBreadcrumbClick(0)}
          >
            <Home className="size-3" />
            <span>Root</span>
          </button>

          {drillStack.map((seg, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="size-3 shrink-0 text-muted-foreground/50" />
              <button
                disabled={i === drillStack.length - 1}
                className={cn(
                  "rounded px-1.5 py-0.5 transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
                  i === drillStack.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => handleBreadcrumbClick(i + 1)}
              >
                {seg.name}
              </button>
            </React.Fragment>
          ))}
        </nav>
      )}

      <ResponsiveContainer
        width="100%"
        height={height}
        data-slot="treemap-chart-chart"
      >
        <Treemap
          data={currentData}
          dataKey="value"
          nameKey="name"
          aspectRatio={aspectRatio}
          stroke="transparent"
          isAnimationActive
          animationDuration={400}
          content={
            (
              <CustomizedContent
                showLabels={showLabels}
                fmt={fmt}
                locale={locale}
                onNodeClick={handleNodeClick}
              />
            ) as unknown as React.ReactElement
          }
        >
          {showTooltip && <Tooltip content={<ChartTooltip fmt={fmt} />} />}
        </Treemap>
      </ResponsiveContainer>

      {footer && (
        <div className={chartFooterVariants()} data-slot="treemap-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
