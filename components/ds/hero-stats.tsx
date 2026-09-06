import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CardStat } from "./card-stat"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"

// ── Types ──

export interface HeroStatsItem {
  label: string
  value: string | number
}

export interface HeroStatsProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  stats: HeroStatsItem[]
}

// ── Component ──

/**
 * Centered hero followed by a stats strip — composed from `HeroSection` and
 * `CardStat`.
 */
export function HeroStats({
  kicker,
  title,
  description,
  actions,
  stats,
  className,
  ...props
}: HeroStatsProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="hero-stats"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>
      {description && <HeroDescription>{description}</HeroDescription>}
      {actions && <HeroActions>{actions}</HeroActions>}

      {stats.length > 0 && (
        <div
          className={cn(
            "mt-8 grid w-full grid-cols-2 gap-4",
            stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
          )}
        >
          {stats.map((stat) => (
            <CardStat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              variant="flat"
            />
          ))}
        </div>
      )}
    </HeroSection>
  )
}
