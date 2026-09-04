"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ── Types ──

export type CopyBlockSize = "sm" | "md" | "lg"

export interface CopyBlockProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof copyBlockVariants> {
  /**
   * The text to display and copy.
   */
  value: string
  /**
   * Defines the size of the block.
   */
  size?: CopyBlockSize
  /**
   * Whether the text should truncate if it exceeds the container width.
   * If false, it will wrap to the next line.
   */
  truncate?: boolean
  /**
   * Localization for the tooltip texts.
   */
  locale?: UILocale
}

// ── Variants ──

export const copyBlockVariants = cva(
  "flex w-full items-center justify-between gap-3 overflow-hidden rounded-md border border-border bg-muted",
  {
    variants: {
      size: {
        sm: "min-h-8 py-1 pr-1 pl-3",
        md: "min-h-10 py-1.5 pr-1.5 pl-4",
        lg: "min-h-12 py-2 pr-2 pl-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const copyBlockTextVariants = cva("font-mono text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    truncate: {
      true: "truncate",
      false: "break-all",
    },
  },
  defaultVariants: {
    size: "md",
    truncate: false,
  },
})

// ── Component ──

export const CopyBlock = React.forwardRef<HTMLDivElement, CopyBlockProps>(
  (
    {
      value,
      size = "md",
      truncate = false,
      locale = "pt-BR",
      className,
      ...props
    },
    ref
  ) => {
    const [hasCopied, setHasCopied] = React.useState(false)

    const { copy: copyLabel, copied: copiedLabel } = UI_I18N[locale].copyBlock

    const onCopy = React.useCallback(() => {
      if (!value) return
      navigator.clipboard.writeText(value).then(() => {
        setHasCopied(true)
        setTimeout(() => {
          setHasCopied(false)
        }, 2000)
      })
    }, [value])

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"
    const buttonSize =
      size === "sm" ? "icon-xs" : size === "lg" ? "icon" : "icon-sm"

    return (
      <div
        ref={ref}
        className={cn(copyBlockVariants({ size }), className)}
        {...props}
      >
        <span className={cn(copyBlockTextVariants({ size, truncate }))}>
          {value}
        </span>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={buttonSize}
                className="shrink-0"
                onClick={onCopy}
                aria-label={hasCopied ? copiedLabel : copyLabel}
              >
                {hasCopied ? (
                  <CheckIcon
                    className={cn(iconSize, "text-success")}
                    aria-hidden="true"
                  />
                ) : (
                  <CopyIcon
                    className={cn(iconSize, "text-muted-foreground")}
                    aria-hidden="true"
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasCopied ? copiedLabel : copyLabel}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
)
CopyBlock.displayName = "CopyBlock"
