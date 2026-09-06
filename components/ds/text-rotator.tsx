"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface TextRotatorProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textRotatorVariants> {
  words: string[]
  interval?: number
  pauseOnHover?: boolean
}

// ── Variants ──

export const textRotatorVariants = cva(
  "relative inline-flex items-center overflow-hidden align-baseline font-semibold text-primary",
  {
    variants: {
      transition: {
        slide: "",
        fade: "",
      },
    },
    defaultVariants: {
      transition: "slide",
    },
  }
)

// ── Component ──

export const TextRotator = React.forwardRef<HTMLSpanElement, TextRotatorProps>(
  (
    {
      words,
      interval = 3000,
      transition = "slide",
      pauseOnHover = true,
      className,
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = React.useState(0)
    const [isPaused, setIsPaused] = React.useState(false)

    React.useEffect(() => {
      if (!words || words.length <= 1) return

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (mediaQuery.matches) return

      if (isPaused) return

      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length)
      }, interval)

      return () => clearInterval(timer)
    }, [words, interval, isPaused])

    if (!words || words.length === 0) return null

    const currentWord = words[index] || words[0]

    return (
      <span
        ref={ref}
        role="text"
        aria-live="polite"
        aria-atomic="true"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        className={cn(textRotatorVariants({ transition }), className)}
        {...props}
      >
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500 ease-out",
            transition === "slide" &&
              "animate-in duration-500 fade-in-0 slide-in-from-bottom-3",
            transition === "fade" && "animate-in duration-300 fade-in-0"
          )}
        >
          {currentWord}
        </span>
      </span>
    )
  }
)
TextRotator.displayName = "TextRotator"
