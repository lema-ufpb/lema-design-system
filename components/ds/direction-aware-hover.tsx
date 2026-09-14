"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface DirectionAwareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da imagem de fundo */
  imageSrc: string
  /** Texto alternativo da imagem */
  imageAlt?: string
  /** Classes extras para a imagem */
  imageClassName?: string
  /** Conteúdo do overlay animado */
  children: React.ReactNode
}

// ── Component ──

export const DirectionAwareHover = React.forwardRef<
  HTMLDivElement,
  DirectionAwareHoverProps
>(
  (
    {
      imageSrc,
      imageAlt = "",
      imageClassName,
      children,
      className,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const [direction, setDirection] = useState<
      "top" | "bottom" | "left" | "right" | ""
    >("")
    const [isHovered, setIsHovered] = useState(false)

    // Calcula de qual lado o mouse entrou/saiu
    const getDirection = (
      ev: React.MouseEvent<HTMLDivElement>,
      obj: HTMLElement
    ) => {
      const { width: w, height: h, left, top } = obj.getBoundingClientRect()
      // Normaliza as coordenadas
      const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1)
      const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1)
      // Calcula o ângulo
      const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
      return d
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current) return
      const dir = getDirection(e, internalRef.current)
      switch (dir) {
        case 0:
          setDirection("top")
          break
        case 1:
          setDirection("right")
          break
        case 2:
          setDirection("bottom")
          break
        case 3:
          setDirection("left")
          break
      }
      setIsHovered(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current) return
      setIsHovered(false)
      // Mantemos a direção para que a animação de saída ocorra no mesmo eixo,
      // mas voltamos o overlay para fora.
      onMouseLeave?.(e)
    }

    // Define a classe inicial (fora do container) baseada na direção
    const getInitialTranslate = () => {
      if (isHovered) return "translate-x-0 translate-y-0"
      switch (direction) {
        case "top":
          return "-translate-y-full translate-x-0"
        case "bottom":
          return "translate-y-full translate-x-0"
        case "left":
          return "-translate-x-full translate-y-0"
        case "right":
          return "translate-x-full translate-y-0"
        default:
          return "opacity-0"
      }
    }

    return (
      <div
        ref={(node: HTMLDivElement) => {
          internalRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn(
          "group relative overflow-hidden rounded-lg bg-transparent",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100",
              imageClassName
            )}
          />
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col bg-background/80 text-foreground backdrop-blur-sm transition-all duration-300 ease-out focus-within:translate-x-0 focus-within:translate-y-0 focus-within:opacity-100",
              getInitialTranslate()
            )}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)

DirectionAwareHover.displayName = "DirectionAwareHover"
