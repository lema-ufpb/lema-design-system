"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  type FormatPreset,
  applyFormat,
} from "@/components/custom/card-stats-shared"

// ── Types ──

export type MiniCardSize = "sm" | "md" | "lg"
export type MiniCardIntent = "default" | "success" | "warning" | "destructive"
export type MiniCardGroupVariant = "ghost" | "pill" | "outlined" | "elevated"
export type MiniCardDelta = "up" | "down" | "neutral"
export type { FormatPreset as MiniCardFormat }

export interface MiniCardProps {
  /** Uppercase label rendered above the value */
  label: string
  /** Primary value — string or number */
  value: string | number
  /** Supplementary value at baseline, e.g. "/153" */
  sub?: string
  /** Leading icon, placed before the label/value stack */
  icon?: React.ElementType
  /** Semantic color applied to the leading icon (defaults to "default") */
  iconIntent?: MiniCardIntent
  /** Semantic color applied to the primary value */
  intent?: MiniCardIntent
  /**
   * Change indicator. Pass "up" | "down" | "neutral" for icon-only,
   * or a signed string like "+12%" — direction inferred from the leading sign.
   */
  delta?: string | MiniCardDelta
  /** Size variant — inherits from the nearest MiniCardGroup when omitted */
  size?: MiniCardSize
  /** Number format: "currency" | "percent" | "integer" | "float" */
  format?: FormatPreset
  /** Locale for number formatting — inherits from MiniCardGroup when omitted */
  locale?: string
  /** Currency code for format="currency", e.g. "BRL", "USD" */
  currency?: string
  /** Decimal places for format="float" or format="currency" */
  decimals?: number
  /** Custom formatter — overrides format/locale/currency */
  valueFormatter?: (value: string | number) => string
  loading?: boolean
  className?: string
}

export interface MiniCardGroupProps {
  children: React.ReactNode
  /** Visual style of the group container */
  variant?: MiniCardGroupVariant
  /** Size applied to all child MiniCards via context */
  size?: MiniCardSize
  /** Locale propagated to all child MiniCards via context */
  locale?: string
  /** Auto-insert short dividers between children */
  divide?: boolean
  /**
   * Allow items inside the group to wrap onto multiple rows on narrow screens.
   * Disables auto-dividers (vertical separators don't work across rows).
   */
  wrap?: boolean
  /** Semantic accent rendered as a left border highlight */
  accent?: MiniCardIntent
  className?: string
}

export interface MiniCardSeparatorProps {
  /** "short" (inset margins) for within-group, "tall" (full stretch) for between-groups */
  height?: "short" | "tall"
  className?: string
}

export interface MiniCardStripProps {
  children: React.ReactNode
  /** Auto-insert tall separators between top-level children */
  divide?: boolean
  /** Enable horizontal overflow scroll */
  scroll?: boolean
  /**
   * Allow groups to wrap onto multiple rows on narrow screens.
   * Disables auto-dividers (vertical separators don't work across rows).
   */
  wrap?: boolean
  className?: string
}

// ── Variants ──

export const miniCardLabelVariants = cva(
  "truncate font-medium tracking-wider text-muted-foreground uppercase",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const miniCardValueVariants = cva("font-semibold tabular-nums", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    intent: {
      default: "text-foreground",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { size: "md", intent: "default" },
})

export const miniCardSubVariants = cva(
  "font-medium text-muted-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const miniCardIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-3",
      md: "size-3.5",
      lg: "size-4",
    },
    intent: {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { size: "md", intent: "default" },
})

export const miniCardGroupVariants = cva("flex shrink-0 items-center", {
  variants: {
    variant: {
      ghost: "",
      pill: "rounded-lg bg-muted/40 px-3 py-1.5",
      outlined: "rounded-lg border border-border/60 bg-card/80 px-3 py-1.5",
      elevated: "rounded-lg border bg-card px-3 py-1.5 shadow-xs",
    },
    size: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },
  defaultVariants: { variant: "ghost", size: "md" },
})

// ── Helpers ──

const DELTA_ICONS = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  neutral: MinusIcon,
} as const

const DELTA_COLORS: Record<MiniCardDelta, string> = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

const ACCENT_BORDER: Record<MiniCardIntent, string> = {
  default: "",
  success: "border-l-2 border-l-success/60",
  warning: "border-l-2 border-l-warning/60",
  destructive: "border-l-2 border-l-destructive/60",
}

function resolveDeltaDir(delta: string): MiniCardDelta {
  if (delta === "up" || delta === "down" || delta === "neutral") return delta
  if (delta.startsWith("+")) return "up"
  if (delta.startsWith("-")) return "down"
  return "neutral"
}

