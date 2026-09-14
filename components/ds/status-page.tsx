"use client"

import * as React from "react"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface ServiceDayStatus {
  date: string
  status: "operational" | "degraded" | "outage"
}

export interface StatusService {
  id: string
  name: string
  description?: string
  status: "operational" | "degraded" | "outage"
  uptimePercentage?: number
  history?: ServiceDayStatus[]
}

export interface StatusIncident {
  id: string
  title: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  date: string
  description: string
}

export interface StatusPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * List of monitored services.
   */
  services: StatusService[]
  /**
   * System overall status.
   */
  overallStatus?: "operational" | "degraded" | "outage"
  /**
   * Whether to display 90-day uptime bars.
   */
  showUptimeBars?: boolean
  /**
   * List of recent incidents.
   */
  incidents?: StatusIncident[]
  /**
   * Loading state.
   */
  loading?: boolean
  /**
   * Locale for labels and messages.
   */
  locale?: UILocale
}

// ── Component ──

export const StatusPage = React.forwardRef<HTMLDivElement, StatusPageProps>(
  (
    {
      services,
      overallStatus = "operational",
      showUptimeBars = true,
      incidents,
      loading = false,
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].statusPage

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn("flex w-full flex-col gap-6", className)}
          {...props}
        >
          <Skeleton className="h-16 w-full rounded-xl" />
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      )
    }

    const getStatusColor = (st: "operational" | "degraded" | "outage") => {
      switch (st) {
        case "operational":
          return "bg-success"
        case "degraded":
          return "bg-warning"
        case "outage":
          return "bg-destructive"
      }
    }

    const getStatusBadge = (st: "operational" | "degraded" | "outage") => {
      switch (st) {
        case "operational":
          return (
            <Badge
              variant="outline"
              className="gap-1 border-success/30 bg-success/10 text-xs text-success"
            >
              <CheckCircle2 className="size-3.5" />
              {t.operational}
            </Badge>
          )
        case "degraded":
          return (
            <Badge
              variant="outline"
              className="gap-1 border-warning/30 bg-warning/10 text-xs text-warning"
            >
              <AlertTriangle className="size-3.5" />
              {t.degraded}
            </Badge>
          )
        case "outage":
          return (
            <Badge
              variant="outline"
              className="gap-1 border-destructive/30 bg-destructive/10 text-xs text-destructive"
            >
              <XCircle className="size-3.5" />
              {t.outage}
            </Badge>
          )
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-6", className)}
        {...props}
      >
        {/* Overall Status Banner */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border p-4",
            overallStatus === "operational" &&
              "border-success/30 bg-success/10 text-success",
            overallStatus === "degraded" &&
              "border-warning/30 bg-warning/10 text-warning",
            overallStatus === "outage" &&
              "border-destructive/30 bg-destructive/10 text-destructive"
          )}
        >
          {overallStatus === "operational" && (
            <CheckCircle2 className="size-6 shrink-0" />
          )}
          {overallStatus === "degraded" && (
            <AlertTriangle className="size-6 shrink-0" />
          )}
          {overallStatus === "outage" && (
            <XCircle className="size-6 shrink-0" />
          )}
          <span className="text-base font-semibold">
            {overallStatus === "operational" && t.allOperational}
            {overallStatus === "degraded" && t.degradedPerformance}
            {overallStatus === "outage" && t.majorOutage}
          </span>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-3">
          {services.map((srv) => {
            const history =
              srv.history && srv.history.length > 0
                ? srv.history
                : Array.from({ length: 90 }, (_, idx) => ({
                    date: `Day ${idx + 1}`,
                    status: srv.status,
                  }))

            return (
              <div
                key={srv.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {srv.name}
                    </span>
                    {srv.description && (
                      <span className="truncate text-xs text-muted-foreground">
                        {srv.description}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0">{getStatusBadge(srv.status)}</div>
                </div>

                {showUptimeBars && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex w-full items-center gap-0.5">
                      {history.slice(-90).map((day, idx) => (
                        <div
                          key={idx}
                          title={`${day.date}: ${day.status}`}
                          className={cn(
                            "h-6 flex-1 cursor-default rounded-xs transition-opacity hover:opacity-75",
                            getStatusColor(day.status)
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.daysAgo90}</span>
                      {srv.uptimePercentage !== undefined && (
                        <span className="font-semibold text-foreground tabular-nums">
                          {srv.uptimePercentage}% uptime
                        </span>
                      )}
                      <span>{t.today}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Incidents Section */}
        {incidents && incidents.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <h2 className="text-sm font-semibold text-foreground">
              Incidentes Recentes
            </h2>
            <div className="flex flex-col gap-3">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      {inc.title}
                    </span>
                    <span className="text-muted-foreground">{inc.date}</span>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    {inc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

StatusPage.displayName = "StatusPage"
