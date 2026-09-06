"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface WizardStep {
  id: string
  title: string
  content: React.ReactNode
}

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStep[]
  currentId?: string
  onStepChange?: (id: string) => void
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function Wizard({
  className,
  steps,
  currentId,
  onStepChange,
  loading = false,
  ...props
}: WizardProps) {
  const [current, setCurrent] = React.useState(currentId ?? steps[0]?.id)
  const resolved = currentId ?? current

  const idx = steps.findIndex((s) => s.id === resolved)
  const progress = ((idx + 1) / steps.length) * 100

  const handleChange = (id: string) => {
    if (!currentId) setCurrent(id)
    onStepChange?.(id)
  }

  if (loading) {
    return (
      <Card
        data-slot="wizard-skeleton"
        className={cn("p-6", className)}
        {...props}
      >
        <Skeleton className="h-40 w-full" />
      </Card>
    )
  }

  const step = steps[idx]

  return (
    <Card data-slot="wizard" className={cn("p-6", className)} {...props}>
      <div className="flex flex-col gap-4">
        <Progress value={progress} className="h-1" />
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleChange(s.id)}
              className={cn(
                "h-7 rounded-full px-3 text-xs font-medium",
                s.id === resolved
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
              aria-current={s.id === resolved ? "step" : undefined}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </div>
        <div className="rounded-xl border bg-muted/20 p-4">{step?.content}</div>
        <div className="flex justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={idx === 0}
            onClick={() => handleChange(steps[idx - 1]?.id)}
            className="rounded-full"
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={idx === steps.length - 1}
            onClick={() => handleChange(steps[idx + 1]?.id)}
            className="rounded-full"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
