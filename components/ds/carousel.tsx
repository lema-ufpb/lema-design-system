"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import type { UseEmblaCarouselType } from "embla-carousel-react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

// ── Types ──

export type CarouselApi = UseEmblaCarouselType[1]

export type CarouselVariant = "default" | "cards" | "showcase" | "minimal"
export type CarouselNavPosition = "side" | "overlay" | "bottom" | "none"
export type CarouselNavVariant = "outline" | "ghost" | "primary" | "secondary"
export type CarouselNavSize = "icon-sm" | "icon" | "icon-lg"
export type CarouselDotPosition = "bottom" | "overlay"
export type CarouselDotVariant = "filled" | "outline"

export interface CarouselSlidesPerView {
  sm?: number
  md?: number
  lg?: number
}

export interface CarouselProps extends VariantProps<typeof carouselVariants> {
  variant?: CarouselVariant
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  slidesPerView?: number | CarouselSlidesPerView
  autoplayInterval?: number
  pauseOnHover?: boolean
  showDots?: boolean
  showProgress?: boolean
  loading?: boolean
  loadingSlideCount?: number
  locale?: UILocale
  navVariant?: CarouselNavVariant
  navSize?: CarouselNavSize
  navPosition?: CarouselNavPosition
  dotVariant?: CarouselDotVariant
  dotPosition?: CarouselDotPosition
  loop?: boolean
  align?: "start" | "center" | "end"
  skipSnaps?: boolean
  className?: string
  children?: React.ReactNode
}

// ── Variants ──

