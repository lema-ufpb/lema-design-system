"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogAuthorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blogAuthorVariants> {
  name: string
  avatarUrl?: string
  role?: string
  href?: string
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const blogAuthorVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: { size: "md" },
})

export const blogAuthorAvatarVariants = cva("shrink-0 rounded-full", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-8",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──────────────────────────────────────────────────────────────

export function BlogAuthor({
  className,
  name,
  avatarUrl,
  role,
  href,
  size = "md",
  loading = false,
  ...props
}: BlogAuthorProps) {
  if (loading) {
    return (
      <div data-slot="blog-author-skeleton" className={cn(blogAuthorVariants({ size }), className)} {...props}>
        <Skeleton className={cn("rounded-full", size === "sm" ? "size-6" : "size-8")} />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          {role && <Skeleton className="h-2.5 w-16" />}
        </div>
      </div>
    )
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const content = (
    <>
      <Avatar className={cn(blogAuthorAvatarVariants({ size }))}>
        <AvatarImage src={avatarUrl ?? ""} alt={name} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-xs font-medium text-foreground">{name}</span>
        {role && <span className="truncate text-xs text-muted-foreground">{role}</span>}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        data-slot="blog-author"
        className={cn(blogAuthorVariants({ size }), "rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <div data-slot="blog-author" className={cn(blogAuthorVariants({ size }), className)} {...props}>
      {content}
    </div>
  )
}
