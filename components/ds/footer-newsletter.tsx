"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon, CheckCircle2Icon, SendIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface FooterNewsletterProps
  extends
    Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    VariantProps<typeof footerNewsletterVariants> {
  title?: string
  description?: string
  onSubscribe?: (email: string) => Promise<boolean | void> | void
  locale?: UILocale
  showPrivacyNotice?: boolean
}

// ── Variants ──

export const footerNewsletterVariants = cva("flex w-full flex-col gap-2.5", {
  variants: {
    layout: {
      inline: "max-w-md",
      stacked: "max-w-xs",
    },
  },
  defaultVariants: {
    layout: "inline",
  },
})

// ── Component ──

export const FooterNewsletter = React.forwardRef<
  HTMLFormElement,
  FooterNewsletterProps
>(
  (
    {
      layout = "inline",
      title,
      description,
      onSubscribe,
      locale = "en-US",
      showPrivacyNotice = true,
      className,
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale].footer
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)
    const inputId = React.useId()

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || loading) return

      try {
        setLoading(true)
        if (onSubscribe) {
          await onSubscribe(email)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 800))
        }
        setSubmitted(true)
      } finally {
        setLoading(false)
      }
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(footerNewsletterVariants({ layout }), className)}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-foreground">
            {title || t.newsletterTitle}
          </h3>
          <p className="text-xs text-muted-foreground">
            {description || t.newsletterDescription}
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-lg bg-success/15 px-3 py-2 text-xs font-medium text-success"
          >
            <CheckCircle2Icon className="size-4 shrink-0" aria-hidden="true" />
            <span>{t.subscribedSuccess}</span>
          </div>
        ) : (
          <div
            className={cn(
              "flex w-full gap-2",
              layout === "stacked" ? "flex-col" : "flex-row items-center"
            )}
          >
            <div className="relative w-full">
              <Label htmlFor={inputId} className="sr-only">
                {t.newsletterPlaceholder}
              </Label>
              <Input
                id={inputId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletterPlaceholder}
                disabled={loading}
                className="h-9 text-xs"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              disabled={loading || !email}
              aria-busy={loading}
              className={cn(
                "h-9 shrink-0 gap-1.5 font-medium",
                layout === "stacked" && "w-full"
              )}
            >
              {loading ? (
                <>
                  <Loader2Icon
                    className="size-3.5 animate-spin"
                    aria-hidden="true"
                  />
                  <span>{t.subscribe}</span>
                </>
              ) : (
                <>
                  <span>{t.subscribe}</span>
                  <SendIcon className="size-3.5" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        )}

        {showPrivacyNotice && !submitted && (
          <p className="text-xs text-muted-foreground">{t.privacyNotice}</p>
        )}
      </form>
    )
  }
)
FooterNewsletter.displayName = "FooterNewsletter"
