"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { BlogCard, type BlogPost } from "./blog-card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  featured: BlogPost
  posts?: BlogPost[]
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function BlogFeatured({ className, featured, posts = [], locale = "en-US", loading = false, ...props }: BlogFeaturedProps) {
  if (loading) {
    return (
      <div data-slot="blog-featured-skeleton" className={cn("grid gap-6 lg:grid-cols-3", className)} {...props}>
        <div className="lg:col-span-2">
          <Skeleton className="h-[360px] w-full rounded-2xl" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div data-slot="blog-featured" className={cn("grid gap-6 lg:grid-cols-3", className)} {...props}>
      <div className="lg:col-span-2">
        <BlogCard post={featured} locale={locale} size="lg" featured />
      </div>
      {posts.length > 0 && (
        <div className="flex flex-col gap-6">
          {posts.slice(0, 2).map((post) => (
            <BlogCard key={post.title} post={post} locale={locale} size="sm" />
          ))}
        </div>
      )}
    </div>
  )
}