function isDeltaKeyword(delta: string): delta is MiniCardDelta {
  return delta === "up" || delta === "down" || delta === "neutral"
}

function interleave(
  children: React.ReactNode,
  getSep: (key: string) => React.ReactNode
): React.ReactNode[] {
  const items = React.Children.toArray(children).filter(Boolean)
  return items.flatMap((child, i) =>
    i < items.length - 1 ? [child, getSep(`sep-${i}`)] : [child]
  )
}

// ── Context ──

const MiniCardCtx = React.createContext<{ size: MiniCardSize; locale: string }>(
  {
    size: "md",
    locale: "en-US",
  }
)

// ── MiniCardSeparator ──

export function MiniCardSeparator({
  height = "tall",
  className,
}: MiniCardSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="mini-card-separator"
      className={cn(
        "w-px shrink-0 self-stretch bg-border",
        height === "short" && "my-1.5",
        className
      )}
    />
  )
}

// ── MiniCard ──

export function MiniCard({
  label,
  value,
  sub,
  icon: Icon,
  iconIntent = "default",
  intent = "default",
  delta,
  size: sizeProp,
  format,
  locale: localeProp,
  currency,
  decimals,
  valueFormatter,
  loading,
  className,
}: MiniCardProps) {
  const { size: ctxSize, locale: ctxLocale } = React.useContext(MiniCardCtx)
  const size = sizeProp ?? ctxSize
  const locale = localeProp ?? ctxLocale

  if (loading) {
    return (
      <div
        className={cn("flex min-w-0 flex-col gap-0.5", className)}
        data-slot="mini-card"
      >
        <Skeleton
          className={cn(
            "rounded-sm",
            size === "lg" ? "h-3 w-16" : "h-2.5 w-14"
          )}
        />
        <Skeleton
          className={cn("rounded-sm", size === "lg" ? "h-4 w-10" : "h-3.5 w-8")}
        />
      </div>
    )
  }

  const displayValue = applyFormat(value, {
    format,
    locale,
    currency,
    decimals,
    valueFormatter,
  })

  const deltaDir = delta ? resolveDeltaDir(delta) : null
  const deltaLabel = delta && !isDeltaKeyword(delta) ? delta : undefined
  const DeltaIcon = deltaDir ? DELTA_ICONS[deltaDir] : null

  return (
    <div
      className={cn("flex min-w-0 items-center gap-1.5", className)}
      data-slot="mini-card"
    >
      {Icon && (
        <Icon
          className={miniCardIconVariants({ size, intent: iconIntent })}
          aria-hidden
        />
      )}
      <div className="flex min-w-0 flex-col">
        <span className={miniCardLabelVariants({ size })}>{label}</span>
        <div className="flex items-baseline gap-0.5">
          <span className={miniCardValueVariants({ size, intent })}>
            {displayValue}
          </span>
          {sub && <span className={miniCardSubVariants({ size })}>{sub}</span>}
          {deltaDir && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                DELTA_COLORS[deltaDir]
              )}
            >
              {DeltaIcon && (
                <DeltaIcon className="size-3 shrink-0" aria-hidden />
              )}
              {deltaLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MiniCardGroup ──

export function MiniCardGroup({
  children,
  variant = "ghost",
  size = "md",
  locale = "en-US",
  divide = false,
  wrap = false,
  accent,
  className,
}: MiniCardGroupProps) {
  const showDividers = divide && !wrap
  const content = showDividers
    ? interleave(children, (key) => (
        <MiniCardSeparator key={key} height="short" />
      ))
    : children

  return (
    <MiniCardCtx.Provider value={{ size, locale }}>
      <div
        className={cn(
          miniCardGroupVariants({ variant, size }),
          wrap && "shrink flex-wrap items-start gap-y-2",
          accent && accent !== "default" && ACCENT_BORDER[accent],
          className
        )}
        data-slot="mini-card-group"
      >
        {content}
      </div>
    </MiniCardCtx.Provider>
  )
}

// ── MiniCardStrip ──

export function MiniCardStrip({
  children,
  divide = true,
  scroll = false,
  wrap = false,
  className,
}: MiniCardStripProps) {
  const showDividers = divide && !wrap
  const content = showDividers
    ? interleave(children, (key) => (
        <MiniCardSeparator key={key} height="tall" />
      ))
    : children

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        scroll && "overflow-x-auto",
        wrap && "flex-wrap items-start gap-y-3",
        className
      )}
      data-slot="mini-card-strip"
    >
      {content}
    </div>
  )
}
