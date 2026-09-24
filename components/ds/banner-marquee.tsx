"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BannerMarqueeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerMarqueeVariants> {
  items: string[]
  separator?: React.ReactNode
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  pauseOnHover?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const bannerMarqueeVariants = cva(
  "relative flex w-full items-center overflow-hidden border py-2",
  {
    variants: {
      intent: {
        default: "border-border bg-muted text-muted-foreground",
        promo: "border-primary/20 bg-primary text-primary-foreground",
        contrast: "border-foreground bg-foreground text-background",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-xs",
        lg: "h-10 text-sm",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function BannerMarquee({
  className,
  items,
  separator = "·",
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  intent = "default",
  size = "md",
  locale: localeProp,
  ...props
}: BannerMarqueeProps) {
  const locale = useUILocale(localeProp)
  const duration = speed === "slow" ? "30s" : speed === "fast" ? "10s" : "20s"

  // Duplicate items for seamless loop
  const loopItems = [...items, ...items]

  return (
    <div
      data-slot="banner-marquee"
      role="region"
      aria-label={UI_I18N[locale].banner.marqueeLabel}
      className={cn(
        bannerMarqueeVariants({ intent, size }),
        pauseOnHover && "group/marquee",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max items-center gap-6",
          "animate-[marquee-x_var(--duration)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          direction === "right" && "[animation-direction:reverse]"
        )}
        style={{ "--duration": duration } as React.CSSProperties}
      >
        {loopItems.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex items-center gap-6 whitespace-nowrap"
          >
            <span className="font-medium tracking-wide">{item}</span>
            <span className="opacity-60" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
      <div
        className={cn(
          "flex w-max items-center gap-6",
          "animate-[marquee-x_var(--duration)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          direction === "right" && "[animation-direction:reverse]"
        )}
        style={{ "--duration": duration } as React.CSSProperties}
        aria-hidden="true"
      >
        {loopItems.map((item, idx) => (
          <span
            key={`${item}-${idx}-dup`}
            className="flex items-center gap-6 whitespace-nowrap"
          >
            <span className="font-medium tracking-wide">{item}</span>
            <span className="opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
