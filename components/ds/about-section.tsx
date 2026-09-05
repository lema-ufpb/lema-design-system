import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CardStat } from "./card-stat"
import {
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import { PullQuote } from "./pull-quote"
import {
  TeamRoster,
  TeamRosterCard,
  type TeamRosterSocialLink,
} from "./team-roster"

// ── Types ──

export interface AboutSectionStat {
  label: string
  value: string | number
}

export interface AboutSectionTeamMember {
  name: string
  role?: string
  avatarSrc?: string
  avatarFallback?: string
  social?: TeamRosterSocialLink[]
}

export interface AboutSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
>, VariantProps<typeof aboutSectionVariants> {
  kicker?: string
  title: React.ReactNode
  description?: string
  quote?: string
  quoteName?: string
  quoteRole?: string
  quoteAvatarSrc?: string
  quoteAvatarFallback?: string
  stats?: AboutSectionStat[]
  team?: AboutSectionTeamMember[]
}

// ── Variants ───────────────────────────────────────────────────────────────

export const aboutSectionVariants = cva("w-full", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──

/**
 * Composed "About" page section — story + founder quote + stats strip + team
 * grid — built entirely from existing ds/ atoms (HeroSection, PullQuote,
 * CardStat, TeamRoster). A ready-to-drop block, mirroring the "story + values
 * + stats" combo pattern common to About pages.
 */
export function AboutSection({
  kicker,
  title,
  description,
  quote,
  quoteName,
  quoteRole,
  quoteAvatarSrc,
  quoteAvatarFallback,
  stats = [],
  team = [],
  className,
  ...props
}: AboutSectionProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="about-section"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>

      {description && <HeroDescription>{description}</HeroDescription>}

      {quote && (
        <PullQuote
          align="center"
          tone="violet"
          size="sm"
          quote={quote}
          name={quoteName}
          role={quoteRole}
          avatarSrc={quoteAvatarSrc}
          avatarFallback={quoteAvatarFallback}
          className="mt-8 max-w-2xl"
        />
      )}

      {stats.length > 0 && (
        <div
          className={cn(
            "mt-12 grid w-full grid-cols-2 gap-4",
            stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
          )}
        >
          {stats.map((stat) => (
            <CardStat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              variant="flat"
            />
          ))}
        </div>
      )}

      {team.length > 0 && (
        <TeamRoster columns={4} className="mt-12 w-full">
          {team.map((member) => (
            <TeamRosterCard key={member.name} {...member} />
          ))}
        </TeamRoster>
      )}
    </HeroSection>
  )
}
