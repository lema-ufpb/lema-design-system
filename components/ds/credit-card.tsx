"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CreditCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
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

export const creditCardVariants = cva(
  "relative flex max-w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-lg",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground",
        dark: "border-border bg-gradient-to-br from-card to-muted text-card-foreground",
        light:
          "border-border bg-gradient-to-br from-card to-background text-foreground",
      },
      size: {
        sm: "aspect-[1.6] h-40 h-auto w-64 w-full max-w-full sm:w-64",
        md: "aspect-[1.6] h-48 h-auto w-80 w-full max-w-full sm:w-80",
        lg: "aspect-[1.6] h-56 h-auto w-96 w-full max-w-full sm:w-96",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

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
  locale: localeProp,
  loading = false,
  ...props
}: CreditCardProps) {
  const locale = useUILocale(localeProp)
  void cvc
  if (loading) {
    return (
      <Skeleton
        className={cn(creditCardVariants({ variant, size }), className)}
        {...props}
      />
    )
  }

  const t = UI_I18N[locale].creditCard

  return (
    <div
      data-slot="credit-card"
      className={cn(creditCardVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest uppercase opacity-70">
          {brand}
        </span>
        <span
          // decorative — semantic token approximating white translucent on primary
          className="size-6 rounded-full bg-primary-foreground/20"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-3">
        <span
          className="text-lg tracking-widest tabular-nums"
          aria-label={t.cardNumber}
        >
          {number}
        </span>
        <div className="flex items-end justify-between gap-4">
          <span className="flex flex-col">
            <span className="text-xs tracking-widest uppercase opacity-60">
              {t.cardHolder}
            </span>
            <span className="truncate text-xs font-medium">{holder}</span>
          </span>
          <span className="flex flex-col text-right">
            <span className="text-xs tracking-widest uppercase opacity-60">
              {t.expiry}
            </span>
            <span className="text-xs font-medium tabular-nums">{expiry}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
