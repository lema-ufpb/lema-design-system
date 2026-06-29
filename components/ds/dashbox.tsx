"use client"

import * as React from "react"
import { Minus, Plus, Maximize2, RefreshCw, Shrink } from "lucide-react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

// ── Types ──────────────────────────────────────────────────────────────────

export type DashboxSize = "sm" | "md" | "lg"
export type DashboxBodyPadding = "none" | "sm" | "md" | "lg"
export type DashboxStatus = "live" | "warning" | "error" | "idle"
export type DashboxLocale = UILocale

export interface DashboxProps
  extends VariantProps<typeof dashboxVariants>, HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children?: ReactNode
  toolbar?: ReactNode
  /** @default 'md' */
  bodyPadding?: DashboxBodyPadding
  loading?: boolean
  status?: DashboxStatus
  locale?: DashboxLocale
  /** Override status label per instance (e.g. from API data) */
  statusLabels?: Partial<Record<DashboxStatus, string>>
  onRefresh?: () => void
  /** @default true */
  showMaximize?: boolean
  /** @default true */
  showMinimize?: boolean
  /** @default true */
  showToolbar?: boolean
  /** @default true */
  showHeader?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const dashboxVariants = cva(
  [
    "flex w-full flex-col",
    "bg-card text-card-foreground",
    "rounded-xl border border-border",
    "overflow-hidden shadow-sm transition-all duration-300",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const dashboxHeaderVariants = cva([
  "flex items-start justify-between gap-3 px-4 py-3",
  "shrink-0 bg-card",
])

export const dashboxTitleVariants = cva(
  "leading-tight font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const dashboxDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "mt-0.5 text-xs",
      md: "mt-0.5 text-sm",
      lg: "mt-1 text-base",
    },
  },
  defaultVariants: { size: "md" },
})

export const dashboxToolbarVariants = cva(
  "ml-auto flex shrink-0 items-center gap-0.5"
)

export const dashboxToolbarButtonVariants = cva([
  "flex size-7 items-center justify-center rounded-md",
  "text-muted-foreground",
  "hover:bg-accent hover:text-accent-foreground",
  "cursor-pointer transition-colors duration-150",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none",
])

export const dashboxBodyVariants = cva("min-h-0 flex-1 overflow-auto", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: { padding: "md" },
})

export const dashboxStatusBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        live: "border-success/20 bg-success/10 text-success",
        warning: "border-warning/20 bg-warning/10 text-warning",
        error: "border-destructive/20 bg-destructive/10 text-destructive",
        idle: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { status: "idle" },
  }
)

const titleSkeletonH: Record<DashboxSize, string> = {
  sm: "h-3",
  md: "h-3.5",
  lg: "h-4",
}

// ── Private subcomponents ──────────────────────────────────────────────────

const STATUS_DOT: Record<string, string> = {
  live: "bg-success animate-pulse",
  warning: "bg-warning",
  error: "bg-destructive",
  idle: "bg-muted-foreground/40",
}

function DashboxStatusBadge({
  status,
  label,
  locale = "en-US",
  statusLabels,
}: {
  status?: DashboxStatus
  label?: string
  locale?: DashboxLocale
  statusLabels?: Partial<Record<string, string>>
}) {
  if (!status || status === "idle") return null
  const labels = { ...UI_I18N[locale].dashbox.status, ...statusLabels }
  return (
    <span
      data-slot="dashbox-status"
      className={dashboxStatusBadgeVariants({ status })}
    >
      <span className={cn("size-1.5 rounded-full", STATUS_DOT[status])} />
      {label ?? labels[status] ?? status}
    </span>
  )
}

function ToolbarButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          data-slot="dashbox-toolbar-button"
          type="button"
          onClick={onClick}
          aria-label={label}
          className={cn(dashboxToolbarButtonVariants(), className)}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

// ── Dashbox ────────────────────────────────────────────────────────────────

