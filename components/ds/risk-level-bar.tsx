"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { formatValue } from "@/lib/format-utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export type RiskLevelBarSize = "sm" | "md" | "lg"

export interface RiskSegment {
  color: string
  range: [number, number]
  textClass?: string
}

export interface RiskLevelBarProps extends HTMLAttributes<HTMLDivElement> {
  labelLeft: string
  labelRight: string
  value: number
  loading?: boolean
  segments?: RiskSegment[]
  locale?: UILocale
  size?: RiskLevelBarSize
}

export type RiskLevelLabelVariants = VariantProps<typeof riskLevelLabelVariants>

// ── Variants ───────────────────────────────────────────────────────────────

export const riskLevelContainerVariants = cva("flex w-full flex-col")

export const riskLevelWrapperVariants = cva(
  "flex w-full flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0"
)

export const riskLevelLabelVariants = cva(
  "flex h-full items-center font-medium text-foreground transition-colors",
  {
    variants: {
      side: {
        left: "md:mr-3",
        right: "flex items-center gap-2 md:ml-3",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { side: "left", size: "sm" },
  }
)

export const riskLevelValueVariants = cva(
  "flex items-center justify-center rounded-md font-semibold tabular-nums shadow-sm transition-all duration-200",
  {
    variants: {
      size: {
        sm: "min-w-[48px] px-2 py-0.5 text-xs leading-none",
        md: "min-w-[60px] px-2.5 py-1 text-sm leading-none",
        lg: "min-w-[72px] px-3 py-1.5 text-base leading-none",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

export const riskLevelSubtitleVariants = cva(
  "font-semibold text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

export const riskLevelBarContainerVariants = cva(
  "relative isolate mt-6 w-full min-w-[100px] overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

export const riskLevelSegmentVariants = cva(
  "absolute top-0 h-full transition-all duration-300 ease-in-out"
)

export const riskLevelMarkerVariants = cva([
  "absolute -top-2.5 h-0 w-0 border-l-8 border-l-transparent", // risk scale marker triangle — intentional
  "border-t-[12px] border-r-8 border-t-foreground border-r-transparent",
  "group z-10 -translate-x-1/2 cursor-pointer transition-[left] duration-300 ease-in-out",
])

export const riskLevelTooltipVariants = cva(
  [
    "absolute top-[-30px] left-1/2 text-xs",
    "-translate-x-1/2 -translate-y-[120%] scale-95",
    "rounded-md bg-foreground px-2 py-1.5 text-background shadow-lg",
    "pointer-events-none z-20 whitespace-nowrap opacity-0 transition-all duration-150",
    "group-hover:scale-100 group-hover:opacity-100",
    "group-focus:scale-100 group-focus:opacity-100",
  ],
  {
    variants: {
      isVisible: {
        true: "scale-100 opacity-100",
        false: "",
      },
    },
    defaultVariants: { isVisible: false },
  }
)

// ── Skeleton sizes keyed by size prop ──────────────────────────────────────

const skeletonDims: Record<
  RiskLevelBarSize,
  { labelLeft: string; labelRight: string; value: string; track: string }
> = {
  sm: {
    labelLeft: "h-3 w-24",
    labelRight: "h-3 w-16",
    value: "h-5 w-12",
    track: "h-2",
  },
  md: {
    labelLeft: "h-4 w-28",
    labelRight: "h-4 w-20",
    value: "h-6 w-14",
    track: "h-3",
  },
  lg: {
    labelLeft: "h-5 w-32",
    labelRight: "h-5 w-24",
    value: "h-7 w-16",
    track: "h-4",
  },
}

// ── RiskLevelBar ───────────────────────────────────────────────────────────

const DEFAULT_SEGMENTS: RiskSegment[] = [
  {
    color: "var(--color-risk-1)",
    range: [0, 0.25],
    textClass: "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]", // intentional: white on saturated risk color
  },
  {
    color: "var(--color-risk-2)",
    range: [0.25, 0.5],
    textClass: "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]", // intentional: white on saturated risk color
  },
  {
    color: "var(--color-risk-3)",
    range: [0.5, 0.75],
    textClass: "text-foreground",
  },
  {
    color: "var(--color-risk-4)",
    range: [0.75, 1],
    textClass: "text-foreground",
  },
]

export const RiskLevelBar = React.forwardRef<HTMLDivElement, RiskLevelBarProps>(
  (
    {
      labelLeft,
      labelRight,
      value = 0,
      loading = false,
      locale = "en-US",
      segments = DEFAULT_SEGMENTS,
      size = "sm",
      className,
      ...props
    },
    ref
  ) => {
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(false)

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(riskLevelContainerVariants(), className)}
          data-slot="risk-level-bar"
          {...props}
        >
          <div className={riskLevelWrapperVariants()}>
            <Skeleton className={skeletonDims[size].labelLeft} />
            <div className="flex items-center gap-2">
              <Skeleton className={skeletonDims[size].labelRight} />
              <Skeleton
                className={cn(skeletonDims[size].value, "rounded-md")}
              />
            </div>
          </div>
          <Skeleton
            className={cn("mt-6 w-full rounded-full", skeletonDims[size].track)}
          />
        </div>
      )
    }

    const clampedValue = Math.max(0, Math.min(1, Number(value) || 0))
    const markerPosition = `${clampedValue * 100}%`

    const percentageLabel = formatValue(clampedValue, "percent", {
      decimals: 1,
      locale,
    })

    const currentSegment = segments.find(
      (s) => clampedValue >= s.range[0] && clampedValue <= s.range[1]
    )

    return (
      <div
        ref={ref}
        className={cn(riskLevelContainerVariants(), className)}
        data-slot="risk-level-bar"
        {...props}
      >
        <div className={riskLevelWrapperVariants()}>
          <span
            className={riskLevelLabelVariants({ side: "left", size })}
            data-slot="risk-level-bar-label-left"
          >
            {labelLeft}
          </span>
          <div
            className={riskLevelLabelVariants({ side: "right", size })}
            data-slot="risk-level-bar-label-right"
          >
            <span className={riskLevelSubtitleVariants({ size })}>
              {labelRight}
            </span>
            <span
              className={cn(
                riskLevelValueVariants({ size }),
                currentSegment?.textClass
              )}
              style={{
                backgroundColor: currentSegment?.color || "var(--color-muted)",
              }}
              data-slot="risk-level-bar-value"
            >
              {percentageLabel}
            </span>
          </div>
        </div>

        <div
          className={riskLevelBarContainerVariants({ size })}
          data-slot="risk-level-bar-track"
        >
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className={cn(riskLevelSegmentVariants())}
              style={{
                left: `${seg.range[0] * 100}%`,
                width: `${(seg.range[1] - seg.range[0]) * 100}%`,
                backgroundColor: seg.color,
              }}
            />
          ))}

          <div
            role="button"
            tabIndex={0}
            aria-label={`${UI_I18N[locale].riskLevelBar.value}: ${percentageLabel}`}
            className={cn(riskLevelMarkerVariants())}
            style={{ left: markerPosition }}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            onFocus={() => setIsTooltipVisible(true)}
            onBlur={() => setIsTooltipVisible(false)}
            data-slot="risk-level-bar-marker"
          >
            <span
              className={riskLevelTooltipVariants({
                isVisible: isTooltipVisible,
              })}
            >
              {percentageLabel}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

RiskLevelBar.displayName = "RiskLevelBar"
