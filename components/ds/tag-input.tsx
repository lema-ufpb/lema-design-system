"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface TagInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tagInputContainerVariants> {
  value: string[]
  onChange: (tags: string[]) => void
  maxTags?: number
  allowDuplicates?: boolean
  separator?: string | RegExp | (string | RegExp)[]
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  invalid?: boolean
  locale?: UILocale
}

// ── Variants ──

export const tagInputContainerVariants = cva(
  "flex w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none",
  {
    variants: {
      size: {
        sm: "min-h-8 gap-1 px-2 py-1",
        md: "min-h-9 gap-1.5 px-3 py-1.5",
        lg: "min-h-10 gap-2 px-3 py-2",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      invalid: {
        true: "border-destructive focus-within:ring-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      invalid: false,
    },
  }
)

export const tagInputBadgeVariants = cva(
  "flex items-center gap-1 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80",
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-0.5 text-sm",
        lg: "px-2.5 py-1 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const tagInputInputVariants = cva(
  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Internal Helpers ──

const skeletonDims = {
  sm: "h-8 w-full",
  md: "h-9 w-full",
  lg: "h-10 w-full",
}

// ── Component ──

export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value,
      onChange,
      maxTags,
      allowDuplicates = false,
      separator = [",", "Enter"],
      placeholder,
      size = "md",
      loading = false,
      disabled = false,
      invalid = false,
      locale = "en-US",
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = React.useState("")
    const i18n = UI_I18N[locale].tagInput

    const handleContainerClick = () => {
      if (!disabled) {
        inputRef.current?.focus()
      }
    }

    const addTag = React.useCallback(
      (tagText: string) => {
        const newTag = tagText.trim()
        if (!newTag) return

        if (maxTags !== undefined && value.length >= maxTags) {
          return
        }

        if (!allowDuplicates && value.includes(newTag)) {
          return
        }

        onChange([...value, newTag])
        setInputValue("")
      },
      [value, onChange, maxTags, allowDuplicates]
    )

    const removeTag = React.useCallback(
      (indexToRemove: number) => {
        onChange(value.filter((_, i) => i !== indexToRemove))
      },
      [value, onChange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const separators = Array.isArray(separator) ? separator : [separator]
        const isSeparator = separators.some((sep) => {
          if (sep instanceof RegExp) {
            return sep.test(e.key) || sep.test(inputValue) // simplified
          }
          return sep === e.key
        })

        if (isSeparator) {
          e.preventDefault()
          addTag(inputValue)
          return
        }

        if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
          e.preventDefault()
          removeTag(value.length - 1)
        }
      },
      [inputValue, value, separator, addTag, removeTag]
    )

    const handleBlur = React.useCallback(() => {
      addTag(inputValue)
    }, [inputValue, addTag])

    if (loading) {
      return (
        <Skeleton
          data-slot="ds-tag-input-loading"
          className={cn(skeletonDims[size || "md"], className)}
        />
      )
    }

    const iconSize =
      size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-3.5"

    return (
      <div
        ref={ref}
        data-slot="ds-tag-input"
        className={cn(
          tagInputContainerVariants({ size, disabled, invalid }),
          className
        )}
        onClick={handleContainerClick}
        {...props}
      >
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="secondary"
            className={cn(tagInputBadgeVariants({ size }), "h-fit")}
          >
            <span className="max-w-50 truncate">{tag}</span>
            <button
              type="button"
              className="ml-1 rounded-full ring-offset-background outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                removeTag(index)
              }}
              aria-label={`${i18n.removeTag} ${tag}`}
            >
              <XIcon
                className={cn(iconSize, "opacity-70 hover:opacity-100")}
                aria-hidden="true"
              />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          className={cn(tagInputInputVariants({ size }))}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={
            disabled || (maxTags !== undefined && value.length >= maxTags)
          }
          placeholder={
            maxTags !== undefined && value.length >= maxTags
              ? i18n.maxReached
              : value.length === 0
                ? placeholder
                : ""
          }
          aria-invalid={invalid}
          aria-label={props["aria-label"] || "Tag input"}
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"
