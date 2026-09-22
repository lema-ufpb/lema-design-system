"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface ScratchToRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hidden content to be revealed */
  children: React.ReactNode
  /** Container width (px) */
  width?: number
  /** Container height (px) */
  height?: number
  /** Brush size for scratching */
  brushSize?: number
  /** Scratched percentage (0-100) to auto-reveal and trigger the callback */
  revealThreshold?: number
  /** Function called when the threshold is reached */
  onReveal?: () => void
  /** Hex or rgba color covering the canvas */
  coverColor?: string
}

// ── Component ──

export const ScratchToReveal = React.forwardRef<
  HTMLDivElement,
  ScratchToRevealProps
>(
  (
    {
      children,
      width = 300,
      height = 150,
      brushSize = 30,
      revealThreshold = 50,
      coverColor = "#94a3b8", // Default scratch color (slate-400)
      onReveal,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isRevealed, setIsRevealed] = useState(false)
    const [isScratching, setIsScratching] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // Detect prefers-reduced-motion
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      if (mediaQuery.matches) {
        setIsRevealed(true)
        onReveal?.()
      }
    }, [onReveal])

    // Draw the initial layer on the canvas
    useEffect(() => {
      if (prefersReducedMotion) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return

      canvas.width = width
      canvas.height = height

      ctx.fillStyle = coverColor
      ctx.fillRect(0, 0, width, height)

      // Set the operation to "erase" anything drawn from now on
      ctx.globalCompositeOperation = "destination-out"
    }, [width, height, coverColor, prefersReducedMotion])

    // Helper to calculate what % of the image has been "erased"
    const calculateScratchedPercentage = React.useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return 0
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return 0

      const pixels = ctx.getImageData(0, 0, width, height).data
      let transparentPixels = 0
      const totalPixels = width * height

      // The array has 4 values (rgba) per pixel. We look at the alpha channel (index + 3)
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) {
          transparentPixels++
        }
      }

      return (transparentPixels / totalPixels) * 100
    }, [width, height])

    const handleReveal = React.useCallback(() => {
      setIsRevealed(true)
      onReveal?.()
    }, [onReveal])

    const checkReveal = React.useCallback(() => {
      if (isRevealed) return
      const percentage = calculateScratchedPercentage()
      if (percentage > revealThreshold) {
        handleReveal()
      }
    }, [
      isRevealed,
      revealThreshold,
      handleReveal,
      calculateScratchedPercentage,
    ])

    const scratch = React.useCallback(
      (e: MouseEvent | TouchEvent) => {
        if (!isScratching || isRevealed) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

        const x = clientX - rect.left
        const y = clientY - rect.top

        ctx.beginPath()
        ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI)
        ctx.fill()
      },
      [isScratching, isRevealed, brushSize]
    )

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const startScratch = (e: Event) => {
        setIsScratching(true)
        scratch(e as MouseEvent | TouchEvent)
      }

      const endScratch = () => {
        setIsScratching(false)
        checkReveal() // Check if enough has been scratched
      }

      const handleMove = (e: Event) => {
        if (isScratching) {
          e.preventDefault() // Prevent page scroll while scratching on mobile
          scratch(e as MouseEvent | TouchEvent)
        }
      }

      // Mouse support
      canvas.addEventListener("mousedown", startScratch)
      canvas.addEventListener("mousemove", handleMove, { passive: false })
      window.addEventListener("mouseup", endScratch)

      // Touch support
      canvas.addEventListener("touchstart", startScratch, { passive: false })
      canvas.addEventListener("touchmove", handleMove, { passive: false })
      window.addEventListener("touchend", endScratch)

      return () => {
        canvas.removeEventListener("mousedown", startScratch)
        canvas.removeEventListener("mousemove", handleMove)
        window.removeEventListener("mouseup", endScratch)
        canvas.removeEventListener("touchstart", startScratch)
        canvas.removeEventListener("touchmove", handleMove)
        window.removeEventListener("touchend", endScratch)
      }
    }, [isScratching, isRevealed, brushSize, checkReveal, scratch])

    return (
      <div
        ref={ref}
        className={cn("relative select-none", className)}
        style={{ width, height }}
        {...props}
      >
        {/* Background layer (Secret) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          {children}
        </div>

        {/* Canvas layer (Scratch) */}
        {!prefersReducedMotion && (
          <canvas
            ref={canvasRef}
            className={cn(
              "absolute inset-0 z-10 touch-none transition-opacity duration-700",
              isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
            )}
            style={{ width, height }}
            aria-hidden="true"
          />
        )}

        {/* Fallback button for keyboard and screen readers */}
        {!isRevealed && (
          <button
            onClick={handleReveal}
            className="sr-only focus:not-sr-only focus:absolute focus:inset-0 focus:z-20 focus:flex focus:items-center focus:justify-center focus:bg-background/90 focus:text-sm focus:font-medium"
          >
            Reveal secret content
          </button>
        )}
      </div>
    )
  }
)

ScratchToReveal.displayName = "ScratchToReveal"
