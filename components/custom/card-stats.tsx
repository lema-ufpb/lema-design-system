import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  BarChart2Icon,
  ArrowLeftRightIcon,
  InboxIcon,
  ActivityIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Shared types ────────────────────────────────────────────────────────────

export type CardStatFormat = "currency" | "percent" | "integer" | "float"
export type CardStatTrend = "up" | "down" | "neutral"

// ── Shared helpers ──────────────────────────────────────────────────────────

function formatValue(
  value: string | number,
  format?: CardStatFormat,
  opts?: { decimals?: number; locale?: string; currency?: string }
): string {
  if (!format || typeof value === "string") return String(value)
  const num = Number(value)
  const locale = opts?.locale ?? "en-US"
  const currency = opts?.currency ?? "USD"
  const decimals = opts?.decimals
  switch (format) {
    case "currency":
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals ?? 2,
        maximumFractionDigits: decimals ?? 2,
      }).format(num)
    case "percent":
      return (
        new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals ?? 1,
          maximumFractionDigits: decimals ?? 1,
        }).format(num) + "%"
      )
    case "integer":
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    case "float":
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals ?? 2,
        maximumFractionDigits: decimals ?? 2,
      }).format(num)
  }
}

const TREND_ICONS: Record<CardStatTrend, React.ElementType> = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  neutral: MinusIcon,
}

const TREND_COLORS: Record<CardStatTrend, string> = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

function resolveTrend(
  trend: CardStatTrend | boolean | undefined
): CardStatTrend | false {
  if (trend === true) return "up"
  if (!trend) return false
  return trend
}

// Shared format props — spread-captured in every component
interface FmtProps {
  format?: CardStatFormat
  decimals?: number
  locale?: string
  currency?: string
  valueFormatter?: (value: number | string) => string
}

function applyFmt(value: number | string, opts: FmtProps): string {
  return opts.valueFormatter
    ? opts.valueFormatter(value)
    : formatValue(value, opts.format, {
        decimals: opts.decimals,
        locale: opts.locale,
        currency: opts.currency,
      })
}

// ── Internal: TrendBadge ────────────────────────────────────────────────────

function TrendBadge({ trend, value }: { trend: CardStatTrend; value: string }) {
  const Icon = TREND_ICONS[trend]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
        trend === "up" && "bg-success/10 text-success",
        trend === "down" && "bg-destructive/10 text-destructive",
        trend === "neutral" && "bg-muted text-muted-foreground"
      )}
    >
      <Icon className="size-3 shrink-0" aria-hidden />
      {value}
    </span>
  )
}

// ── Internal: CardStatEmptySlot ─────────────────────────────────────────────
//
// Reusable centred empty-state slot for all card variants.
// `inverted` switches colours to white/opacity for highlight cards.

