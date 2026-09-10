"use client"

import * as React from "react"
import { Eraser, PenLine } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SignaturePadProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Base64 PNG value of the signature */
  value?: string | null
  onChange?: (value: string | null) => void
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
  label?: string
  clearLabel?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const signaturePadContainerVariants = cva("flex flex-col gap-2", {
  variants: {}
  }
)

export const signaturePadCanvasVariants = cva(
  [
    "cursor-crosshair touch-none rounded-lg border border-input bg-card",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
      isEmpty: {
        true: "",
        false: "",
      },
    },
    defaultVariants: { disabled: false, isEmpty: true }
  }
)

// ── SignaturePad ───────────────────────────────────────────────────────────

export function SignaturePad({
  value,
  onChange,
  width = 480,
  height = 180,
  strokeColor,
  strokeWidth = 2,
  label = "Signature",
  clearLabel = "Clear",
  placeholder = "Sign here",
  disabled = false,
  loading = false,
  className,
  ...props
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = React.useState(false)
  const [isEmpty, setIsEmpty] = React.useState(!value)
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null)

  // Effective stroke color: use CSS var from foreground token
  const effectiveStrokeColor = strokeColor ?? "hsl(var(--foreground))"

  // ── Initialize canvas ─────────────────────────────────────────────────

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    // Set DPR for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    ctx.strokeStyle = effectiveStrokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [width, height, effectiveStrokeColor, strokeWidth])

  // Load initial value
  React.useEffect(() => {
    if (!value) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      setIsEmpty(false)
    }
    img.src = value
  }, [value, width, height])

  // ── Pointer helpers ───────────────────────────────────────────────────

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      const touch = e.touches[0]!
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    }
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    if (disabled) return
    e.preventDefault()
    setIsDrawing(true)
    const pos = getPos(e)
    lastPoint.current = pos
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, strokeWidth / 2, 0, Math.PI * 2)
      ctx.fillStyle = effectiveStrokeColor
      ctx.fill()
    }
    setIsEmpty(false)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing || disabled) return
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const pos = getPos(e)
    if (lastPoint.current) {
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
    lastPoint.current = pos
  }

  function stopDrawing() {
    if (!isDrawing) return
    setIsDrawing(false)
    lastPoint.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL("image/png")
    onChange?.(dataUrl)
  }

  function clearPad() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onChange?.(null)
  }

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={cn(signaturePadContainerVariants(), className)}>
        <Skeleton className="h-4 w-24" />
        <Skeleton style={{ width, height }} className="rounded-lg" />
        <Skeleton className="h-8 w-16" />
      </div>
    )
  }

  return (
    <div className={cn(signaturePadContainerVariants(), className)} {...props}>
      {/* Label */}
      <div className="flex items-center justify-between gap-2">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          <PenLine className="size-4 text-muted-foreground" />
          {label}
        </Label>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={clearPad}
          disabled={disabled || isEmpty}
          aria-label="Clear signature"
        >
          <Eraser className="size-3.5" />
          {clearLabel}
        </Button>
      </div>

      {/* Canvas */}
      <div className="relative" style={{ width, height }}>
        <canvas
          ref={canvasRef}
          className={cn(
            signaturePadCanvasVariants({ disabled, isEmpty }),
            "block"
          )}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          tabIndex={disabled ? -1 : 0}
          role="img"
          aria-label={label}
        />
        {/* Placeholder overlay */}
        {isEmpty && !disabled && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-sm text-muted-foreground/50">
              {placeholder}
            </span>
          </div>
        )}
        {/* Bottom line */}
        <div
          className="pointer-events-none absolute right-6 bottom-8 left-6 border-b border-dashed border-border"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
