"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"
import { formatChartValue, type FormatPreset } from "@/lib/format-utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ── Types ──────────────────────────────────────────────────────────────────

export interface SankeyNode {
  id: string
  name: string
  color?: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyChartProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: SankeyNode[]
  links: SankeyLink[]
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  height?: number
  nodeWidth?: number
  nodePadding?: number
  showLabels?: boolean
  showValues?: boolean
  valueFormatter?: (v: number) => string
  format?: FormatPreset
  decimals?: number
  currency?: string
  abbreviate?: boolean
  loading?: boolean
  locale?: UILocale
}

// ── Variants ───────────────────────────────────────────────────────────────

export const sankeyChartContainerVariants = cva("w-full overflow-visible", {
  variants: {},
})

// ── Constants ──────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// ── SVG Sankey Layout Engine ───────────────────────────────────────────────

interface LayoutNode extends SankeyNode {
  x: number
  y: number
  width: number
  height: number
  column: number
  colorIndex: number
}

interface LayoutLink {
  source: LayoutNode
  target: LayoutNode
  value: number
  sourceY: number
  targetY: number
  thickness: number
  color: string
  opacity: number
}

function layoutSankey(
  nodes: SankeyNode[],
  links: SankeyLink[],
  width: number,
  height: number,
  nodeWidth: number,
  nodePadding: number
): { nodes: LayoutNode[]; links: LayoutLink[] } {
  // Build adjacency
  const nodeMap = new Map<string, number>()
  nodes.forEach((n, i) => nodeMap.set(n.id, i))

  // Determine columns using BFS from source nodes
  const inDegree = new Map<string, number>()
  nodes.forEach((n) => inDegree.set(n.id, 0))
  links.forEach((l) =>
    inDegree.set(l.target, (inDegree.get(l.target) ?? 0) + 1)
  )

  const columns = new Map<string, number>()
  const queue = nodes
    .filter((n) => (inDegree.get(n.id) ?? 0) === 0)
    .map((n) => n.id)
  queue.forEach((id) => columns.set(id, 0))

  let head = 0
  while (head < queue.length) {
    const curr = queue[head++]!
    links.forEach((l) => {
      if (l.source === curr) {
        const newCol = (columns.get(curr) ?? 0) + 1
        if ((columns.get(l.target) ?? -1) < newCol) {
          columns.set(l.target, newCol)
          queue.push(l.target)
        }
      }
    })
  }

  // Nodes not reachable from source
  nodes.forEach((n) => {
    if (!columns.has(n.id)) columns.set(n.id, 0)
  })

  const maxCol = Math.max(...Array.from(columns.values()))
  const numCols = maxCol + 1

  // Group by column
  const byCol: Map<number, SankeyNode[]> = new Map()
  nodes.forEach((n) => {
    const col = columns.get(n.id) ?? 0
    if (!byCol.has(col)) byCol.set(col, [])
    byCol.get(col)!.push(n)
  })

  // Compute node values (sum of outgoing or incoming links)
  const nodeValue = new Map<string, number>()
  nodes.forEach((n) => nodeValue.set(n.id, 0))
  links.forEach((l) => {
    nodeValue.set(l.source, (nodeValue.get(l.source) ?? 0) + l.value)
    nodeValue.set(l.target, (nodeValue.get(l.target) ?? 0) + l.value)
  })

  // Compute layout
  const colXStep = numCols > 1 ? (width - nodeWidth) / (numCols - 1) : 0
  const layoutNodes: LayoutNode[] = []
  let colorIdx = 0

  for (const [col, colNodes] of byCol.entries()) {
    const totalValue = colNodes.reduce(
      (s, n) => s + (nodeValue.get(n.id) ?? 1),
      0
    )
    const availableHeight = height - nodePadding * (colNodes.length - 1)
    let yOffset = 0

    colNodes.forEach((n) => {
      const v = nodeValue.get(n.id) ?? 1
      const nodeH = Math.max(8, (v / totalValue) * availableHeight)
      layoutNodes.push({
        ...n,
        x: col * colXStep,
        y: yOffset,
        width: nodeWidth,
        height: nodeH,
        column: col,
        colorIndex: colorIdx % 5,
      })
      yOffset += nodeH + nodePadding
      colorIdx++
    })
  }

  // Compute link paths
  const nodeById = new Map<string, LayoutNode>()
  layoutNodes.forEach((n) => nodeById.set(n.id, n))

  // Track offsets for link placement on source/target nodes
  const sourceOffset = new Map<string, number>()
  const targetOffset = new Map<string, number>()
  layoutNodes.forEach((n) => {
    sourceOffset.set(n.id, n.y)
    targetOffset.set(n.id, n.y)
  })

  const layoutLinks: LayoutLink[] = links.map((l) => {
    const src = nodeById.get(l.source)!
    const tgt = nodeById.get(l.target)!
    const srcNode = layoutNodes.find((n) => n.id === l.source)!
    const tgtNode = layoutNodes.find((n) => n.id === l.target)!

    const totalSrcValue = links
      .filter((lk) => lk.source === l.source)
      .reduce((s, lk) => s + lk.value, 0)
    const totalTgtValue = links
      .filter((lk) => lk.target === l.target)
      .reduce((s, lk) => s + lk.value, 0)

    const srcH = (l.value / totalSrcValue) * srcNode.height
    const tgtH = (l.value / totalTgtValue) * tgtNode.height
    const thickness = Math.max(2, Math.min(srcH, tgtH))

    const sy = (sourceOffset.get(l.source) ?? srcNode.y) + thickness / 2
    const ty = (targetOffset.get(l.target) ?? tgtNode.y) + thickness / 2

    sourceOffset.set(l.source, sy - thickness / 2 + thickness)
    targetOffset.set(l.target, ty - thickness / 2 + thickness)

    const srcColor =
      src.color ?? CHART_COLORS[src.colorIndex % CHART_COLORS.length]!

    return {
      source: src,
      target: tgt,
      value: l.value,
      sourceY: sy,
      targetY: ty,
      thickness,
      color: srcColor,
      opacity: 0.35,
    }
  })

  return { nodes: layoutNodes, links: layoutLinks }
}

