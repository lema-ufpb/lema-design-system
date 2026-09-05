"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export interface PricingComparisonPlan {
  name: string
  price?: string
  featured?: boolean
}

export interface PricingComparisonFeature {
  category: string
  items: { label: string; values: (boolean | string)[] }[]
}

export interface PricingComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingComparisonPlan[]
  features: PricingComparisonFeature[]
}

// ── Component ──────────────────────────────────────────────────────────────

export function PricingComparison({ className, plans, features, ...props }: PricingComparisonProps) {
  return (
    <div data-slot="pricing-comparison" className={cn("w-full overflow-x-auto", className)} {...props}>
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b">
            <th className="h-10 px-3 text-left text-xs font-medium text-muted-foreground">Feature</th>
            {plans.map((plan) => (
              <th key={plan.name} className={cn("h-10 px-3 text-center text-sm font-semibold", plan.featured && "text-primary")}>
                {plan.name}
                {plan.price && <span className="ml-1 text-xs font-normal text-muted-foreground tabular-nums">{plan.price}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((group) => (
            <React.Fragment key={group.category}>
              <tr className="bg-muted/30">
                <td colSpan={plans.length + 1} className="h-8 px-3 text-xs font-semibold text-foreground">
                  {group.category}
                </td>
              </tr>
              {group.items.map((item) => (
                <tr key={item.label} className="border-b last:border-0">
                  <td className="h-10 px-3 text-xs text-muted-foreground">{item.label}</td>
                  {item.values.map((val, idx) => (
                    <td key={idx} className="h-10 px-3 text-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <CheckIcon className="mx-auto size-4 text-success" aria-label="Included" />
                        ) : (
                          <MinusIcon className="mx-auto size-4 text-muted-foreground/30" aria-label="Not included" />
                        )
                      ) : (
                        <span className="text-xs tabular-nums">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
