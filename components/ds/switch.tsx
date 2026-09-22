"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Switch as SwitchRoot } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type SwitchColor = "default" | "success" | "destructive" | "warning"

export interface SwitchProps
  extends
    Omit<React.ComponentProps<typeof SwitchRoot>, "size">,
    VariantProps<typeof switchVariants> {
  label?: string
  labelPosition?: "left" | "right"
  color?: SwitchColor
  loading?: boolean
  error?: string
  locale?: UILocale
}

// ── Variants ──

export const switchVariants = cva("", {
  variants: {
    color: {
      default: "",
      success: "data-checked:border-success data-checked:bg-success",
      destructive:
        "data-checked:border-destructive data-checked:bg-destructive",
      warning: "data-checked:border-warning data-checked:bg-warning",
    },
    size: {
      sm: "data-[size=sm]:h-4 data-[size=sm]:w-7 [&_[data-slot=switch-thumb]]:data-[size=sm]:h-3 [&_[data-slot=switch-thumb]]:data-[size=sm]:w-3",
      md: "",
      lg: "h-6 w-13 [&_[data-slot=switch-thumb]]:h-5 [&_[data-slot=switch-thumb]]:w-6",
    },
  },
  defaultVariants: { color: "default", size: "md" },
})

// ── Component ──

function Switch({
  color = "default",
  size = "md",
  label,
  labelPosition = "right",
  loading = false,
  error,
  locale = "en-US",
  disabled,
  className,
  id,
  ...props
}: SwitchProps) {
  const i18n = UI_I18N[locale]
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const errorId = error ? `${switchId}-error` : undefined

  const isDisabled = disabled || loading

  if (loading) {
    return (
      <div
        data-slot="ds-switch"
        className={cn(
          "inline-flex items-center gap-2",
          labelPosition === "left" && "flex-row-reverse"
        )}
      >
        <Skeleton
          className={cn(
            "rounded-full",
            size === "sm" ? "h-4 w-7" : size === "lg" ? "h-6 w-13" : "h-5 w-11"
          )}
        />
        {label && <Skeleton className="h-4 w-20 rounded-md" />}
      </div>
    )
  }

  const switchElement = (
    <SwitchRoot
      id={switchId}
      data-slot="ds-switch"
      data-color={color}
      disabled={isDisabled}
      className={cn(switchVariants({ color, size }), className)}
      aria-invalid={!!error}
      aria-describedby={errorId}
      aria-label={!label ? i18n.switch.toggle : undefined}
      {...props}
    />
  )

  if (!label && !error) return switchElement

  return (
    <div data-slot="ds-switch-wrapper" className="flex flex-col gap-1">
      <div
        className={cn(
          "inline-flex items-center gap-2",
          labelPosition === "left" && "flex-row-reverse"
        )}
      >
        {switchElement}
        {label && (
          <Label
            htmlFor={switchId}
            data-slot="ds-switch-label"
            className={cn(
              "cursor-pointer font-medium text-muted-foreground select-none",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base"
            )}
          >
            {label}
          </Label>
        )}
      </div>
      {error && (
        <p
          id={errorId}
          data-slot="ds-switch-error"
          className={cn(
            "text-destructive",
            size === "sm" ? "text-xs" : "text-xs"
          )}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { Switch }
