"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface FadeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fadeVariants> {}

// ── Variants ──

export const fadeVariants = cva("relative", {
  variants: {
    variant: {
      x: "[mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)]",
      y: "[mask-image:linear-gradient(to_top,transparent_0%,black_25%,black_75%,transparent_100%)]",
      top: "[mask-image:linear-gradient(to_bottom,transparent_0%,black_35%)]",
      bottom: "[mask-image:linear-gradient(to_top,transparent_0%,black_35%)]",
      left: "[mask-image:linear-gradient(to_right,transparent_0%,black_35%)]",
      right: "[mask-image:linear-gradient(to_left,transparent_0%,black_35%)]",
      "top-lg":
        "[mask-image:linear-gradient(to_bottom,transparent_15%,black_100%)]",
      "bottom-lg":
        "[mask-image:linear-gradient(to_top,transparent_15%,black_100%)]",
      "left-lg":
        "[mask-image:linear-gradient(to_right,transparent_15%,black_100%)]",
      "right-lg":
        "[mask-image:linear-gradient(to_left,transparent_15%,black_100%)]",
    },
  },
  defaultVariants: {
    variant: "x",
  },
})

// ── Component ──

export function Fade({ className, variant = "x", ...props }: FadeProps) {
  return (
    <div
      data-slot="fade"
      data-variant={variant}
      className={cn(fadeVariants({ variant }), className)}
      {...props}
    />
  )
}
