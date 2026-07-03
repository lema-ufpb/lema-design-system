"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FooterOptionData {
  name: string
  url: string
  target?: string
}

export interface FooterGroupData {
  title: string
  options: FooterOptionData[]
}

export interface FooterMenuProps
  extends
    Omit<HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof footerMenuVariants> {
  data: FooterGroupData[]
  /** @default false */
  upper?: boolean
  locale?: UILocale
  size?: "sm" | "md" | "lg"
}

export type FooterMenuVariants = VariantProps<typeof footerMenuVariants>

// ── Variants ───────────────────────────────────────────────────────────────

export const footerMenuVariants = cva(
  "flex w-full flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12"
)

export const footerGroupVariants = cva("flex w-full flex-col !border-b-0 py-0")

export const footerHeaderVariants = cva([
  "flex w-full cursor-pointer items-center justify-between py-4",
  "bg-transparent transition-all outline-none",
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  "hover:bg-accent/50 lg:mb-4 lg:cursor-default lg:border-b-0 lg:py-0 lg:hover:bg-transparent",
  "lg:pointer-events-none",
])

export const footerTitleVariants = cva(
  "flex justify-start text-left font-medium text-footer-heading",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      upper: {
        true: "tracking-wider uppercase",
        false: "",
      },
    },
    defaultVariants: { size: "md", upper: false },
  }
)

export const footerContentVariants = cva([
  "m-0 list-none p-0",
  "lg:visible lg:block lg:h-auto lg:opacity-100",
])

export const footerLinkVariants = cva(
  [
    "inline-block cursor-pointer py-1 text-footer-link transition-all hover:text-footer-link-hover hover:underline",
    "rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const footerNavIconVariants = cva(
  "size-4 text-footer-link transition-transform duration-200 lg:hidden"
)

// ── FooterMenu ─────────────────────────────────────────────────────────────

export const FooterMenu = React.forwardRef<HTMLElement, FooterMenuProps>(
  (
    { data, upper = false, size = "md", locale = "en-US", className, ...props },
    ref
  ) => {
    if (!data || data.length === 0) return null

    return (
      <nav
        ref={ref}
        data-slot="footer-menu"
        className={cn(footerMenuVariants(), className)}
        aria-label={UI_I18N[locale].footerMenu.label}
        {...props}
      >
        {/* Mobile: Accordion */}
        <Accordion
          data-slot="footer-menu-accordion"
          type="single"
          collapsible
          className="radius-none flex w-full flex-col rounded-none border-none lg:hidden"
        >
          {data.map((group: FooterGroupData, i: number) => (
            <AccordionItem
              data-slot="footer-menu-group"
              key={`mobile-${i}`}
              value={`item-${i}`}
              className={footerGroupVariants()}
            >
              <AccordionTrigger
                data-slot="footer-menu-group-header"
                className={cn(
                  footerHeaderVariants(),
                  "hover:no-underline",
                  "**:data-[slot=accordion-trigger-icon]:hidden"
                )}
              >
                <span className={cn(footerTitleVariants({ size, upper }))}>
                  {group.title}
                </span>
                <ChevronDown
                  className={cn(
                    footerNavIconVariants(),
                    "transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180"
                  )}
                  aria-hidden="true"
                />
              </AccordionTrigger>

              <AccordionContent className="p-0 [&_a]:no-underline [&_a]:hover:text-footer-link-hover [&>div]:px-0 [&>div]:py-0">
                <ul
                  className={cn(
                    footerContentVariants(),
                    "flex flex-col gap-2 px-4 pt-4 pb-6"
                  )}
                >
                  {group.options.map((option: FooterOptionData, j: number) => (
                    <li key={j}>
                      <Link
                        data-slot="footer-menu-link"
                        href={option.url}
                        target={option.target}
                        className={cn(footerLinkVariants({ size }))}
                      >
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Desktop: Static columns */}
        <div
          data-slot="footer-menu-desktop"
          className="hidden w-full gap-8 lg:flex lg:flex-row lg:justify-between lg:gap-12"
        >
          {data.map((group: FooterGroupData, i: number) => (
            <div
              data-slot="footer-menu-group"
              key={`desktop-${i}`}
              className="flex flex-1 flex-col"
            >
              <h4
                data-slot="footer-menu-group-header"
                className={cn(footerTitleVariants({ size, upper }), "mb-4")}
              >
                {group.title}
              </h4>
              <ul
                className={cn(footerContentVariants(), "flex flex-col gap-2")}
              >
                {group.options.map((option: FooterOptionData, j: number) => (
                  <li key={j}>
                    <Link
                      data-slot="footer-menu-link"
                      href={option.url}
                      target={option.target}
                      className={cn(footerLinkVariants({ size }))}
                    >
                      {option.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    )
  }
)

FooterMenu.displayName = "FooterMenu"
