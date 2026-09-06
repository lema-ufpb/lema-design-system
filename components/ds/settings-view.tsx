import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ── Types ──

export interface SettingsSection {
  id: string
  title: string
  content: React.ReactNode
}

export interface SettingsViewProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  sections: SettingsSection[]
  defaultSection?: string
}

// ── Variants ──

export const settingsContainerVariants = cva("flex flex-col gap-6 md:gap-8", {
  variants: {},
  defaultVariants: {},
})

export const settingsHeaderVariants = cva(
  "flex flex-col gap-1 border-b border-border pb-6",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const settingsTitleVariants = cva(
  "text-2xl font-semibold tracking-tight text-foreground",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const settingsDescVariants = cva("text-sm text-muted-foreground", {
  variants: {},
  defaultVariants: {},
})

export const settingsLayoutVariants = cva(
  "flex flex-col gap-8 md:flex-row md:items-start",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const settingsSidebarVariants = cva("w-full shrink-0 md:w-64", {
  variants: {},
  defaultVariants: {},
})

export const settingsContentVariants = cva("max-w-4xl flex-1", {
  variants: {},
  defaultVariants: {},
})

// ── Component ──

export const SettingsView = React.forwardRef<HTMLDivElement, SettingsViewProps>(
  (
    { className, title, description, sections, defaultSection, ...props },
    ref
  ) => {
    const defaultTab =
      defaultSection || (sections.length > 0 ? sections[0].id : undefined)

    if (!defaultTab) return null

    return (
      <div
        ref={ref}
        className={cn(settingsContainerVariants(), className)}
        {...props}
      >
        <div className={settingsHeaderVariants()}>
          <h2 id="settings-view-title" className={settingsTitleVariants()}>
            {title}
          </h2>
          {description && (
            <p className={settingsDescVariants()}>{description}</p>
          )}
        </div>

        <Tabs
          defaultValue={defaultTab}
          orientation="vertical"
          className={settingsLayoutVariants()}
        >
          <aside className={settingsSidebarVariants()}>
            <TabsList variant="line" className="w-full">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="w-full justify-start text-left"
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </aside>

          <div className={settingsContentVariants()}>
            {sections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="mt-0 outline-none"
              >
                {section.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    )
  }
)
SettingsView.displayName = "SettingsView"
