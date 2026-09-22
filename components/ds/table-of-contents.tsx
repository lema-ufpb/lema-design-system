"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ── Types ──

export interface TocItem {
  id: string
  title: string
  /**
   * The indentation level of the item (usually corresponds to h1=1, h2=2, etc.)
   */
  level: number
}

export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[]
  /**
   * If provided, overrides automatic scroll tracking and controls the active id.
   */
  activeId?: string
  /** Offset superior para acionar a troca do active element via scroll (em px) */
  offset?: number
  /** Se passado, intercepta o clique do link */
  onItemClick?: (id: string, e: React.MouseEvent<HTMLAnchorElement>) => void
}

// ── Component ──

export const TableOfContents = React.forwardRef<
  HTMLElement,
  TableOfContentsProps
>(
  (
    {
      items,
      activeId: externalActiveId,
      offset = 100,
      onItemClick,
      className,
      ...props
    },
    ref
  ) => {
    const [internalActiveId, setInternalActiveId] = useState<string>("")
    const activeId =
      externalActiveId !== undefined ? externalActiveId : internalActiveId

    useEffect(() => {
      // Se estamos controlando externamente, ignorar o observer interno
      if (externalActiveId !== undefined) return

      const elements: HTMLElement[] = []
      items.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) elements.push(el)
      })

      if (!elements.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          // We look for the last intersecting entry, prioritizing top visibility
          const visibleEntries = entries.filter((e) => e.isIntersecting)
          if (visibleEntries.length > 0) {
            setInternalActiveId(visibleEntries[0].target.id)
          }
        },
        { rootMargin: `-${offset}px 0px -40% 0px` }
      )

      elements.forEach((el) => observer.observe(el))

      return () => {
        elements.forEach((el) => observer.unobserve(el))
        observer.disconnect()
      }
    }, [items, externalActiveId, offset])

    const handleClick = (
      id: string,
      e: React.MouseEvent<HTMLAnchorElement>
    ) => {
      if (onItemClick) {
        onItemClick(id, e)
      } else {
        // Default behavior: smooth scroll
        const el = document.getElementById(id)
        if (el) {
          e.preventDefault()
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: "smooth" })
          // Atualiza para refletir clique imediato
          if (externalActiveId === undefined) {
            setInternalActiveId(id)
          }
        }
      }
    }

    // Calculate the smallest level to normalize indentation (if starting from h2, h2 will be indent 0)
    const minLevel =
      items.length > 0 ? Math.min(...items.map((i) => i.level)) : 1

    return (
      <nav
        ref={ref}
        aria-label="Table of contents"
        className={cn("text-sm", className)}
        {...props}
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = item.id === activeId
            const indentLevel = Math.max(0, item.level - minLevel)

            return (
              <li
                key={item.id}
                style={{ paddingLeft: `${indentLevel * 1}rem` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(item.id, e)}
                  className={cn(
                    "block border-l-2 py-1.5 pl-3 transition-colors hover:text-foreground",
                    isActive
                      ? "border-primary font-medium text-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)

TableOfContents.displayName = "TableOfContents"
