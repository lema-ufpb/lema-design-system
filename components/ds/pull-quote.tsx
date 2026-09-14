import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Quote } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type PullQuoteSize = "sm" | "md" | "lg"
export type PullQuoteAlign = "start" | "center"
export type PullQuoteTone = "plain" | "violet" | "sky"

export interface PullQuoteProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof pullQuoteRootVariants> {
  /** Quote body — accepts rich text (e.g. <strong> for emphasis). */
  quote: React.ReactNode
  name?: string
  role?: string
  avatarSrc?: string
  avatarFallback?: string
  size?: PullQuoteSize
  loading?: boolean
}

// ── Variants ──

export const pullQuoteRootVariants = cva("relative flex flex-col gap-6", {
  variants: {
    align: {
      start: "items-start text-left",
      center: "items-center text-center",
    },
    tone: {
      plain: "",
      violet: "rounded-3xl bg-highlight-violet/10 p-8",
      sky: "rounded-3xl bg-highlight-sky/10 p-8",
    },
  },
  defaultVariants: { align: "start", tone: "plain" },
})

export const pullQuoteGlyphVariants = cva("shrink-0 fill-current", {
  variants: {
    size: { sm: "size-6", md: "size-8", lg: "size-10" },
    tone: {
      plain: "text-muted-foreground/30",
      violet: "text-highlight-violet",
      sky: "text-highlight-sky",
    },
  },
  defaultVariants: { size: "md", tone: "plain" },
})

export const pullQuoteTextVariants = cva(
  "font-medium tracking-tight text-balance text-foreground",
  {
    variants: {
      size: {
        sm: "text-lg leading-snug",
        md: "text-2xl leading-snug",
        lg: "text-3xl leading-tight sm:text-4xl",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const pullQuoteCiteNameVariants = cva("font-medium text-foreground", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
})

export const pullQuoteCiteRoleVariants = cva("text-muted-foreground", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
})

// ── Helpers ──

const AVATAR_SIZE: Record<PullQuoteSize, "sm" | "default" | "lg"> = {
  sm: "sm",
  md: "default",
  lg: "lg",
}

const SKELETON_GLYPH: Record<PullQuoteSize, string> = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
}

// ── Component ──

export const PullQuote = React.forwardRef<HTMLElement, PullQuoteProps>(
  (
    {
      quote,
      name,
      role,
      avatarSrc,
      avatarFallback,
      size = "md",
      align = "start",
      tone = "plain",
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    const isCenter = align === "center"

    if (loading) {
      return (
        <div
          className={cn(pullQuoteRootVariants({ align, tone }), className)}
          data-slot="pull-quote-skeleton"
        >
          <Skeleton
            className={cn("rounded-md", SKELETON_GLYPH[size ?? "md"])}
          />
          <div
            className={cn(
              "flex w-full flex-col gap-2",
              isCenter && "items-center"
            )}
          >
            <Skeleton className="h-6 w-full max-w-xl rounded-md" />
            <Skeleton className="h-6 w-3/4 max-w-md rounded-md" />
          </div>
          <div
            className={cn(
              "flex items-center gap-3",
              isCenter && "flex-col gap-2"
            )}
          >
            <Skeleton className="size-10 rounded-full" />
            <div
              className={cn(
                "flex flex-col gap-1.5",
                isCenter && "items-center"
              )}
            >
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <figure
        ref={ref}
        className={cn(pullQuoteRootVariants({ align, tone }), className)}
        data-slot="pull-quote"
        {...props}
      >
        <Quote
          aria-hidden="true"
          className={cn(pullQuoteGlyphVariants({ size, tone }))}
        />
        <blockquote className={cn(pullQuoteTextVariants({ size }))}>
          {quote}
        </blockquote>
        {(name || role) && (
          <figcaption
            className={cn(
              "flex items-center gap-3",
              isCenter && "flex-col gap-2"
            )}
          >
            {(avatarSrc || avatarFallback) && (
              <Avatar size={AVATAR_SIZE[size ?? "md"]}>
                {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
                {avatarFallback && (
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                )}
              </Avatar>
            )}
            <div className={cn("flex flex-col", isCenter && "items-center")}>
              {name && (
                <span className={cn(pullQuoteCiteNameVariants({ size }))}>
                  {name}
                </span>
              )}
              {role && (
                <span className={cn(pullQuoteCiteRoleVariants({ size }))}>
                  {role}
                </span>
              )}
            </div>
          </figcaption>
        )}
      </figure>
    )
  }
)
PullQuote.displayName = "PullQuote"
