"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export type SocialProvider =
  "google" | "github" | "microsoft" | "apple" | "govbr" | "cafe"

export interface SocialAuthGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof socialAuthGroupVariants> {
  providers?: SocialProvider[]
  size?: "sm" | "md" | "lg"
  loadingProvider?: SocialProvider | null
  disabled?: boolean
  onSelect?: (provider: SocialProvider) => void
  locale?: UILocale
}

// ── Variants ──

export const socialAuthGroupVariants = cva("flex w-full", {
  variants: {
    layout: {
      stacked: "flex-col gap-2.5",
      inline: "flex-row flex-wrap justify-center gap-2",
      grid: "grid grid-cols-2 gap-2.5",
    },
  },
  defaultVariants: {
    layout: "stacked",
  },
})

// ── Provider Icons ──

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#00a4ef" d="M1 13h10v10H1z" />
      <path fill="#7fba00" d="M13 1h10v10H13z" />
      <path fill="#ffb900" d="M13 13h10v10H13z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.04 1.69-.91 2.71 1 .08 2.01-.5 2.6-1.2" />
    </svg>
  )
}

function GovBrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#003399" />
      <path
        d="M4 14.5C4 11.46 6.46 9 9.5 9s5.5 2.46 5.5 5.5S12.54 20 9.5 20 4 17.54 4 14.5z"
        fill="#009933"
      />
      <circle cx="15.5" cy="11.5" r="4.5" fill="#FFCC00" />
      <text
        x="5"
        y="15"
        fill="#FFFFFF"
        fontSize="7"
        fontWeight="bold"
        fontFamily="inherit"
      >
        gov
      </text>
    </svg>
  )
}

function CafeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect
        width="24"
        height="24"
        rx="4"
        fill="currentColor"
        className="text-primary/20"
      />
      <path
        d="M5 8h11a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M16 10h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2v-3z"
        fill="currentColor"
        className="text-primary-foreground"
      />
      <path d="M3 18h16v1.5H3z" fill="currentColor" className="text-primary" />
    </svg>
  )
}

const PROVIDER_CONFIG: Record<
  SocialProvider,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  google: { label: "Google", icon: GoogleIcon },
  github: { label: "GitHub", icon: GithubIcon },
  microsoft: { label: "Microsoft", icon: MicrosoftIcon },
  apple: { label: "Apple", icon: AppleIcon },
  govbr: { label: "Gov.br", icon: GovBrIcon },
  cafe: { label: "CAFe / UFPB", icon: CafeIcon },
}

// ── Component ──

export const SocialAuthGroup = React.forwardRef<
  HTMLDivElement,
  SocialAuthGroupProps
>(
  (
    {
      className,
      layout = "stacked",
      size = "md",
      providers = ["google", "github"],
      loadingProvider = null,
      disabled = false,
      onSelect,
      locale: localeProp,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth

    const isInline = layout === "inline"
    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"
    const buttonHeight = size === "sm" ? "h-8" : size === "lg" ? "h-11" : "h-9"

    return (
      <div
        ref={ref}
        role="group"
        aria-label={t.orContinueWith}
        className={cn(socialAuthGroupVariants({ layout }), className)}
        {...props}
      >
        {providers.map((provider) => {
          const config = PROVIDER_CONFIG[provider]
          if (!config) return null

          const Icon = config.icon
          const isLoading = loadingProvider === provider
          const fullLabel = `${t.continueWith} ${config.label}`

          return (
            <Button
              key={provider}
              type="button"
              variant="outline"
              size={isInline ? "icon" : size === "md" ? "default" : size}
              disabled={disabled || loadingProvider !== null}
              onClick={() => onSelect?.(provider)}
              aria-label={fullLabel}
              aria-busy={isLoading}
              className={cn(
                "relative transition-all",
                layout === "stacked" && "w-full justify-center gap-2.5",
                layout === "grid" && "justify-center gap-2",
                isInline && "shrink-0",
                buttonHeight
              )}
            >
              {isLoading ? (
                <Loader2Icon
                  className={cn("animate-spin", iconSize)}
                  aria-hidden="true"
                />
              ) : (
                <Icon className={iconSize} />
              )}

              {!isInline && (
                <span className="truncate">
                  {layout === "grid" ? config.label : fullLabel}
                </span>
              )}
            </Button>
          )
        })}
      </div>
    )
  }
)
SocialAuthGroup.displayName = "SocialAuthGroup"
