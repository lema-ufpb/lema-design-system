import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Target, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface MissionVisionCardsProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof missionVisionCardsVariants> {
  missionTitle?: string
  missionText?: string
  visionTitle?: string
  visionText?: string
  locale?: UILocale
}

// ── Variants ──

export const missionVisionCardsVariants = cva(
  "grid grid-cols-1 gap-6 md:grid-cols-2",
  {
    variants: {
      variant: {
        default: "",
        elevated: "[&>div]:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function MissionVisionCards({
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  locale = "en-US",
  variant,
  className,
  ...props
}: MissionVisionCardsProps) {
  const t = UI_I18N[locale]?.about ?? UI_I18N["en-US"].about

  const mTitle = missionTitle ?? t.mission
  const mText = missionText ?? t.missionDescription
  const vTitle = visionTitle ?? t.vision
  const vText = visionText ?? t.visionDescription

  return (
    <div
      className={cn(missionVisionCardsVariants({ variant }), className)}
      {...props}
    >
      {/* Mission Card */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-200 hover:border-primary/40">
        <div className="flex flex-col gap-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Target className="size-5" />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {mTitle}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {mText}
          </p>
        </div>
      </div>

      {/* Vision Card */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-200 hover:border-primary/40">
        <div className="flex flex-col gap-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Compass className="size-5" />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {vTitle}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {vText}
          </p>
        </div>
      </div>
    </div>
  )
}
