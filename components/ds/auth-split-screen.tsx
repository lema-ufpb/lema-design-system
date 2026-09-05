import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { BackgroundGlow } from "./background-glow"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ── Types ──

export interface AuthTestimonial {
  quote: string
  author: string
  role: string
  avatarSrc?: string
}

export interface AuthStat {
  label: string
  value: string
}

export interface AuthSplitScreenProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authSplitScreenVariants> {
  logo?: React.ReactNode
  appName?: string
  testimonial?: AuthTestimonial
  stats?: AuthStat[]
  brandHeadline?: string
  brandDescription?: string
}

// ── Variants ──

export const authSplitScreenVariants = cva(
  "relative grid min-h-screen w-full lg:grid-cols-2",
  {
    variants: {
      reverse: {
        true: "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
        false: "",
      },
    },
    defaultVariants: {
      reverse: false,
    },
  }
)

// ── Component ──

export const AuthSplitScreen = React.forwardRef<
  HTMLDivElement,
  AuthSplitScreenProps
>(
  (
    {
      className,
      reverse = false,
      logo,
      appName = "LEMA-DS",
      testimonial,
      stats,
      brandHeadline = "Transformando pesquisa e inovação em impacto real",
      brandDescription = "O ecossistema oficial de sistemas e produtos digitais da Universidade Federal da Paraíba.",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(authSplitScreenVariants({ reverse }), className)}
        {...props}
      >
        {/* Column 1: Form Area */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Top Logo */}
          <div className="flex items-center gap-2.5">
            {logo || (
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-xs">
                L
              </div>
            )}
            <span className="text-base font-bold tracking-tight text-foreground">
              {appName}
            </span>
          </div>

          {/* Centered Form */}
          <div className="mx-auto flex w-full max-w-sm flex-col justify-center py-10">
            {children}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} UFPB · LEMA</span>
            <div className="flex gap-4">
              <a
                href="#"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Termos
              </a>
              <a
                href="#"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Ajuda
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Brand Showcase Panel (Hidden on mobile) */}
        <div className="relative hidden flex-col justify-between overflow-hidden border-l border-border/60 bg-muted/25 p-10 lg:flex xl:p-14">
          {/* Ambient Glow Background */}
          <BackgroundGlow variant="aurora" tone="primary" />

          {/* Brand Tagline */}
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Universidade Federal da Paraíba
            </span>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-foreground xl:text-4xl">
              {brandHeadline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {brandDescription}
            </p>
          </div>

          {/* Stats in middle if provided */}
          {stats && stats.length > 0 && (
            <div className="relative z-10 my-8 grid max-w-md grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-xl border border-border/60 bg-background/50 p-4 shadow-xs backdrop-blur-xs"
                >
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Testimonial */}
          {testimonial && (
            <div className="relative z-10 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-md">
              <p className="text-sm leading-relaxed text-foreground/90 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="size-10 border border-border/80">
                  {testimonial.avatarSrc && (
                    <AvatarImage
                      src={testimonial.avatarSrc}
                      alt={testimonial.author}
                    />
                  )}
                  <AvatarFallback className="text-xs font-semibold">
                    {testimonial.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs leading-tight font-semibold text-foreground">
                    {testimonial.author}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)
AuthSplitScreen.displayName = "AuthSplitScreen"
