"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export type ProgressCircularIntent =
  | "primary"
  | "secondary"
  | "success"
  | "destructive"

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
        sm: "h-[80px] w-[80px]",
        md: "h-[120px] w-[120px]",
        lg: "h-[160px] w-[160px]",
        xl: "h-[200px] w-[200px]",
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
        sm: "h-[40px] w-[40px]",
        md: "h-[60px] w-[60px]",
        lg: "h-[80px] w-[80px]",
        xl: "h-[100px] w-[100px]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const progressCircularValueVariants = cva(
  "font-semibold text-foreground tabular-nums",
  {
    variants: {
      loading: { true: "animate-pulse opacity-50" },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
        xl: "text-2xl",
      },
    },
    defaultVariants: { loading: false, size: "md" },
  }
)

export const progressCircularTitleVariants = cva(
  "mt-3 min-h-5 w-full text-center font-medium wrap-break-word text-muted-foreground",
  {
    variants: {
      loading: { true: "animate-pulse opacity-50" },
      size: {
        sm: "max-w-[80px] text-xs",
        md: "max-w-[120px] text-sm",
        lg: "max-w-[160px] text-base",
        xl: "max-w-[200px] text-lg",
      },
    },
    defaultVariants: { loading: false, size: "md" },
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
      className,
      ...props
    },
    ref
  ) => {
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

    const percentage = (clamped * 100).toLocaleString(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })

    return (
      <div
        ref={ref}
        className={cn(progressCircularContainerVariants(), className)}
        {...props}
      >
        <div
          className={cn(progressCircularWrapperVariants({ size }))}
          role="progressbar"
          aria-valuenow={Math.round(clamped * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={title || UI_I18N[locale].progressCircular.label}
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
              className="text-muted/30"
              strokeWidth={STROKE_WIDTH}
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
                progressCircularStrokeVariants({ intent })
              )}
            />
          </svg>

          <div className={cn(progressCircularCenterTextVariants({ size }))}>
            <span
              className={cn(progressCircularValueVariants({ size, loading }))}
            >
              {loading ? (
                <span className="invisible">0%</span>
              ) : (
                `${percentage}%`
              )}
            </span>
          </div>
        </div>

        {title && (
          <span
            className={cn(progressCircularTitleVariants({ size, loading }))}
          >
            {loading ? <span className="invisible">{title}</span> : title}
          </span>
        )}
      </div>
    )
  }
)

ProgressCircular.displayName = "ProgressCircular"