// ── SankeyChart ────────────────────────────────────────────────────────────

export function SankeyChart({
  nodes,
  links,
  title,
  subtitle,
  footer,
  height = 360,
  nodeWidth = 18,
  nodePadding = 16,
  showLabels = true,
  showValues = true,
  valueFormatter,
  format,
  decimals = 0,
  currency = "USD",
  abbreviate = false,
  loading = false,
  locale: localeProp,
  className,
  ...props
}: SankeyChartProps) {
  const locale = useUILocale(localeProp)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [svgWidth, setSvgWidth] = React.useState(600)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    setSvgWidth(el.clientWidth)
    const ro = new ResizeObserver((entries) => {
      setSvgWidth(entries[0]!.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const formatValue = React.useCallback(
    (v: number) => {
      if (valueFormatter) return valueFormatter(v)
      return formatChartValue(v, {
        format,
        decimals,
        locale,
        currency,
        abbreviate,
      })
    },
    [valueFormatter, format, decimals, locale, currency, abbreviate]
  )

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <CardHeader>
            {title && <Skeleton className="h-5 w-48" />}
            {subtitle && <Skeleton className="mt-1 h-4 w-64" />}
          </CardHeader>
        )}
        <CardContent>
          <Skeleton className="w-full rounded-lg" style={{ height }} />
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  // ── Empty ────────────────────────────────────────────────────────────────

  if (nodes.length === 0 || links.length === 0) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        {(title || subtitle) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          <div
            className="flex items-center justify-center text-sm text-muted-foreground"
            style={{ height }}
          >
            {UI_I18N[locale].emptyState.noData}
          </div>
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    )
  }

  const innerH = height - 16
  const innerW = svgWidth - (showLabels ? 80 : 16)
  const { nodes: lnodes, links: llinks } = layoutSankey(
    nodes,
    links,
    innerW,
    innerH,
    nodeWidth,
    nodePadding
  )

  const labelOffset = showLabels ? 40 : 8

  return (
    <Card className={cn("w-full", className)} {...props}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div
          ref={containerRef}
          className={sankeyChartContainerVariants()}
          style={{ height }}
          role="img"
          aria-label={title ?? "Sankey diagram"}
        >
          <svg
            width="100%"
            height={innerH}
            viewBox={`0 0 ${svgWidth} ${innerH}`}
            overflow="visible"
          >
            <g transform={`translate(${labelOffset}, 8)`}>
              {/* Links */}
              {llinks.map((link, i) => {
                const x1 = link.source.x + nodeWidth
                const x2 = link.target.x
                const y1 = link.sourceY
                const y2 = link.targetY
                const cx = (x1 + x2) / 2
                const d = `M ${x1},${y1} C ${cx},${y1} ${cx},${y2} ${x2},${y2}`
                return (
                  <path
                    key={`link-${i}`}
                    d={d}
                    fill="none"
                    stroke={link.color}
                    strokeWidth={link.thickness}
                    strokeOpacity={link.opacity}
                  >
                    <title>
                      {link.source.name} → {link.target.name}:{" "}
                      {formatValue(link.value)}
                    </title>
                  </path>
                )
              })}

              {/* Nodes */}
              {lnodes.map((node) => {
                const color =
                  node.color ??
                  CHART_COLORS[node.colorIndex % CHART_COLORS.length]
                const isLastCol =
                  node.column === Math.max(...lnodes.map((n) => n.column))

                return (
                  <g key={node.id}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width={nodeWidth}
                      height={node.height}
                      fill={color}
                      rx={3}
                    >
                      <title>{node.name}</title>
                    </rect>
                    {showLabels && (
                      <text
                        x={isLastCol ? node.x + nodeWidth + 6 : node.x - 6}
                        y={node.y + node.height / 2}
                        textAnchor={isLastCol ? "start" : "end"}
                        dominantBaseline="middle"
                        className="fill-foreground text-xs font-medium"
                        fontSize={11}
                      >
                        {node.name}
                      </text>
                    )}
                    {showValues && (
                      <text
                        x={isLastCol ? node.x + nodeWidth + 6 : node.x - 6}
                        y={node.y + node.height / 2 + 14}
                        textAnchor={isLastCol ? "start" : "end"}
                        dominantBaseline="middle"
                        className="fill-muted-foreground"
                        fontSize={10}
                      >
                        {formatValue(
                          links
                            .filter(
                              (l) =>
                                l.source === node.id || l.target === node.id
                            )
                            .reduce((s, l) => s + l.value, 0) / 2
                        )}
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>
        </div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
