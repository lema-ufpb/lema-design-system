"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface IntegrationTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof integrationTileVariants> {
  name: string
  description?: string
  icon?: React.ReactNode
  iconSrc?: string
  iconAlt?: string
  status?: "connected" | "available" | "coming"
  href?: string
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const integrationTileVariants = cva(
  "group flex flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground transition-all hover:shadow-md",
  {
    variants: {
      size: {
        sm: "p-3 gap-2",
        md: "p-4 gap-3",
        lg: "p-5 gap-3",
      },
      status: {
        connected: "",
        available: "",
        coming: "opacity-60",
      },
    },
    defaultVariants: { size: "md", status: "available" },
  }
)

export const integrationTileIconVariants = cva(
  "flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-8 [&_svg]:size-4",
        md: "size-10 [&_svg]:size-5",
        lg: "size-12 [&_svg]:size-6",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function IntegrationTile({
  className,
  name,
  description,
  icon,
  iconSrc,
  iconAlt,
  status = "available",
  href,
  locale = "en-US",
  size = "md",
  loading = false,
  ...props
}: IntegrationTileProps) {
  if (loading) {
    return (
      <div data-slot="integration-tile-skeleton" className={cn(integrationTileVariants({ size, status }), className)} {...props}>
        <div className="flex items-center gap-3">
          <Skeleton className={cn("rounded-xl", size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-10")} />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    )
  }

  const statusLabel = status === "connected" ? UI_I18N[locale].integrations.connected : status === "coming" ? "Soon" : UI_I18N[locale].integrations.available

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className={cn(integrationTileIconVariants({ size }))} aria-hidden="true">
          {icon ? (
            icon
          ) : iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={iconSrc} alt={iconAlt ?? name} loading="lazy" decoding="async" className="size-full object-cover" />
          ) : (
            <span className="text-xs font-semibold">{name.slice(0, 2).toUpperCase()}</span>
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium text-foreground">{name}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className={cn("size-1.5 rounded-full", status === "connected" ? "bg-success" : status === "coming" ? "bg-warning" : "bg-muted-foreground/30")}
              aria-hidden="true"
            />
            <span className="truncate">{statusLabel}</span>
          </span>
        </span>
      </div>
      {description && <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{description}</p>}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={name}
        data-slot="integration-tile"
        className={cn(integrationTileVariants({ size, status }), "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <div data-slot="integration-tile" className={cn(integrationTileVariants({ size, status }), className)} {...props}>
      {content}
    </div>
  )
}
