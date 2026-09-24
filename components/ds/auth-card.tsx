"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { GalleryVerticalEndIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface AuthCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authCardVariants> {
  mode?: "login" | "signup"
  title?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  logo?: React.ReactNode
  appName?: string
  locale?: UILocale
  loading?: boolean
}

// ── Variants ──

export const authCardVariants = cva("flex flex-col gap-6", {
  variants: {
    variant: {
      default: "",
      muted: "bg-muted",
      centered: "",
    },
    layout: {
      default: "",
      split: "",
      cover: "",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "default",
  },
})

// ── Component ──

export function AuthCard({
  mode = "login",
  title,
  description,
  imageSrc,
  imageAlt = "Cover image",
  logo,
  appName = "Acme Inc.",
  variant = "default",
  layout = "default",
  locale: localeProp,
  loading = false,
  className,
  children,
  ...props
}: AuthCardProps) {
  const locale = useUILocale(localeProp)
  const tAuth = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth
  const tCard = UI_I18N[locale]?.authCard ?? UI_I18N["en-US"].authCard
  const isCover = layout === "cover" || layout === "split"

  const resolvedTitle =
    title ?? (mode === "login" ? tCard.welcomeBack : tCard.createAccount)
  const resolvedDescription =
    description ??
    (mode === "login" ? tCard.welcomeDescription : tCard.createDescription)

  if (loading) {
    return (
      <div
        data-slot="auth-card-skeleton"
        className={cn("flex w-full max-w-sm flex-col gap-4", className)}
        {...props}
      >
        <Skeleton className="h-8 w-32 self-center" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    )
  }

  // Cover / split layout: image + card side-by-side (shadcn login-02 / login-04)
  if (isCover) {
    return (
      <div
        data-slot="auth-card"
        data-variant={variant}
        data-layout={layout}
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {/* Form side */}
        <div className="flex w-full flex-col gap-4 p-6 md:p-10 lg:max-w-[50%] lg:p-12">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                {logo ?? (
                  <GalleryVerticalEndIcon
                    className="size-4"
                    aria-hidden="true"
                  />
                )}
              </div>
              {appName}
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <Card className={cn(layout === "cover" && "overflow-hidden p-0")}>
                <CardContent
                  className={cn(
                    layout === "cover" ? "grid p-0 md:grid-cols-2" : "p-6"
                  )}
                >
                  {layout === "cover" ? (
                    <>
                      <div className="flex flex-col gap-6 p-6 md:p-8">
                        <div className="flex flex-col items-center gap-2 text-center">
                          <h1 className="text-2xl font-bold">
                            {resolvedTitle}
                          </h1>
                          <p className="text-sm text-balance text-muted-foreground">
                            {resolvedDescription}
                          </p>
                        </div>
                        {children}
                      </div>
                      <div className="relative hidden bg-muted md:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageSrc ?? "/placeholder.svg"}
                          alt={imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">{resolvedTitle}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                          {resolvedDescription}
                        </p>
                      </div>
                      {children}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Image side (split) */}
        {layout === "split" && (
          <div className="relative hidden bg-muted lg:block lg:flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc ?? "/placeholder.svg"}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    )
  }

  // Default centered layouts (shadcn login-01, login-03, login-05)
  if (variant === "muted") {
    return (
      <div
        data-slot="auth-card"
        className={cn(
          "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10",
          className
        )}
        {...props}
      >
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {logo ?? (
                <GalleryVerticalEndIcon className="size-4" aria-hidden="true" />
              )}
            </div>
            {appName}
          </a>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">{resolvedTitle}</h1>
              <p className="text-sm text-balance text-muted-foreground">
                {resolvedDescription}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="auth-card"
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{resolvedTitle}</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  {resolvedDescription}
                </p>
              </div>
              {children}
            </div>
            <div className="mt-6 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <span>
                {mode === "login" ? tCard.noAccount : tCard.hasAccount}
              </span>
              <a
                href="#"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {mode === "login" ? tCard.signUp : tCard.signIn}
              </a>
            </div>
            <p className="sr-only">{tAuth.orContinueWith}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
