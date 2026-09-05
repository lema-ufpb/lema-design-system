"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
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

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderUserData {
  name: string
  email: string
  avatarUrl?: string
}

export interface HeaderUserMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  onClick?: () => void
  variant?: "default" | "destructive"
}

export interface HeaderUserMenuProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerUserMenuVariants> {
  user: HeaderUserData | null
  groups?: HeaderUserMenuItem[][]
  notifications?: number
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerUserMenuVariants = cva("flex items-center", {
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

export const headerUserAvatarVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const skeletonDims = {
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
}

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderUserMenu({
  className,
  user,
  groups = [],
  notifications,
  loading = false,
  size = "md",
  ...props
}: HeaderUserMenuProps) {
  if (loading) {
    return (
      <div
        data-slot="header-user-menu-skeleton"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <Skeleton className={cn("rounded-full", skeletonDims[size ?? "md"])} />
        <div className="hidden flex-col gap-1 md:flex">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-2.5 w-28 rounded-md" />
        </div>
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
    <div
      data-slot="header-user-menu"
      className={cn(headerUserMenuVariants({ size }), className)}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative flex h-9 items-center gap-2 px-2"
            aria-label={user.name}
          >
            <Avatar
              className={cn(headerUserAvatarVariants({ size }), "shrink-0")}
            >
              <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="hidden truncate text-sm font-medium md:inline-flex">
              {user.name}
            </span>
            {typeof notifications === "number" && notifications > 0 && (
              <span
                aria-label={`${notifications} notifications`}
                className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
              >
                {notifications > 99 ? "99+" : notifications}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 rounded-xl"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-full">
                <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-full">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
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
                {group.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={item.onClick}
                    className={cn(
                      item.variant === "destructive" &&
                        "text-destructive focus:text-destructive"
                    )}
                  >
                    {item.icon}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
