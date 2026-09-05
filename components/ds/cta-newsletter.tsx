"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cta, type CtaProps } from "./cta"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CtaNewsletterProps extends Omit<CtaProps, "primaryAction" | "secondaryAction"> {
  onSubscribe?: (email: string) => Promise<boolean | void> | void
  placeholder?: string
  disclaimer?: string
  locale?: UILocale
}

// ── Component ──────────────────────────────────────────────────────────────

export function CtaNewsletter({
  className,
  title,
  description,
  badge,
  tone = "default",
  size = "md",
  align = "center",
  onSubscribe,
  placeholder,
  disclaimer,
  locale = "en-US",
  loading = false,
  ...props
}: CtaNewsletterProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  const t = UI_I18N[locale].cta

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const tWait = UI_I18N[locale].waitlistForm
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(tWait.invalidEmail)
      setStatus("error")
      return
    }
    setStatus("loading")
    setError(null)
    try {
      const res = await onSubscribe?.(email)
      if (res === false) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
      setError(tWait.invalidEmail)
    }
  }

  return (
    <div
      data-slot="cta-newsletter"
      className={cn(
        "relative overflow-hidden rounded-3xl border p-8 md:p-12",
        tone === "primary" ? "border-transparent bg-primary text-primary-foreground" : tone === "glow" ? "border-primary/20 bg-card shadow-xl shadow-primary/5" : "border-border bg-card",
        align === "center" ? "text-center" : "text-left",
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto flex max-w-2xl flex-col gap-4", align === "center" ? "items-center" : "items-start")}>
        <Cta badge={badge} title={title} description={description} tone={tone === "glow" ? "default" : tone} align={align} size={size} loading={loading} className="border-0 p-0 shadow-none" />

        {status === "success" ? (
          <p className="text-sm font-medium text-success">Subscribed!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              id="cta-newsletter-input"
              aria-label={placeholder ?? t.emailPlaceholder}
              aria-describedby={status === "error" ? "cta-newsletter-error" : undefined}
              placeholder={placeholder ?? t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={status === "error" || undefined}
              data-invalid={status === "error" || undefined}
              required
              className="h-10 flex-1 rounded-full"
            />
            <Button type="submit" disabled={status === "loading"} className="h-10 rounded-full px-6 font-semibold" variant={tone === "primary" ? "secondary" : "default"}>
              {status === "loading" ? "..." : t.subscribe}
            </Button>
          </form>
        )}
        {error && <p id="cta-newsletter-error" role="alert" className="text-xs text-destructive">{error}</p>}
        {disclaimer ? (
          <p className="text-xs text-muted-foreground">{disclaimer}</p>
        ) : (
          <p className="text-xs text-muted-foreground">{t.noSpam}</p>
        )}
      </div>
    </div>
  )
}
