import * as React from "react"

import { BentoGrid, BentoGridItem, type BentoGridItemSpan } from "./bento-grid"
import { CardStat } from "./card-stat"

// ── Types ──

export interface BentoFeaturesItem {
  icon: React.ElementType
  title: string
  description?: string
  colSpan?: BentoGridItemSpan
  rowSpan?: BentoGridItemSpan
}

export interface BentoFeaturesStat {
  label: string
  value: string | number
  colSpan?: BentoGridItemSpan
}

export interface BentoFeaturesProps extends React.HTMLAttributes<HTMLDivElement> {
  features: BentoFeaturesItem[]
  stats?: BentoFeaturesStat[]
}

// ── Component ──

/**
 * A bento grid mixing icon-led feature tiles with stat tiles — composed
 * from `BentoGrid`, `BentoGridItem` and `CardStat`.
 */
export function BentoFeatures({
  features,
  stats = [],
  className,
  ...props
}: BentoFeaturesProps) {
  return (
    <BentoGrid className={className} data-slot="bento-features" {...props}>
      {features.map((feature) => (
        <BentoGridItem
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          colSpan={feature.colSpan}
          rowSpan={feature.rowSpan}
        />
      ))}
      {stats.map((stat) => (
        <BentoGridItem
          key={stat.label}
          colSpan={stat.colSpan ?? 1}
          className="border-0 bg-transparent p-0 hover:translate-y-0 hover:shadow-none"
        >
          <CardStat
            label={stat.label}
            value={stat.value}
            variant="flat"
            className="h-full w-full"
          />
        </BentoGridItem>
      ))}
    </BentoGrid>
  )
}
