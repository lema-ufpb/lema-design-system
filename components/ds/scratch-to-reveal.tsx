"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface ScratchToRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo escondido a ser revelado */
  children: React.ReactNode
  /** Largura do container (px) */
  width?: number
  /** Altura do container (px) */
  height?: number
  /** Tamanho do pincel para raspar */
  brushSize?: number
  /** Porcentagem raspada (0-100) para auto-revelar e disparar o callback */
  revealThreshold?: number
  /** Função chamada quando o limite for alcançado */
  onReveal?: () => void
  /** Cor hexadecimal ou rgba que cobre o canvas */
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
      coverColor = "#94a3b8", // Cor de raspadinha padrão (slate-400)
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

    // Detectar prefers-reduced-motion
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      if (mediaQuery.matches) {
        setIsRevealed(true)
        onReveal?.()
      }
    }, [onReveal])

    // Desenhar a camada inicial no canvas
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

      // Define a operação para "apagar" o que for desenhado a partir de agora
      ctx.globalCompositeOperation = "destination-out"
    }, [width, height, coverColor, prefersReducedMotion])

    // Função auxiliar para calcular qual % da imagem foi "apagada"
    const calculateScratchedPercentage = React.useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return 0
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) return 0

      const pixels = ctx.getImageData(0, 0, width, height).data
      let transparentPixels = 0
      const totalPixels = width * height

      // O array tem 4 valores (rgba) para cada pixel. Olhamos o alpha (index + 3)
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
        checkReveal() // Checa se já raspou o suficiente
      }

      const handleMove = (e: Event) => {
        if (isScratching) {
          e.preventDefault() // Impede o scroll de página ao raspar no mobile
          scratch(e as MouseEvent | TouchEvent)
        }
      }

      // Suporte para mouse
      canvas.addEventListener("mousedown", startScratch)
      canvas.addEventListener("mousemove", handleMove, { passive: false })
      window.addEventListener("mouseup", endScratch)

      // Suporte para touch
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
        {/* Camada do fundo (Secreta) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          {children}
        </div>

        {/* Camada Canvas (Raspadinha) */}
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

        {/* Botão de fallback para teclado e leitores de tela */}
        {!isRevealed && (
          <button
            onClick={handleReveal}
            className="sr-only focus:not-sr-only focus:absolute focus:inset-0 focus:z-20 focus:flex focus:items-center focus:justify-center focus:bg-background/90 focus:text-sm focus:font-medium"
          >
            Revelar conteúdo secreto
          </button>
        )}
      </div>
    )
  }
)

ScratchToReveal.displayName = "ScratchToReveal"
