"use client"

import { ChevronsUpDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type React from "react"

export interface UserMenuProps {
  user?: UserMenuData
  groups?: UserMenuItem[][]
  /** Show animated skeleton in place of the user button while data loads */
  loading?: boolean
}

export interface UserMenuData {
  name: string
  email: string
  avatarUrl?: string
}

export interface UserMenuItem {
  id: string
  label: string
  /** Pre-rendered icon node — pass JSX e.g. <Settings className="size-4" /> */
  icon?: React.ReactNode
  shortcut?: string
  onClick?: () => void
  variant?: "default" | "destructive"
}

export function NavUser({ user, groups = [], loading = false }: UserMenuProps) {
  if (loading) {
    return (
      <div
        data-slot="nav-user-skeleton"
        className="flex h-9 items-center gap-2 px-2"
      >
        <Skeleton className="size-7 shrink-0 rounded-lg" />
        <div className="hidden flex-col gap-1 md:flex">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-2.5 w-28 rounded-md" />
        </div>
        <ChevronsUpDown className="ml-1 size-4 shrink-0 text-muted-foreground opacity-30" />
      </div>
    )
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu data-slot="nav-user">
      <DropdownMenuTrigger asChild>
        <Button
          data-slot="nav-user-trigger"
          variant="ghost"
          className="flex h-9 items-center gap-2 px-2"
        >
          <Avatar data-slot="nav-user-avatar" className="size-7 rounded-lg">
            <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
            <AvatarFallback className="rounded-lg text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div
            data-slot="nav-user-info"
            className="hidden grid-cols-1 text-left text-sm leading-tight md:grid"
          >
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-1 size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar data-slot="nav-user-avatar" className="size-8 rounded-lg">
              <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div
              data-slot="nav-user-info"
              className="grid flex-1 text-left text-sm leading-tight"
            >
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        {groups.map((group, i) => (
          <div key={i}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {group.map((item) => {
                return (
                  <DropdownMenuItem
                    data-slot="nav-user-item"
                    key={item.id}
                    onClick={item.onClick}
                    className={cn(
                      item.variant === "destructive" &&
                        "text-destructive focus:text-destructive"
                    )}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
