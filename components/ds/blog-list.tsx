"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { type UILocale } from "@/lib/ui-i18n"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { BlogMeta } from "./blog-meta"
import { BlogAuthor } from "./blog-author"
import { type BlogPost } from "./blog-card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[]
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function BlogList({ className, posts, locale = "en-US", loading = false, ...props }: BlogListProps) {
  if (loading) {
    return (
      <div data-slot="blog-list-skeleton" className={cn("flex flex-col gap-6", className)} {...props}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-28 w-40 shrink-0 rounded-xl" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="mt-auto h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div data-slot="blog-list" className={cn("flex flex-col", className)} {...props}>
      {posts.map((post, idx) => (
        <div key={post.title}>
          <a
            href={post.href ?? "#"}
            aria-label={post.title}
            className="flex gap-4 py-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {post.imageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.imageSrc} alt={post.imageAlt ?? post.title} loading="lazy" decoding="async" className="hidden h-28 w-40 shrink-0 rounded-xl object-cover sm:block" />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <BlogMeta publishedAt={post.publishedAt} readingTime={post.readingTime} category={post.category} locale={locale} size="sm" />
              <h3 className="line-clamp-2 text-base font-semibold text-foreground">{post.title}</h3>
              {post.excerpt && <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>}
              {post.author && <BlogAuthor name={post.author.name} avatarUrl={post.author.avatarUrl} size="sm" className="pt-1" />}
            </div>
          </a>
          {idx < posts.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
