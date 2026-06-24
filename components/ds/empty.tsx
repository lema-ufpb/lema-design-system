"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InboxIcon,
  SearchXIcon,
  AlertCircleIcon,
  FileSearch2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Empty as EmptyRoot,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export type EmptyVariant = "no-data" | "search" | "error" | "no-results"

export interface EmptyAction {
  label: string
  onClick: () => void
}

export interface EmptyProps
  extends
    Omit<React.ComponentProps<"div">, "className">,
    VariantProps<typeof emptyVariants> {
  variant?: EmptyVariant
  /** Sobrescreve o título i18n */
  title?: string
  /** Sobrescreve a descrição i18n */
  description?: string
  action?: EmptyAction
  compact?: boolean
  loading?: boolean
  locale?: UILocale
  className?: string
}

// ── Variants ──

export const emptyVariants = cva("", {
  variants: {
    compact: {
      true: "p-6",
      false: "p-12",
    },
  },
  defaultVariants: { compact: false },
})

export const iconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full bg-muted",
  {
    variants: {
      compact: {
        true: "size-10 [&_svg]:size-5",
        false: "size-16 [&_svg]:size-8",
      },
    },
    defaultVariants: { compact: false },
  }
)

// ── Icons Map ──

const EMPTY_ICONS: Record<EmptyVariant, React.ReactNode> = {
  "no-data": <InboxIcon className="text-muted-foreground" />,
  search: <FileSearch2Icon className="text-muted-foreground" />,
  error: <AlertCircleIcon className="text-muted-foreground" />,
  "no-results": <SearchXIcon className="text-muted-foreground" />,
}

// ── Component ──

function Empty({
  variant = "no-data",
  title,
  description,
  action,
  compact = false,
  loading = false,
  locale = "pt-BR",
  className,
  ...htmlProps
}: EmptyProps) {
  const i18n = UI_I18N[locale]

  const resolvedTitle =
    title ??
    (variant === "search"
      ? i18n.empty.search
      : variant === "error"
        ? i18n.empty.error
        : variant === "no-results"
          ? i18n.empty.noResults
          : i18n.empty.noData)

  const resolvedDescription =
    description ??
    (variant === "search"
      ? i18n.empty.searchDescription
      : variant === "error"
        ? i18n.empty.errorDescription
        : variant === "no-results"
          ? i18n.empty.noResultsDescription
          : i18n.empty.noDataDescription)

  if (loading) {
    return (
      <div
        data-slot="ds-empty"
        {...htmlProps}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-4",
          emptyVariants({ compact }),
          className
        )}
      >
        <Skeleton
          className={cn("rounded-full", compact ? "size-10" : "size-16")}
        />
        <Skeleton className="h-5 w-48 rounded-md" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>
    )
  }

  return (
    <EmptyRoot
      data-slot="ds-empty"
      role="region"
      aria-label={resolvedTitle}
      {...htmlProps}
      className={cn(emptyVariants({ compact }), className)}
    >
      <EmptyHeader>
        <EmptyMedia className={iconVariants({ compact })}>
          {EMPTY_ICONS[variant]}
        </EmptyMedia>
        <EmptyTitle>{resolvedTitle}</EmptyTitle>
        <EmptyDescription>{resolvedDescription}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent>
          <Button variant="outline" onClick={action.onClick}>
            {action.label}
          </Button>
        </EmptyContent>
      )}
    </EmptyRoot>
  )
}

export { Empty }
