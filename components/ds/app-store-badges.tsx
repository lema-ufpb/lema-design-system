import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Apple, PlayCircle } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ──

export type AppStoreBadgeStore = "apple" | "google"

export interface AppStoreBadgeLink {
  href: string
  store: AppStoreBadgeStore
  /** Small top line, e.g. "Download on the". Defaults per store. */
  eyebrow?: string
  /** Bold store name, e.g. "App Store". Defaults per store. */
  storeName?: string
  /** Overrides the default icon (use your own brand-compliant mark). */
  icon?: React.ElementType
}

export interface AppStoreBadgesProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appStoreBadgeVariants> {
  links: AppStoreBadgeLink[]
}

// ── Variants ──

export const appStoreBadgeVariants = cva(
  "inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-foreground px-4 text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "h-10 [&_svg]:size-5",
        md: "h-12 [&_svg]:size-6",
        lg: "h-14 [&_svg]:size-7",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const appStoreBadgeEyebrowVariants = cva(
  "leading-none text-background/80",
  {
    variants: {
      size: { sm: "text-xs", md: "text-xs", lg: "text-xs" },
    },
    defaultVariants: { size: "md" },
  }
)

export const appStoreBadgeNameVariants = cva("leading-none font-semibold", {
  variants: {
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { size: "md" },
})

// ── Helpers ──

const DEFAULT_ICON: Record<AppStoreBadgeStore, React.ElementType> = {
  apple: Apple,
  google: PlayCircle,
}

const DEFAULT_EYEBROW: Record<AppStoreBadgeStore, string> = {
  apple: "Download on the",
  google: "GET IT ON",
}

const DEFAULT_STORE_NAME: Record<AppStoreBadgeStore, string> = {
  apple: "App Store",
  google: "Google Play",
}

// ── Component ──

export function AppStoreBadges({
  links,
  size = "md",
  className,
  ...props
}: AppStoreBadgesProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      data-slot="app-store-badges"
      {...props}
    >
      {links.map(({ href, store, eyebrow, storeName, icon }) => {
        const Icon = icon ?? DEFAULT_ICON[store]
        const label = `${eyebrow ?? DEFAULT_EYEBROW[store]} ${storeName ?? DEFAULT_STORE_NAME[store]}`

        return (
          <a
            key={store}
            href={href}
            aria-label={label}
            className={cn(appStoreBadgeVariants({ size }))}
          >
            <Icon aria-hidden="true" />
            <span className="flex flex-col items-start">
              <span className={cn(appStoreBadgeEyebrowVariants({ size }))}>
                {eyebrow ?? DEFAULT_EYEBROW[store]}
              </span>
              <span className={cn(appStoreBadgeNameVariants({ size }))}>
                {storeName ?? DEFAULT_STORE_NAME[store]}
              </span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
