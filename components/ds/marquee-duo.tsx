"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface MarqueeDuoItem {
  name: string
  handle?: string
  avatar?: string
  quote: string
}

export interface MarqueeDuoProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeDuoVariants> {
  items?: MarqueeDuoItem[]
  speed?: number
  pauseOnHover?: boolean
  loading?: boolean
}

// ── Variants ──

export const marqueeDuoVariants = cva(
  "relative flex w-full flex-col gap-3 overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        muted: "bg-muted/20 py-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Card ──

function DuoCard({ item }: { item: MarqueeDuoItem }) {
  return (
    <Card className="w-80 shrink-0 rounded-xl border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            {item.avatar && <AvatarImage src={item.avatar} alt={item.name} />}
            <AvatarFallback className="text-xs">
              {item.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm leading-none font-medium">
              {item.name}
            </span>
            {item.handle && (
              <span className="text-xs text-muted-foreground">
                {item.handle}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          “{item.quote}”
        </p>
      </CardContent>
    </Card>
  )
}

// ── Component ──

export function MarqueeDuo({
  className,
  variant = "default",
  items,
  speed = 28,
  pauseOnHover = true,
  loading = false,
  ...props
}: MarqueeDuoProps) {
  const defaultItems: MarqueeDuoItem[] = [
    {
      name: "Fabrizio Fernandez",
      handle: "@fab3304",
      quote:
        "Playing around with @launchui suddenly inspired me to launch that side project.",
    },
    {
      name: "Darius Flynn",
      handle: "@flynnn",
      quote:
        "Exploring sleek UI. It's like a dark mode enthusiast's playground.",
    },
    {
      name: "Felix B.",
      handle: "@felixbs",
      quote: "Those shadows are giving me serious design envy.",
    },
    {
      name: "Olivia Blackwood",
      handle: "@olivia1992",
      quote: "Not messing around with component library game.",
    },
    {
      name: "Esme Rothschild",
      handle: "@EmeRothArt",
      quote: "Slick. That globe graphic though—sci-fi movie vibes.",
    },
    {
      name: "Kai Nakamura",
      handle: "@KaiNakWaves",
      quote:
        "Flexibility speaking my language. No drama, seamless integration.",
    },
  ]
  const list = items ?? defaultItems
  const half = Math.ceil(list.length / 2)
  const row1 = list.slice(0, half)
  const row2 = list.slice(half)

  if (loading) {
    return (
      <div
        data-slot="marquee-duo-skeleton"
        className={cn(marqueeDuoVariants({ variant }), className)}
        {...props}
      >
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-80 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-80 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="marquee-duo"
      role="region"
      aria-label="Depoimentos em carrossel duplo"
      className={cn(marqueeDuoVariants({ variant }), className)}
      {...props}
    >
      {[row1, row2].map((row, rIdx) => (
        <div
          key={rIdx}
          className={cn(
            "flex w-max gap-3",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `marquee-duo-${rIdx} ${speed}s linear infinite`,
            animationDirection: rIdx === 1 ? "reverse" : "normal",
          }}
        >
          {[...row, ...row].map((item, idx) => (
            <DuoCard key={`${rIdx}-${idx}-${item.name}`} item={item} />
          ))}
        </div>
      ))}
      <style>{`@keyframes marquee-duo-0 { from { transform: translateX(0) } to { transform: translateX(-50%) } } @keyframes marquee-duo-1 { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { [data-slot="marquee-duo"] > div { animation: none !important } }`}</style>
    </div>
  )
}
