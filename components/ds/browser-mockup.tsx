import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LockIcon, TerminalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──

export interface BrowserMockupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof browserMockupVariants> {
  url?: string
  controls?: "mac" | "windows" | "none"
  showAddressBar?: boolean
  glow?: boolean
}

// ── Variants ──

export const browserMockupVariants = cva(
  "relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border/80 bg-card text-card-foreground shadow-lg",
        minimal: "border-border/50 bg-background/90 text-foreground shadow-sm",
        glass:
          "border-border/40 bg-background/60 text-foreground shadow-xl backdrop-blur-md",
        terminal:
          "border-border/80 bg-card text-card-foreground shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export const BrowserMockup = React.forwardRef<
  HTMLDivElement,
  BrowserMockupProps
>(
  (
    {
      className,
      variant = "default",
      url = "https://lema.ufpb.br/app",
      controls = "mac",
      showAddressBar = true,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const isTerminal = variant === "terminal"

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          glow &&
            "before:absolute before:-inset-1.5 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:via-highlight-violet/20 before:to-primary/30 before:opacity-60 before:blur-xl"
        )}
      >
        <div
          className={cn(browserMockupVariants({ variant }), className)}
          {...props}
        >
          {/* Header / Window Bar */}
          <div
            className={cn(
              "flex h-10 items-center justify-between gap-4 border-b px-4",
              "border-border/60 bg-muted/40 text-muted-foreground"
            )}
          >
            {/* Window Controls */}
            {controls === "mac" && (
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-destructive/80" />
                <span className="size-2.5 rounded-full bg-warning/80" />
                <span className="size-2.5 rounded-full bg-success/80" />
              </div>
            )}

            {controls === "windows" && (
              <div
                className="flex items-center gap-3 text-xs"
                aria-hidden="true"
              >
                <span>—</span>
                <span>□</span>
                <span>✕</span>
              </div>
            )}

            {controls === "none" && <div className="w-10" />}

            {/* Address bar / Terminal title */}
            {isTerminal ? (
              <div className="flex flex-1 items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground">
                <TerminalIcon className="size-3.5" aria-hidden="true" />
                <span>{url || "bash — 80x24"}</span>
              </div>
            ) : (
              showAddressBar && (
                <div className="flex max-w-sm flex-1 items-center justify-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-3 py-0.5 text-xs text-muted-foreground shadow-xs">
                  <LockIcon className="size-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{url}</span>
                </div>
              )
            )}

            {/* Balancing placeholder for symmetric centering */}
            <div className="w-10" aria-hidden="true" />
          </div>

          {/* Window Body */}
          <div className="relative flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    )
  }
)
BrowserMockup.displayName = "BrowserMockup"
