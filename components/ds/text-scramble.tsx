"use client"

import React, { useEffect, useState, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// ── Types ──

export interface TextScrambleProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto a ser animado e revelado */
  children: string
  /** Caracteres usados para o embaralhamento */
  characters?: string
  /** Velocidade (ms) entre os frames */
  speed?: number
  /** Trigger to (re)start the animation. Fires when the value changes. */
  trigger?: boolean
  /** Usar o elemento filho sem criar wrapper adicional */
  asChild?: boolean
}

// ── Component ──

const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?"

export const TextScramble = React.forwardRef<
  HTMLSpanElement,
  TextScrambleProps
>(
  (
    {
      children,
      characters = DEFAULT_CHARACTERS,
      speed = 50,
      trigger = true,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "span"
    const [displayText, setDisplayText] = useState<string>(children)
    const iterationRef = useRef(0)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // Detecta prefers-reduced-motion
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    useEffect(() => {
      if (prefersReducedMotion) {
        setDisplayText(children)
        return
      }

      iterationRef.current = 0

      // eslint-disable-next-line prefer-const
      let interval: ReturnType<typeof setInterval>

      const tick = () => {
        setDisplayText(() => {
          const newText = children
            .split("")
            .map((letter, index) => {
              if (index < iterationRef.current) {
                return children[index]
              }
              // Ignore spaces
              if (letter === " ") return " "

              const randomChar =
                characters[Math.floor(Math.random() * characters.length)]
              return randomChar
            })
            .join("")

          if (iterationRef.current >= children.length) {
            clearInterval(interval)
          }

          iterationRef.current += 1 / 3 // How fast it advances each tick
          return newText
        })
      }

      interval = setInterval(tick, speed)

      return () => clearInterval(interval)
    }, [children, speed, characters, trigger, prefersReducedMotion])

    return (
      <Component ref={ref} className={cn("inline-block", className)} {...props}>
        <span className="sr-only">{children}</span>
        <span aria-hidden="true" className={cn("inline-block", className)}>
          {displayText}
        </span>
      </Component>
    )
  }
)

TextScramble.displayName = "TextScramble"
