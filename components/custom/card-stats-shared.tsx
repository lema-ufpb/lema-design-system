import * as React from "react"
import { cva } from "class-variance-authority"
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// ── Shared types ─────────────────────────────────────────────────────────────

export type CardStatFormat = "currency" | "percent" | "integer" | "float"
export type CardStatTrend = "up" | "down" | "neutral"
export type CardStatSize = "sm" | "md" | "lg"

// ── CVA variants ───────────────────────────────────────────────────────────────

export const cardStatLabelVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs font-medium tracking-wide uppercase",
      md: "text-sm font-medium tracking-wide uppercase",
      lg: "text-base font-medium tracking-wide uppercase",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatValueVariants = cva("", {
  variants: {
    size: {
      sm: "text-xl font-semibold tracking-tight tabular-nums",
      md: "text-2xl font-semibold tracking-tight tabular-nums",
      lg: "text-3xl font-semibold tracking-tight tabular-nums",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatDescriptionVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatHeaderIconVariants = cva("", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatContentGapVariants = cva("", {
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatBadgePaddingVariants = cva("", {
  variants: {
    size: {
      sm: "px-1.5 py-0.5",
      md: "px-2 py-0.5",
      lg: "px-2.5 py-1",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardStatBadgeTextVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs font-semibold",
      md: "text-xs font-semibold",
      lg: "text-sm font-semibold",
    },
  },
  defaultVariants: { size: "md" },
})

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
  return (
    <Badge
      className={cn(
        cardStatBadgePaddingVariants({ size }),
        cardStatBadgeTextVariants({ size }),
        trend === "up" && "bg-success/10 text-success",
        trend === "down" && "bg-destructive/10 text-destructive",
        trend === "neutral" && "bg-muted text-muted-foreground"
      )}
      data-slot="trend-badge"
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
    <div
      className="flex flex-col items-center justify-center gap-2 py-5 text-center"
      data-slot="card-stat-empty-slot"
    >
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
