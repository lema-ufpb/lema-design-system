"use client"

import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderNavItem {
  label: string
  href?: string
  active?: boolean
  description?: string
  icon?: React.ReactNode
  badge?: string
  children?: HeaderNavItem[]
  /** For mega menu — render custom content */
  content?: React.ReactNode
}

export interface HeaderNavProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerNavVariants> {
  items: HeaderNavItem[]
  onNavigate?: (item: HeaderNavItem) => void
  loading?: boolean
  /** Accessible label for nav */
  ariaLabel?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerNavVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "[&_a]:text-xs [&_button]:text-xs",
      md: "[&_a]:text-sm [&_button]:text-sm",
      lg: "[&_a]:text-sm [&_button]:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const skeletonNavDims = {
  sm: "h-7 w-16",
  md: "h-8 w-20",
  lg: "h-9 w-24",
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderNav({
  className,
  items,
  onNavigate,
  loading = false,
  ariaLabel = "Main navigation",
  size = "md",
  ...props
}: HeaderNavProps) {
  if (loading) {
    const dim = skeletonNavDims[size ?? "md"]
    return (
      <nav
        data-slot="header-nav-skeleton"
        aria-label={ariaLabel}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className={cn("rounded-full", dim)} />
        ))}
      </nav>
    )
  }

  return (
    <nav
      data-slot="header-nav"
      aria-label={ariaLabel}
      className={cn(headerNavVariants({ size }), className)}
      {...props}
    >
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          {items.map((item) => {
            const hasChildren =
              (item.children && item.children.length > 0) || !!item.content

            if (!hasChildren) {
              return (
                <NavigationMenuItem key={item.label}>
                  {item.href ? (
                    <NavigationMenuLink
                      asChild
                      data-active={item.active || undefined}
                      className={cn(item.active && "bg-muted text-foreground")}
                    >
                      <Link
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                        onClick={() => onNavigate?.(item)}
                      >
                        {item.icon && (
                          <span className="shrink-0 [&_svg]:size-4">
                            {item.icon}
                          </span>
                        )}
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuLink
                      data-active={item.active || undefined}
                      className={cn(item.active && "bg-muted")}
                    >
                      <span className="truncate">{item.label}</span>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              )
            }

            return (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger
                  data-active={item.active || undefined}
                  className={cn(item.active && "bg-muted")}
                >
                  {item.icon && (
                    <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content ? (
                    <div className="min-w-[320px] p-2">{item.content}</div>
                  ) : (
                    <ul className="grid min-w-[320px] gap-1 p-2 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                      {item.children?.map((child) => (
                        <li key={child.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href ?? "#"}
                              onClick={() => onNavigate?.(child)}
                              className="flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-muted focus:bg-muted"
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                {child.icon && (
                                  <span className="shrink-0 [&_svg]:size-4">
                                    {child.icon}
                                  </span>
                                )}
                                <span className="truncate">{child.label}</span>
                                {child.badge && (
                                  <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                                    {child.badge}
                                  </span>
                                )}
                              </span>
                              {child.description && (
                                <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
