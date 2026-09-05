import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface AuthSeparatorProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof authSeparatorVariants> {}

// ── Variants ──

export const authSeparatorVariants = cva(
  "relative my-4 flex w-full items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        badge: "",
        gradient: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export const AuthSeparator = React.forwardRef<
  HTMLDivElement,
  AuthSeparatorProps
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(authSeparatorVariants({ variant }), className)}
      {...props}
    >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        {variant === "gradient" ? (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        ) : (
          <div className="w-full border-t border-border/70" />
        )}
      </div>

      {children && (
        <div className="relative flex justify-center">
          {variant === "badge" ? (
            <span className="rounded-full border border-border/80 bg-background px-3 py-0.5 text-xs font-medium tracking-wider text-muted-foreground uppercase shadow-xs">
              {children}
            </span>
          ) : (
            <span className="bg-background px-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {children}
            </span>
          )}
        </div>
      )}
    </div>
  )
})
AuthSeparator.displayName = "AuthSeparator"
