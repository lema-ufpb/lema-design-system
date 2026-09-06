import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface BackgroundGlowProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backgroundGlowVariants> {}

// ── Variants ──

export const backgroundGlowVariants = cva(
  "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
  {
    variants: {
      variant: {
        aurora: "",
        spotlight: "",
        beam: "",
        "grid-dots": "",
      },
      tone: {
        primary: "",
        violet: "",
        sky: "",
        neutral: "",
      },
    },
    defaultVariants: {
      variant: "aurora",
      tone: "primary",
    },
  }
)

// ── Component ──

export const BackgroundGlow = React.forwardRef<
  HTMLDivElement,
  BackgroundGlowProps
>(({ className, variant = "aurora", tone = "primary", ...props }, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(backgroundGlowVariants({ variant, tone }), className)}
      {...props}
    >
      {variant === "aurora" && (
        <div
          className={cn(
            "absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl sm:size-[800px]",
            tone === "primary" &&
              "bg-radial from-primary via-primary/30 to-transparent",
            tone === "violet" &&
              "bg-radial from-highlight-violet via-primary/20 to-transparent",
            tone === "sky" &&
              "bg-radial from-highlight-sky via-primary/20 to-transparent",
            tone === "neutral" &&
              "bg-radial from-foreground/20 via-muted to-transparent"
          )}
        />
      )}

      {variant === "spotlight" && (
        <div
          className={cn(
            "absolute top-0 left-1/2 h-[500px] w-full max-w-4xl -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)] opacity-25 blur-2xl",
            tone === "primary" &&
              "bg-gradient-to-b from-primary to-transparent",
            tone === "violet" &&
              "bg-gradient-to-b from-highlight-violet to-transparent",
            tone === "sky" &&
              "bg-gradient-to-b from-highlight-sky to-transparent",
            tone === "neutral" &&
              "bg-gradient-to-b from-foreground/30 to-transparent"
          )}
        />
      )}

      {variant === "beam" && (
        <div className="absolute inset-0 flex justify-center">
          <div
            className={cn(
              "h-full w-px opacity-30",
              tone === "primary" &&
                "bg-gradient-to-b from-transparent via-primary to-transparent",
              tone === "violet" &&
                "bg-gradient-to-b from-transparent via-highlight-violet to-transparent",
              tone === "sky" &&
                "bg-gradient-to-b from-transparent via-highlight-sky to-transparent",
              tone === "neutral" &&
                "bg-gradient-to-b from-transparent via-foreground to-transparent"
            )}
          />
        </div>
      )}

      {variant === "grid-dots" && (
        <div
          className={cn(
            "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)] opacity-40",
            "bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]"
          )}
        />
      )}
    </div>
  )
})
BackgroundGlow.displayName = "BackgroundGlow"
