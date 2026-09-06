"use client"

import * as React from "react"
import { SearchIcon, XIcon, MicIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

// ── Types ──────────────────────────────────────────────────────────────────

export type SearchBarSize = "sm" | "md" | "lg"
export type SearchBarVariant = "outline" | "filled" | "ghost"
export type SearchBarRounded = "none" | "sm" | "md" | "lg" | "xl" | "full"

export interface SearchBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  size?: SearchBarSize
  variant?: SearchBarVariant
  rounded?: SearchBarRounded
  /** Custom leading icon. Defaults to SearchIcon. */
  icon?: React.ElementType
  /** Shows a loading spinner, suppresses clear button. */
  loading?: boolean
  /**
   * Keyboard shortcut hint shown when the input is empty (e.g. "⌘K").
   * Rendered via the Kbd component on the trailing side.
   */
  shortcut?: string
  /**
   * Arbitrary trailing content rendered after the clear button —
   * useful for filter badges, action buttons, or separators.
   */
  trailingSlot?: React.ReactNode
  /** Debounce onChange calls by N milliseconds. 0 = no debounce. */
  debounceMs?: number
  /** Enables the voice input button (requires browser Web Speech API support). */
  voice?: boolean
  /** Callback fired when voice recording starts. */
  onVoiceStart?: () => void
  /** Callback fired when voice recording ends. */
  onVoiceEnd?: () => void
  /** Callback fired when voice recognition encounters an error. */
  onVoiceError?: (error: string) => void
  disabled?: boolean
  autoFocus?: boolean
  locale?: UILocale
}

export interface SearchBarSkeletonProps {
  size?: SearchBarSize
  rounded?: SearchBarRounded
  className?: string
}

export type SearchBarVariantProps = VariantProps<typeof searchBarVariants>

// ── Variants ───────────────────────────────────────────────────────────────

export const searchBarVariants = cva(
  [
    "relative flex w-full items-center border",
    "motion-safe:transition-colors motion-safe:duration-150",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
  ],
  {
    variants: {
      variant: {
        outline: ["border-border bg-background", "hover:border-ring/50"],
        filled: ["border-transparent bg-muted", "hover:border-border"],
        ghost: [
          "border-transparent bg-transparent",
          "hover:border-border/60 hover:bg-accent",
        ],
      },
      size: {
        sm: "h-8 gap-1.5 px-2.5",
        md: "h-10 gap-2 px-3",
        lg: "h-12 gap-2.5 px-4",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      rounded: "lg",
    },
  }
)

export const searchBarIconVariants = cva("shrink-0 text-muted-foreground", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

export const searchBarInputVariants = cva(
  [
    "min-w-0 flex-1 bg-transparent outline-none",
    "text-foreground placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Helpers ────────────────────────────────────────────────────────────────

const skeletonHeightMap: Record<SearchBarSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
}

const skeletonRoundedMap: Record<SearchBarRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
}

// ── Component ──────────────────────────────────────────────────────────────

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      value: valueProp,
      defaultValue = "",
      onChange,
      onSearch,
      onClear,
      placeholder,
      size = "md",
      variant = "outline",
      rounded = "lg",
      icon: Icon = SearchIcon,
      loading = false,
      shortcut,
      trailingSlot,
      debounceMs = 0,
      voice = false,
      onVoiceStart,
      onVoiceEnd,
      onVoiceError,
      disabled = false,
      autoFocus = false,
      locale = "en-US",
      className,
      ...props
    },
    ref
  ) => {
    const i18n = UI_I18N[locale].searchBar
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internalValue
    const inputRef = React.useRef<HTMLInputElement>(null)
    const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
      null
    )

    const {
      isListening,
      isSupported: voiceSupported,
      start: startVoice,
      stop: stopVoice,
    } = useSpeechRecognition({
      lang: locale,
      onStart: onVoiceStart,
      onEnd: onVoiceEnd,
      onError: onVoiceError,
      onResult: (transcript: string) => {
        if (!isControlled) setInternalValue(transcript)
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        onChange?.(transcript)
      },
    })

    React.useEffect(() => {
      return () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
      }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      if (!isControlled) setInternalValue(next)
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      if (debounceMs > 0) {
        debounceTimer.current = setTimeout(() => onChange?.(next), debounceMs)
      } else {
        onChange?.(next)
      }
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue("")
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      onChange?.("")
      onClear?.()
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSearch?.(value)
      if (e.key === "Escape" && value) handleClear()
    }

    const hasValue = value.length > 0

    return (
      <div
        ref={ref}
        role="search"
        data-slot="search-bar"
        aria-busy={loading || undefined}
        className={cn(
          searchBarVariants({ variant, size, rounded }),
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        <span data-slot="search-bar-icon" aria-hidden="true">
          {loading ? (
            <Spinner
              className={searchBarIconVariants({ size })}
              aria-hidden="true"
            />
          ) : (
            <Icon className={searchBarIconVariants({ size })} />
          )}
        </span>

        <Input
          ref={inputRef}
          data-slot="search-bar-input"
          type="text"
          role="searchbox"
          autoComplete="off"
          autoFocus={autoFocus}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? i18n.placeholder}
          aria-label={i18n.label}
          className={cn(
            "h-auto rounded-none border-none bg-transparent px-0 py-0",
            "focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-transparent",
            searchBarInputVariants({ size })
          )}
        />

        {hasValue && !loading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-slot="search-bar-clear"
            onClick={handleClear}
            disabled={disabled}
            aria-label={i18n.clear}
            className={cn(
              "rounded text-muted-foreground",
              { sm: "size-5", md: "size-6", lg: "size-7" }[size]
            )}
          >
            <XIcon className={searchBarIconVariants({ size })} />
          </Button>
        )}

        {voice && voiceSupported && !loading && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-slot="search-bar-voice"
            onClick={isListening ? stopVoice : startVoice}
            disabled={disabled}
            aria-label={isListening ? i18n.stopVoice : i18n.startVoice}
            aria-pressed={isListening}
            className={cn(
              "rounded text-muted-foreground",
              { sm: "size-5", md: "size-6", lg: "size-7" }[size],
              isListening && "text-destructive motion-safe:animate-pulse"
            )}
          >
            <MicIcon className={searchBarIconVariants({ size })} />
          </Button>
        )}

        {shortcut && !hasValue && !loading && (
          <span
            data-slot="search-bar-shortcut"
            aria-hidden="true"
            className="flex shrink-0 items-center"
          >
            <Kbd>{shortcut}</Kbd>
          </span>
        )}

        {trailingSlot && (
          <span
            data-slot="search-bar-trailing"
            className="flex shrink-0 items-center"
          >
            {trailingSlot}
          </span>
        )}
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export function SearchBarSkeleton({
  size = "md",
  rounded = "lg",
  className,
}: SearchBarSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "w-full",
        skeletonHeightMap[size],
        skeletonRoundedMap[rounded],
        className
      )}
    />
  )
}
