import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// ── Types ──

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The sidebar component to render */
  sidebar: React.ReactNode
  /** The global header/topbar */
  header?: React.ReactNode
  /** The main content */
  children: React.ReactNode
  /** Default state of the sidebar */
  defaultOpen?: boolean
}

// ── Variants ──

export const dashboardLayoutVariants = cva(
  "flex min-h-screen w-full flex-col bg-background",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const dashboardHeaderVariants = cva(
  "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4 md:px-6",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const dashboardMainVariants = cva(
  "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6",
  {
    variants: {},
    defaultVariants: {},
  }
)

// ── Component ──

export const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  DashboardLayoutProps
>(
  (
    { className, sidebar, header, children, defaultOpen = true, ...props },
    ref
  ) => {
    return (
      <SidebarProvider defaultOpen={defaultOpen}>
        {sidebar}
        <div
          ref={ref}
          className={cn(dashboardLayoutVariants(), className)}
          {...props}
        >
          <header className={dashboardHeaderVariants()}>
            <SidebarTrigger />
            {header && (
              <div className="flex flex-1 items-center gap-4">{header}</div>
            )}
          </header>
          <main className={dashboardMainVariants()}>{children}</main>
        </div>
      </SidebarProvider>
    )
  }
)
DashboardLayout.displayName = "DashboardLayout"
