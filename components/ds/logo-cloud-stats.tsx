import * as React from "react"

import { cn } from "@/lib/utils"
import { PressWall } from "./press-wall"

// ── Types ──

export interface LogoCloudStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Big headline, e.g. "Trusted by 500+ companies". */
  headline: React.ReactNode
  description?: string
  kicker?: string
  /** `PressWallLogo` items rendered below. */
  children: React.ReactNode
}

// ── Component ──

/**
 * A big headline stat sitting above a logo wall — composed from
 * `PressWall`.
 */
export function LogoCloudStats({
  headline,
  description,
  kicker,
  children,
  className,
  ...props
}: LogoCloudStatsProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-8 text-center", className)}
      data-slot="logo-cloud-stats"
      {...props}
    >
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {headline}
        </p>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <PressWall kicker={kicker} className="w-full">
        {children}
      </PressWall>
    </div>
  )
}
