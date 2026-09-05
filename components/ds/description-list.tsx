"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export type DescriptionListProps = React.HTMLAttributes<HTMLDListElement> &
  VariantProps<typeof descriptionListVariants>

// ── Variants ──

export const descriptionListVariants = cva("text-sm", {
  variants: {
    layout: {
      vertical: "flex flex-col gap-4",
      horizontal: "flex flex-col gap-4 md:gap-y-4", // Handled mainly in Item
      grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
})

// ── Component ──

const DescriptionListContext = React.createContext<{
  layout: "vertical" | "horizontal" | "grid"
}>({ layout: "vertical" })

const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(({ className, layout = "vertical", ...props }, ref) => {
  return (
    <DescriptionListContext.Provider value={{ layout: layout || "vertical" }}>
      <dl
        ref={ref}
        data-slot="ds-description-list"
        className={cn(descriptionListVariants({ layout }), className)}
        {...props}
      />
    </DescriptionListContext.Provider>
  )
})
DescriptionList.displayName = "DescriptionList"

const DescriptionListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { layout } = React.useContext(DescriptionListContext)

  return (
    <div
      ref={ref}
      data-slot="ds-description-list-item"
      className={cn(
        layout === "horizontal"
          ? "flex flex-col gap-1 md:grid md:grid-cols-3 md:gap-4"
          : "flex flex-col gap-1",
        className
      )}
      {...props}
    />
  )
})
DescriptionListItem.displayName = "DescriptionListItem"

const DescriptionListTerm = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <dt
      ref={ref}
      data-slot="ds-description-list-term"
      className={cn("text-sm font-medium text-muted-foreground", className)}
      {...props}
    />
  )
})
DescriptionListTerm.displayName = "DescriptionListTerm"

const DescriptionListDetails = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  const { layout } = React.useContext(DescriptionListContext)

  return (
    <dd
      ref={ref}
      data-slot="ds-description-list-details"
      className={cn(
        "text-sm font-normal text-foreground",
        layout === "horizontal" && "md:col-span-2 md:mt-0",
        className
      )}
      {...props}
    />
  )
})
DescriptionListDetails.displayName = "DescriptionListDetails"

export {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
}
