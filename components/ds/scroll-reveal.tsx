"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface ScrollRevealProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollRevealVariants> {
  /** Delay before the transition starts, in ms. */
  delay?: number
  /** Re-trigger every time the element re-enters the viewport. */
  once?: boolean
}

// ── Variants ──

export const scrollRevealVariants = cva(
  "opacity-0 transition-[opacity,translate] duration-700 ease-out data-[revealed=true]:opacity-100 motion-reduce:translate-none motion-reduce:opacity-100! motion-reduce:transition-none",
  {
    variants: {
      direction: {
        up: "translate-y-6 data-[revealed=true]:translate-y-0",
        down: "-translate-y-6 data-[revealed=true]:translate-y-0",
        left: "translate-x-6 data-[revealed=true]:translate-x-0",
        right: "-translate-x-6 data-[revealed=true]:translate-x-0",
        none: "",
      },
    },
    defaultVariants: { direction: "up" },
  }
)

// ── Component ──

/**
 * Fades/slides children in the first time they enter the viewport, via
 * IntersectionObserver. Renders fully visible up front under
 * `prefers-reduced-motion` — no observer needed for that path.
 */
export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      direction = "up",
      delay = 0,
      once = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const [revealed, setRevealed] = React.useState(false)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref)
          (ref as React.RefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    React.useEffect(() => {
      const node = innerRef.current
      if (!node) return

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRevealed(true)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setRevealed(false)
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(node)
      return () => observer.disconnect()
    }, [once])

    return (
      <div
        ref={setRefs}
        data-slot="scroll-reveal"
        data-revealed={revealed}
        className={cn(scrollRevealVariants({ direction }), className)}
        style={{
          transitionDelay: delay ? `${delay}ms` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollReveal.displayName = "ScrollReveal"
