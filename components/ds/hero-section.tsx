import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface HeroSectionProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroSectionVariants> {}

export type HeroHeaderProps = React.HTMLAttributes<HTMLDivElement>

export interface HeroTitleProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heroTitleVariants> {
  as?: "h1" | "h2"
}

export interface HeroDescriptionProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof heroDescriptionVariants> {}

export interface HeroActionsProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroActionsVariants> {}

export type HeroMediaProps = React.HTMLAttributes<HTMLDivElement>

// ── Variants ──

export const heroSectionVariants = cva(
  "relative w-full overflow-hidden transition-all",
  {
    variants: {
      align: {
        center: "text-center",
        left: "text-left",
        split: "text-left",
      },
      spacing: {
        compact: "py-8 sm:py-12",
        default: "py-12 sm:py-20",
        spacious: "py-16 sm:py-28",
      },
      container: {
        default: "max-w-6xl",
        narrow: "max-w-4xl",
        wide: "max-w-7xl",
        full: "max-w-full px-4 sm:px-8",
      },
    },
    defaultVariants: {
      align: "center",
      spacing: "default",
      container: "default",
    },
  }
)

export const heroTitleVariants = cva(
  "font-bold tracking-tight text-foreground",
  {
    variants: {
      size: {
        default: "text-3xl sm:text-4xl lg:text-5xl",
        large: "text-4xl sm:text-5xl lg:text-6xl",
        display: "text-5xl sm:text-6xl lg:text-7xl",
      },
      gradient: {
        true: "text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      gradient: false,
    },
  }
)

export const heroDescriptionVariants = cva(
  "leading-relaxed text-muted-foreground",
  {
    variants: {
      size: {
        default: "max-w-2xl text-base sm:text-lg",
        large: "max-w-3xl text-lg sm:text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export const heroActionsVariants = cva(
  "flex flex-wrap items-center gap-3 pt-2",
  {
    variants: {
      align: {
        center: "justify-center",
        left: "justify-start",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
)

// ── Components ──

export const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      align = "center",
      spacing = "default",
      container = "default",
      children,
      ...props
    },
    ref
  ) => {
    const isSplit = align === "split"

    return (
      <section
        ref={ref}
        className={cn(
          heroSectionVariants({ align, spacing, container: "full" }),
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex flex-col gap-6 px-4 sm:px-6 lg:px-8",
            align === "center" && "items-center",
            align === "left" && "items-start",
            isSplit && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-12",
            container === "default" && "max-w-6xl",
            container === "narrow" && "max-w-4xl",
            container === "wide" && "max-w-7xl",
            container === "full" && "max-w-full"
          )}
        >
          {children}
        </div>
      </section>
    )
  }
)
HeroSection.displayName = "HeroSection"

export const HeroHeader = React.forwardRef<HTMLDivElement, HeroHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
)
HeroHeader.displayName = "HeroHeader"

export const HeroTitle = React.forwardRef<HTMLHeadingElement, HeroTitleProps>(
  (
    {
      className,
      as = "h1",
      size = "default",
      gradient = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = as
    return (
      <Comp
        ref={ref}
        className={cn(heroTitleVariants({ size, gradient }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
HeroTitle.displayName = "HeroTitle"

export const HeroDescription = React.forwardRef<
  HTMLParagraphElement,
  HeroDescriptionProps
>(({ className, size = "default", children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(heroDescriptionVariants({ size }), className)}
    {...props}
  >
    {children}
  </p>
))
HeroDescription.displayName = "HeroDescription"

export const HeroActions = React.forwardRef<HTMLDivElement, HeroActionsProps>(
  ({ className, align = "center", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(heroActionsVariants({ align }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
HeroActions.displayName = "HeroActions"

export const HeroMedia = React.forwardRef<HTMLDivElement, HeroMediaProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative w-full pt-4", className)} {...props}>
      {children}
    </div>
  )
)
HeroMedia.displayName = "HeroMedia"
