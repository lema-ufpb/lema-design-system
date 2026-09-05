"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { StarIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  author: { name: string; avatarUrl?: string; role?: string }
  rating?: number
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function TestimonialCard({ className, quote, author, rating, loading = false, ...props }: TestimonialCardProps) {
  if (loading) {
    return (
      <div data-slot="testimonial-card-skeleton" className={cn("flex flex-col gap-4 rounded-2xl border bg-card p-6", className)} {...props}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    )
  }

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div data-slot="testimonial-card" className={cn("flex flex-col gap-4 rounded-2xl border bg-card p-6 text-card-foreground", className)} {...props}>
      {typeof rating === "number" && (
        <div role="img" className="flex gap-1" aria-label={`${rating} stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={cn("size-4", i < rating ? "fill-warning text-warning" : "text-muted-foreground/20")} />
          ))}
        </div>
      )}
      <p className="text-sm leading-relaxed text-foreground">“{quote}”</p>
      <div className="flex items-center gap-3 pt-2">
        <Avatar className="size-8">
          <AvatarImage src={author.avatarUrl ?? ""} alt={author.name} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <span className="text-xs font-medium text-foreground">{author.name}</span>
          {author.role && <span className="text-xs text-muted-foreground">{author.role}</span>}
        </span>
      </div>
    </div>
  )
}
