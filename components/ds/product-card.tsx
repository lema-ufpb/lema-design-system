"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  price: string
  originalPrice?: string
  imageSrc?: string
  badge?: string
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function ProductCard({
  className,
  title,
  price,
  originalPrice,
  imageSrc,
  badge,
  loading = false,
  ...props
}: ProductCardProps) {
  if (loading) {
    return (
      <Card
        data-slot="product-card-skeleton"
        className={cn("overflow-hidden p-0", className)}
        {...props}
      >
        <Skeleton className="h-40 w-full" />
        <div className="p-4">
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    )
  }

  return (
    <Card
      data-slot="product-card"
      className={cn(
        "overflow-hidden p-0 transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-40 w-full object-cover"
        />
      )}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-medium text-foreground">
            {title}
          </h3>
          {badge && <Badge className="rounded-full text-xs">{badge}</Badge>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-foreground tabular-nums">
            {price}
          </span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground tabular-nums line-through">
              {originalPrice}
            </span>
          )}
        </div>
        <Button size="sm" className="mt-2 w-full rounded-full">
          Add to cart
        </Button>
      </div>
    </Card>
  )
}
