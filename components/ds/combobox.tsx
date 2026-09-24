"use client"

import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export type ComboboxValue = string | number

export interface ComboboxOption {
  value: ComboboxValue
  label: string
  disabled?: boolean
  group?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const comboboxTriggerVariants = cva(
  "w-full min-w-0 justify-between font-normal",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 px-4 text-base",
      },
      rounded: {
        full: "",
        md: "rounded-lg",
        none: "rounded-none",
      },
    },
    defaultVariants: { size: "md", rounded: "md" },
  }
)

const CONTENT_ROUNDED: Record<string, string> = {
  full: "rounded-xl",
  md: "rounded-xl",
  none: "rounded-none",
}

const ITEM_ROUNDED: Record<string, string> = {
  full: "rounded-full",
  md: "rounded-md",
  none: "rounded-none",
}

const ITEM_HEIGHT: Record<string, number> = { sm: 32, md: 36, lg: 40 }
const ITEM_TEXT: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}
const SEARCH_HEIGHT: Record<string, string> = {
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
}
const SEARCH_TEXT: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}
const HEADER_HEIGHT = 28
const LIST_MAX_HEIGHT = 300
const OVERSCAN = 6
const EMPTY_VALUES: ComboboxValue[] = []

// ── Virtual row model ──────────────────────────────────────────────────────

type VirtualRow =
  | { kind: "header"; label: string }
  | { kind: "option"; option: ComboboxOption; optionIndex: number }

function buildVirtualRows(
  options: ComboboxOption[],
  query: string
): { rows: VirtualRow[]; filtered: ComboboxOption[] } {
  const q = query.trim().toLowerCase()
  const filtered = q
    ? options.filter((o) => o.label.toLowerCase().includes(q))
    : options

  const hasGroups = filtered.some((o) => o.group)
  if (!hasGroups) {
    return {
      filtered,
      rows: filtered.map((option, i) => ({
        kind: "option",
        option,
        optionIndex: i,
      })),
    }
  }

  const grouped = new Map<string, ComboboxOption[]>()
  for (const opt of filtered) {
    const key = opt.group ?? ""
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(opt)
  }

  const rows: VirtualRow[] = []
  let idx = 0
  for (const [label, opts] of grouped) {
    if (label) rows.push({ kind: "header", label })
    for (const option of opts) {
      rows.push({ kind: "option", option, optionIndex: idx++ })
    }
  }
  return { rows, filtered }
}

// ── DropdownContent ────────────────────────────────────────────────────────
// Lives inside PopoverContent — unmounts on close, so useVirtualizer is
// always fresh on the next open (avoids stale scrollRect from ResizeObserver).

