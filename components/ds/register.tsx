"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { PasswordInput } from "./input-password"
import { SocialAuthGroup } from "./social-auth-group"
import { AuthSeparator } from "./auth-separator"

// ── Types ──────────────────────────────────────────────────────────────────

export interface RegisterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit?: (data: { name: string; email: string; password: string }) => void
  showSocial?: boolean
  socials?: ("google" | "github" | "apple" | "microsoft")[]
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Register({ className, onSubmit, showSocial = true, socials = ["google", "github"], locale = "en-US", loading = false, ...props }: RegisterProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [agree, setAgree] = React.useState(false)

  const t = UI_I18N[locale].auth

  if (loading) {
    return (
      <div data-slot="register-skeleton" className={cn("flex flex-col gap-6 rounded-2xl border bg-card p-6", className)} {...props}>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agree) return
    onSubmit?.({ name, email, password })
  }

  return (
    <div data-slot="register" className={cn("flex flex-col gap-6 rounded-2xl border bg-card p-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">{t.createAccount}</h2>
        <p className="text-sm text-muted-foreground">{t.termsAgreement}</p>
      </div>

      {showSocial && (
        <>
          <SocialAuthGroup providers={socials as never} locale={locale} />
          <AuthSeparator>{t.orContinueWith}</AuthSeparator>
        </>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="register-name">{t.name}</FieldLabel>
            <Input id="register-name" placeholder={t.namePlaceholder} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="register-email">{t.email}</FieldLabel>
            <Input id="register-email" type="email" placeholder={t.emailPlaceholder} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="register-password">{t.password}</FieldLabel>
            <PasswordInput id="register-password" placeholder={t.passwordPlaceholder} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
            <FieldDescription className="text-xs">{t.ruleLength}</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="register-terms" checked={agree} onCheckedChange={(v) => setAgree(v === true)} required />
            <Label htmlFor="register-terms" className="text-xs font-normal leading-relaxed">
              {t.termsAgreement} <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">{t.termsOfService}</a> {t.and}{" "}
              <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">{t.privacyPolicy}</a>
            </Label>
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={!agree} className="w-full rounded-full font-semibold">
          {t.createAccount}
        </Button>
      </form>
    </div>
  )
}
