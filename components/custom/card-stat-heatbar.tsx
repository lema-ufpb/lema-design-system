import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  type CardStatSize,
  type FmtProps,
  SIZE,
  applyFmt,
} from "./card-stats-shared"

export interface CardStatHeatbarZone {
  label: string
  color: string
  max: number
}

const DEFAULT_HEATBAR_ZONES: CardStatHeatbarZone[] = [
  { label: "Poor", color: "var(--color-risk-1)", max: 25 },
  { label: "Fair", color: "var(--color-risk-2)", max: 50 },
  { label: "Good", color: "var(--color-risk-3)", max: 75 },
  { label: "Excellent", color: "var(--color-risk-4)", max: 100 },
]

export interface CardStatHeatbarProps extends FmtProps {
  label: string
  value: number
  min?: number
  max?: number
  description?: string
  zones?: CardStatHeatbarZone[]
  icon?: React.ElementType
  size?: CardStatSize
  className?: string
  loading?: boolean
  empty?: boolean
}

export function CardStatHeatbar({
  label,
  value,
  min = 0,
  max = 100,
  description,
  zones = DEFAULT_HEATBAR_ZONES,
  icon: Icon,
  size = "md",
  className,
  loading,
  empty,
  ...fmt
}: CardStatHeatbarProps) {
  const s = SIZE[size]

  if (loading) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className={cn(s.headerIcon, "rounded-md")} />
        </CardHeader>
        <CardContent className={cn("flex flex-col", s.contentGap)}>
          <div className="flex items-baseline justify-between">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 pb-6">
            <Skeleton className={cn(s.trackH, "rounded-full")} />
            <div className="flex justify-between px-0.5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-2 w-8 rounded" />
              ))}
            </div>
          </div>
          <Skeleton className="h-3 w-40 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  if (empty) {
    return (
      <Card size="sm" className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <span className={cn("truncate text-muted-foreground", s.label)}>
            {label}
          </span>
          {Icon && (
            <CardAction className="text-muted-foreground">
              <Icon className={s.headerIcon} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent className={cn("flex flex-col", s.contentGap)}>
          <div className="flex items-baseline justify-between">
            <p className={cn(s.value, "text-muted-foreground/25")}>—</p>
            <span
              className={cn(
                "rounded-full bg-muted/40 font-semibold text-muted-foreground/40",
                s.badgePadding,
                s.description
              )}
            >
              Pending
            </span>
          </div>
          <div className="relative pb-10">
            <div className={cn("flex overflow-hidden rounded-full", s.trackH)}>
              {zones.map((zone, i) => {
                const prevMax = i === 0 ? 0 : zones[i - 1].max
                const segW = zone.max - prevMax
                return (
                  <div
                    key={zone.label}
                    style={{ width: `${segW}%`, backgroundColor: zone.color }}
                    className={cn(
                      "opacity-15",
                      i === 0 && "rounded-l-full",
                      i === zones.length - 1 && "rounded-r-full"
                    )}
                  />
                )
              })}
            </div>
            <div className="absolute top-8 flex w-full justify-between px-0.5">
              {zones.map((z) => (
                <span
                  key={z.label}
                  className={cn(
                    "leading-none text-muted-foreground/40",
                    s.description
                  )}
                >
                  {z.label}
                </span>
              ))}
            </div>
          </div>
          {description && (
            <p className={cn("text-muted-foreground/40", s.description)}>
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  const display = applyFmt(value, fmt)
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const activeZone = zones.find((z) => pct <= z.max) ?? zones[zones.length - 1]

  return (
    <Card size="sm" className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <span className={cn("truncate text-muted-foreground", s.label)}>
          {label}
        </span>
        {Icon && (
          <CardAction className="text-muted-foreground">
            <Icon className={s.headerIcon} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className={cn("flex flex-col", s.contentGap)}>
        <div className="flex items-baseline justify-between">
          <p className={s.value}>{display}</p>
          <span
            className={cn(
              "rounded-full font-semibold text-white",
              s.badgePadding,
              s.description
            )}
            style={{ backgroundColor: activeZone.color }}
          >
            {activeZone.label}
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-default pb-10 select-none">
                <div
                  className={cn("flex overflow-hidden rounded-full", s.trackH)}
                >
                  {zones.map((zone, i) => {
                    const prevMax = i === 0 ? 0 : zones[i - 1].max
                    const segW = zone.max - prevMax
                    return (
                      <div
                        key={zone.label}
                        style={{
                          width: `${segW}%`,
                          backgroundColor: zone.color,
                        }}
                        className={cn(
                          "opacity-80",
                          i === 0 && "rounded-l-full",
                          i === zones.length - 1 && "rounded-r-full"
                        )}
                      />
                    )
                  })}
                </div>

                <div
                  className="absolute -translate-x-1/2 pt-0.5"
                  style={{
                    top: `${size === "sm" ? 6 : size === "lg" ? 12 : 10}px`,
                    left: `${pct}%`,
                  }}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
                    <polygon
                      points="5,0 10,6 0,6"
                      style={{ fill: activeZone.color }}
                    />
                  </svg>
                </div>

                <div className="absolute top-8 flex w-full justify-between px-0.5">
                  {zones.map((z) => (
                    <span
                      key={z.label}
                      className={cn(
                        "leading-none text-muted-foreground",
                        s.description
                      )}
                    >
                      {z.label}
                    </span>
                  ))}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {display} — {activeZone.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {description && (
          <p className={cn("text-muted-foreground", s.description)}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
