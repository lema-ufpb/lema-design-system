import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface ManifestoStatementProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof manifestoStatementVariants> {
  statement: React.ReactNode
  eyebrow?: string
  author?: string
}

// ── Variants ──

export const manifestoStatementVariants = cva(
  "relative flex flex-col transition-all",
  {
    variants: {
      size: {
        default:
          "gap-4 [&_blockquote]:text-2xl md:[&_blockquote]:text-3xl lg:[&_blockquote]:text-4xl",
        lg: "gap-5 [&_blockquote]:text-3xl md:[&_blockquote]:text-4xl lg:[&_blockquote]:text-5xl",
        xl: "gap-6 [&_blockquote]:text-4xl md:[&_blockquote]:text-5xl lg:[&_blockquote]:text-6xl",
      },
      align: {
        left: "items-start text-left",
        center: "items-center text-center",
      },
    },
    defaultVariants: {
      size: "default",
      align: "left",
    },
  }
)

// ── Component ──

export function ManifestoStatement({
  statement,
  eyebrow,
  author,
  size,
  align,
  className,
  ...props
}: ManifestoStatementProps) {
  return (
    <div
      className={cn(manifestoStatementVariants({ size, align }), className)}
      {...props}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </span>
      )}

      <blockquote className="leading-[1.15] font-bold tracking-tight text-foreground">
        {statement}
      </blockquote>

      {author && (
        <cite className="text-sm font-medium text-muted-foreground not-italic">
          — {author}
        </cite>
      )}
    </div>
  )
}
