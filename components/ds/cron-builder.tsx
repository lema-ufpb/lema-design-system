"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Clock, Code2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { UILocale } from "@/lib/ui-i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ── Types ──────────────────────────────────────────────────────────────────

export type CronBuilderMode = "simple" | "advanced"

export interface CronBuilderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string
  onChange?: (value: string) => void
  mode?: CronBuilderMode
  disabled?: boolean
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const cronBuilderContainerVariants = cva(
  "w-full rounded-xl border border-border bg-card p-4",
  {
    variants: {}
  }
)

// ── Cron parsing ──────────────────────────────────────────────────────────

function parseCron(cron: string): {
  minute: string
  hour: string
  day: string
  month: string
  weekday: string
} {
  const parts = cron.trim().split(/\s+/)
  return {
    minute: parts[0] ?? "*",
    hour: parts[1] ?? "*",
    day: parts[2] ?? "*",
    month: parts[3] ?? "*",
    weekday: parts[4] ?? "*",
  }
}

function buildCron(
  minute: string,
  hour: string,
  day: string,
  month: string,
  weekday: string
) {
  return `${minute} ${hour} ${day} ${month} ${weekday}`
}

/** Approximate human-readable description of a cron expression (en-US only for now) */
function describeCron(cron: string): string {
  const { minute, hour, day, weekday } = parseCron(cron)

  if (cron === "* * * * *") return "Every minute"
  if (minute !== "*" && hour !== "*" && day === "*" && weekday === "*") {
    return `Daily at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
  }
  if (minute !== "*" && hour !== "*" && weekday !== "*" && day === "*") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayNames = weekday
      .split(",")
      .map((d) => days[parseInt(d)] ?? d)
      .join(", ")
    return `${dayNames} at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
  }
  if (minute !== "*" && hour === "*")
    return `At :${minute.padStart(2, "0")} every hour`
  if (minute === "0" && hour !== "*") return `Hourly on the hour (${hour}:00)`
  return cron
}

/** Compute approximate next N execution times */
function getNextRuns(cron: string, count = 3): Date[] {
  const { minute, hour, weekday } = parseCron(cron)
  const results: Date[] = []
  const now = new Date()
  const cursor = new Date(now)
  cursor.setSeconds(0, 0)
  cursor.setMinutes(cursor.getMinutes() + 1)

  let safety = 0
  while (results.length < count && safety < 10000) {
    safety++
    const m = parseInt(minute)
    const h = parseInt(hour)
    const w = weekday !== "*" ? weekday.split(",").map(Number) : null

    const minuteOk = minute === "*" || cursor.getMinutes() === m
    const hourOk = hour === "*" || cursor.getHours() === h
    const weekdayOk = !w || w.includes(cursor.getDay())

    if (minuteOk && hourOk && weekdayOk) {
      results.push(new Date(cursor))
    }

    cursor.setMinutes(cursor.getMinutes() + 1)
  }
  return results
}

// ── Preset schedules ──────────────────────────────────────────────────────

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Daily at midnight", value: "0 0 * * *" },
  { label: "Daily at noon", value: "0 12 * * *" },
  { label: "Weekdays at 9 AM", value: "0 9 * * 1-5" },
  { label: "Every Monday", value: "0 8 * * 1" },
  { label: "Weekly (Sunday)", value: "0 0 * * 0" },
  { label: "Monthly (1st)", value: "0 0 1 * *" },
]

// ── CronBuilder ────────────────────────────────────────────────────────────

