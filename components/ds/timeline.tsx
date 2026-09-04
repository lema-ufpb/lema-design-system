"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Timeline ──

const Timeline = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col", className)} {...props} />
))
Timeline.displayName = "Timeline"

// ── TimelineItem ──

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("relative flex min-h-12 gap-4", className)}
    {...props}
  />
))
TimelineItem.displayName = "TimelineItem"

// ── TimelineSeparator ──

const TimelineSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center", className)}
    {...props}
  />
))
TimelineSeparator.displayName = "TimelineSeparator"

// ── TimelineDot ──

const timelineDotVariants = cva(
  "z-10 flex size-4 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      status: {
        default: "border-muted-foreground",
        primary: "border-primary",
        success: "border-success",
        warning: "border-warning",
        destructive: "border-destructive",
      },
      solid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        status: "default",
        solid: true,
        className: "bg-muted-foreground text-background",
      },
      {
        status: "primary",
        solid: true,
        className: "bg-primary text-primary-foreground",
      },
      {
        status: "success",
        solid: true,
        className: "bg-success text-success-foreground",
      },
      {
        status: "warning",
        solid: true,
        className: "bg-warning text-warning-foreground",
      },
      {
        status: "destructive",
        solid: true,
        className: "text-destructive-foreground bg-destructive",
      },
    ],
    defaultVariants: {
      status: "default",
      solid: false,
    },
  }
)

export interface TimelineDotProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ status, solid, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineDotVariants({ status, solid }), className)}
      {...props}
    />
  )
)
TimelineDot.displayName = "TimelineDot"

// ── TimelineConnector ──

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-px grow bg-border", className)} {...props} />
))
TimelineConnector.displayName = "TimelineConnector"

// ── TimelineContent ──

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0 pb-8", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
}
