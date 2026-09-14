"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Slider as SliderRoot } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import type { UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface SliderMark {
  value: number
  label: string
}

export interface SliderProps
  extends
    Omit<React.ComponentProps<typeof SliderRoot>, "orientation">,
    VariantProps<typeof sliderVariants> {
  showTooltip?: boolean
  showMarks?: boolean
  marks?: SliderMark[]
  formatValue?: (value: number) => string
  locale?: UILocale
  loading?: boolean
  label?: string
  orientation?: "horizontal" | "vertical"
}

// ── Variants ──

export const sliderVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-40",
    },
  },
  defaultVariants: { orientation: "horizontal" },
})

export const markVariants = cva(
  "absolute -translate-x-1/2 text-xs text-muted-foreground",
  {
    variants: {
      orientation: {
        horizontal: "top-3",
        vertical: "top-0 left-6 translate-x-0",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

// ── Component ──

function Slider({
  showTooltip = false,
  showMarks = false,
  marks,
  formatValue: formatValueProp,
  loading = false,
  label,
  orientation = "horizontal",
  className,
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue,
  ...props
}: SliderProps) {
  const sliderId = React.useId()
  const resolvedValue = controlledValue ?? defaultValue ?? [min]
  const isRange = Array.isArray(resolvedValue) && resolvedValue.length > 1

  const defaultFormat = (v: number) => {
    if (v >= 1000) {
      return (v / 1000).toFixed(1) + "k"
    }
    return String(Math.round(v))
  }
  const formatValue = formatValueProp ?? defaultFormat

  const [localValue, setLocalValue] = React.useState(resolvedValue)
  const [tooltipValue, setTooltipValue] = React.useState<number | null>(null)

  const value = controlledValue ?? localValue

  // Generate step marks
  const resolvedMarks: SliderMark[] =
    marks ??
    (showMarks
      ? [
          { value: min, label: formatValue(min) },
          {
            value: Math.round((max - min) / 2 + min),
            label: formatValue(Math.round((max - min) / 2 + min)),
          },
          { value: max, label: formatValue(max) },
        ]
      : [])

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {label && <Skeleton className="h-4 w-24 rounded-md" />}
        <Skeleton
          className={cn(
            "rounded-full",
            orientation === "horizontal" ? "h-2 w-full" : "h-40 w-2"
          )}
        />
      </div>
    )
  }

  // Accessible name for axe: connect visible label to slider via aria-labelledby, fallback to aria-label
  const labelId = label ? `${sliderId}-label` : undefined

  const sliderElement = (
    <div
      className="flex flex-col gap-2"
      data-slot="ds-slider"
      data-vaul-no-drag
    >
      {label && (
        <span
          id={labelId}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </span>
      )}
      <div
        className={cn("relative", orientation === "vertical" && "flex h-40")}
      >
        {showTooltip && !isRange ? (
          <TooltipProvider>
            <Tooltip open={tooltipValue !== null}>
              <TooltipTrigger asChild>
                <div>
                  <SliderRoot
                    data-slot="ds-slider-root"
                    aria-label={
                      labelId
                        ? undefined
                        : label || (props["aria-label"] as string) || "Slider"
                    }
                    aria-labelledby={
                      labelId ||
                      (props["aria-labelledby"] as string) ||
                      undefined
                    }
                    min={min}
                    max={max}
                    value={Array.isArray(value) ? value : [value]}
                    onValueChange={(v: number[]) => {
                      setLocalValue(v)
                      setTooltipValue(v[0])
                    }}
                    onValueCommit={() => setTooltipValue(null)}
                    className={cn(
                      sliderVariants({ orientation }),
                      orientation === "vertical" && "h-full flex-col",
                      className
                    )}
                    {...props}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {formatValue(
                  tooltipValue ?? (Array.isArray(value) ? value[0] : value)
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <SliderRoot
            data-slot="ds-slider-root"
            aria-label={
              labelId
                ? undefined
                : label || (props["aria-label"] as string) || "Slider"
            }
            aria-labelledby={
              labelId || (props["aria-labelledby"] as string) || undefined
            }
            min={min}
            max={max}
            value={Array.isArray(value) ? value : [value]}
            onValueChange={(v) => setLocalValue(v)}
            className={cn(
              sliderVariants({ orientation }),
              orientation === "vertical" && "h-full flex-col",
              className
            )}
            {...props}
          />
        )}
        {resolvedMarks.length > 0 && (
          <div
            className={cn(
              "relative w-full",
              orientation === "vertical" && "hidden"
            )}
          >
            {resolvedMarks.map((mark) => {
              const percent = ((mark.value - min) / (max - min)) * 100
              return (
                <span
                  key={mark.value}
                  className={markVariants({ orientation })}
                  style={
                    orientation === "horizontal"
                      ? { left: `${percent}%` }
                      : { top: `${percent}%` }
                  }
                >
                  {mark.label}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  return sliderElement
}

export { Slider }
