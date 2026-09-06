"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface GanttTask {
  id: string
  name: string
  start: number
  end: number
  progress?: number
  color?: string
}

export interface GanttProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ganttVariants> {
  tasks: GanttTask[]
  range?: [number, number]
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const ganttVariants = cva(
  "w-full overflow-x-auto rounded-2xl border bg-card p-4",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function Gantt({
  className,
  tasks,
  range,
  size = "md",
  loading = false,
  ...props
}: GanttProps) {
  if (loading) {
    return (
      <div
        data-slot="gantt-skeleton"
        className={cn(ganttVariants({ size }), className)}
        {...props}
      >
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full rounded-md" />
          ))}
        </div>
      </div>
    )
  }

  const min = range?.[0] ?? Math.min(...tasks.map((t) => t.start))
  const max = range?.[1] ?? Math.max(...tasks.map((t) => t.end))
  const total = max - min || 1

  return (
    <div
      data-slot="gantt"
      className={cn(ganttVariants({ size }), className)}
      {...props}
    >
      <div className="flex flex-col gap-3">
        {tasks.map((task) => {
          const left = ((task.start - min) / total) * 100
          const width = ((task.end - task.start) / total) * 100
          return (
            <div key={task.id} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-xs font-medium text-muted-foreground">
                {task.name}
              </span>
              <div className="relative h-6 flex-1 rounded-full bg-muted">
                <div
                  className="absolute top-0 h-6 rounded-full bg-primary transition-all"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: task.color,
                  }}
                  aria-label={`${task.name} ${task.progress ?? 0}%`}
                  role="progressbar"
                  aria-valuenow={task.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {typeof task.progress === "number" && (
                    <span
                      className="absolute inset-0 rounded-full bg-primary-foreground/20"
                      style={{ width: `${task.progress}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
