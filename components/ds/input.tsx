"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon, Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input as InputRoot } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputWrapperVariants> {
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPlacement?: "left" | "right"
  clearable?: boolean
  showCount?: boolean
  loading?: boolean
  error?: string
  label?: string
  locale?: UILocale
}

// ── Variants ──

export const inputWrapperVariants = cva(
  "relative flex items-center transition-[color,box-shadow,background-color] focus-within:ring-3 focus-within:ring-ring/30 has-[aria-invalid=true]:ring-3 has-[aria-invalid=true]:ring-destructive/20",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
        lg: "h-10",
      },
      rounded: {
        none: "rounded-none",
        light: "rounded-lg",
        full: "rounded-full",
      },
      variant: {
        default: "bg-input/50",
        muted: "bg-muted",
      },
      bordered: {
        true: "border focus-within:border-ring has-[aria-invalid=true]:border-destructive",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "light",
      variant: "default",
      bordered: true,
    },
  }
)

// ── Component ──

function Input({
  size = "md",
  rounded,
  variant: inputVariant = "default",
  bordered = true,
  icon,
  iconPlacement = "left",
  clearable = false,
  showCount = false,
  loading = false,
  error,
  label,
  locale: localeProp,
  className,
  id,
  maxLength,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const locale = useUILocale(localeProp)
  const i18n = UI_I18N[locale]
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined
  const countId = showCount ? `${inputId}-count` : undefined

  const [internalValue, setInternalValue] = React.useState(
    defaultValue?.toString() ?? ""
  )
  const isControlled = value !== undefined
  const currentValue = isControlled ? value.toString() : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    props.onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue("")
    const nativeEvent = new Event("input", { bubbles: true })
    const fakeTarget = document.createElement("input")
    fakeTarget.value = ""
    const syntheticEvent = {
      ...nativeEvent,
      target: fakeTarget,
      currentTarget: fakeTarget,
    } as unknown as React.ChangeEvent<HTMLInputElement>
    props.onChange?.(syntheticEvent)
    const input = document.getElementById(inputId) as HTMLInputElement | null
    if (input) {
      input.value = ""
      input.focus()
    }
  }

  const showClear = clearable && currentValue.length > 0 && !loading

  const iconSize =
    size === "sm"
      ? "[&>svg]:size-3.5"
      : size === "lg"
        ? "[&>svg]:size-5"
        : "[&>svg]:size-4"

  const needsLeftPad = (icon && iconPlacement === "left") || loading
  const needsRightPad = (icon && iconPlacement === "right") || showClear

  const leftPad = needsLeftPad
    ? size === "sm"
      ? "pl-8"
      : size === "lg"
        ? "pl-10"
        : "pl-9"
    : ""
  const rightPad = needsRightPad
    ? size === "sm"
      ? "pr-8"
      : size === "lg"
        ? "pr-10"
        : "pr-9"
    : ""

  return (
    <div data-slot="ds-input-wrapper" className="flex flex-col gap-1.5">
      {label && (
        <Label
          htmlFor={inputId}
          data-slot="ds-input-label"
          className={cn(
            "font-medium text-muted-foreground",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {label}
        </Label>
      )}
      <div
        className={cn(
          inputWrapperVariants({
            size,
            rounded,
            variant: inputVariant,
            bordered,
          }),
          className
        )}
      >
        {icon && iconPlacement === "left" && (
          <span
            data-slot="ds-input-icon-left"
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground",
              iconSize
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {loading && (
          <span
            data-slot="ds-input-spinner"
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground",
              iconSize
            )}
            aria-hidden="true"
          >
            <Loader2Icon className="animate-spin" />
          </span>
        )}
        <InputRoot
          id={inputId}
          data-slot="ds-input"
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={
            [errorId, countId].filter(Boolean).join(" ") || undefined
          }
          disabled={props.disabled || loading}
          className={cn(
            "border-none bg-transparent ring-0 focus-visible:border-none focus-visible:ring-0",
            leftPad,
            rightPad,
            size === "sm" && "h-full text-xs",
            size === "md" && "h-full text-sm",
            size === "lg" && "h-full text-base"
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            data-slot="ds-input-clear"
            aria-label={i18n.input.clear}
            onClick={handleClear}
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground",
              iconSize
            )}
          >
            <XIcon />
          </button>
        )}
        {icon && iconPlacement === "right" && !showClear && (
          <span
            data-slot="ds-input-icon-right"
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground",
              iconSize
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        {error && (
          <p
            id={errorId}
            data-slot="ds-input-error"
            className={cn(
              "text-destructive",
              size === "sm" ? "text-xs" : "text-xs"
            )}
            role="alert"
          >
            {error}
          </p>
        )}
        {showCount && maxLength && (
          <p
            id={countId}
            data-slot="ds-input-count"
            className={cn(
              "ml-auto text-muted-foreground",
              size === "sm" ? "text-xs" : "text-xs"
            )}
            aria-live="polite"
          >
            {currentValue.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}

export { Input }
