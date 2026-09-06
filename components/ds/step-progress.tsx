"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export interface StepItem {
  id: string
  title: string
  description?: string
  icon?: ReactNode
}

export interface StepProgressProps
  extends
    Omit<HTMLAttributes<HTMLOListElement>, "onChange">,
    VariantProps<typeof stepProgressVariants> {
  steps: StepItem[]
  currentStepId: string
  onStepClick?: (id: string) => void
  size?: "sm" | "md" | "lg"
  locale?: UILocale
}

export interface StepProgressItemProps {
  step: StepItem
  index: number
  isLast: boolean
  status: "complete" | "current" | "upcoming"
  connectorStatus: "complete" | "current" | "upcoming"
  orientation: "horizontal" | "vertical"
  size: "sm" | "md" | "lg"
  onStepClick?: (id: string) => void
}

// ── Variants ───────────────────────────────────────────────────────────────

export const stepProgressVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row items-start",
      vertical: "flex-col",
    },
  },
  defaultVariants: { orientation: "horizontal" },
})

export const stepCircleVariants = cva(
  [
    "flex shrink-0 items-center justify-center rounded-full font-semibold transition-all duration-300 ease-out",
    "ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2",
  ],
  {
    variants: {
      status: {
        complete: [
          "border-2 border-primary bg-primary text-primary-foreground",
          "shadow-[0_0_0_4px_theme(colors.primary.DEFAULT/15%)]",
          "group-hover:scale-110 group-hover:shadow-[0_0_0_6px_theme(colors.primary.DEFAULT/20%)]",
        ],
        current: [
          "border-2 border-primary bg-background text-primary",
          "shadow-[0_0_0_4px_theme(colors.primary.DEFAULT/20%)]",
        ],
        upcoming: [
          "border-2 border-border bg-background text-muted-foreground",
        ],
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
    },
    defaultVariants: { status: "upcoming", size: "md" },
  }
)

export const stepConnectorVariants = cva(
  "block shrink-0 transition-all duration-500 ease-in-out",
  {
    variants: {
      orientation: {
        horizontal: "mt-0 h-0.5 w-full",
        vertical: "mx-auto mt-2 mb-2 min-h-6 w-0.5",
      },
      status: {
        complete: "bg-primary",
        current: "bg-gradient-to-r from-primary to-border",
        upcoming: "bg-border",
      },
    },
    compoundVariants: [
      {
        orientation: "vertical",
        status: "current",
        className: "bg-gradient-to-b from-primary to-border",
      },
    ],
    defaultVariants: { orientation: "horizontal", status: "upcoming" },
  }
)

export const stepTitleVariants = cva(
  "block leading-tight font-semibold transition-colors duration-200",
  {
    variants: {
      orientation: {
        horizontal: "mt-3 max-w-28 px-1 text-center text-xs",
        vertical: "ml-4 pt-1 text-start text-sm",
      },
      status: {
        complete: "text-foreground",
        current: "text-primary",
        upcoming: "text-muted-foreground",
      },
    },
    defaultVariants: { orientation: "horizontal", status: "upcoming" },
  }
)

export const stepDescriptionVariants = cva(
  "mt-0.5 block text-xs leading-snug text-muted-foreground",
  {
    variants: {
      orientation: {
        horizontal: "max-w-30 text-center",
        vertical: "ml-4 text-start",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
)

// ── Private subcomponents ──────────────────────────────────────────────────

const StepConnector = ({
  orientation,
  status,
}: {
  orientation: "horizontal" | "vertical"
  status: "complete" | "current" | "upcoming"
}) => (
  <span
    className={cn(stepConnectorVariants({ orientation, status }))}
    aria-hidden="true"
    data-slot="step-progress-step-connector"
  />
)

const StepProgressItem = ({
  step,
  index,
  isLast,
  status,
  connectorStatus,
  orientation,
  size,
  onStepClick,
}: StepProgressItemProps) => {
  const isInteractive = !!onStepClick
  const ItemWrapper = isInteractive ? "button" : "div"

  const content = (
    <div
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "flex-col items-center"
          : "w-full flex-row items-start"
      )}
    >
      <div className={cn("relative flex shrink-0 flex-col items-center")}>
        <div
          className={cn(stepCircleVariants({ status, size }), "z-10")}
          data-slot="step-progress-step-circle"
        >
          {status === "complete" && !step.icon ? (
            <Check
              className={cn(
                size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4"
              )}
            />
          ) : step.icon ? (
            <span className="text-current">{step.icon}</span>
          ) : (
            <span className="tabular-nums">{index + 1}</span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col",
          orientation === "horizontal" ? "items-center" : "items-start"
        )}
      >
        <span
          className={cn(stepTitleVariants({ orientation, status }))}
          data-slot="step-progress-step-title"
        >
          {step.title}
        </span>
        {step.description && (
          <span
            className={cn(stepDescriptionVariants({ orientation }))}
            data-slot="step-progress-step-description"
          >
            {step.description}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <>
      <li
        className={cn(
          "group relative flex",
          orientation === "horizontal"
            ? "flex-col items-center"
            : "w-full flex-col"
        )}
        data-slot="step-progress-step"
      >
        <ItemWrapper
          type={isInteractive ? "button" : undefined}
          onClick={isInteractive ? () => onStepClick?.(step.id) : undefined}
          className={cn(
            "rounded-lg transition-all outline-none",
            isInteractive &&
              "cursor-pointer hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            orientation === "vertical" && "w-full text-left"
          )}
          aria-current={status === "current" ? "step" : undefined}
        >
          {content}
        </ItemWrapper>

        {orientation === "vertical" && !isLast && (
          <div
            className={cn(
              "flex py-1",
              size === "sm" ? "ml-3.5" : size === "lg" ? "ml-5.5" : "ml-4.5"
            )}
          >
            <StepConnector orientation="vertical" status={connectorStatus} />
          </div>
        )}
      </li>

      {orientation === "horizontal" && !isLast && (
        <li
          role="presentation"
          className={cn(
            "flex min-w-8 flex-1 items-start",
            size === "sm" ? "pt-3.5" : size === "lg" ? "pt-5.5" : "pt-4.5"
          )}
          aria-hidden="true"
        >
          <StepConnector orientation="horizontal" status={connectorStatus} />
        </li>
      )}
    </>
  )
}

// ── StepProgress ───────────────────────────────────────────────────────────

export const StepProgress = ({
  steps,
  currentStepId,
  orientation = "horizontal",
  size,
  onStepClick,
  locale = "en-US",
  className,
  ...props
}: StepProgressProps) => {
  const currentStepIndex = React.useMemo(() => {
    const idx = steps.findIndex((s) => s.id === currentStepId)
    return idx === -1 ? 0 : idx
  }, [steps, currentStepId])

  if (!steps || steps.length === 0) return null

  return (
    <ol
      aria-label={UI_I18N[locale].stepProgress.label}
      className={cn(stepProgressVariants({ orientation }), className)}
      data-slot="step-progress"
      {...props}
    >
      {steps.map((step, index) => {
        const status: "complete" | "current" | "upcoming" =
          index < currentStepIndex
            ? "complete"
            : index === currentStepIndex
              ? "current"
              : "upcoming"

        const connectorStatus: "complete" | "current" | "upcoming" =
          index + 1 < currentStepIndex
            ? "complete"
            : index + 1 === currentStepIndex
              ? "current"
              : "upcoming"

        return (
          <StepProgressItem
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            status={status}
            connectorStatus={connectorStatus}
            orientation={orientation || "horizontal"}
            size={size || "md"}
            onStepClick={onStepClick}
          />
        )
      })}
    </ol>
  )
}

StepProgress.displayName = "StepProgress"
