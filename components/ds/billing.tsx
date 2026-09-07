"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BillingProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: string
  price: string
  nextBilling?: string
  status?: "active" | "past_due" | "canceled"
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const billingVariants = cva("w-full rounded-2xl border bg-card p-6", {
  variants: {},
  defaultVariants: {},
})

// ── Component ──────────────────────────────────────────────────────────────

export function Billing({
  className,
  plan,
  price,
  nextBilling,
  status = "active",
  loading = false,
  locale = "en-US",
  ...props
}: BillingProps) {
  const t = UI_I18N[locale].billing ?? UI_I18N["en-US"].billing
  if (loading) {
    return (
      <div
        data-slot="billing-skeleton"
        className={cn(billingVariants(), className)}
        {...props}
      >
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <Card
      data-slot="billing"
      className={cn(billingVariants(), className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">{plan}</span>
          <span className="text-2xl font-bold text-foreground tabular-nums">
            {price}
          </span>
          {nextBilling && (
            <span className="text-xs text-muted-foreground">
              {t.nextBilling} {nextBilling}
            </span>
          )}
        </div>
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "past_due"
                ? "destructive"
                : "secondary"
          }
          className="rounded-full capitalize"
        >
          {status}
        </Badge>
      </div>
      <div className="mt-4 flex gap-2">
        <Button size="sm" type="button" className="rounded-full">
          {t.manage}
        </Button>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="rounded-full"
        >
          {t.invoices}
        </Button>
      </div>
    </Card>
  )
}
