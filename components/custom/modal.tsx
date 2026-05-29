"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full"
export type ModalIntent =
  | "default"
  | "destructive"
  | "success"
  | "warning"
  | "info"

export interface ModalProps {
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Element that opens the modal when clicked */
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  /** Custom footer — replaces the auto-generated confirm/cancel buttons */
  footer?: React.ReactNode
  /** Custom icon — overrides the intent default icon */
  icon?: React.ReactNode
  /** Quick-wire confirm action. Supports async — tracks loading automatically */
  onConfirm?: () => void | Promise<void>
  /** Quick-wire cancel action. Called on cancel button click */
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  /** Manual loading override for the confirm button */
  confirmLoading?: boolean
  /** When true, wraps the confirm button in DialogClose so it closes after click */
  closeOnConfirm?: boolean
  size?: ModalSize
  intent?: ModalIntent
  /** Makes the body scrollable with a sticky header and footer */
  scrollable?: boolean
  /** Shows skeleton placeholders instead of children */
  loading?: boolean
  showCloseButton?: boolean
  locale?: UILocale
  /** Applied to the scrollable body wrapper (or directly to content when non-scrollable) */
  className?: string
}

// ── Variants ──

export const modalContentVariants = cva("w-full max-w-[calc(100%-2rem)]", {
  variants: {
    size: {
      sm: "sm:max-w-sm",
      md: "sm:max-w-lg",
      lg: "sm:max-w-2xl",
      xl: "sm:max-w-3xl",
      "2xl": "sm:max-w-5xl",
      full: "sm:max-w-[calc(100%-2rem)]",
    },
  },
  defaultVariants: { size: "md" },
})

export const modalIconWrapperVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      intent: {
        default: "hidden",
        destructive: "size-10 bg-destructive/10 text-destructive",
        success: "size-10 bg-success/10 text-success",
        warning: "size-10 bg-warning/10 text-warning",
        info: "size-10 bg-highlight-sky/10 text-highlight-sky",
      },
    },
    defaultVariants: { intent: "default" },
  }
)

export const modalHeaderVariants = cva("gap-2", {
  variants: {
    scrollable: {
      true: "shrink-0 border-b border-border px-6 pt-6 pb-4",
      false: "",
    },
  },
  defaultVariants: { scrollable: false },
})

export const modalBodyVariants = cva("", {
  variants: {
    scrollable: {
      true: "flex-1 overflow-y-auto px-6 py-4",
      false: "",
    },
  },
  defaultVariants: { scrollable: false },
})

export const modalFooterVariants = cva("", {
  variants: {
    scrollable: {
      true: "shrink-0 border-t border-border px-6 py-4",
      false: "",
    },
  },
  defaultVariants: { scrollable: false },
})

// ── Helpers ──

const skeletonLines: Record<ModalSize, string[]> = {
  sm: ["w-3/4", "w-1/2"],
  md: ["w-3/4", "w-full", "w-2/3"],
  lg: ["w-3/4", "w-full", "w-full", "w-1/2"],
  xl: ["w-3/4", "w-full", "w-full", "w-3/4", "w-1/2"],
  "2xl": ["w-3/4", "w-full", "w-full", "w-3/4", "w-1/2"],
  full: ["w-3/4", "w-full", "w-full", "w-3/4", "w-1/2"],
}

const intentIcons: Record<ModalIntent, React.ReactNode> = {
  default: null,
  destructive: <AlertCircleIcon />,
  success: <CheckCircle2Icon />,
  warning: <TriangleAlertIcon />,
  info: <InfoIcon />,
}

function getConfirmButtonProps(intent: ModalIntent): {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "secondary"
    | "link"
  className?: string
} {
  switch (intent) {
    case "destructive":
      return { variant: "destructive" }
    case "success":
      return {
        variant: "default",
        className: "bg-success text-success-foreground hover:bg-success/90",
      }
    case "warning":
      return {
        variant: "default",
        className: "bg-warning text-warning-foreground hover:bg-warning/90",
      }
    default:
      return { variant: "default" }
  }
}

// ── Component ──

export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  icon,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  confirmLoading,
  closeOnConfirm = false,
  size = "md",
  intent = "default",
  scrollable = false,
  loading = false,
  showCloseButton = true,
  locale = "en-US",
  className,
}: ModalProps) {
  const [internalLoading, setInternalLoading] = React.useState(false)
  const isConfirmLoading = confirmLoading ?? internalLoading

  const t = UI_I18N[locale].modal

  const handleConfirm = React.useCallback(async () => {
    if (!onConfirm) return
    const result = onConfirm()
    if (result instanceof Promise) {
      setInternalLoading(true)
      try {
        await result
      } finally {
        setInternalLoading(false)
      }
    }
  }, [onConfirm])

  const resolvedIcon = icon ?? intentIcons[intent]
  const hasIntent = intent !== "default"
  const hasHeader = Boolean(title || description || (hasIntent && resolvedIcon))
  const confirmButtonProps = getConfirmButtonProps(intent)

  const confirmButton = onConfirm && (
    <Button
      onClick={handleConfirm}
      disabled={isConfirmLoading}
      variant={confirmButtonProps.variant}
      className={confirmButtonProps.className}
    >
      {isConfirmLoading && (
        <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
      )}
      {confirmLabel ?? t.confirm}
    </Button>
  )

  const autoFooter =
    !footer && (onConfirm ?? onCancel) ? (
      <>
        {(onCancel ?? onConfirm) && (
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              {cancelLabel ?? t.cancel}
            </Button>
          </DialogClose>
        )}
        {closeOnConfirm ? (
          <DialogClose asChild>{confirmButton}</DialogClose>
        ) : (
          confirmButton
        )}
      </>
    ) : null

  const hasFooter = Boolean(footer ?? autoFooter)

  const headerSection = hasHeader && (
    <DialogHeader
      className={cn(
        modalHeaderVariants({ scrollable }),
        hasIntent && resolvedIcon && "flex-row items-start"
      )}
    >
      {hasIntent && resolvedIcon && (
        <div className={modalIconWrapperVariants({ intent })}>
          {resolvedIcon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
      </div>
    </DialogHeader>
  )

  const bodySection = (children || loading) && (
    <div
      className={cn(
        modalBodyVariants({ scrollable }),
        !scrollable && className
      )}
    >
      {loading ? (
        <div className="flex flex-col gap-3" aria-busy aria-live="polite">
          {skeletonLines[size].map((width, i) => (
            <Skeleton key={i} className={cn("h-4", width)} />
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  )

  const footerSection = hasFooter && (
    <DialogFooter className={modalFooterVariants({ scrollable })}>
      {footer ?? autoFooter}
    </DialogFooter>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        data-slot="modal"
        showCloseButton={showCloseButton}
        className={cn(
          modalContentVariants({ size }),
          scrollable && "flex max-h-[85dvh] flex-col gap-0 overflow-hidden p-0",
          scrollable && className
        )}
      >
        {headerSection}
        {bodySection}
        {footerSection}
      </DialogContent>
    </Dialog>
  )
}
