import * as React from "react"

import { cn } from "@/lib/utils"
import { PullQuote } from "./pull-quote"

// ── Types ──

export interface LogoCloudQuoteItem {
  logo: React.ReactNode
  quote: string
  name: string
  role?: string
  avatarFallback?: string
}

export interface LogoCloudQuotesProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LogoCloudQuoteItem[]
}

// ── Component ──

/**
 * Customer logo paired with a short testimonial, in a card grid — composed
 * from `PullQuote`.
 */
export function LogoCloudQuotes({
  items,
  className,
  ...props
}: LogoCloudQuotesProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}
      data-slot="logo-cloud-quotes"
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="h-6 w-auto [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto">
            {item.logo}
          </div>
          <PullQuote
            size="sm"
            quote={item.quote}
            name={item.name}
            role={item.role}
            avatarFallback={item.avatarFallback}
          />
        </div>
      ))}
    </div>
  )
}
