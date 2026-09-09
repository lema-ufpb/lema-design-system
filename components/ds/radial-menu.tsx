"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface RadialMenuProps {
  children: React.ReactNode
  radius?: number
  startAngle?: number
  endAngle?: number
}

interface RadialMenuContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  radius: number
  startAngle: number
  endAngle: number
}

const RadialMenuContext = React.createContext<RadialMenuContextType | null>(
  null
)

function useRadialMenu() {
  const context = React.useContext(RadialMenuContext)
  if (!context) {
    throw new Error("RadialMenu components must be used within a RadialMenu")
  }
  return context
}

// ── Variants ──

const radialMenuTriggerVariants = cva(
  "relative z-10 flex items-center justify-center rounded-full transition-transform",
  {
    variants: {
      size: {
        sm: "size-10",
        md: "size-12",
        lg: "size-14",
      },
      intent: {
        default:
          "border bg-background text-foreground shadow-sm hover:bg-accent",
        primary:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "primary",
    },
  }
)

const radialMenuItemVariants = cva(
  "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
      intent: {
        default:
          "border bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "default",
    },
  }
)

// ── Components ──

export function RadialMenu({
  children,
  radius = 80,
  startAngle = -90,
  endAngle = 270,
}: RadialMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <RadialMenuContext.Provider
      value={{ isOpen, setIsOpen, radius, startAngle, endAngle }}
    >
      <div className="relative inline-flex items-center justify-center">
        {children}
      </div>
    </RadialMenuContext.Provider>
  )
}

export const RadialMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof radialMenuTriggerVariants>
>(({ className, size, intent, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useRadialMenu()

  return (
    <button
      ref={ref}
      type="button"
      className={cn(radialMenuTriggerVariants({ size, intent }), className)}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      {...props}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isOpen && "rotate-45"
        )}
      >
        {children}
      </div>
    </button>
  )
})
RadialMenuTrigger.displayName = "RadialMenuTrigger"

export function RadialMenuContent({ children }: { children: React.ReactNode }) {
  const { isOpen, radius, startAngle, endAngle } = useRadialMenu()

  const items = React.Children.toArray(children).filter(React.isValidElement)
  const count = items.length

  const actualStep =
    Math.abs(endAngle - startAngle) >= 360
      ? 360 / count
      : (endAngle - startAngle) / Math.max(1, count - 1)

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {items.map((child, index) => {
        const angle = startAngle + index * actualStep
        const angleRad = (angle * Math.PI) / 180
        const x = isOpen ? Math.cos(angleRad) * radius : 0
        const y = isOpen ? Math.sin(angleRad) * radius : 0

        return (
          <div
            key={index}
            className={cn(
              "pointer-events-auto absolute top-1/2 left-1/2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              !isOpen && "invisible"
            )}
            style={{
              opacity: isOpen ? 1 : 0,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isOpen ? 1 : 0})`,
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}

export const RadialMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof radialMenuItemVariants>
>(({ className, size, intent, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={cn(radialMenuItemVariants({ size, intent }), className)}
      {...props}
    />
  )
})
RadialMenuItem.displayName = "RadialMenuItem"
