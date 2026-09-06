import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"

// ── Types ──

export interface HeroBentoProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  /** A `BentoGrid` (with its `BentoGridItem`s) rendered below the copy. */
  children: React.ReactNode
}

// ── Component ──

/**
 * Centered hero followed by a bento grid — composed from `HeroSection` and
 * `BentoGrid` (pass any `BentoGrid`/`BentoGridItem` composition, or a
 * `BentoFeatures`/`BentoShowcase`/`BentoMetrics`/`BentoSocialProof` block, as
 * `children`).
 */
export function HeroBento({
  kicker,
  title,
  description,
  actions,
  children,
  className,
  ...props
}: HeroBentoProps) {
  return (
    <HeroSection
      align="center"
      container="wide"
      className={className}
      data-slot="hero-bento"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>
      {description && <HeroDescription>{description}</HeroDescription>}
      {actions && <HeroActions>{actions}</HeroActions>}

      <div className="mt-10 w-full">{children}</div>
    </HeroSection>
  )
}
