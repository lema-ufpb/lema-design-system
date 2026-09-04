"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──

export type RatingSize = "sm" | "md" | "lg"

export interface RatingProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  /**
   * The current rating value.
   */
  value: number
  /**
   * The maximum rating value. Defaults to 5.
   */
  max?: number
  /**
   * Disables interaction and hover states.
   */
  readonly?: boolean
  /**
   * Disables the component entirely (opacity).
   */
  disabled?: boolean
  /**
   * Callback when a star is clicked.
   */
  onChange?: (value: number) => void
  /**
   * Custom icon component to render. Defaults to StarIcon.
   */
  icon?: React.ElementType
}

// ── Variants ──

export const ratingVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
})

export const starVariants = cva(
  "shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  }
)

// ── Component ──

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      size = "md",
      readonly = false,
      disabled = false,
      icon: Icon = StarIcon,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const starElementsRef = React.useRef<Record<number, HTMLDivElement | null>>(
      {}
    )

    const isInteractive = !readonly && !disabled

    const handleMouseEnter = (index: number) => {
      if (!isInteractive) return
      setHoverValue(index)
    }

    const handleMouseLeave = () => {
      if (!isInteractive) return
      setHoverValue(null)
    }

    const handleClick = (index: number) => {
      if (!isInteractive || !onChange) return
      onChange(index)
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (!isInteractive || !onChange) return

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onChange(index)
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault()
        if (index < max) {
          onChange(index + 1)
          starElementsRef.current[index + 1]?.focus()
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault()
        if (index > 1) {
          onChange(index - 1)
          starElementsRef.current[index - 1]?.focus()
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(ratingVariants({ size, disabled }), className)}
        role={isInteractive ? "radiogroup" : "img"}
        aria-label={isInteractive ? "Rating" : `Rating: ${value} out of ${max}`}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
          const ratingValue = i + 1
          const isActive = hoverValue
            ? ratingValue <= hoverValue
            : ratingValue <= value

          return (
            <div
              key={ratingValue}
              ref={(el) => {
                starElementsRef.current[ratingValue] = el
              }}
              role={isInteractive ? "radio" : undefined}
              aria-label={isInteractive ? `${ratingValue}` : undefined}
              aria-checked={isInteractive ? ratingValue === value : undefined}
              aria-posinset={isInteractive ? ratingValue : undefined}
              aria-setsize={isInteractive ? max : undefined}
              tabIndex={
                isInteractive
                  ? ratingValue === value || (value === 0 && ratingValue === 1)
                    ? 0
                    : -1
                  : undefined
              }
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onClick={() => handleClick(ratingValue)}
              onKeyDown={(e) => handleKeyDown(e, ratingValue)}
              className={cn(
                starVariants({ size, interactive: isInteractive }),
                isActive
                  ? "fill-warning text-warning"
                  : "fill-muted text-muted-foreground"
              )}
            >
              <Icon className="size-full" aria-hidden="true" />
            </div>
          )
        })}
      </div>
    )
  }
)
Rating.displayName = "Rating"
