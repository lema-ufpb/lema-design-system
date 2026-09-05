import * as React from "react"

import { AnnouncementBadge } from "./announcement-badge"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import { Marquee } from "./marquee"

// ── Types ──

export interface HeroAnnouncementItem {
  label: React.ReactNode
  href?: string
  tag?: string
}

export interface HeroAnnouncementProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  announcement?: HeroAnnouncementItem
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  /** Logos rendered inside a Marquee below the actions. */
  logos?: React.ReactNode[]
  logosLabel?: string
}

// ── Component ──

/**
 * Centered hero with an announcement badge above the title and a scrolling
 * logo cloud below — composed from `HeroSection`, `AnnouncementBadge` and
 * `Marquee`.
 */
export function HeroAnnouncement({
  announcement,
  title,
  description,
  actions,
  logos = [],
  logosLabel,
  className,
  ...props
}: HeroAnnouncementProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="hero-announcement"
      {...props}
    >
      {announcement && (
        <HeroHeader>
          <AnnouncementBadge href={announcement.href} tag={announcement.tag}>
            {announcement.label}
          </AnnouncementBadge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>
      {description && <HeroDescription>{description}</HeroDescription>}
      {actions && <HeroActions>{actions}</HeroActions>}

      {logos.length > 0 && (
        <div className="mt-10 w-full">
          {logosLabel && (
            <p className="mb-4 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {logosLabel}
            </p>
          )}
          <Marquee>
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center px-6">
                {logo}
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </HeroSection>
  )
}