export function CronBuilder({
  value = "0 * * * *",
  onChange,
  mode: modeProp = "simple",
  disabled = false,
  loading = false,
  locale = "en-US",
  className,
  ...props
}: CronBuilderProps) {
  const [mode, setMode] = React.useState<CronBuilderMode>(modeProp)
  const [cron, setCron] = React.useState(value)
  const [rawInput, setRawInput] = React.useState(value)
  const [rawError, setRawError] = React.useState(false)

  const parsed = React.useMemo(() => parseCron(cron), [cron])

  const update = React.useCallback(
    (newCron: string) => {
      setCron(newCron)
      setRawInput(newCron)
      onChange?.(newCron)
    },
    [onChange]
  )

  const nextRuns = React.useMemo(() => {
    try {
      return getNextRuns(cron)
    } catch {
      return []
    }
  }, [cron])

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div
        className={cn(
          cronBuilderContainerVariants(),
          "flex flex-col gap-3",
          className
        )}
      >
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20" />
          ))}
        </div>
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    )
  }

  const description = describeCron(cron)
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div
      className={cn(
        cronBuilderContainerVariants(),
        "flex flex-col gap-4",
        className
      )}
      {...props}
    >
      {/* Mode tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as CronBuilderMode)}>
        <div className="flex items-center justify-between gap-2">
          <Label className="text-sm font-medium">Schedule</Label>
          <TabsList className="h-7">
            <TabsTrigger value="simple" className="text-xs" disabled={disabled}>
              <Clock className="mr-1 size-3" />
              Simple
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="text-xs"
              disabled={disabled}
            >
              <Code2 className="mr-1 size-3" />
              Advanced
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Simple Mode ───────────────────────────────────────── */}
        <TabsContent value="simple" className="mt-3 flex flex-col gap-3">
          {/* Presets */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Quick presets
            </Label>
            <Select
              value={PRESETS.find((p) => p.value === cron)?.value ?? ""}
              onValueChange={(v) => v && update(v)}
              disabled={disabled}
            >
              <SelectTrigger className="h-9 text-sm" aria-label="Quick presets">
                <SelectValue placeholder="Choose a preset…" />
              </SelectTrigger>
              <SelectContent>
                {PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Day of week picker */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Day of week</Label>
            <ToggleGroup
              type="multiple"
              size="sm"
              disabled={disabled}
              value={parsed.weekday === "*" ? [] : parsed.weekday.split(",")}
              onValueChange={(selected) => {
                const wd = selected.length === 0 ? "*" : selected.join(",")
                update(
                  buildCron(
                    parsed.minute,
                    parsed.hour,
                    parsed.day,
                    parsed.month,
                    wd
                  )
                )
              }}
            >
              {WEEKDAYS.map((day, i) => (
                <ToggleGroupItem
                  key={day}
                  value={String(i)}
                  className="text-xs"
                >
                  {day}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Hour & Minute */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Hour</Label>
              <Select
                value={parsed.hour}
                onValueChange={(h) =>
                  update(
                    buildCron(
                      parsed.minute,
                      h,
                      parsed.day,
                      parsed.month,
                      parsed.weekday
                    )
                  )
                }
                disabled={disabled}
              >
                <SelectTrigger className="h-9 text-sm" aria-label="Hour">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every hour</SelectItem>
                  {Array.from({ length: 24 }, (_, h) => (
                    <SelectItem key={h} value={String(h)}>
                      {String(h).padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Minute</Label>
              <Select
                value={parsed.minute}
                onValueChange={(m) =>
                  update(
                    buildCron(
                      m,
                      parsed.hour,
                      parsed.day,
                      parsed.month,
                      parsed.weekday
                    )
                  )
                }
                disabled={disabled}
              >
                <SelectTrigger className="h-9 text-sm" aria-label="Minute">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">Every minute</SelectItem>
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      :{String(m).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* ── Advanced Mode ─────────────────────────────────────── */}
        <TabsContent value="advanced" className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Cron expression
            </Label>
            <div className="flex gap-2">
              <Input
                value={rawInput}
                onChange={(e) => {
                  setRawInput(e.target.value)
                  const parts = e.target.value.trim().split(/\s+/)
                  if (parts.length === 5) {
                    setRawError(false)
                    update(e.target.value.trim())
                  } else {
                    setRawError(true)
                  }
                }}
                className={cn(
                  "h-9 font-mono text-sm",
                  rawError &&
                    "border-destructive focus-visible:ring-destructive"
                )}
                placeholder="* * * * *"
                disabled={disabled}
                aria-label="Cron expression"
                aria-describedby="cron-format-hint"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => update("* * * * *")}
                disabled={disabled}
                aria-label="Reset to every minute"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
            <p id="cron-format-hint" className="text-xs text-muted-foreground">
              Format:{" "}
              <code className="font-mono">minute hour day month weekday</code>
            </p>
          </div>

          {/* Field labels */}
          <div className="grid grid-cols-5 gap-2">
            {["Min", "Hour", "Day", "Month", "Weekday"].map((f, i) => {
              const v = [
                parsed.minute,
                parsed.hour,
                parsed.day,
                parsed.month,
                parsed.weekday,
              ][i]!
              return (
                <div key={f} className="flex flex-col items-center gap-0.5">
                  <span className="text-xs text-muted-foreground">{f}</span>
                  <code className="text-xs font-semibold text-foreground">
                    {v}
                  </code>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Output ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
        {/* Current expression */}
        <div className="flex items-center justify-between gap-2">
          <code className="text-xs font-semibold text-foreground">{cron}</code>
          <Badge variant="secondary" className="text-xs">
            {description}
          </Badge>
        </div>
        {/* Next runs */}
        {nextRuns.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              Next executions:
            </span>
            {nextRuns.map((d, i) => (
              <span key={i} className="text-xs text-foreground tabular-nums">
                {d.toLocaleString(locale, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
  }
)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
