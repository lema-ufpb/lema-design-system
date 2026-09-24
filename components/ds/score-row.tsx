"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { cva } from "class-variance-authority"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { formatValue } from "@/lib/format-utils"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Types ──────────────────────────────────────────────────────────────────

export type ScoreRowSize = "sm" | "md" | "lg"
export type ScoreRowStatus = "default" | "success" | "warning" | "destructive"
export type ScoreRowScoreDisplay = "fraction" | "percent" | "raw"

export interface ScoreRowProps extends HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  /** Lucide icon component. Defaults to FileTextIcon. */
  icon?: React.ElementType
  /** Current score value. */
  score: number
  /** Maximum / total possible score. */
  total: number
  size?: ScoreRowSize
  /**
   * Color status for the icon container and score.
   * Use `"auto"` to derive from the score ratio:
   * ≥70% → success, ≥40% → warning, <40% → destructive.
   */
  status?: ScoreRowStatus | "auto"
  /** How the score is rendered on the right. Defaults to "fraction". */
  scoreDisplay?: ScoreRowScoreDisplay
  /**
   * When true, renders a colored progress bar at the bottom of the row.
   * Hovering the bar shows a tooltip with locale-aware percentage.
   */
  showProgress?: boolean
  loading?: boolean
  locale?: UILocale
  /** Number of decimal places in the percentage display (progress tooltip and aria-label). Defaults to 0. */
  percentDecimals?: number
  /**
   * Override all intent-based colors via CSS token `--score-accent`.
   * Drives icon container bg/text, score value text, and progress fill.
   * Accepts any CSS color or `var(--my-token)`.
   */
  accent?: string
  /**
   * Optional tooltip content for the entire row. When provided, the row
   * itself becomes the tooltip trigger (keyboard-focusable) and the
   * built-in progress-bar tooltip is suppressed, avoiding nested tooltips.
   */
  tooltip?: React.ReactNode
}

// ── Variants ───────────────────────────────────────────────────────────────

export const scoreRowVariants = cva(
  [
    "flex w-full flex-col border-b border-border",
    "motion-safe:transition-colors motion-safe:duration-150",
  ],
  {
    variants: {
      size: {
        sm: "gap-2 px-3 py-2",
        md: "gap-2.5 px-4 py-3",
        lg: "gap-3 px-5 py-4",
      },
      interactive: {
        true: "cursor-pointer hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
        false: "",
      },
    },
    defaultVariants: { size: "md", interactive: false },
  }
)

// Horizontal gap between icon container and text stack
const ICON_TEXT_GAP: Record<ScoreRowSize, string> = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-3",
}

// Horizontal gap between content row and score — also between score parts
const CONTENT_GAP: Record<ScoreRowSize, string> = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
}

// Gap between score parts (current / slash / total) for symmetric spacing
const SCORE_GAP: Record<ScoreRowSize, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1",
}

const PROGRESS_HEIGHT: Record<ScoreRowSize, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
}

