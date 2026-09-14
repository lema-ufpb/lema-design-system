"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface TypewriterProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof typewriterVariants> {
  words: string[]
  speed?: number
  deleteSpeed?: number
  delayBetween?: number
  loop?: boolean
  cursor?: boolean
  cursorChar?: string
}

// ── Variants ──

export const typewriterVariants = cva("inline-flex items-baseline", {
  variants: {
    variant: {
      typewriter: "font-mono",
      flip: "font-semibold tracking-tight",
      generate: "font-medium",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      display: "text-2xl sm:text-3xl",
    },
  },
  defaultVariants: {
    variant: "typewriter",
    size: "md",
  },
})

// ── Component ──

export function Typewriter({
  words,
  speed = 80,
  deleteSpeed = 40,
  delayBetween = 1200,
  loop = true,
  cursor = true,
  cursorChar = "|",
  variant = "typewriter",
  size = "md",
  className,
  ...props
}: TypewriterProps) {
  const [index, setIndex] = React.useState(0)
  const [sub, setSub] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  const currentWord = words[index] ?? ""

  React.useEffect(() => {
    if (reduceMotion) return
    if (variant === "flip") {
      const id = window.setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
      }, delayBetween)
      return () => window.clearTimeout(id)
    }

    if (variant === "generate") {
      // reveal word progressively without delete
      if (sub < currentWord.length) {
        const id = window.setTimeout(() => setSub((s) => s + 1), speed)
        return () => window.clearTimeout(id)
      }
      if (loop && sub === currentWord.length) {
        const id = window.setTimeout(() => {
          setIndex((i) => (i + 1) % words.length)
          setSub(0)
        }, delayBetween)
        return () => window.clearTimeout(id)
      }
      return
    }

    // typewriter with delete
    let timeout = speed
    if (!deleting && sub === currentWord.length) {
      if (!loop && index === words.length - 1) return
      timeout = delayBetween
    } else if (deleting && sub === 0) {
      timeout = 300
    } else if (deleting) {
      timeout = deleteSpeed
    }

    const id = window.setTimeout(() => {
      if (!deleting && sub === currentWord.length) {
        setDeleting(true)
        return
      }
      if (deleting && sub === 0) {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
        return
      }
      setSub((s) => s + (deleting ? -1 : 1))
    }, timeout)
    return () => window.clearTimeout(id)
  }, [
    sub,
    deleting,
    index,
    currentWord,
    speed,
    deleteSpeed,
    delayBetween,
    loop,
    variant,
    words.length,
    reduceMotion,
  ])

  if (reduceMotion) {
    return (
      <span
        data-slot="typewriter"
        className={cn(typewriterVariants({ variant, size }), className)}
        aria-live="polite"
        aria-label={words.join(", ")}
        {...props}
      >
        {currentWord}
      </span>
    )
  }

  const visible =
    variant === "flip"
      ? currentWord
      : variant === "generate"
        ? currentWord.slice(0, sub)
        : currentWord.slice(0, sub)

  return (
    <span
      data-slot="typewriter"
      data-variant={variant}
      className={cn(typewriterVariants({ variant, size }), className)}
      aria-live="polite"
      aria-label={words.join(", ")}
      {...props}
    >
      <span
        className={cn(variant === "flip" && "animate-in duration-300 fade-in")}
        key={variant === "flip" ? index : undefined}
      >
        {visible}
        {variant !== "flip" && visible.length < currentWord.length && (
          <span aria-hidden="true" className="opacity-0">
            {currentWord.slice(visible.length)}
          </span>
        )}
      </span>
      {cursor && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block font-normal text-primary motion-safe:animate-pulse"
        >
          {cursorChar}
        </span>
      )}
      <span className="sr-only">{currentWord}</span>
    </span>
  )
}
