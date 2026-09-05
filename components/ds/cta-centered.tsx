"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Cta, type CtaProps } from "./cta"

// ── Types ──────────────────────────────────────────────────────────────────

export type CtaCenteredProps = Omit<CtaProps, "align">

// ── Component ──────────────────────────────────────────────────────────────

export function CtaCentered({ className, ...props }: CtaCenteredProps) {
  return (
    <div data-slot="cta-centered" className={cn("mx-auto max-w-3xl", className)}>
      <Cta align="center" {...props} />
    </div>
  )
}
