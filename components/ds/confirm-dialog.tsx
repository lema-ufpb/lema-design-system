"use client"

import * as React from "react"
import { AlertTriangle, ShieldAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface ConfirmDialogProps {
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Callback fired on open change.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Dialog title heading.
   */
  title: React.ReactNode
  /**
   * Detailed explanation of what will be affected.
   */
  description: React.ReactNode
  /**
   * Target word user must type to unlock confirmation.
   */
  confirmWord?: string
  /**
   * Whether typed confirmation is enforced.
   */
  requireTyping?: boolean
  /**
   * Visual risk intent.
   */
  intent?: "destructive" | "warning"
  /**
   * Action executed upon confirmation.
   */
  onConfirm: () => void | Promise<void>
  /**
   * Action executed upon cancellation.
   */
  onCancel?: () => void
  /**
   * Custom label for confirm button.
   */
  confirmLabel?: string
  /**
   * Custom label for cancel button.
   */
  cancelLabel?: string
  /**
   * Optional custom trigger element.
   */
  trigger?: React.ReactNode
  /**
   * Localization locale.
   */
  locale?: UILocale
  /**
   * Extra styling on modal content.
   */
  className?: string
}

// ── Component ──

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmWord,
  requireTyping = true,
  intent = "destructive",
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  trigger,
  locale = "pt-BR",
  className,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  const [typedInput, setTypedInput] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const t = UI_I18N[locale].confirmDialog
  const targetWord = confirmWord ?? t.confirmWord

  const isMatched = !requireTyping || typedInput.trim() === targetWord

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setTypedInput("")
      setIsSubmitting(false)
    }
    setIsOpen?.(nextOpen)
  }

  const handleConfirm = async () => {
    if (!isMatched || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onConfirm()
      handleOpenChange(false)
    } catch {
      // Keep open on error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    handleOpenChange(false)
  }

  const resolvedConfirmLabel = confirmLabel ?? t.confirm
  const resolvedCancelLabel = cancelLabel ?? t.cancel

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                intent === "destructive"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-warning/10 text-warning"
              )}
            >
              {intent === "destructive" ? (
                <ShieldAlert className="size-5" />
              ) : (
                <AlertTriangle className="size-5" />
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <DialogTitle className="text-base leading-tight font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {requireTyping && (
          <div className="flex flex-col gap-2 pt-2">
            <label
              htmlFor="confirm-input"
              className="text-xs text-muted-foreground"
            >
              {t.typeToConfirm.replace("{word}", "")}{" "}
              <strong className="font-semibold text-foreground select-all">
                {targetWord}
              </strong>
            </label>
            <Input
              id="confirm-input"
              value={typedInput}
              disabled={isSubmitting}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={targetWord}
              className="h-9 font-mono text-sm"
              autoComplete="off"
            />
          </div>
        )}

        <DialogFooter className="gap-2 pt-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={handleCancel}
          >
            {resolvedCancelLabel}
          </Button>
          <Button
            type="button"
            variant={intent === "destructive" ? "destructive" : "default"}
            size="sm"
            disabled={!isMatched || isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-3.5" data-icon="inline-start" />
                <span>{resolvedConfirmLabel}</span>
              </>
            ) : (
              resolvedConfirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
