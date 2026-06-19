"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Size = "sm" | "default" | "lg"
type Radius = "pill" | "rounded" | "square"
type Variant = "default" | "white"

const sizeConfig: Record<
  Size,
  { inputClass: string; buttonSize: "icon-xs" | "icon-sm" | "icon" }
> = {
  sm: { inputClass: "h-8 px-2.5 text-xs pr-7", buttonSize: "icon-xs" },
  default: { inputClass: "h-9 pr-9", buttonSize: "icon-sm" },
  lg: { inputClass: "h-10 px-4 text-base pr-10", buttonSize: "icon" },
}

const radiusConfig: Record<Radius, string> = {
  pill: "rounded-3xl",
  rounded: "rounded-lg",
  square: "rounded-none",
}

const variantConfig: Record<Variant, string> = {
  default: "",
  white: "bg-white border-border dark:bg-input/50",
}

interface PasswordInputProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "size"
> {
  size?: Size
  radius?: Radius
  variant?: Variant
  locale?: UILocale
}

function PasswordInput({
  className,
  size = "default",
  radius = "pill",
  variant = "default",
  locale = "en-US",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { inputClass, buttonSize } = sizeConfig[size]

  return (
    <div className="relative" data-slot="input-password">
      <Input
        type={showPassword ? "text" : "password"}
        data-slot="input-password-input"
        className={cn(
          inputClass,
          radiusConfig[radius],
          variantConfig[variant],
          className
        )}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size={buttonSize}
        data-slot="input-password-toggle"
        className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={() => setShowPassword((v) => !v)}
        tabIndex={-1}
        aria-label={
          showPassword
            ? UI_I18N[locale].inputPassword.hide
            : UI_I18N[locale].inputPassword.show
        }
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}

export { PasswordInput }
