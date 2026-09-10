"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ScheduleSlot {
  time?: string
  title?: string
  color?: string
}

export interface ScheduleProps extends React.HTMLAttributes<HTMLDivElement> {
  days?: string[]
  slots: ScheduleSlot[][]
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const scheduleVariants = cva(
  "w-full overflow-x-auto rounded-2xl border bg-card p-4"
)

// ── Component ──────────────────────────────────────────────────────────────

export function Schedule({
  className,
  days = ["Seg", "Ter", "Qua", "Qui", "Sex"],
  slots,
  loading = false,
  ...props
}: ScheduleProps) {
  if (loading) {
    return (
      <div
        data-slot="schedule-skeleton"
        className={cn(scheduleVariants(), className)}
        {...props}
      >
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <Card
      data-slot="schedule"
      className={cn(scheduleVariants(), className)}
      {...props}
    >
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `60px repeat(${days.length}, 1fr)` }}
      >
        <span />
        {days.map((d) => (
          <span
            key={d}
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {d}
          </span>
        ))}
        {slots.map((row, ri) => (
          <React.Fragment key={ri}>
            <span className="py-2 text-xs text-muted-foreground tabular-nums">
              {row[0]?.time ?? ""}
            </span>
            {days.map((_, ci) => {
              const slot = row[ci]
              return (
                <div
                  key={ci}
                  className={cn(
                    "h-10 rounded-md border p-1 text-xs",
                    slot?.title
                      ? "border-primary/20 bg-primary/10 text-foreground"
                      : "border-transparent bg-muted/30"
                  )}
                  style={{ backgroundColor: slot?.color }}
                >
                  {slot?.title && (
                    <span className="truncate text-xs font-medium">
                      {slot.title}
                    </span>
                  )}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </Card>
  )
}
