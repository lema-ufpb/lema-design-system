"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SendIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface AiChatProps extends React.HTMLAttributes<HTMLDivElement> {
  messages?: ChatMessage[]
  onSend?: (message: string) => void
  loading?: boolean
  locale?: UILocale
  placeholder?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const aiChatVariants = undefined

// ── Component ──────────────────────────────────────────────────────────────

export function AiChat({
  className,
  messages = [],
  onSend,
  loading = false,
  locale = "en-US",
  placeholder,
  ...props
}: AiChatProps) {
  const [input, setInput] = React.useState("")
  const t = UI_I18N[locale].searchBar
  const resolvedPlaceholder = placeholder ?? t.placeholder

  const handleSend = React.useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setInput("")
  }, [input, onSend])

  if (loading) {
    return (
      <Card data-slot="ai-chat-skeleton" className={cn("p-4", className)} {...props}>
        <Skeleton className="h-64 w-full" />
      </Card>
    )
  }

  return (
    <Card data-slot="ai-chat" className={cn("flex min-h-80 h-[40vh] max-h-96 flex-col p-4", className)} {...props}>
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label={t.label}
        className="flex flex-1 flex-col gap-3 overflow-y-auto"
      >
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <Avatar className="size-6">
                <AvatarFallback className="text-xs">AI</AvatarFallback>
              </Avatar>
            )}
            <span
              className={cn(
                "max-w-[70%] rounded-2xl px-3 py-2 text-xs leading-relaxed break-words",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
      >
        <Input
          aria-label={t.label}
          placeholder={resolvedPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-9 rounded-full"
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          aria-label={t.label}
          disabled={!input.trim()}
          className="size-9 shrink-0 rounded-full"
        >
          <SendIcon className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </Card>
  )
}
