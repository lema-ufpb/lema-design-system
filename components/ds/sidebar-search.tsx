"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"

// ── Types ──

export interface SidebarSearchProps
  extends
    Omit<React.ComponentProps<"form">, "onSubmit">,
    VariantProps<typeof sidebarSearchVariants> {
  placeholder?: string
  defaultValue?: string
  onSearch?: (value: string) => void
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  locale?: UILocale
  loading?: boolean
}

// ── Variants ──

export const sidebarSearchVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Component ──

export function SidebarSearch({
  placeholder,
  defaultValue = "",
  onSearch,
  locale: localeProp,
  loading = false,
  className,
  size = "md",
  onSubmit,
  ...props
}: SidebarSearchProps) {
  const locale = useUILocale(localeProp)
  const t = UI_I18N[locale]?.sidebarSearch ?? UI_I18N["en-US"].sidebarSearch
  const id = React.useId()
  const inputId = `sidebar-search-input-${id}`
  const [value, setValue] = React.useState(defaultValue)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
    if (value.trim()) onSearch?.(value.trim())
  }

  if (loading) {
    return (
      <div data-slot="sidebar-search-skeleton" className={cn("p-2", className)}>
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    )
  }

  return (
    <form
      data-slot="sidebar-search"
      role="search"
      aria-label={t.label}
      onSubmit={handleSubmit}
      className={cn(sidebarSearchVariants({ size }), className)}
      {...props}
    >
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor={inputId} className="sr-only">
            {t.label}
          </Label>
          <SidebarInput
            id={inputId}
            placeholder={placeholder ?? t.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-8 pl-8"
            aria-label={t.label}
          />
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none"
            aria-hidden="true"
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
