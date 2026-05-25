import * as React from "react"
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// ── Shared types ─────────────────────────────────────────────────────────────

export type CardStatFormat = "currency" | "percent" | "integer" | "float"
export type CardStatTrend = "up" | "down" | "neutral"
export type CardStatSize = "sm" | "md" | "lg"

// ── Size tokens ───────────────────────────────────────────────────────────────

export const SIZE = {
  sm: {
    label: "text-xs font-medium tracking-wide uppercase",
    value: "text-xl font-semibold tracking-tight tabular-nums",
    description: "text-xs",
    headerIcon: "size-3.5",
    contentIcon: "size-4",
    badgeText: "text-xs font-semibold",
    badgeIcon: "size-2.5",
    badgePadding: "px-1.5 py-0.5",
    iconBox: "size-9 rounded-xl",
    iconInner: "size-4",
    highlightBox: "size-8 rounded-lg",
    highlightIcon: "size-4",
    highlightValue: "text-2xl font-semibold tracking-tight tabular-nums",
    highlightDesc: "text-xs",
    trackH: "h-1.5",
    gaugeMaxW: "max-w-[130px]",
    gaugeValue: "text-2xl font-semibold tracking-tight tabular-nums",
    listRowPy: "py-2",
    listText: "text-xs",
    listValue: "text-xs font-semibold tabular-nums",
    contentGap: "gap-2",
    compactValue: "text-lg font-semibold tracking-tight tabular-nums",
  },
  md: {
    label: "text-sm font-medium tracking-wide uppercase",
    value: "text-2xl font-semibold tracking-tight tabular-nums",
    description: "text-xs",
    headerIcon: "size-4",
    contentIcon: "size-5",
    badgeText: "text-xs font-semibold",
    badgeIcon: "size-3",
    badgePadding: "px-2 py-0.5",
    iconBox: "size-10 rounded-2xl",
    iconInner: "size-5",
    highlightBox: "size-9 rounded-xl",
    highlightIcon: "size-5",
    highlightValue: "text-3xl font-semibold tracking-tight tabular-nums",
    highlightDesc: "text-sm",
    trackH: "h-2",
    gaugeMaxW: "max-w-[160px]",
    gaugeValue: "text-3xl font-semibold tracking-tight tabular-nums",
    listRowPy: "py-2.5",
    listText: "text-sm",
    listValue: "text-sm font-semibold tabular-nums",
    contentGap: "gap-3",
    compactValue: "text-xl font-semibold tracking-tight tabular-nums",
  },
  lg: {
    label: "text-base font-medium tracking-wide uppercase",
    value: "text-3xl font-semibold tracking-tight tabular-nums",
    description: "text-sm",
    headerIcon: "size-5",
    contentIcon: "size-6",
    badgeText: "text-sm font-semibold",
    badgeIcon: "size-3.5",
    badgePadding: "px-2.5 py-1",
    iconBox: "size-12 rounded-2xl",
    iconInner: "size-6",
    highlightBox: "size-11 rounded-xl",
    highlightIcon: "size-6",
    highlightValue: "text-4xl font-semibold tracking-tight tabular-nums",
    highlightDesc: "text-base",
    trackH: "h-3",
    gaugeMaxW: "max-w-[200px]",
    gaugeValue: "text-4xl font-semibold tracking-tight tabular-nums",
    listRowPy: "py-3",
    listText: "text-base",
    listValue: "text-base font-semibold tabular-nums",
    contentGap: "gap-4",
    compactValue: "text-2xl font-semibold tracking-tight tabular-nums",
  },
} as const satisfies Record<CardStatSize, Record<string, string>>

// ── Shared helpers ────────────────────────────────────────────────────────────

export function formatValue(
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

export const TREND_ICONS: Record<CardStatTrend, React.ElementType> = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  neutral: MinusIcon,
}

export const TREND_COLORS: Record<CardStatTrend, string> = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

export function resolveTrend(
  trend: CardStatTrend | boolean | undefined
): CardStatTrend | false {
  if (trend === true) return "up"
  if (!trend) return false
  return trend
}

export interface FmtProps {
  format?: CardStatFormat
  decimals?: number
  locale?: string
  currency?: string
  valueFormatter?: (value: number | string) => string
}

export function applyFmt(value: number | string, opts: FmtProps): string {
  return opts.valueFormatter
    ? opts.valueFormatter(value)
    : formatValue(value, opts.format, {
        decimals: opts.decimals,
        locale: opts.locale,
        currency: opts.currency,
      })
}

// ── TrendBadge ────────────────────────────────────────────────────────────────

export function TrendBadge({
  trend,
  value,
  size = "md",
}: {
  trend: CardStatTrend
  value: string
  size?: CardStatSize
}) {
  const Icon = TREND_ICONS[trend]
  const s = SIZE[size]
  return (
    <Badge
      className={cn(
        s.badgePadding,
        s.badgeText,
        "font-semibold",
        trend === "up" && "bg-success/10 text-success",
        trend === "down" && "bg-destructive/10 text-destructive",
        trend === "neutral" && "bg-muted text-muted-foreground"
      )}
    >
      <Icon aria-hidden />
      {value}
    </Badge>
  )
}

// ── CardStatEmptySlot ─────────────────────────────────────────────────────────

export function CardStatEmptySlot({
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
