"use client"

import * as React from "react"
import { DSLink } from "@/components/ds/link-provider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderBrandProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof headerBrandVariants> {
  href?: string
  title: string
  subtitle?: string
  logo?: React.ReactNode
  logoSrc?: string
  logoAlt?: string
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerBrandVariants = cva(
  "inline-flex items-center gap-2 font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const headerBrandLogoVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground",
  {
    variants: {
      size: {
        sm: "size-7 text-xs [&_svg]:size-3.5",
        md: "size-8 text-sm [&_svg]:size-4",
        lg: "size-9 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const skeletonDims = {
  sm: { logo: "size-7", title: "h-3 w-20", subtitle: "h-2 w-16" },
  md: { logo: "size-8", title: "h-4 w-24", subtitle: "h-3 w-20" },
  lg: { logo: "size-9", title: "h-5 w-32", subtitle: "h-3 w-24" },
}

// ── Component ──────────────────────────────────────────────────────────────

export const HeaderBrand = React.forwardRef<
  HTMLAnchorElement,
  HeaderBrandProps
>(
  (
    {
      className,
      href = "/",
      title,
      subtitle,
      logo,
      logoSrc,
      logoAlt,
      size = "md",
      loading = false,
      ...props
    },
    ref
  ) => {
    if (loading) {
      const dims = skeletonDims[size ?? "md"]
      return (
        <div
          data-slot="header-brand-skeleton"
          className="flex items-center gap-2"
        >
          <Skeleton className={cn("rounded-md", dims.logo)} />
          <div className="flex flex-col gap-1">
            <Skeleton className={dims.title} />
            {subtitle !== undefined && <Skeleton className={dims.subtitle} />}
          </div>
        </div>
      )
    }

    const content = (
      <>
        {(logo || logoSrc) && (
          <span
            data-slot="header-brand-logo"
            className={cn(headerBrandLogoVariants({ size }), "shrink-0")}
            aria-hidden="true"
          >
            {logo ? (
              logo
            ) : logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                alt={logoAlt ?? title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            ) : null}
          </span>
        )}
        <span className="flex flex-col items-start gap-0 leading-none">
          <span
            className={cn(
              "truncate font-semibold text-foreground",
              size === "sm" && "text-sm",
              size === "md" && "text-sm",
              size === "lg" && "text-base"
            )}
          >
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-xs font-normal text-muted-foreground">
              {subtitle}
            </span>
          )}
        </span>
      </>
    )

    // External link
    if (href.startsWith("http")) {
      return (
        <a
          ref={ref}
          href={href}
          data-slot="header-brand"
          aria-label={title}
          className={cn(headerBrandVariants({ size }), className)}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <DSLink
        ref={ref}
        href={href}
        data-slot="header-brand"
        aria-label={title}
        className={cn(headerBrandVariants({ size }), className)}
        {...props}
      >
        {content}
      </DSLink>
    )
  }
)
HeaderBrand.displayName = "HeaderBrand"
