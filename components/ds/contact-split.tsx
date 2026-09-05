import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { ContactForm, type ContactFormProps } from "./contact-form"
import {
  HeroDescription,
  HeroHeader,
  HeroMedia,
  HeroSection,
  HeroTitle,
} from "./hero-section"

// ── Types ──

export interface ContactSplitProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  formProps?: ContactFormProps
  /**
   * Content shown beside the form — plug in `OfficeLocations`, `TeamRoster`,
   * a `CardIcon` list, or plain copy, depending on the variant you need.
   */
  aside: React.ReactNode
}

// ── Component ──

/**
 * Split contact section — form on one side, a flexible aside slot on the
 * other — composed from `HeroSection` and `ContactForm`.
 */
export function ContactSplit({
  kicker,
  title,
  description,
  formProps,
  aside,
  className,
  ...props
}: ContactSplitProps) {
  return (
    <HeroSection
      align="split"
      className={className}
      data-slot="contact-split"
      {...props}
    >
      <div className="flex flex-col gap-6">
        {kicker && (
          <HeroHeader className="justify-start">
            <Badge variant="secondary">{kicker}</Badge>
          </HeroHeader>
        )}
        <HeroTitle as="h2">{title}</HeroTitle>
        {description && <HeroDescription>{description}</HeroDescription>}
        <ContactForm {...formProps} />
      </div>

      <HeroMedia>{aside}</HeroMedia>
    </HeroSection>
  )
}
