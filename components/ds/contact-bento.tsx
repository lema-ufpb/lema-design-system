import * as React from "react"

import { BentoGrid, BentoGridItem } from "./bento-grid"
import { ContactForm, type ContactFormProps } from "./contact-form"

// ── Types ──

export interface ContactBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  formProps?: ContactFormProps
  /** Additional `BentoGridItem` tiles rendered beside the form (office locations, stats...). */
  children?: React.ReactNode
}

// ── Component ──

/**
 * A bento grid with a contact form as its hero tile, plus any number of
 * satellite tiles — composed from `BentoGrid` and `ContactForm`.
 */
export function ContactBento({
  formProps,
  children,
  className,
  ...props
}: ContactBentoProps) {
  return (
    <BentoGrid className={className} data-slot="contact-bento" {...props}>
      <BentoGridItem
        colSpan={2}
        rowSpan={2}
        className="items-stretch justify-center"
      >
        <ContactForm {...formProps} />
      </BentoGridItem>
      {children}
    </BentoGrid>
  )
}
