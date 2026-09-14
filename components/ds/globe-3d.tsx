"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

// cobe is dynamically imported inside the effect to avoid bundling ~45kB in the initial chunk
// The component itself is also safe to load with ssr: false via next/dynamic in consumer apps

export interface Globe3DProps extends React.HTMLAttributes<HTMLDivElement> {
  markers?: Array<{ location: [number, number]; size: number }>
  baseColor?: [number, number, number]
  glowColor?: [number, number, number]
  markerColor?: [number, number, number]
}

export const Globe3D = React.forwardRef<HTMLDivElement, Globe3DProps>(
  (
    {
      className,
      markers = [],
      baseColor = [0.3, 0.3, 0.3],
      glowColor = [1, 1, 1],
      markerColor = [0.1, 0.7, 1],
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const pointerInteracting = React.useRef<number | null>(null)
    const pointerInteractionMovement = React.useRef(0)
    const [{ r }, setR] = React.useState({ r: 0 })

    React.useEffect(() => {
      let phi = 0
      let width = 0
      let animationFrame: number
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let globeInstance: any = null
      let cancelled = false

      const onResize = () => {
        if (canvasRef.current) {
          width = canvasRef.current.offsetWidth
        }
      }

      window.addEventListener("resize", onResize)
      onResize()

      if (!canvasRef.current) return

      void (async () => {
        const { default: createGlobe } = await import("cobe")
        if (cancelled || !canvasRef.current) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        globeInstance = createGlobe(canvasRef.current as any, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0.3,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor,
          markerColor,
          glowColor,
          markers,
        })

        const animate = () => {
          if (!pointerInteracting.current) {
            phi += 0.005
          }
          globeInstance?.update({
            phi: phi + r,
            width: width * 2,
            height: width * 2,
          })
          animationFrame = requestAnimationFrame(animate)
        }
        animate()
      })()

      return () => {
        cancelled = true
        cancelAnimationFrame(animationFrame)
        globeInstance?.destroy()
        window.removeEventListener("resize", onResize)
      }
    }, [markers, baseColor, glowColor, markerColor, r])

    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto aspect-square w-full max-w-[600px]",
          className
        )}
        {...props}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current
            canvasRef.current!.style.cursor = "grabbing"
          }}
          onPointerUp={() => {
            pointerInteracting.current = null
            canvasRef.current!.style.cursor = "grab"
          }}
          onPointerOut={() => {
            pointerInteracting.current = null
            canvasRef.current!.style.cursor = "grab"
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              setR({ r: delta / 200 })
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              setR({ r: delta / 100 })
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            contain: "layout paint size",
            opacity: 1,
            transition: "opacity 1s ease",
          }}
        />
      </div>
    )
  }
)
Globe3D.displayName = "Globe3D"

// Lazy-loaded wrapper for code-splitting — prefer this export in Next.js pages
// to keep cobe out of the initial bundle (ssr: false avoids canvas SSR mismatch)
export const DynamicGlobe3D = dynamic(
  () => Promise.resolve({ default: Globe3D }),
  { ssr: false, loading: () => null }
)
