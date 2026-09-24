"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Variants ──

export const pageHeaderContainerVariants = cva("flex w-full flex-col gap-3", {
  variants: {
    size: {
      sm: "pb-3",
      md: "pb-4",
      lg: "pb-6",
    },
    variant: {
      default: "border-b border-border",
      compact: "",
      banner: "rounded-xl border border-border bg-muted/40 p-6",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

export const pageHeaderTitleVariants = cva(
  "font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        sm: "text-base font-semibold",
        md: "text-lg font-semibold",
        lg: "text-xl font-bold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const pageHeaderDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs font-normal",
      md: "text-sm font-normal",
      lg: "text-base font-normal",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Types ──

export interface PageHeaderProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof pageHeaderContainerVariants> {
  /**
   * Primary title of the page.
   */
  title: React.ReactNode
  /**
   * Secondary description or help text.
   */
  description?: React.ReactNode
  /**
   * Breadcrumb navigation component or elements rendered above title.
   */
  breadcrumbs?: React.ReactNode
  /**
   * Actions or button group aligned to the right.
   */
  actions?: React.ReactNode
  /**
   * Optional status badge rendered next to the title.
   */
  badge?: React.ReactNode
  /**
   * Additional metadata tags or info rendered below the description.
   */
  metadata?: React.ReactNode
  /**
   * Callback fired when clicking the back button.
   */
  onBack?: () => void
  /**
   * Optional URL for back button if functioning as a link.
   */
  backHref?: string
  /**
   * Accessible label for back button. Defaults to localized "Back".
   */
  backLabel?: string
  /**
   * Loading state showing matched skeleton components.
   */
  loading?: boolean
  /**
   * Root HTML element to render. Defaults to 'header'.
   */
  as?: "header" | "section" | "div"
  /**
   * Locale for text translation.
   */
  locale?: UILocale
}

// ── Component ──

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      as = "header",
      title,
      description,
      breadcrumbs,
      actions,
      badge,
      metadata,
      onBack,
      backHref,
      backLabel,
      size = "md",
      variant = "default",
      loading = false,
      locale: localeProp,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const t = UI_I18N[locale].pageHeader
    const resolvedBackLabel = backLabel ?? t.back

    const backIconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            pageHeaderContainerVariants({ size, variant }),
            className
          )}
          {...props}
        >
          {breadcrumbs && <Skeleton className="h-4 w-40" />}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton
                className={cn(
                  "w-64",
                  size === "sm" ? "h-6" : size === "lg" ? "h-8" : "h-7"
                )}
              />
              <Skeleton className="h-4 w-96" />
            </div>
            {actions && <Skeleton className="h-9 w-32 shrink-0" />}
          </div>
        </div>
      )
    }

    const renderBackButton = () => {
      if (!onBack && !backHref) return null

      if (backHref) {
        return (
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            asChild
            aria-label={resolvedBackLabel}
          >
            <a href={backHref}>
              <ArrowLeft className={backIconSize} />
            </a>
          </Button>
        )
      }

      return (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={onBack}
          aria-label={resolvedBackLabel}
        >
          <ArrowLeft className={backIconSize} />
        </Button>
      )
    }

    const Comp = as

    return (
      <Comp
        ref={ref}
        className={cn(
          pageHeaderContainerVariants({ size, variant }),
          className
        )}
        {...props}
      >
        {breadcrumbs && <div className="w-full">{breadcrumbs}</div>}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-2.5">
            {renderBackButton()}
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className={cn(pageHeaderTitleVariants({ size }))}>
                  {title}
                </h1>
                {badge && <div className="shrink-0">{badge}</div>}
              </div>
              {description && (
                <div className={cn(pageHeaderDescriptionVariants({ size }))}>
                  {description}
                </div>
              )}
              {metadata && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {metadata}
                </div>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-2 pt-1 sm:pt-0">
              {actions}
            </div>
          )}
        </div>
      </Comp>
    )
  }
)

PageHeader.displayName = "PageHeader"
