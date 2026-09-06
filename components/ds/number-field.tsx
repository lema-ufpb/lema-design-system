"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// ── Types ──────────────────────────────────────────────────────────────────

export interface NumberFieldProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof numberFieldVariants> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

// ── Variants ───────────────────────────────────────────────────────────────

export const numberFieldVariants = cva(
  "flex items-center gap-1 rounded-xl border bg-card p-1",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function NumberField({
  className,
  value: controlled,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  size = "md",
  ...props
}: NumberFieldProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : internal

  const update = (next: number) => {
    const clamped = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next))
    if (!isControlled) setInternal(clamped)
    onChange?.(clamped)
  }

  return (
    <div
      data-slot="number-field"
      className={cn(numberFieldVariants({ size }), className)}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 rounded-lg"
        aria-label="Decrease"
        onClick={() => update((value ?? 0) - step)}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => update(Number(e.target.value))}
        className="h-7 border-0 bg-transparent text-center tabular-nums focus-visible:ring-0"
        aria-label="Number field"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 rounded-lg"
        aria-label="Increase"
        onClick={() => update((value ?? 0) + step)}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  )
}
