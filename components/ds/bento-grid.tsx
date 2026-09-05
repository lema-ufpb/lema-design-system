import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type BentoGridItemSpan = 1 | 2 | 3 | 4

export type BentoGridProps = React.HTMLAttributes<HTMLDivElement>

export interface BentoGridItemProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bentoGridItemVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ElementType
  /** Background layer rendered behind the content (image, gradient, chart). */
  media?: React.ReactNode
  /** Heading level for `title` — adjust to keep document heading order valid when the grid sits right below an `h1`/`h2`. */
  titleAs?: "h2" | "h3" | "h4"
  loading?: boolean
}

// ── Variants ──

export const bentoGridVariants = cva(
  "grid auto-rows-[minmax(12rem,auto)] grid-cols-2 gap-4 md:grid-cols-4"
)

export const bentoGridItemVariants = cva(
  "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
  {
    variants: {
      colSpan: {
        1: "col-span-2 md:col-span-1",
        2: "col-span-2",
        3: "col-span-2 md:col-span-3",
        4: "col-span-2 md:col-span-4",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
      },
    },
    defaultVariants: { colSpan: 1, rowSpan: 1 },
  }
)

export const bentoGridItemIconVariants = cva(
  "mb-3 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
)

export const bentoGridItemTitleVariants = cva("font-semibold text-foreground")

export const bentoGridItemDescriptionVariants = cva(
  "text-sm leading-relaxed text-muted-foreground"
)

// ── BentoGrid ──

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(bentoGridVariants(), className)}
      data-slot="bento-grid"
      {...props}
    />
  )
)
BentoGrid.displayName = "BentoGrid"

// ── BentoGridItem ──

export const BentoGridItem = React.forwardRef<
  HTMLDivElement,
  BentoGridItemProps
>(
  (
    {
      title,
      description,
      icon: Icon,
      media,
      titleAs: TitleTag = "h3",
      colSpan = 1,
      rowSpan = 1,
      loading = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(bentoGridItemVariants({ colSpan, rowSpan }), className)}
          data-slot="bento-grid-item-skeleton"
        >
          <Skeleton className="mb-3 size-10 rounded-xl" />
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="mt-2 h-4 w-full rounded-md" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(bentoGridItemVariants({ colSpan, rowSpan }), className)}
        data-slot="bento-grid-item"
        {...props}
      >
        {media && (
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            {media}
          </div>
        )}

        {children ?? (
          <>
            {Icon && (
              <div
                className={cn(bentoGridItemIconVariants())}
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </div>
            )}
            {title && (
              <TitleTag className={cn(bentoGridItemTitleVariants())}>
                {title}
              </TitleTag>
            )}
            {description && (
              <p className={cn(bentoGridItemDescriptionVariants())}>
                {description}
              </p>
            )}
          </>
        )}
      </div>
    )
  }
)
BentoGridItem.displayName = "BentoGridItem"
