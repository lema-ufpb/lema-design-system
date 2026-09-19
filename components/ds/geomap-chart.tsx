"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import type { FeatureCollection } from "geojson"
import { cva } from "class-variance-authority"
import { Maximize2, Minimize2, Minus, Plus, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// react-simple-maps is heavy (~30kB) — load via next/dynamic with ssr:false
// to keep it out of the initial bundle and avoid SSR window mismatch
const ComposableMap = dynamic(
  () =>
    import("react-simple-maps").then((m) => ({
      default: m.ComposableMap as unknown as React.ComponentType<
        React.ComponentProps<typeof m.ComposableMap>
      >,
    })),
  { ssr: false }
) as unknown as typeof import("react-simple-maps").ComposableMap

const Geographies = dynamic(
  () =>
    import("react-simple-maps").then((m) => ({
      default: m.Geographies as unknown as React.ComponentType<
        React.ComponentProps<typeof m.Geographies>
      >,
    })),
  { ssr: false }
) as unknown as typeof import("react-simple-maps").Geographies

const Geography = dynamic(
  () =>
    import("react-simple-maps").then((m) => ({
      default: m.Geography as unknown as React.ComponentType<
        React.ComponentProps<typeof m.Geography>
      >,
    })),
  { ssr: false }
) as unknown as typeof import("react-simple-maps").Geography

const Marker = dynamic(
  () =>
    import("react-simple-maps").then((m) => ({
      default: m.Marker as unknown as React.ComponentType<
        React.ComponentProps<typeof m.Marker>
      >,
    })),
  { ssr: false }
) as unknown as typeof import("react-simple-maps").Marker

const ZoomableGroup = dynamic(
  () =>
    import("react-simple-maps").then((m) => ({
      default: m.ZoomableGroup as unknown as React.ComponentType<
        React.ComponentProps<typeof m.ZoomableGroup>
      >,
    })),
  { ssr: false }
) as unknown as typeof import("react-simple-maps").ZoomableGroup

// ── Types ──────────────────────────────────────────────────────────────────

export type GeoProjection =
  | "geoMercator"
  | "geoEqualEarth"
  | "geoNaturalEarth1"
  | "geoAlbersUsa"
  | "geoOrthographic"
  | "geoAzimuthalEqualArea"

/** Where to render the choropleth color legend */
export type LegendPosition =
  "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom"

/** Gradient bar direction in the color legend */
export type LegendOrientation = "horizontal" | "vertical"

export interface GeoMapFeature {
  /** Must match the GeoJSON feature's `id` or `properties.id` */
  id: string | number
  name?: string
  value?: number
  color?: string
  [key: string]: unknown
}

export interface GeoMapMarker {
  id: string | number
  coordinates: [number, number]
  label?: string
  value?: number
  color?: string
  size?: number
}

export interface GeoMapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * GeoJSON FeatureCollection object **or** a URL string.
   * When a string is passed, react-simple-maps fetches it internally —
   * ideal for files served from `/public` (e.g. `"/geojson/world.geojson"`).
   */
  geoData: FeatureCollection | string
  /**
   * Which feature property to use as the ID when the GeoJSON features have no
   * top-level `id` field (e.g. `"sigla"` for Brazilian states, `"ISO_A3"` for
   * Natural Earth country files). Takes precedence over `properties.id`.
   */
  featureIdProperty?: string
  /** Values to overlay on features (choropleth / highlight) — matched by id */
  data?: GeoMapFeature[]
  /** Point markers to render on top of the map */
  markers?: GeoMapMarker[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  /**
   * Chart canvas height — width is always 100%. A number is px; a string is
   * any CSS length (e.g. `"calc(100dvh - 3rem)"`).
   */
  height?: number | string
  /** D3 projection name — defaults to "geoMercator" */
  projection?: GeoProjection
  projectionConfig?: {
    scale?: number
    center?: [number, number]
    rotate?: [number, number, number]
  }
  /** Enable zoom and pan via scroll / drag */
  enableZoom?: boolean
  /** Min/max zoom multiplier when zoom is enabled */
  zoomRange?: [number, number]
  /**
   * Show zoom in / zoom out / reset buttons on the right edge of the map.
   * Implies zoom and pan (drag), so `enableZoom` is not needed. Defaults to
   * `false`.
   */
  showZoomControls?: boolean
  /**
   * Show an expand button in the top-right corner that opens the map in a
   * full-screen dialog (with the same data, legend, tooltip and zoom controls).
   * The button toggles to "collapse" inside the dialog. Defaults to `false`.
   */
  expandable?: boolean
  /** Called when the full-screen dialog opens or closes (`expandable` only) */
  onExpandedChange?: (expanded: boolean) => void
  /** Choropleth: interpolate fill between these two colors by value */
  colorRange?: [string, string]
  /** Default fill for features with no matching data entry */
  defaultFill?: string
  /** Feature IDs to highlight with a distinct stroke */
  selectedFeatureIds?: (string | number)[]
  /** Stroke color for selected features */
  selectedStroke?: string
  showTooltip?: boolean
  /**
   * Show a color scale legend when `colorRange` is set.
   * Defaults to `true` whenever `colorRange` is provided.
   */
  showLegend?: boolean
  /**
   * Where to render the legend.
   * Overlay options (`top-left`, `top-right`, `bottom-left`, `bottom-right`) float
   * inside the map canvas. `"bottom"` renders below the canvas.
   * Defaults to `"bottom-right"`.
   */
  legendPosition?: LegendPosition
  /** Short label displayed above the gradient bar in the legend */
  legendLabel?: string
  /** Gradient bar direction in the legend — defaults to `"horizontal"` */
  legendOrientation?: LegendOrientation
  onFeatureClick?: (
    feature: GeoMapFeature | null,
    originalId: string | number
  ) => void
  onMarkerClick?: (marker: GeoMapMarker) => void
  valueFormatter?: (value: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  locale?: UILocale
  /** Show animated skeleton in place of the map while data loads */
  loading?: boolean
}

// ── Skeleton ───────────────────────────────────────────────────────────────

interface GeoMapChartSkeletonProps {
  height?: number | string
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  className?: string
}

function GeoMapChartSkeleton({
  height = 400,
  hasTitle = false,
  hasSubtitle = false,
  hasFooter = false,
  className,
}: GeoMapChartSkeletonProps) {
  return (
    <div
      className={cn("flex w-full flex-col", className)}
      data-slot="geomap-chart-skeleton"
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

      <Skeleton
        className="relative w-full overflow-hidden rounded-md"
        style={{ height }}
      >
        {/* Continent blob overlays */}
        <svg
          viewBox={`0 0 800 ${typeof height === "number" ? height : 400}`}
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ opacity: 0.25 }}
        >
          {/* Europe/Africa blob */}
          <ellipse
            cx="400"
            cy="220"
            rx="80"
            ry="110"
            fill="var(--muted-foreground)"
          />
          {/* Americas blob */}
          <ellipse
            cx="200"
            cy="240"
            rx="65"
            ry="120"
            fill="var(--muted-foreground)"
          />
          {/* Asia blob */}
          <ellipse
            cx="560"
            cy="180"
            rx="100"
            ry="80"
            fill="var(--muted-foreground)"
          />
          {/* Oceania blob */}
          <ellipse
            cx="620"
            cy="340"
            rx="50"
            ry="35"
            fill="var(--muted-foreground)"
          />
          {/* North America upper */}
          <ellipse
            cx="160"
            cy="140"
            rx="60"
            ry="50"
            fill="var(--muted-foreground)"
          />
        </svg>
      </Skeleton>

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

const ZOOM_STEP = 1.5

/** Square icon button shared by the zoom controls and the expand action. */
const mapControlButtonClass = "bg-card/90 backdrop-blur-sm"

// Hover / keyboard-focus look of a feature. Classes (not inline style) so they
// win over the stroke attributes set for the resting state.
const geographyVariants = cva(
  "outline-none hover:stroke-primary hover:[stroke-width:1] hover:opacity-85 focus-visible:stroke-primary focus-visible:[stroke-width:1.5]"
)

// ── Helpers ────────────────────────────────────────────────────────────────

function resolveFeatureId(
  properties: Record<string, unknown> | null,
  id: string | number | undefined,
  featureIdProperty?: string
): string | number | null {
  if (id !== undefined && id !== null) return id as string | number
  if (featureIdProperty && properties?.[featureIdProperty] !== undefined)
    return properties[featureIdProperty] as string | number
  if (properties?.id !== undefined) return properties.id as string | number
  if (properties?.ID !== undefined) return properties.ID as string | number
  return null
}

function buildDataMap(
  data: GeoMapFeature[]
): Map<string | number, GeoMapFeature> {
  const map = new Map<string | number, GeoMapFeature>()
  for (const f of data) map.set(f.id, f)
  return map
}

function getValueRange(data: GeoMapFeature[]): [number, number] {
  const values = data.map((d) => d.value ?? 0).filter((v) => isFinite(v))
  if (!values.length) return [0, 1]
  return [Math.min(...values), Math.max(...values)]
}

function interpolateColor(color1: string, color2: string, t: number): string {
  const parse = (hex: string) => {
    const c = hex.replace("#", "")
    const full =
      c.length === 3
        ? c
            .split("")
            .map((x) => x + x)
            .join("")
        : c
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ]
  }

  // Fall back gracefully if colors are not hex
  try {
    const [r1, g1, b1] = parse(color1)
    const [r2, g2, b2] = parse(color2)
    const r = Math.round(r1 + (r2 - r1) * t)
    const g = Math.round(g1 + (g2 - g1) * t)
    const b = Math.round(b1 + (b2 - b1) * t)
    return `rgb(${r},${g},${b})`
  } catch {
    return t > 0.5 ? color2 : color1
  }
}

// ── Tooltip ────────────────────────────────────────────────────────────────

interface TooltipState {
  visible: boolean
  x: number
  y: number
  name: string
  value?: number
}

function MapTooltip({
  state,
  fmt,
}: {
  state: TooltipState
  fmt: (v: number) => string
}) {
  if (!state.visible) return null
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-24 rounded-lg border border-border bg-card px-3 py-2 shadow-md"
      style={{ left: state.x + 12, top: state.y - 12 }}
    >
      <p className="text-xs font-semibold text-foreground">{state.name}</p>
      {state.value !== undefined && (
        <p className="mt-0.5 text-xs text-muted-foreground">
          {fmt(state.value)}
        </p>
      )}
    </div>
  )
}

