"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

// ── Types ──

export interface VideoDialogProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof videoDialogVariants> {
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  title?: string
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9"
  locale?: UILocale
}

// ── Variants ──

export const videoDialogVariants = cva(
  "group relative cursor-pointer overflow-hidden rounded-xl border border-border/60 transition-all duration-300 hover:border-border",
  {
    variants: {
      variant: {
        default: "shadow-md hover:shadow-xl",
        minimal: "shadow-none",
        glow: "shadow-[0_0_24px_oklch(var(--primary)/0.2)] hover:shadow-[0_0_36px_oklch(var(--primary)/0.35)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const playButtonVariants = cva(
  "relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
  {
    variants: {
      variant: {
        default: "size-14 bg-primary text-primary-foreground shadow-lg",
        minimal:
          "size-12 bg-background/80 text-foreground shadow-md backdrop-blur-sm",
        glow: "size-16 bg-primary text-primary-foreground shadow-[0_0_20px_oklch(var(--primary)/0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export const VideoDialog = React.forwardRef<HTMLDivElement, VideoDialogProps>(
  (
    {
      className,
      videoSrc,
      thumbnailSrc,
      thumbnailAlt = "Video preview",
      title,
      aspectRatio = "16/9",
      variant = "default",
      locale: localeProp,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [open, setOpen] = React.useState(false)
    const t = UI_I18N[locale]?.videoDialog ?? UI_I18N["en-US"].videoDialog
    const label = title ? `${t.playVideo}: ${title}` : t.playVideo

    const aspectClasses = {
      "16/9": "aspect-video",
      "4/3": "aspect-4/3",
      "1/1": "aspect-square",
      "21/9": "aspect-21/9",
    }[aspectRatio]

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            ref={ref}
            role="button"
            tabIndex={0}
            aria-label={label}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setOpen(true)
              }
            }}
            className={cn(
              videoDialogVariants({ variant }),
              aspectClasses,
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              className
            )}
            {...props}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/30 transition-colors duration-300 group-hover:bg-foreground/40" />

            {/* Pulsing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {variant === "glow" && (
                  <span className="absolute size-full animate-ping rounded-full bg-primary/40 opacity-75" />
                )}
                <div className={cn(playButtonVariants({ variant }))}>
                  <PlayIcon
                    className="size-6 translate-x-0.5 fill-current"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl overflow-hidden border-border/60 bg-card/90 p-1 sm:rounded-2xl">
          <DialogTitle className="sr-only">{title || label}</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            {open && (
              <iframe
                src={videoSrc}
                title={title || label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)
VideoDialog.displayName = "VideoDialog"
