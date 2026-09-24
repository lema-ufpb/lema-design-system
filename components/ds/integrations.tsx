"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Input } from "@/components/ui/input"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { IntegrationTile, type IntegrationTileProps } from "./integration-tile"

// ── Types ──────────────────────────────────────────────────────────────────

export interface Integration extends Omit<
  IntegrationTileProps,
  "locale" | "loading" | "size"
> {
  id?: string
}

export interface IntegrationsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  integrations: Integration[]
  searchable?: boolean
  search?: string
  onSearchChange?: (value: string) => void
  locale?: UILocale
  loading?: boolean
  columns?: 3 | 4
}

// ── Component ──────────────────────────────────────────────────────────────

export function Integrations({
  className,
  title,
  description,
  integrations,
  searchable = false,
  search: controlledSearch,
  onSearchChange,
  locale: localeProp,
  loading = false,
  columns = 3,
  ...props
}: IntegrationsProps) {
  const locale = useUILocale(localeProp)
  const [internalSearch, setInternalSearch] = React.useState("")
  const isControlled = controlledSearch !== undefined
  const search = isControlled ? controlledSearch : internalSearch

  const handleChange = (v: string) => {
    if (!isControlled) setInternalSearch(v)
    onSearchChange?.(v)
  }

  const filtered = React.useMemo(() => {
    if (!search) return integrations
    const q = search.toLowerCase()
    return integrations.filter(
      (it) =>
        it.name.toLowerCase().includes(q) ||
        it.description?.toLowerCase().includes(q)
    )
  }, [integrations, search])

  const t = UI_I18N[locale].integrations

  return (
    <div
      data-slot="integrations"
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

      {searchable && (
        <Input
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          className="max-w-sm"
        />
      )}

      {loading ? (
        <div
          className={cn(
            "grid gap-4",
            columns === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <IntegrationTile key={i} name="loading" loading />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Empty className="py-8">
          <EmptyTitle>{t.noResults}</EmptyTitle>
          <EmptyDescription>{t.description}</EmptyDescription>
        </Empty>
      ) : (
        <div
          className={cn(
            "grid gap-4",
            columns === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {filtered.map((it) => (
            <IntegrationTile key={it.name} {...it} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
