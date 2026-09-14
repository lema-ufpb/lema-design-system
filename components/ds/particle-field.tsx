"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface ParticleFieldProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof particleFieldVariants> {}

// ── Variants ──

export const particleFieldVariants = cva(
  "pointer-events-none absolute inset-0 overflow-hidden",
  {
    variants: {
      tone: {
        primary: "[--pf-color:var(--primary)]",
        violet: "[--pf-color:var(--highlight-violet)]",
        sky: "[--pf-color:var(--highlight-sky)]",
        neutral: "[--pf-color:var(--foreground)]",
      },
      density: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { tone: "primary", density: "md" },
  }
)

const DENSITY_CONFIG = {
  sm: { maxParticles: 40, linkDistance: 90 },
  md: { maxParticles: 70, linkDistance: 110 },
  lg: { maxParticles: 110, linkDistance: 130 },
} as const

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  o: number
}

// ── Component ──

/**
 * Fundo de constelação (partículas conectadas por linhas) para hero
 * sections. Roda em canvas 2D com DPR limitado a 2x, pausa via
 * `IntersectionObserver` quando sai da viewport e via `visibilitychange`
 * quando a aba perde foco, e vira um frame estático (sem RAF) sob
 * `prefers-reduced-motion`.
 */
export const ParticleField = React.forwardRef<
  HTMLDivElement,
  ParticleFieldProps
>(({ className, tone = "primary", density = "md", ...props }, ref) => {
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
    const { maxParticles, linkDistance } = DENSITY_CONFIG[density ?? "md"]
    const color =
      getComputedStyle(container).getPropertyValue("--pf-color").trim() ||
      "currentColor"

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0
    let running = false

    const seed = () => {
      const count = Math.min(
        maxParticles,
        Math.max(12, Math.floor((width * height) / 9000))
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.8,
        o: Math.random() * 0.5 + 0.2,
      }))
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
      seed()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      for (const p of particles) {
        ctx.globalAlpha = p.o
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = color
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDistance) {
            ctx.globalAlpha = (1 - dist / linkDistance) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = color
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0

        ctx.globalAlpha = p.o
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      frameId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      frameId = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frameId) cancelAnimationFrame(frameId)
    }

    resize()
    if (reduceMotion) drawStatic()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduceMotion) drawStatic()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(container)

    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [density, tone])

  return (
    <div
      ref={setRefs}
      aria-hidden="true"
      data-slot="particle-field"
      className={cn(particleFieldVariants({ tone, density }), className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  )
})
ParticleField.displayName = "ParticleField"
