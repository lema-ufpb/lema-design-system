"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface AboutSplitStoryAction {
  label: string
  href?: string
  onClick?: () => void
}

export interface AboutSplitStoryProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof aboutSplitStoryVariants> {
  title: string
  description: string
  badge?: string
  imageSrc: string
  imageAlt: string
  floatingBadgeText?: string
  primaryAction?: AboutSplitStoryAction
  secondaryAction?: AboutSplitStoryAction
  reverse?: boolean
  locale?: UILocale
}

// ── Variants ──

export const aboutSplitStoryVariants = cva(
  "relative w-full py-16 transition-all md:py-24",
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function AboutSplitStory({
  title,
  description,
  badge,
  imageSrc,
  imageAlt,
  floatingBadgeText,
  primaryAction,
  secondaryAction,
  reverse = false,
  locale = "pt-BR",
  variant,
  className,
  ...props
}: AboutSplitStoryProps) {
  const t = UI_I18N[locale]?.about ?? UI_I18N["pt-BR"].about

  return (
    <section
      className={cn(aboutSplitStoryVariants({ variant }), className)}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Coluna de Narrativa */}
          <div className="flex flex-col items-start gap-6">
            {badge && (
              <Badge variant="outline" className="text-xs font-semibold">
                {badge}
              </Badge>
            )}

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {primaryAction && (
                  <Button
                    onClick={primaryAction.onClick}
                    asChild={Boolean(primaryAction.href)}
                  >
                    {primaryAction.href ? (
                      <a
                        href={primaryAction.href}
                        className="flex items-center gap-2"
                      >
                        {primaryAction.label}
                        <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <span className="flex items-center gap-2">
                        {primaryAction.label}
                        <ArrowRight className="size-4" />
                      </span>
                    )}
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    variant="outline"
                    onClick={secondaryAction.onClick}
                    asChild={Boolean(secondaryAction.href)}
                  >
                    {secondaryAction.href ? (
                      <a href={secondaryAction.href}>{secondaryAction.label}</a>
                    ) : (
                      <span>{secondaryAction.label}</span>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Coluna de Mídia / Imagem */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover"
              />
            </div>

            {floatingBadgeText && (
              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-md md:-bottom-8 md:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-success/15 text-success">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">
                      {floatingBadgeText}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t.ourJourney}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
