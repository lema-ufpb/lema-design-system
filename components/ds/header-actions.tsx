"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderActionItem {
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "sm" | "default" | "lg" | "icon"
  icon?: React.ReactNode
  iconPosition?: "start" | "end"
  disabled?: boolean
  ariaLabel?: string
}

export interface HeaderActionsProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerActionsVariants> {
  actions: HeaderActionItem[]
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerActionsVariants = cva("flex items-center", {
  variants: {
    gap: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    gap: "md",
  },
})

// ── Component ──────────────────────────────────────────────────────────────

export function HeaderActions({
  className,
  actions,
  loading = false,
  gap = "md",
  ...props
}: HeaderActionsProps) {
  if (loading) {
    return (
      <div
        data-slot="header-actions-skeleton"
        className={cn(headerActionsVariants({ gap }), className)}
        {...props}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("rounded-full", i === 0 ? "h-9 w-20" : "h-9 w-24")}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      data-slot="header-actions"
      className={cn(headerActionsVariants({ gap }), className)}
      {...props}
    >
      {actions.map((action) => {
        const content = (
          <>
            {action.icon && action.iconPosition !== "end" && (
              <span
                data-icon="inline-start"
                className="shrink-0 [&_svg]:size-4"
              >
                {action.icon}
              </span>
            )}
            <span className="truncate">{action.label}</span>
            {action.icon && action.iconPosition === "end" && (
              <span data-icon="inline-end" className="shrink-0 [&_svg]:size-4">
                {action.icon}
              </span>
            )}
          </>
        )

        if (action.href) {
          return (
            <Button
              key={action.label}
              variant={action.variant ?? "default"}
              size={action.size ?? "default"}
              disabled={action.disabled}
              aria-label={action.ariaLabel ?? action.label}
              asChild
            >
              <a href={action.href} onClick={action.onClick}>
                {content}
              </a>
            </Button>
          )
        }

        return (
          <Button
            key={action.label}
            variant={action.variant ?? "default"}
            size={action.size ?? "default"}
            disabled={action.disabled}
            aria-label={action.ariaLabel ?? action.label}
            onClick={action.onClick}
          >
            {content}
          </Button>
        )
      })}
    </div>
  )
}
