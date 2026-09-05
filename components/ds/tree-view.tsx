"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// ── Types ──

export interface TreeDataItem {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeDataItem[]
}

export interface TreeViewProps {
  data: TreeDataItem[]
  onSelect?: (item: TreeDataItem) => void
  selectedId?: string
  defaultExpandedIds?: string[]
  expandAll?: boolean
  className?: string
}

// ── Variants ──

const treeItemVariants = cva(
  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
  {
    variants: {},
  }
)

// ── Components ──

interface TreeItemProps {
  item: TreeDataItem
  depth: number
  onSelect?: (item: TreeDataItem) => void
  selectedId?: string
  defaultExpandedIds?: string[]
  expandAll?: boolean
}

function TreeItem({
  item,
  depth,
  onSelect,
  selectedId,
  defaultExpandedIds,
  expandAll,
}: TreeItemProps) {
  const [isOpen, setIsOpen] = React.useState(
    expandAll || (defaultExpandedIds?.includes(item.id) ?? false)
  )

  const hasChildren = item.children && item.children.length > 0
  const isSelected = selectedId === item.id

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(item)
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  const paddingLeft = depth * 16 // 1rem per depth level

  if (hasChildren) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-1"
      >
        <CollapsibleTrigger asChild>
          <div
            data-slot="tree-node"
            data-selected={isSelected}
            onClick={handleSelect}
            className={cn(treeItemVariants())}
            style={{ paddingLeft: `${paddingLeft + 8}px` }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleSelect(e as unknown as React.MouseEvent)
              }
            }}
          >
            <ChevronRightIcon
              className={cn(
                "size-4 shrink-0 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
            {item.icon}
            <span className="truncate">{item.name}</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex flex-col gap-1">
            {item.children?.map((child) => (
              <li key={child.id}>
                <TreeItem
                  item={child}
                  depth={depth + 1}
                  onSelect={onSelect}
                  selectedId={selectedId}
                  defaultExpandedIds={defaultExpandedIds}
                  expandAll={expandAll}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <div
      data-slot="tree-leaf"
      data-selected={isSelected}
      onClick={handleSelect}
      className={cn(treeItemVariants())}
      style={{ paddingLeft: `${paddingLeft + 32}px` }} // 16px depth + 16px to align with text next to chevron
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleSelect(e as unknown as React.MouseEvent)
        }
      }}
    >
      {item.icon}
      <span className="truncate">{item.name}</span>
    </div>
  )
}

export function TreeView({
  data,
  onSelect,
  selectedId,
  defaultExpandedIds = [],
  expandAll = false,
  className,
}: TreeViewProps) {
  return (
    <div data-slot="tree-view" className={cn("flex flex-col gap-1", className)}>
      <ul className="flex flex-col gap-1">
        {data.map((item) => (
          <li key={item.id}>
            <TreeItem
              item={item}
              depth={0}
              onSelect={onSelect}
              selectedId={selectedId}
              defaultExpandedIds={defaultExpandedIds}
              expandAll={expandAll}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
