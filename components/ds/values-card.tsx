import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface ValuesCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof valuesCardVariants> {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  index?: string | number
}

// ── Variants ──

export const valuesCardVariants = cva(
  "group relative flex flex-col rounded-2xl p-6 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-card text-card-foreground shadow-xs hover:border-primary/40 hover:shadow-sm",
        outline:
          "border-2 border-border/80 bg-transparent hover:border-foreground/50",
        accent: "border border-primary/20 bg-primary/5 hover:bg-primary/10",
        muted: "border border-transparent bg-muted/50 hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function ValuesCard({
  title,
  description,
  icon: Icon,
  index,
  variant,
  className,
  ...props
}: ValuesCardProps) {
  const formattedIndex =
    typeof index === "number" ? String(index).padStart(2, "0") : index

  return (
    <div className={cn(valuesCardVariants({ variant }), className)} {...props}>
      <div className="flex items-center justify-between">
        {Icon ? (
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </div>
        ) : (
          <div className="size-10" />
        )}
        {formattedIndex && (
          <span className="text-xs font-semibold text-muted-foreground tabular-nums">
            {formattedIndex}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
