"use client"

import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CheckoutItem {
  name: string
  price: string
  quantity: number
}

export interface CheckoutProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof checkoutVariants> {
  items: CheckoutItem[]
  total: string
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const checkoutVariants = cva("p-6", {
  variants: {
    size: {
      sm: "p-4 text-xs",
      md: "p-6 text-sm",
      lg: "p-8 text-base",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Checkout({
  className,
  items,
  total,
  loading = false,
  locale = "en-US",
  size = "md",
  ...props
}: CheckoutProps) {
  if (loading) {
    return (
      <Card
        data-slot="checkout-skeleton"
        className={cn("p-6", className)}
        {...props}
      >
        <Skeleton className="h-32 w-full" />
      </Card>
    )
  }

  const t = UI_I18N[locale].auth

  return (
    <Card
      data-slot="checkout"
      className={cn(checkoutVariants({ size }), className)}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Order summary</h3>
        {items.map((it, idx) => (
          <div
            key={`${it.name}-${idx}`}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span className="truncate text-muted-foreground">
              {it.name} ×{it.quantity}
            </span>
            <span className="text-foreground tabular-nums">{it.price}</span>
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="text-sm font-bold text-foreground tabular-nums">
            {total}
          </span>
        </div>
        <Button className="w-full rounded-full">{t.login}</Button>
      </div>
    </Card>
  )
}
