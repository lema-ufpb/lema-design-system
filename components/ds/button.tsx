"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button as ButtonRoot } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Types ──

export interface ButtonProps extends React.ComponentProps<typeof ButtonRoot> {
  /** Shows a spinner and disables the button. */
  loading?: boolean
  /** Text shown next to the spinner during loading. Defaults to children. */
  loadingText?: string
  /** Icon rendered before the button text. */
  startIcon?: React.ReactNode
  /** Icon rendered after the button text. */
  endIcon?: React.ReactNode
  /** Border radius. @default "full" */
  rounded?: "full" | "lg" | "md" | "none"
  /** Makes the button span the full width of its container. */
  fullWidth?: boolean
  /** Minimum interval (ms) between clicks — prevents accidental double-submits. */
  debounceMs?: number
  /** Two-step confirmation. First click shows `text`, second click fires `onClick`. */
  confirm?: { text: string; duration?: number }
  /** Shows a tooltip on hover. Pass a string or `{ text, side }`. */
  tooltip?:
    | string
    | { text: string; side?: "top" | "right" | "bottom" | "left" }
}

// ── CVA Variants ──

export const dsButtonVariants = cva("", {
  variants: {
    rounded: {
      full: "rounded-4xl",
      lg: "rounded-xl",
      md: "rounded-md",
      none: "rounded-none",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    rounded: "full",
  },
})

// ── Component ──

export function Button({
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  rounded,
  fullWidth,
  debounceMs,
  confirm,
  tooltip,
  disabled,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const [confirming, setConfirming] = React.useState(false)
  const confirmTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const lastClick = React.useRef(0)

  React.useEffect(() => {
    return () => {
      if (confirmTimer.current) clearTimeout(confirmTimer.current)
    }
  }, [])

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (debounceMs) {
        const now = Date.now()
        if (now - lastClick.current < debounceMs) return
        lastClick.current = now
      }

      if (confirm && !confirming) {
        setConfirming(true)
        confirmTimer.current = setTimeout(() => {
          setConfirming(false)
        }, confirm.duration ?? 3000)
        return
      }

      if (confirm && confirming) {
        setConfirming(false)
        if (confirmTimer.current) clearTimeout(confirmTimer.current)
      }

      onClick?.(e)
    },
    [confirm, confirming, debounceMs, onClick]
  )

  const resolvedTooltip =
    typeof tooltip === "string"
      ? { text: tooltip, side: "bottom" as const }
      : tooltip
        ? { text: tooltip.text, side: tooltip.side ?? ("bottom" as const) }
        : null

  const button = (
    <ButtonRoot
      disabled={disabled || loading || (confirm && confirming)}
      aria-busy={loading || undefined}
      data-slot="ds-button"
      data-confirming={confirming || undefined}
      className={cn(
        dsButtonVariants({ rounded, fullWidth }),
        loading && "cursor-wait",
        confirming && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <>
          <Spinner data-icon="inline-start" />
          {loadingText ?? children}
        </>
      ) : confirming && confirm ? (
        confirm.text
      ) : (
        <>
          {startIcon && <span data-icon="inline-start">{startIcon}</span>}
          {children}
          {endIcon && <span data-icon="inline-end">{endIcon}</span>}
        </>
      )}
    </ButtonRoot>
  )

  if (!resolvedTooltip) return button

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={resolvedTooltip.side}>
          <p>{resolvedTooltip.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
