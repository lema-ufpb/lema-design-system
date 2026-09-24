"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Header, HeaderContainer } from "./header"
import { HeaderBrand, type HeaderBrandProps } from "./header-brand"
import { HeaderNav, type HeaderNavItem } from "./header-nav"
import { HeaderActions, type HeaderActionItem } from "./header-actions"
import { HeaderMobileDrawer } from "./header-mobile-drawer"
import {
  HeaderUserMenu,
  type HeaderUserData,
  type HeaderUserMenuItem,
} from "./header-user-menu"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cva, type VariantProps } from "class-variance-authority"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderCommandGroup {
  heading: string
  items: {
    label: string
    icon?: React.ReactNode
    shortcut?: string
    onSelect?: () => void
  }[]
}

export interface HeaderCommandProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerCommandVariants> {
  brand: HeaderBrandProps
  navItems?: HeaderNavItem[]
  commandGroups?: HeaderCommandGroup[]
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  user?: HeaderUserData | null
  userGroups?: HeaderUserMenuItem[][]
  notifications?: number
  actions?: HeaderActionItem[]
  locale?: UILocale
  loading?: boolean
  sticky?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerCommandVariants = cva("", {
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

export function HeaderCommand({
  className,
  brand,
  navItems = [],
  commandGroups = [],
  searchPlaceholder = "Search...",
  user,
  userGroups,
  notifications,
  actions = [],
  locale: localeProp,
  loading = false,
  size = "md",
  variant = "default",
  sticky = true,
  ...props
}: HeaderCommandProps & {
  variant?: "default" | "blurred" | "transparent" | "solid"
}) {
  const locale = useUILocale(localeProp)
  const [commandOpen, setCommandOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Header
        variant={variant}
        size={size}
        sticky={sticky}
        locale={locale}
        className={cn(headerCommandVariants({ size }), className)}
        {...props}
      >
        <HeaderContainer size={size}>
          <div className="flex items-center gap-4">
            <HeaderBrand {...brand} size={size} loading={loading} />
            {navItems.length > 0 && (
              <HeaderNav
                items={navItems}
                size={size}
                loading={loading}
                className="hidden lg:flex"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label={searchPlaceholder}
              onClick={() => setCommandOpen(true)}
              className="hidden h-8 items-center gap-2 rounded-full border-border bg-muted/50 px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
            >
              <SearchIcon className="size-3.5" />
              <span className="hidden lg:inline-flex">{searchPlaceholder}</span>
              <span className="hidden items-center gap-1 lg:inline-flex">
                <Kbd className="h-5 px-1.5 text-xs">⌘</Kbd>
                <Kbd className="h-5 px-1.5 text-xs">K</Kbd>
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label={searchPlaceholder}
              onClick={() => setCommandOpen(true)}
              className="size-8 rounded-full md:hidden"
            >
              <SearchIcon className="size-4" />
            </Button>

            {actions.length > 0 && (
              <HeaderActions
                actions={actions}
                loading={loading}
                className="hidden sm:flex"
              />
            )}

            {user !== undefined && (
              <HeaderUserMenu
                user={user}
                groups={userGroups}
                notifications={notifications}
                size={size}
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

      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Command Palette"
        description="Search commands"
      >
        <CommandInput placeholder={searchPlaceholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandGroups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.label}
                  onSelect={() => {
                    item.onSelect?.()
                    setCommandOpen(false)
                  }}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.shortcut}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
