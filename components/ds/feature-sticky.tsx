"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──

export interface FeatureStickyItem {
  title: string
  description: string
  badge?: string
}

export interface FeatureStickyProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureStickyVariants> {
  badge?: string
  heading?: string
  subheading?: string
  items?: FeatureStickyItem[]
  media?: React.ReactNode
  loading?: boolean
}

// ── Variants ──

export const featureStickyVariants = cva(
  "relative mx-auto w-full max-w-6xl px-4 sm:px-6",
  {
    variants: {
      sticky: {
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      sticky: "left",
    },
  }
)

// ── Component ──

export function FeatureSticky({
  className,
  sticky = "left",
  badge = "Feature",
  heading = "Everything you need at your fingertips",
  subheading = "A comprehensive collection of components written in modern React, Typescript and Tailwind CSS.",
  items,
  media,
  loading = false,
  ...props
}: FeatureStickyProps) {
  const defaultItems: FeatureStickyItem[] = [
    {
      title: "Accessibility first",
      description: "Fully WCAG 2.0 compliant, made with best a11y practices.",
    },
    {
      title: "Responsive design",
      description: "Looks and works great on any device and screen size.",
    },
    {
      title: "Light and dark mode",
      description:
        "Seamless switching between color schemes, 6 themes included.",
    },
  ]
  const list = items ?? defaultItems

  if (loading) {
    return (
      <div
        data-slot="feature-sticky-skeleton"
        className={cn(featureStickyVariants({ sticky }), "py-12", className)}
        {...props}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    )
  }

  const textBlock = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit rounded-full">
          {badge}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{subheading}</p>
      </div>
      <div className="flex flex-col gap-6">
        {list.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-1.5 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.badge && (
              <Badge variant="outline" className="mt-1 w-fit">
                {item.badge}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const mediaBlock = (
    <div className="lg:sticky lg:top-20 lg:h-fit">
      {media ?? (
        <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/featureSticky/900/700"
            alt="App preview"
            width={900}
            height={700}
            className="h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </div>
  )

  return (
    <div
      data-slot="feature-sticky"
      className={cn(featureStickyVariants({ sticky }), "py-12", className)}
      {...props}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {sticky === "left" ? (
          <>
            {textBlock}
            {mediaBlock}
          </>
        ) : (
          <>
            {mediaBlock}
            {textBlock}
          </>
        )}
      </div>
    </div>
  )
}
