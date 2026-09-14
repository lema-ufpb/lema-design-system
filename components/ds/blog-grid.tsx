"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Input } from "@/components/ui/input"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { BlogCard, type BlogPost } from "./blog-card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogGridProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[]
  categories?: string[]
  activeCategory?: string
  onCategoryChange?: (category: string | null) => void
  search?: string
  onSearchChange?: (value: string) => void
  locale?: UILocale
  loading?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

export function BlogGrid({
  className,
  posts,
  categories = [],
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  locale = "en-US",
  loading = false,
  ...props
}: BlogGridProps) {
  return (
    <div
      data-slot="blog-grid"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {(categories.length > 0 || onSearchChange) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onCategoryChange?.(null)}
                data-active={!activeCategory || undefined}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:bg-muted data-[active]:border-primary data-[active]:bg-primary data-[active]:text-primary-foreground"
              >
                {UI_I18N[locale].blog.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange?.(cat)}
                  data-active={activeCategory === cat || undefined}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:bg-muted data-[active]:border-primary data-[active]:bg-primary data-[active]:text-primary-foreground"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          {onSearchChange !== undefined && (
            <Input
              placeholder={UI_I18N[locale].blog.searchPlaceholder}
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="sm:max-w-64"
            />
          )}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCard key={i} post={{ title: "loading" }} loading />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Empty className="py-12">
          <EmptyTitle>{UI_I18N[locale].blog.noPosts}</EmptyTitle>
          <EmptyDescription>
            {UI_I18N[locale].blog.noPostsDescription}
          </EmptyDescription>
        </Empty>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
