"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type IconButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>

type IconButtonSize = "icon-xs" | "icon-sm" | "icon" | "icon-lg"

type IconButtonRounded = "none" | "md" | "full"

const roundedClass: Record<IconButtonRounded, string> = {
  none: "rounded-none",
  md: "rounded-md",
  full: "rounded-full",
}

export interface IconButtonProps extends Omit<
  React.ComponentProps<"button">,
  "children"
> {
  /** The icon to display. Typically a lucide icon. */
  icon: React.ReactNode
  /** Accessible label. Used as aria-label and default tooltip text. */
  label: string
  /** Tooltip text. Defaults to `label`. Pass `false` to disable the tooltip. */
  tooltip?: string | false
  /** Side the tooltip appears on. @default "bottom" */
  tooltipSide?: "top" | "right" | "bottom" | "left"
  /** Visual variant. @default "ghost" */
  variant?: IconButtonVariant
  /** Button size. @default "icon" */
  size?: IconButtonSize
  /** Border radius. @default "md" */
  rounded?: IconButtonRounded
  /** Shows a spinner and disables interaction. */
  loading?: boolean
}

export function IconButton({
  icon,
  label,
  tooltip,
  tooltipSide = "bottom",
  variant = "ghost",
  size = "icon",
  rounded = "md",
  loading = false,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  const showTooltip = tooltip !== false
  const tooltipText = tooltip === undefined ? label : tooltip

  const button = (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(roundedClass[rounded], loading && "cursor-wait", className)}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" /> : icon}
    </Button>
  )

  if (!showTooltip) return button

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={tooltipSide}>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
