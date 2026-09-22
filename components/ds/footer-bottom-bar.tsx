import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface LegalLinkItem {
  label: string
  href: string
}

export interface FooterBottomBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerBottomBarVariants> {
  brandName?: string
  year?: number | string
  legalLinks?: LegalLinkItem[]
  locale?: UILocale
}

// ── Variants ──

export const footerBottomBarVariants = cva(
  "flex w-full flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
  {
    variants: {
      spacing: {
        compact: "pt-4",
        normal: "pt-6",
        relaxed: "pt-8",
      },
    },
    defaultVariants: {
      spacing: "normal",
    },
  }
)

// ── Component ──

export const FooterBottomBar = React.forwardRef<
  HTMLDivElement,
  FooterBottomBarProps
>(
  (
    {
      brandName = "LEMA",
      year = new Date().getFullYear(),
      legalLinks,
      locale = "en-US",
      spacing = "normal",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].footer

    const links = legalLinks || [
      { label: t.privacyPolicy, href: "#" },
      { label: t.termsOfService, href: "#" },
      { label: t.cookiePolicy, href: "#" },
    ]

    return (
      <div
        ref={ref}
        className={cn(footerBottomBarVariants({ spacing }), className)}
        {...props}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p>
            © {year} {brandName}. {t.allRightsReserved}
          </p>
          {links.length > 0 && (
            <nav
              aria-label="Links legais"
              className="flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              {links.map((link, idx) => (
                <a
                  key={`${link.label}-${idx}`}
                  href={link.href}
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {children && (
          <div className="flex flex-wrap items-center gap-3">{children}</div>
        )}
      </div>
    )
  }
)
FooterBottomBar.displayName = "FooterBottomBar"
