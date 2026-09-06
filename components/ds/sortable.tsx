"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SortableItem {
  id: string
  content: React.ReactNode
}

export interface SortableProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sortableVariants> {
  items: SortableItem[]
  onReorder?: (items: SortableItem[]) => void
}

// ── Variants ───────────────────────────────────────────────────────────────

export const sortableVariants = cva(
  "flex flex-col gap-2 rounded-2xl border bg-card p-3",
  {
    variants: {
      size: {
        sm: "gap-1.5",
        md: "gap-2",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function Sortable({
  className,
  items,
  onReorder,
  size = "md",
  ...props
}: SortableProps) {
  const [list, setList] = React.useState(items)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setList(items), [items])

  const move = (from: number, to: number) => {
    const next = [...list]
    const [m] = next.splice(from, 1)
    next.splice(to, 0, m)
    setList(next)
    onReorder?.(next)
  }

  return (
    <div
      data-slot="sortable"
      role="list"
      aria-label="Sortable list"
      className={cn(sortableVariants({ size }), className)}
      {...props}
    >
      {list.map((it, idx) => (
        <div
          key={it.id}
          role="listitem"
          tabIndex={0}
          aria-label={`Sortable item ${idx + 1} of ${list.length}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" && idx > 0) {
              e.preventDefault()
              move(idx, idx - 1)
            } else if (e.key === "ArrowDown" && idx < list.length - 1) {
              e.preventDefault()
              move(idx, idx + 1)
            }
          }}
          className="flex items-center gap-2 rounded-xl border bg-background p-3 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", String(idx))}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData("text/plain"))
            move(from, idx)
          }}
        >
          <GripVerticalIcon
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="flex-1 truncate text-sm">{it.content}</span>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Move up"
              disabled={idx === 0}
              onClick={() => move(idx, idx - 1)}
              className="size-6 rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              aria-label="Move down"
              disabled={idx === list.length - 1}
              onClick={() => move(idx, idx + 1)}
              className="size-6 rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-30"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
