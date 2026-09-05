"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CascaderOption {
  label: string
  value: string
  children?: CascaderOption[]
}

export interface CascaderProps extends React.HTMLAttributes<HTMLDivElement> {
  options: CascaderOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
}

// ── Component ──────────────────────────────────────────────────────────────

export function Cascader({ className, options, value = [], onValueChange, placeholder = "Select", ...props }: CascaderProps) {
  const [open, setOpen] = React.useState(false)
  const [path, setPath] = React.useState<string[]>(value)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setPath(value), [value])

  const findPath = (opts: CascaderOption[], target: string[]): CascaderOption[] => {
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

  const display = findPath(options, path).map((o) => o.label).join(" / ") || placeholder

  const renderLevel = (opts: CascaderOption[], level: number) => (
    <div key={level} className="min-w-40 border-r p-1 last:border-0">
      {opts.map((opt) => {
        const active = path[level] === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => handleSelect(level, opt)}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
              active && "bg-muted"
            )}
          >
            <span className="truncate">{opt.label}</span>
            <span className="flex items-center gap-1">
              {active && !opt.children && <CheckIcon className="size-3" />}
              {opt.children && <ChevronRightIcon className="size-3 text-muted-foreground" />}
            </span>
          </button>
        )
      })}
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
    <div data-slot="cascader" className={cn("w-fit", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-48 justify-between rounded-xl">
            <span className="truncate">{display}</span>
            <ChevronRightIcon className="size-4 rotate-90 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-0 p-0" align="start">
          {levels.map((lvl, idx) => renderLevel(lvl, idx))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
