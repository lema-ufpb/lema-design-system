"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { SendIcon, SparklesIcon } from "lucide-react"

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
  const t = UI_I18N[locale].aiChat
  const resolvedPlaceholder = placeholder ?? t.placeholder

  const handleSend = React.useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setInput("")
  }, [input, onSend])

  if (loading) {
    return (
      <Card
        data-slot="ai-chat-skeleton"
        className={cn("p-4", className)}
        {...props}
      >
        <Skeleton className="h-64 w-full" />
      </Card>
    )
  }

  return (
    <Card
      data-slot="ai-chat"
      className={cn("flex h-[40vh] max-h-96 min-h-80 flex-col p-4", className)}
      {...props}
    >
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label={t.label}
            >
              {messages.length === 0 ? (
                <Empty className="h-full border-none p-6">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SparklesIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>{t.emptyTitle}</EmptyTitle>
                    <EmptyDescription>{t.emptyDescription}</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                messages.map((m, index) => (
                  <MessageScrollerItem
                    key={m.id}
                    scrollAnchor={index === messages.length - 1}
                  >
                    <Message align={m.role === "user" ? "end" : "start"}>
                      {m.role === "assistant" && (
                        <MessageAvatar aria-label={t.assistantName}>
                          <span className="text-xs font-medium text-muted-foreground">
                            AI
                          </span>
                        </MessageAvatar>
                      )}
                      <MessageContent>
                        <Bubble
                          variant={m.role === "user" ? "default" : "muted"}
                        >
                          <BubbleContent>{m.content}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>

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
          aria-label={t.send}
          disabled={!input.trim()}
          className="size-9 shrink-0 rounded-full"
        >
          <SendIcon className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </Card>
  )
}
