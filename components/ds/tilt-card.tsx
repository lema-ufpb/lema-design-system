"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface TiltCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tiltCardVariants> {
  glare?: boolean
  intensity?: number
  scaleOnHover?: boolean
  loading?: boolean
}

// ── Variants ──

export const tiltCardVariants = cva(
  "relative flex flex-col overflow-hidden transition-shadow duration-200 will-change-transform",
  {
    variants: {
      variant: {
        default: "border bg-card text-card-foreground shadow-sm",
        muted: "border-border/60 bg-muted/40 text-foreground",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "xl",
    },
  }
)

// ── Component ──

export function TiltCard({
  className,
  variant = "default",
  radius = "xl",
  glare = true,
  intensity = 12,
  scaleOnHover = true,
  loading = false,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const glareRef = React.useRef<HTMLDivElement>(null)
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e)
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateY = ((x - midX) / midX) * intensity
    const rotateX = ((midY - y) / midY) * intensity
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${scaleOnHover ? "scale3d(1.02,1.02,1.02)" : ""}`
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(var(--foreground) / 0.08), transparent 55%)`
      glareRef.current.style.opacity = "1"
    }
  }

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e)
    if (!ref.current) return
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    if (glareRef.current) glareRef.current.style.opacity = "0"
  }

  if (loading) {
    return (
      <div
        data-slot="tilt-card-skeleton"
        className={cn(tiltCardVariants({ variant, radius }), "p-6", className)}
        {...props}
      >
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <Skeleton className="mt-6 h-9 w-28 rounded-full" />
      </div>
    )
  }

  return (
    <Card
      ref={ref}
      data-slot="tilt-card"
      tabIndex={0}
      role="group"
      aria-label="Cartão com efeito 3D"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={() => {
        if (ref.current && !reduceMotion) {
          ref.current.style.transform =
            "perspective(900px) rotateX(2deg) rotateY(-2deg) scale3d(1.01,1.01,1.01)"
        }
      }}
      onBlur={handleLeave as unknown as React.FocusEventHandler<HTMLDivElement>}
      className={cn(
        tiltCardVariants({ variant, radius }),
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      )}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </Card>
  )
}
