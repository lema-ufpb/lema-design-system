"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ── Types ──────────────────────────────────────────────────────────────────

export type DiffMode = "split" | "unified"
export type DiffLineType = "added" | "removed" | "unchanged"

export interface DiffLine {
  type: DiffLineType
  content: string
  oldLineNo: number | null
  newLineNo: number | null
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  oldValue: string
  newValue: string
  title?: string
  oldLabel?: string
  newLabel?: string
  mode?: DiffMode
  /** Max lines to display before truncating — 0 = unlimited */
  maxLines?: number
  loading?: boolean
  /** Show line numbers */
  showLineNumbers?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const diffViewerContainerVariants = cva(
  "w-full overflow-hidden rounded-lg border border-border font-mono text-xs",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const diffLineVariants = cva("flex gap-2 px-3 py-0.5 leading-5", {
  variants: {
    type: {
      added: "bg-success/10 text-success",
      removed: "bg-destructive/10 text-destructive",
      unchanged: "text-foreground",
    },
  },
  defaultVariants: { type: "unchanged" },
})

// ── Diff algorithm (LCS-based) ────────────────────────────────────────────

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n")
  const newLines = newText.split("\n")
  const m = oldLines.length
  const n = newLines.length

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1
      } else {
        dp[i]![j] = Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!)
      }
    }
  }

  // Backtrack
  const result: DiffLine[] = []
  let i = m
  let j = n
  let oldNo = m
  let newNo = n

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.push({
        type: "unchanged",
        content: oldLines[i - 1]!,
        oldLineNo: oldNo--,
        newLineNo: newNo--,
      })
      i--
      j--
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      result.push({
        type: "added",
        content: newLines[j - 1]!,
        oldLineNo: null,
        newLineNo: newNo--,
      })
      j--
    } else {
      result.push({
        type: "removed",
        content: oldLines[i - 1]!,
        oldLineNo: oldNo--,
        newLineNo: null,
      })
      i--
    }
  }

  return result.reverse()
}

// ── Line Number ───────────────────────────────────────────────────────────

function LineNo({ n }: { n: number | null }) {
  return (
    <span className="w-8 shrink-0 text-right text-muted-foreground opacity-50 select-none">
      {n ?? " "}
    </span>
  )
}

// ── DiffViewer ────────────────────────────────────────────────────────────

export function DiffViewer({
  oldValue,
  newValue,
  title,
  oldLabel = "Before",
  newLabel = "After",
  mode: modeProp = "unified",
  maxLines = 500,
  loading = false,
  showLineNumbers = true,
  className,
  ...props
}: DiffViewerProps) {
  const [mode, setMode] = React.useState<DiffMode>(modeProp)

  // ── Compute diff ─────────────────────────────────────────────────────────

  const diffLines = React.useMemo(
    () => computeDiff(oldValue, newValue),
    [oldValue, newValue]
  )

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        {title && (
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div className={diffViewerContainerVariants()}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-2 border-b border-border/50 px-3 py-0.5"
              >
                <Skeleton className="h-3 w-8" />
                <Skeleton
                  className="h-3"
                  style={{ width: `${30 + ((i * 17) % 50)}%` }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const addedCount = diffLines.filter((l) => l.type === "added").length
  const removedCount = diffLines.filter((l) => l.type === "removed").length
  const displayLines = maxLines > 0 ? diffLines.slice(0, maxLines) : diffLines
  const truncated = maxLines > 0 && diffLines.length > maxLines

  // ── Unified view ─────────────────────────────────────────────────────────

  const unifiedView = (
    <div
      className={cn(diffViewerContainerVariants(), "max-h-120 overflow-auto")}
    >
      {displayLines.map((line, i) => (
        <div
          key={i}
          className={cn(
            diffLineVariants({ type: line.type }),
            "border-b border-border/20"
          )}
        >
          {showLineNumbers && <LineNo n={line.oldLineNo} />}
          {showLineNumbers && <LineNo n={line.newLineNo} />}
          <span className="w-3 shrink-0 font-bold select-none">
            {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
          </span>
          <span className="flex-1 whitespace-pre">{line.content}</span>
        </div>
      ))}
      {truncated && (
        <div className="px-3 py-1 text-xs text-muted-foreground">
          … {diffLines.length - maxLines} more lines not shown
        </div>
      )}
    </div>
  )

  // ── Split view ────────────────────────────────────────────────────────────

  const oldLines = displayLines
    .filter((l) => l.type !== "added")
    .map((l) => ({ ...l, type: l.type as "unchanged" | "removed" }))
  const newLines = displayLines
    .filter((l) => l.type !== "removed")
    .map((l) => ({ ...l, type: l.type as "unchanged" | "added" }))

  const splitView = (
    <div className="flex max-h-120 overflow-auto">
      {/* Old */}
      <div
        className={cn(
          diffViewerContainerVariants(),
          "flex-1 rounded-r-none border-r-0"
        )}
      >
        <div className="border-b border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {oldLabel}
        </div>
        {oldLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              diffLineVariants({ type: line.type }),
              "border-b border-border/20"
            )}
          >
            {showLineNumbers && <LineNo n={line.oldLineNo} />}
            <span className="flex-1 whitespace-pre">{line.content}</span>
          </div>
        ))}
      </div>
      {/* New */}
      <div
        className={cn(diffViewerContainerVariants(), "flex-1 rounded-l-none")}
      >
        <div className="border-b border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {newLabel}
        </div>
        {newLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              diffLineVariants({ type: line.type }),
              "border-b border-border/20"
            )}
          >
            {showLineNumbers && <LineNo n={line.newLineNo} />}
            <span className="flex-1 whitespace-pre">{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="flex-row items-center justify-between gap-4 pb-3">
        <div className="flex flex-col gap-1">
          {title && <CardTitle className="text-sm">{title}</CardTitle>}
          <div className="flex items-center gap-2">
            {addedCount > 0 && (
              <Badge
                variant="outline"
                className="border-success/30 text-success"
              >
                +{addedCount}
              </Badge>
            )}
            {removedCount > 0 && (
              <Badge
                variant="outline"
                className="border-destructive/30 text-destructive"
              >
                −{removedCount}
              </Badge>
            )}
          </div>
        </div>
        <ToggleGroup
          type="single"
          size="sm"
          value={mode}
          onValueChange={(v) => v && setMode(v as DiffMode)}
        >
          <ToggleGroupItem value="unified">Unified</ToggleGroupItem>
          <ToggleGroupItem value="split">Split</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-0 pt-0">
        {mode === "unified" ? unifiedView : splitView}
      </CardContent>
    </Card>
  )
}
