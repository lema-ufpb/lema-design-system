"use client"

import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export type VirtualListSize = "sm" | "md" | "lg"

export interface VirtualListProps<
  T = unknown,
> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[]
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Estimated item height in px — used for initial layout, refined after measurement */
  estimateSize?: number
  /** Number of extra items to render above and below the visible window */
  overscan?: number
  /** Container height in px */
  height?: number
  size?: VirtualListSize
  /** Show skeleton rows while loading */
  loading?: boolean
  /** Number of skeleton rows to show when loading */
  loadingCount?: number
  /** Empty state content — shown when items is empty and not loading */
  emptyContent?: React.ReactNode
}

// ── Variants ───────────────────────────────────────────────────────────────

export const virtualListContainerVariants = cva(
  "relative w-full overflow-auto rounded-lg border border-border",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const virtualListSkeletonRowVariants = cva(
  "flex items-center gap-3 border-b border-border px-4",
  {
    variants: {
      size: {
        sm: "h-7",
        md: "h-8",
        lg: "h-9",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Skeleton dims ─────────────────────────────────────────────────────────

const skeletonDims: Record<
  VirtualListSize,
  { a: string; b: string; c: string }
> = {
  sm: { a: "h-3 w-32", b: "h-3 w-20", c: "h-3 w-12" },
  md: { a: "h-4 w-40", b: "h-4 w-24", c: "h-4 w-16" },
  lg: { a: "h-5 w-48", b: "h-5 w-28", c: "h-5 w-20" },
}

// ── Default estimate size by size variant ─────────────────────────────────

const DEFAULT_ESTIMATE: Record<VirtualListSize, number> = {
  sm: 28,
  md: 32,
  lg: 36,
}

// ── VirtualList ────────────────────────────────────────────────────────────

export function VirtualList<T = unknown>({
  items,
  renderItem,
  estimateSize,
  overscan = 5,
  height = 400,
  size = "md",
  loading = false,
  loadingCount = 12,
  emptyContent,
  className,
  style,
  ...props
}: VirtualListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowHeight = estimateSize ?? DEFAULT_ESTIMATE[size]

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    const d = skeletonDims[size]
    return (
      <div
        className={cn(virtualListContainerVariants({ size }), className)}
        style={{ height, ...style }}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: loadingCount }).map((_, i) => (
          <div key={i} className={virtualListSkeletonRowVariants({ size })}>
            <Skeleton className={d.a} />
            <Skeleton className={cn(d.b, "ml-auto")} />
            <Skeleton className={d.c} />
          </div>
        ))}
      </div>
    )
  }

  // ── Empty ─────────────────────────────────────────────────────────────────

  if (items.length === 0) {
    return (
      <div
        className={cn(
          virtualListContainerVariants({ size }),
          "flex items-center justify-center",
          className
        )}
        style={{ height, ...style }}
        {...props}
      >
        {emptyContent ?? (
          <span className="text-sm text-muted-foreground">No items</span>
        )}
      </div>
    )
  }

  // ── Virtualized list ──────────────────────────────────────────────────────

  return (
    <div
      ref={parentRef}
      className={cn(virtualListContainerVariants({ size }), className)}
      style={{ height, overflowY: "auto", ...style }}
      role="list"
      {...props}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            role="listitem"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index]!, virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  )
}
