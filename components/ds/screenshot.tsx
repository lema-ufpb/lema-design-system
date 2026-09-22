"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface ScreenshotProps
  extends
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">,
    VariantProps<typeof screenshotVariants> {
  src: string
  srcDark?: string
  alt: string
  width?: number
  height?: number
  loadingState?: boolean
  priority?: boolean
}

// ── Variants ──

export const screenshotVariants = cva(
  "relative block w-full overflow-hidden bg-muted object-cover transition-opacity",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      aspect: {
        auto: "",
        video: "aspect-video",
        square: "aspect-square",
        "4/3": "aspect-[4/3]",
      },
    },
    defaultVariants: {
      rounded: "xl",
      shadow: "lg",
      aspect: "auto",
    },
  }
)

// ── Component ──

export function Screenshot({
  src,
  srcDark,
  alt,
  width = 1200,
  height = 800,
  rounded = "xl",
  shadow = "lg",
  aspect = "auto",
  loadingState = false,
  priority = false,
  className,
  ...props
}: ScreenshotProps) {
  const [loaded, setLoaded] = React.useState(priority)

  if (loadingState) {
    return (
      <Skeleton
        data-slot="screenshot-skeleton"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label="Loading screenshot"
        className={cn(
          screenshotVariants({ rounded, shadow, aspect }),
          className
        )}
        style={{ width: "100%", aspectRatio: `${width}/${height}` }}
      />
    )
  }

  // theme-aware: render light + dark, CSS toggles via .dark
  if (srcDark) {
    return (
      <div
        data-slot="screenshot"
        className={cn("relative w-full", className)}
        style={{
          aspectRatio: aspect === "auto" ? `${width}/${height}` : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            screenshotVariants({ rounded, shadow, aspect }),
            "dark:hidden",
            !loaded && "opacity-0",
            loaded && "opacity-100"
          )}
          {...props}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={srcDark}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            screenshotVariants({ rounded, shadow, aspect }),
            "hidden dark:block",
            !loaded && "opacity-0",
            loaded && "opacity-100"
          )}
          aria-hidden={alt ? undefined : true}
        />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      data-slot="screenshot"
      className={cn(
        screenshotVariants({ rounded, shadow, aspect }),
        !loaded && "opacity-0",
        loaded && "opacity-100",
        className
      )}
      {...props}
    />
  )
}
