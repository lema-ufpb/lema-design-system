"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface TracingBeamProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tracingBeamVariants> {
  beamColor?: string
}

// ── Variants ──

export const tracingBeamVariants = cva("relative mx-auto w-full max-w-3xl", {
  variants: {
    inset: {
      true: "px-6",
      false: "",
    },
  },
  defaultVariants: {
    inset: true,
  },
})

// ── Component ──

export function TracingBeam({
  className,
  inset = true,
  beamColor,
  children,
  ...props
}: TracingBeamProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const scrollY = window.scrollY
      const top = rect.top + scrollY
      const viewBottom = scrollY + window.innerHeight
      // progress 0..1 as container enters/exits viewport
      const total = rect.height + window.innerHeight
      const current = viewBottom - top
      const p = Math.min(1, Math.max(0, current / total))
      setProgress(p)
      setHeight(rect.height)
      // also adjust beam height via CSS var
      el.style.setProperty("--beam-progress", String(p))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-slot="tracing-beam"
      className={cn(tracingBeamVariants({ inset }), className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 flex h-full w-px justify-center"
        style={{ left: "16px" }}
      >
        {/* track */}
        <div className="h-full w-px bg-border/60" />
        {/* active beam */}
        <div
          className="absolute top-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent transition-[height] duration-150"
          style={{
            height: `${progress * 100}%`,
            maxHeight: height ? `${height}px` : "100%",
            backgroundColor: beamColor,
          }}
        />
        {/* thumb dot */}
        <div
          className="absolute size-2.5 -translate-x-1 rounded-full bg-primary shadow-sm ring-4 ring-background"
          style={{ top: `calc(${progress * 100}% - 5px)` }}
        />
      </div>
      <div className="flex flex-col gap-10 pl-10">{children}</div>
    </div>
  )
}

// ── Sub-component: item ──

export function TracingBeamItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tracing-beam-item"
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}
