"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { formatValue } from "@/lib/format-utils"

// ── Types ──────────────────────────────────────────────────────────────────

export type ProgressCircularIntent =
  "primary" | "secondary" | "success" | "destructive"

export type ProgressCircularSize = "sm" | "md" | "lg" | "xl"

export interface ProgressCircularVariantProps
  extends
    VariantProps<typeof progressCircularWrapperVariants>,
    VariantProps<typeof progressCircularValueVariants>,
    VariantProps<typeof progressCircularTitleVariants> {}

export interface ProgressCircularProps
  extends ProgressCircularVariantProps, HTMLAttributes<HTMLDivElement> {
  value: number
  title?: string
  intent?: ProgressCircularIntent
  size?: ProgressCircularSize
  loading?: boolean
  precision?: number
  locale?: UILocale
  /**
   * Override indicator stroke via CSS token `--progress-fill`.
   * Accepts any CSS color value or `var(--my-token)`.
   */
  fillColor?: string
  /**
   * Override track stroke via CSS token `--progress-track`.
   * Accepts any CSS color value or `var(--my-token)`.
   */
  trackColor?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const progressCircularContainerVariants = cva(
  "flex flex-col items-center justify-center"
)

export const progressCircularWrapperVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "size-20",
        md: "size-30",
        lg: "size-40",
        xl: "size-50",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const progressCircularSvgVariants = cva("-rotate-90")

export const progressCircularIndicatorVariants = cva(
  "transition-[stroke-dashoffset] duration-500 ease-out"
)

export const progressCircularCenterTextVariants = cva(
  "absolute flex flex-col items-center justify-center rounded-full",
  {
    variants: {
      size: {
        sm: "size-10",
        md: "size-15",
        lg: "size-20",
        xl: "size-25",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const progressCircularValueVariants = cva(
  "font-semibold text-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
        xl: "text-2xl",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const progressCircularValueSkeletonDims: Record<ProgressCircularSize, string> =
  {
    sm: "h-3 w-10",
    md: "h-4 w-14",
    lg: "h-5 w-16",
    xl: "h-7 w-20",
  }

const progressCircularTitleSkeletonDims: Record<ProgressCircularSize, string> =
  {
    sm: "h-3 w-16",
    md: "h-4 w-24",
    lg: "h-5 w-32",
    xl: "h-6 w-40",
  }

export const progressCircularTitleVariants = cva(
  "mt-3 min-h-5 w-full text-center font-medium wrap-break-word text-muted-foreground",
  {
    variants: {
      size: {
        sm: "max-w-[80px] text-xs",
        md: "max-w-[120px] text-sm",
        lg: "max-w-[160px] text-base",
        xl: "max-w-[200px] text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const progressCircularStrokeVariants = cva("", {
  variants: {
    intent: {
      primary: "stroke-primary",
      secondary: "stroke-secondary",
      success: "stroke-[var(--color-success)]",
      destructive: "stroke-destructive",
    },
  },
  defaultVariants: { intent: "primary" },
})

// ── Constants ──────────────────────────────────────────────────────────────

const STROKE_WIDTH = 10
const RADIUS = 50
const VIEW_BOX = 120
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// ── ProgressCircular ───────────────────────────────────────────────────────

export const ProgressCircular = React.forwardRef<
  HTMLDivElement,
  ProgressCircularProps
>(
  (
    {
      value,
      title,
      intent = "primary",
      size = "md",
      loading = false,
      locale = "en-US",
      precision = 0,
      fillColor,
      trackColor,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const tokenStyle = {
      ...(fillColor !== undefined && { "--progress-fill": fillColor }),
      ...(trackColor !== undefined && { "--progress-track": trackColor }),
      ...style,
    } as React.CSSProperties
    const [offset, setOffset] = React.useState(CIRCUMFERENCE)
    const rafRef = React.useRef<number>(0)

    const clamped = Math.max(0, Math.min(1, value > 1 ? value / 100 : value))

    React.useEffect(() => {
      const timer = setTimeout(() => {
        const start = performance.now()
        const duration = 500

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1)
          setOffset(CIRCUMFERENCE - clamped * CIRCUMFERENCE * progress)
          if (progress < 1) rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
      }, 500)

      return () => {
        clearTimeout(timer)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, [clamped])

    const percentage = formatValue(clamped, "percent", {
      decimals: precision,
      locale,
    })

    return (
      <div
        ref={ref}
        style={tokenStyle}
        className={cn(progressCircularContainerVariants(), className)}
        data-slot="progress-circular"
        {...props}
      >
        <div
          className={cn(progressCircularWrapperVariants({ size }))}
          role="progressbar"
          aria-valuenow={Math.round(clamped * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={title || UI_I18N[locale].progressCircular.label}
          data-slot="progress-circular-svg"
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
            className={cn(progressCircularSvgVariants())}
          >
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              className={cn(
                "text-muted/30",
                trackColor && "text-(--progress-track)"
              )}
              strokeWidth={STROKE_WIDTH}
              data-slot="progress-circular-track"
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={cn(
                progressCircularIndicatorVariants(),
                !fillColor && progressCircularStrokeVariants({ intent }),
                fillColor && "stroke-(--progress-fill)"
              )}
              data-slot="progress-circular-indicator"
            />
          </svg>

          <div
            className={cn(progressCircularCenterTextVariants({ size }))}
            data-slot="progress-circular-center-text"
          >
            {loading ? (
              <Skeleton
                className={cn(
                  "rounded",
                  progressCircularValueSkeletonDims[size]
                )}
              />
            ) : (
              <span className={cn(progressCircularValueVariants({ size }))}>
                {`${percentage}%`}
              </span>
            )}
          </div>
        </div>

        {title &&
          (loading ? (
            <Skeleton
              className={cn(
                "mx-auto rounded",
                progressCircularTitleSkeletonDims[size]
              )}
              data-slot="progress-circular-title"
            />
          ) : (
            <span
              className={cn(progressCircularTitleVariants({ size }))}
              data-slot="progress-circular-title"
            >
              {title}
            </span>
          ))}
      </div>
    )
  }
)

ProgressCircular.displayName = "ProgressCircular"
