"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  ChevronRightIcon,
  MoreHorizontalIcon,
  FolderIcon,
  ForwardIcon,
  Trash2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { TeamSwitcher, type TeamSwitcherTeam } from "./team-switcher"
import { SidebarSearch } from "./sidebar-search"
import { NavUser, type UserMenuData } from "./nav-user"

// ── Types ──

export interface AppSidebarNavItem {
  title: string
  url: string
  icon?: React.ElementType
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export interface AppSidebarProject {
  name: string
  url: string
  icon: React.ElementType
}

export interface AppSidebarProps extends Omit<
  React.ComponentProps<typeof Sidebar>,
  "collapsible" | "variant"
> {
  teams?: TeamSwitcherTeam[]
  navMain?: AppSidebarNavItem[]
  projects?: AppSidebarProject[]
  user?: UserMenuData | null
  showSearch?: boolean
  searchPlaceholder?: string
  collapsible?: "offcanvas" | "icon" | "none"
  sidebarVariant?: "sidebar" | "floating" | "inset"
  locale?: UILocale
  loading?: boolean
  onNavItemClick?: (item: AppSidebarNavItem) => void
  onProjectClick?: (project: AppSidebarProject) => void
  onTeamChange?: (team: TeamSwitcherTeam) => void
}

// ── Variants ──

export const appSidebarVariants = cva("", {
  variants: {
    sidebarVariant: {
      sidebar: "",
      floating: "",
      inset: "",
    },
  },
  defaultVariants: {
    sidebarVariant: "sidebar",
  },
})

// ── Internal helpers ──

function NavMainGroup({
  items,
  label,
  onItemClick,
}: {
  items: AppSidebarNavItem[]
  label: string
  onItemClick?: (item: AppSidebarNavItem) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.icon && <item.icon aria-hidden="true" />}
                  <span>{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <ChevronRightIcon
                      className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      aria-hidden="true"
                    />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavProjectsGroup({
  projects,
  label,
  moreLabel,
  onProjectClick,
}: {
  projects: AppSidebarProject[]
  label: string
  moreLabel: string
  onProjectClick?: (project: AppSidebarProject) => void
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild onClick={() => onProjectClick?.(item)}>
              <a href={item.url}>
                <item.icon aria-hidden="true" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontalIcon aria-hidden="true" />
                  <span className="sr-only">{moreLabel}</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-xl"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ForwardIcon
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon aria-hidden="true" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon
              className="text-sidebar-foreground/70"
              aria-hidden="true"
            />
            <span>{moreLabel}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

// ── Component ──

export function AppSidebar({
  teams,
  navMain,
  projects,
  user,
  showSearch = true,
  searchPlaceholder,
  collapsible = "offcanvas",
  sidebarVariant = "sidebar",
  locale = "pt-BR",
  loading = false,
  onNavItemClick,
  onProjectClick,
  onTeamChange,
  className,
  ...props
}: AppSidebarProps) {
  const t = UI_I18N[locale]?.sidebar ?? UI_I18N["pt-BR"].sidebar

  if (loading) {
    return (
      <Sidebar
        collapsible={collapsible}
        variant={sidebarVariant}
        className={cn(className)}
        {...props}
      >
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="size-8 rounded-lg" />
            <div className="flex flex-1 flex-col gap-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-full rounded-lg" />
        </SidebarHeader>
        <SidebarContent className="gap-2 p-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-full rounded-lg" />
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-1 flex-col gap-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2.5 w-28" />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    )
  }

  return (
    <Sidebar
      collapsible={collapsible}
      variant={sidebarVariant}
      className={cn(className)}
      {...props}
    >
      <SidebarHeader>
        {teams && teams.length > 0 && (
          <TeamSwitcher
            teams={teams}
            locale={locale}
            onTeamChange={onTeamChange}
          />
        )}
        {showSearch && (
          <SidebarSearch
            locale={locale}
            placeholder={searchPlaceholder}
            onSearch={() => {}}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        {navMain && navMain.length > 0 && (
          <NavMainGroup
            items={navMain}
            label={t.navigation}
            onItemClick={onNavItemClick}
          />
        )}
        {projects && projects.length > 0 && (
          <NavProjectsGroup
            projects={projects}
            label={t.documents}
            moreLabel={t.more}
            onProjectClick={onProjectClick}
          />
        )}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
      <SidebarRail aria-label={t.toggle} />
    </Sidebar>
  )
}
