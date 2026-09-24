"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Stats, type StatsProps } from "./stats"

// ── Types ──────────────────────────────────────────────────────────────────

export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatsProps[]
  columns?: 2 | 3 | 4
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function StatsGrid({
  className,
  items,
  columns = 4,
  locale: localeProp,
  loading = false,
  ...props
}: StatsGridProps) {
  const locale = useUILocale(localeProp)
  return (
    <div
      data-slot="stats-grid"
      className={cn(
        "grid gap-4",
        columns === 2
          ? "md:grid-cols-2"
          : columns === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {loading
        ? Array.from({ length: columns }).map((_, i) => (
            <Stats key={i} label="loading" value="0" loading />
          ))
        : items.map((it) => <Stats key={it.label} {...it} locale={locale} />)}
    </div>
  )
}
