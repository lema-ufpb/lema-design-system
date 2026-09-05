"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogMetaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blogMetaVariants> {
  publishedAt?: string | Date
  readingTime?: number
  category?: string
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const blogMetaVariants = cva("flex flex-wrap items-center gap-2 text-xs text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function BlogMeta({
  className,
  publishedAt,
  readingTime,
  category,
  locale = "en-US",
  size = "md",
  loading = false,
  ...props
}: BlogMetaProps) {
  if (loading) {
    return (
      <div data-slot="blog-meta-skeleton" className={cn(blogMetaVariants({ size }), className)} {...props}>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    )
  }

  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(
        typeof publishedAt === "string" ? new Date(publishedAt) : publishedAt
      )
    : null

  return (
    <div data-slot="blog-meta" className={cn(blogMetaVariants({ size }), className)} {...props}>
      {category && (
        <Badge variant="outline" className="h-5 rounded-full px-2 text-[10px] font-medium">
          {category}
        </Badge>
      )}
      {formattedDate && <span className="truncate">{formattedDate}</span>}
      {formattedDate && readingTime && <span aria-hidden="true">·</span>}
      {typeof readingTime === "number" && (
        <span className="tabular-nums">
          {readingTime} {UI_I18N[locale].blog.minRead}
        </span>
      )}
    </div>
  )
}
