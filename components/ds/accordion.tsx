"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AccordionItem as AccordionItemRoot,
  AccordionContent,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export type AccordionIconVariant = "chevron" | "plus" | "arrow" | "sign"

export interface AccordionItem {
  value: string
  trigger: string
  children: React.ReactNode
  disabled?: boolean
}

type AccordionCommonProps = {
  iconVariant?: AccordionIconVariant
  items: AccordionItem[]
  loading?: boolean
  loadingCount?: number
  className?: string
} & VariantProps<typeof accordionVariants> &
  VariantProps<typeof triggerVariants>

export type AccordionSingleProps = AccordionCommonProps & {
  type?: "single"
  collapsible?: boolean
  value?: string
  onValueChange?: (value: string) => void
}

export type AccordionMultipleProps = AccordionCommonProps & {
  type: "multiple"
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

// ── Variants ──

export const accordionVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    rounded: {
      default: "rounded-2xl",
      none: "rounded-none",
    },
    bordered: {
      default: "border border-border",
      none: "border-none",
    },
  },
  defaultVariants: { size: "md", rounded: "default", bordered: "default" },
})

export const triggerVariants = cva(
  "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent text-left font-medium transition-all outline-none hover:underline disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "gap-3 p-2.5 text-xs",
        md: "gap-4 p-4 text-sm",
        lg: "gap-5 p-5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const contentVariants = cva("", {
  variants: {
    size: {
      sm: "px-2.5 pb-2.5 text-xs",
      md: "px-4 pb-4 text-sm",
      lg: "px-5 pb-5 text-base",
    },
  },
  defaultVariants: { size: "md" },
})

export const iconVariants = cva(
  "shrink-0 text-muted-foreground transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Icon Component ──

function AccordionIcon({
  iconVariant,
  size,
}: {
  iconVariant: AccordionIconVariant
  size: "sm" | "md" | "lg"
}) {
  const base = iconVariants({ size })
  const iconClass = cn(base, "pointer-events-none")

  switch (iconVariant) {
    case "arrow":
      return (
        <ArrowRightIcon
          className={cn(
            iconClass,
            "group-aria-expanded/accordion-trigger:rotate-90"
          )}
        />
      )
    case "plus":
      return (
        <>
          <PlusIcon
            className={cn(
              iconClass,
              "group-aria-expanded/accordion-trigger:hidden"
            )}
          />
          <MinusIcon
            className={cn(
              iconClass,
              "hidden group-aria-expanded/accordion-trigger:inline"
            )}
          />
        </>
      )
    case "sign":
      return (
        <>
          <PlusIcon
            className={cn(
              iconClass,
              "group-aria-expanded/accordion-trigger:hidden"
            )}
          />
          <MinusIcon
            className={cn(
              iconClass,
              "hidden group-aria-expanded/accordion-trigger:inline"
            )}
          />
        </>
      )
    default:
      return (
        <ChevronDownIcon
          className={cn(
            iconClass,
            "group-aria-expanded/accordion-trigger:rotate-180"
          )}
        />
      )
  }
}

// ── Component ──

function Accordion(props: AccordionProps) {
  const {
    type = "single",
    iconVariant = "chevron",
    size: sizeProp = "md",
    rounded = "default",
    bordered = "default",
    items,
    value: controlledValue,
    onValueChange,
    loading = false,
    loadingCount = 3,
    className,
  } = props

  const size: "sm" | "md" | "lg" = sizeProp ?? "md"

  if (loading) {
    return (
      <div
        data-slot="ds-accordion"
        className={cn(
          "flex w-full flex-col overflow-hidden",
          accordionVariants({ rounded, bordered }),
          className
        )}
      >
        {Array.from({ length: loadingCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between border-border",
              i < loadingCount - 1 && "border-b"
            )}
          >
            <Skeleton
              className={cn(
                "m-2 rounded-md",
                size === "sm"
                  ? "h-4 w-3/5"
                  : size === "lg"
                    ? "h-6 w-3/5"
                    : "h-5 w-3/5"
              )}
            />
            <Skeleton
              className={cn(
                "mr-2 rounded-md",
                size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"
              )}
            />
          </div>
        ))}
      </div>
    )
  }

  const rootClassName = cn(
    "flex w-full flex-col overflow-hidden",
    accordionVariants({ rounded, bordered }),
    className
  )

  const itemsJSX = items.map((item) => (
    <AccordionItemRoot
      key={item.value}
      value={item.value}
      disabled={item.disabled}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={triggerVariants({ size })}
        >
          <span className="truncate">{item.trigger}</span>
          <AccordionIcon iconVariant={iconVariant} size={size} />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionContent className={contentVariants({ size })}>
        {item.children}
      </AccordionContent>
    </AccordionItemRoot>
  ))

  if (type === "multiple") {
    return (
      <AccordionPrimitive.Root
        data-slot="ds-accordion"
        type="multiple"
        value={controlledValue as string[] | undefined}
        onValueChange={onValueChange as ((value: string[]) => void) | undefined}
        className={rootClassName}
      >
        {itemsJSX}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      data-slot="ds-accordion"
      type="single"
      collapsible={(props as AccordionSingleProps).collapsible ?? true}
      value={controlledValue as string | undefined}
      onValueChange={onValueChange as ((value: string) => void) | undefined}
      className={rootClassName}
    >
      {itemsJSX}
    </AccordionPrimitive.Root>
  )
}

export { Accordion }
