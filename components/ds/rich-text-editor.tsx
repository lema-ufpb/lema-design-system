"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface RichTextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean
}

// ── Component ──

export const RichTextEditor = React.forwardRef<
  HTMLDivElement,
  RichTextEditorProps
>(({ className, invalid, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-background transition-[color,box-shadow,border-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        invalid &&
          "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        className
      )}
      data-slot="ds-rich-text-editor"
      {...props}
    />
  )
})
RichTextEditor.displayName = "RichTextEditor"

export const RichTextToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1 border-b bg-muted/40 p-1.5",
        className
      )}
      data-slot="ds-rich-text-toolbar"
      {...props}
    />
  )
})
RichTextToolbar.displayName = "RichTextToolbar"

export const RichTextContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "min-h-[150px] p-3 text-sm focus-visible:outline-none",
        "[&_ol]:list-decimal [&_ol]:pl-5",
        "[&_ul]:list-disc [&_ul]:pl-5",
        "[&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold",
        "[&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold",
        "[&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold",
        "[&_p]:mb-2",
        className
      )}
      data-slot="ds-rich-text-content"
      {...props}
    />
  )
})
RichTextContent.displayName = "RichTextContent"
