"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  AppSidebar,
  type AppSidebarNavItem,
  type AppSidebarProject,
} from "./app-sidebar"
import { SectionCards, type SectionCardItem } from "./section-cards"
import type { TeamSwitcherTeam } from "./team-switcher"
import type { UserMenuData } from "./nav-user"

// ── Types ──

export interface DashboardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardVariants> {
  sidebar?: {
    teams?: TeamSwitcherTeam[]
    navMain?: AppSidebarNavItem[]
    projects?: AppSidebarProject[]
    user?: UserMenuData | null
  }
  header?: {
    title?: string
    actions?: React.ReactNode
  }
  stats?: SectionCardItem[]
  chart?: React.ReactNode
  table?: React.ReactNode
  locale?: UILocale
  loading?: boolean
}

// ── Variants ──

export const dashboardVariants = cva("flex w-full flex-1 flex-col", {
  variants: {
    variant: {
      default: "",
      inset: "[--header-height:calc(var(--spacing)*12)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// ── Internal: SiteHeader ──

function SiteHeader({
  title,
  actions,
  locale = "en-US",
}: {
  title?: string
  actions?: React.ReactNode
  locale?: UILocale
}) {
  const t = UI_I18N[locale]?.dashboard ?? UI_I18N["en-US"].dashboard
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-2">
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="text-base font-medium">{title ?? t.documents}</h1>
        {actions && (
          <div className="ml-auto flex items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  )
}

// ── Component ──

export function Dashboard({
  sidebar,
  header,
  stats,
  chart,
  table,
  locale = "en-US",
  loading = false,
  variant = "default",
  className,
  children,
  ...props
}: DashboardProps) {
  if (loading) {
    return (
      <div
        data-slot="dashboard-skeleton"
        className={cn("flex min-h-svh w-full flex-col gap-4 p-6", className)}
        {...props}
      >
        <div className="flex gap-4">
          <Skeleton className="h-64 w-60 rounded-xl" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        data-slot="dashboard"
        className={cn(dashboardVariants({ variant }), className)}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
        {...props}
      >
        <AppSidebar
          teams={sidebar?.teams}
          navMain={sidebar?.navMain}
          projects={sidebar?.projects}
          user={sidebar?.user}
          locale={locale}
          sidebarVariant={variant === "inset" ? "inset" : "sidebar"}
        />
        <SidebarInset>
          <SiteHeader
            title={header?.title}
            actions={header?.actions}
            locale={locale}
          />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {stats && stats.length > 0 && <SectionCards items={stats} />}
                {chart && <div className="px-4 lg:px-6">{chart}</div>}
                {table && <div className="px-4 lg:px-6">{table}</div>}
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
