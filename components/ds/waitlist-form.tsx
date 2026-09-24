"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  Loader2Icon,
  MailIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export type WaitlistStatus = "idle" | "submitting" | "success" | "error"

export interface WaitlistFormProps
  extends
    Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    VariantProps<typeof waitlistFormVariants> {
  onSubmit?: (email: string) => Promise<boolean | void> | void
  socialProof?: React.ReactNode
  locale?: UILocale
  disabled?: boolean
  autoFocus?: boolean
}

// ── Variants ──

export const waitlistFormVariants = cva("flex w-full flex-col gap-2", {
  variants: {
    variant: {
      default: "max-w-md",
      pill: "max-w-md",
      floating:
        "max-w-md rounded-2xl border border-border/60 bg-card/80 p-2 shadow-lg backdrop-blur-sm",
      minimal: "max-w-md",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

// ── Component ──

export const WaitlistForm = React.forwardRef<
  HTMLFormElement,
  WaitlistFormProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      onSubmit,
      socialProof,
      locale: localeProp,
      disabled = false,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState<WaitlistStatus>("idle")
    const [errorMessage, setErrorMessage] = React.useState("")

    const t = UI_I18N[locale]?.waitlistForm ?? UI_I18N["en-US"].waitlistForm

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || status === "submitting" || disabled) return

      setStatus("submitting")
      setErrorMessage("")

      try {
        if (onSubmit) {
          const result = await onSubmit(email)
          if (result === false) {
            setStatus("error")
            setErrorMessage(t.invalidEmail)
            return
          }
        } else {
          // Mock delay if no handler provided
          await new Promise((resolve) => setTimeout(resolve, 600))
        }

        setStatus("success")
        setEmail("")
      } catch {
        setStatus("error")
        setErrorMessage(t.invalidEmail)
      }
    }

    const isPill = variant === "pill"
    const inputHeight = size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9"
    const buttonHeight = size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9"

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(waitlistFormVariants({ variant, size }), className)}
        {...props}
      >
        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
          >
            <CheckCircle2Icon className="size-4 shrink-0" aria-hidden="true" />
            <span>{t.success}</span>
          </div>
        ) : (
          <>
            {isPill ? (
              <div className="relative flex items-center rounded-full border border-border/80 bg-background p-1 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex items-center pl-3 text-muted-foreground">
                  <MailIcon className="size-4" aria-hidden="true" />
                </div>
                <Input
                  type="email"
                  required
                  autoFocus={autoFocus}
                  disabled={disabled || status === "submitting"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                  className="flex-1 border-0 bg-transparent text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  size={size === "sm" ? "sm" : "default"}
                  disabled={disabled || status === "submitting"}
                  className={cn("shrink-0 rounded-full px-4", buttonHeight)}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2Icon
                        className="mr-1.5 size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                      <span>{t.button}</span>
                    </>
                  ) : (
                    t.button
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    required
                    autoFocus={autoFocus}
                    disabled={disabled || status === "submitting"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.placeholder}
                    className={cn(
                      inputHeight,
                      "text-sm placeholder:text-muted-foreground"
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={disabled || status === "submitting"}
                  className={cn("shrink-0", inputHeight)}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2Icon
                        className="mr-1.5 size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                      <span>{t.button}</span>
                    </>
                  ) : (
                    t.button
                  )}
                </Button>
              </div>
            )}

            {status === "error" && (
              <div
                role="status"
                aria-live="polite"
                className="mt-1 flex items-center gap-1.5 text-xs text-destructive"
              >
                <AlertCircleIcon
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errorMessage || t.invalidEmail}</span>
              </div>
            )}

            {socialProof && status !== "error" && (
              <p className="text-center text-xs text-muted-foreground sm:text-left">
                {socialProof}
              </p>
            )}
          </>
        )}
      </form>
    )
  }
)
WaitlistForm.displayName = "WaitlistForm"
