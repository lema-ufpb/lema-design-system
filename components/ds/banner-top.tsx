"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Banner, type BannerProps } from "./banner"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerTopProps extends Omit<
  BannerProps,
  "position" | "title" | "description"
> {
  badge?: string
  title?: string
  description?: React.ReactNode
  position?: "inline" | "top"
}

// ── Component ──────────────────────────────────────────────────────────────

export function BannerTop({
  className,
  badge,
  title,
  description,
  action,
  secondaryAction,
  intent = "default",
  variant = "default",
  size = "md",
  position = "top",
  dismissible = true,
  locale = "en-US",
  ...props
}: BannerTopProps) {
  return (
    <Banner
      intent={intent}
      variant={variant}
      size={size}
      position={position}
      dismissible={dismissible}
      locale={locale}
      title={
        badge ? (
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
              {badge}
            </span>
            {title && <span className="truncate">{title}</span>}
          </span>
        ) : (
          title
        )
      }
      description={description}
      action={action}
      secondaryAction={secondaryAction}
      className={cn(className)}
      {...props}
    />
  )
}
