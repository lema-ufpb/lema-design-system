"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HowItWorksStep {
  title: string
  description?: string
  icon?: React.ReactNode
}

export interface HowItWorksProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof howItWorksVariants> {
  title?: string
  description?: string
  steps: HowItWorksStep[]
  variant?: "number" | "icon" | "card"
  orientation?: "horizontal" | "vertical"
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const howItWorksVariants = cva("flex flex-col gap-8", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: { size: "md" },
})

export const howItWorksStepNumberVariants = cva("font-bold tabular-nums text-muted-foreground/20", {
  variants: {
    size: {
      sm: "text-2xl",
      md: "text-4xl",
      lg: "text-5xl",
    },
  },
  defaultVariants: { size: "md" },
})

export const howItWorksStepIconVariants = cva("flex shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground", {
  variants: {
    size: {
      sm: "size-8 [&_svg]:size-4",
      md: "size-10 [&_svg]:size-5",
      lg: "size-12 [&_svg]:size-6",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function HowItWorks({
  className,
  title,
  description,
  steps,
  variant = "number",
  orientation = "horizontal",
  size = "md",
  locale = "en-US",
  loading = false,
  ...props
}: HowItWorksProps) {
  const t = UI_I18N[locale].howItWorks

  if (loading) {
    return (
      <div data-slot="how-it-works-skeleton" className={cn(howItWorksVariants({ size }), className)} {...props}>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className={cn("grid gap-6", orientation === "horizontal" ? "md:grid-cols-3" : "grid-cols-1")}>
          {steps.slice(0, 3).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div data-slot="how-it-works" className={cn(howItWorksVariants({ size }), className)} {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground md:text-3xl">{title ?? t.title}</h2>
        {(description ?? t.description) && <p className="max-w-prose text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">{description ?? t.description}</p>}
      </div>

      <ol className={cn("grid gap-6", orientation === "horizontal" ? "md:grid-cols-3" : "grid-cols-1", variant === "card" && "gap-4")}>
        {steps.map((step, idx) => (
          <li
            key={step.title}
            className={cn(
              "relative flex flex-col gap-3",
              variant === "card" && "rounded-2xl border bg-card p-6",
              orientation === "vertical" && variant !== "card" && "flex-row gap-4"
            )}
          >
            {variant === "number" ? (
              <span className={cn(howItWorksStepNumberVariants({ size }), "leading-none")} aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
            ) : variant === "icon" ? (
              <span className={cn(howItWorksStepIconVariants({ size }))} aria-hidden="true">
                {step.icon ?? <span className="text-sm font-semibold tabular-nums">{idx + 1}</span>}
              </span>
            ) : (
              <span className={cn(howItWorksStepNumberVariants({ size }), "text-primary/20")} aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
            )}

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground md:text-base">{step.title}</h3>
              {step.description && <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>}
            </div>

            {orientation === "horizontal" && variant !== "card" && idx < steps.length - 1 && (
              <ArrowRightIcon className="absolute -right-3 top-6 hidden size-4 text-muted-foreground/30 md:block" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
