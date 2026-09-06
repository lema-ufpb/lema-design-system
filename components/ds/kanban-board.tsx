"use client"

import * as React from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// ── Types ──

export interface KanbanCardData {
  id: string
  title: string
  description?: string
  tags?: string[]
  /** Extra content rendered below the description (date, avatar, etc). */
  footer?: React.ReactNode
}

export interface KanbanColumnData {
  id: string
  title: string
  cards: KanbanCardData[]
}

export interface KanbanBoardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  columns: KanbanColumnData[]
  onColumnsChange?: (columns: KanbanColumnData[]) => void
}

// ── Helpers ──

function findColumnOfCard(columns: KanbanColumnData[], cardId: string) {
  return columns.find((col) => col.cards.some((card) => card.id === cardId))
}

function findColumnById(columns: KanbanColumnData[], id: string) {
  return columns.find((col) => col.id === id)
}

// ── KanbanCardItem (draggable) ──

function KanbanCardItem({ card }: { card: KanbanCardData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    attributes: { role: "listitem", roleDescription: "draggable card" },
  })

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "cursor-grab touch-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
      data-slot="ds-kanban-card"
      {...attributes}
      {...listeners}
    >
      <CardHeader className="p-3">
        {card.tags && card.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <CardTitle className="text-sm">{card.title}</CardTitle>
        {card.description && (
          <p className="mt-1 line-clamp-2 text-xs whitespace-normal text-muted-foreground">
            {card.description}
          </p>
        )}
      </CardHeader>
      {card.footer && (
        <CardContent className="p-3 pt-0">{card.footer}</CardContent>
      )}
    </Card>
  )
}

// ── KanbanColumnView (droppable container + sortable list) ──

function KanbanColumnView({ column }: { column: KanbanColumnData }) {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-72 shrink-0 flex-col rounded-xl bg-muted/50 p-3 sm:w-80"
      data-slot="ds-kanban-column"
      role="listitem"
      aria-label={`${column.title}, ${column.cards.length} items`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{column.title}</h3>
        <Badge variant="secondary" className="rounded-full px-2 text-xs">
          {column.cards.length}
        </Badge>
      </div>
      <SortableContext
        id={column.id}
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto" role="list">
          {column.cards.map((card) => (
            <KanbanCardItem key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

// ── KanbanBoard ──

/**
 * Drag-and-drop Kanban board: reorder cards within a column or move them
 * across columns, by pointer or keyboard (Space to lift, arrow keys to
 * move, Space to drop, Escape to cancel). Controlled-with-callback, like
 * `Sortable` — pass `columns` and read the result back via
 * `onColumnsChange`; the board also tracks its own state so it works
 * without wiring the callback.
 */
export function KanbanBoard({
  className,
  columns: columnsProp,
  onColumnsChange,
  ...props
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState(columnsProp)
  const [activeCard, setActiveCard] = React.useState<KanbanCardData | null>(
    null
  )

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setColumns(columnsProp), [columnsProp])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragStart(event: DragStartEvent) {
    const activeId = String(event.active.id)
    const column = findColumnOfCard(columns, activeId)
    setActiveCard(column?.cards.find((c) => c.id === activeId) ?? null)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const activeColumn = findColumnOfCard(columns, activeId)
    const overColumn =
      findColumnOfCard(columns, overId) ?? findColumnById(columns, overId)
    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) {
      return
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            cards: col.cards.filter((card) => card.id !== activeId),
          }
        }
        if (col.id === overColumn.id) {
          const card = activeColumn.cards.find((c) => c.id === activeId)
          if (!card) return col
          const overIdx = col.cards.findIndex((c) => c.id === overId)
          const insertAt = overIdx >= 0 ? overIdx : col.cards.length
          const nextCards = [...col.cards]
          nextCards.splice(insertAt, 0, card)
          return { ...col, cards: nextCards }
        }
        return col
      })
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveCard(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const activeColumn = findColumnOfCard(columns, activeId)
    const overColumn =
      findColumnOfCard(columns, overId) ?? findColumnById(columns, overId)
    if (!activeColumn || !overColumn) return

    let next = columns
    if (activeColumn.id === overColumn.id) {
      const oldIdx = activeColumn.cards.findIndex((c) => c.id === activeId)
      const newIdx = activeColumn.cards.findIndex((c) => c.id === overId)
      if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
        next = columns.map((col) =>
          col.id === activeColumn.id
            ? { ...col, cards: arrayMove(col.cards, oldIdx, newIdx) }
            : col
        )
        setColumns(next)
      }
    }
    onColumnsChange?.(next)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <div
          className={cn("flex h-full min-h-125 gap-4 pb-4", className)}
          data-slot="ds-kanban-board"
          role="list"
          {...props}
        >
          {columns.map((column) => (
            <KanbanColumnView key={column.id} column={column} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DragOverlay>
        {activeCard ? <KanbanCardItem card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
