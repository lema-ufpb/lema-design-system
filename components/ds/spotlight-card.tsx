"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface SpotlightCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spotlightCardVariants> {
  spotlightColor?: string
  spotlightRadius?: number
  title?: string
  description?: string
  loading?: boolean
}

// ── Variants ──

export const spotlightCardVariants = cva(
  "group relative overflow-hidden border bg-card text-card-foreground transition-colors",
  {
    variants: {
      radius: {
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
      },
      variant: {
        default: "shadow-sm hover:shadow-md",
        muted: "bg-muted/40",
        outline: "bg-transparent",
      },
    },
    defaultVariants: {
      radius: "xl",
      variant: "default",
    },
  }
)

// ── Component ──

export function SpotlightCard({
  className,
  radius = "xl",
  variant = "default",
  spotlightColor = "hsl(var(--primary) / 0.12)",
  spotlightRadius = 380,
  title,
  description,
  loading = false,
  children,
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e)
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty("--mx", `${x}px`)
    ref.current.style.setProperty("--my", `${y}px`)
  }

  if (loading) {
    return (
      <div
        data-slot="spotlight-card-skeleton"
        className={cn(
          spotlightCardVariants({ radius, variant }),
          "p-6",
          className
        )}
        {...props}
      >
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
      </div>
    )
  }

  return (
    <Card
      ref={ref}
      data-slot="spotlight-card"
      onMouseMove={handleMove}
      className={cn(
        spotlightCardVariants({ radius, variant }),
        "relative isolate",
        className
      )}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightRadius}px circle at var(--mx) var(--my), ${spotlightColor}, transparent 70%)`,
        }}
      />
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-base">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(!title && !description && "pt-6")}>
        {children}
      </CardContent>
    </Card>
  )
}
