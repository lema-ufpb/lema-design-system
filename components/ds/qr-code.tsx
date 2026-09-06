"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface QrCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
}

// ── Component ──────────────────────────────────────────────────────────────

export function QrCode({
  className,
  value,
  size = 128,
  ...props
}: QrCodeProps) {
  // Simple placeholder QR using canvas pattern (no external dep)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = "black"
    // Simple deterministic pattern from value hash
    let hash = 0
    for (let i = 0; i < value.length; i++)
      hash = (hash * 31 + value.charCodeAt(i)) % 1000
    const cell = size / 21
    for (let y = 0; y < 21; y++) {
      for (let x = 0; x < 21; x++) {
        const v = (hash + x * 13 + y * 7) % 3 === 0
        if (v) ctx.fillRect(x * cell, y * cell, cell, cell)
      }
    }
  }, [value, size])

  return (
    <div
      data-slot="qr-code"
      // QR requires white background for scannability — exempt from token rule
      className={cn("rounded-2xl border bg-white p-3", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="size-full"
        aria-label={`QR for ${value}`}
      />
    </div>
  )
}
