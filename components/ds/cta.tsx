"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface CtaAction {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

export interface CtaProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaVariants> {
  badge?: string
  title: string
  description?: string
  primaryAction?: CtaAction
  secondaryAction?: CtaAction
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const ctaVariants = cva(
  "relative overflow-hidden rounded-3xl border p-8 md:p-12",
  {
    variants: {
      tone: {
        default: "border-border bg-card text-card-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        muted: "border-border bg-muted/40 text-foreground",
        glow: "border-primary/20 bg-card text-card-foreground shadow-xl shadow-primary/5",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
      },
      size: {
        sm: "p-6 md:p-8",
        md: "p-8 md:p-12",
        lg: "p-12 md:p-16",
      },
    },
    defaultVariants: { tone: "default", align: "center", size: "md" },
  }
)

export const ctaTitleVariants = cva("font-bold tracking-tight text-balance", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl lg:text-5xl",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function Cta({
  className,
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "default",
  align = "center",
  size = "md",
  loading = false,
  ...props
}: CtaProps) {
  if (loading) {
    return (
      <div
        data-slot="cta-skeleton"
        className={cn(
          ctaVariants({ tone, align, size }),
          "flex flex-col gap-4",
          className
        )}
        {...props}
      >
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="cta"
      className={cn(
        ctaVariants({ tone, align, size }),
        "flex flex-col gap-6",
        align === "center" ? "items-center" : "items-start",
        className
      )}
      {...props}
    >
      {tone === "glow" && (
        <>
          <div
            className="pointer-events-none absolute -top-16 -right-16 size-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 size-72 rounded-full bg-highlight-violet/10 blur-3xl"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={cn(
          "relative z-10 flex max-w-2xl flex-col gap-3",
          align === "center" ? "items-center" : "items-start"
        )}
      >
        {badge && (
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-xs font-medium"
          >
            {badge}
          </Badge>
        )}
        <h2
          className={cn(
            ctaTitleVariants({ size }),
            align === "center" ? "text-center" : "text-left"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "max-w-prose leading-relaxed text-pretty",
              tone === "primary"
                ? "text-primary-foreground/80"
                : "text-muted-foreground",
              size === "sm" ? "text-sm" : "text-sm md:text-base"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div
          className={cn(
            "relative z-10 flex flex-wrap items-center gap-3",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          {primaryAction &&
            (primaryAction.href ? (
              <Button
                asChild
                size="lg"
                variant={tone === "primary" ? "secondary" : "default"}
                className="gap-2 rounded-full font-semibold"
              >
                <a href={primaryAction.href} onClick={primaryAction.onClick}>
                  <span>{primaryAction.label}</span>
                  {primaryAction.icon ?? (
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                  )}
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                variant={tone === "primary" ? "secondary" : "default"}
                className="gap-2 rounded-full font-semibold"
                onClick={primaryAction.onClick}
              >
                <span>{primaryAction.label}</span>
                {primaryAction.icon ?? (
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                )}
              </Button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <Button
                asChild
                size="lg"
                variant={tone === "primary" ? "ghost" : "outline"}
                className="rounded-full font-medium"
              >
                <a
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                variant={tone === "primary" ? "ghost" : "outline"}
                className="rounded-full font-medium"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  )
}
