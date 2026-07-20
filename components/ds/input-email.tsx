import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type Size = "sm" | "default" | "lg"
type Radius = "pill" | "rounded" | "square"
type Variant = "default" | "white" | "muted"

const sizeConfig: Record<Size, { inputClass: string; iconClass: string }> = {
  sm: { inputClass: "h-8 px-2.5 text-xs pr-7", iconClass: "right-2 size-3.5" },
  default: { inputClass: "h-9 pr-9", iconClass: "right-3 size-4" },
  lg: { inputClass: "h-10 px-4 text-base pr-11", iconClass: "right-4 size-4" },
}

const radiusConfig: Record<Radius, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-none",
}

const variantConfig: Record<Variant, string> = {
  default: "bg-input/50",
  white: "bg-white border-border",
  muted: "bg-muted",
}

interface EmailInputProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "size"
> {
  size?: Size
  radius?: Radius
  variant?: Variant
}

function EmailInput({
  className,
  size = "default",
  radius = "pill",
  variant = "default",
  ...props
}: EmailInputProps) {
  const { inputClass, iconClass } = sizeConfig[size]

  return (
    <div className="relative" data-slot="input-email">
      <Input
        type="email"
        data-slot="input-email-input"
        className={cn(
          inputClass,
          radiusConfig[radius],
          variantConfig[variant],
          className
        )}
        {...props}
      />
      <Mail
        data-slot="input-email-icon"
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
          iconClass
        )}
      />
    </div>
  )
}

export { EmailInput }
