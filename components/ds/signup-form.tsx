"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SocialAuthGroup, type SocialProvider } from "./social-auth-group"
import { AuthSeparator } from "./auth-separator"
import { PasswordStrengthMeter } from "./password-strength-meter"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface SignUpFormData {
  name: string
  email: string
  password: string
  terms: boolean
}

export interface SignUpFormProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof signUpFormVariants> {
  onSubmit?: (data: SignUpFormData) => Promise<boolean | void> | void
  onSocialSignUp?: (provider: SocialProvider) => Promise<void> | void
  onLogin?: () => void
  socialProviders?: SocialProvider[]
  termsUrl?: string
  privacyUrl?: string
  loading?: boolean
  errorMessage?: string
  locale?: UILocale
}

// ── Variants ──

export const signUpFormVariants = cva(
  "flex w-full max-w-md flex-col gap-4 rounded-2xl border border-border/80 bg-card p-6 text-card-foreground shadow-lg sm:p-8",
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

export const SignUpForm = React.forwardRef<HTMLDivElement, SignUpFormProps>(
  (
    {
      className,
      variant = "default",
      onSubmit,
      onSocialSignUp,
      onLogin,
      socialProviders = ["google", "github", "govbr"],
      termsUrl = "#",
      privacyUrl = "#",
      loading: controlledLoading = false,
      errorMessage,
      locale = "pt-BR",
      ...props
    },
    ref
  ) => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [terms, setTerms] = React.useState(false)
    const [internalLoading, setInternalLoading] = React.useState(false)
    const [loadingProvider, setLoadingProvider] =
      React.useState<SocialProvider | null>(null)

    const t = UI_I18N[locale]?.auth ?? UI_I18N["pt-BR"].auth
    const isLoading = controlledLoading || internalLoading

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!name || !email || !password || !terms || isLoading || !onSubmit)
        return

      try {
        setInternalLoading(true)
        await onSubmit({ name, email, password, terms })
      } finally {
        setInternalLoading(false)
      }
    }

    const handleSocialSelect = async (provider: SocialProvider) => {
      if (isLoading || loadingProvider || !onSocialSignUp) return

      try {
        setLoadingProvider(provider)
        await onSocialSignUp(provider)
      } finally {
        setLoadingProvider(null)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(signUpFormVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t.signUp}
          </h2>
          <p className="text-xs text-muted-foreground">
            Crie sua conta para acessar todo o ecossistema e serviços
            integrados.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
          >
            <AlertCircleIcon className="size-4 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Social Sign Up */}
        {socialProviders.length > 0 && (
          <SocialAuthGroup
            providers={socialProviders}
            layout={socialProviders.length > 2 ? "grid" : "stacked"}
            size="md"
            loadingProvider={loadingProvider}
            disabled={isLoading}
            onSelect={handleSocialSelect}
            locale={locale}
          />
        )}

        {/* Separator */}
        {socialProviders.length > 0 && (
          <AuthSeparator variant="default">{t.orContinueWith}</AuthSeparator>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-name" className="text-xs font-medium">
              {t.name}
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <UserIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                id="signup-name"
                type="text"
                required
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="h-10 pl-9 text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-email" className="text-xs font-medium">
              {t.email}
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <MailIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                id="signup-email"
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

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-password" className="text-xs font-medium">
              {t.password}
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <LockIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="h-10 pr-9 pl-9 text-sm placeholder:text-muted-foreground"
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus-visible:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" aria-hidden="true" />
                ) : (
                  <EyeIcon className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Embedded Password Strength Meter */}
            {password.length > 0 && (
              <div className="pt-1">
                <PasswordStrengthMeter
                  password={password}
                  size="sm"
                  locale={locale}
                />
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="signup-terms"
              checked={terms}
              onCheckedChange={(checked) => setTerms(!!checked)}
              className="mt-0.5"
            />
            <Label
              htmlFor="signup-terms"
              className="cursor-pointer text-xs leading-snug font-normal text-muted-foreground"
            >
              {t.termsAgreement}{" "}
              <a
                href={termsUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {t.termsOfService}
              </a>{" "}
              {t.and}{" "}
              <a
                href={privacyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {t.privacyPolicy}
              </a>
              .
            </Label>
          </div>

          <Button
            type="submit"
            disabled={!terms || isLoading}
            className="mt-2 h-10 w-full"
          >
            {isLoading && (
              <Loader2Icon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {t.createAccount}
          </Button>
        </form>

        {/* Footer / Login link */}
        {onLogin && (
          <div className="flex items-center justify-center gap-1 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span>{t.alreadyHaveAccount}</span>
            <button
              type="button"
              onClick={onLogin}
              className="font-semibold text-primary hover:underline focus-visible:outline-none"
            >
              {t.login}
            </button>
          </div>
        )}
      </div>
    )
  }
)
SignUpForm.displayName = "SignUpForm"
