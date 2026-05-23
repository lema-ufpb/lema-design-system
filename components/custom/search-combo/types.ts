import { type HTMLAttributes, type ReactNode } from "react"

/**
 * Represents a single item in the search combo dropdown.
 */
export interface SearchComboItem {
  /** Unique identifier for the item. */
  id: string | number
  /** Display label for the item. */
  label: string
  /** Optional value (defaults to label if not provided). */
  value?: string
  /** Optional group name for grouping results under headers. */
  group?: string
  /** Optional icon rendered to the left of the label. */
  icon?: ReactNode
  /** Optional arbitrary data attached to the item. */
  data?: unknown
}

/**
 * Props for the SearchCombo component.
 */
export interface SearchComboProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onSelect" | "results"
> {
  /** The current value of the search input. */
  value: string
  /** Callback fired when the input value changes. */
  onChange: (value: string) => void
  /** Callback fired when search is submitted (Enter key or button click). */
  onSearch?: (value: string) => void
  /** Array of items to display in the dropdown. */
  options?: SearchComboItem[]
  /** Callback fired when a result item is selected. */
  onSelectResult?: (item: SearchComboItem) => void
  /** Placeholder text displayed when input is empty. */
  placeholder?: string
  /** Whether to show the search submit button. @default true */
  button?: boolean
  /** Whether the input has fully rounded (pill) corners. @default false */
  rounded?: boolean
  /** Size variant controlling height and font size. @default "md" */
  size?: "sm" | "md" | "lg"
  /** Whether to render in border/header mode with inverted background. @default false */
  border?: boolean
  /** Whether the input is disabled. @default false */
  disabled?: boolean
  /** Whether to show loading state with spinner. @default false */
  loading?: boolean
  /** Whether to auto-focus the input on mount. @default true */
  autoFocus?: boolean
  /** Accessible label for the search landmark. @default "Search" */
  label?: string
  /** Message displayed when input has value but no results match. @default "No results found." */
  emptyMessage?: string
  /** Whether to enable voice recognition. @default false */
  voice?: boolean
  /** Callback fired when voice recording starts. */
  onVoiceStart?: () => void
  /** Callback fired when voice recording ends. */
  onVoiceEnd?: () => void
  /** Callback fired when voice recognition encounters an error. */
  onVoiceError?: (error: string) => void
}
