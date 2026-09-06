"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role?: string
  bio?: string
  avatarUrl?: string
  stats?: { label: string; value: string }[]
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Profile({
  className,
  name,
  role,
  bio,
  avatarUrl,
  stats,
  loading = false,
  ...props
}: ProfileProps) {
  if (loading) {
    return (
      <Card
        data-slot="profile-skeleton"
        className={cn("p-6", className)}
        {...props}
      >
        <Skeleton className="h-32 w-full" />
      </Card>
    )
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card data-slot="profile" className={cn("p-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Avatar className="size-16">
            <AvatarImage src={avatarUrl ?? ""} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">
              {name}
            </span>
            {role && (
              <span className="text-xs text-muted-foreground">{role}</span>
            )}
            {bio && (
              <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {bio}
              </span>
            )}
          </div>
        </div>
        {stats && stats.length > 0 && (
          <div className="flex gap-2">
            {stats.map((s) => (
              <Badge key={s.label} variant="secondary" className="rounded-full">
                {s.value} {s.label}
              </Badge>
            ))}
          </div>
        )}
        <Button size="sm" className="w-fit rounded-full">
          Follow
        </Button>
      </div>
    </Card>
  )
}
