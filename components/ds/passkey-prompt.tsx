"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { FingerprintIcon, Loader2Icon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface PasskeyPromptProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof passkeyPromptVariants> {
  onAuthenticate?: () => Promise<boolean | void> | void
  loading?: boolean
  supported?: boolean
  locale?: UILocale
}

// ── Variants ──

export const passkeyPromptVariants = cva("w-full transition-all", {
  variants: {
    variant: {
      card: "flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/5 p-3.5 hover:border-primary/40 hover:bg-primary/10",
      button: "w-full",
    },
  },
  defaultVariants: {
    variant: "card",
  },
})

// ── Component ──

export const PasskeyPrompt = React.forwardRef<
  HTMLDivElement,
  PasskeyPromptProps
>(
  (
    {
      className,
      variant = "card",
      loading: controlledLoading = false,
      supported = true,
      onAuthenticate,
      locale = "en-US",
      ...props
    },
    ref
  ) => {
    const [internalLoading, setInternalLoading] = React.useState(false)
    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth

    const isLoading = controlledLoading || internalLoading

    const handleClick = async () => {
      if (isLoading || !supported || !onAuthenticate) return

      try {
        setInternalLoading(true)
        await onAuthenticate()
      } finally {
        setInternalLoading(false)
      }
    }

    if (!supported) return null

    if (variant === "button") {
      return (
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={handleClick}
          aria-label={t.passkey}
          className={cn("w-full gap-2", className)}
        >
          {isLoading ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <FingerprintIcon
              className="size-4 text-primary"
              aria-hidden="true"
            />
          )}
          <span>{t.passkey}</span>
        </Button>
      )
    }

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={t.passkey}
        aria-busy={isLoading}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick()
          }
        }}
        className={cn(
          passkeyPromptVariants({ variant }),
          "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            {isLoading ? (
              <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
            ) : (
              <FingerprintIcon className="size-5" aria-hidden="true" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                {t.passkey}
              </span>
              <span className="py-0.2 inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-1.5 text-xs font-semibold text-primary">
                <SparklesIcon className="size-2.5" aria-hidden="true" />
                Secure
              </span>
            </div>
            <span className="line-clamp-1 text-xs text-muted-foreground">
              {t.passkeyDescription}
            </span>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
        >
          {isLoading ? t.verify : t.login}
        </span>
      </div>
    )
  }
)
PasskeyPrompt.displayName = "PasskeyPrompt"
