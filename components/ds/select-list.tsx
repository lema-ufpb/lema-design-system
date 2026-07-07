"use client"

import * as React from "react"
import { Search, X, Check } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Empty } from "@/components/ds/empty"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SelectListItem {
  id: string | number
  name: string
  icon?: ReactNode
  iconColor?: string
  group?: string
  value?: string | number
  slug?: string
}

export interface SelectListProps
  extends
    VariantProps<typeof selectListContainerVariants>,
    Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: SelectListItem[]
  selectedId?: string | number
  height?: number
  size?: "sm" | "md" | "lg"
  debounce?: number
  placeholder?: string
  intent?: "default" | "primary" | "secondary" | "destructive"
  disabled?: boolean
  loading?: boolean
  onSelect: (item: SelectListItem) => void
  onSearch?: (value: string) => void
  search?: string
  emptyMessage?: string
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const selectListContainerVariants = cva(
  "relative flex w-full flex-col gap-4 font-sans transition-all duration-300 outline-none",
  {
    variants: {
      disabled: { true: "pointer-events-none cursor-not-allowed opacity-50" },
      loading: { true: "pointer-events-none" },
    },
    defaultVariants: { disabled: false },
  }
)

export const selectListItemVariants = cva(
  "group flex cursor-default items-center justify-between border-b border-border transition-colors duration-150 last:border-b-0",
  {
    variants: {
      isSelected: {
        true: "bg-muted/50",
        false: "bg-background hover:bg-muted/30",
      },
      size: {
        sm: "gap-2 px-3 py-3",
        md: "gap-2 px-4 py-4",
        lg: "gap-3 px-5 py-5",
      },
      intent: {
        default: "",
        primary: "",
        secondary: "",
        destructive: "",
      },
    },
    compoundVariants: [
      { isSelected: true, intent: "primary", className: "bg-primary/10" },
      { isSelected: false, intent: "primary", className: "hover:bg-primary/5" },
      { isSelected: true, intent: "secondary", className: "bg-secondary/10" },
      {
        isSelected: false,
        intent: "secondary",
        className: "hover:bg-secondary/5",
      },
    ],
    defaultVariants: { isSelected: false, size: "md", intent: "default" },
  }
)

// ── SelectList ─────────────────────────────────────────────────────────────

const ITEM_ESTIMATE_SIZE: Record<"sm" | "md" | "lg", number> = {
  sm: 60,
  md: 72,
  lg: 84,
}

export function SelectList({
  data,
  selectedId,
  height = 300,
  debounce = 300,
  placeholder = "Search...",
  intent = "primary",
  size = "md",
  onSelect,
  onSearch,
  search: searchProp,
  disabled = false,
  loading = false,
  locale = "en-US",
  emptyMessage = "No results found",
  className,
  ...props
}: SelectListProps) {
  const [inputValue, setInputValue] = React.useState(searchProp || "")
  const debounceRef = React.useRef<NodeJS.Timeout>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (searchProp !== undefined) setInputValue(searchProp)
  }, [searchProp])

  const handleChange = (value: string) => {
    setInputValue(value)
    if (onSearch) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => onSearch(value), debounce)
    }
  }

  const handleClear = () => {
    setInputValue("")
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (onSearch) onSearch("")
    inputRef.current?.focus()
  }

  const filteredData = React.useMemo(() => {
    if (onSearch) return data
    if (!inputValue) return data
    return data.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [data, inputValue, onSearch])

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ITEM_ESTIMATE_SIZE[size ?? "md"],
    overscan: 5,
  })

  const renderItem = (
    item: SelectListItem,
    isSelected: boolean,
    isLast = false
  ) => (
    <div
      className={cn(
        selectListItemVariants({
          isSelected,
          size,
          intent: isSelected ? intent : undefined,
        }),
        isLast && "border-b-0"
      )}
      data-slot="select-list-item"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 pr-4">
        {item.icon && (
          <div
            className="flex shrink-0 items-center justify-center text-muted-foreground"
            style={{ color: item.iconColor }}
            data-slot="select-list-item-icon"
          >
            {item.icon}
          </div>
        )}
        <div className="flex min-w-0 flex-col">
          <span
            className="truncate font-semibold text-foreground"
            title={item.name}
            data-slot="select-list-item-name"
          >
            {item.name}
          </span>
          {(item.group || item.value) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {item.group && <span>{item.group}</span>}
              {item.group && item.value && <span>•</span>}
              {item.value && <span>{item.value}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0">
        {isSelected ? (
          <Badge
            variant={
              intent === "primary"
                ? "default"
                : intent === "default"
                  ? "secondary"
                  : intent
            }
            data-slot="select-list-selected-badge"
            className="pointer-events-none flex h-8 items-center gap-1.5 rounded-full px-4 py-1 text-sm"
          >
            <Check className="size-3" />
            <span>{UI_I18N[locale].selectList.selected}</span>
          </Badge>
        ) : (
          <Button
            size="sm"
            variant={
              intent === "primary"
                ? "default"
                : intent === "default"
                  ? "outline"
                  : intent
            }
            data-slot="select-list-select-button"
            className="rounded-full"
            onClick={() => !disabled && onSelect(item)}
            disabled={disabled || loading}
            aria-label={`${UI_I18N[locale].selectList.select} ${item.name}`}
          >
            {UI_I18N[locale].selectList.select}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        selectListContainerVariants({ disabled, loading }),
        className
      )}
      aria-busy={loading}
      data-slot="select-list"
      {...props}
    >
      <div className="relative flex w-full items-center">
        <Search className="absolute left-3 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || loading}
          data-slot="select-list-search"
          className="pr-9 pl-9"
        />
        {inputValue && !disabled && !loading && (
          <button
            onClick={handleClear}
            className="absolute right-3 flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            aria-label={UI_I18N[locale].selectList.clearSearch}
          >
            <X className="size-3" />
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-md border shadow-sm">
        {loading && filteredData.length === 0 ? (
          <div className="flex flex-col p-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex items-center justify-between border-b p-4 last:border-0"
                data-slot="select-list-skeleton"
              >
                <div className="flex flex-1 items-center gap-3">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-30" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          <div
            style={{ minHeight: height }}
            className="flex items-center justify-center"
            data-slot="select-list-empty"
          >
            <Empty
              variant="no-results"
              title={emptyMessage}
              compact
              locale={locale}
            />
          </div>
        ) : (
          <div
            ref={scrollRef}
            style={{ height, overflowY: "auto" }}
            className="w-full"
            data-slot="select-list-list"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = filteredData[virtualItem.index]
                const isLast = virtualItem.index === filteredData.length - 1
                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    {renderItem(item, selectedId === item.id, isLast)}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
