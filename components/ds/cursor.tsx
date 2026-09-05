"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MousePointer2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CursorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cursorVariants> {
  name?: string
  color?: string
  x?: number
  y?: number
}

// ── Variants ───────────────────────────────────────────────────────────────

export const cursorVariants = cva("pointer-events-none absolute z-50 flex items-center gap-1 transition-all duration-150", {
  variants: {
    size: {
      sm: "[&_svg]:size-4",
      md: "[&_svg]:size-5",
      lg: "[&_svg]:size-6",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Cursor({ className, name, color = "var(--primary)", x = 0, y = 0, size = "md", style, ...props }: CursorProps) {
  return (
    <div
      data-slot="cursor"
      aria-hidden="true"
      className={cn(cursorVariants({ size }), className)}
      style={{ left: x, top: y, ...style }}
      {...props}
    >
      <MousePointer2Icon className="shrink-0 rotate-12 fill-current" style={{ color }} aria-hidden="true" />
      {name && (
        <span
          className="rounded-full border border-white/20 px-2 py-0.5 text-xs font-medium shadow-md"
          style={{ backgroundColor: color, color: "white" }}
        >
          {name}
        </span>
      )}
    </div>
  )
}
