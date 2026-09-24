"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Variants ──

export const skeletonLayoutVariants = cva("flex w-full flex-col gap-6", {
  variants: {
    pattern: {
      dashboard: "",
      table: "",
      profile: "",
      form: "",
      list: "",
    },
  },
  defaultVariants: {
    pattern: "dashboard",
  },
})

// ── Types ──

export interface SkeletonLayoutProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonLayoutVariants> {
  /**
   * Layout pattern to render.
   */
  pattern?: "dashboard" | "table" | "profile" | "form" | "list"
  /**
   * Number of rows for table and list patterns.
   */
  rows?: number
  /**
   * Number of columns for table pattern.
   */
  columns?: number
  /**
   * Locale for accessibility label.
   */
  locale?: UILocale
}

// ── Component ──

export const SkeletonLayout = React.forwardRef<
  HTMLDivElement,
  SkeletonLayoutProps
>(
  (
    {
      pattern = "dashboard",
      rows = 4,
      columns = 4,
      locale: localeProp,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const t = UI_I18N[locale].skeletonLayout

    const renderDashboard = () => (
      <div className="flex w-full flex-col gap-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-5 rounded-md" />
              </div>
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-3 w-40" />
            </Card>
          ))}
        </div>

        {/* Chart + Table Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="flex flex-col gap-4 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-8 w-28" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </Card>
          <Card className="flex flex-col gap-4 p-6">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    )

    const renderTable = () => (
      <Card className="flex w-full flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-lg border border-border">
          {/* Table Header */}
          <div className="flex items-center gap-4 border-b border-border bg-muted/40 p-3">
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
          {/* Table Rows */}
          {Array.from({ length: rows }).map((_, r) => (
            <div
              key={r}
              className="flex items-center gap-4 border-b border-border p-3 last:border-0"
            >
              {Array.from({ length: columns }).map((_, c) => (
                <Skeleton
                  key={c}
                  className={cn("h-4 flex-1", c === 0 && "max-w-40")}
                />
              ))}
            </div>
          ))}
        </div>
      </Card>
    )

    const renderProfile = () => (
      <Card className="flex w-full max-w-2xl flex-col gap-6 p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="size-16 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2 pt-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full max-w-md pt-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t border-border pt-2 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </div>
      </Card>
    )

    const renderForm = () => (
      <Card className="flex w-full max-w-xl flex-col gap-6 p-6">
        <CardHeader className="flex flex-col gap-1 p-0">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-28" />
          </div>
        </CardContent>
      </Card>
    )

    const renderList = () => (
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
          >
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
          </div>
        ))}
      </div>
    )

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={t.loading}
        className={cn(skeletonLayoutVariants({ pattern }), className)}
        {...props}
      >
        {pattern === "dashboard" && renderDashboard()}
        {pattern === "table" && renderTable()}
        {pattern === "profile" && renderProfile()}
        {pattern === "form" && renderForm()}
        {pattern === "list" && renderList()}
      </div>
    )
  }
)

SkeletonLayout.displayName = "SkeletonLayout"