export const scoreRowIconContainerVariants = cva(
  ["flex shrink-0 items-center justify-center rounded-md"],
  {
    variants: {
      size: {
        sm: "size-7",
        md: "size-8",
        lg: "size-10",
      },
      status: {
        default: "bg-muted text-muted-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/15 text-warning",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { size: "md", status: "default" },
  }
)

export const scoreRowIconVariants = cva("shrink-0", {
  variants: {
    size: {
      // 50% fill ratio vs. the container (size-7/8/10)
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export const scoreRowTitleVariants = cva(
  ["truncate leading-tight font-medium text-foreground"],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const scoreRowDescriptionVariants = cva(
  "truncate leading-tight text-muted-foreground",
  {
    variants: {
      size: {
        // text-xs for sm (no arbitrary values) — color alone distinguishes from title
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const scoreRowCurrentVariants = cva("font-semibold tabular-nums", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    status: {
      default: "text-foreground",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { size: "md", status: "default" },
})

export const scoreRowTotalVariants = cva("text-muted-foreground tabular-nums", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Helpers ────────────────────────────────────────────────────────────────

function deriveStatus(score: number, total: number): ScoreRowStatus {
  if (total === 0) return "default"
  const ratio = score / total
  if (ratio >= 0.7) return "success"
  if (ratio >= 0.4) return "warning"
  return "destructive"
}

function formatScore(
  score: number,
  total: number,
  display: ScoreRowScoreDisplay,
  locale: UILocale,
  decimals: number
): { current: string; showFraction: boolean; rest: string } {
  switch (display) {
    case "percent":
      return {
        current:
          total === 0
            ? "—"
            : formatValue(score / total, "percent", { decimals, locale }),
        showFraction: false,
        rest: "",
      }
    case "raw":
      return {
        current: formatValue(score, "float", { decimals, locale }),
        showFraction: false,
        rest: "",
      }
    case "fraction":
    default:
      return {
        current: formatValue(score, "float", { decimals, locale }),
        showFraction: true,
        rest: formatValue(total, "integer", { locale }),
      }
  }
}

function formatScoreText(
  score: number,
  total: number,
  display: ScoreRowScoreDisplay,
  locale: UILocale,
  decimals: number
): string {
  switch (display) {
    case "percent":
      return total === 0
        ? "—"
        : formatValue(score / total, "percent", { decimals, locale })
    case "raw":
      return formatValue(score, "float", { decimals, locale })
    case "fraction":
    default: {
      const s = formatValue(score, "float", { decimals, locale })
      const t = formatValue(total, "integer", { locale })
      return `${s} / ${t}`
    }
  }
}

/** Locale-aware percent string, e.g. "71,3%" in pt-BR, "71.3%" in en-US. */
function formatPercent(
  ratio: number,
  locale: UILocale,
  decimals: number
): string {
  return formatValue(ratio, "percent", { decimals, locale })
}

const PROGRESS_INDICATOR_COLOR: Record<ScoreRowStatus, string> = {
  default: "[&>[data-slot=progress-indicator]]:bg-primary",
  success: "[&>[data-slot=progress-indicator]]:bg-success",
  warning: "[&>[data-slot=progress-indicator]]:bg-warning",
  destructive: "[&>[data-slot=progress-indicator]]:bg-destructive",
}

// ── ScoreRow ───────────────────────────────────────────────────────────────

export function ScoreRow({
  title,
  description,
  icon: Icon = FileTextIcon,
  score,
  total,
  size = "md",
  status = "default",
  scoreDisplay = "fraction",
  showProgress = true,
  loading = false,
  locale: localeProp,
  percentDecimals = 0,
  accent,
  tooltip,
  className,
  onClick,
  ...props
}: ScoreRowProps) {
  const locale = useUILocale(localeProp)
  const tokenStyle =
    accent !== undefined
      ? ({ "--score-accent": accent } as React.CSSProperties)
      : undefined
  const t = UI_I18N[locale].scoreRow
  const resolvedStatus: ScoreRowStatus =
    status === "auto" ? deriveStatus(score, total) : status

  const isInteractive = !!onClick
  const ratio = total > 0 ? Math.min(score / total, 1) : 0
  const { current, showFraction, rest } = formatScore(
    score,
    total,
    scoreDisplay,
    locale,
    percentDecimals
  )
  const scoreText = formatScoreText(
    score,
    total,
    scoreDisplay,
    locale,
    percentDecimals
  )
  const percentText = formatPercent(ratio, locale, percentDecimals)

  if (loading) {
    return (
      <div
        data-slot="score-row"
        className={cn(scoreRowVariants({ size }), className)}
        role="status"
        aria-busy="true"
        aria-label={t.loading}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between",
            CONTENT_GAP[size]
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center",
              ICON_TEXT_GAP[size]
            )}
          >
            <Skeleton
              className={cn(
                "shrink-0 rounded-md",
                size === "sm" ? "size-7" : size === "lg" ? "size-10" : "size-8"
              )}
            />
            <div className="flex flex-col gap-0.5">
              <Skeleton
                className={cn(
                  "rounded",
                  size === "sm"
                    ? "h-3 w-28"
                    : size === "lg"
                      ? "h-5 w-40"
                      : "h-4 w-32"
                )}
              />
              <Skeleton
                className={cn(
                  "rounded",
                  size === "sm"
                    ? "h-3 w-20"
                    : size === "lg"
                      ? "h-4 w-28"
                      : "h-3 w-24"
                )}
              />
            </div>
          </div>
          <Skeleton
            className={cn(
              "shrink-0 rounded",
              size === "sm"
                ? "h-3 w-12"
                : size === "lg"
                  ? "h-5 w-16"
                  : "h-4 w-14"
            )}
          />
        </div>
        {showProgress && (
          <Skeleton
            className={cn("w-full rounded-full", PROGRESS_HEIGHT[size])}
          />
        )}
      </div>
    )
  }

  const inner = (
    <>
      {/* Content row: icon + text + score */}
      <div
        className={cn(
          "flex w-full items-center justify-between",
          CONTENT_GAP[size]
        )}
      >
        {/* Leading: icon container + text stack */}
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center",
            ICON_TEXT_GAP[size]
          )}
        >
          <div
            className={cn(
              scoreRowIconContainerVariants({ size, status: resolvedStatus }),
              accent && "bg-(--score-accent)/10 text-(--score-accent)"
            )}
            aria-hidden="true"
          >
            <Icon className={cn(scoreRowIconVariants({ size }))} />
          </div>

          <div className="flex min-w-0 flex-col gap-0.5">
            <span className={cn(scoreRowTitleVariants({ size }))} title={title}>
              {title}
            </span>
            {description && (
              <span
                className={cn(scoreRowDescriptionVariants({ size }))}
                title={description}
              >
                {description}
              </span>
            )}
          </div>
        </div>

        {/*
         * Trailing: score — three visually styled spans with symmetric gap.
         * All visual spans are aria-hidden; a sr-only span carries the accessible label
         * so screen readers get a clean, locale-aware phrase instead of "0 slash 95".
         */}
        <div className={cn("flex shrink-0 items-baseline", SCORE_GAP[size])}>
          <span
            aria-hidden="true"
            className={cn(
              scoreRowCurrentVariants({ size, status: resolvedStatus }),
              accent && "text-(--score-accent)"
            )}
          >
            {current}
          </span>
          {showFraction && (
            <>
              <span
                aria-hidden="true"
                className={cn(scoreRowTotalVariants({ size }))}
              >
                /
              </span>
              <span
                aria-hidden="true"
                className={cn(scoreRowTotalVariants({ size }))}
              >
                {rest}
              </span>
            </>
          )}
          <span className="sr-only">
            {t.scoreLabel}: {scoreText}
          </span>
        </div>
      </div>

      {/*
       * Progress bar. When no row-level `tooltip` is set, it's wrapped in its
       * own Tooltip showing locale-aware percentage with correct decimal
       * separator (e.g. "68 / 95 — 71,3%" in pt-BR, "68 / 95 — 71.3%" in
       * en-US). When `tooltip` is set, this per-bar tooltip is suppressed —
       * the row-level tooltip below already covers it, avoiding nesting.
       */}
      {showProgress &&
        (() => {
          const progress = (
            <Progress
              value={ratio * 100}
              aria-label={`${t.scoreLabel}: ${percentText}`}
              className={cn(
                PROGRESS_HEIGHT[size],
                !accent && PROGRESS_INDICATOR_COLOR[resolvedStatus],
                accent &&
                  "[&>[data-slot=progress-indicator]]:bg-(--score-accent)"
              )}
            />
          )

          if (tooltip) {
            return <span className="block">{progress}</span>
          }

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    className="block rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {progress}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="tabular-nums">
                    {score} / {total} — {percentText}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })()}
    </>
  )

  let row: React.ReactElement

  if (isInteractive) {
    const buttonLabel = [title, description, `${t.scoreLabel}: ${scoreText}`]
      .filter(Boolean)
      .join(". ")

    row = (
      <button
        type="button"
        data-slot="score-row"
        style={tokenStyle}
        onClick={onClick}
        className={cn(
          scoreRowVariants({ size, interactive: true }),
          "w-full text-left",
          className
        )}
        aria-label={buttonLabel}
      >
        {inner}
      </button>
    )
  } else {
    row = (
      <div
        data-slot="score-row"
        style={tokenStyle}
        tabIndex={tooltip ? 0 : undefined}
        className={cn(
          scoreRowVariants({ size }),
          tooltip &&
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
          className
        )}
        {...props}
      >
        {inner}
      </div>
    )
  }

  if (!tooltip) return row

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{row}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

ScoreRow.displayName = "ScoreRow"

// ── ScoreRowList ───────────────────────────────────────────────────────────

export interface ScoreRowListProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Removes outer border to embed inside already-bordered containers. */
  inset?: boolean
}

export function ScoreRowList({
  children,
  inset = false,
  className,
  ...props
}: ScoreRowListProps) {
  return (
    <div
      data-slot="score-row-list"
      className={cn(
        "w-full",
        !inset && "overflow-hidden rounded-xl border border-border",
        "[&>*:last-child]:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ScoreRowList.displayName = "ScoreRowList"
