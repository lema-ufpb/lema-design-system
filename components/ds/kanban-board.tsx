"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// ── KanbanBoard ──

export type KanbanBoardProps = React.HTMLAttributes<HTMLDivElement>

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ScrollArea className="w-full whitespace-nowrap">
        <div
          ref={ref}
          className={cn("flex h-full min-h-[500px] gap-4 pb-4", className)}
          data-slot="ds-kanban-board"
          role="list"
          {...props}
        >
          {children}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )
  }
)
KanbanBoard.displayName = "KanbanBoard"

// ── KanbanColumn ──

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  count?: number
}

export const KanbanColumn = React.forwardRef<HTMLDivElement, KanbanColumnProps>(
  ({ className, title, count, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-80 shrink-0 flex-col rounded-xl bg-muted/50 p-3",
          className
        )}
        data-slot="ds-kanban-column"
        role="listitem"
        aria-label={`${title}${count !== undefined ? `, ${count} items` : ""}`}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          {count !== undefined && (
            <Badge variant="secondary" className="rounded-full px-2 text-xs">
              {count}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto" role="list">
          {children}
        </div>
      </div>
    )
  }
)
KanbanColumn.displayName = "KanbanColumn"

// ── KanbanCard ──

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  tags?: string[]
}

export const KanbanCard = React.forwardRef<HTMLDivElement, KanbanCardProps>(
  ({ className, title, description, tags, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("cursor-grab active:cursor-grabbing", className)}
        data-slot="ds-kanban-card"
        role="listitem"
        tabIndex={0}
        {...props}
      >
        <CardHeader className="p-3">
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <CardTitle className="text-sm">{title}</CardTitle>
          {description && (
            <p className="mt-1 line-clamp-2 text-xs whitespace-normal text-muted-foreground">
              {description}
            </p>
          )}
        </CardHeader>
        {children && <CardContent className="p-3 pt-0">{children}</CardContent>}
      </Card>
    )
  }
)
KanbanCard.displayName = "KanbanCard"
