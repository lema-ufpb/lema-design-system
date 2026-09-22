import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ValuesCard, type ValuesCardProps } from "@/components/ds/values-card"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface AboutValuesGridProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof aboutValuesGridVariants> {
  title: string
  description?: string
  badge?: string
  values: ValuesCardProps[]
  columns?: 2 | 3 | 4
  locale?: UILocale
}

// ── Variants ──

export const aboutValuesGridVariants = cva(
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

export function AboutValuesGrid({
  title,
  description,
  badge,
  values,
  columns = 3,
  locale = "en-US",
  variant,
  className,
  ...props
}: AboutValuesGridProps) {
  const t = UI_I18N[locale]?.about ?? UI_I18N["en-US"].about

  const gridColsClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <section
      className={cn(aboutValuesGridVariants({ variant }), className)}
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center md:mb-16">
          <Badge variant="outline" className="mb-4 text-xs font-semibold">
            {badge ?? t.values}
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Value Cards Grid */}
        <div className={cn("grid gap-6", gridColsClass)}>
          {values.map((item, index) => (
            <ValuesCard
              key={index}
              index={item.index ?? index + 1}
              title={item.title}
              description={item.description}
              icon={item.icon}
              variant={item.variant ?? "default"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
