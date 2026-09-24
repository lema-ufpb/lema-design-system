"use client"

import * as React from "react"
import { Sparkles, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface FeatureSpotlightProps {
  /**
   * The element to anchor the spotlight to.
   */
  children: React.ReactNode
  /**
   * Title of highlighted feature.
   */
  title: React.ReactNode
  /**
   * Description explaining the feature.
   */
  description: React.ReactNode
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Open state change callback.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Current step number in a tour.
   */
  step?: number
  /**
   * Total steps in tour.
   */
  totalSteps?: number
  /**
   * Next step callback.
   */
  onNext?: () => void
  /**
   * Previous step callback.
   */
  onPrevious?: () => void
  /**
   * Dismiss callback.
   */
  onDismiss?: () => void
  /**
   * Popover placement side.
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * Popover alignment.
   */
  align?: "start" | "center" | "end"
  /**
   * Whether to render a pulsing beacon ring on the target.
   */
  showBeacon?: boolean
  /**
   * Localization locale.
   */
  locale?: UILocale
  /**
   * Content box custom classes.
   */
  className?: string
}

// ── Component ──

export function FeatureSpotlight({
  children,
  title,
  description,
  open,
  onOpenChange,
  step,
  totalSteps,
  onNext,
  onPrevious,
  onDismiss,
  side = "bottom",
  align = "start",
  showBeacon = true,
  locale: localeProp,
  className,
}: FeatureSpotlightProps) {
  const locale = useUILocale(localeProp)
  const [internalOpen, setInternalOpen] = React.useState(true)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  const t = UI_I18N[locale].featureSpotlight

  const isLastStep = !totalSteps || !step ? true : step === totalSteps

  const handleDismiss = () => {
    onDismiss?.()
    setIsOpen?.(false)
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else {
      setIsOpen?.(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAnchor asChild>
        <div className="relative inline-flex items-center">
          {children}
          {showBeacon && isOpen && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-primary" />
            </span>
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={8}
        aria-label={typeof title === "string" ? title : "Feature Spotlight"}
        className={cn(
          "z-50 flex w-80 flex-col gap-3 rounded-xl border border-border bg-popover p-4 shadow-lg",
          className
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="size-4 shrink-0" />
            <h4 className="text-sm leading-tight font-semibold text-foreground">
              {title}
            </h4>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            aria-label={t.dismiss}
            className="-mt-1 -mr-1 size-6 shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </Button>
        </div>

        <div className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-1">
          {step && totalSteps ? (
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {t.step} {step} {t.of} {totalSteps}
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5">
            {step && step > 1 && onPrevious && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                className="h-7 px-2 text-xs"
              >
                {t.previous}
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={handleNext}
              className="h-7 px-3 text-xs"
            >
              {isLastStep ? t.gotIt : t.next}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
