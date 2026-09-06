"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Register, type RegisterProps } from "./register"

// ── Types ──────────────────────────────────────────────────────────────────

export interface RegisterSplitProps extends RegisterProps {
  imageSrc?: string
  testimonial?: {
    quote: string
    author: string
    role?: string
    avatarUrl?: string
  }
}

// ── Component ──────────────────────────────────────────────────────────────

export function RegisterSplit({
  className,
  imageSrc,
  testimonial,
  ...props
}: RegisterSplitProps) {
  return (
    <div
      data-slot="register-split"
      className={cn(
        "grid overflow-hidden rounded-3xl border bg-card md:grid-cols-2",
        className
      )}
    >
      <div className="relative hidden flex-col justify-between gap-8 bg-muted p-8 md:flex">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
        )}
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            L
          </div>
          <span className="text-sm font-semibold text-foreground">LEMA</span>
        </div>
        {testimonial && (
          <div className="relative z-10 rounded-2xl bg-background/80 p-4 backdrop-blur">
            <p className="text-sm leading-relaxed text-foreground">
              “{testimonial.quote}”
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={testimonial.avatarUrl ?? ""}
                  alt={testimonial.author}
                />
                <AvatarFallback className="text-xs">
                  {testimonial.author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="flex flex-col">
                <span className="text-xs font-medium text-foreground">
                  {testimonial.author}
                </span>
                {testimonial.role && (
                  <span className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8">
        <Register {...props} className="border-0 p-0 shadow-none" />
      </div>
    </div>
  )
}
