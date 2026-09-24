"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ManifestoStatement } from "@/components/ds/manifesto-statement"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface AboutManifestoHeroStat {
  label: string
  value: string
}

export interface AboutManifestoHeroAction {
  label: string
  href?: string
  onClick?: () => void
}

export interface AboutManifestoHeroProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof aboutManifestoHeroVariants> {
  statement: React.ReactNode
  eyebrow?: string
  author?: string
  stats?: AboutManifestoHeroStat[]
  primaryAction?: AboutManifestoHeroAction
  secondaryAction?: AboutManifestoHeroAction
  locale?: UILocale
}

// ── Variants ──

export const aboutManifestoHeroVariants = cva(
  "relative w-full overflow-hidden py-20 transition-all md:py-32",
  {
    variants: {
      variant: {
        default: "bg-background",
        subtle: "border-b border-border/50 bg-muted/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function AboutManifestoHero({
  statement,
  eyebrow,
  author,
  stats = [],
  primaryAction,
  secondaryAction,
  locale: localeProp,
  variant,
  className,
  ...props
}: AboutManifestoHeroProps) {
  const locale = useUILocale(localeProp)
  const t = UI_I18N[locale]?.about ?? UI_I18N["en-US"].about

  return (
    <section
      className={cn(aboutManifestoHeroVariants({ variant }), className)}
      {...props}
    >
      <div className="relative container mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-6">
        {/* Manifesto Statement */}
        <ManifestoStatement
          statement={statement}
          eyebrow={eyebrow ?? t.manifesto}
          author={author}
          align="center"
          size="lg"
          className="max-w-3xl"
        />

        {/* Indicators / Statistics */}
        {stats.length > 0 && (
          <div className="mt-16 grid w-full grid-cols-2 gap-8 border-t border-border/60 pt-10 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-foreground tabular-nums md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  )
}
