import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type TeamRosterColumns = 2 | 3 | 4
export type TeamRosterCardSize = "sm" | "md" | "lg"
export type TeamRosterStatus = "available" | "busy" | "offline"

export interface TeamRosterSocialLink {
  label: string
  href: string
  icon: React.ElementType
}

export interface TeamRosterProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: TeamRosterColumns
}

export interface TeamRosterCardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof teamRosterCardContentVariants> {
  name: string
  role?: string
  avatarSrc?: string
  avatarFallback?: string
  status?: TeamRosterStatus
  social?: TeamRosterSocialLink[]
  loading?: boolean
}

// ── Variants ──

export const teamRosterGridVariants = cva(
  "grid grid-cols-1 gap-6 sm:grid-cols-2",
  {
    variants: {
      columns: {
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
      },
    },
    defaultVariants: { columns: 3 },
  }
)

export const teamRosterCardContentVariants = cva(
  "flex flex-col items-center gap-3 text-center",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const teamRosterAvatarVariants = cva("", {
  variants: {
    size: {
      sm: "size-14",
      md: "size-20",
      lg: "size-24",
    },
  },
  defaultVariants: { size: "md" },
})

export const teamRosterNameVariants = cva("font-semibold text-foreground", {
  variants: {
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { size: "md" },
})

export const teamRosterRoleVariants = cva("text-muted-foreground", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
})

// ── Helpers ──

const STATUS_TOKEN: Record<TeamRosterStatus, string> = {
  available: "bg-success",
  busy: "bg-warning",
  offline: "bg-muted-foreground",
}

const STATUS_LABEL: Record<TeamRosterStatus, string> = {
  available: "Available",
  busy: "Busy",
  offline: "Offline",
}

const SKELETON_AVATAR: Record<TeamRosterCardSize, string> = {
  sm: "size-14",
  md: "size-20",
  lg: "size-24",
}

// ── TeamRoster ──

export const TeamRoster = React.forwardRef<HTMLDivElement, TeamRosterProps>(
  ({ className, columns = 3, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(teamRosterGridVariants({ columns }), className)}
      data-slot="team-roster"
      {...props}
    />
  )
)
TeamRoster.displayName = "TeamRoster"

// ── TeamRosterCard ──

export const TeamRosterCard = React.forwardRef<
  HTMLDivElement,
  TeamRosterCardProps
>(
  (
    {
      name,
      role,
      avatarSrc,
      avatarFallback,
      status,
      social = [],
      size = "md",
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md"

    if (loading) {
      return (
        <Card
          ref={ref}
          className={className}
          data-slot="team-roster-card-skeleton"
        >
          <CardContent className={cn(teamRosterCardContentVariants({ size }))}>
            <Skeleton
              className={cn("rounded-full", SKELETON_AVATAR[resolvedSize])}
            />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-3.5 w-32 rounded-md" />
          </CardContent>
        </Card>
      )
    }

    return (
      <Card
        ref={ref}
        className={cn("group/team-card", className)}
        data-slot="team-roster-card"
        {...props}
      >
        <CardContent className={cn(teamRosterCardContentVariants({ size }))}>
          <div className="relative">
            <Avatar className={cn(teamRosterAvatarVariants({ size }))}>
              {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
              <AvatarFallback>
                {avatarFallback ?? name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {status && (
              <AvatarBadge
                className={cn(STATUS_TOKEN[status], "size-3 ring-2 ring-card")}
                aria-label={STATUS_LABEL[status]}
                role="img"
              />
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className={cn(teamRosterNameVariants({ size }))}>{name}</span>
            {role && (
              <span className={cn(teamRosterRoleVariants({ size }))}>
                {role}
              </span>
            )}
          </div>

          {social.length > 0 && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-focus-within/team-card:opacity-100 group-hover/team-card:opacity-100 has-[a:focus-visible]:opacity-100">
              {social.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
TeamRosterCard.displayName = "TeamRosterCard"
