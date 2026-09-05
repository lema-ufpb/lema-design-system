"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
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
}

// ── Component ──────────────────────────────────────────────────────────────

export function AiChat({ className, messages = [], onSend, loading = false, ...props }: AiChatProps) {
  const [input, setInput] = React.useState("")

  if (loading) {
    return (
      <Card data-slot="ai-chat-skeleton" className={cn("p-4", className)} {...props}>
        <Skeleton className="h-64 w-full" />
      </Card>
    )
  }

  return (
    <Card data-slot="ai-chat" className={cn("flex h-80 flex-col p-4", className)} {...props}>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <Avatar className="size-6">
                <AvatarFallback className="text-xs">AI</AvatarFallback>
              </Avatar>
            )}
            <span
              className={cn(
                "max-w-[70%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-9 rounded-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && input) {
              onSend?.(input)
              setInput("")
            }
          }}
        />
        <Button
          size="icon"
          className="size-9 rounded-full"
          onClick={() => {
            if (input) {
              onSend?.(input)
              setInput("")
            }
          }}
        >
          <SendIcon className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
