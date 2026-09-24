"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Types ──────────────────────────────────────────────────────────────────

export type NavDotsContainerVariantProps = VariantProps<
  typeof navDotsContainerVariants
>
export type NavDotsDotVariantProps = VariantProps<typeof navDotsDotVariants>
export type NavDotsPosition = "left" | "right"
export type NavDotsOrientation = "vertical" | "horizontal"

/** A section entry for dot navigation. */
export interface NavDotsSection {
  /** Element ID used for scroll targeting */
  id: string
  /** Label shown in the tooltip */
  label: string
}

/**
 * NavDots — dot-based section navigation with scroll tracking and tooltips.
 *
 * Automatically detects which section is in view via `IntersectionObserver`
 * and highlights the corresponding dot. Clicking a dot smooth-scrolls to
 * that section. Supports vertical (side rail) and horizontal (bottom bar)
 * orientations.
 *
 * Uses the shadcn `Tooltip` primitive for accessible, animated labels.
 */
export interface NavDotsProps
  extends NavDotsContainerVariantProps, React.HTMLAttributes<HTMLDivElement> {
  /** Array of sections to navigate between */
  sections: NavDotsSection[]
  /** Initially active section index */
  active?: number
  /** Enable smooth scroll when clicking a dot */
  scrollOnClick?: boolean
  /**
   * Scroll container to observe. Defaults to `null` which means the
   * component will walk up the DOM to find the nearest scrollable ancestor.
   * Pass a ref or `"window"` to override.
   */
  scrollContainer?: React.RefObject<HTMLElement | null> | "window" | null
  /** IntersectionObserver rootMargin (default: "0px") */
  scrollMargin?: string
  /** Callback when the active section changes */
  onActiveChange?: (index: number) => void
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const navDotsContainerVariants = cva(
  ["fixed z-50 flex gap-2 transition-opacity duration-200 ease-in-out"],
  {
    variants: {
      position: {
        left: [],
        right: [],
      },
      orientation: {
        vertical: ["flex-col"],
        horizontal: ["flex-row"],
      },
      visible: {
        true: ["opacity-100"],
        false: ["pointer-events-none opacity-0"],
      },
    },
    compoundVariants: [
      // Vertical: pin to left/right edge, centered vertically
      {
        orientation: "vertical",
        position: "left",
        className: "top-1/2 left-4 -translate-y-1/2",
      },
      {
        orientation: "vertical",
        position: "right",
        className: "top-1/2 right-4 -translate-y-1/2",
      },
      // Horizontal: pin to top, centered horizontally
      {
        orientation: "horizontal",
        position: "left",
        className: "top-4 left-1/2 -translate-x-1/2",
      },
      {
        orientation: "horizontal",
        position: "right",
        className: "top-4 left-1/2 -translate-x-1/2",
      },
    ],
    defaultVariants: {
      position: "right",
      orientation: "vertical",
      visible: true,
    },
  }
)

export const navDotsDotVariants = cva(
  [
    "relative size-2 rounded-full",
    "transition-all duration-200 ease-in-out",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  ],
  {
    variants: {
      active: {
        true: ["bg-foreground", "scale-125"],
        false: ["bg-border", "hover:bg-foreground", "hover:scale-125"],
      },
      interactive: {
        true: ["cursor-pointer"],
        false: ["cursor-default"],
      },
    },
    defaultVariants: {
      active: false,
      interactive: true,
    },
  }
)

// ── Helpers ────────────────────────────────────────────────────────────────

/** Walk up the DOM tree to find the nearest scrollable ancestor. */
function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null
  let current = el.parentElement
  while (current) {
    const { overflow, overflowY } = getComputedStyle(current)
    if (/(auto|scroll)/.test(overflow + overflowY)) return current
    current = current.parentElement
  }
  return null
}

// ── Component ──────────────────────────────────────────────────────────────

export const NavDots = React.forwardRef<HTMLDivElement, NavDotsProps>(
  (
    {
      sections,
      active = 0,
      scrollOnClick = true,
      scrollContainer = null,
      scrollMargin = "0px",
      onActiveChange,
      orientation,
      position,
      locale: localeProp,
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [currentActive, setCurrentActive] = React.useState(active)
    const internalRef = React.useRef<HTMLDivElement>(null)

    // Resolve combined ref
    React.useImperativeHandle(ref, () => internalRef.current!)

    // Tooltip placement depends on orientation/position
    const tooltipSide = React.useMemo(() => {
      if (orientation === "horizontal") return "bottom" as const
      return position === "left" ? ("right" as const) : ("left" as const)
    }, [orientation, position])

    // ── Scroll-to on click ──────────────────────────────────────────────

    const scrollTo = React.useCallback(
      (id: string) => {
        if (!scrollOnClick) return
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      },
      [scrollOnClick]
    )

    // ── IntersectionObserver for scroll tracking ────────────────────────

    React.useEffect(() => {
      const elements = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[]

      if (elements.length === 0) return

      // Determine the observation root
      let root: HTMLElement | null = null
      if (scrollContainer === "window") {
        root = null // null = viewport
      } else if (scrollContainer && "current" in scrollContainer) {
        root = scrollContainer.current
      } else {
        root = findScrollParent(internalRef.current)
      }

      const ratios = new Map<string, number>()

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(entry.target.id, entry.intersectionRatio)
          }

          // Pick the section with the highest intersection ratio
          let bestIndex = 0
          let bestRatio = -1
          for (let i = 0; i < sections.length; i++) {
            const ratio = ratios.get(sections[i].id) ?? 0
            if (ratio > bestRatio) {
              bestRatio = ratio
              bestIndex = i
            }
          }

          setCurrentActive((prev) => {
            if (prev !== bestIndex) {
              onActiveChange?.(bestIndex)
              return bestIndex
            }
            return prev
          })
        },
        {
          root,
          rootMargin: scrollMargin,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      )

      for (const el of elements) observer.observe(el)
      return () => observer.disconnect()
    }, [sections, scrollContainer, scrollMargin, onActiveChange])

    return (
      <TooltipProvider>
        <div
          ref={internalRef}
          data-slot="nav-dots"
          role="navigation"
          aria-label={UI_I18N[locale].navDots.sectionNav}
          className={cn(
            navDotsContainerVariants({
              orientation,
              position,
              visible: true,
            }),
            className
          )}
          {...props}
        >
          {sections.map((s, i) => (
            <Tooltip key={s.id}>
              <TooltipTrigger asChild>
                <button
                  data-slot="nav-dots-dot"
                  type="button"
                  onClick={() => {
                    setCurrentActive(i)
                    scrollTo(s.id)
                  }}
                  aria-label={`${UI_I18N[locale].navDots.goTo}: ${s.label}`}
                  aria-current={i === currentActive ? "true" : undefined}
                  className={navDotsDotVariants({
                    active: i === currentActive,
                    interactive: scrollOnClick,
                  })}
                />
              </TooltipTrigger>
              <TooltipContent side={tooltipSide} sideOffset={8}>
                {s.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    )
  }
)

NavDots.displayName = "NavDots"

export default NavDots
