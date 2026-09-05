"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

export interface DeckProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: React.ReactNode[]
}

// ── Component ──────────────────────────────────────────────────────────────

export function Deck({ className, cards, ...props }: DeckProps) {
  const [index, setIndex] = React.useState(0)
  const startX = React.useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current
    if (dx < -50 && index < cards.length - 1) setIndex((i) => i + 1)
    if (dx > 50 && index > 0) setIndex((i) => i - 1)
  }

  return (
    <div data-slot="deck" className={cn("relative h-64 w-full overflow-hidden rounded-2xl", className)} {...props} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 rounded-2xl border bg-card p-6 shadow-md transition-all duration-300",
            i === index ? "translate-x-0 opacity-100" : i < index ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"
          )}
          aria-hidden={i !== index}
        >
          {card}
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn("size-1.5 rounded-full transition-colors", i === index ? "bg-primary" : "bg-muted-foreground/30")}
          />
        ))}
      </div>
    </div>
  )
}
