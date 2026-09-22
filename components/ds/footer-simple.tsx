import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { SocialLinks, type SocialLinkItem } from "./social-links"
import {
  SystemStatusBadge,
  type SystemHealthStatus,
} from "./system-status-badge"
import { FooterBottomBar, type LegalLinkItem } from "./footer-bottom-bar"

// ── Types ──

export interface FooterSimpleNavLink {
  label: string
  href: string
}

export interface FooterSimpleProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerSimpleVariants> {
  brand?: React.ReactNode
  links?: FooterSimpleNavLink[]
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

export const footerSimpleVariants = cva(
  "w-full border-t border-border bg-background py-10",
  {
    variants: {
      align: {
        center: "text-center",
        start: "text-left",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

// ── Component ──

export const FooterSimple = React.forwardRef<HTMLElement, FooterSimpleProps>(
  (
    {
      brand,
      links = [
        { label: "About", href: "#" },
        { label: "Services", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Contact", href: "#" },
      ],
      socialLinks = [
        { platform: "github", href: "https://github.com" },
        { platform: "x", href: "https://x.com" },
        { platform: "linkedin", href: "https://linkedin.com" },
      ],
      showStatusBadge = false,
      status = "operational",
      statusUptime,
      statusHref,
      brandName = "LEMA - UFPB",
      legalLinks,
      align = "center",
      locale = "en-US",
      className,
      ...props
    },
    ref
  ) => {
    const isCenter = align === "center"

    return (
      <footer
        ref={ref}
        className={cn(footerSimpleVariants({ align }), className)}
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6",
            isCenter ? "items-center" : "items-start"
          )}
        >
          {brand && (
            <div className="flex items-center gap-2 font-bold text-foreground">
              {brand}
            </div>
          )}

          {links.length > 0 && (
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              {links.map((link, idx) => (
                <a
                  key={`${link.label}-${idx}`}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {socialLinks.length > 0 && (
            <SocialLinks
              links={socialLinks}
              variant="ghost"
              size="sm"
              shape="circle"
            />
          )}

          {showStatusBadge && (
            <SystemStatusBadge
              status={status}
              uptime={statusUptime}
              href={statusHref}
              size="sm"
              locale={locale}
            />
          )}

          <FooterBottomBar
            brandName={brandName}
            legalLinks={legalLinks}
            locale={locale}
            spacing="compact"
            className="w-full justify-center text-center"
          />
        </div>
      </footer>
    )
  }
)
FooterSimple.displayName = "FooterSimple"
