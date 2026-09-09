"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Variants ──

const receiptCardVariants = cva(
  "relative w-full max-w-sm overflow-hidden bg-card text-card-foreground shadow-lg",
  {
    variants: {
      edges: {
        both: "rounded-none",
        top: "rounded-b-2xl",
        bottom: "rounded-t-2xl",
        none: "rounded-2xl",
      },
    },
    defaultVariants: {
      edges: "both",
    },
  }
)

export interface ReceiptCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof receiptCardVariants> {}

// ── Components ──

export const ReceiptCard = React.forwardRef<HTMLDivElement, ReceiptCardProps>(
  ({ className, edges, ...props }, ref) => {
    // We use a pseudo-element mask or radial gradients for the jagged edge effect
    const maskImageStyle = React.useMemo(() => {
      const size = "10px"
      const topMask = `radial-gradient(circle at top, transparent ${size}, black ${size}) top / ${size} 100% repeat-x`
      const bottomMask = `radial-gradient(circle at bottom, transparent ${size}, black ${size}) bottom / ${size} 100% repeat-x`

      if (edges === "both") return `${topMask}, ${bottomMask}`
      if (edges === "top") return topMask
      if (edges === "bottom") return bottomMask
      return undefined
    }, [edges])

    return (
      <div
        ref={ref}
        className={cn(receiptCardVariants({ edges }), className)}
        style={
          edges !== "none"
            ? {
                WebkitMaskImage: maskImageStyle,
                maskImage: maskImageStyle,
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
                paddingTop: edges === "both" || edges === "top" ? "12px" : "0",
                paddingBottom:
                  edges === "both" || edges === "bottom" ? "12px" : "0",
              }
            : undefined
        }
        {...props}
      />
    )
  }
)
ReceiptCard.displayName = "ReceiptCard"

export const ReceiptCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center p-6 text-center", className)}
    {...props}
  />
))
ReceiptCardHeader.displayName = "ReceiptCardHeader"

export const ReceiptCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold tracking-widest uppercase", className)}
    {...props}
  />
))
ReceiptCardTitle.displayName = "ReceiptCardTitle"

export const ReceiptCardDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("mx-6 border-t-2 border-dashed border-muted", className)}
    {...props}
  />
))
ReceiptCardDivider.displayName = "ReceiptCardDivider"

export const ReceiptCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
))
ReceiptCardContent.displayName = "ReceiptCardContent"

export const ReceiptCardItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between py-1 text-sm", className)}
    {...props}
  />
))
ReceiptCardItem.displayName = "ReceiptCardItem"

export const ReceiptCardTotal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-between pt-4 text-lg font-bold tracking-wide uppercase",
      className
    )}
    {...props}
  />
))
ReceiptCardTotal.displayName = "ReceiptCardTotal"

export const ReceiptCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center p-6 text-center text-xs text-muted-foreground",
      className
    )}
    {...props}
  />
))
ReceiptCardFooter.displayName = "ReceiptCardFooter"
