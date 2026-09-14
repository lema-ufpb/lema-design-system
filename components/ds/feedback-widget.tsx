"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  MessageSquareIcon,
  XIcon,
  SendIcon,
  CheckIcon,
  SmileIcon,
  MehIcon,
  FrownIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export const feedbackWidgetVariants = cva(
  "fixed z-50 flex flex-col gap-4 shadow-2xl ring-1 ring-black/5 transition-all",
  {
    variants: {
      position: {
        br: "right-4 bottom-4 sm:right-6 sm:bottom-6",
        bl: "bottom-4 left-4 sm:bottom-6 sm:left-6",
      },
    },
    defaultVariants: {
      position: "br",
    },
  }
)

export interface FeedbackWidgetProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit">,
    VariantProps<typeof feedbackWidgetVariants> {
  onSubmit?: (data: { rating: number; text: string }) => Promise<void> | void
  intent?: "default" | "primary"
}

export const FeedbackWidget = React.forwardRef<
  HTMLDivElement,
  FeedbackWidgetProps
>(({ className, position, intent = "primary", onSubmit, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [rating, setRating] = React.useState<number | null>(null)
  const [text, setText] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit({ rating, text })
      } else {
        await new Promise((r) => setTimeout(r, 1000))
      }
      setIsSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setTimeout(() => {
          setIsSuccess(false)
          setRating(null)
          setText("")
        }, 300)
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <div
      className={cn(
        "fixed z-50",
        position === "bl"
          ? "bottom-4 left-4 sm:bottom-6 sm:left-6"
          : "right-4 bottom-4 sm:right-6 sm:bottom-6",
        className
      )}
      {...props}
      ref={ref}
    >
      {!isOpen ? (
        <div className="animate-in duration-300 fade-in-0 zoom-in-50">
          <Button
            variant={intent === "primary" ? "default" : "secondary"}
            size="icon"
            className={cn(
              "size-12 rounded-full shadow-lg sm:size-14",
              intent === "primary" &&
                "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => setIsOpen(true)}
            aria-label="Open feedback"
            aria-expanded="false"
          >
            <MessageSquareIcon className="size-5 sm:size-6" />
          </Button>
        </div>
      ) : (
        <div
          className="w-[calc(100vw-2rem)] origin-bottom-right animate-in overflow-hidden rounded-2xl border bg-background shadow-2xl duration-300 fade-in-0 zoom-in-95 slide-in-from-bottom-2 sm:w-[360px]"
          role="dialog"
          aria-label="Feedback form"
        >
          {isSuccess ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex size-16 animate-in items-center justify-center rounded-full bg-success/20 text-success duration-300 zoom-in-50">
                <CheckIcon className="size-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Thank you!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us improve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Send Feedback</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full text-muted-foreground hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close feedback"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  How was your experience?
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={rating === 1 ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "size-12 flex-1 rounded-xl hover:bg-muted",
                      rating === 1 &&
                        "text-destructive-foreground hover:text-destructive-foreground bg-destructive hover:bg-destructive/90"
                    )}
                    onClick={() => setRating(1)}
                    aria-label="Bad"
                    aria-pressed={rating === 1}
                  >
                    <FrownIcon className="size-6" />
                  </Button>
                  <Button
                    type="button"
                    variant={rating === 2 ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "size-12 flex-1 rounded-xl hover:bg-muted",
                      rating === 2 &&
                        "bg-warning text-warning-foreground hover:bg-warning/90 hover:text-warning-foreground"
                    )}
                    onClick={() => setRating(2)}
                    aria-label="Neutral"
                    aria-pressed={rating === 2}
                  >
                    <MehIcon className="size-6" />
                  </Button>
                  <Button
                    type="button"
                    variant={rating === 3 ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "size-12 flex-1 rounded-xl hover:bg-muted",
                      rating === 3 &&
                        "bg-success text-success-foreground hover:bg-success/90 hover:text-success-foreground"
                    )}
                    onClick={() => setRating(3)}
                    aria-label="Good"
                    aria-pressed={rating === 3}
                  >
                    <SmileIcon className="size-6" />
                  </Button>
                </div>
              </div>

              {rating && (
                <div className="mb-4 animate-in overflow-hidden duration-200 fade-in-0 slide-in-from-top-1">
                  <Textarea
                    placeholder="Tell us more about it..."
                    className="min-h-[100px] resize-none text-sm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              <div className="mt-auto flex justify-end">
                <Button
                  type="submit"
                  disabled={!rating || isSubmitting}
                  className={cn(
                    "w-full transition-all sm:w-auto",
                    intent === "primary" && "bg-primary text-primary-foreground"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex animate-in items-center gap-2 fade-in-0">
                      <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Feedback
                      <SendIcon className="size-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
})
FeedbackWidget.displayName = "FeedbackWidget"
