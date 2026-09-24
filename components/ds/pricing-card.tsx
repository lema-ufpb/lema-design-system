"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface PricingFeature {
  label: string
  included: boolean
  tooltip?: string
}

export interface PricingCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingCardVariants> {
  name: string
  description?: string
  price: number
  originalPrice?: number
  period?: "month" | "year" | "lifetime"
  currency?: string
  badge?: string
  features?: PricingFeature[]
  action?: { label: string; href?: string; onClick?: () => void }
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const pricingCardVariants = cva(
  "flex flex-col gap-6 rounded-3xl border bg-card p-6 text-card-foreground transition-all",
  {
    variants: {
      featured: {
        true: "scale-[1.02] border-primary/20 bg-card shadow-xl",
        false: "border-border",
      },
      size: {
        sm: "gap-4 p-4",
        md: "gap-6 p-6",
      },
    },
    defaultVariants: { featured: false, size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function PricingCard({
  className,
  name,
  description,
  price,
  originalPrice,
  period = "month",
  currency = "$",
  badge,
  featured = false,
  features = [],
  action,
  locale: localeProp,
  size = "md",
  loading = false,
  ...props
}: PricingCardProps) {
  const locale = useUILocale(localeProp)
  if (loading) {
    return (
      <div
        data-slot="pricing-card-skeleton"
        className={cn(pricingCardVariants({ featured, size }), className)}
        {...props}
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-24" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency === "R$" ? "BRL" : "USD",
    maximumFractionDigits: 0,
  }).format(price)
  const formattedOriginal = originalPrice
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency === "R$" ? "BRL" : "USD",
        maximumFractionDigits: 0,
      }).format(originalPrice)
    : null
  const periodLabel =
    period === "month"
      ? UI_I18N[locale].pricing.perMonth
      : period === "year"
        ? UI_I18N[locale].pricing.perYear
        : ""

  return (
    <div
      data-slot="pricing-card"
      className={cn(pricingCardVariants({ featured, size }), className)}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-base font-semibold text-foreground">
            {name}
          </h3>
          {badge && (
            <Badge className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {badge}
            </Badge>
          )}
          {featured && !badge && (
            <Badge className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {UI_I18N[locale].pricing.mostPopular}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        {formattedOriginal && (
          <span className="text-sm text-muted-foreground tabular-nums line-through">
            {formattedOriginal}
          </span>
        )}
        <span
          className="text-3xl font-bold tracking-tight text-foreground tabular-nums"
          aria-label={`${formattedPrice} ${periodLabel}`}
        >
          {formattedPrice}
        </span>
        <span className="text-sm text-muted-foreground">{periodLabel}</span>
      </div>

      {features.length > 0 && (
        <ul className="flex flex-col gap-2">
          {features.map((f) => (
            <li key={f.label} className="flex items-center gap-2 text-sm">
              {f.included ? (
                <CheckIcon
                  className="size-4 shrink-0 text-success"
                  aria-hidden="true"
                />
              ) : (
                <XIcon
                  className="size-4 shrink-0 text-muted-foreground/40"
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  "truncate",
                  f.included ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {action &&
        (action.href ? (
          <Button
            asChild
            size="lg"
            variant={featured ? "default" : "outline"}
            className="mt-auto w-full rounded-full font-semibold"
          >
            <a href={action.href} onClick={action.onClick}>
              {action.label}
            </a>
          </Button>
        ) : (
          <Button
            size="lg"
            variant={featured ? "default" : "outline"}
            className="mt-auto w-full rounded-full font-semibold"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
    </div>
  )
}
