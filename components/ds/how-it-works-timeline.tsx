"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { HowItWorks, type HowItWorksProps } from "./how-it-works"

// ── Types ──────────────────────────────────────────────────────────────────

export type HowItWorksTimelineProps = Omit<HowItWorksProps, "orientation">

// ── Component ──────────────────────────────────────────────────────────────

export function HowItWorksTimeline({
  className,
  ...props
}: HowItWorksTimelineProps) {
  return (
    <div
      data-slot="how-it-works-timeline"
      className={cn("relative", className)}
    >
      <div
        className="absolute top-6 bottom-6 left-5 hidden w-px bg-border md:block"
        aria-hidden="true"
      />
      <HowItWorks orientation="vertical" {...props} />
    </div>
  )
}
