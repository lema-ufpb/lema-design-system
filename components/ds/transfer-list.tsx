"use client"

import * as React from "react"
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Search,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface TransferListItem {
  /**
   * Unique identifier.
   */
  id: string
  /**
   * Primary display label.
   */
  label: string
  /**
   * Optional helper description.
   */
  description?: string
  /**
   * Disables selection for this item.
   */
  disabled?: boolean
}

export interface TransferListProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Complete array of items.
   */
  items: TransferListItem[]
  /**
   * IDs of items selected in the right panel.
   */
  value: string[]
  /**
   * Callback fired when item transfers occur.
   */
  onChange: (newValues: string[]) => void
  /**
   * Panel titles [leftTitle, rightTitle].
   */
  titles?: [string, string]
  /**
   * Enables search input inside each panel.
   */
  searchable?: boolean
  /**
   * Disables all interactions.
   */
  disabled?: boolean
  /**
   * Localization locale.
   */
  locale?: UILocale
}

// ── Component ──

export const TransferList = React.forwardRef<HTMLDivElement, TransferListProps>(
  (
    {
      items,
      value = [],
      onChange,
      titles,
      searchable = true,
      disabled = false,
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].transferList

    const leftTitle = titles?.[0] ?? t.available
    const rightTitle = titles?.[1] ?? t.selected

    const [leftChecked, setLeftChecked] = React.useState<string[]>([])
    const [rightChecked, setRightChecked] = React.useState<string[]>([])
    const [leftSearch, setLeftSearch] = React.useState("")
    const [rightSearch, setRightSearch] = React.useState("")

    const selectedSet = React.useMemo(() => new Set(value), [value])

    const availableItems = React.useMemo(
      () => items.filter((item) => !selectedSet.has(item.id)),
      [items, selectedSet]
    )

    const chosenItems = React.useMemo(
      () => items.filter((item) => selectedSet.has(item.id)),
      [items, selectedSet]
    )

    const filteredAvailable = React.useMemo(
      () =>
        availableItems.filter(
          (item) =>
            item.label.toLowerCase().includes(leftSearch.toLowerCase()) ||
            item.description?.toLowerCase().includes(leftSearch.toLowerCase())
        ),
      [availableItems, leftSearch]
    )

    const filteredChosen = React.useMemo(
      () =>
        chosenItems.filter(
          (item) =>
            item.label.toLowerCase().includes(rightSearch.toLowerCase()) ||
            item.description?.toLowerCase().includes(rightSearch.toLowerCase())
        ),
      [chosenItems, rightSearch]
    )

    const handleToggleLeft = (id: string) => {
      setLeftChecked((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }

    const handleToggleRight = (id: string) => {
      setRightChecked((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }

    const moveRight = () => {
      const activeLeftIds = leftChecked.filter((id) =>
        availableItems.some((item) => item.id === id && !item.disabled)
      )
      onChange([...value, ...activeLeftIds])
      setLeftChecked([])
    }

    const moveAllRight = () => {
      const enabledIds = availableItems
        .filter((item) => !item.disabled)
        .map((item) => item.id)
      onChange([...value, ...enabledIds])
      setLeftChecked([])
    }

    const moveLeft = () => {
      const activeRightSet = new Set(rightChecked)
      onChange(value.filter((id) => !activeRightSet.has(id)))
      setRightChecked([])
    }

    const moveAllLeft = () => {
      const lockedIds = chosenItems
        .filter((item) => item.disabled)
        .map((item) => item.id)
      onChange(lockedIds)
      setRightChecked([])
    }

    const renderPanel = (
      panelTitle: string,
      itemsList: TransferListItem[],
      checkedList: string[],
      onToggle: (id: string) => void,
      searchVal: string,
      setSearch: (v: string) => void
    ) => (
      <div className="flex min-w-56 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted/20 p-3">
          <span className="text-xs font-semibold tracking-wider text-foreground uppercase">
            {panelTitle}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {checkedList.length} / {itemsList.length}
          </span>
        </div>

        {searchable && (
          <div className="border-b border-border p-2">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={searchVal}
                disabled={disabled}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-7 pl-8 text-xs"
              />
            </div>
          </div>
        )}

        <ScrollArea className="h-64 p-2">
          {itemsList.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              {t.noItems}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {itemsList.map((item) => {
                const isChecked = checkedList.includes(item.id)
                const isItemDisabled = disabled || item.disabled

                return (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-md p-2 transition-colors select-none",
                      isChecked
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/50",
                      isItemDisabled &&
                        "pointer-events-none cursor-not-allowed opacity-50"
                    )}
                  >
                    <Checkbox
                      checked={isChecked}
                      disabled={isItemDisabled}
                      onCheckedChange={() => {
                        if (!isItemDisabled) onToggle(item.id)
                      }}
                      aria-label={item.label}
                      className="mt-0.5"
                    />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-xs font-medium text-foreground">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="truncate text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col items-center gap-3 sm:flex-row",
          className
        )}
        {...props}
      >
        {renderPanel(
          leftTitle,
          filteredAvailable,
          leftChecked,
          handleToggleLeft,
          leftSearch,
          setLeftSearch
        )}

        {/* Action Controls */}
        <div className="flex shrink-0 gap-1.5 sm:flex-col">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled || availableItems.length === 0}
            onClick={moveAllRight}
            aria-label={t.moveAllRight}
            className="size-8"
          >
            <ChevronsRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled || leftChecked.length === 0}
            onClick={moveRight}
            aria-label={t.moveRight}
            className="size-8"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled || rightChecked.length === 0}
            onClick={moveLeft}
            aria-label={t.moveLeft}
            className="size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled || chosenItems.length === 0}
            onClick={moveAllLeft}
            aria-label={t.moveAllLeft}
            className="size-8"
          >
            <ChevronsLeft className="size-4" />
          </Button>
        </div>

        {renderPanel(
          rightTitle,
          filteredChosen,
          rightRightCheckedWrapper(rightChecked),
          handleToggleRight,
          rightSearch,
          setRightSearch
        )}
      </div>
    )
  }
)

function rightRightCheckedWrapper(val: string[]) {
  return val
}

TransferList.displayName = "TransferList"