function CardStatEmptySlot({
  icon: Icon,
  message,
  sub,
  inverted = false,
}: {
  icon: React.ElementType
  message: string
  sub?: string
  inverted?: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-2xl",
          inverted ? "bg-white/15" : "bg-muted/60"
        )}
      >
        <Icon
          className={cn(
            "size-4",
            inverted ? "text-white/50" : "text-muted-foreground/50"
          )}
          aria-hidden
        />
      </div>
      <p
        className={cn(
          "text-xs font-medium",
          inverted ? "text-white/60" : "text-muted-foreground/70"
        )}
      >
        {message}
      </p>
      {sub && (
        <p
          className={cn(
            "text-xs leading-tight",
            inverted ? "text-white/40" : "text-muted-foreground/50"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

// ── 1. CardStatCompact ───────────────────────────────────────────────────────

export interface CardStatCompactProps extends FmtProps {
  label: string
  value: string | number
  trend?: CardStatTrend | boolean
  trendValue?: string
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatCompact({
  label,
  value,
  trend,
  trendValue,
  icon: Icon,
  className,
  loading,
  empty,
  ...fmt
}: CardStatCompactProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardContent className="flex items-center gap-3 py-4">
          <Skeleton className="size-10 shrink-0 rounded-2xl" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-2.5 w-20 rounded-md" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted/50">
            <ActivityIcon
              className="size-5 text-muted-foreground/30"
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-muted-foreground">
              {label}
            </p>
            <p className="text-xl font-semibold tracking-tight text-muted-foreground/25">
              —
            </p>
          </div>
          <span className="text-xs text-muted-foreground/30">No data</span>
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)

  return (
    <Card size="sm" className={className}>
      <CardContent className="flex items-center gap-3 py-4">
        {Icon && (
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
              trendDir === "up" && "bg-success/10",
              trendDir === "down" && "bg-destructive/10",
              !trendDir && "bg-muted"
            )}
          >
            <Icon
              className={cn(
                "size-5",
                trendDir === "up" && "text-success",
                trendDir === "down" && "text-destructive",
                !trendDir && "text-muted-foreground"
              )}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-xl font-semibold tracking-tight">{display}</p>
        </div>
        {trendDir && trendValue && (
          <TrendBadge trend={trendDir} value={trendValue} />
        )}
      </CardContent>
    </Card>
  )
}

// ── 2. CardStatProgress ──────────────────────────────────────────────────────

export interface CardStatProgressProps extends FmtProps {
  label: string
  value: number
  goal: number
  description?: string
  icon?: React.ElementType
  showPercent?: boolean
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatProgress({
  label,
  value,
  goal,
  description,
  icon: Icon,
  showPercent = true,
  className,
  loading,
  empty,
  ...fmt
}: CardStatProgressProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <Skeleton className="h-2 rounded-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-32 rounded-md" />
            <Skeleton className="h-3 w-8 rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
              —
            </p>
            <span className="shrink-0 text-sm text-muted-foreground/25">
              / —
            </span>
          </div>
          <div className="h-2 w-full rounded-full border border-dashed border-muted-foreground/20" />
          <p className="text-center text-xs text-muted-foreground/50">
            No goal set yet
          </p>
        </CardContent>
      </Card>
    )
  }

  const displayValue = applyFmt(value, fmt)
  const displayGoal = applyFmt(goal, fmt)
  const pct = Math.min(100, Math.round((value / goal) * 100))

  const pctColor =
    pct >= 100
      ? "text-success"
      : pct >= 75
        ? "text-[var(--highlight-sky)]"
        : pct >= 50
          ? "text-warning"
          : "text-muted-foreground"

  const barColor =
    pct >= 100
      ? "[&>[data-slot=progress-indicator]]:bg-success"
      : pct >= 75
        ? "[&>[data-slot=progress-indicator]]:bg-[var(--highlight-sky)]"
        : pct >= 50
          ? "[&>[data-slot=progress-indicator]]:bg-warning"
          : ""

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-2xl font-semibold tracking-tight">
            {displayValue}
          </p>
          <span className="shrink-0 text-sm text-muted-foreground">
            / {displayGoal}
          </span>
        </div>
        <Progress value={pct} className={cn("h-2", barColor)} />
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {showPercent && (
            <p
              className={cn(
                "ml-auto text-xs font-semibold tabular-nums",
                pctColor
              )}
            >
              {pct}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ── 3. CardStatComparison ────────────────────────────────────────────────────

export interface CardStatComparisonProps extends FmtProps {
  label: string
  current: number
  previous: number
  currentLabel?: string
  previousLabel?: string
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatComparison({
  label,
  current,
  previous,
  currentLabel,
  previousLabel,
  icon: Icon,
  className,
  loading,
  empty,
  locale: fmtLocale,
  ...fmt
}: CardStatComparisonProps) {
  const uiLocale = (fmtLocale ?? "en-US") as UILocale
  currentLabel ??= UI_I18N[uiLocale].cardStats.thisPeriod
  previousLabel ??= UI_I18N[uiLocale].cardStats.lastPeriod
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1.5 pr-4">
              <Skeleton className="h-2.5 w-20 rounded-md" />
              <Skeleton className="h-7 w-24" />
            </div>
            <div className="flex flex-col gap-1.5 border-l pl-4">
              <Skeleton className="h-2.5 w-20 rounded-md" />
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-0.5 pr-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {currentLabel}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
                —
              </p>
            </div>
            <div className="flex flex-col gap-0.5 border-l pl-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {previousLabel}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-muted-foreground/20">
                —
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-muted/30 px-3 py-2">
            <ArrowLeftRightIcon
              className="size-3 text-muted-foreground/40"
              aria-hidden
            />
            <span className="text-xs text-muted-foreground/50">
              {UI_I18N[uiLocale].cardStats.noComparison}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const f = (v: number) => applyFmt(v, { ...fmt, locale: fmtLocale })
  const delta =
    previous !== 0 ? ((current - previous) / Math.abs(previous)) * 100 : 0
  const trendDir: CardStatTrend =
    delta > 0.05 ? "up" : delta < -0.05 ? "down" : "neutral"
  const deltaLabel = `${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-0.5 pr-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {currentLabel}
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              {f(current)}
            </p>
          </div>
          <div className="flex flex-col gap-0.5 border-l pl-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {previousLabel}
            </p>
            <p className="text-2xl font-semibold tracking-tight text-muted-foreground/60">
              {f(previous)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2">
          <TrendBadge trend={trendDir} value={deltaLabel} />
          <span className="text-xs text-muted-foreground">
            vs {previousLabel.toLowerCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ── 4. CardStatSparkline ─────────────────────────────────────────────────────

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

// Flat dashed line rendered when sparkline has no data
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

export interface CardStatSparklineProps extends FmtProps {
  label: string
  value: string | number
  data?: number[]
  trend?: CardStatTrend | boolean
  trendValue?: string
  description?: string
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatSparkline({
  label,
  value,
  data = [],
  trend,
  trendValue,
  description,
  icon: Icon,
  className,
  loading,
  empty,
  ...fmt
}: CardStatSparklineProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-11 w-[120px] rounded-xl" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
              —
            </p>
            <p className="text-xs text-muted-foreground/40">No history yet</p>
          </div>
          <FlatSparklineSvg />
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-2xl font-semibold tracking-tight">{display}</p>
          {trendDir && trendValue ? (
            <TrendBadge trend={trendDir} value={trendValue} />
          ) : description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {data.length >= 2 && <SparklineSvg data={data} trend={trend} />}
      </CardContent>
    </Card>
  )
}

// ── 5. CardStatHighlight ─────────────────────────────────────────────────────

export type CardStatHighlightVariant =
  | "primary"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "sky"

const highlightVariants = cva(
  "relative overflow-hidden shadow-lg ring-0 dark:shadow-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        emerald: "bg-success text-success-foreground",
        amber: "bg-warning text-warning-foreground",
        rose: "bg-destructive text-white",
        violet:
          "bg-[var(--highlight-violet)] text-[var(--highlight-violet-foreground)]",
        sky: "bg-[var(--highlight-sky)] text-[var(--highlight-sky-foreground)]",
      },
    },
    defaultVariants: { variant: "primary" },
  }
)

export interface CardStatHighlightProps
  extends FmtProps, VariantProps<typeof highlightVariants> {
  label: string
  value: string | number
  description?: string
  trend?: CardStatTrend | boolean
  trendValue?: string
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatHighlight({
  label,
  value,
  description,
  trend,
  trendValue,
  icon: Icon,
  variant = "primary",
  className,
  loading,
  empty,
  ...fmt
}: CardStatHighlightProps) {
  const decorativeCircles = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-white/10"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-12 size-40 rounded-full bg-white/5"
      />
    </>
  )

  if (loading) {
    return (
      <Card size="sm" className={cn(highlightVariants({ variant }), className)}>
        {decorativeCircles}
        <CardHeader className="relative flex flex-row items-start justify-between">
          <Skeleton className="h-3 w-24 bg-white/20" />
          <Skeleton className="size-9 rounded-xl bg-white/20" />
        </CardHeader>
        <CardContent className="relative flex flex-col gap-2">
          <Skeleton className="h-9 w-40 bg-white/20" />
          <Skeleton className="h-5 w-32 bg-white/20" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={cn(highlightVariants({ variant }), className)}>
        {decorativeCircles}
        <CardHeader className="relative flex flex-row items-start justify-between">
          <span className="text-xs font-semibold tracking-wide uppercase opacity-75">
            {label}
          </span>
          {Icon && (
            <CardAction>
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
                <Icon className="size-5" />
              </div>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="relative">
          <CardStatEmptySlot
            icon={BarChart2Icon}
            message="No spotlight yet"
            sub="Your headline KPI will appear here"
            inverted
          />
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const trendDir = resolveTrend(trend)
  const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null

  return (
    <Card size="sm" className={cn(highlightVariants({ variant }), className)}>
      {decorativeCircles}

      <CardHeader className="relative flex flex-row items-start justify-between">
        <span className="text-xs font-semibold tracking-wide uppercase opacity-75">
          {label}
        </span>
        {Icon && (
          <CardAction>
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
              <Icon className="size-5" />
            </div>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="relative flex flex-col gap-1.5">
        <p className="text-3xl font-semibold tracking-tight">{display}</p>
        {(trendDir || description) && (
          <p className="flex items-center gap-1.5 text-sm opacity-80">
            {TrendIcon && <TrendIcon className="size-4 shrink-0" aria-hidden />}
            {trendValue && <span className="font-semibold">{trendValue}</span>}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// ── 6. CardStatList ──────────────────────────────────────────────────────────

export interface CardStatListItem extends FmtProps {
  label: string
  value: string | number
  trend?: CardStatTrend | boolean
  trendValue?: string
}

export interface CardStatListProps {
  label: string
  items: CardStatListItem[]
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

const SKELETON_ROW_WIDTHS = ["w-36", "w-28", "w-40", "w-32"] as const

export function CardStatList({
  label,
  items,
  icon: Icon,
  className,
  loading,
  empty,
}: CardStatListProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="p-0">
          <ul>
            {SKELETON_ROW_WIDTHS.map((w, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-2.5",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <Skeleton className={cn("h-3.5 rounded-md", w)} />
                <div className="flex shrink-0 items-center gap-2">
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                  <Skeleton className="h-3.5 w-10 rounded-md" />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          <CardStatEmptySlot
            icon={InboxIcon}
            message="List is empty"
            sub="Add metrics to start tracking"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {items.map((item, i) => {
            const display = applyFmt(item.value, item)
            const trendDir = resolveTrend(item.trend)
            const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null
            const trendCls =
              trendDir === "up"
                ? "text-success"
                : trendDir === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"

            return (
              <li
                key={`${item.label}-${i}`}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-2.5",
                  "transition-colors hover:bg-muted/40",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <span className="truncate text-sm text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">
                    {display}
                  </span>
                  {trendDir && (
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-xs",
                        trendCls
                      )}
                    >
                      {TrendIcon && (
                        <TrendIcon className="size-3" aria-hidden />
                      )}
                      {item.trendValue && (
                        <span className="font-medium">{item.trendValue}</span>
                      )}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

// ── 7. CardStatGauge ─────────────────────────────────────────────────────────

export interface CardStatGaugeZone {
  label: string
  color: string
  max: number
}

const DEFAULT_GAUGE_ZONES: CardStatGaugeZone[] = [
  { label: "Poor", color: "var(--color-risk-1)", max: 25 },
  { label: "Fair", color: "var(--color-risk-2)", max: 50 },
  { label: "Good", color: "var(--color-risk-3)", max: 75 },
  { label: "Excellent", color: "var(--color-risk-4)", max: 100 },
]

const GCX = 50,
  GCY = 52,
  GR = 38

function gaugePt(p: number): [number, number] {
  const a = Math.PI * (1 - p)
  return [GCX + GR * Math.cos(a), GCY - GR * Math.sin(a)]
}

function gaugeArc(p1: number, p2: number): string {
  const [x1, y1] = gaugePt(p1)
  const [x2, y2] = gaugePt(p2)
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${GR} ${GR} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function GaugeSvg({
  percent,
  zones,
}: {
  percent: number
  zones: CardStatGaugeZone[]
}) {
  const p = Math.min(100, Math.max(0, percent)) / 100
  const activeZone =
    zones.find((z) => percent <= z.max) ?? zones[zones.length - 1]
  const [dotX, dotY] = gaugePt(p)

  return (
    <svg viewBox="0 0 100 58" className="w-full" aria-hidden>
      {zones.map((zone, i) => {
        const p1 = (i === 0 ? 0 : zones[i - 1].max) / 100
        const p2 = zone.max / 100
        return (
          <path
            key={zone.label}
            d={gaugeArc(p1, p2)}
            fill="none"
            style={{ stroke: zone.color }}
            strokeWidth="6"
            strokeLinecap="butt"
            opacity="0.18"
          />
        )
      })}

      {p > 0 && (
        <path
          d={gaugeArc(0, p)}
          fill="none"
          style={{ stroke: activeZone.color }}
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}

      {p > 0 && (
        <circle
          cx={dotX.toFixed(2)}
          cy={dotY.toFixed(2)}
          r="4.5"
          style={{ fill: activeZone.color }}
          stroke="white"
          strokeWidth="1.5"
        />
      )}

      <circle
        cx={gaugePt(0)[0].toFixed(2)}
        cy={gaugePt(0)[1].toFixed(2)}
        r="3"
        style={{ fill: "var(--color-muted-foreground)" }}
        opacity="0.35"
      />
    </svg>
  )
}

export interface CardStatGaugeProps extends FmtProps {
  label: string
  value: number
  min?: number
  max?: number
  description?: string
  zones?: CardStatGaugeZone[]
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatGauge({
  label,
  value,
  min = 0,
  max = 100,
  description,
  zones = DEFAULT_GAUGE_ZONES,
  icon: Icon,
  className,
  loading,
  empty,
  ...fmt
}: CardStatGaugeProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 pb-3">
          {/* Semi-circle skeleton that mirrors the gauge shape */}
          <Skeleton
            className="w-full max-w-[160px]"
            style={{
              aspectRatio: "2/1",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            }}
          />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-28 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-1 pb-3">
          <div className="w-full max-w-[160px]">
            <GaugeSvg percent={0} zones={zones} />
          </div>
          <p className="-mt-1 text-3xl font-semibold tracking-tight text-muted-foreground/25">
            —
          </p>
          <span className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground/40">
            No reading
          </span>
          {description && (
            <p className="mt-1 text-center text-xs text-muted-foreground/40">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const activeZone = zones.find((z) => pct <= z.max) ?? zones[zones.length - 1]

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-1 pb-3">
        <div className="w-full max-w-[160px]">
          <GaugeSvg percent={pct} zones={zones} />
        </div>
        <p className="-mt-1 text-3xl font-semibold tracking-tight">{display}</p>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: activeZone.color }}
        >
          {activeZone.label}
        </span>
        {description && (
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// ── 8. CardStatHeatbar ───────────────────────────────────────────────────────

export interface CardStatHeatbarZone {
  label: string
  color: string
  max: number
}

const DEFAULT_HEATBAR_ZONES: CardStatHeatbarZone[] = [
  { label: "Poor", color: "var(--color-risk-1)", max: 25 },
  { label: "Fair", color: "var(--color-risk-2)", max: 50 },
  { label: "Good", color: "var(--color-risk-3)", max: 75 },
  { label: "Excellent", color: "var(--color-risk-4)", max: 100 },
]

export interface CardStatHeatbarProps extends FmtProps {
  label: string
  value: number
  min?: number
  max?: number
  description?: string
  zones?: CardStatHeatbarZone[]
  icon?: React.ElementType
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatHeatbar({
  label,
  value,
  min = 0,
  max = 100,
  description,
  zones = DEFAULT_HEATBAR_ZONES,
  icon: Icon,
  className,
  loading,
  empty,
  ...fmt
}: CardStatHeatbarProps) {
  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 pb-6">
            <Skeleton className="h-3 rounded-full" />
            <div className="flex justify-between px-0.5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-2 w-8 rounded" />
              ))}
            </div>
          </div>
          <Skeleton className="h-3 w-40 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className="size-4" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
              —
            </p>
            <span className="rounded-full bg-muted/40 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground/40">
              Pending
            </span>
          </div>
          {/* Ghost bar — zone segments at very low opacity */}
          <div className="relative pb-6">
            <div className="flex h-3 overflow-hidden rounded-full">
              {zones.map((zone, i) => {
                const prevMax = i === 0 ? 0 : zones[i - 1].max
                const segW = zone.max - prevMax
                return (
                  <div
                    key={zone.label}
                    style={{ width: `${segW}%`, backgroundColor: zone.color }}
                    className={cn(
                      "opacity-15",
                      i === 0 && "rounded-l-full",
                      i === zones.length - 1 && "rounded-r-full"
                    )}
                  />
                )
              })}
            </div>
            <div className="absolute top-8 flex w-full justify-between px-0.5">
              {zones.map((z) => (
                <span
                  key={z.label}
                  className="text-xs leading-none text-muted-foreground/40"
                >
                  {z.label}
                </span>
              ))}
            </div>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground/40">{description}</p>
          )}
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const activeZone = zones.find((z) => pct <= z.max) ?? zones[zones.length - 1]

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className="size-4" />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold tracking-tight">{display}</p>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: activeZone.color }}
          >
            {activeZone.label}
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-default pb-6 select-none">
                <div className="flex h-3 overflow-hidden rounded-full">
                  {zones.map((zone, i) => {
                    const prevMax = i === 0 ? 0 : zones[i - 1].max
                    const segW = zone.max - prevMax
                    return (
                      <div
                        key={zone.label}
                        style={{
                          width: `${segW}%`,
                          backgroundColor: zone.color,
                        }}
                        className={cn(
                          "opacity-80",
                          i === 0 && "rounded-l-full",
                          i === zones.length - 1 && "rounded-r-full"
                        )}
                      />
                    )
                  })}
                </div>

                <div
                  className="absolute top-3 -translate-x-1/2 pt-0.5"
                  style={{ left: `${pct}%` }}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
                    <polygon
                      points="5,0 10,6 0,6"
                      style={{ fill: activeZone.color }}
                    />
                  </svg>
                </div>

                <div className="absolute top-8 flex w-full justify-between px-0.5">
                  {zones.map((z) => (
                    <span
                      key={z.label}
                      className="text-xs leading-none text-muted-foreground"
                    >
                      {z.label}
                    </span>
                  ))}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {display} — {activeZone.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

// ── CardStat (original) ─────────────────────────────────────────────────────

export interface CardStatProps {
  label: string
  value: string | number
  format?: CardStatFormat
  decimals?: number
  locale?: string
  currency?: string
  description?: string
  trend?: CardStatTrend | boolean
  icon?: React.ElementType
  valueFormatter?: (value: number | string) => string
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStat({
  label,
  value,
  format,
  decimals,
  locale,
  currency,
  description,
  trend = false,
  icon: Icon,
  valueFormatter,
  className,
  loading,
  empty,
}: CardStatProps) {
  if (loading) {
    return (
      <Card size="sm" className={cn(className)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="size-5 rounded-md" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={cn(className)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground/40">
              <Icon />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-2xl font-semibold tracking-tight text-muted-foreground/25">
            —
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground/50">
            <BarChart2Icon className="size-3 shrink-0" aria-hidden />
            Nothing to measure yet
          </p>
        </CardContent>
      </Card>
    )
  }

  const displayValue = applyFmt(value, {
    format,
    decimals,
    locale,
    currency,
    valueFormatter,
  })

  const trendDir: CardStatTrend | false = resolveTrend(trend)
  const TrendIcon = trendDir ? TREND_ICONS[trendDir] : null

  return (
    <Card size="sm" className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tracking-tight">{displayValue}</p>
        {description && (
          <p
            className={cn(
              "flex items-center gap-1 text-xs",
              trendDir ? TREND_COLORS[trendDir] : "text-muted-foreground"
            )}
          >
            {TrendIcon && <TrendIcon className="size-3 shrink-0" aria-hidden />}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