export const carouselVariants = cva("", {
  variants: {
    variant: {
      default: "",
      cards:
        "[&_[data-slot=carousel-item]>*]:rounded-xl [&_[data-slot=carousel-item]>*]:border [&_[data-slot=carousel-item]>*]:border-border [&_[data-slot=carousel-item]>*]:bg-card [&_[data-slot=carousel-item]>*]:shadow-sm",
      showcase: "[&_[data-slot=carousel-content]]:overflow-visible",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// ── Helpers ──

function resolveSlidesPerView(
  slidesPerView: number | CarouselSlidesPerView | undefined
): string {
  if (!slidesPerView) return ""
  if (typeof slidesPerView === "number") {
    if (slidesPerView === 1) return ""
    if (slidesPerView === 2) return "md:basis-1/2"
    if (slidesPerView === 3) return "md:basis-1/3"
    if (slidesPerView === 4) return "md:basis-1/4"
    if (slidesPerView === 5) return "md:basis-1/5"
    if (slidesPerView === 6) return "md:basis-1/6"
    return ""
  }
  const parts: string[] = []
  if (slidesPerView.sm) parts.push(`basis-1/${slidesPerView.sm}`)
  if (slidesPerView.md) parts.push(`md:basis-1/${slidesPerView.md}`)
  if (slidesPerView.lg) parts.push(`lg:basis-1/${slidesPerView.lg}`)
  return parts.join(" ")
}

function navOverrides(navVariant: CarouselNavVariant): {
  variant: "outline" | "ghost" | "default"
  className: string
} {
  const base =
    "absolute z-10 touch-manipulation rounded-full transition-all duration-200"
  switch (navVariant) {
    case "primary":
      return {
        variant: "default",
        className: cn(
          base,
          "bg-primary text-primary-foreground hover:bg-primary/90"
        ),
      }
    case "secondary":
      return {
        variant: "default",
        className: cn(
          base,
          "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        ),
      }
    case "ghost":
      return { variant: "ghost", className: base }
    default:
      return { variant: "outline", className: base }
  }
}

function navPositionClasses(
  pos: CarouselNavPosition,
  orientation: "horizontal" | "vertical"
) {
  if (pos === "overlay") {
    return orientation === "horizontal"
      ? "left-3 opacity-0 group-hover/carousel:opacity-100 group-focus-within/carousel:opacity-100 focus-visible:opacity-100"
      : "top-3 rotate-90 opacity-0 group-hover/carousel:opacity-100 group-focus-within/carousel:opacity-100 focus-visible:opacity-100"
  }
  if (pos === "bottom") {
    return orientation === "horizontal"
      ? "static mx-1"
      : "static mx-1 rotate-90"
  }
  return ""
}

function navPositionNextClasses(
  pos: CarouselNavPosition,
  orientation: "horizontal" | "vertical"
) {
  if (pos === "overlay") {
    return orientation === "horizontal"
      ? "right-3 opacity-0 group-hover/carousel:opacity-100 group-focus-within/carousel:opacity-100 focus-visible:opacity-100"
      : "bottom-3 rotate-90 opacity-0 group-hover/carousel:opacity-100 group-focus-within/carousel:opacity-100 focus-visible:opacity-100"
  }
  if (pos === "bottom") {
    return orientation === "horizontal"
      ? "static mx-1"
      : "static mx-1 rotate-90"
  }
  return ""
}

// ── CarouselProgress ──

function CarouselProgress({
  orientation,
}: {
  orientation: "horizontal" | "vertical"
}) {
  const { api } = useCarousel()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const handler = () => setProgress(api.scrollProgress())
    api.on("scroll", handler)
    api.on("select", handler)
    api.on("init", handler)
    return () => {
      api.off("scroll", handler)
      api.off("select", handler)
      api.off("init", handler)
    }
  }, [api])

  return (
    <div
      data-slot="ds-carousel-progress"
      className={cn(
        "absolute z-10 rounded-full bg-muted",
        orientation === "horizontal"
          ? "inset-x-0 top-0 h-1"
          : "inset-y-0 left-0 w-1"
      )}
    >
      <div
        className={cn(
          "rounded-full bg-primary transition-all duration-300",
          orientation === "horizontal" ? "h-full" : "w-full"
        )}
        style={
          orientation === "horizontal"
            ? { width: `${Math.abs(progress) * 100}%` }
            : { height: `${Math.abs(progress) * 100}%` }
        }
      />
    </div>
  )
}

// ── CarouselDots ──

function CarouselDots({
  dotVariant,
  dotPosition,
  locale,
}: {
  dotVariant: CarouselDotVariant
  dotPosition: CarouselDotPosition
  locale: UILocale
}) {
  const { api, orientation } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const i18n = UI_I18N[locale]

  React.useEffect(() => {
    if (!api) return
    const handler = () => {
      setSelectedIndex(api.selectedScrollSnap())
      setScrollSnaps(api.scrollSnapList())
    }
    api.on("init", handler)
    api.on("select", handler)
    api.on("reInit", handler)
    handler()
    return () => {
      api.off("init", handler)
      api.off("select", handler)
      api.off("reInit", handler)
    }
  }, [api])

  if (scrollSnaps.length <= 1) return null

  return (
    <div
      data-slot="ds-carousel-dots"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        dotPosition === "bottom" && "mt-4",
        dotPosition === "overlay" && "absolute inset-x-0 bottom-3",
        orientation === "vertical" && "flex-col"
      )}
      role="tablist"
      aria-label={i18n.carousel.goToSlide}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === selectedIndex}
          aria-label={`${i18n.carousel.goToSlide} ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "relative -m-3 flex size-2.5 items-center justify-center rounded-full p-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:-m-2 sm:p-2",
            dotVariant === "filled" &&
              (index === selectedIndex
                ? "bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"),
            dotVariant === "outline" &&
              (index === selectedIndex
                ? "border-2 border-primary bg-primary/10"
                : "border-2 border-muted-foreground/30 bg-transparent hover:border-muted-foreground/50")
          )}
        >
          <span
            className={cn(
              "size-2.5 rounded-full",
              index === selectedIndex ? "bg-primary" : "bg-transparent"
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}

// ── Component ──

export function Carousel({
  variant = "default",
  orientation = "horizontal",
  setApi,
  slidesPerView,
  autoplayInterval,
  pauseOnHover = true,
  showDots = true,
  showProgress = false,
  loading = false,
  loadingSlideCount = 4,
  locale: localeProp,
  navVariant: navVariantProp = "outline",
  navSize = "icon-sm",
  navPosition: navPositionProp,
  dotVariant = "filled",
  dotPosition = "bottom",
  loop = false,
  align = "start",
  skipSnaps = false,
  className,
  children,
}: CarouselProps) {
  const locale = useUILocale(localeProp)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [internalApi, setInternalApi] = React.useState<CarouselApi | undefined>(
    undefined
  )

  const handleSetApi = React.useCallback(
    (api: CarouselApi) => {
      setInternalApi(api)
      setApi?.(api)
    },
    [setApi]
  )

  const autoplayPlugin = React.useMemo(() => {
    if (!autoplayInterval || autoplayInterval <= 0) return null
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return null
    return Autoplay({
      delay: autoplayInterval,
      stopOnInteraction: true,
      stopOnMouseEnter: pauseOnHover,
    })
  }, [autoplayInterval, pauseOnHover])

  const plugins = React.useMemo(
    () => (autoplayPlugin ? [autoplayPlugin] : undefined),
    [autoplayPlugin]
  )

  // Pause autoplay when not in viewport — respects prefers-reduced-motion
  // and avoids background work when carousel is off-screen.
  React.useEffect(() => {
    if (!internalApi || !autoplayPlugin || !containerRef.current) return
    const node = containerRef.current
    const autoplay = (
      internalApi.plugins() as unknown as {
        autoplay?: { play: () => void; stop: () => void }
      }
    )?.autoplay
    if (!autoplay) return
    if (typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          if (
            typeof window !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            autoplay.play()
          }
        } else {
          autoplay.stop()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [internalApi, autoplayPlugin])

  const resolvedNavPosition: CarouselNavPosition =
    navPositionProp ??
    (variant === "minimal"
      ? "none"
      : variant === "showcase"
        ? "overlay"
        : "side")

  const navWrap = navOverrides(navVariantProp)
  const i18n = UI_I18N[locale]
  const spv = resolveSlidesPerView(slidesPerView)

  if (loading) {
    return (
      <div
        data-slot="ds-carousel"
        className={cn("relative", carouselVariants({ variant }), className)}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col"
            )}
          >
            {Array.from({ length: loadingSlideCount }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "min-w-0 shrink-0 grow-0 basis-full pl-4",
                  spv,
                  orientation === "vertical" && "basis-auto pt-4 pl-0"
                )}
              >
                <Skeleton
                  className={cn(
                    "h-48 w-full rounded-xl",
                    variant === "cards" && "h-64",
                    variant === "showcase" && "h-96"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} data-slot="ds-carousel-viewport-sentinel">
      <CarouselRoot
        data-slot="ds-carousel"
        className={cn(
          "group/carousel relative",
          carouselVariants({ variant }),
          className
        )}
        opts={{ loop, align, skipSnaps }}
        plugins={plugins}
        orientation={orientation}
        setApi={handleSetApi}
      >
        {showProgress && <CarouselProgress orientation={orientation} />}

        <CarouselContent>
          {React.Children.map(children, (child) => (
            <CarouselItem
              className={cn(spv, orientation === "vertical" && "basis-auto")}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        {resolvedNavPosition !== "none" && (
          <>
            <CarouselPrevious
              data-slot="ds-carousel-prev"
              variant={navWrap.variant}
              size={navSize}
              aria-label={i18n.carousel.previous}
              disabled={!loop ? undefined : undefined}
              className={cn(
                navWrap.className,
                navPositionClasses(resolvedNavPosition, orientation)
              )}
            >
              <ChevronLeftIcon />
            </CarouselPrevious>
            <CarouselNext
              data-slot="ds-carousel-next"
              variant={navWrap.variant}
              size={navSize}
              aria-label={i18n.carousel.next}
              className={cn(
                navWrap.className,
                navPositionNextClasses(resolvedNavPosition, orientation)
              )}
            >
              <ChevronRightIcon />
            </CarouselNext>
          </>
        )}

        {showDots && (
          <CarouselDots
            dotVariant={dotVariant}
            dotPosition={dotPosition}
            locale={locale}
          />
        )}
      </CarouselRoot>
    </div>
  )
}
