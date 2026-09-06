"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface TimePickerProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "type">,
    VariantProps<typeof timePickerContainerVariants> {
  loading?: boolean
  invalid?: boolean
}

// ── Variants ──

export const timePickerContainerVariants = cva(
  "relative flex items-center rounded-lg border bg-input/50 transition-[color,box-shadow,background-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-[aria-invalid=true]:border-destructive has-[aria-invalid=true]:ring-3 has-[aria-invalid=true]:ring-destructive/20",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const timePickerInputVariants = cva(
  "w-full border-none bg-transparent pl-9 ring-0 focus-visible:border-none focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:hidden",
  {
    variants: {
      size: {
        sm: "h-full text-xs",
        md: "h-full text-sm",
        lg: "h-full text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Component ──

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    { size = "md", loading = false, invalid = false, className, ...props },
    ref
  ) => {
    if (loading) {
      return (
        <Skeleton
          className={cn(
            "w-full rounded-lg",
            size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9",
            className
          )}
        />
      )
    }

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"

    return (
      <div
        className={cn(timePickerContainerVariants({ size }), className)}
        data-slot="ds-time-picker"
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground"
          aria-hidden="true"
        >
          <ClockIcon className={iconSize} />
        </span>
        <Input
          ref={ref}
          type="time"
          aria-invalid={invalid}
          className={cn(timePickerInputVariants({ size }))}
          {...props}
        />
      </div>
    )
  }
)
TimePicker.displayName = "TimePicker"
