"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeaderProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  /** Makes header stick to top */
  sticky?: boolean
  /** Show border bottom */
  bordered?: boolean
  locale?: UILocale
  /** Skip link target id */
  skipLinkTarget?: string
}

export interface HeaderContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerContainerVariants> {}

// ── Variants ───────────────────────────────────────────────────────────────

export const headerVariants = cva(
  "relative w-full border-border bg-background",
  {
    variants: {
      variant: {
        default: "border-b",
        blurred:
          "border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        transparent: "border-transparent bg-transparent",
        solid: "border-b bg-card shadow-sm",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export const headerContainerVariants = cva(
  "mx-auto flex w-full max-w-7xl items-center justify-between gap-4",
  {
    variants: {
      size: {
        sm: "h-14 px-4",
        md: "h-16 px-4 sm:px-6",
        lg: "h-20 px-4 sm:px-6 lg:px-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ── Context ────────────────────────────────────────────────────────────────

type HeaderContextValue = {
  size: "sm" | "md" | "lg"
}

const HeaderContext = React.createContext<HeaderContextValue>({
  size: "md",
})

export function useHeaderContext() {
  return React.useContext(HeaderContext)
}

// ── Component ──────────────────────────────────────────────────────────────

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      sticky = true,
      bordered = true,
      locale = "en-US",
      skipLinkTarget = "main-content",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <HeaderContext.Provider value={{ size: size ?? "md" }}>
        <header
          ref={ref}
          data-slot="header"
          data-variant={variant}
          data-size={size}
          role="banner"
          className={cn(
            headerVariants({ variant, size }),
            sticky && "sticky top-0 z-40",
            !bordered && "border-transparent",
            className
          )}
          {...props}
        >
          <a
            href={`#${skipLinkTarget}`}
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {UI_I18N[locale].header.skipToContent}
          </a>
          {children}
        </header>
      </HeaderContext.Provider>
    )
  }
)
Header.displayName = "Header"

export const HeaderContainer = React.forwardRef<
  HTMLDivElement,
  HeaderContainerProps
>(({ className, size, children, ...props }, ref) => {
  const ctx = useHeaderContext()
  const resolvedSize = size ?? ctx.size
  return (
    <div
      ref={ref}
      data-slot="header-container"
      className={cn(headerContainerVariants({ size: resolvedSize }), className)}
      {...props}
    >
      {children}
    </div>
  )
})
HeaderContainer.displayName = "HeaderContainer"
