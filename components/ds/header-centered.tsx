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

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderCenteredProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerCenteredVariants> {
  brand: HeaderBrandProps
  navItems?: HeaderNavItem[]
  leftActions?: HeaderActionItem[]
  rightActions?: HeaderActionItem[]
  locale?: UILocale
  loading?: boolean
  sticky?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerCenteredVariants = cva("", {
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

export function HeaderCentered({
  className,
  brand,
  navItems = [],
  leftActions = [],
  rightActions = [],
  locale = "en-US",
  loading = false,
  size = "md",
  variant = "default",
  sticky = true,
  ...props
}: HeaderCenteredProps & {
  variant?: "default" | "blurred" | "transparent" | "solid"
}) {
  return (
    <Header
      variant={variant}
      size={size}
      sticky={sticky}
      locale={locale}
      className={cn(headerCenteredVariants({ size }), className)}
      {...props}
    >
      {/* Top row: actions — brand centered — actions */}
      <HeaderContainer size={size}>
        <div className="hidden flex-1 items-center justify-start gap-2 lg:flex">
          {leftActions.length > 0 && (
            <HeaderActions actions={leftActions} loading={loading} />
          )}
        </div>

        <div className="flex flex-1 items-center justify-start lg:justify-center">
          <HeaderBrand {...brand} size={size} loading={loading} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {rightActions.length > 0 && (
            <HeaderActions
              actions={rightActions}
              loading={loading}
              className="hidden sm:flex"
            />
          )}
          <HeaderMobileDrawer
            items={navItems}
            actions={[...leftActions, ...rightActions]}
            brand={<HeaderBrand {...brand} size="md" />}
            locale={locale}
            className="lg:hidden"
          />
        </div>
      </HeaderContainer>

      {/* Bottom row: centered nav */}
      {navItems.length > 0 && (
        <div className="hidden border-t border-border lg:flex lg:justify-center">
          <div className="flex h-12 items-center">
            <HeaderNav items={navItems} size={size} loading={loading} />
          </div>
        </div>
      )}
    </Header>
  )
}
