"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderAnnouncementProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerAnnouncementVariants> {
  href?: string
  tag?: string
  dismissible?: boolean
  onDismiss?: () => void
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerAnnouncementVariants = cva(
  "relative flex h-9 w-full items-center justify-center gap-2 border-b px-10 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border/60 bg-muted/60 text-muted-foreground",
        outline: "border-border bg-background text-foreground",
        glow: "border-primary/30 bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderAnnouncement({
  className,
  variant,
  href,
  tag,
  dismissible = true,
  onDismiss,
  locale = "en-US",
  children,
  ...props
}: HeaderAnnouncementProps) {
  const [dismissed, setDismissed] = React.useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (dismissed) return null

  const content = (
    <>
      {tag && (
        <span className="hidden rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground sm:inline-flex">
          {tag}
        </span>
      )}
      <span className="truncate">{children}</span>
      {href && (
        <ArrowRightIcon
          aria-hidden="true"
          className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  return (
    <div
      data-slot="header-announcement"
      role="region"
      aria-label={UI_I18N[locale].header.announcement}
      className={cn(
        headerAnnouncementVariants({ variant }),
        "group",
        className
      )}
      {...props}
    >
      {href ? (
        <a
          href={href}
          className="flex items-center gap-2 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {content}
        </a>
      ) : (
        <span className="flex items-center gap-2">{content}</span>
      )}
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          aria-label={UI_I18N[locale].header.dismissAnnouncement}
          onClick={handleDismiss}
          className="absolute right-1 size-7 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-3.5" />
        </Button>
      )}
    </div>
  )
}
