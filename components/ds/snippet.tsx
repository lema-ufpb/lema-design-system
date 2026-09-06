"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, CopyIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SnippetTab {
  label: string
  code: string
  language?: string
}

export interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: SnippetTab[]
  locale?: UILocale
}

// ── Component ──────────────────────────────────────────────────────────────

export function Snippet({
  className,
  tabs,
  locale = "en-US",
  ...props
}: SnippetProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const handleCopy = async (code: string, label: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  const t = UI_I18N[locale].snippet

  return (
    <div
      data-slot="snippet"
      className={cn("overflow-hidden rounded-2xl border bg-card", className)}
      {...props}
    >
      <Tabs defaultValue={tabs[0]?.label}>
        <div className="flex items-center justify-between border-b bg-muted/30 px-2">
          <TabsList className="h-8 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-background"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.label}
            value={tab.label}
            className="relative m-0"
          >
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code>{tab.code}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t.copyCode}
              onClick={() => handleCopy(tab.code, tab.label)}
              className="absolute top-2 right-2 size-7 rounded-md"
            >
              {copied === tab.label ? (
                <CheckIcon className="size-3.5 text-success" />
              ) : (
                <CopyIcon className="size-3.5" />
              )}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
