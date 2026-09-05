"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Input } from "@/components/ui/input"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Accordion, type AccordionItem } from "./accordion"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FaqsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof faqsVariants> {
  title?: string
  description?: string
  items: AccordionItem[]
  searchable?: boolean
  search?: string
  onSearchChange?: (value: string) => void
  iconVariant?: "chevron" | "plus" | "arrow" | "sign"
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const faqsVariants = cva("flex flex-col gap-6", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: { size: "md" },
})

export const faqsTitleVariants = cva("font-bold tracking-tight text-balance", {
  variants: {
    size: {
      sm: "text-lg",
      md: "text-2xl",
      lg: "text-3xl",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Faqs({
  className,
  title,
  description,
  items,
  searchable = false,
  search: controlledSearch,
  onSearchChange,
  iconVariant = "chevron",
  size = "md",
  locale = "en-US",
  loading = false,
  ...props
}: FaqsProps) {
  const [internalSearch, setInternalSearch] = React.useState("")
  const isControlled = controlledSearch !== undefined
  const search = isControlled ? controlledSearch : internalSearch

  const handleSearchChange = (v: string) => {
    if (!isControlled) setInternalSearch(v)
    onSearchChange?.(v)
  }

  const filtered = React.useMemo(() => {
    if (!searchable || !search) return items
    const q = search.toLowerCase()
    return items.filter(
      (it) =>
        it.trigger.toLowerCase().includes(q) ||
        String(it.children).toLowerCase().includes(q)
    )
  }, [items, searchable, search])

  const t = UI_I18N[locale].faqs
  const resolvedTitle = title ?? t.title
  const resolvedDesc = description ?? t.description

  return (
    <div data-slot="faqs" className={cn(faqsVariants({ size }), className)} {...props}>
      <div className="flex flex-col gap-2">
        <h2 className={cn(faqsTitleVariants({ size }), "text-foreground")}>{resolvedTitle}</h2>
        {resolvedDesc && <p className="max-w-prose text-sm leading-relaxed text-muted-foreground text-pretty">{resolvedDesc}</p>}
      </div>

      {searchable && (
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {loading ? (
        <Accordion items={items.slice(0, 3)} loading loadingCount={3} size={size} iconVariant={iconVariant} />
      ) : filtered.length === 0 ? (
        <Empty className="py-8">
          <EmptyTitle>{t.noResults}</EmptyTitle>
          <EmptyDescription>{t.noResultsDescription}</EmptyDescription>
        </Empty>
      ) : (
        <Accordion items={filtered} size={size} iconVariant={iconVariant} />
      )}
    </div>
  )
}
