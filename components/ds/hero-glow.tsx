"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface HeroGlowProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroGlowVariants> {
  badge?: string
  title?: string
  description?: string
  actions?: React.ReactNode
  glowColor?: string
  loading?: boolean
}

// ── Variants ──

export const heroGlowVariants = cva(
  "relative flex w-full flex-col items-center overflow-hidden bg-background px-4 py-16 text-center sm:px-6 sm:py-20",
  {
    variants: {
      glow: {
        top: "",
        center: "",
        none: "",
      },
    },
    defaultVariants: {
      glow: "top",
    },
  }
)

// ── Component ──

export function HeroGlow({
  className,
  glow = "top",
  badge = "New version of Launch UI is out!",
  title = "Give your big idea the design it deserves",
  description = "Professionally designed blocks and templates built with React, shadcn/ui and Tailwind that will help your product stand out.",
  actions,
  glowColor = "hsl(var(--primary) / 0.18)",
  loading = false,
  ...props
}: HeroGlowProps) {
  if (loading) {
    return (
      <section
        data-slot="hero-glow-skeleton"
        className={cn(heroGlowVariants({ glow }), className)}
        {...props}
      >
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="mt-4 h-10 w-[520px] max-w-full" />
        <Skeleton className="mt-3 h-4 w-[640px] max-w-full" />
        <Skeleton className="mt-6 h-10 w-36 rounded-full" />
      </section>
    )
  }

  return (
    <section
      data-slot="hero-glow"
      className={cn(heroGlowVariants({ glow }), className)}
      {...props}
    >
      {glow !== "none" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-1/2 h-[420px] w-[880px] -translate-x-1/2 rounded-full blur-[48px]",
            glow === "top" ? "-top-48" : "top-1/2 -translate-y-1/2"
          )}
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
      {badge && (
        <Badge
          variant="outline"
          className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs"
        >
          {badge}
        </Badge>
      )}
      <h1 className="relative z-10 mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="relative z-10 mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
      {actions && (
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)] bg-[size:28px_28px] opacity-30" />
    </section>
  )
}
