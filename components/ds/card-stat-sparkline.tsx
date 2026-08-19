import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import {
  type CardStatTrend,
  type CardStatSize,
  type FormatOptions,
  applyFormat,
  resolveTrend,
  TrendBadge,
  cardStatLabelVariants,
  cardStatValueVariants,
  cardStatDescriptionVariants,
  cardStatHeaderIconVariants,
} from "@/lib/card-stats-shared"

function toSvgPts(
  data: number[],
  w: number,
  h: number,
  pad = 4
): [number, number][] {
  if (data.length < 2) return []
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  return data.map((v, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    pad + (h - pad * 2) - ((v - min) / range) * (h - pad * 2),
  ])
}

function catmullRom(pts: [number, number][], tension = 0.4): string {
  if (pts.length < 2) return ""
  if (pts.length === 2)
    return `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]}`
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

function SparklineSvg({
  data,
  width = 120,
  height = 44,
  trend,
}: {
  data: number[]
  width?: number
  height?: number
  trend?: CardStatTrend | boolean
}) {
  const id = React.useId()
  const dir = resolveTrend(trend)
  const stroke =
    dir === "up"
      ? "var(--color-success)"
      : dir === "down"
        ? "var(--color-destructive)"
        : "currentColor"

  const pts = toSvgPts(data, width, height)
  const line = catmullRom(pts)
  const last = pts[pts.length - 1]
  const first = pts[0]
  const area =
    pts.length >= 2
      ? `${line} L ${last[0]} ${height} L ${first[0]} ${height} Z`
      : ""

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: stroke }} stopOpacity="0.22" />
          <stop offset="100%" style={{ stopColor: stroke }} stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={area} fill={`url(#sg-${id})`} />}
      {line && (
        <path
          d={line}
          fill="none"
          style={{ stroke }}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {last && (
        <circle cx={last[0]} cy={last[1]} r="2.5" style={{ fill: stroke }} />
      )}
    </svg>
  )
}

function FlatSparklineSvg({
  width = 120,
  height = 44,
}: {
  width?: number
  height?: number
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden
    >
      <line
        x1="4"
        y1={height / 2}
        x2={width - 4}
        y2={height / 2}
        stroke="currentColor"
        className="text-muted-foreground/25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
    </svg>
  )
}

export interface CardStatSparklineProps extends FormatOptions {
  label: string
  value: string | number
  data?: number[]
  trend?: CardStatTrend | boolean
  trendValue?: string
  description?: string
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
  locale?: UILocale
}

export function CardStatSparkline({
  label,
  value,
  data = [],
  trend,
  trendValue,
  description,
  icon: Icon,
  size = "sm",
  className,
  loading,
  empty,
  locale,
  ...fmt
}: CardStatSparklineProps) {
  const sparklineW = size === "sm" ? 90 : size === "lg" ? 150 : 120
  const sparklineH = size === "sm" ? 32 : size === "lg" ? 56 : 44

  if (loading) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-sparkline">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton
            className={cn(cardStatHeaderIconVariants({ size }), "rounded-md")}
          />
        </CardHeader>
        <CardContent
          className="flex items-end justify-between gap-4"
          data-slot="card-stat-sparkline-skeleton"
        >
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton
            className="rounded-xl"
            style={{ height: sparklineH, width: sparklineW }}
          />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className} data-slot="card-stat-sparkline">
        <CardHeader className="flex flex-row items-center justify-between">
          <span
            className={cn(
              "truncate text-muted-foreground",
              cardStatLabelVariants({ size })
            )}
          >
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon
                className={cardStatHeaderIconVariants({ size })}
                aria-hidden
              />
            </CardAction>
          )}
        </CardHeader>
        <CardContent
          className="flex items-end justify-between gap-4"
          data-slot="card-stat-sparkline"
        >
          <div className="flex flex-col gap-1.5">
            <p
              className={cn(
                cardStatValueVariants({ size }),
                "text-muted-foreground/25"
              )}
            >
              —
            </p>
            <p
              className={cn(
                "text-muted-foreground/40",
                cardStatDescriptionVariants({ size })
              )}
            >
              {locale
                ? UI_I18N[locale].cardStatSparkline.noHistory
                : "No history yet"}
            </p>
          </div>
          <FlatSparklineSvg width={sparklineW} height={sparklineH} />
        </CardContent>
      </Card>
    )
  }

  const display = applyFormat(value, fmt)
  const trendDir = resolveTrend(trend)

  return (
    <Card size="sm" className={className} data-slot="card-stat-sparkline">
      <CardHeader className="flex flex-row items-center justify-between">
        <span
          className={cn(
            "truncate text-muted-foreground",
            cardStatLabelVariants({ size })
          )}
        >
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon
              className={cardStatHeaderIconVariants({ size })}
              aria-hidden
            />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className={cardStatValueVariants({ size })}>{display}</p>
          {trendDir && trendValue ? (
            <TrendBadge trend={trendDir} value={trendValue} size={size} />
          ) : description ? (
            <p
              className={cn(
                "text-muted-foreground",
                cardStatDescriptionVariants({ size })
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {data.length >= 2 && (
          <SparklineSvg
            data={data}
            trend={trend}
            width={sparklineW}
            height={sparklineH}
          />
        )}
      </CardContent>
    </Card>
  )
}
