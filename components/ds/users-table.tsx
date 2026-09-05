"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface UserRow {
  name: string
  email: string
  avatarUrl?: string
  role: string
  status: "active" | "invited" | "offline"
}

export interface UsersTableProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UserRow[]
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function UsersTable({ className, users, loading = false, ...props }: UsersTableProps) {
  if (loading) {
    return (
      <Card data-slot="users-table-skeleton" className={cn("p-4", className)} {...props}>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card data-slot="users-table" className={cn("overflow-hidden p-0", className)} {...props}>
      <div className="flex flex-col">
        {users.map((u) => (
          <div key={u.email} className="flex items-center gap-3 border-b p-3 last:border-0">
            <Avatar className="size-8">
              <AvatarImage src={u.avatarUrl ?? ""} alt={u.name} />
              <AvatarFallback className="text-xs">{u.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">{u.name}</span>
              <span className="truncate text-xs text-muted-foreground">{u.email}</span>
            </div>
            <Badge variant="outline" className="rounded-full text-xs">
              {u.role}
            </Badge>
            <span
              className={cn(
                "size-2 rounded-full",
                u.status === "active" ? "bg-success" : u.status === "invited" ? "bg-warning" : "bg-muted-foreground/30"
              )}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