// ── ColorLegend ────────────────────────────────────────────────────────────

// Horizontal overlay: anchored to corner, natural size
const overlayPositionClasses: Record<
  Exclude<LegendPosition, "bottom">,
  string
> = {
  "top-left": "absolute top-2 left-2",
  "top-right": "absolute top-2 right-2",
  "bottom-left": "absolute bottom-2 left-2",
  "bottom-right": "absolute bottom-2 right-2",
}

// Vertical overlay: stretch full height of the canvas (inset-y-2)
const overlayPositionClassesVertical: Record<
  Exclude<LegendPosition, "bottom">,
  string
> = {
  "top-left": "absolute inset-y-2 left-2",
  "top-right": "absolute inset-y-2 right-2",
  "bottom-left": "absolute inset-y-2 left-2",
  "bottom-right": "absolute inset-y-2 right-2",
}

function ColorLegend({
  colorRange,
  valueRange: [min, max],
  fmt,
  label,
  position = "bottom-right",
  orientation = "horizontal",
  reserveTopRight = false,
}: {
  colorRange: [string, string]
  valueRange: [number, number]
  fmt: (v: number) => string
  label?: string
  position?: LegendPosition
  orientation?: LegendOrientation
  /** Keep the top-right corner free for the expand button */
  reserveTopRight?: boolean
}) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const barRef = React.useRef<HTMLDivElement>(null)

  function handleBarMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!barRef.current) return
    const rect = barRef.current.getBoundingClientRect()
    const t =
      orientation === "vertical"
        ? Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
        : Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    // vertical: top = max color, bottom = min color → value decreases downward
    const value =
      orientation === "vertical" ? max - t * (max - min) : min + t * (max - min)
    setHoverValue(value)
  }

  const gradientBar = (
    <TooltipProvider>
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger asChild>
          <div
            ref={barRef}
            className={cn(
              "cursor-crosshair rounded-sm",
              orientation === "vertical" ? "w-3 flex-1" : "h-2 w-full"
            )}
            style={{
              background:
                orientation === "vertical"
                  ? `linear-gradient(to bottom, ${colorRange[1]}, ${colorRange[0]})`
                  : `linear-gradient(to right, ${colorRange[0]}, ${colorRange[1]})`,
            }}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => {
              setTooltipOpen(false)
              setHoverValue(null)
            }}
            onMouseMove={handleBarMouseMove}
          />
        </TooltipTrigger>
        <TooltipContent side={orientation === "vertical" ? "right" : "top"}>
          {hoverValue !== null ? fmt(hoverValue) : ""}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  const isOverlay = position !== "bottom"

  const card =
    orientation === "vertical" ? (
      <div
        className={cn(
          "flex flex-col items-center gap-1 rounded-md border border-border bg-card/90 px-2.5 py-2 text-xs shadow-sm backdrop-blur-sm",
          isOverlay && "h-full"
        )}
      >
        {label && (
          <p className="leading-none font-medium text-foreground">{label}</p>
        )}
        <span className="leading-none text-muted-foreground">{fmt(max)}</span>
        {gradientBar}
        <span className="leading-none text-muted-foreground">{fmt(min)}</span>
      </div>
    ) : (
      <div className="flex min-w-32 flex-col gap-1.5 rounded-md border border-border bg-card/90 px-3 py-2 text-xs shadow-sm backdrop-blur-sm">
        {label && (
          <p className="leading-none font-medium text-foreground">{label}</p>
        )}
        {gradientBar}
        <div className="flex justify-between text-muted-foreground">
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      </div>
    )

  if (position === "bottom") {
    return <div className="mt-3">{card}</div>
  }

  const shiftForCorner = reserveTopRight && position === "top-right"
  const posClass = shiftForCorner
    ? orientation === "vertical"
      ? "absolute top-12 right-2 bottom-2"
      : "absolute top-2 right-12"
    : orientation === "vertical"
      ? overlayPositionClassesVertical[position]
      : overlayPositionClasses[position]

  return <div className={cn("z-10", posClass)}>{card}</div>
}

