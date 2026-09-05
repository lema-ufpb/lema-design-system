import * as React from "react"

import { Badge } from "@/components/ui/badge"
import type { UILocale } from "@/lib/ui-i18n"
import {
  HeroDescription,
  HeroHeader,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import { WaitlistForm, type WaitlistFormProps } from "./waitlist-form"

// ── Types ──

export interface HeroWaitlistProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title" | "onSubmit"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  socialProof?: React.ReactNode
  onSubmit?: WaitlistFormProps["onSubmit"]
  locale?: UILocale
}

// ── Component ──

/**
 * Centered hero with an email capture form — composed from `HeroSection`
 * and `WaitlistForm`.
 */
export function HeroWaitlist({
  kicker,
  title,
  description,
  socialProof,
  onSubmit,
  locale,
  className,
  ...props
}: HeroWaitlistProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="hero-waitlist"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>
      {description && <HeroDescription>{description}</HeroDescription>}

      <div className="mx-auto mt-2 w-full max-w-md">
        <WaitlistForm
          variant="pill"
          onSubmit={onSubmit}
          socialProof={socialProof}
          locale={locale}
        />
      </div>
    </HeroSection>
  )
}
