"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { type SocialLinkItem } from "./social-links"
import { HeaderTopbar } from "./header-topbar"
import { HeaderAnnouncement } from "./header-announcement"
import { HeaderSimple } from "./header-simple"
import { type HeaderBrandProps } from "./header-brand"
import { type HeaderNavItem } from "./header-nav"
import { type HeaderActionItem } from "./header-actions"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderWithTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: HeaderBrandProps
  navItems?: HeaderNavItem[]
  actions?: HeaderActionItem[]
  email?: string
  phone?: string
  socials?: SocialLinkItem[]
  localeSelector?: React.ReactNode
  topbarAnnouncement?: React.ReactNode
  announcement?: {
    children: React.ReactNode
    href?: string
    tag?: string
    dismissible?: boolean
    onDismiss?: () => void
    variant?: "default" | "outline" | "glow"
  }
  showSearch?: boolean
  onSearch?: (value: string) => void
  searchPlaceholder?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "blurred" | "transparent" | "solid"
  sticky?: boolean
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderWithTopbar({
  className,
  brand,
  navItems,
  actions,
  email,
  phone,
  socials,
  localeSelector,
  topbarAnnouncement,
  announcement,
  showSearch,
  onSearch,
  searchPlaceholder,
  size = "md",
  variant = "default",
  sticky = true,
  locale = "en-US",
  loading = false,
  ...props
}: HeaderWithTopbarProps) {
  return (
    <div
      data-slot="header-with-topbar"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {announcement && (
        <HeaderAnnouncement
          href={announcement.href}
          tag={announcement.tag}
          dismissible={announcement.dismissible}
          onDismiss={announcement.onDismiss}
          variant={announcement.variant}
          locale={locale}
        >
          {announcement.children}
        </HeaderAnnouncement>
      )}

      {(email ||
        phone ||
        socials?.length ||
        localeSelector ||
        topbarAnnouncement) && (
        <HeaderTopbar
          email={email}
          phone={phone}
          socials={socials}
          localeSelector={localeSelector}
          announcement={topbarAnnouncement}
        />
      )}

      <HeaderSimple
        brand={brand}
        navItems={navItems}
        actions={actions}
        showSearch={showSearch}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        size={size}
        variant={variant}
        sticky={sticky}
        locale={locale}
        loading={loading}
      />
    </div>
  )
}
