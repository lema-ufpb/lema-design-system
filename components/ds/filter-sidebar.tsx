"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FilterSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: string[]
  priceRange?: [number, number]
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function FilterSidebar({
  className,
  categories = ["Shoes", "Clothing", "Accessories"],
  priceRange = [0, 500],
  loading = false,
  ...props
}: FilterSidebarProps) {
  if (loading) {
    return (
      <Card
        data-slot="filter-sidebar-skeleton"
        className={cn("p-4", className)}
        {...props}
      >
        <Skeleton className="h-48 w-full" />
      </Card>
    )
  }

  return (
    <Card
      data-slot="filter-sidebar"
      className={cn("p-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-foreground">Category</h4>
          {categories.map((c) => (
            <Label
              key={c}
              className="flex items-center gap-2 text-xs font-normal"
            >
              <Checkbox />
              {c}
            </Label>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-foreground">Price</h4>
          <Slider defaultValue={priceRange} min={0} max={500} step={10} />
          <span className="text-xs text-muted-foreground tabular-nums">
            ${priceRange[0]} — ${priceRange[1]}
          </span>
        </div>
      </div>
    </Card>
  )
}
