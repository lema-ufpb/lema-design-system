"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ShieldCheckIcon,
  Loader2Icon,
  RefreshCwIcon,
  SmartphoneIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface TwoFactorAuthProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof twoFactorAuthVariants> {
  onVerify?: (
    code: string,
    trustDevice: boolean
  ) => Promise<boolean | void> | void
  onResend?: () => Promise<void> | void
  resendCooldown?: number
  destination?: string
  method?: "authenticator" | "email" | "sms"
  allowAlternative?: boolean
  onAlternativeMethod?: () => void
  locale?: UILocale
}

// ── Variants ──

export const twoFactorAuthVariants = cva(
  "flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-border/80 bg-card p-6 text-card-foreground shadow-lg sm:p-8",
  {
    variants: {
      variant: {
        default: "",
        clean: "border-0 bg-transparent p-0 shadow-none sm:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export const TwoFactorAuth = React.forwardRef<
  HTMLDivElement,
  TwoFactorAuthProps
>(
  (
    {
      className,
      variant = "default",
      onVerify,
      onResend,
      resendCooldown = 60,
      destination = "u***@ufpb.br",
      method = "email",
      allowAlternative = true,
      onAlternativeMethod,
      locale = "pt-BR",
      ...props
    },
    ref
  ) => {
    const [code, setCode] = React.useState("")
    const [trustDevice, setTrustDevice] = React.useState(false)
    const [countdown, setCountdown] = React.useState(resendCooldown)
    const [loading, setLoading] = React.useState(false)
    const [resending, setResending] = React.useState(false)

    const t = UI_I18N[locale]?.auth ?? UI_I18N["pt-BR"].auth

    React.useEffect(() => {
      if (countdown <= 0) return
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }, [countdown])

    const handleVerify = async (e: React.FormEvent) => {
      e.preventDefault()
      if (code.length < 6 || loading || !onVerify) return

      try {
        setLoading(true)
        await onVerify(code, trustDevice)
      } finally {
        setLoading(false)
      }
    }

    const handleResend = async () => {
      if (countdown > 0 || resending || !onResend) return

      try {
        setResending(true)
        await onResend()
        setCountdown(resendCooldown)
      } finally {
        setResending(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(twoFactorAuthVariants({ variant }), className)}
        {...props}
      >
        {/* Header with Icon */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="mb-1 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {method === "authenticator" ? (
              <SmartphoneIcon className="size-6" aria-hidden="true" />
            ) : (
              <ShieldCheckIcon className="size-6" aria-hidden="true" />
            )}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {t.twoFactorTitle}
          </h2>
          <p className="max-w-xs text-xs text-muted-foreground">
            {t.twoFactorDescription}
            {destination && (
              <span className="mt-1 block font-semibold text-foreground">
                {destination}
              </span>
            )}
          </p>
        </div>

        {/* Verification Form */}
        <form
          onSubmit={handleVerify}
          className="flex w-full flex-col items-center gap-5"
        >
          <div className="flex flex-col items-center gap-2">
            <Label htmlFor="two-factor-otp-input" className="sr-only">
              {t.twoFactorTitle}
            </Label>
            <InputOTP
              id="two-factor-otp-input"
              aria-label={t.twoFactorTitle}
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Checkbox
              id="trust-device"
              checked={trustDevice}
              onCheckedChange={(checked) => setTrustDevice(!!checked)}
            />
            <Label
              htmlFor="trust-device"
              className="cursor-pointer text-xs font-normal text-muted-foreground"
            >
              {t.rememberMe} (30 dias)
            </Label>
          </div>

          <Button
            type="submit"
            disabled={code.length < 6 || loading}
            className="w-full gap-2"
          >
            {loading ? (
              <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              t.verify
            )}
          </Button>
        </form>

        {/* Resend & Alternative options */}
        <div className="flex w-full flex-col items-center gap-2 border-t border-border/50 pt-1 text-center text-xs text-muted-foreground">
          <div className="mt-2 flex items-center gap-1.5">
            <span>{t.dontHaveAccount}</span>
            {countdown > 0 ? (
              <span className="font-semibold text-foreground">
                {t.resendIn} {countdown}s
              </span>
            ) : (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleResend}
                disabled={resending}
                className="h-auto p-0 text-xs font-semibold text-primary"
              >
                {resending && (
                  <RefreshCwIcon
                    className="mr-1 size-3 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {t.resendCode}
              </Button>
            )}
          </div>

          {allowAlternative && onAlternativeMethod && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onAlternativeMethod}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              {t.useAlternativeMethod}
            </Button>
          )}
        </div>
      </div>
    )
  }
)
TwoFactorAuth.displayName = "TwoFactorAuth"
