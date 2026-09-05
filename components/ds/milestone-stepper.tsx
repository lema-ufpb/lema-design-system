import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface MilestoneItem {
  year: string | number
  title: string
  description: string
  badge?: string
}

export interface MilestoneStepperProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof milestoneStepperVariants> {
  milestones: MilestoneItem[]
}

// ── Variants ──

export const milestoneStepperVariants = cva("relative w-full transition-all", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-8",
      horizontal: "grid grid-cols-1 gap-6 md:grid-cols-4",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

// ── Component ──

export function MilestoneStepper({
  milestones,
  orientation,
  className,
  ...props
}: MilestoneStepperProps) {
  const isVertical = orientation !== "horizontal"

  return (
    <div
      className={cn(milestoneStepperVariants({ orientation }), className)}
      {...props}
    >
      {isVertical ? (
        <ol className="relative flex flex-col gap-8 pl-8 md:pl-10">
          {/* Linha conectora contínua vertical */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-3 w-px -translate-x-1/2 bg-border md:left-4"
          />

          {milestones.map((item, index) => (
            <li
              key={index}
              className="relative flex flex-col items-start gap-1"
            >
              {/* Marcador / Nó iluminado */}
              <div
                aria-hidden="true"
                className="absolute top-1 -left-8 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-primary shadow-xs ring-4 ring-primary/10 md:-left-10 md:size-8"
              >
                <div className="size-2 rounded-full bg-primary-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary tabular-nums">
                  {item.year}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {milestones.map((item, index) => (
            <li
              key={index}
              className="relative flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary tabular-nums">
                  {item.year}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
