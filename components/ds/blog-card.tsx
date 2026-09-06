"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BlogAuthor } from "./blog-author"
import { BlogMeta } from "./blog-meta"

// ── Types ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  title: string
  excerpt?: string
  imageSrc?: string
  imageAlt?: string
  category?: string
  categoryHref?: string
  href?: string
  author?: { name: string; avatarUrl?: string; href?: string; role?: string }
  publishedAt?: string | Date
  readingTime?: number
  tags?: string[]
  featured?: boolean
}

export interface BlogCardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof blogCardVariants> {
  post: BlogPost
  locale?: UILocale
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const blogCardVariants = cva(
  "group flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground transition-all hover:shadow-md",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      featured: {
        true: "shadow-md ring-1 ring-primary/20",
        false: "",
      },
    },
    defaultVariants: { size: "md", featured: false },
  }
)

export const blogCardImageVariants = cva(
  "w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]",
  {
    variants: {
      size: {
        sm: "h-32",
        md: "h-44",
        lg: "h-56",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const blogCardTitleVariants = cva(
  "line-clamp-2 font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Component ──────────────────────────────────────────────────────────────

export function BlogCard({
  className,
  post,
  locale = "en-US",
  size = "md",
  featured = false,
  loading = false,
  ...props
}: BlogCardProps) {
  if (loading) {
    return (
      <div
        data-slot="blog-card-skeleton"
        className={cn(blogCardVariants({ size, featured }), className)}
        {...props}
      >
        <Skeleton
          className={cn(
            "rounded-none",
            size === "sm" ? "h-32" : size === "lg" ? "h-56" : "h-44"
          )}
        />
        <div className="flex flex-col gap-3 p-4">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    )
  }

  const content = (
    <>
      {post.imageSrc && (
        <div className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageSrc}
            alt={post.imageAlt ?? post.title}
            loading="lazy"
            decoding="async"
            className={cn(blogCardImageVariants({ size }))}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <BlogMeta
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          locale={locale}
          size="sm"
        />

        <h3 className={cn(blogCardTitleVariants({ size }), "truncate")}>
          <span className="line-clamp-2">{post.title}</span>
        </h3>

        {post.excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="h-5 rounded-full px-2 text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {post.author ? (
            <BlogAuthor
              name={post.author.name}
              avatarUrl={post.author.avatarUrl}
              role={post.author.role}
              href={post.author.href}
              size="sm"
            />
          ) : (
            <span />
          )}
          {post.href && (
            <span className="shrink-0 text-xs font-medium text-primary underline-offset-4 group-hover:underline">
              {UI_I18N[locale].blog.readMore}
            </span>
          )}
        </div>
      </div>
    </>
  )

  if (post.href) {
    return (
      <a
        href={post.href}
        aria-label={post.title}
        data-slot="blog-card"
        className={cn(
          blogCardVariants({ size, featured: featured || post.featured }),
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          className
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      data-slot="blog-card"
      className={cn(
        blogCardVariants({ size, featured: featured || post.featured }),
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}
