"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { SocialLinks, type SocialLinkItem } from "./social-links"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TeamCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teamCardVariants> {
  name: string
  role?: string
  bio?: string
  avatarUrl?: string
  socials?: SocialLinkItem[]
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const teamCardVariants = cva(
  "flex flex-col gap-3 rounded-2xl border bg-card p-5 text-card-foreground transition-all hover:shadow-md",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const teamCardAvatarVariants = cva("shrink-0 rounded-full", {
  variants: {
    size: {
      sm: "size-16",
      md: "size-20",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function TeamCard({
  className,
  name,
  role,
  bio,
  avatarUrl,
  socials,
  size = "md",
  loading = false,
  ...props
}: TeamCardProps) {
  if (loading) {
    return (
      <div
        data-slot="team-card-skeleton"
        className={cn(teamCardVariants({ size }), className)}
        {...props}
      >
        <Skeleton
          className={cn("rounded-full", size === "sm" ? "size-16" : "size-20")}
        />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-full" />
      </div>
    )
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      data-slot="team-card"
      className={cn(teamCardVariants({ size }), className)}
      {...props}
    >
      <Avatar className={cn(teamCardAvatarVariants({ size }))}>
        <AvatarImage src={avatarUrl ?? ""} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="truncate text-sm font-medium text-foreground">
          {name}
        </span>
        {role && (
          <span className="truncate text-xs text-muted-foreground">{role}</span>
        )}
      </div>
      {bio && (
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {bio}
        </p>
      )}
      {socials && socials.length > 0 && (
        <SocialLinks links={socials} variant="ghost" size="sm" gap="sm" />
      )}
    </div>
  )
}
