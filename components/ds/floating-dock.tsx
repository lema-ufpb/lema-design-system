"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Types ──

export interface FloatingDockItem {
  title: string
  icon: React.ReactNode
  href: string
}

export interface FloatingDockProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof floatingDockVariants> {
  items: FloatingDockItem[]
  desktopClassName?: string
  mobileClassName?: string
}

// ── Variants ──

export const floatingDockVariants = cva(
  "flex items-center gap-2 rounded-2xl border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md",
  {
    variants: {
      variant: {
        default: "",
        muted: "bg-muted/70",
      },
      size: {
        sm: "h-12",
        md: "h-14",
        lg: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// ── Component ──

export function FloatingDock({
  items,
  variant = "default",
  size = "md",
  className,
  desktopClassName,
  mobileClassName,
  ...props
}: FloatingDockProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <TooltipProvider delayDuration={0}>
      <div
        data-slot="floating-dock"
        role="navigation"
        aria-label="Navigation dock"
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        {/* Desktop */}
        <div className={cn("hidden md:flex", desktopClassName)}>
          <div className={cn(floatingDockVariants({ variant, size }))}>
            {items.map((item, idx) => {
              const isHovered = hovered === idx
              const neighbor = hovered !== null && Math.abs(hovered - idx) === 1
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      aria-label={item.title}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(idx)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl bg-muted text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        isHovered && "scale-125",
                        neighbor && "scale-110",
                        size === "sm" && "size-8",
                        size === "lg" && "size-12"
                      )}
                    >
                      <span className="size-5 [&>svg]:size-5">{item.icon}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
        {/* Mobile - grid */}
        <div
          className={cn("grid grid-cols-4 gap-2 md:hidden", mobileClassName)}
        >
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              aria-label={item.title}
              className="flex flex-col items-center gap-1 rounded-xl border bg-card p-3 text-xs font-medium hover:bg-accent"
            >
              <span className="size-5 [&>svg]:size-5">{item.icon}</span>
              <span className="truncate">{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
