"use client"

import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { type UILocale, UI_I18N } from "@/lib/ui-i18n"

// ── Types ──

export type PageLoaderVariant = "bar" | "spinner"
export type PageLoaderColor = "primary" | "success" | "destructive"
export type PageLoaderOverlay = "ghost" | "soft" | "subtle" | "solid" | "none"
export type PageLoaderSize = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl"

export interface PageLoaderProps extends Omit<
  React.ComponentProps<"div">,
  "aria-label"
> {
  loading: boolean
  variant?: PageLoaderVariant
  size?: PageLoaderSize
  color?: PageLoaderColor
  overlay?: PageLoaderOverlay
  blur?: boolean
  message?: string
  locale?: UILocale
  className?: string
  "aria-label"?: string
}

// ── Variants ──

export const pageLoaderOverlayVariants = cva(
  "fixed inset-0 z-50 transition-opacity duration-300",
  {
    variants: {
      overlay: {
        ghost: "bg-background/25",
        soft: "bg-background/50",
        subtle: "bg-background/80",
        solid: "bg-background/95",
        none: "bg-transparent",
      },
      blur: {
        true: "backdrop-blur-xs",
        false: "",
      },
    },
    defaultVariants: {
      overlay: "soft",
      blur: false,
    },
  }
)

export const pageLoaderBarTrackVariants = cva(
  "absolute top-0 right-0 left-0 overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-0.5",
        md: "h-1",
        lg: "h-1.5",
        xl: "h-1.5",
        "2xl": "h-1.5",
        "4xl": "h-1.5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const pageLoaderBarFillVariants = cva(
  "absolute inset-0 origin-left animate-loader-fill",
  {
    variants: {
      color: {
        primary: "bg-primary",
        success: "bg-success",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: { color: "primary" },
  }
)

export const pageLoaderSpinnerSizeVariants = cva("", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-10",
      lg: "size-14",
      xl: "size-20",
      "2xl": "size-28",
      "4xl": "size-40",
    },
  },
  defaultVariants: { size: "md" },
})

export const pageLoaderSpinnerColorVariants = cva("", {
  variants: {
    color: {
      primary: "text-primary",
      success: "text-success",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { color: "primary" },
})

export const pageLoaderMessageVariants = cva(
  "font-medium text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-base",
        "2xl": "text-base",
        "4xl": "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──

export function PageLoader({
  loading,
  variant = "bar",
  size = "md",
  color = "primary",
  overlay = "soft",
  blur = false,
  message,
  locale = "en-US",
  className,
  "aria-label": ariaLabel,
  ...htmlProps
}: PageLoaderProps) {
  const t = UI_I18N[locale].pageLoader

  return (
    <div
      role="status"
      aria-busy={loading}
      aria-hidden={!loading}
      aria-label={ariaLabel ?? t.loading}
      aria-live="polite"
      data-loading={loading}
      {...htmlProps}
      className={cn(
        pageLoaderOverlayVariants({ overlay, blur }),
        loading
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        className
      )}
    >
      {variant === "bar" && (
        <>
          <div aria-hidden className={cn(pageLoaderBarTrackVariants({ size }))}>
            <div className={cn(pageLoaderBarFillVariants({ color }))} />
          </div>
          <span className="sr-only">{message ?? t.loading}</span>
        </>
      )}

      {variant === "spinner" && (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <Spinner
            aria-hidden
            className={cn(
              pageLoaderSpinnerSizeVariants({ size }),
              pageLoaderSpinnerColorVariants({ color })
            )}
          />
          <p className={cn(pageLoaderMessageVariants({ size }))}>
            {message ?? t.loading}
          </p>
        </div>
      )}
    </div>
  )
}
