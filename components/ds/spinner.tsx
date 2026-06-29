"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner as SpinnerRoot } from "@/components/ui/spinner"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Variants ──

export const spinnerVariants = cva("", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
      xl: "size-6",
      "2xl": "size-8",
      "3xl": "size-10",
      "4xl": "size-12",
      "5xl": "size-16",
      "6xl": "size-20",
      "7xl": "size-24",
    },
    tone: {
      current: "text-current",
      muted: "text-muted-foreground",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { size: "md", tone: "current" },
})

export const spinnerLabelVariants = cva("font-medium text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-base",
      "2xl": "text-lg",
      "3xl": "text-lg",
      "4xl": "text-xl",
      "5xl": "text-xl",
      "6xl": "text-2xl",
      "7xl": "text-2xl",
    },
  },
  defaultVariants: { size: "md" },
})

// Stroke thickness of the ring. lucide icons expose this via the SVG
// `strokeWidth` prop — Tailwind has no stroke-width utility, so this is a
// token map rather than a className variant.
export type SpinnerThickness = "thin" | "regular" | "bold" | "bolder"

export const SPINNER_THICKNESS: Record<SpinnerThickness, number> = {
  thin: 1.5,
  regular: 2,
  bold: 2.5,
  bolder: 3,
}

// ── Component ──

export interface SpinnerProps
  extends
    Omit<React.ComponentProps<typeof SpinnerRoot>, "size">,
    VariantProps<typeof spinnerVariants> {
  /** Localized fallback for the accessible name when no `label` is given. */
  locale?: UILocale
  /** Optional visible text rendered next to the spinner. */
  label?: string
  /** Stroke thickness of the spinner ring. */
  thickness?: SpinnerThickness
}

function Spinner({
  size = "md",
  tone = "current",
  thickness = "regular",
  label,
  locale = "en-US",
  "aria-label": ariaLabel,
  className,
  strokeWidth,
  ...props
}: SpinnerProps) {
  const iconClassName = cn(spinnerVariants({ size, tone }), className)
  const resolvedStroke = strokeWidth ?? SPINNER_THICKNESS[thickness]

  if (!label) {
    return (
      <SpinnerRoot
        data-slot="spinner"
        aria-label={ariaLabel ?? UI_I18N[locale].spinner.loading}
        strokeWidth={resolvedStroke}
        className={iconClassName}
        {...props}
      />
    )
  }

  // With a visible label the wrapper carries the status role and the icon
  // becomes decorative, so the label provides the accessible name.
  return (
    <span
      data-slot="spinner"
      role="status"
      className="inline-flex items-center gap-2"
    >
      <SpinnerRoot
        data-slot="spinner-icon"
        role="spinner"
        aria-label={ariaLabel}
        aria-hidden="true"
        strokeWidth={resolvedStroke}
        className={iconClassName}
        {...props}
      />
      <span
        data-slot="spinner-label"
        className={spinnerLabelVariants({ size })}
      >
        {label}
      </span>
    </span>
  )
}

export { Spinner }
