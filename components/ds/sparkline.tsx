"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Variants ──

export const sparklineVariants = cva("overflow-visible", {
  variants: {
    intent: {
      primary: "fill-primary stroke-primary text-primary",
      success: "fill-success stroke-success text-success",
      destructive: "fill-destructive stroke-destructive text-destructive",
      warning: "fill-warning stroke-warning text-warning",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
})

// ── Types ──

export interface SparklineProps
  extends
    React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof sparklineVariants> {
  /**
   * Numeric series data array.
   */
  data: number[]
  /**
   * Sparkline type.
   */
  type?: "line" | "area" | "bar"
  /**
   * Line stroke thickness in pixels.
   */
  strokeWidth?: number
  /**
   * Shows a highlight circle at the latest (last) data point.
   */
  showLastPoint?: boolean
  /**
   * Height in pixels.
   */
  height?: number
  /**
   * Width in pixels or CSS percentage string.
   */
  width?: number | string
  /**
   * Loading skeleton indicator.
   */
  loading?: boolean
  /**
   * Locale for accessibility label formatting.
   */
  locale?: UILocale
}

// ── Component ──

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      type = "line",
      intent = "primary",
      strokeWidth = 2,
      showLastPoint = true,
      height = 36,
      width = "100%",
      loading = false,
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].sparkline
    const gradientId = React.useId()

    if (loading) {
      return (
        <Skeleton
          className={cn("rounded-sm", className)}
          style={{ height, width }}
        />
      )
    }

    if (!data || data.length === 0) {
      return null
    }

    const viewBoxWidth = 100
    const viewBoxHeight = height
    const paddingY = 4
    const paddingX = 4

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const effectiveHeight = viewBoxHeight - paddingY * 2
    const effectiveWidth = viewBoxWidth - paddingX * 2

    // Compute coordinates
    const points = data.map((val, idx) => {
      const x =
        data.length === 1
          ? viewBoxWidth / 2
          : paddingX + (idx / (data.length - 1)) * effectiveWidth
      const y =
        viewBoxHeight - paddingY - ((val - min) / range) * effectiveHeight
      return { x, y, val }
    })

    const pathD = points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`
    }, "")

    const areaD =
      points.length > 0
        ? `${pathD} L ${points[points.length - 1].x} ${viewBoxHeight} L ${points[0].x} ${viewBoxHeight} Z`
        : ""

    const lastPoint = points[points.length - 1]
    const firstPoint = points[0]

    const trendText = `${t.currentValue}: ${lastPoint.val} (${
      lastPoint.val >= firstPoint.val ? "+" : ""
    }${(lastPoint.val - firstPoint.val).toFixed(1)})`

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={{ width, height }}
        role="img"
        aria-label={trendText}
        className={cn(sparklineVariants({ intent }), className)}
        {...props}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {type === "bar" ? (
          <g>
            {points.map((pt, i) => {
              const barWidth = Math.max(
                2,
                (effectiveWidth / data.length) * 0.65
              )
              const barHeight = Math.max(2, viewBoxHeight - pt.y - paddingY)
              return (
                <rect
                  key={i}
                  x={pt.x - barWidth / 2}
                  y={pt.y}
                  width={barWidth}
                  height={barHeight}
                  rx={1}
                  className="fill-current opacity-80 transition-opacity hover:opacity-100"
                />
              )
            })}
          </g>
        ) : (
          <>
            {type === "area" && (
              <path d={areaD} fill={`url(#${gradientId})`} stroke="none" />
            )}
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {showLastPoint && lastPoint && (
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={strokeWidth + 1}
                className="fill-current"
              />
            )}
          </>
        )}
      </svg>
    )
  }
)

Sparkline.displayName = "Sparkline"