interface DropdownContentProps {
  rows: VirtualRow[]
  filtered: ComboboxOption[]
  totalOptions: number
  itemHeight: number
  searchable: boolean
  searchPlaceholder: string
  query: string
  onQueryChange: (q: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  multiple: boolean
  selectedSingle: ComboboxValue | null
  selectedMulti: ComboboxValue[]
  activeOptionIndex: number
  onSelect: (opt: ComboboxOption) => void
  onHover: (index: number) => void
  onClearAll: () => void
  emptyText: string
  noOptionsText: string
  rounded: string
  size: string
  i18n: (typeof UI_I18N)[UILocale]["combobox"]
  renderOption?: (option: ComboboxOption, selected: boolean) => React.ReactNode
}

function DropdownContent({
  rows,
  filtered,
  totalOptions,
  itemHeight,
  searchable,
  searchPlaceholder,
  query,
  onQueryChange,
  onKeyDown,
  multiple,
  selectedSingle,
  selectedMulti,
  activeOptionIndex,
  onSelect,
  onHover,
  onClearAll,
  emptyText,
  noOptionsText,
  rounded,
  size,
  i18n,
  renderOption,
}: DropdownContentProps) {
  const searchRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const estimateSize = React.useCallback(
    (i: number) => (rows[i]?.kind === "header" ? HEADER_HEIGHT : itemHeight),
    [rows, itemHeight]
  )

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => listRef.current,
    estimateSize,
    overscan: OVERSCAN,
    initialRect: { width: 0, height: LIST_MAX_HEIGHT },
  })

  // Focus on mount
  React.useEffect(() => {
    if (searchable) {
      searchRef.current?.focus()
    } else {
      listRef.current?.focus()
    }
  }, [searchable])

  // Scroll to active item
  React.useEffect(() => {
    if (filtered.length === 0) return
    const clamped = Math.min(activeOptionIndex, filtered.length - 1)
    const rowIdx = rows.findIndex(
      (r) => r.kind === "option" && r.optionIndex === clamped
    )
    if (rowIdx >= 0) virtualizer.scrollToIndex(rowIdx, { align: "auto" })
  }, [activeOptionIndex, rows, filtered.length, virtualizer])

  const listHeight =
    rows.length === 0
      ? 0
      : Math.min(virtualizer.getTotalSize(), LIST_MAX_HEIGHT)

  return (
    <>
      {searchable && (
        <div className="flex items-center border-b px-3">
          <SearchIcon className="mr-2 size-4 shrink-0 opacity-40" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={searchPlaceholder}
            data-slot="combobox-search"
            className={cn(
              "flex w-full bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
              SEARCH_HEIGHT[size],
              SEARCH_TEXT[size]
            )}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="ml-1 rounded opacity-50 transition-opacity hover:opacity-100 focus:ring-1 focus:ring-ring focus:outline-none"
              aria-label={i18n.clearSearch}
            >
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      )}

      {multiple && selectedMulti.length > 0 && (
        <div className="flex items-center justify-between border-b px-3 py-1.5">
          <span className="text-xs text-muted-foreground">
            {selectedMulti.length} {i18n.selected}
          </span>
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            {i18n.clearAll}
          </button>
        </div>
      )}

      <div
        ref={listRef}
        role="listbox"
        aria-multiselectable={multiple || undefined}
        tabIndex={searchable ? -1 : 0}
        onKeyDown={!searchable ? onKeyDown : undefined}
        className="overflow-y-auto py-1 outline-none"
        style={{ height: filtered.length === 0 ? "auto" : listHeight }}
      >
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            {totalOptions === 0 ? noOptionsText : emptyText}
          </div>
        ) : (
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: "relative",
              width: "100%",
            }}
          >
            {virtualizer.getVirtualItems().map((vi) => {
              const row = rows[vi.index]
              if (!row) return null

              const itemStyle: React.CSSProperties = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: vi.size,
                transform: `translateY(${vi.start}px)`,
              }

              if (row.kind === "header") {
                return (
                  <div
                    key={vi.key}
                    style={itemStyle}
                    className="flex items-center px-3 text-xs font-medium text-muted-foreground"
                  >
                    {row.label}
                  </div>
                )
              }

              const { option, optionIndex } = row
              const isSelected = multiple
                ? selectedMulti.includes(option.value)
                : selectedSingle === option.value
              const isActive = activeOptionIndex === optionIndex

              return (
                <div
                  key={vi.key}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  data-slot="combobox-option"
                  style={itemStyle}
                  className={cn(
                    cn(
                      "flex cursor-default items-center gap-2 px-2 font-medium transition-colors select-none",
                      ITEM_TEXT[size]
                    ),
                    ITEM_ROUNDED[rounded] ?? ITEM_ROUNDED.md,
                    isActive &&
                      !option.disabled &&
                      "bg-accent text-accent-foreground",
                    !isActive &&
                      !option.disabled &&
                      "hover:bg-accent hover:text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-40"
                  )}
                  onClick={() => onSelect(option)}
                  onMouseEnter={() => {
                    if (!option.disabled) onHover(optionIndex)
                  }}
                >
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    {isSelected && <CheckIcon className="size-3.5" />}
                  </span>
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <span className="truncate">{option.label}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

// ── Props ──────────────────────────────────────────────────────────────────

interface ComboboxBaseProps extends VariantProps<
  typeof comboboxTriggerVariants
> {
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  noOptionsText?: string
  loading?: boolean
  disabled?: boolean
  clearable?: boolean
  searchable?: boolean
  maxWidth?: string | number
  style?: React.CSSProperties
  className?: string
  locale?: UILocale
  renderOption?: (option: ComboboxOption, selected: boolean) => React.ReactNode
  "aria-label"?: string
  "aria-labelledby"?: string
  /** Popover positioning — side where the dropdown opens */
  side?: "top" | "right" | "bottom" | "left"
  /** Popover alignment relative to the trigger */
  align?: "start" | "center" | "end"
  /** Distance in px between trigger and popover */
  sideOffset?: number
  /** Offset along the alignment axis in px */
  alignOffset?: number
}

interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false
  value?: ComboboxValue | null
  defaultValue?: ComboboxValue | null
  onChange?: (value: ComboboxValue | null) => void
}

interface ComboboxMultipleProps extends ComboboxBaseProps {
  multiple: true
  value?: ComboboxValue[]
  defaultValue?: ComboboxValue[]
  onChange?: (values: ComboboxValue[]) => void
  maxDisplayed?: number
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

// ── Combobox ─────────────────────────────────────────────────────────────

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (props, ref) => {
    const {
      options,
      size = "md",
      rounded = "md",
      loading = false,
      disabled = false,
      clearable = true,
      searchable = true,
      maxWidth,
      style,
      className,
      locale: localeProp,
      renderOption,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      side,
      align = "start",
      sideOffset = 4,
      alignOffset,
    } = props

    const locale = useUILocale(localeProp)
    const i18n = UI_I18N[locale].combobox

    const placeholder = props.placeholder ?? i18n.placeholder
    const searchPlaceholder = props.searchPlaceholder ?? i18n.searchPlaceholder
    const emptyText = props.emptyText ?? i18n.noResults
    const noOptionsText = props.noOptionsText ?? i18n.noOptions

    const multiple = "multiple" in props && props.multiple === true

    // ── Controlled / uncontrolled ─────────────────────────────────────────

    const isControlled =
      "value" in props && props.value !== undefined && props.value !== null

    const [internalSingle, setInternalSingle] =
      React.useState<ComboboxValue | null>(() =>
        !multiple && !isControlled
          ? ((props as ComboboxSingleProps).defaultValue ?? null)
          : null
      )

    const [internalMulti, setInternalMulti] = React.useState<ComboboxValue[]>(
      () =>
        multiple && !isControlled
          ? ((props as ComboboxMultipleProps).defaultValue ?? [])
          : []
    )

    const selectedSingle: ComboboxValue | null = multiple
      ? null
      : isControlled
        ? ((props as ComboboxSingleProps).value ?? null)
        : internalSingle

    const selectedMulti: ComboboxValue[] = multiple
      ? isControlled
        ? ((props as ComboboxMultipleProps).value ?? EMPTY_VALUES)
        : internalMulti
      : EMPTY_VALUES

    // ── Dropdown state ────────────────────────────────────────────────────

    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [activeOptionIndex, setActiveOptionIndex] = React.useState(0)

    const itemHeight = ITEM_HEIGHT[size ?? "md"] ?? 36

    const { rows, filtered } = React.useMemo(
      () => buildVirtualRows(options, query),
      [options, query]
    )

    // Reset query on close; on open, jump to the currently selected option
    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        if (!next) {
          setQuery("")
          setActiveOptionIndex(0)
        } else {
          let startIndex = 0
          const targetValue = !multiple
            ? selectedSingle
            : (selectedMulti[0] ?? null)
          if (targetValue !== null) {
            const optRow = rows.find(
              (r): r is Extract<VirtualRow, { kind: "option" }> =>
                r.kind === "option" && r.option.value === targetValue
            )
            if (optRow) startIndex = optRow.optionIndex
          }
          setActiveOptionIndex(startIndex)
        }
        setOpen(next)
      },
      [multiple, rows, selectedSingle, selectedMulti]
    )

    const handleQueryChange = React.useCallback((q: string) => {
      setQuery(q)
      setActiveOptionIndex(0)
    }, [])

    // ── Select handlers ───────────────────────────────────────────────────

    const selectOption = React.useCallback(
      (opt: ComboboxOption) => {
        if (opt.disabled) return
        if (multiple) {
          const next = selectedMulti.includes(opt.value)
            ? selectedMulti.filter((v) => v !== opt.value)
            : [...selectedMulti, opt.value]
          if (!isControlled) setInternalMulti(next)
          ;(props as ComboboxMultipleProps).onChange?.(next)
        } else {
          const next = selectedSingle === opt.value ? null : opt.value
          if (!isControlled) setInternalSingle(next)
          ;(props as ComboboxSingleProps).onChange?.(next)
          setOpen(false)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [multiple, selectedMulti, selectedSingle, isControlled]
    )

    const clearAll = React.useCallback(() => {
      if (multiple) {
        if (!isControlled) setInternalMulti([])
        ;(props as ComboboxMultipleProps).onChange?.([])
      } else {
        if (!isControlled) setInternalSingle(null)
        ;(props as ComboboxSingleProps).onChange?.(null)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple, isControlled])

    // ── Keyboard navigation ───────────────────────────────────────────────

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault()
            setActiveOptionIndex((i) => Math.min(i + 1, filtered.length - 1))
            break
          case "ArrowUp":
            e.preventDefault()
            setActiveOptionIndex((i) => Math.max(i - 1, 0))
            break
          case "Enter": {
            e.preventDefault()
            const opt = filtered[activeOptionIndex]
            if (opt) selectOption(opt)
            break
          }
          case "Escape":
            e.preventDefault()
            setOpen(false)
            break
          case "Tab":
            setOpen(false)
            break
        }
      },
      [filtered, activeOptionIndex, selectOption]
    )

    // ── Trigger display ───────────────────────────────────────────────────

    const selectedLabel = React.useMemo(
      () =>
        selectedSingle !== null
          ? (options.find((o) => o.value === selectedSingle)?.label ?? null)
          : null,
      [selectedSingle, options]
    )

    const maxDisplayed = multiple
      ? ((props as ComboboxMultipleProps).maxDisplayed ?? 3)
      : 0

    const visibleValues = selectedMulti.slice(0, maxDisplayed)
    const hiddenCount = selectedMulti.length - visibleValues.length

    const visibleLabels = React.useMemo(
      () =>
        selectedMulti
          .slice(0, maxDisplayed)
          .map((v) => options.find((o) => o.value === v)?.label ?? String(v)),
      [selectedMulti, maxDisplayed, options]
    )

    const hasValue = multiple
      ? selectedMulti.length > 0
      : selectedSingle !== null

    // ── Render ────────────────────────────────────────────────────────────

    if (loading) {
      return (
        <div
          className="relative w-full min-w-0"
          style={{ maxWidth, ...style }}
          data-slot="combobox"
        >
          <Skeleton
            className={cn(
              "w-full",
              size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9",
              rounded === "full"
                ? "rounded-full"
                : rounded === "none"
                  ? "rounded-none"
                  : "rounded-lg",
              className
            )}
          />
        </div>
      )
    }

    return (
      <div
        className="relative w-full min-w-0"
        style={{ maxWidth, ...style }}
        data-slot="combobox"
      >
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-label={ariaLabel || placeholder}
              aria-labelledby={ariaLabelledBy}
              disabled={disabled}
              data-slot="combobox-trigger"
              className={cn(
                comboboxTriggerVariants({ size, rounded }),
                clearable && hasValue && "pr-14",
                className
              )}
            >
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden">
                {multiple ? (
                  hasValue ? (
                    <>
                      {visibleLabels.map((label, i) => (
                        <Badge
                          key={visibleValues[i]}
                          variant="secondary"
                          data-slot="combobox-selected"
                          className="max-w-[120px] truncate"
                        >
                          {label}
                        </Badge>
                      ))}
                      {hiddenCount > 0 && (
                        <Badge variant="secondary">+{hiddenCount}</Badge>
                      )}
                    </>
                  ) : (
                    <span className="truncate text-muted-foreground">
                      {placeholder}
                    </span>
                  )
                ) : selectedLabel ? (
                  <span className="truncate">{selectedLabel}</span>
                ) : (
                  <span className="truncate text-muted-foreground">
                    {placeholder}
                  </span>
                )}
              </span>
              <ChevronsUpDownIcon className="ml-1 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            data-slot="combobox-content"
            className={cn(
              "overflow-hidden p-0",
              CONTENT_ROUNDED[rounded ?? "md"]
            )}
            style={{
              width: "var(--radix-popover-trigger-width)",
              minWidth: "180px",
            }}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownContent
              rows={rows}
              filtered={filtered}
              totalOptions={options.length}
              itemHeight={itemHeight}
              searchable={searchable}
              searchPlaceholder={searchPlaceholder}
              query={query}
              onQueryChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              multiple={multiple}
              selectedSingle={selectedSingle}
              selectedMulti={selectedMulti}
              activeOptionIndex={activeOptionIndex}
              onSelect={selectOption}
              onHover={setActiveOptionIndex}
              onClearAll={clearAll}
              emptyText={emptyText}
              noOptionsText={noOptionsText}
              rounded={rounded ?? "md"}
              size={size ?? "md"}
              i18n={i18n}
              renderOption={renderOption}
            />
          </PopoverContent>
        </Popover>

        {clearable && hasValue && (
          <button
            type="button"
            aria-label={i18n.clearSelection}
            tabIndex={-1}
            data-slot="combobox-clear"
            className={cn(
              "absolute top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full opacity-40 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline",
              size === "sm" ? "right-7" : size === "lg" ? "right-9" : "right-8"
            )}
            onClick={(e) => {
              e.stopPropagation()
              clearAll()
            }}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    )
  }
)

Combobox.displayName = "Combobox"
