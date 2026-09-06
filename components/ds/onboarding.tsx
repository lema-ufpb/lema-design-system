"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface OnboardingStep {
  title: string
  description?: string
}

export interface OnboardingProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: OnboardingStep[]
  current?: number
  onNext?: () => void
  onSkip?: () => void
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Onboarding({
  className,
  steps,
  current = 0,
  onNext,
  onSkip,
  loading = false,
  ...props
}: OnboardingProps) {
  if (loading) {
    return (
      <Card
        data-slot="onboarding-skeleton"
        className={cn("p-6", className)}
        {...props}
      >
        <Skeleton className="h-32 w-full" />
      </Card>
    )
  }

  const step = steps[current]
  const progress = ((current + 1) / steps.length) * 100

  return (
    <Card data-slot="onboarding" className={cn("p-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <Progress
          value={progress}
          aria-label={`Step ${current + 1} of ${steps.length}`}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1"
        />
        <span className="text-xs text-muted-foreground tabular-nums">
          Step {current + 1} of {steps.length}
        </span>
        <h3 className="text-base font-semibold text-foreground">
          {step?.title}
        </h3>
        {step?.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        )}
        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="rounded-full"
          >
            Skip
          </Button>
          <Button size="sm" onClick={onNext} className="ml-auto rounded-full">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
