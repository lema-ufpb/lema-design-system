"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SocialLinks, type SocialLinkItem } from "./social-links"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  email?: string
  phone?: string
  announcement?: React.ReactNode
  socials?: SocialLinkItem[]
  localeSelector?: React.ReactNode
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderTopbar({
  className,
  email,
  phone,
  announcement,
  socials,
  localeSelector,
  ...props
}: HeaderTopbarProps) {
  if (
    !email &&
    !phone &&
    !announcement &&
    !socials?.length &&
    !localeSelector
  ) {
    return null
  }

  return (
    <div
      data-slot="header-topbar"
      className={cn(
        "hidden h-8 w-full items-center justify-between gap-4 border-b border-border bg-muted/30 px-4 text-xs sm:px-6 md:flex",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {email && (
          <a
            href={`mailto:${email}`}
            className="truncate font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {email}
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="truncate font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {phone}
          </a>
        )}
      </div>

      {announcement && (
        <div className="hidden max-w-md truncate text-center font-medium text-muted-foreground lg:block">
          {announcement}
        </div>
      )}

      <div className="flex items-center gap-3">
        {socials && socials.length > 0 && (
          <SocialLinks links={socials} variant="ghost" size="sm" gap="sm" />
        )}
        {localeSelector && (
          <span className="flex items-center gap-1 text-muted-foreground">
            {localeSelector}
          </span>
        )}
      </div>
    </div>
  )
}
