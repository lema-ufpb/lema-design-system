"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──

export interface AnnouncementBadgeProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "ping">,
    VariantProps<typeof announcementBadgeVariants> {
  ping?: boolean
  showArrow?: boolean
  icon?: React.ReactNode
  tag?: string
}

// ── Variants ──

export const announcementBadgeVariants = cva(
  "group inline-flex items-center gap-2 rounded-full border text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-border/60 bg-muted/60 text-muted-foreground backdrop-blur-sm hover:bg-muted hover:text-foreground",
        outline:
          "border-border bg-background text-foreground hover:bg-muted/50",
        glow: "border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_rgba(var(--primary),0.15)] hover:bg-primary/20",
        gradient:
          "border-border/40 bg-gradient-to-r from-primary/10 via-muted/40 to-primary/10 text-foreground hover:border-border",
      },
      size: {
        sm: "h-7 px-2.5 py-0.5 text-xs [&>svg]:size-3",
        md: "h-8 px-3 py-1 text-xs [&>svg]:size-3.5",
        lg: "h-9 px-3.5 py-1.5 text-sm [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// ── Component ──

export const AnnouncementBadge = React.forwardRef<
  HTMLAnchorElement,
  AnnouncementBadgeProps
>(
  (
    {
      className,
      variant,
      size,
      ping = false,
      showArrow = true,
      icon,
      tag,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {ping && (
          <span
            className="relative flex size-2 items-center justify-center"
            aria-hidden="true"
          >
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
        )}

        {icon && <span className="shrink-0">{icon}</span>}

        {tag && (
          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            {tag}
          </span>
        )}

        <span className="truncate">{children}</span>

        {showArrow && (
          <ArrowRightIcon
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </>
    )

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(
            announcementBadgeVariants({ variant, size }),
            className
          )}
          {...props}
        >
          {content}
        </a>
      )
    }

    const divProps = { ...props } as Record<string, unknown>
    delete divProps.target
    delete divProps.rel
    delete divProps.download
    delete divProps.hrefLang
    delete divProps.media
    delete divProps.referrerPolicy
    delete divProps.type

    return (
      <div
        ref={ref as unknown as React.Ref<HTMLDivElement>}
        className={cn(announcementBadgeVariants({ variant, size }), className)}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    )
  }
)
AnnouncementBadge.displayName = "AnnouncementBadge"
