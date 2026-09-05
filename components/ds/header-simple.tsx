"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { Header, HeaderContainer } from "./header"
import { HeaderBrand, type HeaderBrandProps } from "./header-brand"
import { HeaderNav, type HeaderNavItem } from "./header-nav"
import { HeaderActions, type HeaderActionItem } from "./header-actions"
import { HeaderMobileDrawer } from "./header-mobile-drawer"
import { HeaderSearch } from "./header-search"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderSimpleProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerSimpleVariants> {
  brand: HeaderBrandProps
  navItems?: HeaderNavItem[]
  actions?: HeaderActionItem[]
  showSearch?: boolean
  onSearch?: (value: string) => void
  searchPlaceholder?: string
  locale?: UILocale
  loading?: boolean
  sticky?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerSimpleVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderSimple({
  className,
  brand,
  navItems = [],
  actions = [],
  showSearch = false,
  onSearch,
  searchPlaceholder,
  locale = "en-US",
  loading = false,
  size = "md",
  variant = "default",
  sticky = true,
  ...props
}: HeaderSimpleProps & {
  variant?: "default" | "blurred" | "transparent" | "solid"
}) {
  return (
    <Header
      variant={variant}
      size={size}
      sticky={sticky}
      locale={locale}
      className={cn(headerSimpleVariants({ size }), className)}
      {...props}
    >
      <HeaderContainer size={size}>
        <HeaderBrand {...brand} size={size} loading={loading} />

        {navItems.length > 0 && (
          <HeaderNav
            items={navItems}
            size={size}
            loading={loading}
            className="hidden lg:flex"
          />
        )}

        <div className="flex items-center gap-2">
          {showSearch && (
            <HeaderSearch
              onSearch={onSearch}
              placeholder={searchPlaceholder}
              locale={locale}
              className="hidden sm:flex"
            />
          )}

          {actions.length > 0 && (
            <HeaderActions
              actions={actions}
              loading={loading}
              className="hidden sm:flex"
            />
          )}

          <HeaderMobileDrawer
            items={navItems}
            actions={actions}
            brand={<HeaderBrand {...brand} size="md" />}
            locale={locale}
            className="lg:hidden"
          />
        </div>
      </HeaderContainer>
    </Header>
  )
}
