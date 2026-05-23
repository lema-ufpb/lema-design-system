"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { Search, X, Mic } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/custom/spinner"
import type { SearchComboProps, SearchComboItem } from "./types"
import { useSpeechRecognition } from "./hooks/use-speech-recognition"
import {
  searchComboWrapperVariants,
  searchComboInputWrapperVariants,
  searchComboInputVariants,
  searchComboIconWrapperVariants,
  searchComboActionButtonVariants,
  searchComboSearchButtonVariants,
  searchComboResultsListVariants,
  searchComboResultItemVariants,
  searchComboHighlightVariants,
  searchComboGroupHeaderVariants,
  searchComboEmptyVariants,
} from "./variants"

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
      placeholder = "Search...",
      button = true,
      rounded = false,
      size = "md",
      border = false,
      disabled = false,
      loading = false,
      autoFocus = true,
      label = "Search",
      emptyMessage = "No results found.",
      voice = false,
      onVoiceStart,
      onVoiceEnd,
      onVoiceError,
      className,
      ...props
    },
    ref
  ) => {
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
        aria-label={label}
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
            >
              {/* Search icon */}
              <div className={cn(searchComboIconWrapperVariants({ border }))}>
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
                placeholder={placeholder}
                aria-label={label}
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
              />

              {/* Action buttons (clear + voice) */}
              <div className={cn(["flex", "items-center", "gap-1", "pr-2"])}>
                {hasValue && !disabled && (
                  <button
                    onClick={handleClear}
                    aria-label="Clear search"
                    type="button"
                    className={cn(searchComboActionButtonVariants({ border }))}
                  >
                    <X className="size-4" />
                  </button>
                )}
                {voice && hasSpeechSupport && !disabled && (
                  <button
                    onClick={isListening ? stopListening : startListening}
                    aria-label={
                      isListening ? "Stop recording" : "Search by voice"
                    }
                    type="button"
                    className={cn(
                      searchComboActionButtonVariants({ border }),
                      isListening && "animate-pulse text-destructive"
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
                  aria-label="Search"
                  disabled={!hasValue || disabled}
                  data-state={focused ? "open" : "closed"}
                >
                  <Search
                    className={cn(["sm:hidden"])}
                    data-icon="inline-start"
                  />
                  <span className="hidden sm:inline">Search</span>
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
                  <div className={cn(searchComboEmptyVariants())}>
                    {emptyMessage}
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
