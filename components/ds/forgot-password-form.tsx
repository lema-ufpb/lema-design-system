"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  KeyRoundIcon,
  MailIcon,
  MailCheckIcon,
  Loader2Icon,
  ArrowLeftIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface ForgotPasswordFormProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof forgotPasswordFormVariants> {
  onSubmit?: (email: string) => Promise<boolean | void> | void
  onBackToLogin?: () => void
  resendCooldown?: number
  loading?: boolean
  locale?: UILocale
}

// ── Variants ──

export const forgotPasswordFormVariants = cva(
  "flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border/80 bg-card p-6 text-card-foreground shadow-lg sm:p-8",
  {
    variants: {
      variant: {
        default: "",
        flat: "border-0 bg-transparent p-0 shadow-none sm:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export const ForgotPasswordForm = React.forwardRef<
  HTMLDivElement,
  ForgotPasswordFormProps
>(
  (
    {
      className,
      variant = "default",
      onSubmit,
      onBackToLogin,
      resendCooldown = 60,
      loading: controlledLoading = false,
      locale: localeProp,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [email, setEmail] = React.useState("")
    const [sent, setSent] = React.useState(false)
    const [internalLoading, setInternalLoading] = React.useState(false)
    const [countdown, setCountdown] = React.useState(resendCooldown)

    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth
    const isLoading = controlledLoading || internalLoading

    React.useEffect(() => {
      if (!sent || countdown <= 0) return
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }, [sent, countdown])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || isLoading || !onSubmit) return

      try {
        setInternalLoading(true)
        await onSubmit(email)
        setSent(true)
        setCountdown(resendCooldown)
      } finally {
        setInternalLoading(false)
      }
    }

    const handleResend = async () => {
      if (countdown > 0 || isLoading || !onSubmit) return

      try {
        setInternalLoading(true)
        await onSubmit(email)
        setCountdown(resendCooldown)
      } finally {
        setInternalLoading(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(forgotPasswordFormVariants({ variant }), className)}
        {...props}
      >
        {sent ? (
          <div
            role="status"
            aria-live="polite"
            className="flex animate-in flex-col items-center gap-4 py-2 text-center duration-300 fade-in-0"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MailCheckIcon className="size-7" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {t.resetLinkSent}
              </h3>
              <p className="max-w-xs text-xs text-muted-foreground">
                {t.magicLinkSent}{" "}
                <span className="font-semibold text-foreground">{email}</span>.
                Follow the instructions to create a new password.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 pt-3">
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
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
                    disabled={isLoading}
                    className="h-auto p-0 text-xs font-semibold text-primary"
                  >
                    {t.resendCode}
                  </Button>
                )}
              </div>

              {onBackToLogin && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBackToLogin}
                  className="mt-2 h-10 w-full gap-2"
                >
                  <ArrowLeftIcon className="size-4" aria-hidden="true" />
                  <span>{t.backToLogin}</span>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex size-11 items-center justify-center self-center rounded-xl bg-primary/10 text-primary sm:self-start">
                <KeyRoundIcon className="size-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {t.resetPasswordTitle}
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t.resetPasswordDescription}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="forgot-email" className="text-xs font-medium">
                  {t.email}
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <MailIcon className="size-4" aria-hidden="true" />
                  </div>
                  <Input
                    id="forgot-email"
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="h-10 pl-9 text-sm placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!email || isLoading}
                className="mt-1 h-10 w-full"
              >
                {isLoading && (
                  <Loader2Icon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {t.sendResetLink}
              </Button>
            </form>

            {/* Back to Login link */}
            {onBackToLogin && (
              <div className="flex items-center justify-center border-t border-border/50 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onBackToLogin}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
                  <span>{t.backToLogin}</span>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    )
  }
)
ForgotPasswordForm.displayName = "ForgotPasswordForm"
