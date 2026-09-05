"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type StickyFeatureListSize = "sm" | "md" | "lg"

export interface StickyFeatureListProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof stickyFeatureListRootVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  label?: string
  locale?: UILocale
}

export type StickyFeatureListNavProps = React.HTMLAttributes<HTMLDivElement>

export interface StickyFeatureListItemProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof stickyFeatureListItemVariants> {
  value: string
  title: string
  description?: string
}

export type StickyFeatureListPanelsProps = React.HTMLAttributes<HTMLDivElement>

export interface StickyFeatureListPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

// ── Context ──

interface StickyFeatureListContextValue {
  activeValue: string | undefined
  setActiveValue: (value: string) => void
  registerItem: (value: string, node: HTMLButtonElement | null) => void
  focusSibling: (value: string, direction: 1 | -1) => void
}

const StickyFeatureListContext =
  React.createContext<StickyFeatureListContextValue | null>(null)

function useStickyFeatureListContext(component: string) {
  const context = React.useContext(StickyFeatureListContext)
  if (!context) {
    throw new Error(`${component} must be used within a <StickyFeatureList>`)
  }
  return context
}

// ── Variants ──

export const stickyFeatureListRootVariants = cva(
  "grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16",
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
    },
    defaultVariants: { size: "md" },
  }
)

export const stickyFeatureListItemVariants = cva(
  "flex w-full flex-col gap-1.5 rounded-lg border border-transparent px-4 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:border-border data-[state=active]:bg-muted data-[state=inactive]:hover:bg-accent/50",
  {
    variants: {
      size: {
        sm: "gap-1 px-3 py-3",
        md: "gap-1.5 px-4 py-4",
        lg: "gap-2 px-5 py-5",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const stickyFeatureListItemTitleVariants = cva(
  "font-semibold text-foreground data-[state=inactive]:text-muted-foreground",
  {
    variants: {
      size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
    },
    defaultVariants: { size: "md" },
  }
)

export const stickyFeatureListItemDescriptionVariants = cva(
  "leading-relaxed text-muted-foreground",
  {
    variants: {
      size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
    },
    defaultVariants: { size: "md" },
  }
)

// ── StickyFeatureList ──

export const StickyFeatureList = React.forwardRef<
  HTMLDivElement,
  StickyFeatureListProps
>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      label,
      locale = "en-US",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const activeValue = isControlled ? controlledValue : internalValue

    const itemsRef = React.useRef<Map<string, HTMLButtonElement | null>>(
      new Map()
    )
    const orderRef = React.useRef<string[]>([])

    const setActiveValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next)
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
    )

    const registerItem = React.useCallback(
      (itemValue: string, node: HTMLButtonElement | null) => {
        if (node) {
          itemsRef.current.set(itemValue, node)
          if (!orderRef.current.includes(itemValue)) {
            orderRef.current.push(itemValue)
          }
        } else {
          itemsRef.current.delete(itemValue)
          orderRef.current = orderRef.current.filter((v) => v !== itemValue)
        }
      },
      []
    )

    const focusSibling = React.useCallback(
      (fromValue: string, direction: 1 | -1) => {
        const order = orderRef.current
        const currentIndex = order.indexOf(fromValue)
        if (currentIndex === -1 || order.length === 0) return
        const nextIndex =
          (currentIndex + direction + order.length) % order.length
        const nextValue = order[nextIndex]
        const node = itemsRef.current.get(nextValue)
        if (!node) return
        node.focus()
        setActiveValue(nextValue)
      },
      [setActiveValue]
    )

    // Auto-select the first registered item when no value/defaultValue is
    // provided, so the roving-tabindex list always has one focusable tab.
    React.useEffect(() => {
      if (!isControlled && internalValue === undefined && orderRef.current[0]) {
        setInternalValue(orderRef.current[0])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <StickyFeatureListContext.Provider
        value={{ activeValue, setActiveValue, registerItem, focusSibling }}
      >
        <div
          ref={ref}
          className={cn(stickyFeatureListRootVariants({ size }), className)}
          data-slot="sticky-feature-list"
          aria-label={label ?? UI_I18N[locale].stickyFeatureList.sectionNav}
          {...props}
        >
          {children}
        </div>
      </StickyFeatureListContext.Provider>
    )
  }
)
StickyFeatureList.displayName = "StickyFeatureList"

// ── StickyFeatureListNav ──

export const StickyFeatureListNav = React.forwardRef<
  HTMLDivElement,
  StickyFeatureListNavProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    aria-orientation="vertical"
    className={cn("flex flex-col gap-2", className)}
    data-slot="sticky-feature-list-nav"
    {...props}
  />
))
StickyFeatureListNav.displayName = "StickyFeatureListNav"

// ── StickyFeatureListItem ──

export const StickyFeatureListItem = React.forwardRef<
  HTMLButtonElement,
  StickyFeatureListItemProps
>(({ value, title, description, size = "md", className, ...props }, ref) => {
  const { activeValue, setActiveValue, registerItem, focusSibling } =
    useStickyFeatureListContext("StickyFeatureListItem")
  const isActive = activeValue === value

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      registerItem(value, node)
      if (typeof ref === "function") ref(node)
      else if (ref)
        (ref as React.RefObject<HTMLButtonElement | null>).current = node
    },
    [ref, registerItem, value]
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      focusSibling(value, 1)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      focusSibling(value, -1)
    }
    props.onKeyDown?.(event)
  }

  return (
    <button
      ref={setRefs}
      type="button"
      role="tab"
      id={`sticky-feature-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`sticky-feature-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setActiveValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(stickyFeatureListItemVariants({ size }), className)}
      {...props}
    >
      <span
        data-state={isActive ? "active" : "inactive"}
        className={cn(stickyFeatureListItemTitleVariants({ size }))}
      >
        {title}
      </span>
      {description && (
        <span
          className={cn(stickyFeatureListItemDescriptionVariants({ size }))}
        >
          {description}
        </span>
      )}
    </button>
  )
})
StickyFeatureListItem.displayName = "StickyFeatureListItem"

// ── StickyFeatureListPanels ──

export const StickyFeatureListPanels = React.forwardRef<
  HTMLDivElement,
  StickyFeatureListPanelsProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky top-24 h-fit", className)}
    data-slot="sticky-feature-list-panels"
    {...props}
  >
    {children}
  </div>
))
StickyFeatureListPanels.displayName = "StickyFeatureListPanels"

// ── StickyFeatureListPanel ──

export const StickyFeatureListPanel = React.forwardRef<
  HTMLDivElement,
  StickyFeatureListPanelProps
>(({ value, className, children, ...props }, ref) => {
  const { activeValue } = useStickyFeatureListContext("StickyFeatureListPanel")
  const isActive = activeValue === value

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`sticky-feature-panel-${value}`}
      aria-labelledby={`sticky-feature-tab-${value}`}
      hidden={!isActive}
      className={cn("overflow-hidden rounded-2xl", className)}
      {...props}
    >
      {children}
    </div>
  )
})
StickyFeatureListPanel.displayName = "StickyFeatureListPanel"
