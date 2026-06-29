"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar as AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl"
export type AvatarStatus = "online" | "busy" | "away" | "offline"

export interface AvatarProps
  extends
    Omit<React.ComponentProps<typeof AvatarRoot>, "className" | "size">,
    VariantProps<typeof avatarVariants>,
    VariantProps<typeof statusVariants> {
  src?: string
  alt: string
  fallback?: string
  size?: AvatarSize
  status?: AvatarStatus
  tooltip?: string
  loading?: boolean
  locale?: UILocale
  className?: string
  onLoadingStatusChange?: (
    status: "idle" | "loading" | "loaded" | "error"
  ) => void
  delayMs?: number
}

export interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: AvatarSize
  className?: string
}

// ── Variants ──

export const avatarVariants = cva("", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
      "2xl": "size-16",
    },
  },
  defaultVariants: { size: "md" },
})

export const initialsVariants = cva("", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-base",
      "2xl": "text-lg",
    },
  },
  defaultVariants: { size: "md" },
})

export const statusVariants = cva(
  "absolute right-0 bottom-0 z-10 rounded-full ring-2 ring-background",
  {
    variants: {
      status: {
        online: "bg-success",
        busy: "bg-destructive",
        away: "bg-warning",
        offline: "bg-muted-foreground",
      },
      size: {
        sm: "size-1.5",
        md: "size-2",
        lg: "size-2.5",
        xl: "size-3",
        "2xl": "size-3.5",
      },
    },
    defaultVariants: { status: "online", size: "md" },
  }
)

// ── Color Generator ──

const AVATAR_COLORS = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-destructive/10 text-destructive",
  "bg-info/10 text-info",
  "bg-[#6366f1]/10 text-[#6366f1]",
  "bg-[#ec4899]/10 text-[#ec4899]",
  "bg-[#14b8a6]/10 text-[#14b8a6]",
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ── Avatar Component ──

function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  status,
  tooltip,
  loading = false,
  locale = "pt-BR",
  className,
  onLoadingStatusChange,
  delayMs,
  ...htmlProps
}: AvatarProps) {
  const i18n = UI_I18N[locale]
  const initials = fallback ?? getInitials(alt)
  const initialsColor = getAvatarColor(alt)
  const statusLabel = status ? i18n.avatar[status] : undefined
  const ariaLabel = statusLabel ? `${alt} - ${statusLabel}` : alt

  if (loading) {
    const skeletonSize: Record<AvatarSize, string> = {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
      "2xl": "size-16",
    }
    return <Skeleton className={cn("rounded-full", skeletonSize[size])} />
  }

  const avatarElement = (
    <AvatarRoot
      data-slot="ds-avatar"
      aria-label={ariaLabel}
      {...htmlProps}
      className={cn(avatarVariants({ size }), className)}
    >
      {src ? (
        <AvatarImage
          src={src}
          alt={alt}
          onLoadingStatusChange={onLoadingStatusChange}
        />
      ) : (
        <AvatarFallback
          delayMs={delayMs}
          className={cn(initialsVariants({ size }), initialsColor)}
        >
          {initials}
        </AvatarFallback>
      )}
      {status && (
        <span
          data-slot="ds-avatar-status"
          className={statusVariants({ status, size })}
          aria-label={statusLabel}
        />
      )}
    </AvatarRoot>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{avatarElement}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return avatarElement
}

// ── AvatarGroup Component ──

function AvatarGroup({
  children,
  max,
  size = "md",
  className,
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const visible = max ? childrenArray.slice(0, max) : childrenArray
  const overflow = max ? Math.max(0, childrenArray.length - max) : 0

  return (
    <div
      data-slot="ds-avatar-group"
      className={cn("flex [&>*]:-mr-2 [&>*:last-child]:mr-0", className)}
    >
      {visible}
      {overflow > 0 && (
        <div
          data-slot="ds-avatar-group-count"
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background",
            size === "sm" && "size-6 text-[10px]",
            size === "md" && "size-8",
            size === "lg" && "size-10",
            size === "xl" && "size-12",
            size === "2xl" && "size-16 text-sm"
          )}
          aria-label={`+${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
