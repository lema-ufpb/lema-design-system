"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type CardIconTone =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "violet"
  | "sky"
  | "neutral"

export type CardIconMediaStyle = "soft" | "solid" | "outline"
export type CardIconSize = "sm" | "md" | "lg"
export type CardIconAlign = "center" | "start"

// ── Variants ──

// Tone → media style. The icon colour and its background both come from
// semantic tokens — never raw Tailwind values. `soft` tints the token at 10%,
// `solid` fills it and flips to the foreground token, `outline` rings it.
export const CARD_ICON_TONES: Record<
  CardIconTone,
  Record<CardIconMediaStyle, string>
> = {
  primary: {
    soft: "bg-primary/10 text-primary",
    solid: "bg-primary text-primary-foreground",
    outline: "border border-primary/30 text-primary",
  },
  success: {
    soft: "bg-success/10 text-success",
    solid: "bg-success text-success-foreground",
    outline: "border border-success/30 text-success",
  },
  warning: {
    soft: "bg-warning/10 text-warning",
    solid: "bg-warning text-warning-foreground",
    outline: "border border-warning/30 text-warning",
  },
  destructive: {
    soft: "bg-destructive/10 text-destructive",
    solid: "bg-destructive text-white",
    outline: "border border-destructive/30 text-destructive",
  },
  violet: {
    soft: "bg-highlight-violet/10 text-highlight-violet",
    solid: "bg-highlight-violet text-highlight-violet-foreground",
    outline: "border border-highlight-violet/30 text-highlight-violet",
  },
  sky: {
    soft: "bg-highlight-sky/10 text-highlight-sky",
    solid: "bg-highlight-sky text-highlight-sky-foreground",
    outline: "border border-highlight-sky/30 text-highlight-sky",
  },
  neutral: {
    soft: "bg-muted text-muted-foreground",
    solid: "bg-foreground text-background",
    outline: "border border-border text-muted-foreground",
  },
}

// Tone → standalone text colour (used by the action row).
export const CARD_ICON_TEXT: Record<CardIconTone, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  violet: "text-highlight-violet",
  sky: "text-highlight-sky",
  neutral: "text-muted-foreground",
}

export const cardIconRootVariants = cva(
  "relative flex flex-col has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 data-[interactive=true]:transition-all data-[interactive=true]:duration-200 data-[interactive=true]:hover:-translate-y-0.5 data-[interactive=true]:hover:shadow-lg",
  {
    variants: {
      align: {
        center: "items-center text-center",
        start: "items-start text-left",
      },
    },
    defaultVariants: { align: "center" },
  }
)

export const cardIconMediaVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      size: {
        sm: "size-12",
        md: "size-14",
        lg: "size-16",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const cardIconGlyphVariants = cva("", {
  variants: {
    size: {
      sm: "size-5",
      md: "size-6",
      lg: "size-7",
    },
  },
  defaultVariants: { size: "md" },
})

export const cardIconTitleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    upper: {
      true: "tracking-wide uppercase",
      false: "",
    },
  },
  defaultVariants: { size: "md", upper: false },
})

export const cardIconDescriptionVariants = cva(
  "leading-relaxed text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const cardIconActionVariants = cva(
  "inline-flex items-center gap-1 font-medium",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Helpers ──

const SKELETON_MEDIA: Record<CardIconSize, string> = {
  sm: "size-12",
  md: "size-14",
  lg: "size-16",
}

const SKELETON_TITLE: Record<CardIconSize, string> = {
  sm: "h-4 w-28",
  md: "h-5 w-36",
  lg: "h-6 w-44",
}

// ── Component ──

export interface CardIconProps extends VariantProps<
  typeof cardIconRootVariants
> {
  /** Icon component (e.g. a lucide icon). Rendered inside the media circle. */
  icon: React.ElementType
  title: string
  description?: string
  /** Semantic colour applied to both the icon and its background. */
  tone?: CardIconTone
  /** How the media circle is painted from the tone token. */
  mediaStyle?: CardIconMediaStyle
  size?: CardIconSize
  /** Uppercase + tracked title, matching the dashboard hero style. */
  titleUpper?: boolean
  /** Optional badge shown above the title. */
  badge?: string
  /** Renders the whole card as a link with a hover lift. */
  href?: string
  rel?: string
  target?: string
  /** Optional call-to-action row shown at the bottom (interactive cards). */
  actionLabel?: string
  className?: string
  loading?: boolean
}

export function CardIcon({
  icon: Icon,
  title,
  description,
  tone = "primary",
  mediaStyle = "soft",
  size = "md",
  align = "center",
  titleUpper = false,
  badge,
  href,
  rel,
  target,
  actionLabel,
  className,
  loading,
}: CardIconProps) {
  const interactive = Boolean(href)
  const toneText = CARD_ICON_TONES[tone][mediaStyle]

  if (loading) {
    return (
      <Card
        className={cn(cardIconRootVariants({ align }), className)}
        data-slot="card-icon"
      >
        <CardContent
          className={cn(
            "flex flex-col gap-3",
            align === "center" ? "items-center" : "items-start"
          )}
        >
          <Skeleton className={cn(SKELETON_MEDIA[size], "rounded-full")} />
          <Skeleton className={cn(SKELETON_TITLE[size], "rounded-md")} />
          <div
            className={cn(
              "flex flex-col gap-1.5",
              align === "center" && "items-center"
            )}
          >
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(cardIconRootVariants({ align }), className)}
      data-slot="card-icon"
      data-interactive={interactive}
    >
      <CardContent
        className={cn(
          "flex flex-1 flex-col gap-4",
          align === "center" ? "items-center" : "items-start"
        )}
      >
        <div
          className={cn(cardIconMediaVariants({ size }), toneText)}
          aria-hidden="true"
        >
          <Icon className={cardIconGlyphVariants({ size })} />
        </div>

        <div
          className={cn(
            "flex flex-col gap-2",
            align === "center" && "items-center"
          )}
        >
          {badge && (
            <Badge variant="secondary" className="font-medium">
              {badge}
            </Badge>
          )}
          <h3 className={cardIconTitleVariants({ size, upper: titleUpper })}>
            {title}
          </h3>
          {description && (
            <p className={cardIconDescriptionVariants({ size })}>
              {description}
            </p>
          )}
        </div>

        {actionLabel && (
          <span
            className={cn(
              cardIconActionVariants({ size }),
              CARD_ICON_TEXT[tone]
            )}
          >
            {actionLabel}
            <ArrowRightIcon
              className="size-4 shrink-0 transition-transform group-hover/card:translate-x-0.5"
              aria-hidden
            />
          </span>
        )}
      </CardContent>

      {href && (
        <a
          href={href}
          rel={rel}
          target={target}
          aria-label={title}
          className="absolute inset-0 rounded-4xl outline-none"
        />
      )}
    </Card>
  )
}
