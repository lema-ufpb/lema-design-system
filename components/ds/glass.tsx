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
        "1": "border-border bg-gradient-to-b from-card/80 to-card/40",
        "2": "border-border bg-gradient-to-b from-card to-card/80",
        "3": "border-border border-t-border/20 bg-gradient-to-b from-card/30 to-card/20",
        "4": "border-border border-b-input/90 bg-gradient-to-b from-card/60 to-card/20",
        "5": "border-border border-b-input bg-gradient-to-b from-card to-card/20",
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
