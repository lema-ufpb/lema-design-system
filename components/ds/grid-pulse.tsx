"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface GridPulseProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridPulseVariants> {}

// ── Variants ──

export const gridPulseVariants = cva("absolute inset-0 overflow-hidden", {
  variants: {
    tone: {
      primary: "[--gp-color:var(--primary)]",
      violet: "[--gp-color:var(--highlight-violet)]",
      sky: "[--gp-color:var(--highlight-sky)]",
      neutral: "[--gp-color:var(--foreground)]",
    },
    radius: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: { tone: "primary", radius: "md" },
})

const RADIUS_CONFIG = {
  sm: { spacing: 14, influence: 70, maxScale: 2.2 },
  md: { spacing: 20, influence: 100, maxScale: 2.6 },
  lg: { spacing: 28, influence: 140, maxScale: 3 },
} as const

interface Dot {
  x: number
  y: number
}

// ── Component ──

/**
 * Grid de pontos que pulsa de tamanho e opacidade perto do cursor. Fica
 * ocioso (sem RAF) enquanto o ponteiro não está sobre o container, então
 * o custo de CPU fora da interação é praticamente zero. Sob
 * `prefers-reduced-motion`, desenha apenas o grid estático e não escuta
 * eventos de ponteiro.
 */
export const GridPulse = React.forwardRef<HTMLDivElement, GridPulseProps>(
  ({ className, tone = "primary", radius = "md", ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref)
          (ref as React.RefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    React.useEffect(() => {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      const ctx = canvas.getContext("2d", { alpha: true })
      if (!ctx) return

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      const { spacing, influence, maxScale } = RADIUS_CONFIG[radius ?? "md"]
      const color =
        getComputedStyle(container).getPropertyValue("--gp-color").trim() ||
        "currentColor"

      let dots: Dot[] = []
      let width = 0
      let height = 0
      let dpr = 1
      let frameId = 0
      let running = false
      let visible = true
      const pointer = { x: -Infinity, y: -Infinity, active: false }

      const buildGrid = () => {
        dots = []
        for (let x = spacing / 2; x < width; x += spacing) {
          for (let y = spacing / 2; y < height; y += spacing) {
            dots.push({ x, y })
          }
        }
      }

      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        width = container.clientWidth
        height = container.clientHeight
        canvas.width = Math.max(1, Math.floor(width * dpr))
        canvas.height = Math.max(1, Math.floor(height * dpr))
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        buildGrid()
      }

      const draw = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = color
        for (const dot of dots) {
          let scale = 1
          let opacity = 0.25
          if (pointer.active) {
            const dx = dot.x - pointer.x
            const dy = dot.y - pointer.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < influence) {
              const t = 1 - dist / influence
              scale = 1 + t * (maxScale - 1)
              opacity = 0.25 + t * 0.55
            }
          }
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 1.4 * scale, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      const tick = () => {
        if (!running) return
        draw()
        frameId = requestAnimationFrame(tick)
      }

      const start = () => {
        if (running) return
        running = true
        frameId = requestAnimationFrame(tick)
      }

      const stop = () => {
        running = false
        if (frameId) cancelAnimationFrame(frameId)
      }

      const handlePointerMove = (event: PointerEvent) => {
        if (!visible) return
        const rect = container.getBoundingClientRect()
        pointer.x = event.clientX - rect.left
        pointer.y = event.clientY - rect.top
        pointer.active = true
        start()
      }

      const handlePointerLeave = () => {
        pointer.active = false
        stop()
        draw()
      }

      resize()
      draw()

      if (!reduceMotion) {
        container.addEventListener("pointermove", handlePointerMove)
        container.addEventListener("pointerleave", handlePointerLeave)
      }

      const resizeObserver = new ResizeObserver(() => {
        resize()
        draw()
      })
      resizeObserver.observe(container)

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (!visible) {
            pointer.active = false
            stop()
          }
        },
        { threshold: 0 }
      )
      intersectionObserver.observe(container)

      return () => {
        stop()
        container.removeEventListener("pointermove", handlePointerMove)
        container.removeEventListener("pointerleave", handlePointerLeave)
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
      }
    }, [radius, tone])

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-slot="grid-pulse"
        className={cn(gridPulseVariants({ tone, radius }), className)}
        {...props}
      >
        <canvas ref={canvasRef} className="block size-full" />
      </div>
    )
  }
)
GridPulse.displayName = "GridPulse"
