import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  MilestoneStepper,
  type MilestoneItem,
} from "@/components/ds/milestone-stepper"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface AboutMilestonesProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof aboutMilestonesVariants> {
  title: string
  description?: string
  badge?: string
  milestones: MilestoneItem[]
  orientation?: "vertical" | "horizontal"
  locale?: UILocale
}

// ── Variants ──

export const aboutMilestonesVariants = cva(
  "relative w-full py-16 transition-all md:py-24",
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function AboutMilestones({
  title,
  description,
  badge,
  milestones,
  orientation = "vertical",
  locale = "pt-BR",
  variant,
  className,
  ...props
}: AboutMilestonesProps) {
  const t = UI_I18N[locale]?.about ?? UI_I18N["pt-BR"].about

  return (
    <section
      className={cn(aboutMilestonesVariants({ variant }), className)}
      {...props}
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto mb-12 flex flex-col items-center text-center md:mb-16">
          <Badge variant="outline" className="mb-4 text-xs font-semibold">
            {badge ?? t.milestones}
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Linha do Tempo / Stepper */}
        <div className="pt-4">
          <MilestoneStepper milestones={milestones} orientation={orientation} />
        </div>
      </div>
    </section>
  )
}
