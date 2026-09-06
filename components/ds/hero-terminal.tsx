import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { BackgroundGlow, type BackgroundGlowProps } from "./background-glow"
import { BrowserMockup, type BrowserMockupProps } from "./browser-mockup"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroMedia,
  HeroSection,
  HeroTitle,
} from "./hero-section"

// ── Types ──

export interface HeroTerminalProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  browserUrl?: string
  browserVariant?: BrowserMockupProps["variant"]
  glowTone?: BackgroundGlowProps["tone"]
}

// ── Component ──

/**
 * Split hero — copy on one side, a terminal/browser preview on the other,
 * with an aurora glow behind. Composed from `HeroSection`, `BackgroundGlow`
 * and `BrowserMockup`.
 */
export function HeroTerminal({
  kicker,
  title,
  description,
  actions,
  browserUrl,
  browserVariant = "terminal",
  glowTone = "primary",
  className,
  children,
  ...props
}: HeroTerminalProps) {
  return (
    <HeroSection
      align="split"
      className={className}
      data-slot="hero-terminal"
      {...props}
    >
      <BackgroundGlow tone={glowTone} variant="aurora" />

      <div className="flex flex-col gap-6">
        {kicker && (
          <HeroHeader className="justify-start">
            <Badge variant="secondary">{kicker}</Badge>
          </HeroHeader>
        )}
        <HeroTitle>{title}</HeroTitle>
        {description && <HeroDescription>{description}</HeroDescription>}
        {actions && <HeroActions align="left">{actions}</HeroActions>}
      </div>

      <HeroMedia>
        <BrowserMockup url={browserUrl} variant={browserVariant} glow>
          {children}
        </BrowserMockup>
      </HeroMedia>
    </HeroSection>
  )
}
