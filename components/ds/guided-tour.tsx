"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface TourStep {
  id: string
  title: string
  content: React.ReactNode
}

export interface GuidedTourProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TourStep[]
  currentStep: number
  onNext: () => void
  onPrev?: () => void
  onSkip?: () => void
  onFinish?: () => void
  locale?: UILocale
}

// ── Component ──

export const GuidedTour = React.forwardRef<HTMLDivElement, GuidedTourProps>(
  (
    {
      className,
      steps,
      currentStep,
      onNext,
      onPrev,
      onSkip,
      onFinish,
      locale = "pt-BR",
      ...props
    },
    ref
  ) => {
    const i18n = UI_I18N[locale].guidedTour
    const step = steps[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onSkip?.()
      }
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }, [onSkip])

    if (!step) return null

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-80 flex-col rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg",
          className
        )}
        data-slot="ds-guided-tour"
        role="dialog"
        aria-modal="true"
        aria-label={step.title}
        aria-live="polite"
        tabIndex={-1}
        {...props}
      >
        <div className="mb-2 flex items-center justify-between gap-4">
          <h4 className="font-semibold">{step.title}</h4>
          {onSkip && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6 shrink-0 text-muted-foreground"
              onClick={onSkip}
              aria-label={i18n.skip}
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>

        <div className="mb-6 text-sm text-muted-foreground">{step.content}</div>

        <div className="mt-auto flex items-center justify-between">
          <span className="sr-only" aria-live="polite">
            {`Step ${currentStep + 1} of ${steps.length}`}
          </span>
          <div
            className="flex gap-1"
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-label={step.title}
          >
            {steps.map((s, index) => (
              <span
                key={s.id}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  index === currentStep
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!isFirstStep && onPrev && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPrev}
                className="h-7 text-xs"
              >
                {i18n.previous}
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={isLastStep ? onFinish : onNext}
              className="h-7 text-xs"
            >
              {isLastStep ? i18n.finish : i18n.next}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
GuidedTour.displayName = "GuidedTour"
