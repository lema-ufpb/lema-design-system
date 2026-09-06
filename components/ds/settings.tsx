"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SettingsTab {
  id: string
  label: string
  content: React.ReactNode
}

export interface SettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: SettingsTab[]
  defaultTab?: string
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const settingsVariants = cva("w-full rounded-2xl border bg-card p-4")

// ── Component ──────────────────────────────────────────────────────────────

export function Settings({
  className,
  tabs,
  defaultTab,
  loading = false,
  ...props
}: SettingsProps) {
  if (loading) {
    return (
      <div
        data-slot="settings-skeleton"
        className={cn(settingsVariants(), className)}
        {...props}
      >
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <Card
      data-slot="settings"
      className={cn(settingsVariants(), className)}
      {...props}
    >
      <Tabs defaultValue={defaultTab ?? tabs[0]?.id}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.id} value={t.id}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.id} value={t.id} className="pt-4">
            {t.content}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
