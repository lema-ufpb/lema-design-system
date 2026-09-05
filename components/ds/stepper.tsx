"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { StepProgress, type StepItem } from "./step-progress"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ── Types ──────────────────────────────────────────────────────────────────

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[]
  currentId: string
  onStepChange?: (id: string) => void
  orientation?: "horizontal" | "vertical"
  size?: "sm" | "md" | "lg"
}

// ── Component ──────────────────────────────────────────────────────────────

export function Stepper({ className, steps, currentId, onStepChange, orientation = "horizontal", size = "md", ...props }: StepperProps) {
  const idx = steps.findIndex((s) => s.id === currentId)

  return (
    <Card data-slot="stepper" className={cn("p-4", className)} {...props}>
      <StepProgress steps={steps} currentStepId={currentId} orientation={orientation} size={size} onStepClick={onStepChange} />
      <div className="mt-4 flex justify-between gap-2">
        <Button variant="ghost" size="sm" disabled={idx <= 0} onClick={() => onStepChange?.(steps[idx - 1]?.id)} className="rounded-full">
          Back
        </Button>
        <Button size="sm" disabled={idx === steps.length - 1} onClick={() => onStepChange?.(steps[idx + 1]?.id)} className="rounded-full">
          Next
        </Button>
      </div>
    </Card>
  )
}
