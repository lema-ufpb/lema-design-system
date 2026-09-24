"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  CommandSeparator,
} from "@/components/ui/command"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface Option {
  label: string
  value: string
  icon?: React.ElementType
}

export const multiSelectVariants = cva(
  "m-1 transition-colors hover:bg-muted focus:bg-muted",
  {
    variants: {
      size: {
        sm: "h-5 px-1 text-xs",
        md: "h-6 px-2 text-xs",
        lg: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface MultiSelectProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">,
    VariantProps<typeof multiSelectVariants> {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxCount?: number
  locale?: UILocale
}

// ── Component ──

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      value,
      onChange,
      placeholder,
      maxCount = 3,
      locale: localeProp,
      size = "md",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [open, setOpen] = React.useState(false)

    const t = UI_I18N[locale]
    const currentPlaceholder = placeholder ?? t.select.placeholder
    const searchPlaceholder = t.select.search
    const noResults = t.select.noResults

    const selectedValues = new Set(value)

    const handleSelect = (currentValue: string) => {
      const newSelected = new Set(selectedValues)
      if (newSelected.has(currentValue)) {
        newSelected.delete(currentValue)
      } else {
        newSelected.add(currentValue)
      }
      onChange(Array.from(newSelected))
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange([])
    }

    const handleRemoveOption = (e: React.MouseEvent, optionValue: string) => {
      e.stopPropagation()
      const newSelected = new Set(selectedValues)
      newSelected.delete(optionValue)
      onChange(Array.from(newSelected))
    }

    const selectedOptions = options.filter((opt) =>
      selectedValues.has(opt.value)
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={currentPlaceholder}
            className={cn(
              "h-auto min-h-10 w-full justify-between p-1",
              disabled && "pointer-events-none opacity-50",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <div className="flex flex-wrap items-center gap-1 overflow-hidden pl-2">
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions.slice(0, maxCount).map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className={cn(multiSelectVariants({ size }))}
                    >
                      {option.icon && (
                        <option.icon className="mr-1 size-3 text-muted-foreground" />
                      )}
                      {option.label}
                      <div
                        role="button"
                        tabIndex={0}
                        className="ml-1 rounded-full ring-offset-background outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRemoveOption(
                              e as unknown as React.MouseEvent,
                              option.value
                            )
                          }
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => handleRemoveOption(e, option.value)}
                      >
                        <XIcon className="size-3 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">{t.badge.remove}</span>
                      </div>
                    </Badge>
                  ))}
                  {selectedOptions.length > maxCount && (
                    <Badge
                      variant="secondary"
                      className={cn(multiSelectVariants({ size }))}
                    >
                      +{selectedOptions.length - maxCount} {t.select.selected}
                    </Badge>
                  )}
                </>
              ) : (
                <span className="px-2 font-normal text-muted-foreground">
                  {currentPlaceholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 pr-2">
              {selectedValues.size > 0 && !disabled && (
                <div
                  role="button"
                  tabIndex={0}
                  className="rounded-full p-1 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      handleClear(e as unknown as React.MouseEvent)
                  }}
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">{t.combobox.clearSelection}</span>
                </div>
              )}
              <ChevronDownIcon className="size-4 text-muted-foreground opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{noResults}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("size-3")} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 size-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => onChange([])}
                      className="justify-center text-center text-sm font-medium"
                    >
                      {t.combobox.clearAll}
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)
MultiSelect.displayName = "MultiSelect"
