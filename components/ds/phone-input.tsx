"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

// ── Data ──

export interface CountryData {
  iso: string
  name: string
  code: string
  flag: string
}

// Uma lista reduzida para o design system. Em um projeto real,
// você poderia injetar essa lista ou usar uma biblioteca como libphonenumber-js.
const defaultCountries: CountryData[] = [
  { iso: "BR", name: "Brasil", code: "+55", flag: "🇧🇷" },
  { iso: "US", name: "Estados Unidos", code: "+1", flag: "🇺🇸" },
  { iso: "PT", name: "Portugal", code: "+351", flag: "🇵🇹" },
  { iso: "ES", name: "Espanha", code: "+34", flag: "🇪🇸" },
  { iso: "FR", name: "França", code: "+33", flag: "🇫🇷" },
  { iso: "UK", name: "Reino Unido", code: "+44", flag: "🇬🇧" },
  { iso: "AR", name: "Argentina", code: "+54", flag: "🇦🇷" },
  { iso: "CO", name: "Colômbia", code: "+57", flag: "🇨🇴" },
  { iso: "MX", name: "México", code: "+52", flag: "🇲🇽" },
]

// ── Variants ──

export const phoneInputContainerVariants = cva(
  "flex w-full items-center rounded-md border border-input bg-background ring-offset-background transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-base",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      invalid: {
        true: "border-destructive focus-within:ring-destructive",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const phoneInputInputVariants = cva(
  "flex-1 bg-transparent px-3 py-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Types ──

export interface PhoneInputProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "onChange" | "value"
    >,
    Omit<
      VariantProps<typeof phoneInputContainerVariants>,
      "disabled" | "invalid"
    > {
  value?: string
  onChange?: (value: string) => void
  country?: string
  onCountryChange?: (country: string) => void
  countries?: CountryData[]
  loading?: boolean
  invalid?: boolean
  disabled?: boolean
  locale?: UILocale
}

// ── Component ──

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      country = "BR",
      onCountryChange,
      countries = defaultCountries,
      size = "md",
      disabled = false,
      invalid = false,
      loading = false,
      locale = "pt-BR",
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState<CountryData>(
      countries.find((c) => c.iso === country) || countries[0]
    )

    const i18n = UI_I18N[locale].phoneInput

    React.useEffect(() => {
      const newCountry = countries.find((c) => c.iso === country)
      if (newCountry) {
        setSelectedCountry(newCountry)
      }
    }, [country, countries])

    if (loading) {
      const dims = {
        sm: "h-8",
        md: "h-9",
        lg: "h-10",
      }
      return (
        <Skeleton className={cn("w-full", dims[size || "md"], className)} />
      )
    }

    return (
      <div
        className={cn(
          phoneInputContainerVariants({ size, disabled, invalid }),
          className
        )}
        data-slot="ds-phone-input"
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              aria-label={selectedCountry.name}
              disabled={disabled}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-l-md rounded-r-none border-r px-3 text-muted-foreground hover:bg-muted hover:text-foreground",
                size === "sm"
                  ? "h-full text-xs"
                  : size === "lg"
                    ? "h-full text-base"
                    : "h-full text-sm",
                disabled && "pointer-events-none opacity-50"
              )}
            >
              <span className="text-base leading-none">
                {selectedCountry.flag}
              </span>
              <span className="hidden sm:inline-block">
                {selectedCountry.code}
              </span>
              <ChevronsUpDown className="ml-1 size-3.5 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="start">
            <Command>
              <CommandInput placeholder={i18n.searchCountry} />
              <CommandList>
                <CommandEmpty>{i18n.noCountryFound}</CommandEmpty>
                <CommandGroup>
                  {countries.map((c) => (
                    <CommandItem
                      key={c.iso}
                      value={`${c.name} ${c.code} ${c.iso}`}
                      onSelect={() => {
                        setSelectedCountry(c)
                        onCountryChange?.(c.iso)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          selectedCountry.iso === c.iso
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="mr-2 text-base leading-none">
                        {c.flag}
                      </span>
                      <span className="flex-1 text-sm">{c.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {c.code}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <input
          ref={ref}
          type="tel"
          className={phoneInputInputVariants({ size })}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label={props["aria-label"] || placeholder || "Phone number"}
          aria-invalid={invalid}
          {...props}
        />
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"
