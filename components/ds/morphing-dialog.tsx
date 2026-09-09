"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ── Types ──

export interface MorphingDialogProps {
  children: React.ReactNode
}

interface MorphingDialogContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  uniqueId: string
}

const MorphingDialogContext =
  React.createContext<MorphingDialogContextType | null>(null)

function useMorphingDialog() {
  const context = React.useContext(MorphingDialogContext)
  if (!context) {
    throw new Error(
      "MorphingDialog components must be used within a MorphingDialog provider"
    )
  }
  return context
}

// ── Context Provider ──

export function MorphingDialog({ children }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId()

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <MorphingDialogContext.Provider value={{ isOpen, setIsOpen, uniqueId }}>
      {children}
    </MorphingDialogContext.Provider>
  )
}

// ── Components ──

export const MorphingDialogTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { setIsOpen } = useMorphingDialog()

  return (
    <div
      ref={ref}
      className={cn("cursor-pointer", className)}
      onClick={() => setIsOpen(true)}
      {...props}
    >
      {children}
    </div>
  )
})
MorphingDialogTrigger.displayName = "MorphingDialogTrigger"

export const MorphingDialogContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useMorphingDialog()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 animate-in bg-black/40 backdrop-blur-sm duration-200 fade-in-0"
        onClick={() => setIsOpen(false)}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={ref}
          className={cn(
            "pointer-events-auto relative flex w-full max-w-lg animate-in flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl duration-200 fade-in-0 zoom-in-95 focus:outline-none",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </>
  )
})
MorphingDialogContainer.displayName = "MorphingDialogContainer"

export const MorphingDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
})
MorphingDialogTitle.displayName = "MorphingDialogTitle"

export const MorphingDialogSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
MorphingDialogSubtitle.displayName = "MorphingDialogSubtitle"

export const MorphingDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "animate-in text-sm text-muted-foreground duration-200 fade-in-0 slide-in-from-bottom-1",
        className
      )}
      {...props}
    />
  )
})
MorphingDialogDescription.displayName = "MorphingDialogDescription"

export const MorphingDialogImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt = "", ...props }, ref) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  )
})
MorphingDialogImage.displayName = "MorphingDialogImage"

export const MorphingDialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { setIsOpen } = useMorphingDialog()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      <XIcon className="size-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
})
MorphingDialogClose.displayName = "MorphingDialogClose"
