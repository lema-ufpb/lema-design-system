"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// ── Types ──

export interface BreadcrumbItemData {
  id: string
  label: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbsProps {
  items: BreadcrumbItemData[]
  separator?: React.ReactNode
  itemsBeforeEllipsis?: number
  itemsAfterEllipsis?: number
  className?: string
}

// ── Component ──

export function Breadcrumbs({
  items,
  separator,
  itemsBeforeEllipsis = 1,
  itemsAfterEllipsis = 2,
  className,
}: BreadcrumbsProps) {
  const shouldTruncate =
    items.length > itemsBeforeEllipsis + itemsAfterEllipsis + 1

  const renderItem = (item: BreadcrumbItemData, isLast: boolean) => {
    return (
      <React.Fragment key={item.id}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
          ) : item.href ? (
            <BreadcrumbLink href={item.href} onClick={item.onClick}>
              {item.label}
            </BreadcrumbLink>
          ) : (
            <span
              role="button"
              tabIndex={0}
              aria-label={typeof item.label === "string" ? item.label : undefined}
              onClick={item.onClick}
              className="cursor-pointer transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  item.onClick?.()
                }
              }}
            >
              {item.label}
            </span>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
      </React.Fragment>
    )
  }

  return (
    <Breadcrumb className={className} data-slot="ds-breadcrumbs">
      <BreadcrumbList>
        {shouldTruncate ? (
          <>
            {items
              .slice(0, itemsBeforeEllipsis)
              .map((item) => renderItem(item, false))}
            <BreadcrumbItem>
              <BreadcrumbEllipsis aria-label="More breadcrumbs" />
            </BreadcrumbItem>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            {items
              .slice(items.length - itemsAfterEllipsis)
              .map((item, index) =>
                renderItem(item, index === itemsAfterEllipsis - 1)
              )}
          </>
        ) : (
          items.map((item, index) =>
            renderItem(item, index === items.length - 1)
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
