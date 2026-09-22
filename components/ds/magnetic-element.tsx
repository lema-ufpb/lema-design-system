"use client"

import React, { useRef, useState, useEffect } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface MagneticElementProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof magneticElementVariants> {
  asChild?: boolean
  /** Magnetic effect strength. Higher values pull more. Default: 20 */
  strengthValue?: number
}

// ── Variants ──

export const magneticElementVariants = cva(
  "inline-block transition-transform duration-300 ease-out hover:will-change-transform motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      strength: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      strength: "md",
    },
  }
)

// ── Component ──

export const MagneticElement = React.forwardRef<
  HTMLDivElement,
  MagneticElementProps
>(
  (
    {
      className,
      strength,
      strengthValue = 20,
      asChild = false,
      children,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "div"
    const internalRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return

      const node = internalRef.current
      if (!node) return
      node.style.willChange = "transform"

      const { clientX, clientY } = e
      const { width, height, left, top } = node.getBoundingClientRect()

      const centerX = left + width / 2
      const centerY = top + height / 2

      // Distance from center multiplied by strength
      const x = ((clientX - centerX) / width) * strengthValue
      const y = ((clientY - centerY) / height) * strengthValue

      setPosition({ x, y })

      onMouseMove?.(e)
    }

    const reset = (e: React.MouseEvent<HTMLDivElement>) => {
      if (internalRef.current) internalRef.current.style.willChange = "auto"
      setPosition({ x: 0, y: 0 })
      onMouseLeave?.(e)
    }

    return (
      <Component
        ref={(node: HTMLDivElement) => {
          internalRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(magneticElementVariants({ strength, className }))}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{
          transform: prefersReducedMotion
            ? undefined
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

MagneticElement.displayName = "MagneticElement"
