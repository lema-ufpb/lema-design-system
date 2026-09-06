import * as React from "react"

import { BentoGrid, BentoGridItem } from "./bento-grid"
import { PressWall, PressWallLogo } from "./press-wall"
import { PullQuote } from "./pull-quote"

// ── Types ──

export interface BentoSocialProofQuote {
  quote: string
  name: string
  role?: string
  avatarFallback?: string
}

export interface BentoSocialProofLogo {
  label: string
  content: React.ReactNode
  href?: string
}

export interface BentoSocialProofProps extends React.HTMLAttributes<HTMLDivElement> {
  quotes: BentoSocialProofQuote[]
  logos?: BentoSocialProofLogo[]
  logosLabel?: string
}

// ── Component ──

/**
 * A bento grid mixing testimonial tiles with a press/logo wall tile —
 * composed from `BentoGrid`, `PullQuote` and `PressWall`.
 */
export function BentoSocialProof({
  quotes,
  logos = [],
  logosLabel,
  className,
  ...props
}: BentoSocialProofProps) {
  return (
    <BentoGrid className={className} data-slot="bento-social-proof" {...props}>
      {quotes.map((item) => (
        <BentoGridItem
          key={item.name}
          colSpan={2}
          className="items-start justify-start text-left"
        >
          <PullQuote
            size="sm"
            quote={item.quote}
            name={item.name}
            role={item.role}
            avatarFallback={item.avatarFallback}
          />
        </BentoGridItem>
      ))}

      {logos.length > 0 && (
        <BentoGridItem
          colSpan={4}
          className="border-0 bg-transparent p-0 hover:translate-y-0 hover:shadow-none"
        >
          <PressWall kicker={logosLabel} className="w-full">
            {logos.map(({ label, content, href }) => (
              <PressWallLogo key={label} label={label} href={href}>
                {content}
              </PressWallLogo>
            ))}
          </PressWall>
        </BentoGridItem>
      )}
    </BentoGrid>
  )
}
