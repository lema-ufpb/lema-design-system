"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ContributionGraphProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contributionGraphVariants> {
  data?: number[][] // 7 x weeks
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const contributionGraphVariants = cva(
  "flex flex-col gap-2 rounded-2xl border bg-card p-4",
  {
    variants: {
      size: {
        sm: "[&>div>div]:size-2.5",
        md: "[&>div>div]:size-3",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const levelClasses = [
  "bg-muted",
  "bg-success/20",
  "bg-success/40",
  "bg-success/70",
  "bg-success",
]

// ── Component ──────────────────────────────────────────────────────────────

export function ContributionGraph({
  className,
  data,
  locale: localeProp,
  size = "md",
  loading = false,
  ...props
}: ContributionGraphProps) {
  const locale = useUILocale(localeProp)
  const weeks = React.useMemo(
    () =>
      data ??
      Array.from({ length: 20 }).map(() =>
        Array.from({ length: 7 }).map(() => Math.floor(Math.random() * 5))
      ),
    [data]
  )
  const t = UI_I18N[locale].contributionGraph

  if (loading) {
    return (
      <div
        data-slot="contribution-graph-skeleton"
        className={cn(contributionGraphVariants({ size }), className)}
        {...props}
      >
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <div
      data-slot="contribution-graph"
      role="img"
      aria-label={`Contribution graph: ${t.less} to ${t.more}`}
      className={cn(contributionGraphVariants({ size }), className)}
      {...props}
    >
      <div className="flex gap-1 overflow-x-auto" aria-hidden="true">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <div
                key={di}
                aria-hidden="true"
                title={
                  level === 0 ? t.noContributions : `${level} contributions`
                }
                className={cn(
                  "size-3 rounded-sm",
                  levelClasses[Math.min(level, 4)]
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t.less}</span>
        <div className="flex gap-1">
          {levelClasses.map((c, i) => (
            <span key={i} className={cn("size-3 rounded-sm", c)} />
          ))}
        </div>
        <span>{t.more}</span>
      </div>
    </div>
  )
}