export const Dashbox = React.forwardRef<HTMLDivElement, DashboxProps>(
  (
    {
      title,
      description,
      children,
      toolbar,
      size = "md",
      bodyPadding = "md",
      loading = false,
      status,
      locale = "en-US",
      statusLabels,
      onRefresh,
      showToolbar = true,
      showHeader = true,
      showMaximize = true,
      showMinimize = true,
      className,
      ...props
    },
    ref
  ) => {
    const [minimized, setMinimized] = React.useState(false)
    const [maximized, setMaximized] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)

    const tl = UI_I18N[locale].dashbox.toolbar

    const handleRefresh = React.useCallback(async () => {
      setRefreshing(true)
      await onRefresh?.()
      setTimeout(() => setRefreshing(false), 600)
    }, [onRefresh])

    return (
      <TooltipProvider delayDuration={300}>
        <div
          ref={ref}
          data-slot="dashbox"
          className={cn(
            dashboxVariants({ size }),
            maximized && "fixed! inset-0 z-9999 rounded-none",
            className
          )}
          {...props}
        >
          {showHeader && (
            <div data-slot="dashbox-header" className={dashboxHeaderVariants()}>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  {loading ? (
                    <Skeleton
                      data-slot="dashbox-title-skeleton"
                      className={cn(titleSkeletonH[size ?? "md"], "w-2/5")}
                    />
                  ) : (
                    title && (
                      <span
                        data-slot="dashbox-title"
                        className={dashboxTitleVariants({ size })}
                        title={title}
                      >
                        {title}
                      </span>
                    )
                  )}
                  {!loading && status && (
                    <DashboxStatusBadge
                      status={status}
                      locale={locale}
                      statusLabels={statusLabels}
                    />
                  )}
                </div>
                {loading ? (
                  <Skeleton
                    data-slot="dashbox-description-skeleton"
                    className={cn(
                      "mt-0.5",
                      titleSkeletonH[size ?? "md"],
                      "w-3/5"
                    )}
                  />
                ) : (
                  description && (
                    <span
                      data-slot="dashbox-description"
                      className={dashboxDescriptionVariants({ size })}
                    >
                      {description}
                    </span>
                  )
                )}
              </div>

              {showToolbar && (
                <div
                  data-slot="dashbox-toolbar"
                  className={cn(dashboxToolbarVariants(), "shrink-0")}
                >
                  {loading ? (
                    <>
                      {toolbar != null && (
                        <Skeleton className="size-7 rounded-md" />
                      )}
                      {onRefresh && <Skeleton className="size-7 rounded-md" />}
                      {showMinimize && (
                        <Skeleton className="size-7 rounded-md" />
                      )}
                      {showMaximize && (
                        <Skeleton className="size-7 rounded-md" />
                      )}
                    </>
                  ) : (
                    <>
                      {toolbar}

                      {onRefresh && (
                        <ToolbarButton
                          label={tl.refresh}
                          onClick={handleRefresh}
                        >
                          <RefreshCw
                            className={cn(
                              "size-3.5",
                              refreshing && "animate-spin"
                            )}
                          />
                        </ToolbarButton>
                      )}

                      {showMinimize &&
                        !maximized &&
                        (minimized ? (
                          <ToolbarButton
                            label={tl.expand}
                            onClick={() => setMinimized(false)}
                          >
                            <Plus className="size-3.5" />
                          </ToolbarButton>
                        ) : (
                          <ToolbarButton
                            label={tl.collapse}
                            onClick={() => setMinimized(true)}
                          >
                            <Minus className="size-3.5" />
                          </ToolbarButton>
                        ))}

                      {showMaximize &&
                        !minimized &&
                        (maximized ? (
                          <ToolbarButton
                            label={tl.restore}
                            onClick={() => setMaximized(false)}
                          >
                            <Shrink className="size-3.5" />
                          </ToolbarButton>
                        ) : (
                          <ToolbarButton
                            label={tl.fullscreen}
                            onClick={() => setMaximized(true)}
                          >
                            <Maximize2 className="size-3.5" />
                          </ToolbarButton>
                        ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {showHeader && <Separator />}

          {!minimized && (
            <div
              data-slot="dashbox-body"
              className={cn(dashboxBodyVariants({ padding: bodyPadding }))}
            >
              {loading ? (
                <div
                  data-slot="dashbox-skeleton"
                  className="flex flex-col gap-3"
                >
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                children
              )}
            </div>
          )}
        </div>
      </TooltipProvider>
    )
  }
)

Dashbox.displayName = "Dashbox"
