"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface GlassProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {}

// ── Variants ──

export const glassVariants = cva(
  "relative rounded-xl border backdrop-blur-md transition-colors",
  {
    variants: {
      variant: {
        "1": "border-border bg-gradient-to-b from-card/80 to-card/40 dark:border-border/10 dark:from-card/5 dark:to-card/0",
        "2": "border-border bg-gradient-to-b from-card to-card/80 dark:border-border/10 dark:from-card/10 dark:to-card/5",
        "3": "border-border border-t-border/20 bg-gradient-to-b from-card/30 to-card/20 dark:border-border/10 dark:border-t-border/20 dark:from-primary/5 dark:to-primary/[0.02]",
        "4": "border-border border-b-input/90 bg-gradient-to-b from-card/60 to-card/20 dark:border-border/10 dark:border-t-border/30 dark:from-primary/10 dark:to-primary/5",
        "5": "border-border border-b-input bg-gradient-to-b from-card to-card/20 dark:border-border/10 dark:border-t-border/30 dark:from-primary/15 dark:to-primary/5",
      },
    },
    defaultVariants: {
      variant: "1",
    },
  }
)

// ── Component ──

export function Glass({ className, variant = "1", ...props }: GlassProps) {
  return (
    <div
      data-slot="glass"
      data-variant={variant}
      className={cn(glassVariants({ variant }), className)}
      {...props}
    />
  )
}
