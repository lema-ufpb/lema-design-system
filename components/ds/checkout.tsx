"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
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

export interface CheckoutProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CheckoutItem[]
  total: string
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Checkout({ className, items, total, loading = false, ...props }: CheckoutProps) {
  if (loading) {
    return (
      <Card data-slot="checkout-skeleton" className={cn("p-6", className)} {...props}>
        <Skeleton className="h-32 w-full" />
      </Card>
    )
  }

  return (
    <Card data-slot="checkout" className={cn("p-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Order summary</h3>
        {items.map((it) => (
          <div key={it.name} className="flex items-center justify-between gap-2 text-sm">
            <span className="truncate text-muted-foreground">
              {it.name} ×{it.quantity}
            </span>
            <span className="tabular-nums text-foreground">{it.price}</span>
          </div>
        ))}
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="text-sm font-bold tabular-nums text-foreground">{total}</span>
        </div>
        <Button className="w-full rounded-full">Checkout</Button>
      </div>
    </Card>
  )
}
