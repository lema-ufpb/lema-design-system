"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PricingCard, type PricingCardProps } from "./pricing-card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface PricingPlan extends Omit<
  PricingCardProps,
  "price" | "originalPrice"
> {
  monthlyPrice: number
  yearlyPrice?: number
  originalMonthlyPrice?: number
  originalYearlyPrice?: number
}

export interface PricingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  plans: PricingPlan[]
  billing?: "monthly" | "yearly"
  onBillingChange?: (billing: "monthly" | "yearly") => void
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function PricingGrid({
  className,
  title,
  description,
  plans,
  billing = "monthly",
  onBillingChange,
  locale: localeProp,
  loading = false,
  ...props
}: PricingGridProps) {
  const locale = useUILocale(localeProp)
  const [internalBilling, setInternalBilling] = React.useState(billing)
  const isControlled = onBillingChange !== undefined
  const resolvedBilling = isControlled ? billing : internalBilling

  const handleBilling = (v: string) => {
    if (!v) return
    const val = v as "monthly" | "yearly"
    if (!isControlled) setInternalBilling(val)
    onBillingChange?.(val)
  }

  const t = UI_I18N[locale].pricing

  return (
    <div
      data-slot="pricing-grid"
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground md:text-3xl">
          {title ?? t.title}
        </h2>
        {description && (
          <p className="max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
            {description ?? t.description}
          </p>
        )}
        <ToggleGroup
          type="single"
          value={resolvedBilling}
          onValueChange={handleBilling}
          variant="outline"
          size="sm"
          className="rounded-full border p-1"
        >
          <ToggleGroupItem
            value="monthly"
            className="rounded-full px-4 text-xs"
          >
            {t.monthly}
          </ToggleGroupItem>
          <ToggleGroupItem value="yearly" className="rounded-full px-4 text-xs">
            {t.yearly}{" "}
            <span className="ml-1 rounded-full bg-success px-1.5 py-0.5 text-xs text-success-foreground">
              {t.save} 20%
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const price =
              resolvedBilling === "yearly" && plan.yearlyPrice !== undefined
                ? plan.yearlyPrice
                : plan.monthlyPrice
            const originalPrice =
              resolvedBilling === "yearly" &&
              plan.originalYearlyPrice !== undefined
                ? plan.originalYearlyPrice
                : plan.originalMonthlyPrice
            return (
              <PricingCard
                key={plan.name}
                {...plan}
                price={price}
                originalPrice={originalPrice}
                period={resolvedBilling === "yearly" ? "year" : "month"}
                locale={locale}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
