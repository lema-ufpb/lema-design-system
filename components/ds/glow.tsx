"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface GlowProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glowVariants> {
  color?: string
  size?: number
}

// ── Variants ──

export const glowVariants = cva(
  "pointer-events-none absolute rounded-full blur-[48px]",
  {
    variants: {
      position: {
        top: "-top-48 left-1/2 -translate-x-1/2",
        above: "-top-24 left-1/2 -translate-x-1/2",
        "above-inner": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "bottom-inner": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
        below: "-bottom-24 left-1/2 -translate-x-1/2",
        "below-inner": "bottom-0 left-1/2 -translate-x-1/2",
      },
      intensity: {
        subtle: "opacity-40",
        medium: "opacity-60",
        strong: "opacity-80",
      },
    },
    defaultVariants: {
      position: "top",
      intensity: "medium",
    },
  }
)

// ── Component ──

export function Glow({
  className,
  position = "top",
  intensity = "medium",
  color = "hsl(var(--primary) / 0.22)",
  size = 560,
  style,
  ...props
}: GlowProps) {
  return (
    <div
      data-slot="glow"
      aria-hidden="true"
      className={cn(glowVariants({ position, intensity }), className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(60% 60% at 50% 50%, ${color} 0%, transparent 70%)`,
        ...style,
      }}
      {...props}
    />
  )
}
