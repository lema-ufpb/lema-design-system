"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Header, HeaderContainer } from "./header"
import { HeaderBrand, type HeaderBrandProps } from "./header-brand"
import { HeaderNav, type HeaderNavItem } from "./header-nav"
import { HeaderActions, type HeaderActionItem } from "./header-actions"
import { HeaderMobileDrawer } from "./header-mobile-drawer"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderTransparentProps extends React.HTMLAttributes<HTMLElement> {
  brand: HeaderBrandProps
  navItems?: HeaderNavItem[]
  actions?: HeaderActionItem[]
  threshold?: number
  size?: "sm" | "md" | "lg"
  sticky?: boolean
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderTransparent({
  className,
  brand,
  navItems = [],
  actions = [],
  threshold = 8,
  size = "md",
  sticky = true,
  locale: localeProp,
  loading = false,
  ...props
}: HeaderTransparentProps) {
  const locale = useUILocale(localeProp)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return (
    <Header
      variant={scrolled ? "blurred" : "transparent"}
      size={size}
      sticky={sticky}
      locale={locale}
      className={cn(
        "transition-colors duration-200",
        scrolled && "shadow-sm",
        className
      )}
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
