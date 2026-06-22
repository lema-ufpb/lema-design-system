"use client"

import * as React from "react"
import { Plus, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CounterProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof counterVariants> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  loading?: boolean
  disabled?: boolean
  label?: string
  maxWidth?: React.CSSProperties["maxWidth"]
  onChange?: (value: number) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  id?: string
  locale?: UILocale
  inputProps?: Omit<
    React.ComponentProps<"input">,
    | "type"
    | "value"
    | "defaultValue"
    | "onChange"
    | "min"
    | "max"
    | "step"
    | "onBlur"
    | "onKeyDown"
    | "id"
    | "disabled"
    | "ref"
    | "className"
  >
}

// ── Variants ───────────────────────────────────────────────────────────────

export const counterVariants = cva(
  "flex w-full min-w-0 items-center rounded-lg border bg-background transition-all focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8 gap-1 px-1",
        md: "h-10 gap-2 px-1",
        lg: "h-12 gap-3 px-2",
      },
      variant: {
        default: "border-input shadow-sm",
        ghost: "border-transparent bg-muted/50 hover:bg-muted",
        outline: "border-primary/20 bg-transparent",
      },
      disabled: {
        true: "pointer-events-none opacity-50 grayscale",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      disabled: false,
    },
  }
)

export const counterInputVariants = cva(
  "min-w-0 flex-1 [appearance:textfield] border-none bg-transparent p-0 text-center text-sm font-semibold tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
  {
    variants: {
      size: {
        sm: "min-w-8 text-xs",
        md: "min-w-12 text-sm",
        lg: "min-w-14 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export type CounterVariants = VariantProps<typeof counterVariants>

// ── Counter ────────────────────────────────────────────────────────────────

export const Counter = React.forwardRef<HTMLInputElement, CounterProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      size = "md",
      variant = "default",
      loading = false,
      disabled = false,
      locale = "en-US",
      label,
      maxWidth,
      onChange,
      onBlur,
      onKeyDown,
      inputProps,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = props.id ?? generatedId

    const clamp = React.useCallback(
      (val: number) => {
        if (isNaN(val)) return defaultValue
        return Math.min(Math.max(val, min), max)
      },
      [min, max, defaultValue]
    )

    const [internalValue, setInternalValue] = React.useState<number>(() =>
      clamp(defaultValue)
    )
    const isControlled = controlledValue !== undefined
    const currentNumber = isControlled ? (controlledValue ?? 0) : internalValue

    const handleUpdate = React.useCallback(
      (nextVal: number) => {
        const clamped = clamp(nextVal)
        if (!isControlled) setInternalValue(clamped)
        onChange?.(clamped)
      },
      [clamp, isControlled, onChange]
    )

    const increment = () => handleUpdate(currentNumber + step)
    const decrement = () => handleUpdate(currentNumber - step)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value)
      if (!isNaN(val)) {
        handleUpdate(val)
      } else if (e.target.value === "") {
        if (!isControlled) setInternalValue(NaN)
      }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value)
      handleUpdate(isNaN(val) ? defaultValue : val)
      onBlur?.(e)
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        increment()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        decrement()
      }
      onKeyDown?.(e)
    }

    if (loading) {
      return (
        <Skeleton
          className={cn(
            "w-full rounded-lg",
            size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10",
            className
          )}
          style={{ maxWidth, ...style }}
        />
      )
    }

    return (
      <div
        className={cn(counterVariants({ size, variant, disabled, className }))}
        style={{ maxWidth, ...style }}
        role="group"
        aria-label={label || UI_I18N[locale].counter.groupLabel}
        data-slot="counter"
      >
        <Button
          variant="ghost"
          size={size === "sm" ? "icon-xs" : size === "lg" ? "icon" : "icon-sm"}
          type="button"
          onClick={decrement}
          disabled={disabled || currentNumber <= min}
          aria-label={UI_I18N[locale].counter.decrease}
          data-slot="counter-decrement"
          className="rounded-md hover:bg-accent disabled:opacity-30"
        >
          <Minus className="size-4 shrink-0 transition-transform active:scale-75" />
        </Button>

        <input
          {...inputProps}
          {...props}
          ref={ref}
          id={inputId}
          type="number"
          data-slot="counter-input"
          value={isNaN(currentNumber) ? "" : currentNumber}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          autoComplete="off"
          aria-label={label || UI_I18N[locale].counter.groupLabel}
          className={cn(counterInputVariants({ size }))}
        />

        <Button
          variant="ghost"
          size={size === "sm" ? "icon-xs" : size === "lg" ? "icon" : "icon-sm"}
          type="button"
          onClick={increment}
          disabled={disabled || currentNumber >= max}
          aria-label={UI_I18N[locale].counter.increase}
          data-slot="counter-increment"
          className="rounded-md hover:bg-accent disabled:opacity-30"
        >
          <Plus className="size-4 shrink-0 transition-transform active:scale-75" />
        </Button>
      </div>
    )
  }
)

Counter.displayName = "Counter"
