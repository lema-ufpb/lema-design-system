"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ref para o container que terá scroll monitorado.
   * Se não fornecido, monitora o scroll da janela (window).
   */
  targetRef?: React.RefObject<HTMLElement | null>
  /** Cor da barra, por padrão usa a cor primária */
  progressColor?: string
  /** Altura da barra */
  height?: "sm" | "md" | "lg"
}

// ── Component ──

const heights = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

export const ReadingProgress = React.forwardRef<
  HTMLDivElement,
  ReadingProgressProps
>(
  (
    {
      className,
      targetRef,
      progressColor = "bg-primary",
      height = "sm",
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const updateScroll = () => {
        let currentScrollY = 0
        let scrollHeight = 0

        if (targetRef?.current) {
          currentScrollY = targetRef.current.scrollTop
          scrollHeight =
            targetRef.current.scrollHeight - targetRef.current.clientHeight
        } else if (typeof window !== "undefined") {
          currentScrollY = window.scrollY
          scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        }

        if (scrollHeight > 0) {
          setProgress(
            Number(((currentScrollY / scrollHeight) * 100).toFixed(2))
          )
        } else {
          setProgress(0)
        }
      }

      // Evita erro em SSR
      if (typeof window === "undefined") return

      const el = targetRef?.current || window
      el.addEventListener("scroll", updateScroll, { passive: true })
      window.addEventListener("resize", updateScroll, { passive: true })

      // Chamada inicial
      updateScroll()

      return () => {
        el.removeEventListener("scroll", updateScroll)
        window.removeEventListener("resize", updateScroll)
      }
    }, [targetRef])

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none z-50 w-full bg-transparent",
          !targetRef ? "fixed top-0 left-0" : "absolute top-0 left-0",
          heights[height],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-150 ease-out",
            progressColor
          )}
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso de leitura"
          role="progressbar"
        />
      </div>
    )
  }
)

ReadingProgress.displayName = "ReadingProgress"
