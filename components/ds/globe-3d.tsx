"use client"

import * as React from "react"
import createGlobe from "cobe"
import { cn } from "@/lib/utils"

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

      const onResize = () => {
        if (canvasRef.current) {
          width = canvasRef.current.offsetWidth
        }
      }

      window.addEventListener("resize", onResize)
      onResize()

      if (!canvasRef.current) return

      const globe = createGlobe(canvasRef.current, {
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

      let animationFrame: number
      const animate = () => {
        if (!pointerInteracting.current) {
          phi += 0.005
        }
        globe.update({ phi: phi + r, width: width * 2, height: width * 2 })
        animationFrame = requestAnimationFrame(animate)
      }
      animate()

      return () => {
        cancelAnimationFrame(animationFrame)
        globe.destroy()
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
