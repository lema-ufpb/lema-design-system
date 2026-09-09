"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// ── Types ──────────────────────────────────────────────────────────────────

export type EmptyStateVariant =
  | "default"
  | "search"
  | "error"
  | "success"
  | "inbox"
  | "filter"
  | "upload"
  | "locked"

export type EmptyStateSize = "sm" | "md" | "lg"

export interface EmptyStateIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  action?: React.ReactNode
  size?: EmptyStateSize
  loading?: boolean
  /** Override the SVG illustration with a custom node */
  illustration?: React.ReactNode
}

// ── Variants ───────────────────────────────────────────────────────────────

export const emptyStateContainerVariants = cva(
  "flex w-full flex-col items-center justify-center gap-4 text-center",
  {
    variants: {
      size: {
        sm: "py-8",
        md: "py-12",
        lg: "py-20",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const emptyStateTitleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
})

export const emptyStateDescriptionVariants = cva(
  "max-w-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Skeleton dims ─────────────────────────────────────────────────────────

const skeletonDims: Record<
  EmptyStateSize,
  { illus: string; title: string; desc: string }
> = {
  sm: { illus: "size-16", title: "h-4 w-32", desc: "h-3 w-40" },
  md: { illus: "size-24", title: "h-5 w-40", desc: "h-4 w-52" },
  lg: { illus: "size-32", title: "h-6 w-48", desc: "h-5 w-64" },
}

// ── SVG Sizes ────────────────────────────────────────────────────────────

const svgSize: Record<EmptyStateSize, number> = { sm: 64, md: 96, lg: 128 }

// ── Illustrations ─────────────────────────────────────────────────────────

function DefaultIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}"
        }
      </style>
      <g style={{ animation: "float 3s ease-in-out infinite" }}>
        <rect x="16" y="28" width="64" height="48" rx="8" fill="var(--muted)" />
        <rect
          x="24"
          y="40"
          width="48"
          height="4"
          rx="2"
          fill="var(--muted-foreground)"
          fillOpacity=".25"
        />
        <rect
          x="24"
          y="50"
          width="32"
          height="4"
          rx="2"
          fill="var(--muted-foreground)"
          fillOpacity=".15"
        />
        <rect
          x="24"
          y="60"
          width="40"
          height="4"
          rx="2"
          fill="var(--muted-foreground)"
          fillOpacity=".15"
        />
        <circle
          cx="48"
          cy="20"
          r="8"
          fill="var(--muted)"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <circle
          cx="48"
          cy="20"
          r="3"
          fill="var(--muted-foreground)"
          fillOpacity=".3"
        />
      </g>
    </svg>
  )
}

function SearchIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{"@keyframes pulse2{0%,100%{opacity:1}50%{opacity:.5}}"}</style>
      <circle
        cx="40"
        cy="40"
        r="22"
        stroke="var(--muted-foreground)"
        strokeWidth="4"
        strokeOpacity=".3"
      />
      <line
        x1="56"
        y1="56"
        x2="76"
        y2="76"
        stroke="var(--muted-foreground)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity=".3"
      />
      <circle
        cx="40"
        cy="40"
        r="12"
        fill="var(--muted)"
        style={{ animation: "pulse2 2s ease-in-out infinite" }}
      />
      <path
        d="M36 40 Q40 34 44 40"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity=".4"
        fill="none"
      />
    </svg>
  )
}

function ErrorIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-4px)}40%,80%{transform:translateX(4px)}}"
        }
      </style>
      <g style={{ animation: "shake 2.5s ease-in-out infinite" }}>
        <circle
          cx="48"
          cy="48"
          r="30"
          fill="var(--destructive)"
          fillOpacity=".1"
        />
        <circle
          cx="48"
          cy="48"
          r="22"
          stroke="var(--destructive)"
          strokeWidth="3"
          strokeOpacity=".4"
        />
        <line
          x1="38"
          y1="38"
          x2="58"
          y2="58"
          stroke="var(--destructive)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity=".6"
        />
        <line
          x1="58"
          y1="38"
          x2="38"
          y2="58"
          stroke="var(--destructive)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity=".6"
        />
      </g>
    </svg>
  )
}

function SuccessIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes pop{0%{transform:scale(0.8)}50%{transform:scale(1.05)}100%{transform:scale(1)}}"
        }
      </style>
      <circle
        cx="48"
        cy="48"
        r="30"
        fill="var(--success)"
        fillOpacity=".1"
        style={{ animation: "pop 0.6s ease-out forwards" }}
      />
      <circle
        cx="48"
        cy="48"
        r="22"
        stroke="var(--success)"
        strokeWidth="3"
        strokeOpacity=".4"
      />
      <polyline
        points="34,48 44,58 62,38"
        stroke="var(--success)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity=".7"
        fill="none"
      />
    </svg>
  )
}

function InboxIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}"
        }
      </style>
      <g style={{ animation: "float 3s ease-in-out infinite" }}>
        <rect x="14" y="36" width="68" height="44" rx="8" fill="var(--muted)" />
        <rect
          x="14"
          y="36"
          width="68"
          height="22"
          rx="8"
          fill="var(--muted-foreground)"
          fillOpacity=".08"
        />
        <path
          d="M14 50 L48 64 L82 50"
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeOpacity=".2"
        />
        {/* envelope flap */}
        <path
          d="M14 36 L48 58 L82 36"
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth="2"
          strokeOpacity=".2"
        />
        {/* star badge */}
        <circle cx="72" cy="28" r="10" fill="var(--chart-2)" fillOpacity=".8" />
        <text x="72" y="32" textAnchor="middle" fontSize="12" fill="white">
          ★
        </text>
      </g>
    </svg>
  )
}

function FilterIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{"@keyframes pulse2{0%,100%{opacity:1}50%{opacity:.4}}"}</style>
      <path
        d="M20 28 H76 L56 52 V72 L40 80 V52 L20 28Z"
        fill="var(--muted)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <line
        x1="30"
        y1="38"
        x2="66"
        y2="38"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeOpacity=".3"
        strokeDasharray="4 3"
        style={{ animation: "pulse2 2s ease-in-out infinite" }}
      />
      <circle
        cx="48"
        cy="62"
        r="4"
        fill="var(--muted-foreground)"
        fillOpacity=".2"
      />
    </svg>
  )
}

function UploadIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}"
        }
      </style>
      <rect
        x="20"
        y="52"
        width="56"
        height="26"
        rx="6"
        fill="var(--muted)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <rect
        x="28"
        y="60"
        width="40"
        height="3"
        rx="1.5"
        fill="var(--muted-foreground)"
        fillOpacity=".2"
      />
      <rect
        x="28"
        y="67"
        width="28"
        height="3"
        rx="1.5"
        fill="var(--muted-foreground)"
        fillOpacity=".1"
      />
      <g style={{ animation: "bounce 1.5s ease-in-out infinite" }}>
        <line
          x1="48"
          y1="46"
          x2="48"
          y2="20"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity=".6"
        />
        <polyline
          points="36,32 48,20 60,32"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".6"
        />
      </g>
    </svg>
  )
}

function LockedIllustration({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {
          "@keyframes sway{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-5deg)}60%{transform:rotate(5deg)}}"
        }
      </style>
      <g style={{ animation: "sway 3s ease-in-out infinite" }}>
        <rect
          x="24"
          y="48"
          width="48"
          height="34"
          rx="8"
          fill="var(--muted)"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <path
          d="M34 48 V36 Q34 18 48 18 Q62 18 62 36 V48"
          stroke="var(--muted-foreground)"
          strokeWidth="4"
          strokeOpacity=".3"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx="48"
          cy="65"
          r="6"
          fill="var(--muted-foreground)"
          fillOpacity=".25"
        />
        <rect
          x="46"
          y="65"
          width="4"
          height="6"
          rx="1"
          fill="var(--muted-foreground)"
          fillOpacity=".25"
        />
      </g>
    </svg>
  )
}

const ILLUSTRATIONS: Record<EmptyStateVariant, React.FC<{ size: number }>> = {
  default: DefaultIllustration,
  search: SearchIllustration,
  error: ErrorIllustration,
  success: SuccessIllustration,
  inbox: InboxIllustration,
  filter: FilterIllustration,
  upload: UploadIllustration,
  locked: LockedIllustration,
}

// ── Default titles ─────────────────────────────────────────────────────────

const DEFAULT_TITLE: Record<EmptyStateVariant, string> = {
  default: "Nothing here yet",
  search: "No results found",
  error: "Something went wrong",
  success: "All done!",
  inbox: "Your inbox is empty",
  filter: "No items match your filters",
  upload: "Drop files to upload",
  locked: "Access restricted",
}

const DEFAULT_DESCRIPTION: Record<EmptyStateVariant, string> = {
  default: "This section is empty. Create or add content to get started.",
  search:
    "We couldn't find anything matching your search. Try different keywords.",
  error: "An unexpected error occurred. Please try again or contact support.",
  success: "Everything is complete. There's nothing left to do here.",
  inbox: "No new messages. You're all caught up.",
  filter: "Try removing some filters to see more results.",
  upload: "Drag and drop your files here, or click to browse.",
  locked: "You don't have permission to view this content.",
}

// ── EmptyStateIllustration ─────────────────────────────────────────────────

export function EmptyStateIllustration({
  variant = "default",
  title,
  description,
  action,
  size = "md",
  loading = false,
  illustration,
  className,
  ...props
}: EmptyStateIllustrationProps) {
  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    const d = skeletonDims[size]
    return (
      <div
        className={cn(emptyStateContainerVariants({ size }), className)}
        aria-hidden="true"
      >
        <Skeleton className={cn("rounded-full", d.illus)} />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className={d.title} />
          <Skeleton className={d.desc} />
        </div>
      </div>
    )
  }

  const Illustration = ILLUSTRATIONS[variant]
  const displayTitle = title ?? DEFAULT_TITLE[variant]
  const displayDescription = description ?? DEFAULT_DESCRIPTION[variant]

  return (
    <div
      className={cn(emptyStateContainerVariants({ size }), className)}
      role="status"
      aria-label={displayTitle}
      {...props}
    >
      {/* Illustration */}
      <div
        className={cn(
          "flex items-center justify-center",
          size === "sm" && "size-16",
          size === "md" && "size-24",
          size === "lg" && "size-32"
        )}
        aria-hidden="true"
      >
        {illustration ?? <Illustration size={svgSize[size]} />}
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1.5">
        <h3 className={emptyStateTitleVariants({ size })}>{displayTitle}</h3>
        <p className={emptyStateDescriptionVariants({ size })}>
          {displayDescription}
        </p>
      </div>

      {/* Action slot */}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
