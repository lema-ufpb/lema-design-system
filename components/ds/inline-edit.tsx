"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Pencil, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Variants ──

export const inlineEditViewVariants = cva(
  "group inline-flex cursor-pointer items-center gap-2 rounded-md transition-colors select-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "min-h-7 px-2 py-0.5 text-xs",
        md: "min-h-8 px-2.5 py-1 text-sm",
        lg: "min-h-9 px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Types ──

export interface InlineEditProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSave" | "defaultValue">,
    VariantProps<typeof inlineEditViewVariants> {
  /**
   * The current text value.
   */
  value: string
  /**
   * Callback fired when value is confirmed/saved.
   */
  onSave: (newValue: string) => void | Promise<void>
  /**
   * Placeholder shown when the value is empty.
   */
  placeholder?: string
  /**
   * Validation function returning an error string or undefined if valid.
   */
  validate?: (val: string) => string | undefined
  /**
   * Whether editing is disabled.
   */
  disabled?: boolean
  /**
   * Locale for tooltips and button labels.
   */
  locale?: UILocale
}

// ── Component ──

export const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value,
      onSave,
      placeholder,
      validate,
      disabled = false,
      size = "md",
      locale: localeProp,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [isEditing, setIsEditing] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value)
    const [isSaving, setIsSaving] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>()

    const inputRef = React.useRef<HTMLInputElement>(null)
    const t = UI_I18N[locale].inlineEdit

    React.useEffect(() => {
      setCurrentValue(value)
    }, [value])

    React.useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, [isEditing])

    const startEditing = () => {
      if (disabled || isSaving) return
      setError(undefined)
      setCurrentValue(value)
      setIsEditing(true)
    }

    const cancelEditing = () => {
      setIsEditing(false)
      setCurrentValue(value)
      setError(undefined)
    }

    const handleSave = async () => {
      if (validate) {
        const err = validate(currentValue)
        if (err) {
          setError(err)
          return
        }
      }
      setError(undefined)

      if (currentValue === value) {
        setIsEditing(false)
        return
      }

      try {
        setIsSaving(true)
        await onSave(currentValue)
        setIsEditing(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error saving")
      } finally {
        setIsSaving(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSave()
      } else if (e.key === "Escape") {
        e.preventDefault()
        cancelEditing()
      }
    }

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"
    const buttonHeight = size === "sm" ? "h-7" : size === "lg" ? "h-9" : "h-8"
    const displayPlaceholder = placeholder ?? t.placeholder

    if (isEditing) {
      return (
        <div
          ref={ref}
          className={cn("flex w-full max-w-sm flex-col gap-1", className)}
          {...props}
        >
          <div className="flex items-center gap-1.5">
            <Input
              ref={inputRef}
              value={currentValue}
              disabled={isSaving}
              aria-label={props["aria-label"] ?? (placeholder || "Edit text")}
              onChange={(e) => {
                setCurrentValue(e.target.value)
                if (error) setError(undefined)
              }}
              onKeyDown={handleKeyDown}
              className={cn(
                buttonHeight,
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isSaving}
              onClick={handleSave}
              className={cn(buttonHeight, "w-8 shrink-0")}
              aria-label={t.save}
            >
              {isSaving ? (
                <Spinner className={iconSize} />
              ) : (
                <Check className={iconSize} />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isSaving}
              onClick={cancelEditing}
              className={cn(
                buttonHeight,
                "w-8 shrink-0 text-muted-foreground hover:text-destructive"
              )}
              aria-label={t.cancel}
            >
              <X className={iconSize} />
            </Button>
          </div>
          {error && (
            <span className="px-1 text-xs font-medium text-destructive">
              {error}
            </span>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={t.clickToEdit}
        onClick={startEditing}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            startEditing()
          }
        }}
        className={cn(
          inlineEditViewVariants({ size }),
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "truncate font-medium text-foreground",
            !value && "font-normal text-muted-foreground italic"
          )}
        >
          {value || displayPlaceholder}
        </span>
        {!disabled && (
          <Pencil
            className={cn(
              iconSize,
              "text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            )}
          />
        )}
      </div>
    )
  }
)

InlineEdit.displayName = "InlineEdit"
