import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import { TextRotator } from "./text-rotator"

// ── Types ──

export interface HeroCyclingProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  titlePrefix?: React.ReactNode
  titleSuffix?: React.ReactNode
  words: string[]
  rotatorInterval?: number
  description?: string
  actions?: React.ReactNode
}

// ── Component ──

/**
 * Centered hero whose title cycles through a list of words — composed from
 * `HeroSection` and `TextRotator`.
 */
export function HeroCycling({
  kicker,
  titlePrefix,
  titleSuffix,
  words,
  rotatorInterval = 2500,
  description,
  actions,
  className,
  ...props
}: HeroCyclingProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="hero-cycling"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>
        {titlePrefix}
        <TextRotator
          words={words}
          interval={rotatorInterval}
          className="mx-2"
        />
        {titleSuffix}
      </HeroTitle>

      {description && <HeroDescription>{description}</HeroDescription>}
      {actions && <HeroActions>{actions}</HeroActions>}
    </HeroSection>
  )
}
