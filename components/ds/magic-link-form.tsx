"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  MailCheckIcon,
  MailIcon,
  Loader2Icon,
  ExternalLinkIcon,
  ArrowLeftIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface MagicLinkFormProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof magicLinkFormVariants> {
  onSendLink?: (email: string) => Promise<boolean | void> | void
  onBack?: () => void
  resendCooldown?: number
  locale?: UILocale
}

// ── Variants ──

export const magicLinkFormVariants = cva("flex w-full flex-col gap-4", {
  variants: {
    variant: {
      default: "",
      clean: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// ── Component ──

export const MagicLinkForm = React.forwardRef<
  HTMLDivElement,
  MagicLinkFormProps
>(
  (
    {
      className,
      variant = "default",
      onSendLink,
      onBack,
      resendCooldown = 45,
      locale = "en-US",
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("")
    const [sent, setSent] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [countdown, setCountdown] = React.useState(resendCooldown)

    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth

    React.useEffect(() => {
      if (!sent || countdown <= 0) return
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }, [sent, countdown])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || loading || !onSendLink) return

      try {
        setLoading(true)
        await onSendLink(email)
        setSent(true)
        setCountdown(resendCooldown)
      } finally {
        setLoading(false)
      }
    }

    const handleResend = async () => {
      if (countdown > 0 || loading || !onSendLink) return

      try {
        setLoading(true)
        await onSendLink(email)
        setCountdown(resendCooldown)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(magicLinkFormVariants({ variant }), className)}
        {...props}
      >
        {sent ? (
          <div
            role="status"
            aria-live="polite"
            className="flex animate-in flex-col items-center gap-4 py-2 text-center duration-300 fade-in-0"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
              <MailCheckIcon className="size-7" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-foreground">
                {t.checkYourEmail}
              </h3>
              <p className="max-w-xs text-xs text-muted-foreground">
                {t.magicLinkSent}{" "}
                <span className="font-semibold text-foreground">{email}</span>
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 pt-2">
              <Button
                type="button"
                className="w-full gap-2"
                onClick={() => window.open(`mailto:${email}`, "_blank")}
              >
                <ExternalLinkIcon className="size-4" aria-hidden="true" />
                <span>{t.openEmailApp}</span>
              </Button>

              <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground">
                {countdown > 0 ? (
                  <span>
                    {t.resendIn}{" "}
                    <strong className="text-foreground">{countdown}s</strong>
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={handleResend}
                    disabled={loading}
                    className="h-auto p-0 text-xs font-semibold text-primary"
                  >
                    {t.resendCode}
                  </Button>
                )}
              </div>
            </div>

            {onBack && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSent(false)}
                className="mt-2 gap-1.5 text-xs text-muted-foreground"
              >
                <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
                <span>{t.backToLogin}</span>
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <MailIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                aria-label={t.email}
                className="h-10 pl-9 text-sm placeholder:text-muted-foreground"
              />
            </div>

            <Button
              type="submit"
              disabled={!email || loading}
              className="h-10 w-full"
            >
              {loading ? (
                <Loader2Icon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : null}
              {t.sendMagicLink}
            </Button>

            {onBack && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mt-1 gap-1.5 text-xs text-muted-foreground"
              >
                <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
                <span>{t.backToLogin}</span>
              </Button>
            )}
          </form>
        )}
      </div>
    )
  }
)
MagicLinkForm.displayName = "MagicLinkForm"
