"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Variants ──

export const avatarPresenceVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      sm: "[&_.avatar-root]:size-8",
      md: "[&_.avatar-root]:size-10",
      lg: "[&_.avatar-root]:size-12",
      xl: "[&_.avatar-root]:size-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Types ──

export interface AvatarPresenceProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarPresenceVariants> {
  /**
   * Avatar image source URL.
   */
  src?: string
  /**
   * Accessible alt description.
   */
  alt?: string
  /**
   * Fallback text/initials if image fails or is omitted.
   */
  fallback?: string
  /**
   * User presence state.
   */
  status?: "online" | "offline" | "busy" | "away"
  /**
   * Subtle live pulse animation for online status.
   */
  pulse?: boolean
  /**
   * Placement corner of indicator dot.
   */
  position?: "bottom-right" | "top-right"
  /**
   * Locale for accessible tooltip/title.
   */
  locale?: UILocale
}

// ── Component ──

export const AvatarPresence = React.forwardRef<
  HTMLDivElement,
  AvatarPresenceProps
>(
  (
    {
      src,
      alt,
      fallback = "U",
      status = "online",
      pulse = false,
      size = "md",
      position = "bottom-right",
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].avatarPresence

    const getStatusLabel = () => {
      switch (status) {
        case "online":
          return t.online
        case "offline":
          return t.offline
        case "busy":
          return t.busy
        case "away":
          return t.away
      }
    }

    const getStatusColor = () => {
      switch (status) {
        case "online":
          return "bg-success"
        case "offline":
          return "bg-muted-foreground"
        case "busy":
          return "bg-destructive"
        case "away":
          return "bg-warning"
      }
    }

    const dotSize =
      size === "sm"
        ? "size-2.5"
        : size === "lg"
          ? "size-3.5"
          : size === "xl"
            ? "size-4"
            : "size-3"

    const positionClasses =
      position === "top-right"
        ? "top-0 right-0 -translate-y-0.5 translate-x-0.5"
        : "bottom-0 right-0 translate-y-0.5 translate-x-0.5"

    const statusLabel = getStatusLabel()

    return (
      <div
        ref={ref}
        title={`${alt ?? fallback}: ${statusLabel}`}
        aria-label={`${alt ?? fallback}, ${statusLabel}`}
        className={cn(avatarPresenceVariants({ size }), className)}
        {...props}
      >
        <Avatar className="avatar-root ring-1 ring-border">
          {src && <AvatarImage src={src} alt={alt ?? fallback} />}
          <AvatarFallback
            className={cn(
              "bg-muted font-medium text-muted-foreground",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            {fallback}
          </AvatarFallback>
        </Avatar>

        <span
          className={cn(
            "absolute z-10 flex items-center justify-center rounded-full ring-2 ring-background",
            dotSize,
            positionClasses,
            getStatusColor()
          )}
        >
          {pulse && status === "online" && (
            <span
              className={cn(
                "absolute -inset-0.5 animate-ping rounded-full bg-success opacity-75"
              )}
            />
          )}
        </span>
      </div>
    )
  }
)

AvatarPresence.displayName = "AvatarPresence"
