"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerCookieProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerCookieVariants> {
  title?: string
  description?: React.ReactNode
  learnMoreHref?: string
  onAcceptAll?: () => void
  onDecline?: () => void
  onManage?: () => void
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const bannerCookieVariants = cva(
  "flex w-full flex-col gap-4 border bg-card p-4 text-card-foreground shadow-lg sm:flex-row sm:items-center sm:justify-between",
  {
    variants: {
      position: {
        bottom:
          "fixed inset-x-0 bottom-0 z-40 rounded-none border-x-0 border-b-0",
        floating:
          "fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 rounded-2xl border",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-6 text-sm",
      },
    },
    defaultVariants: {
      position: "floating",
      size: "md",
    },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function BannerCookie({
  className,
  title,
  description,
  learnMoreHref,
  onAcceptAll,
  onDecline,
  onManage,
  locale = "en-US",
  position = "floating",
  size = "md",
  ...props
}: BannerCookieProps) {
  const [dismissed, setDismissed] = React.useState(false)

  const titleId = React.useId()
  const descId = React.useId()

  if (dismissed) return null

  const t = UI_I18N[locale].banner
  const resolvedTitle = title ?? t.cookieTitle
  const resolvedDesc = description ?? t.cookieDescription

  const handleAccept = () => {
    setDismissed(true)
    onAcceptAll?.()
  }
  const handleDecline = () => {
    setDismissed(true)
    onDecline?.()
  }

  return (
    <div
      data-slot="banner-cookie"
      role="region"
      aria-label={resolvedTitle}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={(e) => {
        if (e.key === "Escape") setDismissed(true)
      }}
      className={cn(bannerCookieVariants({ position, size }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span id={titleId} className="text-sm font-semibold text-foreground">
          {resolvedTitle}
        </span>
        <span id={descId} className="text-sm leading-relaxed text-muted-foreground">
          {resolvedDesc}{" "}
          {learnMoreHref && (
            <a
              href={learnMoreHref}
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {t.learnMore}
            </a>
          )}
        </span>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {onManage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onManage}
            className="rounded-full"
          >
            {t.managePreferences}
          </Button>
        )}
        {onDecline && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="rounded-full"
          >
            {t.decline}
          </Button>
        )}
        <Button size="sm" onClick={handleAccept} className="rounded-full">
          {t.acceptAll}
        </Button>
      </div>
    </div>
  )
}
