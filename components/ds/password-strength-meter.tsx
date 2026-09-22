"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface PasswordCriterion {
  id: string
  label: string
  met: boolean
}

export interface PasswordStrengthMeterProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof passwordStrengthMeterVariants> {
  password?: string
  showChecklist?: boolean
  minLength?: number
  locale?: UILocale
}

// ── Variants ──

export const passwordStrengthMeterVariants = cva("flex w-full flex-col gap-2", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Helpers ──

export function evaluatePassword(password: string, minLength = 8) {
  const hasLength = password.length >= minLength
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  let score = 0
  if (hasLength) score += 1
  if (hasUpper) score += 1
  if (hasNumber) score += 1
  if (hasSpecial) score += 1

  return {
    score, // 0 to 4
    criteria: [
      { id: "length", met: hasLength },
      { id: "upper", met: hasUpper },
      { id: "number", met: hasNumber },
      { id: "special", met: hasSpecial },
    ],
  }
}

// ── Component ──

export const PasswordStrengthMeter = React.forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(
  (
    {
      className,
      password = "",
      showChecklist = true,
      minLength = 8,
      size = "md",
      locale = "en-US",
      ...props
    },
    ref
  ) => {
    const t = UI_I18N[locale]?.auth ?? UI_I18N["en-US"].auth
    const { score, criteria } = evaluatePassword(password, minLength)

    const levelConfig = [
      { label: "", color: "bg-muted" },
      { label: t.passwordStrengthWeak, color: "bg-destructive" },
      { label: t.passwordStrengthMedium, color: "bg-warning" },
      { label: t.passwordStrengthStrong, color: "bg-primary" },
      { label: t.passwordStrengthVeryStrong, color: "bg-success" },
    ][score]

    const criteriaLabels: Record<string, string> = {
      length: `${t.ruleLength} (${minLength})`,
      upper: t.ruleUppercase,
      number: t.ruleNumber,
      special: t.ruleSpecial,
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(passwordStrengthMeterVariants({ size }), className)}
        {...props}
      >
        {/* Progress Bars */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              {t.password}
            </span>
            {password.length > 0 && (
              <span className="font-semibold text-foreground">
                {levelConfig.label}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
            {[1, 2, 3, 4].map((step) => {
              const isActive = score >= step
              return (
                <div
                  key={step}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    isActive ? levelConfig.color : "bg-muted"
                  )}
                />
              )
            })}
          </div>
        </div>

        {/* Requirements Checklist */}
        {showChecklist && (
          <ul className="flex flex-col gap-1 pt-1" role="list">
            {criteria.map((item) => {
              const label = criteriaLabels[item.id] || item.id
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-center gap-2 text-xs transition-colors",
                    item.met ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {item.met ? (
                    <CheckIcon
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <XIcon
                      className="size-3.5 shrink-0 opacity-40"
                      aria-hidden="true"
                    />
                  )}
                  <span>{label}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
PasswordStrengthMeter.displayName = "PasswordStrengthMeter"
