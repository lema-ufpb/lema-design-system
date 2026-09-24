"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import * as React from "react"
import { type HTMLAttributes, type ReactNode } from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { Search, X, Mic } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useOptionalUILocale } from "@/components/ds/locale-provider"
import { Spinner } from "@/components/ds/spinner"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SearchComboItem {
  /** Unique identifier for the item. */
  id: string | number
  /** Display label for the item. */
  label: string
  /** Optional value (defaults to label if not provided). */
  value?: string
  /** Optional group name for grouping results under headers. */
  group?: string
  /** Optional icon rendered to the left of the label. */
  icon?: ReactNode
  /** Optional arbitrary data attached to the item. */
  data?: unknown
}

export interface SearchComboProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onSelect" | "results"
> {
  /** The current value of the search input. */
  value: string
  /** Callback fired when the input value changes. */
  onChange: (value: string) => void
  /** Callback fired when search is submitted (Enter key or button click). */
  onSearch?: (value: string) => void
  /** Array of items to display in the dropdown. */
  options?: SearchComboItem[]
  /** Callback fired when a result item is selected. */
  onSelectResult?: (item: SearchComboItem) => void
  /** Placeholder text displayed when input is empty. */
  placeholder?: string
  /** Whether to show the search submit button. @default true */
  button?: boolean
  /** Whether the input has fully rounded (pill) corners. @default false */
  rounded?: boolean
  /** Size variant controlling height and font size. @default "md" */
  size?: "sm" | "md" | "lg"
  /** Whether to render in border/header mode with inverted background. @default false */
  border?: boolean
  /** Whether the input is disabled. @default false */
  disabled?: boolean
  /** Whether to show loading state with spinner. @default false */
  loading?: boolean
  /** Whether to auto-focus the input on mount. @default true */
  autoFocus?: boolean
  /** Accessible label for the search landmark. @default "Search" */
  label?: string
  /** Message displayed when input has value but no results match. @default "No results found." */
  emptyMessage?: string
  /** Whether to enable voice recognition. @default false */
  voice?: boolean
  /** Callback fired when voice recording starts. */
  onVoiceStart?: () => void
  /** Callback fired when voice recording ends. */
  onVoiceEnd?: () => void
  /** Callback fired when voice recognition encounters an error. */
  onVoiceError?: (error: string) => void
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const searchComboWrapperVariants = cva(
  ["flex", "w-full", "items-center"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      loading: {
        true: ["pointer-events-none"],
      },
    },
    defaultVariants: {
      size: "md",
      loading: false,
    },
  }
)

