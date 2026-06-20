import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { MoreHorizontalIcon } from "lucide-react"
import {
  Pagination as UIPagination,
  PaginationContent as UIPaginationContent,
  PaginationItem as UIPaginationItem,
  PaginationLink as UIPaginationLink,
  PaginationPrevious as UIPaginationPrevious,
  PaginationNext as UIPaginationNext,
} from "@/components/ui/pagination"

function Pagination({
  className,
  locale = "en-US",
  ...props
}: React.ComponentProps<"nav"> & { locale?: UILocale }) {
  return (
    <UIPagination
      className={className}
      aria-label={UI_I18N[locale].pagination.navLabel}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return <UIPaginationContent className={className} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <UIPaginationItem {...props} />
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: React.ComponentProps<typeof UIPaginationLink>) {
  return (
    <UIPaginationLink
      isActive={isActive}
      size={size}
      className={className}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  text,
  locale = "en-US",
  ...props
}: React.ComponentProps<typeof UIPaginationPrevious> & {
  locale?: UILocale
}) {
  return (
    <UIPaginationPrevious
      className={cn("pl-2!", className)}
      aria-label={UI_I18N[locale].pagination.goToPrevious}
      text={text ?? UI_I18N[locale].pagination.previous}
      {...props}
    />
  )
}

function PaginationNext({
  className,
  text,
  locale = "en-US",
  ...props
}: React.ComponentProps<typeof UIPaginationNext> & {
  locale?: UILocale
}) {
  return (
    <UIPaginationNext
      className={cn("pr-2!", className)}
      aria-label={UI_I18N[locale].pagination.goToNext}
      text={text ?? UI_I18N[locale].pagination.next}
      {...props}
    />
  )
}

function PaginationEllipsis({
  className,
  locale = "en-US",
  ...props
}: React.ComponentProps<"span"> & { locale?: UILocale }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">{UI_I18N[locale].pagination.morePages}</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
