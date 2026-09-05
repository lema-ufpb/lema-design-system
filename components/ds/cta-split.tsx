"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Cta, type CtaProps } from "./cta"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CtaSplitProps extends Omit<CtaProps, "align"> {
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function CtaSplit({ className, imageSrc, imageAlt, reverse = false, title, description, badge, primaryAction, secondaryAction, tone = "default", size = "md", loading = false, ...props }: CtaSplitProps) {
  return (
    <div
      data-slot="cta-split"
      className={cn(
        "grid overflow-hidden rounded-3xl border bg-card",
        imageSrc ? "md:grid-cols-2" : "grid-cols-1",
        tone === "primary" && "border-transparent bg-primary",
        tone === "glow" && "border-primary/20 shadow-xl shadow-primary/5",
        className
      )}
      {...props}
    >
      {imageSrc && !reverse && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" decoding="async" className="hidden h-full w-full object-cover md:block" />
      )}

      <div className="flex flex-col justify-center p-8 md:p-12">
        <Cta
          badge={badge}
          title={title}
          description={description}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tone={tone === "glow" ? "default" : tone}
          align="left"
          size={size}
          loading={loading}
          className="border-0 p-0 shadow-none"
        />
      </div>

      {imageSrc && reverse && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" decoding="async" className="hidden h-full w-full object-cover md:block" />
      )}
    </div>
  )
}
