import * as React from "react"

import { BarChart, type BarChartKey } from "./bar-chart"
import { BentoGrid, BentoGridItem, type BentoGridItemSpan } from "./bento-grid"
import { CardStat } from "./card-stat"

// ── Types ──

export interface BentoMetricsStat {
  label: string
  value: string | number
  colSpan?: BentoGridItemSpan
}

export interface BentoMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: BentoMetricsStat[]
  chartTitle?: string
  chartData: Record<string, string | number>[]
  chartDataKeys: BarChartKey[] | string[]
  chartCategoryKey: string
}

// ── Component ──

/**
 * A bento grid pairing a bar chart tile with a strip of stat tiles —
 * composed from `BentoGrid`, `BarChart` and `CardStat`.
 */
export function BentoMetrics({
  stats,
  chartTitle,
  chartData,
  chartDataKeys,
  chartCategoryKey,
  className,
  ...props
}: BentoMetricsProps) {
  return (
    <BentoGrid className={className} data-slot="bento-metrics" {...props}>
      <BentoGridItem
        colSpan={2}
        rowSpan={2}
        className="items-stretch justify-start"
      >
        <BarChart
          title={chartTitle}
          data={chartData}
          dataKeys={chartDataKeys}
          categoryKey={chartCategoryKey}
          className="w-full"
        />
      </BentoGridItem>

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
