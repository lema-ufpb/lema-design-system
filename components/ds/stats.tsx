"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

// ── Types ──────────────────────────────────────────────────────────────────

export interface StatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {
  label: string
  value: string | number
  trend?: { value: string; direction: "up" | "down" }
  period?: string
  icon?: React.ReactNode
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const statsVariants = cva("flex flex-col gap-2 rounded-2xl border bg-card p-6 text-card-foreground", {
  variants: {
    size: {
      sm: "p-4",
      md: "p-6",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Stats({ className, label, value, trend, period, icon, size = "md", loading = false, ...props }: StatsProps) {
  if (loading) {
    return (
      <div data-slot="stats-skeleton" className={cn(statsVariants({ size }), className)} {...props}>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  return (
    <div data-slot="stats" className={cn(statsVariants({ size }), className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-muted-foreground">{label}</span>
        {icon && <span className="shrink-0 text-muted-foreground [&_svg]:size-4">{icon}</span>}
      </div>
      <span className="text-2xl font-bold tabular-nums text-foreground">{value}</span>
      {(trend || period) && (
        <span className="flex items-center gap-1.5 text-xs">
          {trend && (
            <Badge variant="secondary" className={cn("h-5 gap-1 rounded-full px-2 text-xs font-medium", trend.direction === "up" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
              {trend.direction === "up" ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
              <span className="tabular-nums">{trend.value}</span>
            </Badge>
          )}
          {period && <span className="truncate text-muted-foreground">{period}</span>}
        </span>
      )}
    </div>
  )
}
