"use client"

import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CascaderOption {
  label: string
  value: string
  children?: CascaderOption[]
}

export interface CascaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cascaderVariants> {
  options: CascaderOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const cascaderVariants = cva("w-fit", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Helpers ────────────────────────────────────────────────────────────────

function getSkeletonDims() {
  return { trigger: "h-9 w-48", panel: "h-40 w-64" }
}

// ── Component ──────────────────────────────────────────────────────────────

export function Cascader({
  className,
  options,
  value = [],
  onValueChange,
  placeholder,
  locale: localeProp,
  loading = false,
  size = "md",
  ...props
}: CascaderProps) {
  const locale = useUILocale(localeProp)
  const t = UI_I18N[locale].select
  const resolvedPlaceholder = placeholder ?? t.placeholder
  const triggerId = React.useId()
  const [open, setOpen] = React.useState(false)
  const [path, setPath] = React.useState<string[]>(value)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setPath(value), [value])

  if (loading) {
    const dims = getSkeletonDims()
    return <Skeleton className={cn(dims.trigger, "rounded-xl", className)} />
  }

  const findPath = (
    opts: CascaderOption[],
    target: string[]
  ): CascaderOption[] => {
    const res: CascaderOption[] = []
    let cur = opts
    for (const v of target) {
      const f = cur.find((o) => o.value === v)
      if (!f) break
      res.push(f)
      cur = f.children ?? []
    }
    return res
  }

  const handleSelect = (level: number, opt: CascaderOption) => {
    const next = [...path.slice(0, level), opt.value]
    if (opt.children && opt.children.length > 0) {
      setPath(next)
    } else {
      setPath(next)
      onValueChange?.(next)
      setOpen(false)
    }
  }

  const display =
    findPath(options, path)
      .map((o) => o.label)
      .join(" / ") || placeholder

  const renderLevel = (opts: CascaderOption[], level: number) => (
    <div
      key={level}
      role="group"
      aria-label={`Level ${level + 1}`}
      className="min-w-32 border-r p-1 last:border-0 sm:min-w-40"
    >
      <div
        role="listbox"
        aria-orientation="vertical"
        className="flex flex-col gap-0.5"
      >
        {opts.map((opt) => {
          const active = path[level] === opt.value
          const hasChildren = !!opt.children?.length
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => handleSelect(level, opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleSelect(level, opt)
                }
                if (e.key === "Escape") setOpen(false)
                if (e.key === "ArrowRight" && hasChildren)
                  handleSelect(level, opt)
              }}
              className={cn(
                "flex h-8 w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                active && "bg-muted"
              )}
            >
              <span className="truncate">{opt.label}</span>
              <span className="flex items-center gap-1">
                {active && !opt.children && (
                  <CheckIcon className="size-3.5" aria-hidden="true" />
                )}
                {opt.children && (
                  <ChevronRightIcon
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )

  const levels: CascaderOption[][] = []
  let cur = options
  for (let i = 0; i <= path.length; i++) {
    levels.push(cur)
    const next = cur.find((o) => o.value === path[i])
    if (next?.children) cur = next.children
    else break
  }

  return (
    <div
      data-slot="cascader"
      className={cn(cascaderVariants({ size }), className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            variant="outline"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={resolvedPlaceholder}
            className="min-w-48 justify-between rounded-xl"
          >
            <span className="truncate">{display}</span>
            <ChevronRightIcon
              className="size-4 rotate-90 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex max-w-[calc(100vw-2rem)] gap-0 overflow-x-auto p-0"
          align="start"
          aria-labelledby={triggerId}
        >
          {levels.map((lvl, idx) => renderLevel(lvl, idx))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
