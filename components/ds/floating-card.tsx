"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ── Types ──

export interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt rotation in degrees. */
  intensity?: number
}

// ── Component ──

/**
 * A card that tilts subtly in 3D toward the pointer — for showcasing a
 * product screenshot or UI mockup in a hero. Writes the transform directly
 * to the DOM node (no re-render per pointermove). Disabled entirely under
 * `prefers-reduced-motion`.
 */
export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ intensity = 8, className, style, children, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const reducedMotionRef = React.useRef(false)

    React.useEffect(() => {
      reducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    }, [])

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref)
          (ref as React.RefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (reducedMotionRef.current) return
        const node = innerRef.current
        if (!node) return
        node.style.willChange = "transform"
        const rect = node.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        node.style.transform = `perspective(1000px) rotateX(${(-py * intensity).toFixed(2)}deg) rotateY(${(px * intensity).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      },
      [intensity]
    )

    const handlePointerLeave = React.useCallback(() => {
      if (innerRef.current) {
        innerRef.current.style.willChange = "auto"
        innerRef.current.style.transform = ""
      }
    }, [])

    return (
      <div
        ref={setRefs}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          "rounded-2xl border border-border bg-card shadow-2xl transition-transform duration-300 ease-out hover:will-change-transform motion-reduce:transform-none motion-reduce:transition-none",
          className
        )}
        style={style}
        data-slot="floating-card"
        {...props}
      >
        {children}
      </div>
    )
  }
)
FloatingCard.displayName = "FloatingCard"
