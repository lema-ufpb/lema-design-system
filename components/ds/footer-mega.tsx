import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { SocialLinks, type SocialLinkItem } from "./social-links"
import { FooterNewsletter } from "./footer-newsletter"
import {
  SystemStatusBadge,
  type SystemHealthStatus,
} from "./system-status-badge"
import { AppStoreBadges } from "./app-store-badges"
import { FooterBottomBar, type LegalLinkItem } from "./footer-bottom-bar"
import { FooterMenu, type FooterGroupData } from "./footer-menu"

// ── Types ──

export interface FooterMegaProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerMegaVariants> {
  brand?: React.ReactNode
  description?: string
  columns: FooterGroupData[]
  socialLinks?: SocialLinkItem[]
  showNewsletter?: boolean
  newsletterTitle?: string
  newsletterDescription?: string
  onSubscribe?: (email: string) => Promise<boolean | void> | void
  showAppBadges?: boolean
  appStoreUrl?: string
  googlePlayUrl?: string
  showStatusBadge?: boolean
  status?: SystemHealthStatus
  statusUptime?: string
  statusHref?: string
  brandName?: string
  legalLinks?: LegalLinkItem[]
  locale?: UILocale
}

// ── Variants ──

export const footerMegaVariants = cva(
  "w-full border-t border-border bg-background pt-16 pb-12",
  {
    variants: {
      tone: {
        plain: "",
        card: "bg-card/50",
      },
    },
    defaultVariants: {
      tone: "plain",
    },
  }
)

// ── Component ──

export const FooterMega = React.forwardRef<HTMLElement, FooterMegaProps>(
  (
    {
      brand,
      description = "Advanced Engineering and Media Laboratory of the Federal University of Paraíba. Developing innovative digital solutions with accessibility and precision.",
      columns,
      socialLinks = [
        { platform: "github", href: "https://github.com" },
        { platform: "x", href: "https://x.com" },
        { platform: "linkedin", href: "https://linkedin.com" },
        { platform: "youtube", href: "https://youtube.com" },
      ],
      showNewsletter = true,
      newsletterTitle,
      newsletterDescription,
      onSubscribe,
      showAppBadges = false,
      appStoreUrl,
      googlePlayUrl,
      showStatusBadge = true,
      status = "operational",
      statusUptime = "99.98%",
      statusHref = "https://status.ufpb.br",
      brandName = "LEMA - UFPB",
      legalLinks,
      locale = "en-US",
      tone = "plain",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn(footerMegaVariants({ tone }), className)}
        {...props}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          {/* Main 12-column grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Col 1: Brand & Mission (4 cols) */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              {brand && (
                <div className="flex items-center gap-2 font-bold text-foreground">
                  {brand}
                </div>
              )}

              {description && (
                <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}

              {socialLinks.length > 0 && (
                <div className="mt-1">
                  <SocialLinks
                    links={socialLinks}
                    variant="outline"
                    size="sm"
                    shape="circle"
                  />
                </div>
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

            {/* Col 2: Navigation link columns (5 cols) */}
            <div className="lg:col-span-5">
              <FooterMenu data={columns} locale={locale} size="sm" />
            </div>

            {/* Col 3: Newsletter & Downloads (3 cols) */}
            {(showNewsletter || showAppBadges) && (
              <div className="flex flex-col gap-6 lg:col-span-3">
                {showNewsletter && (
                  <FooterNewsletter
                    layout="stacked"
                    title={newsletterTitle}
                    description={newsletterDescription}
                    onSubscribe={onSubscribe}
                    locale={locale}
                  />
                )}

                {showAppBadges && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      Mobile App
                    </span>
                    <AppStoreBadges
                      links={[
                        ...(appStoreUrl
                          ? [{ href: appStoreUrl, store: "apple" as const }]
                          : []),
                        ...(googlePlayUrl
                          ? [{ href: googlePlayUrl, store: "google" as const }]
                          : []),
                      ]}
                    />
                  </div>
                )}
              </div>
            )}
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
FooterMega.displayName = "FooterMega"
