"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Faqs, type FaqsProps } from "./faqs"
import { type AccordionItem } from "./accordion"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FaqsTabsGroup {
  id: string
  label: string
  items: AccordionItem[]
}

export interface FaqsTabsProps extends Omit<FaqsProps, "items"> {
  groups: FaqsTabsGroup[]
  defaultGroup?: string
}

// ── Component ──────────────────────────────────────────────────────────────

export function FaqsTabs({
  className,
  groups,
  defaultGroup,
  title,
  description,
  searchable = false,
  search,
  onSearchChange,
  iconVariant,
  size = "md",
  locale = "en-US",
  loading = false,
  ...props
}: FaqsTabsProps) {
  const [active, setActive] = React.useState(defaultGroup ?? groups[0]?.id)

  return (
    <div data-slot="faqs-tabs" className={cn("flex flex-col gap-6", className)} {...props}>
      <Tabs value={active} onValueChange={setActive}>
        <TabsList>
          {groups.map((g) => (
            <TabsTrigger key={g.id} value={g.id}>
              {g.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g.id} value={g.id} className="mt-6">
            <Faqs
              title={title}
              description={description}
              items={g.items}
              searchable={searchable}
              search={search}
              onSearchChange={onSearchChange}
              iconVariant={iconVariant}
              size={size}
              locale={locale}
              loading={loading}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
