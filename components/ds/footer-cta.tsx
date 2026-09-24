"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Button } from "@/components/ui/button"
import { SocialLinks, type SocialLinkItem } from "./social-links"
import { FooterBottomBar, type LegalLinkItem } from "./footer-bottom-bar"
import { FooterMenu, type FooterGroupData } from "./footer-menu"

// ── Types ──

export interface FooterCtaAction {
  label: string
  href?: string
  onClick?: () => void
}

export interface FooterCtaProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerCtaVariants> {
  ctaTitle?: string
  ctaDescription?: string
  primaryAction?: FooterCtaAction
  secondaryAction?: FooterCtaAction
  columns?: FooterGroupData[]
  brand?: React.ReactNode
  socialLinks?: SocialLinkItem[]
  brandName?: string
  legalLinks?: LegalLinkItem[]
  locale?: UILocale
}

// ── Variants ──

export const footerCtaVariants = cva(
  "relative w-full border-t border-border bg-background pt-16 pb-12",
  {
    variants: {
      ctaTone: {
        card: "border-border bg-card",
        primary: "border-transparent bg-primary text-primary-foreground",
        glow: "border-primary/20 bg-card/80 shadow-lg shadow-primary/5",
      },
    },
    defaultVariants: {
      ctaTone: "glow",
    },
  }
)

// ── Component ──

export const FooterCta = React.forwardRef<HTMLElement, FooterCtaProps>(
  (
    {
      ctaTitle = "Ready to transform your digital experience?",
      ctaDescription = "Join researchers, developers, and students building modern web applications with the LEMA Design System.",
      primaryAction = {
        label: "Get started now",
        href: "#",
      },
      secondaryAction = {
        label: "Talk to the team",
        href: "#",
      },
      columns = [
        {
          title: "Product",
          options: [
            { name: "Components", url: "#" },
            { name: "Tokens", url: "#" },
            { name: "Templates", url: "#" },
          ],
        },
        {
          title: "Developers",
          options: [
            { name: "Documentation", url: "#" },
            { name: "GitHub", url: "#" },
            { name: "Registry", url: "#" },
          ],
        },
        {
          title: "Institutional",
          options: [
            { name: "About LEMA", url: "#" },
            { name: "UFPB", url: "#" },
            { name: "Contact", url: "#" },
          ],
        },
      ],
      brand,
      socialLinks = [
        { platform: "github", href: "https://github.com" },
        { platform: "x", href: "https://x.com" },
        { platform: "linkedin", href: "https://linkedin.com" },
      ],
      brandName = "LEMA - UFPB",
      legalLinks,
      ctaTone = "glow",
      locale: localeProp,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    return (
      <footer
        ref={ref}
        className={cn(footerCtaVariants({ ctaTone }), className)}
        {...props}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          {/* CTA Card / Band */}
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl border p-8 transition-all md:p-12",
              ctaTone === "primary"
                ? "border-transparent bg-primary text-primary-foreground"
                : ctaTone === "glow"
                  ? "border-primary/20 bg-card shadow-xl shadow-primary/5"
                  : "border-border bg-card"
            )}
          >
            {/* Ambient subtle glow background */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 size-72 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 size-72 rounded-full bg-highlight-violet/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex max-w-2xl flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  {ctaTitle}
                </h2>
                {ctaDescription && (
                  <p
                    className={cn(
                      "text-sm leading-relaxed md:text-base",
                      ctaTone === "primary"
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {ctaDescription}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {primaryAction && (
                  <Button
                    asChild={Boolean(primaryAction.href)}
                    size="lg"
                    onClick={primaryAction.onClick}
                    variant={ctaTone === "primary" ? "secondary" : "default"}
                    className="gap-2 font-semibold"
                  >
                    {primaryAction.href ? (
                      <a href={primaryAction.href}>
                        <span>{primaryAction.label}</span>
                        <ArrowRightIcon className="size-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <>
                        <span>{primaryAction.label}</span>
                        <ArrowRightIcon className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    asChild={Boolean(secondaryAction.href)}
                    size="lg"
                    variant={ctaTone === "primary" ? "ghost" : "outline"}
                    onClick={secondaryAction.onClick}
                    className="font-medium"
                  >
                    {secondaryAction.href ? (
                      <a href={secondaryAction.href}>{secondaryAction.label}</a>
                    ) : (
                      <span>{secondaryAction.label}</span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-4">
              {brand || (
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    L
                  </div>
                  <span>{brandName}</span>
                </div>
              )}

              {socialLinks.length > 0 && (
                <SocialLinks links={socialLinks} variant="ghost" size="sm" />
              )}
            </div>

            <div className="lg:col-span-8">
              <FooterMenu data={columns} locale={locale} size="sm" />
            </div>
          </div>

          {/* Bottom Bar */}
          <FooterBottomBar
            brandName={brandName}
            legalLinks={legalLinks}
            locale={locale}
          />
        </div>
      </footer>
    )
  }
)
FooterCta.displayName = "FooterCta"
