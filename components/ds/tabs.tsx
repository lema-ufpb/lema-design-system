"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Tabs as TabsRoot, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TabItem {
  /** Unique identifier for the tab. Used as the value prop for Radix primitives. */
  value: string
  /** Human-readable label shown in the tab trigger. */
  label: string
  /** Lucide icon component rendered before the label. */
  icon?: React.ElementType
  /** Numeric badge shown next to the label (e.g. notification count). */
  count?: number
  /** Disables the individual tab. */
  disabled?: boolean
  /** Content rendered when the tab is active. */
  content?: React.ReactNode
}

export interface TabsProps {
  /** Array of tab definitions — the declarative API. */
  items: TabItem[]
  /** Initial active tab for uncontrolled usage. Defaults to the first item's value. */
  defaultValue?: string
  /** Controlled active tab value. */
  value?: string
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void
  /** Visual variant for the tab bar. @default "default" */
  variant?: "default" | "line" | "pill" | "segmented"
  /** Trigger size. @default "md" */
  size?: "sm" | "md" | "lg"
  /** Layout direction. @default "horizontal" */
  orientation?: "horizontal" | "vertical"
  /** Whether tabs activate on focus or require a click. @default "automatic" */
  activationMode?: "automatic" | "manual"
  /** When true, collapses to an Accordion on viewports below 768px. */
  responsive?: boolean
  /** Always render as Accordion regardless of viewport. Useful for stories. */
  forceAccordion?: boolean
  /** Shows skeleton placeholders while loading. */
  loading?: boolean
  /** Number of skeleton items. Defaults to items.length or 3. */
  skeletonCount?: number
  /** Locale for aria-labels. @default "en-US" */
  locale?: UILocale
  className?: string
}

// ── CVA Variants ────────────────────────────────────────────────────────────

const dsTabsListVariants = cva(
  [
    "group/tabs-list inline-flex w-fit items-center justify-center",
    "text-muted-foreground transition-all",
  ],
  {
    variants: {
      variant: {
        default: "rounded-full bg-muted p-1",
        line: "gap-1 rounded-none border-b border-border bg-transparent pb-px",
        pill: "gap-2 bg-transparent",
        segmented: "rounded-lg bg-muted p-0.5",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "h-fit flex-col rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
)

const dsTabsTriggerVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-all",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
    "data-active:text-foreground",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-full border border-transparent!",
          "text-foreground/60 hover:text-foreground",
          "data-active:bg-background data-active:text-foreground data-active:shadow-xs",
          "dark:data-active:border-input dark:data-active:bg-input/30",
        ],
        line: [
          "rounded-none bg-transparent",
          "text-foreground/60 hover:text-foreground",
          "data-active:bg-transparent data-active:text-foreground",
          // Underline indicator
          "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity",
          "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5",
          "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5",
          "data-active:after:opacity-100",
        ],
        pill: [
          "rounded-full",
          "text-foreground/60 hover:bg-accent/50 hover:text-foreground",
          "data-active:bg-primary data-active:text-primary-foreground data-active:shadow-xs",
          "data-active:hover:bg-primary/90",
        ],
        segmented: [
          "rounded-md",
          "text-foreground/60 hover:text-foreground",
          "data-active:bg-background data-active:text-foreground data-active:shadow-xs",
        ],
      },
      size: {
        sm: "h-7 px-2.5 text-xs [&_svg]:size-3",
        md: "h-9 px-3 text-sm [&_svg]:size-4",
        lg: "h-10 px-4 text-base [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// ── Helpers ─────────────────────────────────────────────────────────────────

function TabsSkeleton({ count, variant }: { count: number; variant: string }) {
  return (
    <div
      className={cn(
        "flex gap-2",
        variant === "segmented" && "rounded-lg bg-muted p-0.5",
        variant === "pill" && "gap-3"
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-9",
            variant === "segmented" ? "w-20 rounded-md" : "w-24 rounded-full"
          )}
        />
      ))}
    </div>
  )
}

// ── Accordion Fallback (responsive) ─────────────────────────────────────────

function AccordionFallback({
  items,
  value,
  onValueChange,
  size,
}: {
  items: TabItem[]
  value?: string
  onValueChange?: (value: string) => void
  size?: "sm" | "md" | "lg"
}) {
  const sizeClass =
    size === "sm"
      ? "py-2.5 text-xs"
      : size === "lg"
        ? "py-4 text-base"
        : "py-3 text-sm"

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={value}
      onValueChange={onValueChange}
      data-slot="tabs-accordion"
      className="divide-y divide-border rounded-xl border"
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <AccordionPrimitive.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="group/tabs-accordion-item first:rounded-t-xl last:rounded-b-xl data-open:bg-muted/30"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                data-slot="tabs-accordion-trigger"
                className={cn(
                  "group/tabs-accordion-trigger flex w-full items-center gap-2 px-4 text-left font-medium transition-all outline-none",
                  "hover:bg-muted/30",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
                  sizeClass
                )}
              >
                {Icon && <Icon className="size-4 shrink-0" />}
                <span className="flex-1 truncate">{item.label}</span>
                {item.count !== undefined && (
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 text-xs font-semibold tabular-nums">
                    {item.count}
                  </span>
                )}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/tabs-accordion-trigger:rotate-180" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content
              data-slot="tabs-accordion-content"
              className="overflow-hidden px-4 pb-4 text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
            >
              {item.content}
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        )
      })}
    </AccordionPrimitive.Root>
  )
}

// ── Component ───────────────────────────────────────────────────────────────

export function Tabs({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  activationMode,
  responsive = false,
  forceAccordion = false,
  loading = false,
  skeletonCount,
  locale = "en-US",
  className,
}: TabsProps) {
  const t = UI_I18N[locale].tabs
  const isMobile = useIsMobile()
  const showAccordion = forceAccordion || (responsive && isMobile)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.value ?? ""
  )
  const activeValue = isControlled ? (controlledValue as string) : internalValue

  const handleValueChange = React.useCallback(
    (value: string) => {
      if (!isControlled) setInternalValue(value)
      onValueChange?.(value)
    },
    [isControlled, onValueChange]
  )

  // Loading
  if (loading) {
    return (
      <TabsSkeleton
        count={skeletonCount ?? (items.length || 3)}
        variant={variant}
      />
    )
  }

  // Empty
  if (items.length === 0) {
    return null
  }

  // Responsive accordion fallback
  if (showAccordion) {
    return (
      <AccordionFallback
        items={items}
        value={activeValue}
        onValueChange={handleValueChange}
        size={size}
      />
    )
  }

  // Normal tabs
  return (
    <TabsRoot
      value={activeValue}
      onValueChange={handleValueChange}
      orientation={orientation}
      activationMode={activationMode}
      className={className}
    >
      <TabsPrimitive.List
        data-slot="ds-tabs-list"
        aria-label={t.tabList}
        className={cn(dsTabsListVariants({ variant, orientation }))}
      >
        {items.map((item) => {
          const Icon = item.icon
          return (
            <TabsPrimitive.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              data-slot="ds-tabs-trigger"
              className={cn(dsTabsTriggerVariants({ variant, size }))}
            >
              {Icon && <Icon />}
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted-foreground/20 px-1.5 text-xs leading-none font-semibold tabular-nums">
                  {item.count}
                </span>
              )}
            </TabsPrimitive.Trigger>
          )
        })}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
