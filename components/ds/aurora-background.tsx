"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface AuroraBackgroundProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof auroraBackgroundVariants> {
  showRadial?: boolean
}

// ── Variants ──

export const auroraBackgroundVariants = cva(
  "relative flex w-full flex-col overflow-hidden bg-background",
  {
    variants: {
      variant: {
        default: "",
        muted: "bg-muted/30",
        dark: "bg-zinc-950 text-white [--aurora-1:theme(colors.violet.500)] [--aurora-2:theme(colors.sky.500)] [--aurora-3:theme(colors.emerald.500)]",
      },
      intensity: {
        subtle: "[--aurora-opacity:0.45]",
        medium: "[--aurora-opacity:0.65]",
        strong: "[--aurora-opacity:0.85]",
      },
    },
    defaultVariants: {
      variant: "default",
      intensity: "medium",
    },
  }
)

// ── Component ──

export function AuroraBackground({
  className,
  variant = "default",
  intensity = "medium",
  showRadial = true,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      data-slot="aurora-background"
      className={cn(
        auroraBackgroundVariants({ variant, intensity }),
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -inset-[10%] opacity-[var(--aurora-opacity)] blur-[28px]"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, hsl(var(--primary) / 0.22) 0%, transparent 60%), radial-gradient(55% 45% at 80% 30%, hsl(var(--chart-2) / 0.22) 0%, transparent 60%), radial-gradient(60% 60% at 50% 80%, hsl(var(--chart-3) / 0.18) 0%, transparent 65%)",
          }}
        />
        {/* animated aurora bands */}
        <div className="absolute inset-0 opacity-[var(--aurora-opacity)]">
          <div className="absolute h-[40%] w-[120%] -translate-x-10 -rotate-6 animate-[aurora_12s_ease-in-out_infinite_alternate] bg-gradient-to-r from-primary/15 via-chart-2/15 to-chart-3/15 blur-[18px]" />
          <div className="absolute top-1/3 h-[36%] w-[120%] translate-x-6 rotate-3 animate-[aurora_16s_ease-in-out_infinite_alternate-reverse] bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-500/10 blur-[20px]" />
        </div>
        {showRadial && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,hsl(var(--background))_100%)]" />
        )}
        {/* grid subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_80%)] bg-[size:24px_24px] opacity-30" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      <style>{`@keyframes aurora { 0% { transform: translateX(-10%) rotate(-6deg) } 100% { transform: translateX(6%) rotate(4deg) } } @media (prefers-reduced-motion: reduce) { [data-slot="aurora-background"] [class*="animate-"] { animation: none !important } }`}</style>
    </div>
  )
}
