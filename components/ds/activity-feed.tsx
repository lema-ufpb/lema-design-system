"use client"

import * as React from "react"
import { format, type Locale } from "date-fns"
import { ptBR, enUS, es, fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

const dateFnsLocales: Record<UILocale, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
  "fr-FR": fr,
}

// ── Types ──

export interface ActivityFeedItem {
  /**
   * Unique item identifier.
   */
  id: string
  /**
   * Actor performing the action.
   */
  actor: {
    name: string
    avatarUrl?: string
    initials?: string
  }
  /**
   * Action phrase describing the event (e.g. "updated the model").
   */
  action: string
  /**
   * Target resource name.
   */
  target?: string
  /**
   * Optional link to target resource.
   */
  targetHref?: string
  /**
   * Timestamp string or Date object.
   */
  timestamp: string | Date
  /**
   * Optional status severity.
   */
  status?: "default" | "success" | "warning" | "destructive"
  /**
   * Status label displayed in a Badge.
   */
  statusLabel?: string
  /**
   * Custom icon placed over or next to the node.
   */
  icon?: React.ReactNode
  /**
   * Extended description, code diff, or payload summary.
   */
  description?: React.ReactNode
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chronological list of events.
   */
  items: ActivityFeedItem[]
  /**
   * Loading state.
   */
  loading?: boolean
  /**
   * Message shown when items list is empty.
   */
  emptyMessage?: string
  /**
   * Callback fired when clicking the view more button.
   */
  onViewMore?: () => void
  /**
   * Locale for date formatting and labels.
   */
  locale?: UILocale
}

// ── Component ──

export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      items,
      loading = false,
      emptyMessage,
      onViewMore,
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].activityFeed
    const dfLocale = dateFnsLocales[locale]

    const formatTimestamp = (ts: string | Date) => {
      if (typeof ts === "string") return ts
      return format(ts, "PPp", { locale: dfLocale })
    }

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative flex items-start gap-3">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-1.5 pt-0.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-44" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
            className
          )}
          {...props}
        >
          {emptyMessage ?? t.empty}
        </div>
      )
    }

    const getInitials = (name: string, initials?: string) => {
      if (initials) return initials
      const parts = name.trim().split(" ")
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return (
      <div
        ref={ref}
        aria-label="Activity feed"
        className={cn("relative flex flex-col", className)}
        {...props}
      >
        <ul className="m-0 flex list-none flex-col p-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
                {!isLast && (
                  <span
                    className="absolute top-7 -bottom-0 left-3.5 w-px -translate-x-1/2 bg-border"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 shrink-0">
                  <Avatar className="size-7 border border-background">
                    {item.actor.avatarUrl && (
                      <AvatarImage
                        src={item.actor.avatarUrl}
                        alt={item.actor.name}
                      />
                    )}
                    <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                      {getInitials(item.actor.name, item.actor.initials)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-semibold text-foreground">
                      {item.actor.name}
                    </span>
                    <span className="text-muted-foreground">{item.action}</span>
                    {item.target &&
                      (item.targetHref ? (
                        <a
                          href={item.targetHref}
                          className="font-medium text-foreground hover:underline"
                        >
                          {item.target}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">
                          {item.target}
                        </span>
                      ))}
                    {item.statusLabel && (
                      <Badge
                        variant={
                          item.status === "destructive"
                            ? "destructive"
                            : item.status === "warning"
                              ? "outline"
                              : item.status === "success"
                                ? "secondary"
                                : "outline"
                        }
                        className={cn(
                          "h-4 px-1.5 py-0 text-xs font-normal",
                          item.status === "success" &&
                            "border-success/20 bg-success/15 text-success",
                          item.status === "warning" &&
                            "border-warning text-warning"
                        )}
                      >
                        {item.statusLabel}
                      </Badge>
                    )}
                  </div>

                  <time className="text-xs text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </time>

                  {item.description && (
                    <div className="mt-1.5 rounded-md border border-border bg-muted/40 p-2 text-xs text-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        {onViewMore && (
          <div className="flex justify-center pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onViewMore}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t.viewMore}
            </Button>
          </div>
        )}
      </div>
    )
  }
)

ActivityFeed.displayName = "ActivityFeed"
