"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { TeamCard, type TeamCardProps } from "./team-card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TeamMember extends Omit<TeamCardProps, "size" | "loading"> {
  id?: string
}

export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  members: TeamMember[]
  columns?: 3 | 4
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function TeamGrid({
  className,
  title,
  description,
  members,
  columns = 3,
  locale = "en-US",
  loading = false,
  ...props
}: TeamGridProps) {
  const t = UI_I18N[locale].team

  return (
    <div
      data-slot="team-grid"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground md:text-3xl">
          {title ?? t.title}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground">
          {description ?? t.description}
        </p>
      </div>

      {loading ? (
        <div
          className={cn(
            "grid gap-6",
            columns === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <TeamCard key={i} name="loading" loading />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            columns === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {members.map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      )}
    </div>
  )
}
