"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { StarIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerAppProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerAppVariants> {
  appName: string
  description?: React.ReactNode
  iconSrc?: string
  iconAlt?: string
  rating?: number
  ratingCount?: string
  appStoreUrl?: string
  googlePlayUrl?: string
  onDismiss?: () => void
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const bannerAppVariants = cva(
  "relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border bg-card p-4 text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "gap-3 p-3",
        md: "gap-4 p-4",
        lg: "gap-4 p-6",
      },
      position: {
        inline: "relative",
        floating:
          "fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 shadow-lg",
      },
    },
    defaultVariants: {
      size: "md",
      position: "inline",
    },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function BannerApp({
  className,
  appName,
  description,
  iconSrc,
  iconAlt,
  rating,
  ratingCount,
  appStoreUrl,
  googlePlayUrl,
  onDismiss,
  locale = "en-US",
  loading = false,
  size = "md",
  position = "inline",
  ...props
}: BannerAppProps) {
  const [dismissed, setDismissed] = React.useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (dismissed) return null

  if (loading) {
    return (
      <div
        className={cn(bannerAppVariants({ size, position }), className)}
        {...props}
      >
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    )
  }

  return (
    <div
      data-slot="banner-app"
      role="region"
      aria-label={UI_I18N[locale].banner.appDownload}
      className={cn(bannerAppVariants({ size, position }), className)}
      {...props}
    >
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconSrc}
          alt={iconAlt ?? appName}
          loading="lazy"
          decoding="async"
          className={cn(
            "shrink-0 rounded-xl object-cover",
            size === "sm" ? "size-10" : "size-12"
          )}
        />
      ) : (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground",
            size === "sm" ? "size-10 text-sm" : "size-12 text-base"
          )}
        >
          {appName.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-foreground">
          {appName}
        </span>
        {description && (
          <span className="truncate text-xs text-muted-foreground">
            {description}
          </span>
        )}
        {typeof rating === "number" && (
          <span className="flex items-center gap-1 text-xs font-medium text-foreground">
            <StarIcon className="size-3.5 fill-warning text-warning" />
            <span className="tabular-nums">{rating.toFixed(1)}</span>
            {ratingCount && (
              <span className="font-normal text-muted-foreground">
                ({ratingCount})
              </span>
            )}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {appStoreUrl && (
          <Button
            asChild
            size="sm"
            className="hidden rounded-full sm:inline-flex"
          >
            <a href={appStoreUrl}>App Store</a>
          </Button>
        )}
        {googlePlayUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden rounded-full sm:inline-flex"
          >
            <a href={googlePlayUrl}>Google Play</a>
          </Button>
        )}
        {!appStoreUrl && !googlePlayUrl && (
          <Button size="sm" className="hidden rounded-full sm:inline-flex">
            {UI_I18N[locale].banner.appDownload}
          </Button>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label={UI_I18N[locale].banner.dismiss}
        onClick={handleDismiss}
        className="size-7 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
      >
        <XIcon className="size-3.5" />
      </Button>
    </div>
  )
}
