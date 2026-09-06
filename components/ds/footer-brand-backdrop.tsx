import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { FooterWordmark } from "./footer-wordmark"
import { SocialLinks, type SocialLinkItem } from "./social-links"
import {
  SystemStatusBadge,
  type SystemHealthStatus,
} from "./system-status-badge"
import { FooterBottomBar, type LegalLinkItem } from "./footer-bottom-bar"
import { FooterMenu, type FooterGroupData } from "./footer-menu"

// ── Types ──

export interface FooterBrandBackdropProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerBrandBackdropVariants> {
  wordmarkText?: string
  wordmarkVariant?: "outline" | "muted" | "gradient"
  brand?: React.ReactNode
  description?: string
  columns: FooterGroupData[]
  socialLinks?: SocialLinkItem[]
  showStatusBadge?: boolean
  status?: SystemHealthStatus
  statusUptime?: string
  statusHref?: string
  brandName?: string
  legalLinks?: LegalLinkItem[]
  locale?: UILocale
}

// ── Variants ──

export const footerBrandBackdropVariants = cva(
  "relative w-full overflow-hidden border-t border-border bg-background pt-16 pb-8",
  {
    variants: {
      spacing: {
        normal: "gap-12",
        relaxed: "gap-16",
      },
    },
    defaultVariants: {
      spacing: "normal",
    },
  }
)

// ── Component ──

export const FooterBrandBackdrop = React.forwardRef<
  HTMLElement,
  FooterBrandBackdropProps
>(
  (
    {
      wordmarkText = "LEMA",
      wordmarkVariant = "outline",
      brand,
      description = "Laboratório de Engenharia e Mídias Avançadas. Inovação aberta e design de precisão para a UFPB.",
      columns,
      socialLinks = [
        { platform: "github", href: "https://github.com" },
        { platform: "x", href: "https://x.com" },
        { platform: "linkedin", href: "https://linkedin.com" },
      ],
      showStatusBadge = true,
      status = "operational",
      statusUptime = "99.99%",
      statusHref = "https://status.ufpb.br",
      brandName = "LEMA - UFPB",
      legalLinks,
      locale = "pt-BR",
      spacing = "normal",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(footerBrandBackdropVariants({ spacing }), className)}
        {...props}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-4 lg:col-span-5">
              {brand || (
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    L
                  </div>
                  <span className="font-semibold">{brandName}</span>
                </div>
              )}

              {description && (
                <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}

              {socialLinks.length > 0 && (
                <SocialLinks links={socialLinks} variant="outline" size="sm" />
              )}

              {showStatusBadge && (
                <div className="mt-2">
                  <SystemStatusBadge
                    status={status}
                    uptime={statusUptime}
                    href={statusHref}
                    size="sm"
                    locale={locale}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <FooterMenu data={columns} locale={locale} size="sm" />
            </div>
          </div>

          {/* Giant Wordmark Display */}
          <div className="my-4 w-full">
            <FooterWordmark
              text={wordmarkText}
              variant={wordmarkVariant}
              align="center"
            />
          </div>

          {/* Bottom Bar */}
          <FooterBottomBar
            brandName={brandName}
            legalLinks={legalLinks}
            locale={locale}
            spacing="compact"
          />
        </div>
      </footer>
    )
  }
)
FooterBrandBackdrop.displayName = "FooterBrandBackdrop"
