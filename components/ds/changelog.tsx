"use client"

import * as React from "react"
import { format, type Locale } from "date-fns"
import { ptBR, enUS, es, fr } from "date-fns/locale"
import { Sparkles, Bug, Zap, AlertOctagon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

const dateFnsLocales: Record<UILocale, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
  "fr-FR": fr,
}

// ── Types ──

export type ChangeType = "feature" | "fix" | "improvement" | "breaking"

export interface ChangelogEntry {
  type: ChangeType
  description: React.ReactNode
}

export interface ChangelogRelease {
  version: string
  date: string | Date
  title: string
  isLatest?: boolean
  changes: ChangelogEntry[]
}

export interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Release list in descending chronological order.
   */
  releases: ChangelogRelease[]
  /**
   * Loading state.
   */
  loading?: boolean
  /**
   * Localization setting.
   */
  locale?: UILocale
}

// ── Component ──

export const Changelog = React.forwardRef<HTMLDivElement, ChangelogProps>(
  (
    { releases, loading = false, locale = "pt-BR", className, ...props },
    ref
  ) => {
    const t = UI_I18N[locale].changelog
    const dfLocale = dateFnsLocales[locale]

    const formatReleaseDate = (d: string | Date) => {
      if (typeof d === "string") return d
      return format(d, "PP", { locale: dfLocale })
    }

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn("flex w-full flex-col gap-8", className)}
          {...props}
        >
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-96" />
                <Skeleton className="h-4 w-80" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    const renderTypeBadge = (type: ChangeType) => {
      switch (type) {
        case "feature":
          return (
            <Badge
              variant="outline"
              className="h-4 shrink-0 gap-1 border-primary/25 bg-primary/10 px-1.5 py-0 text-xs font-semibold text-primary uppercase"
            >
              <Sparkles className="size-2.5" />
              {t.features}
            </Badge>
          )
        case "fix":
          return (
            <Badge
              variant="outline"
              className="h-4 shrink-0 gap-1 border-warning/30 bg-warning/10 px-1.5 py-0 text-xs font-semibold text-warning uppercase"
            >
              <Bug className="size-2.5" />
              {t.fixes}
            </Badge>
          )
        case "improvement":
          return (
            <Badge
              variant="outline"
              className="h-4 shrink-0 gap-1 border-success/30 bg-success/10 px-1.5 py-0 text-xs font-semibold text-success uppercase"
            >
              <Zap className="size-2.5" />
              {t.improvements}
            </Badge>
          )
        case "breaking":
          return (
            <Badge
              variant="destructive"
              className="h-4 shrink-0 gap-1 px-1.5 py-0 text-xs font-semibold uppercase"
            >
              <AlertOctagon className="size-2.5" />
              {t.breaking}
            </Badge>
          )
      }
    }

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full flex-col", className)}
        {...props}
      >
        {releases.map((rel, relIdx) => {
          const isLast = relIdx === releases.length - 1

          return (
            <div
              key={rel.version}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {/* Rail Line */}
              {!isLast && (
                <span
                  className="absolute top-8 -bottom-0 left-4 w-px -translate-x-1/2 bg-border"
                  aria-hidden="true"
                />
              )}

              {/* Version Bullet */}
              <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                <div
                  className={cn(
                    "size-2.5 rounded-full",
                    rel.isLatest
                      ? "bg-primary motion-safe:animate-pulse"
                      : "bg-muted-foreground/50"
                  )}
                />
              </div>

              {/* Release Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-base font-bold text-foreground">
                    {rel.version}
                  </span>
                  {rel.isLatest && (
                    <Badge variant="secondary" className="h-5 text-xs">
                      {t.latest}
                    </Badge>
                  )}
                  <time className="text-xs text-muted-foreground">
                    {formatReleaseDate(rel.date)}
                  </time>
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  {rel.title}
                </h3>

                <ul className="m-0 flex list-none flex-col gap-2 p-0 pt-1">
                  {rel.changes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      {renderTypeBadge(item.type)}
                      <span className="flex-1 leading-relaxed text-foreground">
                        {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

Changelog.displayName = "Changelog"
