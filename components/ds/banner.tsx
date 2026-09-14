"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  SparklesIcon,
  MegaphoneIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "secondary" | "outline" | "ghost"
}

export interface BannerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: BannerAction
  secondaryAction?: BannerAction
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const bannerVariants = cva(
  "relative flex w-full items-center justify-between gap-3 border px-4 py-3 text-left transition-colors",
  {
    variants: {
      intent: {
        default: "border-border/60 bg-muted/60 text-foreground",
        info: "border-highlight-sky/30 bg-highlight-sky/10 text-foreground",
        success: "border-success/30 bg-success/10 text-foreground",
        warning: "border-warning/30 bg-warning/10 text-foreground",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
        promo:
          "border-primary/20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent text-foreground",
      },
      variant: {
        default: "",
        outline: "bg-background",
        ghost: "border-transparent bg-transparent",
        filled: "",
      },
      size: {
        sm: "min-h-10 gap-2 px-3 py-2 text-xs",
        md: "min-h-12 gap-3 px-4 py-3 text-sm",
        lg: "min-h-14 gap-4 px-6 py-4 text-sm",
      },
      position: {
        inline: "relative",
        top: "sticky top-0 z-30",
        bottom:
          "fixed inset-x-0 bottom-0 z-40 rounded-none border-x-0 border-b-0",
        floating:
          "fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border shadow-lg",
      },
    },
    compoundVariants: [
      {
        intent: "info",
        variant: "filled",
        class:
          "border-highlight-sky bg-highlight-sky text-highlight-sky-foreground",
      },
      {
        intent: "success",
        variant: "filled",
        class: "border-success bg-success text-success-foreground",
      },
      {
        intent: "warning",
        variant: "filled",
        class: "border-warning bg-warning text-warning-foreground",
      },
      {
        intent: "destructive",
        variant: "filled",
        class: "text-destructive-foreground border-destructive bg-destructive",
      },
      {
        intent: "promo",
        variant: "filled",
        class:
          "border-primary bg-primary from-primary to-primary/80 text-primary-foreground",
      },
    ],
    defaultVariants: {
      intent: "default",
      variant: "default",
      size: "md",
      position: "inline",
    },
  }
)

export const bannerIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export const bannerTitleVariants = cva(
  "truncate font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const skeletonDims = {
  sm: {
    icon: "size-3.5",
    title: "h-3 w-20",
    desc: "h-3 w-40",
    cta: "h-8 w-20",
  },
  md: { icon: "size-4", title: "h-4 w-24", desc: "h-4 w-48", cta: "h-8 w-24" },
  lg: { icon: "size-5", title: "h-4 w-28", desc: "h-4 w-56", cta: "h-9 w-28" },
}

function getDefaultIcon(intent: BannerProps["intent"]) {
  switch (intent) {
    case "info":
      return <InfoIcon />
    case "success":
      return <CheckCircleIcon />
    case "warning":
      return <AlertTriangleIcon />
    case "destructive":
      return <AlertCircleIcon />
    case "promo":
      return <SparklesIcon />
    default:
      return <MegaphoneIcon />
  }
}

// ── Component ──────────────────────────────────────────────────────────────

export function Banner({
  className,
  intent = "default",
  variant = "default",
  size = "md",
  position = "inline",
  dismissible = true,
  onDismiss,
  icon,
  title,
  description,
  action,
  secondaryAction,
  locale = "en-US",
  loading = false,
  children,
  ...props
}: BannerProps) {
  const [dismissed, setDismissed] = React.useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (dismissed) return null

  if (loading) {
    const dims = skeletonDims[size ?? "md"]
    return (
      <div
        data-slot="banner-skeleton"
        className={cn(
          bannerVariants({ intent, variant, size, position }),
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-center gap-3">
          <Skeleton className={cn("rounded-full", dims.icon)} />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className={dims.title} />
            <Skeleton className={dims.desc} />
          </div>
        </div>
        <Skeleton className={cn("rounded-full", dims.cta)} />
      </div>
    )
  }

  const resolvedIcon = icon ?? getDefaultIcon(intent)

  const renderAction = (a: BannerAction, isPrimary: boolean) => {
    const btn = (
      <Button
        size={size === "lg" ? "default" : "sm"}
        variant={
          a.variant ??
          (isPrimary
            ? intent === "promo" || variant === "filled"
              ? "secondary"
              : "default"
            : "ghost")
        }
        onClick={a.onClick}
        className="shrink-0"
      >
        {a.label}
      </Button>
    )
    if (a.href) {
      return (
        <Button
          key={a.label}
          size={size === "lg" ? "default" : "sm"}
          variant={
            a.variant ??
            (isPrimary
              ? intent === "promo" || variant === "filled"
                ? "secondary"
                : "default"
              : "ghost")
          }
          asChild
          className="shrink-0"
        >
          <a href={a.href} onClick={a.onClick}>
            {a.label}
          </a>
        </Button>
      )
    }
    return <span key={a.label}>{btn}</span>
  }

  return (
    <div
      data-slot="banner"
      role="region"
      aria-label={UI_I18N[locale].banner.announcement}
      className={cn(
        bannerVariants({ intent, variant, size, position }),
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {resolvedIcon && (
          <span
            data-slot="banner-icon"
            className={cn(
              bannerIconVariants({ size }),
              "shrink-0 [&_svg]:size-full",
              intent === "destructive" &&
                variant !== "filled" &&
                "text-destructive",
              intent === "success" && variant !== "filled" && "text-success",
              intent === "warning" && variant !== "filled" && "text-warning",
              intent === "info" && variant !== "filled" && "text-highlight-sky"
            )}
            aria-hidden="true"
          >
            {resolvedIcon}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          {title && (
            <span className={cn(bannerTitleVariants({ size }), "shrink-0")}>
              {title}
            </span>
          )}
          {description && (
            <span className="min-w-0 flex-1 truncate text-sm font-normal text-muted-foreground data-[filled=true]:text-inherit">
              <span
                data-filled={variant === "filled" || undefined}
                className={cn(
                  variant === "filled" && "text-inherit",
                  "truncate"
                )}
              >
                {description}
              </span>
            </span>
          )}
          {children && (
            <span className="min-w-0 flex-1 truncate text-sm">{children}</span>
          )}
        </div>
      </div>

      {(action || secondaryAction) && (
        <div className="flex shrink-0 items-center gap-2">
          {secondaryAction && renderAction(secondaryAction, false)}
          {action && renderAction(action, true)}
        </div>
      )}

      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          aria-label={UI_I18N[locale].banner.dismiss}
          onClick={handleDismiss}
          className="size-8 min-h-[44px] min-w-[44px] shrink-0 rounded-full text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-3.5" />
        </Button>
      )}
    </div>
  )
}
