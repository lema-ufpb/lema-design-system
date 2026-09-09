"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface DynamicIslandProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof islandVariants> {
  state?: "idle" | "compact" | "expanded"
  icon?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  onClick?: () => void
}

// ── Variants ──

export const islandVariants = cva(
  "relative mx-auto flex overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        default:
          "bg-foreground text-background dark:bg-foreground dark:text-background",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "text-destructive-foreground bg-destructive",
      },
      size: {
        sm: "h-8 rounded-full",
        md: "h-10 rounded-full",
        lg: "h-12 rounded-full",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  }
)

export const titleVariants = cva("truncate font-medium", {
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
})

export const subtitleVariants = cva("truncate opacity-80", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export const iconVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Component ──

export const DynamicIsland = React.forwardRef<
  HTMLDivElement,
  DynamicIslandProps
>(
  (
    {
      className,
      state = "idle",
      intent,
      size = "md",
      icon,
      title,
      subtitle,
      onClick,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isIdle = state === "idle"
    const isExpanded = state === "expanded"
    const isCompact = state === "compact"
    const minWidth = size === "sm" ? 100 : size === "lg" ? 140 : 120

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label="Dynamic Status"
        className={cn(
          islandVariants({ intent, size }),
          isIdle && "w-0 opacity-0",
          isCompact &&
            "w-auto cursor-pointer items-center px-3 opacity-100 hover:scale-[1.02]",
          isExpanded &&
            "h-auto w-full max-w-[360px] flex-col rounded-3xl p-4 opacity-100",
          className
        )}
        style={isCompact ? { minWidth, ...style } : style}
        onClick={onClick}
        {...props}
      >
        {!isExpanded && !isIdle && (
          <div className="flex w-full animate-in items-center gap-2 duration-200 fade-in-0 slide-in-from-bottom-1">
            {icon && <div className={cn(iconVariants({ size }))}>{icon}</div>}
            <div className="flex flex-1 flex-col justify-center overflow-hidden">
              {title && (
                <span className={cn(titleVariants({ size }))}>{title}</span>
              )}
            </div>
            {subtitle && (
              <div className="flex shrink-0 items-center justify-end">
                <span className={cn(subtitleVariants({ size }))}>
                  {subtitle}
                </span>
              </div>
            )}
          </div>
        )}

        {isExpanded && (
          <div className="flex w-full animate-in flex-col duration-300 fade-in-0">
            {children}
          </div>
        )}
      </div>
    )
  }
)
DynamicIsland.displayName = "DynamicIsland"
