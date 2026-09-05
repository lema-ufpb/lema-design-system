"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CreditCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof creditCardVariants> {
  number?: string
  holder?: string
  expiry?: string
  cvc?: string
  brand?: "visa" | "mastercard" | "amex"
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const creditCardVariants = cva("relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 text-white shadow-lg", {
  variants: {
    variant: {
      default: "bg-gradient-to-br from-primary to-primary/70 border-primary/20",
      dark: "bg-gradient-to-br from-zinc-900 to-zinc-700 border-zinc-800",
      light: "bg-gradient-to-br from-zinc-100 to-white text-foreground border-border",
    },
    size: {
      sm: "h-40 w-64",
      md: "h-48 w-80",
      lg: "h-56 w-96",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function CreditCard({
  className,
  number = "4242 4242 4242 4242",
  holder = "Alex Silva",
  expiry = "12/28",
  cvc = "***",
  brand = "visa",
  variant = "default",
  size = "md",
  locale = "en-US",
  loading = false,
  ...props
}: CreditCardProps) {
  void cvc
  if (loading) {
    return <Skeleton className={cn(creditCardVariants({ variant, size }), className)} {...props} />
  }

  const t = UI_I18N[locale].creditCard

  return (
    <div data-slot="credit-card" className={cn(creditCardVariants({ variant, size }), className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest opacity-70">{brand}</span>
        <span className="size-6 rounded-full bg-white/20" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-lg tracking-widest tabular-nums" aria-label={t.cardNumber}>
          {number}
        </span>
        <div className="flex items-end justify-between gap-4">
          <span className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60">{t.cardHolder}</span>
            <span className="truncate text-xs font-medium">{holder}</span>
          </span>
          <span className="flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-widest opacity-60">{t.expiry}</span>
            <span className="text-xs font-medium tabular-nums">{expiry}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
