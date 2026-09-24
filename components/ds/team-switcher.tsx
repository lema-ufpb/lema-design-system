"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// ── Types ──

export interface TeamSwitcherTeam {
  name: string
  logo: React.ElementType
  plan: string
}

export interface TeamSwitcherProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof teamSwitcherVariants> {
  teams: TeamSwitcherTeam[]
  defaultTeam?: string
  onTeamChange?: (team: TeamSwitcherTeam) => void
  onAddTeam?: () => void
  locale?: UILocale
  loading?: boolean
}

// ── Variants ──

export const teamSwitcherVariants = cva("", {
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

const skeletonDims = {
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
}

// ── Component ──

export function TeamSwitcher({
  teams,
  defaultTeam,
  onTeamChange,
  onAddTeam,
  locale: localeProp,
  loading = false,
  className,
  size = "md",
  ...props
}: TeamSwitcherProps) {
  const locale = useUILocale(localeProp)
  const { isMobile } = useSidebar()
  const t = UI_I18N[locale]?.teamSwitcher ?? UI_I18N["en-US"].teamSwitcher
  const [activeTeam, setActiveTeam] = React.useState<TeamSwitcherTeam | null>(
    () => {
      if (defaultTeam)
        return teams.find((t) => t.name === defaultTeam) ?? teams[0] ?? null
      return teams[0] ?? null
    }
  )

  const handleSelect = (team: TeamSwitcherTeam) => {
    setActiveTeam(team)
    onTeamChange?.(team)
  }

  if (loading) {
    return (
      <div
        data-slot="team-switcher-skeleton"
        className={cn(
          "flex items-center gap-2 p-2",
          skeletonDims[size ?? "md"],
          className
        )}
        {...props}
      >
        <Skeleton className="size-8 rounded-lg" />
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
    )
  }

  if (!activeTeam) return null

  return (
    <div
      data-slot="team-switcher"
      className={cn(teamSwitcherVariants({ size }), className)}
      {...props}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                aria-label={t.switchTeam}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-4" aria-hidden="true" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {activeTeam.plan}
                  </span>
                </div>
                <ChevronsUpDownIcon
                  className="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {t.teams}
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => handleSelect(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <team.logo
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="flex-1 truncate">{team.name}</span>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              {onAddTeam && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onAddTeam} className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <PlusIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-muted-foreground">
                      {t.addTeam}
                    </span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
