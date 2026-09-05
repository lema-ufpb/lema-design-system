import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// ── Variants ──

export const calloutVariants = cva("", {
  variants: {
    variant: {
      default: "border-transparent bg-muted text-foreground",
      info: "border-highlight-sky bg-highlight-sky text-foreground [&>svg]:text-primary",
      success:
        "border-success bg-success/10 text-success-foreground [&>svg]:text-success",
      warning:
        "border-warning bg-warning/10 text-warning-foreground [&>svg]:text-warning",
      destructive:
        "border-destructive bg-destructive/10 text-destructive [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// ── Types ──

export interface CalloutProps
  extends
    Omit<React.ComponentProps<typeof Alert>, "variant">,
    VariantProps<typeof calloutVariants> {
  title?: string
  icon?: React.ReactNode
}

// ── Component ──

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    { className, variant = "default", title, icon, children, ...props },
    ref
  ) => {
    let DefaultIcon = null

    switch (variant) {
      case "info":
        DefaultIcon = <InfoIcon className="size-4" />
        break
      case "success":
        DefaultIcon = <CheckCircleIcon className="size-4" />
        break
      case "warning":
        DefaultIcon = <AlertTriangleIcon className="size-4" />
        break
      case "destructive":
        DefaultIcon = <AlertCircleIcon className="size-4" />
        break
    }

    const Icon = icon ?? DefaultIcon

    return (
      <Alert
        ref={ref}
        className={cn(calloutVariants({ variant }), className)}
        data-slot="ds-callout"
        {...props}
      >
        {Icon}
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    )
  }
)
Callout.displayName = "Callout"
