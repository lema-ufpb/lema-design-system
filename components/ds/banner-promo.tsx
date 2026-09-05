"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerPromoProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerPromoVariants> {
  title: string
  description?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  intent?: "default" | "promo" | "info" | "success" | "warning"
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  dismissible?: boolean
  onDismiss?: () => void
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const bannerPromoVariants = cva(
  "relative flex w-full overflow-hidden rounded-2xl border bg-card text-card-foreground",
  {
    variants: {
      intent: {
        default: "border-border bg-muted/40",
        promo:
          "border-primary/20 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent",
        info: "border-highlight-sky/20 bg-highlight-sky/10",
        success: "border-success/20 bg-success/10",
        warning: "border-warning/20 bg-warning/10",
      },
      size: {
        sm: "gap-3 p-4",
        md: "gap-4 p-6",
        lg: "gap-6 p-8",
      },
    },
    defaultVariants: {
      intent: "promo",
      size: "md",
    },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function BannerPromo({
  className,
  title,
  description,
  imageSrc,
  imageAlt,
  intent = "promo",
  size = "md",
  primaryAction,
  secondaryAction,
  dismissible,
  onDismiss,
  loading = false,
  ...props
}: BannerPromoProps) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  if (loading) {
    return (
      <div
        className={cn(
          bannerPromoVariants({ intent, size }),
          "flex-col",
          className
        )}
        {...props}
      >
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    )
  }

  const hasImage = !!imageSrc

  return (
    <div
      data-slot="banner-promo"
      className={cn(
        bannerPromoVariants({ intent, size }),
        hasImage
          ? "grid md:grid-cols-2"
          : "flex flex-col items-center text-center",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col gap-3",
          hasImage ? "text-left" : "items-center text-center"
        )}
      >
        <h3
          className={cn(
            "truncate font-semibold text-foreground",
            size === "sm" ? "text-base" : "text-lg"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {primaryAction &&
              (primaryAction.href ? (
                <Button
                  asChild
                  size={size === "sm" ? "sm" : "default"}
                  className="rounded-full"
                >
                  <a href={primaryAction.href} onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </a>
                </Button>
              ) : (
                <Button
                  size={size === "sm" ? "sm" : "default"}
                  className="rounded-full"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              ))}
            {secondaryAction &&
              (secondaryAction.href ? (
                <Button
                  asChild
                  variant="outline"
                  size={size === "sm" ? "sm" : "default"}
                  className="rounded-full"
                >
                  <a
                    href={secondaryAction.href}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size={size === "sm" ? "sm" : "default"}
                  className="rounded-full"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              ))}
          </div>
        )}
      </div>

      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          loading="lazy"
          decoding="async"
          className="hidden h-full w-full rounded-xl object-cover md:block"
        />
      )}

      {dismissible && (
        <button
          aria-label={UI_I18N["pt-BR"].banner.dismiss}
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
          className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className="sr-only">{UI_I18N["pt-BR"].banner.dismiss}</span>×
        </button>
      )}
    </div>
  )
}
