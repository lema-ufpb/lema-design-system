"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Inbox, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Variants ──

export const emptyActionVariants = cva(
  "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-center",
  {
    variants: {
      size: {
        sm: "gap-3 p-6",
        md: "gap-4 p-8 sm:p-12",
        lg: "gap-6 p-12 sm:p-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Types ──

export interface EmptyActionItem {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
}

export interface EmptyActionProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyActionVariants> {
  /**
   * Top illustration or icon.
   */
  icon?: React.ReactNode
  /**
   * Primary title.
   */
  title: React.ReactNode
  /**
   * Explanatory description.
   */
  description: React.ReactNode
  /**
   * Primary call to action button.
   */
  primaryAction?: EmptyActionItem
  /**
   * Secondary action button or documentation link.
   */
  secondaryAction?: EmptyActionItem
  /**
   * Optional recommended next steps list.
   */
  suggestions?: string[]
  /**
   * Localization locale.
   */
  locale?: UILocale
}

// ── Component ──

export const EmptyAction = React.forwardRef<HTMLDivElement, EmptyActionProps>(
  (
    {
      icon,
      title,
      description,
      primaryAction,
      secondaryAction,
      suggestions,
      size = "md",
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].emptyAction

    const iconWrapperSize =
      size === "sm" ? "size-10" : size === "lg" ? "size-16" : "size-12"

    const iconInnerSize =
      size === "sm" ? "size-5" : size === "lg" ? "size-8" : "size-6"

    return (
      <div
        ref={ref}
        role="status"
        className={cn(emptyActionVariants({ size }), className)}
        {...props}
      >
        {/* Icon slot */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground",
            iconWrapperSize
          )}
        >
          {icon ? (
            <div className={iconInnerSize}>{icon}</div>
          ) : (
            <Inbox className={iconInnerSize} />
          )}
        </div>

        {/* Text content — max-w-prose (65ch) ensures 200% zoom reflow without overflow */}
        <div className="flex max-w-prose flex-col items-center gap-1.5">
          <h3
            className={cn(
              "font-semibold tracking-tight text-foreground",
              size === "sm" && "text-sm",
              size === "md" && "text-base",
              size === "lg" && "text-base"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "max-w-prose leading-relaxed text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}
          >
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {primaryAction && (
              <Button
                type="button"
                size={size === "sm" ? "sm" : "default"}
                onClick={primaryAction.onClick}
              >
                {primaryAction.icon && (
                  <span className="mr-1.5">{primaryAction.icon}</span>
                )}
                {primaryAction.label || t.primaryAction}
              </Button>
            )}
            {secondaryAction && (
              <Button
                type="button"
                variant="outline"
                size={size === "sm" ? "sm" : "default"}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label || t.secondaryAction}
              </Button>
            )}
          </div>
        )}

        {/* Suggestions / Checklist */}
        {suggestions && suggestions.length > 0 && (
          <div className="flex w-full max-w-xs flex-col items-start gap-1.5 border-t border-border pt-3 text-left">
            <span className="pb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t.recommended}:
            </span>
            {suggestions.map((sug, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                <span>{sug}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

EmptyAction.displayName = "EmptyAction"
