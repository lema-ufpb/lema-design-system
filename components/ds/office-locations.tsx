"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type OfficeLocationsSize = "sm" | "md" | "lg"

export interface BusinessHours {
  /** Local opening hour, 0-24. */
  start: number
  /** Local closing hour, 0-24. */
  end: number
}

export type OfficeLocationsProps = React.HTMLAttributes<HTMLUListElement>

export interface OfficeLocationItemProps
  extends
    Omit<React.HTMLAttributes<HTMLLIElement>, "children">,
    VariantProps<typeof officeLocationItemVariants> {
  city: string
  country?: string
  address?: string
  /** IANA time zone, e.g. "America/Sao_Paulo". */
  timeZone: string
  /** Local business hours used to compute the open/closed dot. */
  businessHours?: BusinessHours
  locale?: UILocale
  loading?: boolean
}

// ── Variants ──

export const officeLocationItemVariants = cva(
  "flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0",
  {
    variants: {
      size: {
        sm: "py-3",
        md: "py-4",
        lg: "py-5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const officeLocationIconVariants = cva(
  "shrink-0 text-muted-foreground",
  {
    variants: {
      size: { sm: "size-3.5", md: "size-4", lg: "size-5" },
    },
    defaultVariants: { size: "md" },
  }
)

export const officeLocationCityVariants = cva("font-medium text-foreground", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
})

export const officeLocationMetaVariants = cva("text-muted-foreground", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-sm" },
  },
  defaultVariants: { size: "md" },
})

export const officeLocationTimeVariants = cva(
  "font-semibold text-foreground tabular-nums",
  {
    variants: {
      size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Helpers ──

function useNow(intervalMs = 30_000) {
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

function getLocalHour(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone,
  })
  return Number.parseInt(formatter.format(date), 10)
}

const SKELETON_META: Record<OfficeLocationsSize, string> = {
  sm: "h-3 w-32",
  md: "h-3.5 w-40",
  lg: "h-4 w-48",
}

// ── OfficeLocations ──

export const OfficeLocations = React.forwardRef<
  HTMLUListElement,
  OfficeLocationsProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col", className)}
    data-slot="office-locations"
    {...props}
  />
))
OfficeLocations.displayName = "OfficeLocations"

// ── OfficeLocationItem ──

export const OfficeLocationItem = React.forwardRef<
  HTMLLIElement,
  OfficeLocationItemProps
>(
  (
    {
      city,
      country,
      address,
      timeZone,
      businessHours = { start: 9, end: 18 },
      locale = "en-US",
      size = "md",
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const now = useNow()
    const resolvedSize = size ?? "md"

    const timeFormatter = React.useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
          timeZone,
        }),
      [locale, timeZone]
    )

    if (loading) {
      return (
        <li
          ref={ref}
          className={cn(officeLocationItemVariants({ size }), className)}
          data-slot="office-location-item-skeleton"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-4 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton
                className={cn("rounded-md", SKELETON_META[resolvedSize])}
              />
            </div>
          </div>
          <Skeleton className="h-4 w-16 rounded-md" />
        </li>
      )
    }

    const localHour = getLocalHour(now, timeZone)
    const isOpen =
      localHour >= businessHours.start && localHour < businessHours.end
    const statusLabel = isOpen
      ? UI_I18N[locale].officeLocations.openNow
      : UI_I18N[locale].officeLocations.closed

    return (
      <li
        ref={ref}
        className={cn(officeLocationItemVariants({ size }), className)}
        data-slot="office-location-item"
        {...props}
      >
        <div className="flex min-w-0 items-start gap-3">
          <MapPin
            className={cn(officeLocationIconVariants({ size }), "mt-0.5")}
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-col">
            <span className={cn(officeLocationCityVariants({ size }))}>
              {city}
              {country ? `, ${country}` : ""}
            </span>
            {address && (
              <span
                className={cn(officeLocationMetaVariants({ size }), "truncate")}
              >
                {address}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <time
            dateTime={now.toISOString()}
            className={cn(officeLocationTimeVariants({ size }))}
          >
            {timeFormatter.format(now)}
          </time>
          <span
            className={cn(
              "inline-flex items-center gap-1.5",
              officeLocationMetaVariants({ size })
            )}
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                isOpen ? "bg-success" : "bg-muted-foreground"
              )}
              aria-hidden="true"
            />
            {statusLabel}
          </span>
        </div>
      </li>
    )
  }
)
OfficeLocationItem.displayName = "OfficeLocationItem"