export const searchComboInputWrapperVariants = cva(
  [
    "flex",
    "w-full",
    "items-center",
    "border",
    "border-input",
    "bg-background",
    "transition-all",
    "duration-200",
    "outline-none",
    "hover:border-ring",
    "hover:bg-accent/50",
    "focus-within:border-ring",
    "focus-within:ring-2",
    "focus-within:ring-ring/20",
    "focus-within:bg-background",
    "overflow-hidden",
  ],
  {
    variants: {
      size: {
        sm: ["h-8", "min-h-8", "text-sm"],
        md: ["h-10", "min-h-10", "text-base"],
        lg: ["h-12", "min-h-12", "text-lg"],
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
      border: {
        true: [
          "border-2",
          "border-primary",
          "bg-muted/50",
          "shadow-sm",
          "hover:bg-muted",
          "hover:border-primary",
          "focus-within:bg-background",
          "focus-within:border-primary",
          "focus-within:ring-2",
          "focus-within:ring-primary/20",
        ],
        false: "",
      },
      disabled: {
        true: [
          "cursor-not-allowed",
          "bg-muted",
          "opacity-60",
          "hover:bg-muted",
          "hover:border-input",
        ],
        false: "",
      },
      loading: {
        true: "bg-muted motion-safe:animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: false,
      border: false,
      disabled: false,
      loading: false,
    },
  }
)

export const searchComboInputVariants = cva(
  [
    "flex-1",
    "bg-transparent",
    "border-none",
    "px-3",
    "py-2",
    "text-foreground",
    "outline-none",
    "placeholder:text-muted-foreground",
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      border: {
        true: ["text-foreground", "placeholder:text-muted-foreground"],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      border: false,
    },
  }
)

export const searchComboIconWrapperVariants = cva(
  ["flex", "items-center", "pl-3", "pr-1", "text-muted-foreground"],
  {
    variants: {
      border: {
        true: "text-primary",
        false: "",
      },
    },
    defaultVariants: {
      border: false,
    },
  }
)

export const searchComboActionButtonVariants = cva(
  [
    "rounded-md",
    "p-1.5",
    "text-muted-foreground",
    "transition-colors",
    "cursor-pointer",
    "hover:bg-accent",
    "hover:text-foreground",
  ],
  {
    variants: {
      border: {
        true: [
          "text-muted-foreground",
          "hover:bg-accent",
          "hover:text-primary",
        ],
        false: "",
      },
    },
    defaultVariants: {
      border: false,
    },
  }
)

export const searchComboSearchButtonVariants = cva(
  [
    "flex",
    "shrink-0",
    "items-center",
    "justify-center",
    "gap-1.5",
    "border-none",
    "bg-primary",
    "px-3",
    "font-medium",
    "text-primary-foreground",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "hover:bg-primary/90",
    "active:scale-[0.97]",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
    "m-0",
  ],
  {
    variants: {
      size: {
        sm: ["self-stretch", "px-2.5", "text-sm"],
        md: ["self-stretch", "px-3", "text-sm"],
        lg: ["self-stretch", "px-4", "text-base"],
      },
      rounded: {
        true: "rounded-none",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: false,
    },
  }
)

export const searchComboResultsListVariants = cva([
  "m-0",
  "my-0.5",
  "max-h-[200px]",
  "list-none",
  "overflow-y-auto",
  "rounded-md",
  "border",
  "border-border/80",
  "bg-popover",
  "p-0",
  "shadow-lg",
])

export const searchComboResultItemVariants = cva(
  [
    "cursor-pointer",
    "border-b",
    "border-border/50",
    "px-3",
    "py-2",
    "text-popover-foreground",
    "transition-colors",
    "last:border-b-0",
  ],
  {
    variants: {
      active: {
        true: "bg-accent",
        false: "hover:bg-accent/50",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export const searchComboHighlightVariants = cva([
  "rounded-sm",
  "bg-primary/15",
  "px-0.5",
  "font-semibold",
  "text-primary",
])

export const searchComboGroupHeaderVariants = cva([
  "px-3",
  "py-1.5",
  "text-xs",
  "font-medium",
  "tracking-wide",
  "text-muted-foreground",
  "uppercase",
  "bg-muted/30",
])

export const searchComboEmptyVariants = cva([
  "px-3",
  "py-6",
  "text-center",
  "text-sm",
  "text-muted-foreground",
])

export type SearchComboWrapperVariants = VariantProps<
  typeof searchComboWrapperVariants
>
export type SearchComboInputWrapperVariants = VariantProps<
  typeof searchComboInputWrapperVariants
>
export type SearchComboSearchButtonVariants = VariantProps<
  typeof searchComboSearchButtonVariants
>
export type SearchComboResultItemVariants = VariantProps<
  typeof searchComboResultItemVariants
>

// ── Component ──────────────────────────────────────────────────────────────

type FlatItem =
  | { type: "group"; label: string }
  | { type: "item"; item: SearchComboItem; itemIndex: number }

const ITEM_HEIGHT = 40
const ITEM_WITH_SUBTITLE_HEIGHT = 56
const GROUP_HEADER_HEIGHT = 32
const MAX_DROPDOWN_HEIGHT = 200

export const SearchCombo = React.forwardRef<HTMLDivElement, SearchComboProps>(
  (
    {
      value,
      onChange,
      onSearch,
      options,
      onSelectResult,
      placeholder,
      button = true,
      rounded = false,
      size = "md",
      border = false,
      disabled = false,
      loading = false,
      autoFocus = true,
      label,
      emptyMessage,
      locale: localeProp,
      voice = false,
      onVoiceStart,
      onVoiceEnd,
      onVoiceError,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useOptionalUILocale(localeProp)
    const resolvedPlaceholder =
      placeholder ??
      (locale ? UI_I18N[locale].searchCombo.placeholder : "Search...")
    const resolvedLabel =
      label ?? (locale ? UI_I18N[locale].searchCombo.label : "Search")
    const resolvedEmptyMessage =
      emptyMessage ??
      (locale ? UI_I18N[locale].searchCombo.noResults : "No results found.")
    const displayResults = useMemo(() => options ?? [], [options])
    const [focused, setFocused] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLUListElement>(null)
    const listboxId = React.useId()

    const {
      isListening,
      isSupported: hasSpeechSupport,
      start: startListening,
      stop: stopListening,
    } = useSpeechRecognition({
      onStart: onVoiceStart,
      onEnd: onVoiceEnd,
      onError: onVoiceError,
      onResult: (transcript) => {
        onChange(transcript)
        onSearch?.(transcript)
      },
    })

    useEffect(() => {
      if (autoFocus && !disabled) {
        inputRef.current?.focus()
      }
    }, [autoFocus, disabled])

    const isOpen = focused && displayResults.length > 0
    const showEmpty =
      focused && value.trim().length > 0 && displayResults.length === 0

    const groupedResults = useMemo(() => {
      const groups: { key: string; items: SearchComboItem[] }[] = []
      const seen = new Map<string, number>()

      for (const item of displayResults) {
        const groupKey = item.group ?? ""
        const idx = seen.get(groupKey)
        if (idx !== undefined) {
          groups[idx].items.push(item)
        } else {
          seen.set(groupKey, groups.length)
          groups.push({ key: groupKey, items: [item] })
        }
      }

      return groups
    }, [displayResults])

    const flatList = useMemo<FlatItem[]>(() => {
      const list: FlatItem[] = []
      let idx = 0
      for (const group of groupedResults) {
        if (group.key) list.push({ type: "group", label: group.key })
        for (const item of group.items) {
          list.push({ type: "item", item, itemIndex: idx++ })
        }
      }
      return list
    }, [groupedResults])

    const virtualizer = useVirtualizer({
      count: flatList.length,
      getScrollElement: () => scrollRef.current,
      estimateSize: (index) => {
        const flatItem = flatList[index]
        if (!flatItem) return ITEM_HEIGHT
        if (flatItem.type === "group") return GROUP_HEADER_HEIGHT
        return flatItem.item.group ? ITEM_WITH_SUBTITLE_HEIGHT : ITEM_HEIGHT
      },
      overscan: 3,
    })

    const listHeight = useMemo(() => {
      const estimated = flatList.reduce((acc, flatItem) => {
        if (flatItem.type === "group") return acc + GROUP_HEADER_HEIGHT
        return (
          acc + (flatItem.item.group ? ITEM_WITH_SUBTITLE_HEIGHT : ITEM_HEIGHT)
        )
      }, 0)
      return Math.min(estimated, MAX_DROPDOWN_HEIGHT)
    }, [flatList])

    const normalizeText = (text: string): string => {
      return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    }

    const renderHighlightedText = (
      text: string,
      query: string
    ): React.ReactNode => {
      if (!query.trim()) return text

      const words = query.split(/\s+/).filter(Boolean)
      if (words.length === 0) return text

      const normalizedText = normalizeText(text)
      const matches: { start: number; end: number; text: string }[] = []

      words.forEach((word) => {
        const normalizedWord = normalizeText(word)
        const escapedWord = normalizedWord.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )
        const regex = new RegExp(escapedWord, "g")
        let match: RegExpExecArray | null

        while ((match = regex.exec(normalizedText)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: text.slice(match.index, match.index + match[0].length),
          })
        }
      })

      matches.sort((a, b) => a.start - b.start)

      const usedMatches: { start: number; end: number; text: string }[] = []
      matches.forEach((m) => {
        const overlaps = usedMatches.some(
          (um) => !(m.end <= um.start || m.start >= um.end)
        )
        if (!overlaps) usedMatches.push(m)
      })

      usedMatches.sort((a, b) => a.start - b.start)

      const parts: React.ReactNode[] = []
      let lastEnd = 0
      let keyCounter = 0

      usedMatches.forEach((m) => {
        if (m.start > lastEnd) {
          parts.push(text.slice(lastEnd, m.start))
        }
        parts.push(
          <mark
            key={`hl-${keyCounter++}`}
            className={cn(searchComboHighlightVariants())}
          >
            {m.text}
          </mark>
        )
        lastEnd = m.end
      })

      if (lastEnd < text.length) {
        parts.push(text.slice(lastEnd))
      }

      return parts
    }

    const handleClear = useCallback(() => {
      onChange("")
      setActiveIndex(-1)
      inputRef.current?.focus()
    }, [onChange])

    const handleSelectItem = useCallback(
      (item: SearchComboItem) => {
        onChange(item.label)
        onSelectResult?.(item)
        setFocused(false)
        setActiveIndex(-1)
      },
      [onChange, onSelectResult]
    )

    const scrollToItemIndex = useCallback(
      (itemIndex: number) => {
        const flatIdx = flatList.findIndex(
          (f) => f.type === "item" && f.itemIndex === itemIndex
        )
        if (flatIdx >= 0) virtualizer.scrollToIndex(flatIdx)
      },
      [flatList, virtualizer]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) {
          if (e.key === "Enter" && value) {
            onSearch?.(value)
          }
          return
        }

        if (e.key === "ArrowDown") {
          e.preventDefault()
          setActiveIndex((prev) => {
            const next = (prev + 1) % displayResults.length
            scrollToItemIndex(next)
            return next
          })
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setActiveIndex((prev) => {
            const next = prev <= 0 ? displayResults.length - 1 : prev - 1
            scrollToItemIndex(next)
            return next
          })
        } else if (e.key === "Enter") {
          if (activeIndex >= 0 && activeIndex < displayResults.length) {
            e.preventDefault()
            handleSelectItem(displayResults[activeIndex])
          } else {
            onSearch?.(value)
            setFocused(false)
          }
        } else if (e.key === "Escape") {
          setFocused(false)
          setActiveIndex(-1)
        }
      },
      [
        isOpen,
        value,
        onSearch,
        activeIndex,
        displayResults,
        handleSelectItem,
        scrollToItemIndex,
      ]
    )

    const hasValue = value?.trim().length > 0

    return (
      <div
        ref={ref}
        className={cn(searchComboWrapperVariants({ size, loading }), className)}
        role="search"
        aria-label={resolvedLabel}
        data-slot="search-combo"
        {...props}
      >
        <PopoverPrimitive.Root
          open={isOpen || showEmpty}
          onOpenChange={setFocused}
        >
          <PopoverPrimitive.Anchor asChild>
            <div
              className={cn(
                searchComboInputWrapperVariants({
                  size,
                  rounded,
                  border,
                  disabled,
                  loading,
                })
              )}
              onFocus={() => setFocused(true)}
              data-state={focused ? "open" : "closed"}
              data-slot="search-combo-input-wrapper"
            >
              {/* Search icon */}
              <div
                className={cn(searchComboIconWrapperVariants({ border }))}
                data-slot="search-combo-search-icon"
              >
                {loading ? (
                  <Spinner className="size-4" />
                ) : (
                  <Search className="size-4" />
                )}
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                className={cn(searchComboInputVariants({ size, border }))}
                type="text"
                role="combobox"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value)
                  setActiveIndex(-1)
                }}
                placeholder={resolvedPlaceholder}
                aria-label={resolvedLabel}
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-activedescendant={
                  activeIndex >= 0
                    ? `${listboxId}-option-${activeIndex}`
                    : undefined
                }
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
                spellCheck={false}
                data-slot="search-combo-input"
              />

              {/* Action buttons (clear + voice) */}
              <div className={cn(["flex", "items-center", "gap-1", "pr-2"])}>
                {hasValue && !disabled && (
                  <button
                    onClick={handleClear}
                    aria-label={
                      locale
                        ? UI_I18N[locale].searchCombo.clearSearch
                        : "Clear search"
                    }
                    type="button"
                    data-slot="search-combo-clear"
                    className={cn(searchComboActionButtonVariants({ border }))}
                  >
                    <X className="size-4" />
                  </button>
                )}
                {voice && hasSpeechSupport && !disabled && (
                  <button
                    onClick={isListening ? stopListening : startListening}
                    aria-label={
                      isListening
                        ? locale
                          ? UI_I18N[locale].searchCombo.stopRecording
                          : "Stop recording"
                        : locale
                          ? UI_I18N[locale].searchCombo.searchByVoice
                          : "Search by voice"
                    }
                    type="button"
                    data-slot="search-combo-voice"
                    className={cn(
                      searchComboActionButtonVariants({ border }),
                      isListening &&
                        "text-destructive motion-safe:animate-pulse"
                    )}
                  >
                    <Mic className="size-4" />
                  </button>
                )}
              </div>

              {/* Search button */}
              {button && (
                <button
                  type="button"
                  className={cn(
                    searchComboSearchButtonVariants({ size, rounded })
                  )}
                  onClick={() => {
                    onSearch?.(value)
                    setFocused(false)
                  }}
                  aria-label={resolvedLabel}
                  disabled={!hasValue || disabled}
                  data-state={focused ? "open" : "closed"}
                  data-slot="search-combo-search-button"
                >
                  <Search
                    className={cn(["sm:hidden"])}
                    data-icon="inline-start"
                  />
                  <span className="hidden sm:inline">{resolvedLabel}</span>
                </button>
              )}
            </div>
          </PopoverPrimitive.Anchor>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              aria-label="Search results"
              className="z-50 animate-in zoom-in-95 fade-in slide-in-from-top-1"
              style={{
                width: "var(--radix-popover-trigger-width)",
              }}
              align="start"
              sideOffset={2}
              onOpenAutoFocus={(e: Event) => e.preventDefault()}
              onCloseAutoFocus={(e: Event) => e.preventDefault()}
            >
              {/* Empty state */}
              {showEmpty && (
                <div className={cn(searchComboResultsListVariants())}>
                  <div
                    className={cn(searchComboEmptyVariants())}
                    data-slot="search-combo-empty"
                  >
                    {resolvedEmptyMessage}
                  </div>
                </div>
              )}

              {/* Results list */}
              {isOpen && (
                <ul
                  ref={scrollRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Search results"
                  className={cn(searchComboResultsListVariants())}
                  style={{ height: listHeight }}
                  tabIndex={0}
                  data-slot="search-combo-results"
                >
                  <div
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      position: "relative",
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const flatItem = flatList[virtualItem.index]
                      if (!flatItem) return null

                      if (flatItem.type === "group") {
                        return (
                          <li
                            key={virtualItem.key}
                            role="presentation"
                            className={cn(searchComboGroupHeaderVariants())}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: `${virtualItem.size}px`,
                              transform: `translateY(${virtualItem.start}px)`,
                            }}
                            data-slot="search-combo-group-header"
                          >
                            {flatItem.label}
                          </li>
                        )
                      }

                      const { item, itemIndex } = flatItem
                      const isLast = itemIndex === displayResults.length - 1

                      return (
                        <li
                          key={virtualItem.key}
                          id={`${listboxId}-option-${itemIndex}`}
                          role="option"
                          aria-selected={itemIndex === activeIndex}
                          className={cn(
                            searchComboResultItemVariants({
                              active: itemIndex === activeIndex,
                            }),
                            isLast && "border-b-0"
                          )}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                          onClick={() => handleSelectItem(item)}
                          onMouseEnter={() => setActiveIndex(itemIndex)}
                          data-slot="search-combo-result-item"
                        >
                          <div
                            className={cn([
                              "flex",
                              "w-full",
                              "items-center",
                              "justify-start",
                            ])}
                          >
                            {item.icon && (
                              <div
                                className={cn([
                                  "relative",
                                  "mr-3",
                                  "flex",
                                  "items-center",
                                  "justify-center",
                                  "text-muted-foreground",
                                ])}
                              >
                                {item.icon}
                              </div>
                            )}
                            <div className={cn(["flex", "flex-1", "flex-col"])}>
                              <span
                                className={cn([
                                  "text-left",
                                  "font-medium",
                                  "whitespace-pre-wrap",
                                ])}
                              >
                                {renderHighlightedText(item.label, value)}
                              </span>
                              {item.group && (
                                <span
                                  className={cn([
                                    "text-xs",
                                    "font-normal",
                                    "text-muted-foreground",
                                  ])}
                                >
                                  {item.group}
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </div>
                </ul>
              )}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    )
  }
)

SearchCombo.displayName = "SearchCombo"