// ── GeoMapChart ────────────────────────────────────────────────────────────

interface GeoMapChartViewProps extends Omit<
  GeoMapChartProps,
  "expandable" | "onExpandedChange"
> {
  /** Corner button state — set by the `expandable` wrapper. */
  expandAction?: { expanded: boolean; onToggle: () => void }
}

function GeoMapChartView({
  geoData,
  featureIdProperty,
  data = [],
  markers = [],
  title,
  subtitle,
  footer,
  height = 400,
  projection = "geoMercator",
  projectionConfig,
  enableZoom = false,
  zoomRange = [1, 8],
  showZoomControls = false,
  expandAction,
  colorRange,
  defaultFill,
  selectedFeatureIds = [],
  selectedStroke,
  showTooltip = true,
  showLegend,
  legendPosition = "bottom-right",
  legendOrientation = "horizontal",
  legendLabel,
  onFeatureClick,
  onMarkerClick,
  valueFormatter,
  format,
  decimals,
  currency,
  abbreviate,
  locale = "en-US",
  loading = false,
  className,
  ...props
}: GeoMapChartViewProps) {
  const t = UI_I18N[locale]?.geomapChart ?? UI_I18N["en-US"].geomapChart

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

  const shouldShowLegend = showLegend !== false && !!colorRange

  const dataMap = React.useMemo(() => buildDataMap(data), [data])
  const valueRange = React.useMemo(() => getValueRange(data), [data])
  const selectedSet = React.useMemo(
    () => new Set(selectedFeatureIds.map(String)),
    [selectedFeatureIds]
  )

  const [tooltip, setTooltip] = React.useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    name: "",
  })

  const containerRef = React.useRef<HTMLDivElement>(null)

  // Controlled zoom: ZoomableGroup only moves programmatically when its
  // `zoom` / `center` props change, so external buttons need this state.
  // `center` must start at the projection center, otherwise the group would
  // recenter the map on [0, 0] when it mounts.
  const zoomEnabled = enableZoom || showZoomControls
  const initialCenter: [number, number] = projectionConfig?.center ?? [0, 0]
  const [initialLon, initialLat] = initialCenter
  const [minZoom, maxZoom] = zoomRange
  const framingKey = `${initialLon},${initialLat},${projectionConfig?.scale}`
  const [viewState, setViewState] = React.useState<{
    key: string
    zoom: number
    center: [number, number]
  }>({ key: framingKey, zoom: 1, center: initialCenter })

  // A new framing (another projection center / scale) restarts from the
  // default view — derived here instead of reset in an effect.
  const view =
    viewState.key === framingKey
      ? viewState
      : { key: framingKey, zoom: 1, center: initialCenter }

  const setView = (next: { zoom: number; center: [number, number] }) =>
    setViewState({ key: framingKey, ...next })
  const changeZoom = (factor: number) =>
    setView({
      center: view.center,
      zoom: Math.min(maxZoom, Math.max(minZoom, view.zoom * factor)),
    })
  const resetZoom = () => setView({ zoom: 1, center: initialCenter })

  if (loading) {
    return (
      <GeoMapChartSkeleton
        height={height}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        className={className}
      />
    )
  }

  function getFeatureFill(featureId: string | number | null): string {
    if (featureId === null) return defaultFill ?? "var(--muted)"

    const entry = dataMap.get(featureId) ?? dataMap.get(String(featureId))

    if (entry?.color) return entry.color

    if (colorRange && entry?.value !== undefined) {
      const [min, max] = valueRange
      const t = max === min ? 0 : (entry.value - min) / (max - min)
      return interpolateColor(colorRange[0], colorRange[1], t)
    }

    return defaultFill ?? "var(--muted)"
  }

  function handleFeatureEnter(
    e: React.MouseEvent,
    featureId: string | number | null
  ) {
    if (!showTooltip) return
    const entry =
      featureId !== null
        ? (dataMap.get(featureId) ?? dataMap.get(String(featureId)))
        : undefined
    const rect = containerRef.current?.getBoundingClientRect()
    const x = rect ? e.clientX - rect.left : e.clientX
    const y = rect ? e.clientY - rect.top : e.clientY
    setTooltip({
      visible: true,
      x,
      y,
      name: entry?.name ?? String(featureId ?? ""),
      value: entry?.value,
    })
  }

  function handleFeatureLeave() {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!tooltip.visible) return
    const rect = containerRef.current?.getBoundingClientRect()
    const x = rect ? e.clientX - rect.left : e.clientX
    const y = rect ? e.clientY - rect.top : e.clientY
    setTooltip((prev) => ({ ...prev, x, y }))
  }

  const mapContent = (
    <Geographies geography={geoData}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const rawId = resolveFeatureId(
            geo.properties as Record<string, unknown> | null,
            geo.id as string | number | undefined,
            featureIdProperty
          )
          const isSelected = rawId !== null && selectedSet.has(String(rawId))
          const fill = getFeatureFill(rawId)

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={fill}
              stroke={
                isSelected
                  ? (selectedStroke ?? "var(--primary)")
                  : "var(--background)"
              }
              strokeWidth={isSelected ? 1.5 : 0.5}
              // keeps the border width constant while zoomed in
              vectorEffect={showZoomControls ? "non-scaling-stroke" : undefined}
              // react-simple-maps v5 has no per-state `style`: the resting
              // look is SVG attributes (above), hover/focus are classes
              className={cn(
                geographyVariants(),
                onFeatureClick ? "cursor-pointer" : "cursor-default"
              )}
              onMouseEnter={(e) => handleFeatureEnter(e, rawId)}
              onMouseLeave={handleFeatureLeave}
              onMouseMove={handleMouseMove}
              onClick={() =>
                onFeatureClick?.(
                  rawId !== null
                    ? (dataMap.get(rawId) ?? dataMap.get(String(rawId)) ?? null)
                    : null,
                  rawId ?? ""
                )
              }
            />
          )
        })
      }
    </Geographies>
  )

  const markerElements = markers.map((m) => (
    <Marker key={m.id} coordinates={m.coordinates}>
      <circle
        r={m.size ?? 5}
        fill={m.color ?? "var(--chart-1)"}
        stroke="var(--background)"
        strokeWidth={1}
        style={{ cursor: onMarkerClick ? "pointer" : "default" }}
        onMouseEnter={(e) => {
          if (!showTooltip) return
          const rect = containerRef.current?.getBoundingClientRect()
          const x = rect ? e.clientX - rect.left : e.clientX
          const y = rect ? e.clientY - rect.top : e.clientY
          setTooltip({
            visible: true,
            x,
            y,
            name: m.label ?? String(m.id),
            value: m.value,
          })
        }}
        onMouseLeave={handleFeatureLeave}
        onClick={() => onMarkerClick?.(m)}
      />
      {m.label && (
        <text
          textAnchor="middle"
          y={-(m.size ?? 5) - 3}
          style={{
            fontSize: "10px",
            fill: "var(--foreground)",
            pointerEvents: "none",
          }}
        >
          {m.label}
        </text>
      )}
    </Marker>
  ))

  return (
    <div
      ref={containerRef}
      className={cn(
        chartWrapperVariants(),
        "relative",
        !expandAction?.expanded && className
      )}
      data-slot="geomap-chart"
      {...(expandAction?.expanded ? {} : props)}
    >
      {(title || subtitle) && (
        <div className={chartHeaderVariants()} data-slot="geomap-chart-header">
          {title && <p className={chartTitleVariants()}>{title}</p>}
          {subtitle && <p className={chartSubtitleVariants()}>{subtitle}</p>}
        </div>
      )}

      {/* map canvas + overlay legend */}
      <div className="relative" data-slot="geomap-chart-map">
        <div style={{ height }} className="w-full overflow-hidden rounded-md">
          <ComposableMap
            projection={projection}
            projectionConfig={projectionConfig}
            style={{ width: "100%", height: "100%" }}
          >
            {zoomEnabled ? (
              <ZoomableGroup
                zoom={view.zoom}
                center={view.center}
                minZoom={minZoom}
                maxZoom={maxZoom}
                onMoveEnd={({ coordinates, zoom }) => {
                  if (!coordinates || zoom === undefined) return
                  setView({ zoom, center: coordinates })
                }}
              >
                {mapContent}
                {markerElements}
              </ZoomableGroup>
            ) : (
              <>
                {mapContent}
                {markerElements}
              </>
            )}
          </ComposableMap>
        </div>

        {expandAction && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className={mapControlButtonClass}
              aria-label={expandAction.expanded ? t.collapse : t.expand}
              title={expandAction.expanded ? t.collapse : t.expand}
              aria-haspopup={expandAction.expanded ? undefined : "dialog"}
              aria-expanded={expandAction.expanded ? undefined : false}
              onClick={expandAction.onToggle}
            >
              {expandAction.expanded ? <Minimize2 /> : <Maximize2 />}
            </Button>
          </div>
        )}

        {showZoomControls && (
          <div
            role="group"
            aria-label={t.zoomControls}
            className={cn(
              "absolute top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1",
              // a vertical legend on the right owns that edge — move the buttons across
              shouldShowLegend &&
                legendOrientation === "vertical" &&
                legendPosition.endsWith("right")
                ? "left-2"
                : "right-2"
            )}
          >
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className={mapControlButtonClass}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              disabled={view.zoom >= maxZoom}
              onClick={() => changeZoom(ZOOM_STEP)}
            >
              <Plus />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className={mapControlButtonClass}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              disabled={view.zoom <= minZoom}
              onClick={() => changeZoom(1 / ZOOM_STEP)}
            >
              <Minus />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className={mapControlButtonClass}
              aria-label={t.resetZoom}
              title={t.resetZoom}
              onClick={resetZoom}
            >
              <RotateCcw />
            </Button>
          </div>
        )}

        {shouldShowLegend && legendPosition !== "bottom" && (
          <ColorLegend
            colorRange={colorRange!}
            valueRange={valueRange}
            fmt={fmt}
            label={legendLabel}
            position={legendPosition}
            orientation={legendOrientation}
            reserveTopRight={!!expandAction}
          />
        )}
      </div>

      {shouldShowLegend && legendPosition === "bottom" && (
        <ColorLegend
          colorRange={colorRange!}
          valueRange={valueRange}
          fmt={fmt}
          label={legendLabel}
          position="bottom"
          orientation={legendOrientation}
        />
      )}

      {showTooltip && <MapTooltip state={tooltip} fmt={fmt} />}

      {footer && (
        <div className={chartFooterVariants()} data-slot="geomap-chart-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export function GeoMapChart({
  expandable = false,
  onExpandedChange,
  ...viewProps
}: GeoMapChartProps) {
  const [expanded, setExpanded] = React.useState(false)
  const locale = viewProps.locale ?? "en-US"
  const t = UI_I18N[locale]?.geomapChart ?? UI_I18N["en-US"].geomapChart

  if (!expandable) return <GeoMapChartView {...viewProps} />

  const setOpen = (next: boolean) => {
    setExpanded(next)
    onExpandedChange?.(next)
  }

  return (
    <>
      <GeoMapChartView
        {...viewProps}
        expandAction={{ expanded: false, onToggle: () => setOpen(true) }}
      />
      <Dialog open={expanded} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none p-4 sm:max-w-none"
        >
          <DialogTitle className="sr-only">
            {viewProps.title ?? t.expandedTitle}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {viewProps.subtitle ?? t.expandedTitle}
          </DialogDescription>
          <GeoMapChartView
            {...viewProps}
            title={undefined}
            subtitle={undefined}
            footer={undefined}
            height="calc(100dvh - 2rem)"
            expandAction={{ expanded: true, onToggle: () => setOpen(false) }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

// Code-split wrapper — keeps react-simple-maps out of the initial bundle
// Consumer usage: const GeoMapChart = dynamic(() => import("@/components/ds/geomap-chart").then(m => m.GeoMapChart), { ssr:false })
// Also exported here as convenience (self-resolving, ssr:false)
export const DynamicGeoMapChart = dynamic(
  () => Promise.resolve({ default: GeoMapChart }),
  { ssr: false, loading: () => null }
)
