"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface StarShowerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof starShowerVariants> {
  twinkle?: boolean
  shootingStars?: boolean
  interactive?: boolean
}

// ── Variants ──

export const starShowerVariants = cva(
  "pointer-events-none absolute inset-0 overflow-hidden",
  {
    variants: {
      tone: {
        primary: "[--star-color:var(--primary)]",
        violet: "[--star-color:var(--highlight-violet)]",
        sky: "[--star-color:var(--highlight-sky)]",
        warm: "[--star-color:var(--warning)]",
        cool: "[--star-color:var(--highlight-sky)]",
        neutral: "[--star-color:var(--foreground)]",
      },
      density: {
        sm: "",
        md: "",
        lg: "",
      },
      speed: {
        slow: "[--star-speed:0.55]",
        normal: "",
        fast: "[--star-speed:1.65]",
      },
    },
    defaultVariants: { tone: "primary", density: "md", speed: "normal" },
  }
)

const DENSITY_COUNT = { sm: 45, md: 90, lg: 140 } as const

interface Star {
  x: number
  y: number
  r: number
  baseOpacity: number
  phase: number
  twinkleSpeed: number
  twinklePhase: number
  cross: boolean
  depth: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  opacity: number
  life: number
}

// ── Component ──

/**
 * Chuva de estrelas pulsantes — canvas 2D com estrelas que respiram,
 * twinkle and occasionally streak across the sky like shooting stars.
 * 100% decorativo (`aria-hidden`), pausa fora da viewport / aba inativa
 * and becomes a static frame under `prefers-reduced-motion`.
 *
 * Surprise: 18% of stars are "cross" (4 points) with glow, and the mode
 * `interactive` aplica parallax sutil no mousemove com profundidade por raio.
 */
