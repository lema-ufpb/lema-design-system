"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Drawer as DrawerPrimitive } from "vaul"
import {
  Drawer as DrawerRoot,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

export type DrawerDirection = "bottom" | "left" | "right" | "top"

export interface DrawerProps {
  direction?: DrawerDirection
  title?: React.ReactNode
  description?: React.ReactNode
  trigger?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  showCloseButton?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function Drawer({
  direction = "bottom",
  title,
  description,
  trigger,
  footer,
  children,
  showCloseButton = true,
  open,
  onOpenChange,
  className,
}: DrawerProps) {
  const isHorizontal = direction === "left" || direction === "right"
  const hasHeader = Boolean(title || description)

  return (
    <DrawerRoot
      direction={direction === "bottom" ? undefined : direction}
      open={open}
      onOpenChange={onOpenChange}
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
          data-slot="drawer-ui"
          className={cn(
            "group/drawer fixed z-50 flex flex-col",
            "bg-popover text-popover-foreground",
            "border border-border shadow-2xl outline-none",
            // Bottom
            "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
            "data-[vaul-drawer-direction=bottom]:h-auto data-[vaul-drawer-direction=bottom]:max-h-[80vh]",
            "data-[vaul-drawer-direction=bottom]:rounded-t-2xl",
            // Top
            "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
            "data-[vaul-drawer-direction=top]:h-auto data-[vaul-drawer-direction=top]:max-h-[80vh]",
            "data-[vaul-drawer-direction=top]:rounded-b-2xl",
            // Left
            "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
            "data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm",
            "data-[vaul-drawer-direction=left]:rounded-r-2xl",
            // Right
            "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
            "data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm",
            "data-[vaul-drawer-direction=right]:rounded-l-2xl"
          )}
        >
          {/* Drag handle — bottom drawer only */}
          <div
            aria-hidden
            className="mx-auto mt-3 hidden h-1.5 w-14 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer:block"
          />

          {/* Inner layout wrapper */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {(hasHeader || showCloseButton) && (
              <DrawerHeader className="shrink-0 text-left">
                <div className="flex items-center gap-2">
                  {title && (
                    <DrawerTitle className="flex-1">{title}</DrawerTitle>
                  )}
                  {showCloseButton && (
                    <DrawerClose
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full",
                        "bg-secondary/80 text-muted-foreground backdrop-blur-sm",
                        "ring-offset-background transition-all",
                        "hover:bg-secondary hover:text-foreground",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                      )}
                    >
                      <X className="size-3.5" />
                      <span className="sr-only">Fechar</span>
                    </DrawerClose>
                  )}
                </div>
                {description && (
                  <DrawerDescription>{description}</DrawerDescription>
                )}
              </DrawerHeader>
            )}

            <div
              className={cn(
                "no-scrollbar min-h-0 flex-1 overflow-y-auto px-4",
                hasHeader || showCloseButton ? "pb-4" : "py-4",
                !hasHeader && !showCloseButton && "pt-4",
                className
              )}
            >
              {children}
            </div>

            {footer && (
              <DrawerFooter
                className={cn(
                  "mt-0 shrink-0 border-t border-border",
                  isHorizontal ? "flex-col gap-2" : "flex-row justify-end gap-2"
                )}
              >
                {footer}
              </DrawerFooter>
            )}
          </div>

          {/* Drag handle — top drawer only (at bottom of panel) */}
          <div
            aria-hidden
            className="mx-auto mb-3 hidden h-1.5 w-14 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=top]/drawer:block"
          />
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </DrawerRoot>
  )
}
