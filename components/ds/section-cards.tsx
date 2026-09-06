"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface SectionCardItem {
  title: string
  value: string
  badge?: { value: string; trend: "up" | "down" }
  description?: string
  footerTitle?: string
  footerDescription?: string
}

export interface SectionCardsProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionCardsVariants> {
  items: SectionCardItem[]
  loading?: boolean
}

// ── Variants ──

export const sectionCardsVariants = cva("", {
  variants: {
    columns: {
      2: "@xl/main:grid-cols-2",
      4: "@xl/main:grid-cols-2 @5xl/main:grid-cols-4",
    },
    variant: {
      default: "",
      gradient: "",
    },
  },
  defaultVariants: {
    columns: 4,
    variant: "gradient",
  },
})

// ── Component ──

export function SectionCards({
  items,
  columns = 4,
  variant = "gradient",
  loading = false,
  className,
  ...props
}: SectionCardsProps) {
  if (loading) {
    return (
      <div
        data-slot="section-cards-skeleton"
        className={cn(
          "grid grid-cols-1 gap-4 px-4 lg:px-6",
          sectionCardsVariants({ columns, variant }),
          className
        )}
        {...props}
      >
        {Array.from({ length: columns === 2 ? 2 : 4 }).map((_, i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-32" />
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div
      data-slot="section-cards"
      className={cn(
        "grid grid-cols-1 gap-4 px-4 lg:px-6",
        sectionCardsVariants({ columns, variant }),
        variant === "gradient" &&
          "*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Card key={item.title} className="@container/card">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.value}
            </CardTitle>
            {item.badge && (
              <CardAction>
                <Badge
                  variant="outline"
                  className={cn(
                    item.badge.trend === "down" && "text-destructive"
                  )}
                >
                  {item.badge.trend === "up" ? (
                    <TrendingUpIcon className="size-4" aria-hidden="true" />
                  ) : (
                    <TrendingDownIcon className="size-4" aria-hidden="true" />
                  )}
                  {item.badge.value}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          {(item.footerTitle || item.footerDescription) && (
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              {item.footerTitle && (
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {item.footerTitle}
                  {item.badge?.trend === "up" ? (
                    <TrendingUpIcon className="size-4" aria-hidden="true" />
                  ) : item.badge?.trend === "down" ? (
                    <TrendingDownIcon className="size-4" aria-hidden="true" />
                  ) : null}
                </div>
              )}
              {item.footerDescription && (
                <div className="text-muted-foreground">
                  {item.footerDescription}
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
