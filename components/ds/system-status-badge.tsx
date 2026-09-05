import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type SystemHealthStatus =
  "operational" | "degraded" | "outage" | "maintenance"

export interface SystemStatusBadgeProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof systemStatusBadgeVariants> {
  status?: SystemHealthStatus
  label?: string
  uptime?: string
  href?: string
  locale?: UILocale
}

// ── Variants ──

export const systemStatusBadgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-colors",
  {
    variants: {
      size: {
        sm: "h-6 px-2 text-[11px]",
        md: "h-7 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const STATUS_CONFIG: Record<
  SystemHealthStatus,
  {
    dotClass: string
    pingClass: string
    textClass: string
    key:
      | "allSystemsOperational"
      | "degradedPerformance"
      | "majorOutage"
      | "underMaintenance"
  }
> = {
  operational: {
    dotClass: "bg-success",
    pingClass: "bg-success/75",
    textClass: "text-foreground",
    key: "allSystemsOperational",
  },
  degraded: {
    dotClass: "bg-warning",
    pingClass: "bg-warning/75",
    textClass: "text-warning",
    key: "degradedPerformance",
  },
  outage: {
    dotClass: "bg-destructive",
    pingClass: "bg-destructive/75",
    textClass: "text-destructive",
    key: "majorOutage",
  },
  maintenance: {
    dotClass: "bg-primary",
    pingClass: "bg-primary/75",
    textClass: "text-foreground",
    key: "underMaintenance",
  },
}

// ── Component ──

export const SystemStatusBadge = React.forwardRef<
  HTMLElement,
  SystemStatusBadgeProps
>(
  (
    {
      status = "operational",
      label,
      uptime,
      href,
      size = "md",
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].footer
    const config = STATUS_CONFIG[status]
    const displayLabel = label || t[config.key]

    const content = (
      <>
        <span className="relative flex size-2 shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              config.pingClass
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "relative inline-flex size-2 rounded-full",
              config.dotClass
            )}
            aria-hidden="true"
          />
        </span>

        <span className={cn("truncate font-medium", config.textClass)}>
          {displayLabel}
        </span>

        {uptime && <span className="text-muted-foreground">· {uptime}</span>}

        {href && (
          <ExternalLinkIcon
            className="size-3 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )}
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            systemStatusBadgeVariants({ size }),
            "group cursor-pointer hover:border-foreground/20 hover:bg-muted/60",
            className
          )}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(systemStatusBadgeVariants({ size }), className)}
        {...props}
      >
        {content}
      </span>
    )
  }
)
SystemStatusBadge.displayName = "SystemStatusBadge"
