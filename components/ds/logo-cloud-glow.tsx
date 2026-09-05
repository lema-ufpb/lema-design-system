import * as React from "react"

import { cn } from "@/lib/utils"
import { CursorSpotlight, type CursorSpotlightTone } from "./cursor-spotlight"
import { PressWall } from "./press-wall"

// ── Types ──

export interface LogoCloudGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: string
  tone?: CursorSpotlightTone
  children: React.ReactNode
}

// ── Component ──

/**
 * A centered logo wall inside a glowing card that reacts to the pointer —
 * composed from `PressWall` and `CursorSpotlight`.
 */
export function LogoCloudGlow({
  kicker,
  tone = "primary",
  children,
  className,
  ...props
}: LogoCloudGlowProps) {
  return (
    <CursorSpotlight
      tone={tone}
      className={cn(
        "rounded-3xl border border-border bg-card px-6 py-12",
        className
      )}
      data-slot="logo-cloud-glow"
      {...props}
    >
      <PressWall kicker={kicker}>{children}</PressWall>
    </CursorSpotlight>
  )
}
