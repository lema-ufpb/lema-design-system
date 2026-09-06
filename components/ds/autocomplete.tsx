"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { CheckIcon, SearchIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface AutocompleteOption {
  label: string
  value: string
}

export interface AutocompleteProps extends React.HTMLAttributes<HTMLDivElement> {
  options: AutocompleteOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Autocomplete({
  className,
  options,
  value,
  onValueChange,
  placeholder = "Search...",
  loading = false,
  ...props
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const listboxId = React.useId()
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  )
  const displayValue = value
    ? (options.find((o) => o.value === value)?.label ?? query)
    : query

  return (
    <div
      data-slot="autocomplete"
      className={cn("w-full", className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={
                activeIndex >= 0
                  ? `${listboxId}-${filtered[activeIndex]?.value}`
                  : undefined
              }
              aria-autocomplete="list"
              aria-label={placeholder}
              placeholder={placeholder}
              value={displayValue}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(-1)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault()
                  setActiveIndex((i) => Math.max(i - 1, 0))
                }
                if (e.key === "Enter" && activeIndex >= 0) {
                  const opt = filtered[activeIndex]
                  if (opt) {
                    onValueChange?.(opt.value)
                    setQuery(opt.label)
                    setOpen(false)
                  }
                }
                if (e.key === "Escape") setOpen(false)
              }}
              className="pl-9"
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-[var(--radix-popover-anchor-width)] p-1"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {loading ? (
            <div className="flex flex-col gap-1 p-1">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          ) : filtered.length === 0 ? (
            <span className="p-2 text-xs text-muted-foreground">
              No results
            </span>
          ) : (
            <div id={listboxId} role="listbox" className="flex flex-col gap-1">
              {filtered.map((opt, idx) => (
                <button
                  key={opt.value}
                  id={`${listboxId}-${opt.value}`}
                  type="button"
                  role="option"
                  aria-selected={value === opt.value}
                  data-active={idx === activeIndex ? "true" : undefined}
                  onClick={() => {
                    onValueChange?.(opt.value)
                    setQuery(opt.label)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    value === opt.value && "bg-muted",
                    idx === activeIndex && "bg-muted"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && (
                    <CheckIcon className="size-3.5" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
