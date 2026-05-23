import { cva, type VariantProps } from "class-variance-authority"

/**
 * Outer search landmark wrapper.
 */
export const searchComboWrapperVariants = cva(
  ["flex", "w-full", "items-center"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      loading: {
        true: ["pointer-events-none"],
      },
    },
    defaultVariants: {
      size: "md",
      loading: false,
    },
  }
)

/**
 * Input row container (icon + input + buttons).
 */
export const searchComboInputWrapperVariants = cva(
  [
    "flex",
    "w-full",
    "items-center",
    "border",
    "border-input",
    "bg-background",
    "transition-all",
    "duration-200",
    "outline-none",
    "hover:border-ring",
    "hover:bg-accent/50",
    "focus-within:border-ring",
    "focus-within:ring-2",
    "focus-within:ring-ring/20",
    "focus-within:bg-background",
    "overflow-hidden",
  ],
  {
    variants: {
      size: {
        sm: ["h-8", "min-h-8", "text-sm"],
        md: ["h-10", "min-h-10", "text-base"],
        lg: ["h-12", "min-h-12", "text-lg"],
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
      border: {
        true: [
          "border-2",
          "border-primary",
          "bg-muted/50",
          "shadow-sm",
          "hover:bg-muted",
          "hover:border-primary",
          "focus-within:bg-background",
          "focus-within:border-primary",
          "focus-within:ring-2",
          "focus-within:ring-primary/20",
        ],
        false: "",
      },
      disabled: {
        true: [
          "cursor-not-allowed",
          "bg-muted",
          "opacity-60",
          "hover:bg-muted",
          "hover:border-input",
        ],
        false: "",
      },
      loading: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: false,
      border: false,
      disabled: false,
      loading: false,
    },
  }
)

/**
 * The `<input>` element itself.
 */
export const searchComboInputVariants = cva(
  [
    "flex-1",
    "bg-transparent",
    "border-none",
    "px-3",
    "py-2",
    "text-foreground",
    "outline-none",
    "placeholder:text-muted-foreground",
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      border: {
        true: ["text-foreground", "placeholder:text-muted-foreground"],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      border: false,
    },
  }
)

/**
 * Left icon wrapper (search icon).
 */
export const searchComboIconWrapperVariants = cva(
  ["flex", "items-center", "pl-3", "pr-1", "text-muted-foreground"],
  {
    variants: {
      border: {
        true: "text-primary",
        false: "",
      },
    },
    defaultVariants: {
      border: false,
    },
  }
)

/**
 * Clear and other action icon buttons.
 */
export const searchComboActionButtonVariants = cva(
  [
    "rounded-md",
    "p-1.5",
    "text-muted-foreground",
    "transition-colors",
    "cursor-pointer",
    "hover:bg-accent",
    "hover:text-foreground",
  ],
  {
    variants: {
      border: {
        true: [
          "text-muted-foreground",
          "hover:bg-accent",
          "hover:text-primary",
        ],
        false: "",
      },
    },
    defaultVariants: {
      border: false,
    },
  }
)

/**
 * Search submit button.
 */
export const searchComboSearchButtonVariants = cva(
  [
    "flex",
    "shrink-0",
    "items-center",
    "justify-center",
    "gap-1.5",
    "border-none",
    "bg-primary",
    "px-3",
    "font-medium",
    "text-primary-foreground",
    "cursor-pointer",
    "transition-all",
    "duration-200",
    "hover:bg-primary/90",
    "active:scale-[0.97]",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
    "m-0",
  ],
  {
    variants: {
      size: {
        sm: ["self-stretch", "px-2.5", "text-sm"],
        md: ["self-stretch", "px-3", "text-sm"],
        lg: ["self-stretch", "px-4", "text-base"],
      },
      rounded: {
        true: "rounded-none",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: false,
    },
  }
)

/**
 * Results list container (`<ul>`).
 */
export const searchComboResultsListVariants = cva([
  "m-0",
  "my-0.5",
  "max-h-[200px]",
  "list-none",
  "overflow-y-auto",
  "rounded-md",
  "border",
  "border-border/80",
  "bg-popover",
  "p-0",
  "shadow-lg",
])

/**
 * Individual result item (`<li>`).
 */
export const searchComboResultItemVariants = cva(
  [
    "cursor-pointer",
    "border-b",
    "border-border/50",
    "px-3",
    "py-2",
    "text-popover-foreground",
    "transition-colors",
    "last:border-b-0",
  ],
  {
    variants: {
      active: {
        true: "bg-accent",
        false: "hover:bg-accent/50",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

/**
 * Text highlight `<mark>`.
 */
export const searchComboHighlightVariants = cva([
  "rounded-sm",
  "bg-primary/15",
  "px-0.5",
  "font-semibold",
  "text-primary",
])

/**
 * Group header label.
 */
export const searchComboGroupHeaderVariants = cva([
  "px-3",
  "py-1.5",
  "text-xs",
  "font-medium",
  "tracking-wide",
  "text-muted-foreground",
  "uppercase",
  "bg-muted/30",
])

/**
 * Empty state message.
 */
export const searchComboEmptyVariants = cva([
  "px-3",
  "py-6",
  "text-center",
  "text-sm",
  "text-muted-foreground",
])

export type SearchComboWrapperVariants = VariantProps<
  typeof searchComboWrapperVariants
>
export type SearchComboInputWrapperVariants = VariantProps<
  typeof searchComboInputWrapperVariants
>
export type SearchComboSearchButtonVariants = VariantProps<
  typeof searchComboSearchButtonVariants
>
export type SearchComboResultItemVariants = VariantProps<
  typeof searchComboResultItemVariants
>
