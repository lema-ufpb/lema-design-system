"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
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
import { PasskeyPrompt } from "./passkey-prompt"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface LoginFormData {
  email: string
  password?: string
  remember: boolean
}

export interface LoginFormProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof loginFormVariants> {
  onSubmit?: (data: LoginFormData) => Promise<boolean | void> | void
  onSocialLogin?: (provider: SocialProvider) => Promise<void> | void
  onForgotPassword?: () => void
  onSignUp?: () => void
  onPasskeyLogin?: () => Promise<boolean | void> | void
  socialProviders?: SocialProvider[]
  showPasskey?: boolean
  loading?: boolean
  errorMessage?: string
  locale?: UILocale
}

// ── Variants ──

export const loginFormVariants = cva(
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

export const LoginForm = React.forwardRef<HTMLDivElement, LoginFormProps>(
  (
    {
      className,
      variant = "default",
      onSubmit,
      onSocialLogin,
      onForgotPassword,
      onSignUp,
      onPasskeyLogin,
      socialProviders = ["google", "github", "govbr"],
      showPasskey = true,
      loading: controlledLoading = false,
      errorMessage,
      locale = "en-US",
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [remember, setRemember] = React.useState(true)
    const [internalLoading, setInternalLoading] = React.useState(false)
    const [loadingProvider, setLoadingProvider] =
      React.useState<SocialProvider | null>(null)

    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth
    const isLoading = controlledLoading || internalLoading

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !password || isLoading || !onSubmit) return

      try {
        setInternalLoading(true)
        await onSubmit({ email, password, remember })
      } finally {
        setInternalLoading(false)
      }
    }

    const handleSocialSelect = async (provider: SocialProvider) => {
      if (isLoading || loadingProvider || !onSocialLogin) return

      try {
        setLoadingProvider(provider)
        await onSocialLogin(provider)
      } finally {
        setLoadingProvider(null)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(loginFormVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t.login}
          </h2>
          <p className="text-xs text-muted-foreground">
            Digite suas credenciais ou continue com um provedor conectado.
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

        {/* Social Logins */}
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-email" className="text-xs font-medium">
              {t.email}
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <MailIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                id="login-email"
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
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-xs font-medium">
                {t.password}
              </Label>
              {onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-xs font-medium text-primary hover:underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {t.forgotPassword}
                </button>
              )}
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <LockIcon className="size-4" aria-hidden="true" />
              </div>
              <Input
                id="login-password"
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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="login-remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(!!checked)}
            />
            <Label
              htmlFor="login-remember"
              className="cursor-pointer text-xs font-normal text-muted-foreground"
            >
              {t.rememberMe}
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-1 h-10 w-full"
          >
            {isLoading && (
              <Loader2Icon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {t.login}
          </Button>
        </form>

        {/* Passkey option */}
        {showPasskey && onPasskeyLogin && (
          <div className="pt-2">
            <PasskeyPrompt
              variant="card"
              onAuthenticate={onPasskeyLogin}
              locale={locale}
            />
          </div>
        )}

        {/* Footer / Sign up link */}
        {onSignUp && (
          <div className="flex items-center justify-center gap-1 border-t border-border/50 pt-2 text-xs text-muted-foreground">
            <span>{t.dontHaveAccount}</span>
            <button
              type="button"
              onClick={onSignUp}
              className="font-semibold text-primary hover:underline focus-visible:outline-none"
            >
              {t.signUp}
            </button>
          </div>
        )}
      </div>
    )
  }
)
LoginForm.displayName = "LoginForm"
