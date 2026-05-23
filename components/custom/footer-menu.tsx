"use client"

import * as React from "react"
import Link from "next/link"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

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

export const footerGroupVariants = cva("flex w-full flex-col py-0")

export const footerHeaderVariants = cva([
  "flex w-full cursor-pointer items-center justify-between py-4",
  "bg-transparent transition-all outline-none",
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  "hover:bg-accent/50 lg:mb-4 lg:cursor-default lg:border-b-0 lg:py-0 lg:hover:bg-transparent",
  "lg:pointer-events-none",
])

export const footerTitleVariants = cva(
  "flex justify-start text-left font-medium text-foreground",
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
    "inline-block cursor-pointer py-1 text-muted-foreground transition-colors hover:text-primary",
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
  "size-4 text-muted-foreground transition-transform duration-200 lg:hidden"
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
        className={cn(footerMenuVariants(), className)}
        aria-label={UI_I18N[locale].footerMenu.label}
        {...props}
      >
        {/* Mobile: Accordion */}
        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="flex w-full flex-col lg:hidden"
        >
          {data.map((group: FooterGroupData, i: number) => (
            <AccordionPrimitive.Item
              key={`mobile-${i}`}
              value={`item-${i}`}
              className={footerGroupVariants()}
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(footerHeaderVariants(), "group")}
                >
                  <span className={cn(footerTitleVariants({ size, upper }))}>
                    {group.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      footerNavIconVariants(),
                      "transition-transform duration-200 group-data-[state=open]:rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>

              <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <ul
                  className={cn(
                    footerContentVariants(),
                    "space-y-2 px-4 pt-4 pb-6"
                  )}
                >
                  {group.options.map((option: FooterOptionData, j: number) => (
                    <li key={j}>
                      <Link
                        href={option.url}
                        target={option.target}
                        className={cn(footerLinkVariants({ size }))}
                      >
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>

        {/* Desktop: Static columns */}
        <div className="hidden w-full gap-8 lg:flex lg:flex-row lg:justify-between lg:gap-12">
          {data.map((group: FooterGroupData, i: number) => (
            <div key={`desktop-${i}`} className="flex flex-1 flex-col">
              <h4 className={cn(footerTitleVariants({ size, upper }), "mb-4")}>
                {group.title}
              </h4>
              <ul className={cn(footerContentVariants(), "space-y-2")}>
                {group.options.map((option: FooterOptionData, j: number) => (
                  <li key={j}>
                    <Link
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
