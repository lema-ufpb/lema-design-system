"use client"

import * as React from "react"
import { Check, Loader2, MapPin, X } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──────────────────────────────────────────────────────────────────

export interface LocationSuggestion {
  id: string
  label: string
  description?: string
  lat?: number
  lng?: number
  /** Additional metadata (city, state, country, etc.) */
  meta?: Record<string, string>
}

export interface LocationPickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: LocationSuggestion | null
  onChange?: (value: LocationSuggestion | null) => void
  /**
   * Async search function — called with the query string.
   * Should return a list of suggestions.
   * Connect any API here: Google Places, Mapbox, ViaCEP, etc.
   */
  onSearch?: (query: string) => Promise<LocationSuggestion[]>
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const locationPickerContainerVariants = cva("relative w-full", {
  variants: {},
})

export const locationPickerTriggerVariants = cva(
  [
    "flex h-9 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 py-2",
    "text-sm text-foreground ring-offset-background",
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {},
  }
)

// ── LocationPicker ─────────────────────────────────────────────────────────

export function LocationPicker({
  value,
  onChange,
  onSearch,
  placeholder = "Select location…",
  searchPlaceholder = "Search address…",
  disabled = false,
  loading = false,
  clearable = true,
  locale: localeProp,
  className,
  ...props
}: LocationPickerProps) {
  const locale = useUILocale(localeProp)
  void locale
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [suggestions, setSuggestions] = React.useState<LocationSuggestion[]>([])
  const [searching, setSearching] = React.useState(false)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = React.useCallback(
    (q: string) => {
      setQuery(q)
      if (!onSearch) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (!q.trim()) {
        setSuggestions([])
        return
      }
      setSearching(true)
      debounceRef.current = setTimeout(async () => {
        try {
          const results = await onSearch(q)
          setSuggestions(results)
        } catch {
          setSuggestions([])
        } finally {
          setSearching(false)
        }
      }, 300)
    },
    [onSearch]
  )

  const handleSelect = (suggestion: LocationSuggestion) => {
    onChange?.(suggestion)
    setOpen(false)
    setQuery("")
    setSuggestions([])
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null)
  }

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return <Skeleton className={cn("h-9 w-full rounded-lg", className)} />
  }

  return (
    <div
      className={cn(locationPickerContainerVariants(), className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            locationPickerTriggerVariants(),
            disabled && "pointer-events-none"
          )}
        >
          <PopoverTrigger asChild>
            <div
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 outline-none"
              role="button"
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label={placeholder}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  if (!disabled) setOpen(true)
                }
              }}
            >
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              {value ? (
                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                  <span className="flex-1 truncate text-foreground">
                    {value.label}
                  </span>
                  {value.description && (
                    <span className="shrink-0 truncate text-xs text-muted-foreground">
                      {value.description}
                    </span>
                  )}
                </div>
              ) : (
                <span className="flex-1 text-muted-foreground">
                  {placeholder}
                </span>
              )}
            </div>
          </PopoverTrigger>
          {clearable && value && (
            <Button
              variant="ghost"
              size="icon"
              className="size-5 shrink-0"
              onClick={handleClear}
              aria-label="Clear location"
            >
              <X className="size-3" />
            </Button>
          )}
        </div>
        <PopoverContent
          className="w-full min-w-72 p-0"
          align="start"
          side="bottom"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={query}
              onValueChange={handleSearch}
            />
            <CommandList>
              {searching && (
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" />
                  Searching…
                </div>
              )}
              {!searching && query && suggestions.length === 0 && (
                <CommandEmpty>
                  {onSearch ? "No results found." : "Start typing to search."}
                </CommandEmpty>
              )}
              {!searching && suggestions.length > 0 && (
                <CommandGroup>
                  {suggestions.map((s) => (
                    <CommandItem
                      key={s.id}
                      value={s.id}
                      onSelect={() => handleSelect(s)}
                      className="flex items-start gap-3 py-2"
                    >
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="truncate text-sm font-medium">
                          {s.label}
                        </span>
                        {s.description && (
                          <span className="truncate text-xs text-muted-foreground">
                            {s.description}
                          </span>
                        )}
                        {s.meta && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {Object.entries(s.meta).map(([k, v]) => (
                              <Badge
                                key={k}
                                variant="secondary"
                                className="px-1 py-0 text-xs"
                              >
                                {v}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {value?.id === s.id && (
                        <Check className="ml-auto size-4 shrink-0 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {!query && !searching && !value && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Type an address to search
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected meta badges */}
      {value?.meta && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {Object.entries(value.meta).map(([k, v]) => (
            <Badge key={k} variant="outline" className="text-xs">
              {k}: {v}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
