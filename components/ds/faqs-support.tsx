"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N } from "@/lib/ui-i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Faqs, type FaqsProps } from "./faqs"

// ── Types ──────────────────────────────────────────────────────────────────

export interface FaqsSupportProps extends FaqsProps {
  supportTitle?: string
  supportDescription?: string
  supportAction?: { label: string; href?: string; onClick?: () => void }
}

// ── Component ──────────────────────────────────────────────────────────────

export function FaqsSupport({
  className,
  supportTitle,
  supportDescription,
  supportAction,
  locale = "en-US",
  ...faqsProps
}: FaqsSupportProps) {
  const t = UI_I18N[locale].faqs

  return (
    <div data-slot="faqs-support" className={cn("grid gap-6 lg:grid-cols-3", className)}>
      <div className="lg:col-span-2">
        <Faqs locale={locale} {...faqsProps} />
      </div>
      <Card className="h-fit rounded-2xl p-6">
        <CardContent className="flex flex-col gap-3 p-0">
          <h3 className="text-base font-semibold text-foreground">{supportTitle ?? t.stillHaveQuestions}</h3>
          {supportDescription && <p className="text-sm leading-relaxed text-muted-foreground">{supportDescription}</p>}
          {supportAction &&
            (supportAction.href ? (
              <Button asChild className="mt-2 w-fit rounded-full">
                <a href={supportAction.href} onClick={supportAction.onClick}>
                  {supportAction.label}
                </a>
              </Button>
            ) : (
              <Button className="mt-2 w-fit rounded-full" onClick={supportAction.onClick}>
                {supportAction.label}
              </Button>
            ))}
          {!supportAction && (
            <Button className="mt-2 w-fit rounded-full">{t.contactUs}</Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
