"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { UILocale } from "@/lib/ui-i18n"
import { PillGroup } from "./pill-group"
import { PressWall, PressWallLogo } from "./press-wall"

// ── Types ──

export interface LogoCloudGroup {
  value: string
  label: string
}

export interface LogoCloudGroupedItem {
  label: string
  group: string
  content: React.ReactNode
  href?: string
}

export interface LogoCloudGroupedProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: LogoCloudGroup[]
  items: LogoCloudGroupedItem[]
  allLabel?: string
  kicker?: string
  locale?: UILocale
}

const ALL_VALUE = "__all__"

// ── Component ──

/**
 * A logo wall with an industry/category filter above it — composed from
 * `PressWall` and `PillGroup`.
 */
export function LogoCloudGrouped({
  groups,
  items,
  allLabel = "All",
  kicker,
  locale,
  className,
  ...props
}: LogoCloudGroupedProps) {
  const [active, setActive] = React.useState<string>(ALL_VALUE)

  const filtered = React.useMemo(
    () =>
      active === ALL_VALUE
        ? items
        : items.filter((item) => item.group === active),
    [active, items]
  )

  const pillItems = React.useMemo(
    () => [{ value: ALL_VALUE, label: allLabel }, ...groups],
    [allLabel, groups]
  )

  return (
    <div
      className={cn("flex flex-col items-center gap-8", className)}
      data-slot="logo-cloud-grouped"
      {...props}
    >
      <PillGroup
        items={pillItems}
        value={active}
        onChange={(value) =>
          setActive(
            Array.isArray(value)
              ? (value[0] ?? ALL_VALUE)
              : (value ?? ALL_VALUE)
          )
        }
        locale={locale}
      />
      <PressWall kicker={kicker} className="w-full">
        {filtered.map((item) => (
          <PressWallLogo key={item.label} label={item.label} href={item.href}>
            {item.content}
          </PressWallLogo>
        ))}
      </PressWall>
    </div>
  )
}
