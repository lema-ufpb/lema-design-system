import * as React from "react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

function Pagination({
  className,
  locale = "en-US",
  ...props
}: React.ComponentProps<"nav"> & { locale?: UILocale }) {
  return (
    <nav
      role="navigation"
      aria-label={UI_I18N[locale].pagination.navLabel}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

function PaginationPrevious({
  className,
  text,
  locale = "en-US",
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  locale?: UILocale
}) {
  return (
    <PaginationLink
      aria-label={UI_I18N[locale].pagination.goToPrevious}
      size="default"
      className={cn("pl-2!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">
        {text ?? UI_I18N[locale].pagination.previous}
      </span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text,
  locale = "en-US",
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  locale?: UILocale
}) {
  return (
    <PaginationLink
      aria-label={UI_I18N[locale].pagination.goToNext}
      size="default"
      className={cn("pr-2!", className)}
      {...props}
    >
      <span className="hidden sm:block">
        {text ?? UI_I18N[locale].pagination.next}
      </span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
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
