"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { type HeaderNavItem } from "./header-nav"
import { type HeaderActionItem } from "./header-actions"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderMobileDrawerProps {
  items: HeaderNavItem[]
  actions?: HeaderActionItem[]
  brand?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  locale?: UILocale
  side?: "left" | "right"
  className?: string
  onNavigate?: (item: HeaderNavItem) => void
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderMobileDrawer({
  items,
  actions,
  brand,
  open,
  onOpenChange,
  locale = "en-US",
  side = "right",
  className,
  onNavigate,
}: HeaderMobileDrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const resolvedOpen = isControlled ? open : internalOpen

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Sheet open={resolvedOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={
            resolvedOpen
              ? UI_I18N[locale].header.closeMenu
              : UI_I18N[locale].header.openMenu
          }
          aria-expanded={resolvedOpen}
          aria-controls="header-mobile-drawer"
          className={cn("lg:hidden", className)}
          data-slot="header-mobile-trigger"
        >
          {resolvedOpen ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        id="header-mobile-drawer"
        side={side}
        className="flex w-[320px] flex-col gap-0 p-0 sm:max-w-[320px]"
        data-slot="header-mobile-drawer"
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="sr-only">
            {UI_I18N[locale].header.menu}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {UI_I18N[locale].header.toggleNav}
          </SheetDescription>
          {brand && (
            <div className="flex items-center gap-2 text-left">{brand}</div>
          )}
        </SheetHeader>

        <nav
          aria-label={UI_I18N[locale].header.menu}
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
        >
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0

            if (!hasChildren) {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    onClick={() => {
                      onNavigate?.(item)
                      handleOpenChange(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      item.active && "bg-muted text-foreground"
                    )}
                  >
                    {item.icon && (
                      <span className="shrink-0 [&_svg]:size-4">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              }
              return (
                <span
                  key={item.label}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  {item.icon && (
                    <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                  )}
                  <span className="flex-1 truncate">{item.label}</span>
                </span>
              )
            }

            return (
              <Collapsible key={item.label} className="group/collapsible">
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    item.active && "bg-muted"
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                  )}
                  <span className="flex-1 truncate text-left">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDownIcon className="size-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 flex flex-col gap-1 pl-4">
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href ?? "#"}
                      onClick={() => {
                        onNavigate?.(child)
                        handleOpenChange(false)
                      }}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        {child.icon && (
                          <span className="shrink-0 [&_svg]:size-3.5">
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
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>

        {actions && actions.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-2 p-4">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant ?? "default"}
                  size={action.size ?? "default"}
                  disabled={action.disabled}
                  aria-label={action.ariaLabel ?? action.label}
                  onClick={() => {
                    action.onClick?.()
                    handleOpenChange(false)
                  }}
                  className="w-full justify-center"
                  asChild={!!action.href}
                >
                  {action.href ? (
                    <a href={action.href}>{action.label}</a>
                  ) : (
                    <span>{action.label}</span>
                  )}
                </Button>
              ))}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
