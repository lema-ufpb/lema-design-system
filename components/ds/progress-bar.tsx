"use client"

import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

// ── Types ──────────────────────────────────────────────────────────────────

export type ProgressBarIntent =
  "primary" | "secondary" | "success" | "destructive"
export type ProgressBarSize = "sm" | "md" | "lg"
export type ProgressBarLabelLayout = "inline" | "above" | "below"

export interface ProgressBarVariantProps
  extends
    VariantProps<typeof progressBarContainerVariants>,
    VariantProps<typeof progressBarNameVariants>,
    VariantProps<typeof progressBarLabelVariants>,
    VariantProps<typeof progressBarFillVariants> {}

export interface ProgressBarProps
  extends ProgressBarVariantProps, HTMLAttributes<HTMLDivElement> {
  value: number
  name?: string
  namePosition?: "left" | "right"
  upper?: boolean
  showLabel?: boolean
  labelPosition?: "left" | "right"
  labelLayout?: ProgressBarLabelLayout
  labelWidth?: number
  intent?: ProgressBarIntent
  size?: ProgressBarSize
  total?: number
  loading?: boolean
  precision?: number
  max?: number
  getValueLabel?: (value: number, max: number) => string
  tooltip?: ReactNode
  /** Locale used for formatting the percentage label */
  locale?: string
  /**
   * Override fill color via CSS token `--progress-fill`.
   * Accepts any CSS color value or `var(--my-token)`.
   * @example fillColor="var(--color-brand)"
   */
  fillColor?: string
  /**
   * Override track (background) color via CSS token `--progress-track`.
   * Accepts any CSS color value or `var(--my-token)`.
   */
  trackColor?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const progressBarContainerVariants = cva("flex w-full", {
  variants: {
    labelLayout: {
      inline: "items-center gap-2",
      above: "flex-col gap-1",
      below: "flex-col gap-1",
    },
  },
  defaultVariants: { labelLayout: "inline" },
})

export const progressBarNameVariants = cva(
  "truncate font-medium text-muted-foreground",
  {
    variants: {
      upper: { true: "uppercase" },
      position: {
        left: "",
        right: "text-foreground",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { upper: false, position: "left", size: "md" },
  }
)

export const progressBarLabelVariants = cva(
  "shrink-0 text-center font-semibold tabular-nums",
  {
    variants: {
      size: {
        sm: "w-8 text-xs",
        md: "w-10 text-sm",
        lg: "w-12 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const progressBarFillVariants = cva(
  "size-full flex-1 rounded-full transition-[transform] duration-700 ease-out",
  {
    variants: {
      intent: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: { intent: "primary" },
  }
)

// ── Skeleton sizes keyed by size prop ──────────────────────────────────────

const skeletonDims: Record<
  ProgressBarSize,
  { name: string; label: string; track: string }
> = {
  sm: { name: "h-3 w-24", label: "h-3 w-8", track: "h-2" },
  md: { name: "h-4 w-32", label: "h-4 w-10", track: "h-3" },
  lg: { name: "h-5 w-40", label: "h-5 w-12", track: "h-4" },
}

// ── ProgressBar ────────────────────────────────────────────────────────────

export function ProgressBar({
  value,
  name,
  namePosition = "left",
  upper = false,
  showLabel = true,
  labelPosition = "left",
  labelLayout = "above",
  labelWidth,
  intent = "primary",
  size = "sm",
  total,
  loading = false,
  precision = 0,
  max = 100,
  getValueLabel,
  tooltip,
  locale = "en-US",
  fillColor,
  trackColor,
  style,
  className,
  ...props
}: ProgressBarProps) {
  const tokenStyle = {
    ...(fillColor !== undefined && { "--progress-fill": fillColor }),
    ...(trackColor !== undefined && { "--progress-track": trackColor }),
    ...style,
  } as CSSProperties
  const clamped =
    total !== undefined
      ? Math.max(0, Math.min(1, value / total))
      : Math.max(0, Math.min(1, value > 1 ? value / 100 : value))

  const displayLabel =
    total !== undefined
      ? `${value} / ${total}`
      : new Intl.NumberFormat(locale, {
          style: "percent",
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }).format(clamped)

  const displayName = upper ? name?.toUpperCase() : name
  const ratioDims: typeof skeletonDims = {
    sm: {
      name: skeletonDims.sm.name,
      label: "h-3 w-14",
      track: skeletonDims.sm.track,
    },
    md: {
      name: skeletonDims.md.name,
      label: "h-4 w-16",
      track: skeletonDims.md.track,
    },
    lg: {
      name: skeletonDims.lg.name,
      label: "h-5 w-20",
      track: skeletonDims.lg.track,
    },
  }
  const dims = total !== undefined ? ratioDims[size] : skeletonDims[size]
  const isStacked = labelLayout === "above" || labelLayout === "below"

  // ── Loading state ────────────────────────────────────────────────────────

  if (loading) {
    if (isStacked) {
      const labelsRowSkeleton =
        (name ?? showLabel) ? (
          <div className="flex items-center justify-between gap-2">
            {name && <Skeleton className={dims.name} />}
            {showLabel && <Skeleton className={dims.label} />}
          </div>
        ) : null

      const trackSkeleton = (
        <Skeleton className={cn("w-full rounded-full", dims.track)} />
      )

      return (
        <div
          data-slot="progress-bar"
          style={tokenStyle}
          className={cn(
            progressBarContainerVariants({ labelLayout }),
            className
          )}
          {...props}
        >
          {labelLayout === "above" && labelsRowSkeleton}
          {trackSkeleton}
          {labelLayout === "below" && labelsRowSkeleton}
        </div>
      )
    }

    return (
      <div
        data-slot="progress-bar"
        style={tokenStyle}
        className={cn(progressBarContainerVariants({ labelLayout }), className)}
        {...props}
      >
        {name && <Skeleton className={dims.name} />}
        {showLabel && <Skeleton className={dims.label} />}
        <Skeleton className={cn("flex-1 rounded-full", dims.track)} />
      </div>
    )
  }

  // ── Track ────────────────────────────────────────────────────────────────

  const intentIndicatorClass: Record<ProgressBarIntent, string> = {
    primary: "",
    secondary: "*:data-[slot=progress-indicator]:bg-secondary",
    success: "*:data-[slot=progress-indicator]:bg-success",
    destructive: "*:data-[slot=progress-indicator]:bg-destructive",
  }

  const trackHeight_: Record<ProgressBarSize, string> = {
    sm: "min-w-20",
    md: "min-w-24",
    lg: "min-w-32",
  }

  const track = (
    <Progress
      className={cn(
        isStacked ? "w-full" : "flex-1",
        trackHeight_[size],
        !fillColor && intentIndicatorClass[intent],
        fillColor && "*:data-[slot=progress-indicator]:bg-(--progress-fill)",
        trackColor && "bg-(--progress-track)",
        "*:data-[slot=progress-indicator]:transition-[transform] *:data-[slot=progress-indicator]:duration-700 *:data-[slot=progress-indicator]:ease-out"
      )}
      value={clamped * 100}
      max={max}
      getValueLabel={getValueLabel}
      aria-label={
        name ??
        (locale ? UI_I18N[locale as UILocale].progressBar.label : "Progress")
      }
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        height: size === "sm" ? "0.5rem" : size === "lg" ? "1rem" : undefined,
      }}
    />
  )

  const wrappedTrack = tooltip ? (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{track}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    track
  )

  // ── Above / below layout ─────────────────────────────────────────────────

  if (isStacked) {
    const labelsRow =
      (name ?? showLabel) ? (
        <div className="flex items-center justify-between gap-2">
          {name && (
            <span
              className={progressBarNameVariants({
                upper,
                position: "left",
                size,
              })}
            >
              {displayName}
            </span>
          )}
          {showLabel && (
            <span
              className={cn(
                progressBarLabelVariants({ size }),
                "w-auto text-right"
              )}
            >
              {displayLabel}
            </span>
          )}
        </div>
      ) : null

    return (
      <div
        data-slot="progress-bar"
        className={cn(progressBarContainerVariants({ labelLayout }), className)}
        {...props}
      >
        {labelLayout === "above" && labelsRow}
        {wrappedTrack}
        {labelLayout === "below" && labelsRow}
      </div>
    )
  }

  // ── Inline layout (default, backward-compatible) ─────────────────────────

  return (
    <div
      data-slot="progress-bar"
      className={cn(progressBarContainerVariants({ labelLayout }), className)}
      {...props}
    >
      {name && namePosition === "left" && (
        <span
          className={progressBarNameVariants({ upper, position: "left", size })}
          style={labelWidth ? { width: labelWidth } : undefined}
        >
          {displayName}
        </span>
      )}

      {showLabel && labelPosition === "left" && (
        <span
          className={cn(
            progressBarLabelVariants({ size }),
            total !== undefined && "w-auto"
          )}
        >
          {displayLabel}
        </span>
      )}

      {wrappedTrack}

      {name && namePosition === "right" && (
        <span
          className={progressBarNameVariants({
            upper,
            position: "right",
            size,
          })}
          style={labelWidth ? { width: labelWidth } : undefined}
        >
          {displayName}
        </span>
      )}

      {showLabel && labelPosition === "right" && (
        <span
          className={cn(
            progressBarLabelVariants({ size }),
            total !== undefined && "w-auto"
          )}
        >
          {displayLabel}
        </span>
      )}
    </div>
  )
}
