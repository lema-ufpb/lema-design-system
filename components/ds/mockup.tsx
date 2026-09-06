"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface MockupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {
  loading?: boolean
}

// ── Variants ──

export const mockupVariants = cva("relative overflow-hidden bg-card", {
  variants: {
    frame: {
      small: "rounded-xl border shadow-md",
      large: "rounded-2xl border shadow-xl",
      mobile:
        "mx-auto max-w-[320px] rounded-[2rem] border-[6px] border-zinc-900 shadow-2xl dark:border-zinc-800",
    },
    inset: {
      true: "bg-muted/40 p-1",
      false: "",
    },
  },
  defaultVariants: {
    frame: "large",
    inset: false,
  },
})

// ── Component ──

export function Mockup({
  className,
  frame = "large",
  inset = false,
  loading = false,
  children,
  ...props
}: MockupProps) {
  if (loading) {
    return (
      <div
        data-slot="mockup-skeleton"
        className={cn(mockupVariants({ frame, inset }), "h-64", className)}
        {...props}
      >
        <Skeleton className="size-full rounded-[inherit]" />
      </div>
    )
  }

  return (
    <div
      data-slot="mockup"
      className={cn(mockupVariants({ frame, inset }), className)}
      {...props}
    >
      {frame === "mobile" && (
        <div
          className="pointer-events-none absolute top-2 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-zinc-900 dark:bg-zinc-700"
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          "overflow-hidden rounded-[inherit]",
          inset && "rounded-xl"
        )}
      >
        {children}
      </div>
    </div>
  )
}
