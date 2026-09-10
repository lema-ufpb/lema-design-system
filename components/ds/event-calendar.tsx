"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  color?: string
}

export interface EventCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  events: CalendarEvent[]
  month?: Date
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const eventCalendarVariants = cva("w-full rounded-2xl border bg-card p-4")

// ── Component ──────────────────────────────────────────────────────────────

export function EventCalendar({
  className,
  events,
  month = new Date(),
  loading = false,
  ...props
}: EventCalendarProps) {
  if (loading) {
    return (
      <div
        data-slot="event-calendar-skeleton"
        className={cn(eventCalendarVariants(), className)}
        {...props}
      >
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const year = month.getFullYear()
  const mon = month.getMonth()
  const days = new Date(year, mon + 1, 0).getDate()
  const startDay = new Date(year, mon, 1).getDay()

  return (
    <Card
      data-slot="event-calendar"
      className={cn(eventCalendarVariants(), className)}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {month.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>
      <div
        role="grid"
        aria-label={month.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
        className="flex flex-col gap-1"
      >
        <div
          role="row"
          className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground"
        >
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <span key={d} role="columnheader" className="py-1">
              {d}
            </span>
          ))}
        </div>
        {(() => {
          const cells: React.ReactNode[] = []
          for (let i = 0; i < startDay; i++)
            cells.push(
              <span
                key={`e-${i}`}
                role="gridcell"
                aria-hidden="true"
                className="h-10"
              />
            )
          for (let i = 0; i < days; i++) {
            const day = i + 1
            const iso = `${year}-${String(mon + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const dayEvents = events.filter((e) => e.date === iso)
            const hasEvents = dayEvents.length > 0
            cells.push(
              <button
                key={day}
                type="button"
                role="gridcell"
                aria-selected={hasEvents}
                aria-label={`${day} ${month.toLocaleDateString("pt-BR", { month: "short" })}${hasEvents ? `, ${dayEvents.length} eventos` : ""}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    ;(e.currentTarget as HTMLElement).click()
                  }
                }}
                className="flex h-10 flex-col items-center justify-center rounded-md border border-transparent p-1 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-selected:bg-primary/10"
              >
                <span className="text-xs tabular-nums">{day}</span>
                <div className="flex gap-0.5" aria-hidden="true">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="size-1 rounded-full bg-primary"
                      style={{ backgroundColor: e.color }}
                    />
                  ))}
                </div>
              </button>
            )
          }
          const rows: React.ReactNode[][] = []
          for (let i = 0; i < cells.length; i += 7)
            rows.push(cells.slice(i, i + 7))
          return rows.map((row, idx) => (
            <div key={idx} role="row" className="grid grid-cols-7 gap-1">
              {row}
            </div>
          ))
        })()}
      </div>
    </Card>
  )
}
