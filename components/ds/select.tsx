"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, Loader2Icon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command as CommandRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface SelectOption {
  value: string
  label: string
  group?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  searchable?: boolean
  async?: boolean
  loadOptions?: (search: string) => Promise<SelectOption[]>
  creatable?: boolean
  onCreate?: (label: string) => Promise<string>
  size?: "sm" | "md" | "lg"
  placeholder?: string
  loading?: boolean
  error?: string
  label?: string
  locale?: UILocale
  disabled?: boolean
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
}

// ── Variants ──

export const triggerVariants = cva(
  "flex w-full items-center justify-between rounded-3xl border border-transparent bg-input/50 px-3 text-left font-medium transition-[color,box-shadow,background-color] outline-none hover:bg-input/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-8 gap-1.5 text-xs",
        md: "h-9 gap-2 text-sm",
        lg: "h-10 gap-2 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──

function Select({
  options,
  value,
  onChange,
  searchable = false,
  async: isAsync = false,
  loadOptions,
  creatable = false,
  onCreate,
  size = "md",
  placeholder,
  loading = false,
  error,
  label,
  locale = "pt-BR",
  disabled = false,
  className,
  side,
  align = "start",
  sideOffset = 4,
  alignOffset,
}: SelectProps) {
  const i18n = UI_I18N[locale]
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [asyncOptions, setAsyncOptions] = React.useState<SelectOption[]>([])
  const [asyncLoading, setAsyncLoading] = React.useState(false)
  const [creating, setCreating] = React.useState(false)

  // Debounced async loading
  React.useEffect(() => {
    if (!isAsync || !loadOptions || !open) return
    const timer = setTimeout(async () => {
      try {
        setAsyncLoading(true)
        const result = await loadOptions(search)
        setAsyncOptions(result)
      } finally {
        setAsyncLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [search, isAsync, loadOptions, open])

  const displayOptions = isAsync ? asyncOptions : options

  const filteredOptions = searchable
    ? displayOptions.filter(
        (opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase()) ||
          opt.value.toLowerCase().includes(search.toLowerCase())
      )
    : displayOptions

  const grouped = filteredOptions.reduce<Record<string, SelectOption[]>>(
    (acc, opt) => {
      const group = opt.group ?? ""
      if (!acc[group]) acc[group] = []
      acc[group].push(opt)
      return acc
    },
    {}
  )

  const handleCreate = async () => {
    if (!onCreate || !search.trim()) return
    setCreating(true)
    try {
      const newValue = await onCreate(search.trim())
      onChange?.(newValue)
      setSearch("")
      setOpen(false)
    } finally {
      setCreating(false)
    }
  }

  const selectedOption = options.find((o) => o.value === value)

  if (loading) {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <Skeleton className="h-4 w-20 rounded-md" />}
        <Skeleton
          className={cn(
            "w-full rounded-3xl",
            size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9"
          )}
        />
      </div>
    )
  }

  return (
    <div data-slot="ds-select" className="flex flex-col gap-1.5">
      {label && (
        <Label
          data-slot="ds-select-label"
          className={cn(
            "font-medium text-muted-foreground",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            data-slot="ds-select-trigger"
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              triggerVariants({ size }),
              "font-normal",
              !selectedOption && "text-muted-foreground",
              className
            )}
          >
            <span className="truncate">
              {selectedOption?.label ?? placeholder ?? i18n.select.placeholder}
            </span>
            <ChevronDownIcon
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <CommandRoot>
            {searchable && (
              <CommandInput
                placeholder={i18n.select.search}
                value={search}
                onValueChange={setSearch}
              />
            )}
            <CommandList>
              {asyncLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
                </div>
              ) : Object.keys(grouped).length === 0 &&
                !(creatable && search.trim()) ? (
                <CommandEmpty>{i18n.select.noResults}</CommandEmpty>
              ) : (
                Object.entries(grouped).map(([group, groupOptions]) => (
                  <CommandGroup key={group} heading={group || undefined}>
                    {groupOptions.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                        onSelect={(currentValue) => {
                          onChange?.(currentValue)
                          setOpen(false)
                          setSearch("")
                        }}
                      >
                        {opt.icon && (
                          <span className="mr-2 inline-flex">{opt.icon}</span>
                        )}
                        <span>{opt.label}</span>
                        {value === opt.value && (
                          <CheckIcon className="ml-auto size-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
              {creatable && search.trim() && (
                <CommandGroup>
                  <CommandItem
                    value={`__create__${search}`}
                    onSelect={handleCreate}
                    disabled={creating}
                  >
                    {creating ? (
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                    ) : (
                      <PlusIcon className="mr-2 size-4" />
                    )}
                    {i18n.select.create} &ldquo;{search}&rdquo;
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </CommandRoot>
        </PopoverContent>
      </Popover>
      {error && (
        <p
          data-slot="ds-select-error"
          className={cn(
            "text-destructive",
            size === "sm" ? "text-[10px]" : "text-xs"
          )}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { Select }
