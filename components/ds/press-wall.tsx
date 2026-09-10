import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type PressWallLogoSize = "sm" | "md" | "lg"

export interface PressWallProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase label above the logo grid, e.g. "As seen in". */
  kicker?: string
}

export interface PressWallLogoProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof pressWallLogoVariants> {
  /** Accessible name for the mention (publication or award name). */
  label: string
  href?: string
  /** Renders `label` as a visible caption below the mark. */
  showLabel?: boolean
  /** Logo mark — an <img
 loading="lazy"
 decoding="async"> or inline <svg>, sized by the component. */
  children: React.ReactNode
}

export interface PressWallAwardProps {
  label: string
  icon?: React.ElementType
}

// ── Variants ──

export const pressWallGridVariants = cva("grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-4")

export const pressWallLogoVariants = cva(
  "flex w-full items-center justify-center opacity-60 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_svg]:h-full [&_svg]:w-auto",
  {
    variants: {
      size: {
        sm: "h-5",
        md: "h-6",
        lg: "h-8",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──

export function PressWall({
  kicker,
  className,
  children,
  ...props
}: PressWallProps) {
  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      data-slot="press-wall"
      {...props}
    >
      {kicker && (
        <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {kicker}
        </p>
      )}
      <div className={cn(pressWallGridVariants())}>{children}</div>
    </div>
  )
}

export function PressWallLogo({
  label,
  href,
  size = "md",
  showLabel = false,
  className,
  children,
  ...props
}: PressWallLogoProps) {
  const mark = (
    <span className={cn(pressWallLogoVariants({ size }))}>{children}</span>
  )

  const content = showLabel ? (
    <span className="flex flex-col items-center gap-2">
      {mark}
      <span className="text-center text-xs font-medium text-muted-foreground">
        {label}
      </span>
    </span>
  ) : (
    mark
  )

  const a11yProps = showLabel
    ? {}
    : { role: "img" as const, "aria-label": label, tabIndex: 0 }

  if (href) {
    return (
      <a
        href={href}
        aria-label={showLabel ? undefined : label}
        className={cn(
          "group rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          className
        )}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      {...a11yProps}
      className={cn(
        "group rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

export function PressWallAward({ label, icon: Icon }: PressWallAwardProps) {
  return (
    <Badge variant="secondary" className="gap-1.5 font-medium">
      {Icon && <Icon className="size-3.5" aria-hidden="true" />}
      {label}
    </Badge>
  )
}

export function PressWallSkeleton({
  size = "md",
  count = 4,
}: {
  size?: PressWallLogoSize
  count?: number
}) {
  return (
    <div
      className={cn(pressWallGridVariants())}
      data-slot="press-wall-skeleton"
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "w-full rounded-md",
            size === "sm" ? "h-5" : size === "lg" ? "h-8" : "h-6"
          )}
        />
      ))}
    </div>
  )
}
