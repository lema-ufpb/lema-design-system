"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderSearchProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof headerSearchVariants> {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  rounded?: "full" | "md" | "none"
  locale?: UILocale
}

export type HeaderSearchVariants = VariantProps<typeof headerSearchVariants>

// ── Variants ───────────────────────────────────────────────────────────────

export const headerSearchVariants = cva(
  "relative flex items-center transition-all duration-300 ease-in-out",
  {
    variants: {
      isExpanded: {
        true: "w-full md:w-[300px] lg:w-[400px]",
        false: "w-10",
      },
      rounded: {
        full: "",
        md: "",
        none: "",
      },
    },
    defaultVariants: {
      isExpanded: false,
      rounded: "full",
    },
  }
)

export const headerSearchButtonVariants = cva(
  "flex shrink-0 items-center justify-center transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        none: "rounded-none",
      },
    },
    defaultVariants: { size: "md", rounded: "full" },
  }
)

// ── HeaderSearch ───────────────────────────────────────────────────────────

export const HeaderSearch = React.forwardRef<HTMLDivElement, HeaderSearchProps>(
  (
    {
      value,
      onChange,
      onSearch,
      placeholder = "Search...",
      isExpanded: isExpandedProp,
      rounded = "full",
      locale = "en-US",
      className,
      autoFocus = true,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(isExpandedProp || false)
    const [searchValue, setSearchValue] = React.useState(value || "")
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      if (isExpanded && autoFocus) {
        inputRef.current?.focus()
      }
    }, [isExpanded, autoFocus])

    const handleToggle = () => {
      setIsExpanded(!isExpanded)
      if (isExpanded) {
        setSearchValue("")
        onChange?.("")
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSearchValue(newValue)
      onChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSearch?.(searchValue)
      if (e.key === "Escape") handleToggle()
    }

    const roundedClasses = {
      full: "rounded-full",
      md: "rounded-md",
      none: "rounded-none",
    }

    return (
      <div
        ref={ref}
        className={cn(headerSearchVariants({ isExpanded, rounded }), className)}
        {...props}
      >
        <div className="flex w-full items-center">
          {!isExpanded ? (
            <Button
              variant="ghost"
              size="icon"
              className={cn(headerSearchButtonVariants({ rounded }))}
              onClick={handleToggle}
              aria-label={UI_I18N[locale].headerSearch.open}
            >
              <Search className="size-5" />
            </Button>
          ) : (
            <div className="relative flex w-full animate-in items-center duration-200 zoom-in-95 fade-in">
              <Search className="absolute left-3 size-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={cn(
                  "h-10 w-full pr-10 pl-9 ring-offset-background focus-visible:ring-1",
                  roundedClasses[rounded || "full"]
                )}
              />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-1 size-8 hover:bg-transparent",
                  roundedClasses[rounded || "full"]
                )}
                onClick={handleToggle}
                aria-label={UI_I18N[locale].headerSearch.close}
              >
                <X className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

HeaderSearch.displayName = "HeaderSearch"
