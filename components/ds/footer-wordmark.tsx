import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface FooterWordmarkProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerWordmarkVariants> {
  text?: string
  decorative?: boolean
}

// ── Variants ──

export const footerWordmarkVariants = cva(
  "pointer-events-none relative flex w-full overflow-hidden select-none",
  {
    variants: {
      align: {
        center: "justify-center text-center",
        left: "justify-start text-left",
      },
      variant: {
        outline:
          "text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground)/0.12)]",
        muted: "text-foreground/[0.04]",
        gradient:
          "bg-linear-to-b from-foreground/15 via-foreground/5 to-transparent bg-clip-text text-transparent",
      },
    },
    defaultVariants: {
      align: "center",
      variant: "outline",
    },
  }
)

// ── Component ──

export const FooterWordmark = React.forwardRef<
  HTMLDivElement,
  FooterWordmarkProps
>(
  (
    {
      text = "LEMA",
      variant = "outline",
      align = "center",
      decorative = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden={decorative ? "true" : undefined}
        className={cn("w-full overflow-hidden py-4", className)}
        {...props}
      >
        <span
          className={cn(
            "block w-full text-[clamp(3.5rem,16vw,14rem)] leading-none font-black tracking-tighter uppercase",
            footerWordmarkVariants({ variant, align })
          )}
        >
          {text}
        </span>
      </div>
    )
  }
)
FooterWordmark.displayName = "FooterWordmark"
