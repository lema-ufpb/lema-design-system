"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// ── Types ──

export interface OTPInputProps
  extends
    Omit<React.ComponentProps<typeof InputOTP>, "size" | "render">,
    VariantProps<typeof otpInputSlotVariants> {
  loading?: boolean
  invalid?: boolean
}

// ── Variants ──

export const otpInputSlotVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ── Component ──

export const DsOtpInput = React.forwardRef<
  React.ElementRef<typeof InputOTP>,
  OTPInputProps
>(
  (
    {
      size = "md",
      loading = false,
      invalid = false,
      maxLength = 6,
      className,
      ...props
    },
    ref
  ) => {
    if (loading) {
      const slots = Array.from({ length: maxLength })
      return (
        <div className={cn("flex items-center gap-2", className)}>
          {slots.map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "rounded-md",
                size === "sm"
                  ? "h-8 w-8"
                  : size === "lg"
                    ? "h-12 w-12"
                    : "h-10 w-10"
              )}
            />
          ))}
        </div>
      )
    }

    const slotsArray = Array.from({ length: maxLength })

    return (
      <InputOTP
        ref={ref}
        maxLength={maxLength}
        containerClassName={cn(className)}
        {...props}
      >
        <InputOTPGroup className={cn(invalid && "aria-invalid")}>
          {slotsArray.map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                otpInputSlotVariants({ size }),
                invalid && "aria-invalid"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    )
  }
)
DsOtpInput.displayName = "DsOtpInput"
