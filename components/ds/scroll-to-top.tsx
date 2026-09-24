"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface ScrollToTopProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof scrollToTopVariants> {
  threshold?: number
  showProgress?: boolean
  locale?: UILocale
  loading?: boolean
  variant?: "outline" | "fill"
}

export type ScrollToTopPosition = NonNullable<
  VariantProps<typeof scrollToTopVariants>["position"]
>

export type ScrollToTopVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>

// ── Variants ──

const scrollToTopVariants = cva(
  "fixed z-50 transition-all duration-400 ease-out motion-safe:transition-all motion-safe:duration-400 motion-safe:ease-out",
  {
    variants: {
      position: {
        "bottom-right":
          "right-4 bottom-4 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8",
        "bottom-left":
          "bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8",
        "top-right": "top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8",
        "top-left": "top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8",
      },
    },
    defaultVariants: { position: "bottom-right" },
  }
)

const buttonVariants = cva(
  [
    "relative flex items-center justify-center rounded-full",
    "transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        outline: "bg-secondary text-secondary-foreground shadow-lg",
        fill: "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
      },
    },
    defaultVariants: { variant: "outline" },
  }
)

// ── Helpers – scroll state hook ──

function useScrollState(threshold: number) {
  const [state, setState] = React.useState({ progress: 0, visible: false })

  React.useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      requestAnimationFrame(() => {
        const scrollY = globalThis.scrollY
        const maxScroll = Math.max(
          document.documentElement.scrollHeight -
            document.documentElement.clientHeight,
          0
        )
        const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
        setState({ progress, visible: scrollY > threshold })
        ticking = false
      })
      ticking = true
    }

    globalThis.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => globalThis.removeEventListener("scroll", onScroll)
  }, [threshold])

  return state
}

// ── Helpers – progress ring SVG ──

function ProgressRing({
  progress,
  size,
  variant = "outline",
}: {
  progress: number
  size: number
  variant?: ScrollToTopVariant
}) {
  const strokeWidth = 2.5
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <svg
      className="absolute inset-0 -rotate-90"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      fill="none"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={cn(
          "transition-[stroke-dashoffset] duration-150 ease-linear motion-reduce:transition-none",
          variant === "outline" ? "text-primary" : "text-primary-foreground/70"
        )}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}

// ── Helpers – size map ──

const sizeMap = {
  sm: { container: "size-9", icon: "size-3.5", ring: 36 },
  md: { container: "size-11", icon: "size-4", ring: 44 },
  lg: { container: "size-12", icon: "size-5", ring: 48 },
} as const

// ── Component ──

export const ScrollToTop = React.forwardRef<HTMLDivElement, ScrollToTopProps>(
  (
    {
      threshold = 400,
      showProgress = true,
      locale: localeProp,
      loading = false,
      variant = "outline",
      position = "bottom-right",
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const { progress, visible } = useScrollState(threshold)
    const i18n = UI_I18N[locale].scrollToTop

    const mounted = React.useSyncExternalStore(
      React.useCallback((cb: () => void) => {
        cb()
        return () => {}
      }, []),
      () => true,
      () => false
    )

    const handleClick = () => {
      globalThis.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!mounted) return null

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(scrollToTopVariants({ position }), className)}
          {...props}
        >
          <Skeleton className="size-11 rounded-full" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="complementary"
        aria-label={i18n.label}
        className={cn(
          scrollToTopVariants({ position }),
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
          className
        )}
        {...props}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleClick}
                aria-label={i18n.tooltip}
                className={cn(
                  buttonVariants({ variant }),
                  sizeMap.md.container
                )}
              >
                {showProgress && (
                  <ProgressRing
                    progress={progress}
                    size={sizeMap.md.ring}
                    variant={variant}
                  />
                )}
                <ArrowUp
                  className={cn("relative", sizeMap.md.icon)}
                  aria-hidden="true"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{i18n.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
)

ScrollToTop.displayName = "ScrollToTop"
