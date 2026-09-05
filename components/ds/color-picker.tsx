"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface ColorPickerProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "type" | "onChange">,
    VariantProps<typeof colorPickerContainerVariants> {
  value?: string
  onChange?: (value: string) => void
  invalid?: boolean
  locale?: UILocale
}

// ── Variants ──

export const colorPickerContainerVariants = cva(
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

export const colorPickerInputVariants = cva(
  "w-full border-none bg-transparent ring-0 focus-visible:border-none focus-visible:ring-0",
  {
    variants: {
      size: {
        sm: "h-full px-2 text-xs",
        md: "h-full px-3 text-sm",
        lg: "h-full px-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Component ──

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      size = "md",
      invalid = false,
      className,
      value = "#000000",
      onChange,
      disabled,
      locale = "pt-BR",
      ...props
    },
    ref
  ) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const swatchSize =
      size === "sm" ? "size-5" : size === "lg" ? "size-7" : "size-6"
    const swatchPadding = size === "sm" ? "pl-1.5" : "pl-2"

    return (
      <div
        className={cn(
          colorPickerContainerVariants({ size }),
          disabled && "pointer-events-none opacity-50",
          className
        )}
        data-slot="ds-color-picker"
      >
        <div className={cn("flex h-full items-center", swatchPadding)}>
          <div
            className={cn(
              "relative overflow-hidden rounded-md border",
              swatchSize
            )}
          >
            <input
              type="color"
              value={value}
              onChange={handleColorChange}
              disabled={disabled}
              className="absolute -inset-2 size-12 cursor-pointer border-0 p-0"
              aria-label={locale ? UI_I18N[locale].input?.clear ?? "Select color" : "Select color"}
            />
          </div>
        </div>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleTextChange}
          disabled={disabled}
          aria-invalid={invalid}
          maxLength={7}
          className={cn(colorPickerInputVariants({ size }))}
          {...props}
        />
      </div>
    )
  }
)
ColorPicker.displayName = "ColorPicker"
