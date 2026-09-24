"use client"

import * as React from "react"
import { DSLink } from "@/components/ds/link-provider"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Header, HeaderContainer } from "./header"
import { HeaderBrand, type HeaderBrandProps } from "./header-brand"
import { HeaderNav, type HeaderNavItem } from "./header-nav"
import { HeaderActions, type HeaderActionItem } from "./header-actions"
import { HeaderMobileDrawer } from "./header-mobile-drawer"
import { Button } from "@/components/ui/button"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderMegaFeature {
  title: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  href?: string
  ctaLabel?: string
}

export interface HeaderMegaProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerMegaVariants> {
  brand: HeaderBrandProps
  navItems: HeaderNavItem[]
  actions?: HeaderActionItem[]
  feature?: HeaderMegaFeature
  locale?: UILocale
  loading?: boolean
  sticky?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerMegaVariants = cva("", {
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

// ── Mega Content Helper ────────────────────────────────────────────────────

function MegaContent({
  items,
  feature,
}: {
  items: HeaderNavItem[]
  feature?: HeaderMegaFeature
}) {
  return (
    <div
      className={cn(
        "grid gap-6 p-4",
        feature ? "grid-cols-3 lg:w-[720px]" : "grid-cols-2 lg:w-[520px]"
      )}
    >
      <div
        className={cn(
          "grid gap-4",
          feature ? "col-span-2 grid-cols-2" : "col-span-2 grid-cols-2"
        )}
      >
        {items.map((child) => (
          <DSLink
            key={child.label}
            href={child.href ?? "#"}
            className="flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              {child.icon && (
                <span className="shrink-0 rounded-md bg-muted p-1.5 [&_svg]:size-4">
                  {child.icon}
                </span>
              )}
              <span className="truncate">{child.label}</span>
            </span>
            {child.description && (
              <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                {child.description}
              </span>
            )}
          </DSLink>
        ))}
      </div>
      {feature && (
        <div className="flex flex-col gap-3 rounded-xl bg-muted p-4">
          {feature.imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={feature.imageSrc}
              alt={feature.imageAlt ?? feature.title}
              loading="lazy"
              decoding="async"
              className="h-28 w-full rounded-lg object-cover"
            />
          )}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">
              {feature.title}
            </span>
            {feature.description && (
              <span className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </span>
            )}
          </div>
          {feature.href && feature.ctaLabel && (
            <Button asChild size="sm" className="mt-1 w-fit">
              <DSLink href={feature.href}>
                {feature.ctaLabel}
                <ArrowRightIcon className="ml-1 size-3.5" />
              </DSLink>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderMega({
  className,
  brand,
  navItems,
  actions = [],
  feature,
  locale: localeProp,
  loading = false,
  size = "md",
  variant = "default",
  sticky = true,
  ...props
}: HeaderMegaProps & {
  variant?: "default" | "blurred" | "transparent" | "solid"
}) {
  const locale = useUILocale(localeProp)
  const enrichedItems: HeaderNavItem[] = navItems.map((item) => {
    if (item.children && !item.content) {
      return {
        ...item,
        content: <MegaContent items={item.children} feature={feature} />,
      }
    }
    return item
  })

  return (
    <Header
      variant={variant}
      size={size}
      sticky={sticky}
      locale={locale}
      className={cn(headerMegaVariants({ size }), className)}
      {...props}
    >
      <HeaderContainer size={size}>
        <HeaderBrand {...brand} size={size} loading={loading} />

        <HeaderNav
          items={enrichedItems}
          size={size}
          loading={loading}
          className="hidden lg:flex"
        />

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
