"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { TestimonialCard, type TestimonialCardProps } from "./testimonial-card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TestimonialsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  items: TestimonialCardProps[]
  columns?: 2 | 3
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Testimonials({ className, title, description, items, columns = 3, locale = "en-US", loading = false, ...props }: TestimonialsProps) {
  const t = UI_I18N[locale].testimonials

  return (
    <div data-slot="testimonials" className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground md:text-3xl">{title ?? t.title}</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground text-pretty">{description ?? t.description}</p>
      </div>

      {loading ? (
        <div className={cn("grid gap-6", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
          {Array.from({ length: 3 }).map((_, i) => (
            <TestimonialCard key={i} quote="loading" author={{ name: "loading" }} loading />
          ))}
        </div>
      ) : (
        <div className={cn("grid gap-6", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
          {items.map((it) => (
            <TestimonialCard key={it.quote} {...it} />
          ))}
        </div>
      )}
    </div>
  )
}