export const StarShower = React.forwardRef<HTMLDivElement, StarShowerProps>(
  (
    {
      className,
      tone = "primary",
      density = "md",
      speed = "normal",
      twinkle = true,
      shootingStars = true,
      interactive = false,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const mouseRef = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 })

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
      const isDarkBg =
        container.closest(".bg-zinc-950, .bg-slate-950, .bg-black") !== null

      // Cor via CSS variable --star-color computada
      const rawColor =
        getComputedStyle(container).getPropertyValue("--star-color").trim() ||
        "currentColor"

      // If the background is dark and the computed color is too dark (primary in light), lighten to white
      const starColor = (() => {
        if (!isDarkBg) return rawColor
        // rawColor pode ser oklch(0.205 0 0) — escuro; troca para branco em hero dark
        if (rawColor.includes("0.205") || rawColor.includes("0.145"))
          return "oklch(0.985 0 0)"
        return rawColor
      })()

      const speedMul = speed === "slow" ? 0.55 : speed === "fast" ? 1.65 : 1
      const count = DENSITY_COUNT[density ?? "md"]
      const shootingInterval =
        density === "lg" ? 2200 : density === "sm" ? 5200 : 3600

      let stars: Star[] = []
      let shooting: ShootingStar | null = null
      let nextShootingAt = performance.now() + 1200 + Math.random() * 2000
      let width = 0
      let height = 0
      let dpr = 1
      let frameId = 0
      let running = false

      const seedStars = () => {
        stars = Array.from({ length: count }, () => {
          const r = Math.random() * 1.4 + 0.6
          const isCross = Math.random() < 0.18
          const crossR = isCross ? r * 1.9 : r
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: crossR,
            baseOpacity: isCross
              ? 0.55 + Math.random() * 0.35
              : 0.35 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.8 + Math.random() * 1.8,
            twinklePhase: Math.random() * Math.PI * 2,
            cross: isCross,
            depth: 0.4 + (crossR / 2.8) * 0.6 + Math.random() * 0.2,
          }
        })
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
        seedStars()
      }

      const spawnShooting = () => {
        const fromTop = Math.random() < 0.7
        const sx = fromTop
          ? Math.random() * width * 0.85 + width * 0.1
          : width + 20
        const sy = fromTop ? -20 : Math.random() * height * 0.4
        const angle = fromTop
          ? Math.PI / 3.5 + (Math.random() - 0.5) * 0.4
          : Math.PI * 0.82
        const spd = 7 + Math.random() * 5
        shooting = {
          x: sx,
          y: sy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          len: 90 + Math.random() * 80,
          opacity: 1,
          life: 0,
        }
      }

      const drawStar = (s: Star, t: number, mx: number, my: number) => {
        const pulse = Math.sin(t * 0.0012 * speedMul + s.phase) * 0.5 + 0.5
        const flicker = twinkle
          ? Math.sin(t * 0.0025 * s.twinkleSpeed + s.twinklePhase) * 0.15 + 0.85
          : 1
        const opacity = s.baseOpacity * (0.55 + pulse * 0.45) * flicker

        // Parallax
        const px = s.x + mx * s.depth * 6
        const py = s.y + my * s.depth * 6

        ctx.globalAlpha = opacity
        ctx.fillStyle = starColor

        if (s.cross) {
          // 4-point cross + central dot + glow
          const r = s.r
          ctx.shadowBlur = 10
          ctx.shadowColor = starColor
          ctx.beginPath()
          ctx.arc(px, py, r * 0.55, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
          // cross arms
          ctx.beginPath()
          ctx.moveTo(px - r * 1.8, py)
          ctx.lineTo(px + r * 1.8, py)
          ctx.moveTo(px, py - r * 1.8)
          ctx.lineTo(px, py + r * 1.8)
          ctx.lineWidth = 0.7
          ctx.strokeStyle = starColor
          ctx.globalAlpha = opacity * 0.55
          ctx.stroke()
          ctx.globalAlpha = opacity
        } else {
          // soft glow dot
          ctx.shadowBlur = s.r * 3.5
          ctx.shadowColor = starColor
          ctx.beginPath()
          ctx.arc(px, py, s.r * 0.9, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
          // core bright
          ctx.globalAlpha = opacity * 1.1
          ctx.beginPath()
          ctx.arc(px, py, s.r * 0.35, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const drawStatic = () => {
        ctx.clearRect(0, 0, width, height)
        // subtle vignette
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.2,
          0,
          width * 0.5,
          height * 0.2,
          Math.max(width, height) * 0.9
        )
        grad.addColorStop(0, "transparent")
        grad.addColorStop(1, "rgba(0,0,0,0.18)")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        for (const s of stars) drawStar(s, 0, 0, 0)
      }

      const tick = (now: number) => {
        if (!running) return
        ctx.clearRect(0, 0, width, height)

        // vignette
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.15,
          0,
          width * 0.5,
          height * 0.15,
          Math.max(width, height) * 0.95
        )
        grad.addColorStop(0, "transparent")
        grad.addColorStop(1, "rgba(0,0,0,0.22)")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        // lerp mouse
        const m = mouseRef.current
        m.x += (m.tx - m.x) * 0.04
        m.y += (m.ty - m.y) * 0.04

        for (const s of stars) drawStar(s, now, m.x, m.y)

        // shooting star
        if (shootingStars) {
          if (!shooting && now > nextShootingAt) spawnShooting()
          if (shooting) {
            shooting.x += shooting.vx
            shooting.y += shooting.vy
            shooting.life += 16
            // fade after 60% of travel
            const traveled = shooting.life
            if (traveled > 900) shooting.opacity -= 0.04
            if (
              shooting.opacity <= 0 ||
              shooting.x < -180 ||
              shooting.y > height + 180
            ) {
              shooting = null
              nextShootingAt = now + shootingInterval + Math.random() * 1800
            } else {
              const tailX = shooting.x - (shooting.vx / 8) * (shooting.len / 10)
              const tailY = shooting.y - (shooting.vy / 8) * (shooting.len / 10)
              const g = ctx.createLinearGradient(
                tailX,
                tailY,
                shooting.x,
                shooting.y
              )
              g.addColorStop(0, "transparent")
              g.addColorStop(0.5, starColor)
              g.addColorStop(1, "#fff")
              ctx.strokeStyle = g
              ctx.lineWidth = 1.6
              ctx.lineCap = "round"
              ctx.shadowBlur = 8
              ctx.shadowColor = starColor
              ctx.globalAlpha = Math.max(0, shooting.opacity * 0.95)
              ctx.beginPath()
              ctx.moveTo(tailX, tailY)
              ctx.lineTo(shooting.x, shooting.y)
              ctx.stroke()
              ctx.shadowBlur = 0
              // head
              ctx.fillStyle = "#fff"
              ctx.globalAlpha = shooting.opacity
              ctx.beginPath()
              ctx.arc(shooting.x, shooting.y, 1.8, 0, Math.PI * 2)
              ctx.fill()
            }
          }
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

      const handleMouse = (e: MouseEvent) => {
        if (!interactive) return
        const rect = container.getBoundingClientRect()
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        mouseRef.current.tx = nx
        mouseRef.current.ty = ny
      }
      const handleLeave = () => {
        mouseRef.current.tx = 0
        mouseRef.current.ty = 0
      }
      if (interactive) {
        container.addEventListener("mousemove", handleMouse)
        container.addEventListener("mouseleave", handleLeave)
      }

      return () => {
        stop()
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
        document.removeEventListener("visibilitychange", handleVisibility)
        if (interactive) {
          container.removeEventListener("mousemove", handleMouse)
          container.removeEventListener("mouseleave", handleLeave)
        }
      }
    }, [density, tone, speed, twinkle, shootingStars, interactive])

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-slot="star-shower"
        className={cn(starShowerVariants({ tone, density, speed }), className)}
        {...props}
      >
        <canvas ref={canvasRef} className="block size-full" />
      </div>
    )
  }
)
StarShower.displayName = "StarShower"
