"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

export function Autocomplete({ className, options, value, onValueChange, placeholder = "Search...", loading = false, ...props }: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <div data-slot="autocomplete" className={cn("w-full", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              value={value ?? query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              className="pl-9"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1" align="start">
          {loading ? (
            <div className="flex flex-col gap-1 p-1">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          ) : filtered.length === 0 ? (
            <span className="p-2 text-xs text-muted-foreground">No results</span>
          ) : (
            <div className="flex flex-col gap-1">
              {filtered.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onValueChange?.(opt.value)
                    setQuery(opt.label)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                    value === opt.value && "bg-muted"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && <CheckIcon className="size-3" />}
                </button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
