"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
  type RowData,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Download,
  Table2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type UILocale, UI_I18N } from "@/lib/ui-i18n"
import { formatValue as fmtValue } from "@/lib/format-utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ds/pagination"
import { SearchBar } from "@/components/ds/search-bar"

// ── ColumnMeta Augmentation ────────────────────────────────────────────────
// Extends TanStack Table's column metadata type with layout and display hints.

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right"
    width?: number
    flexGrow?: number
    wrap?: boolean
    format?: "percent" | "currency" | "number" | "money"
    locale?: string
    formatOptions?: Intl.NumberFormatOptions
  }
}

// ── Types ──────────────────────────────────────────────────────────────────

/**
 * Convenience column descriptor. Pass to `col()` to produce a `ColumnDef`.
 * Use `ColumnDef<T>` directly when you need the full TanStack Table API.
 */
export interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  width?: number
  flexGrow?: number
  format?: "percent" | "currency" | "number" | "money"
  locale?: string
  formatOptions?: Intl.NumberFormatOptions
  wrap?: boolean
  sortable?: boolean
  align?: "left" | "center" | "right"
  cell?: (value: unknown, row: T) => React.ReactNode
}

export interface DataTableLabels {
  searchPlaceholder?: string
  noData?: string
  noDataDescription?: string
  pagination?: {
    of?: string
    pluralItemName?: string
    rowsPerPage?: string
    prev?: string
    next?: string
  }
  actions?: {
    download?: string
    clearSearch?: string
  }
  selection?: {
    selectAll?: string
    selectRow?: string
  }
}

export interface DataTableProps<
  TData,
> extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnDef<TData>[]
  data: TData[]

  // Header
  title?: string
  subtitle?: string

  // Footer
  footer?: React.ReactNode

  // Layout
  rowHeight?: number
  height?: number
  width?: string | number
  size?: "compact" | "default"
  textSize?: "xs" | "sm" | "md" | "lg"
  rounded?: boolean
  paginationRounded?: "full" | "light" | "none"

  // Features
  loading?: boolean
  showSearch?: boolean
  pagination?: boolean
  manualPagination?: boolean
  pageCount?: number
  rowCount?: number
  defaultPageSize?: number
  pageIndex?: number
  defaultGlobalFilter?: string
  pageSizeOptions?: number[]
  selectRows?: boolean
  stickyColumns?: number
  onPageChange?: (pageIndex: number) => void

  // Toolbar
  toolbar?: React.ReactNode
  showDownload?: boolean
  onDownload?: () => void
  voiceSearch?: boolean
  onVoiceStart?: () => void
  onVoiceEnd?: () => void
  onVoiceError?: (error: string) => void

  // Handlers
  onRowClick?: (row: TData) => void
  onSelectedRowsChange?: (rows: TData[]) => void

  // Labels
  locale?: UILocale
  labels?: DataTableLabels

  // Infinite scroll (non-paginated mode)
  hasMore?: boolean
  onLoadMore?: () => void

  ariaLabel?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatValue(
  val: unknown,
  format?: string,
  locale?: string,
  formatOptions?: Intl.NumberFormatOptions
): string {
  if (val == null) return ""
  const n = Number(val)
  switch (format) {
    case "percent":
      return fmtValue(n, "percent", {
        decimals: formatOptions?.minimumFractionDigits ?? 2,
        locale,
      })
    case "currency":
    case "money":
      return fmtValue(n, "currency", {
        currency: formatOptions?.currency ?? "BRL",
        decimals:
          formatOptions?.minimumFractionDigits ??
          formatOptions?.maximumFractionDigits ??
          2,
        locale: locale ?? "pt-BR",
      })
    case "number":
      return fmtValue(n, "float", {
        decimals: formatOptions?.maximumFractionDigits ?? 2,
        locale,
      })
    default:
      return String(val)
  }
}

/**
 * Converts a simple `DataTableColumn` descriptor into a TanStack Table `ColumnDef`.
 *
 * @example
 * const columns: ColumnDef<Student>[] = [
 *   col({ key: "name",   label: "Name",   sortable: true }),
 *   col({ key: "course", label: "Course", width: 220 }),
 *   col({ key: "gpa",    label: "GPA",    align: "center", sortable: true }),
 *   col({ key: "status", label: "Status", cell: (_, row) => <Badge>{row.status}</Badge> }),
 * ]
 */
export function col<T extends object>(def: DataTableColumn<T>): ColumnDef<T> {
  return {
    id: def.key,
    accessorKey: def.key,
    header: def.label,
    enableSorting: def.sortable ?? false,
    enableColumnFilter: false,
    meta: {
      align: def.align,
      width: def.width,
      flexGrow: def.flexGrow,
      wrap: def.wrap,
      format: def.format,
      locale: def.locale,
      formatOptions: def.formatOptions,
    },
    cell: def.cell
      ? ({ row, getValue }) => def.cell!(getValue(), row.original)
      : ({ getValue, column }) =>
          formatValue(
            getValue(),
            column.columnDef.meta?.format,
            column.columnDef.meta?.locale,
            column.columnDef.meta?.formatOptions
          ),
  }
}

// ── Column sizing ──────────────────────────────────────────────────────────

function colStyle(
  meta: ColumnDef<unknown>["meta"],
  override?: number
): React.CSSProperties {
  const w = override ?? meta?.width
  return {
    flexGrow: w ? 0 : (meta?.flexGrow ?? 1),
    flexShrink: w ? 0 : 1,
    flexBasis: w ? `${w}px` : "auto",
    width: w ? `${w}px` : "auto",
    minWidth: w ? `${w}px` : "100px",
  }
}

// ── Table Primitives ───────────────────────────────────────────────────────
// Exported for consumers who need a custom table layout without DataTable's
// state management and virtualization.

export const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
))
Table.displayName = "Table"

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-border bg-muted transition-colors duration-200",
      sticky && "sticky top-0 z-10",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-b-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { clickable?: boolean }
>(({ className, clickable, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border/40 transition-colors duration-150 hover:bg-muted/40",
      clickable && "cursor-pointer",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "bg-inherit px-4 py-3 text-left align-middle text-xs font-medium tracking-wide text-muted-foreground uppercase",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-4 py-3 align-middle text-sm text-foreground tabular-nums",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

// ── Skeleton ───────────────────────────────────────────────────────────────

const SKELETON_WIDTHS = [72, 88, 56, 78, 92, 62, 82, 68, 52, 80]

interface DataTableSkeletonProps {
  columns: ColumnDef<unknown>[]
  rowCount: number
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasFooter?: boolean
  showSearch?: boolean
  hasToolbar?: boolean
  pagination?: boolean
  rounded?: boolean
  className?: string
}

function DataTableSkeleton({
  columns,
  rowCount,
  hasTitle,
  hasSubtitle,
  hasFooter,
  showSearch,
  hasToolbar,
  pagination,
  rounded = true,
  className,
}: DataTableSkeletonProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {(hasTitle || hasSubtitle) && (
        <div className="flex flex-col gap-1.5">
          {hasTitle && (
            <Skeleton
              className="h-5 w-44 rounded-md"
              style={{ animationDelay: "0s" }}
            />
          )}
          {hasSubtitle && (
            <Skeleton
              className="h-3.5 w-64 rounded-md"
              style={{ animationDelay: "0.05s" }}
            />
          )}
        </div>
      )}

      {(hasToolbar || showSearch) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {hasToolbar && (
              <Skeleton
                className="h-9 w-28 rounded-md"
                style={{ animationDelay: "0.1s" }}
              />
            )}
          </div>
          {showSearch && (
            <Skeleton
              className="h-8 w-72 rounded-md"
              style={{ animationDelay: "0.15s" }}
            />
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full overflow-hidden border border-border shadow-sm",
          rounded && "rounded-xl"
        )}
      >
        {/* Header */}
        <div className="flex border-b border-border bg-muted px-1">
          {columns.map((col, i) => (
            <div
              key={i}
              className="flex items-center px-3 py-3"
              style={colStyle(col.meta)}
            >
              <Skeleton
                className="h-2.5 rounded-sm"
                style={{
                  width: `${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] * 0.45}px`,
                  animationDelay: `${0.2 + i * 0.04}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rowCount }).map((_, r) => (
          <div
            key={r}
            className="flex border-b border-border/40 px-1 last:border-b-0"
          >
            {columns.map((col, c) => {
              const pct =
                SKELETON_WIDTHS[
                  (r * columns.length + c) % SKELETON_WIDTHS.length
                ]
              return (
                <div
                  key={c}
                  className="flex items-center px-3 py-3"
                  style={colStyle(col.meta)}
                >
                  <Skeleton
                    className="h-4 rounded-sm"
                    style={{
                      width: `${pct}%`,
                      animationDelay: `${0.25 + r * 0.04 + c * 0.02}s`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        ))}

        {pagination && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <Skeleton
              className="h-4 w-32 rounded-md"
              style={{ animationDelay: "0.55s" }}
            />
            <div className="flex items-center gap-2">
              <Skeleton
                className="size-8 rounded-md"
                style={{ animationDelay: "0.6s" }}
              />
              <Skeleton
                className="h-4 w-20 rounded-md"
                style={{ animationDelay: "0.65s" }}
              />
              <Skeleton
                className="size-8 rounded-md"
                style={{ animationDelay: "0.7s" }}
              />
            </div>
          </div>
        )}
      </div>

      {hasFooter && (
        <div className="flex items-center gap-2 px-1">
          <Skeleton
            className="h-3.5 w-48 rounded-md"
            style={{ animationDelay: "0.75s" }}
          />
          <Skeleton
            className="ml-auto h-3.5 w-24 rounded-md"
            style={{ animationDelay: "0.8s" }}
          />
        </div>
      )}
    </div>
  )
}

// ── Empty State ────────────────────────────────────────────────────────────

function DataTableEmpty({
  message,
  description,
}: {
  message: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50">
        <Table2 className="size-7 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{message}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

// ── Pagination ─────────────────────────────────────────────────────────────

function buildPageRange(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const left = currentPage - 1
  const right = currentPage + 1
  const pages: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      pages.push(i)
    }
  }
  const range: (number | "ellipsis")[] = []
  let prev: number | null = null
  for (const p of pages) {
    if (prev !== null) {
      if (p - prev === 2) range.push(prev + 1)
      else if (p - prev > 2) range.push("ellipsis")
    }
    range.push(p)
    prev = p
  }
  return range
}

interface PaginationBarProps {
  pageIndex: number
  pageCount: number
  totalRows: number
  pageSize: number
  pageSizeOptions?: number[]
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onPageChange: (index: number) => void
  onPageSizeChange?: (size: number) => void
  itemLabel: string
  rowsPerPageLabel: string
  ofLabel: string
  prevLabel: string
  nextLabel: string
  rounded?: "full" | "light" | "none"
}

function PaginationBar({
  pageIndex,
  pageCount,
  totalRows,
  pageSize,
  pageSizeOptions,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onPageChange,
  onPageSizeChange,
  itemLabel,
  rowsPerPageLabel,
  ofLabel,
  prevLabel,
  nextLabel,
  rounded = "full",
}: PaginationBarProps) {
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, totalRows)
  const pageRange = buildPageRange(pageIndex + 1, pageCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card px-4 py-2">
      <div className="flex items-center gap-4">
        <p className="text-xs text-muted-foreground">
          {totalRows === 0
            ? `0 ${itemLabel}`
            : `${start}–${end} ${ofLabel} ${totalRows} ${itemLabel}`}
        </p>

        {pageSizeOptions && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="dt-page-size"
              className="text-xs text-muted-foreground"
            >
              {rowsPerPageLabel}
            </label>
            <select
              id="dt-page-size"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 rounded-md border border-border bg-background px-2 text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <Pagination className="m-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text={prevLabel}
              rounded={rounded}
              onClick={(e) => {
                e.preventDefault()
                onPrev()
              }}
              aria-disabled={!canPrev}
              className={cn(
                "hover:bg-primary/10",
                !canPrev && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {pageRange.map((p, i) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ell-${i}`} className="hidden sm:flex">
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p} className="hidden sm:flex">
                <PaginationLink
                  href="#"
                  isActive={p === pageIndex + 1}
                  rounded={rounded}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(p - 1)
                  }}
                  className={cn(
                    p === pageIndex + 1
                      ? "border-transparent bg-primary/15 text-primary hover:bg-primary/20"
                      : "hover:bg-primary/10"
                  )}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              text={nextLabel}
              rounded={rounded}
              onClick={(e) => {
                e.preventDefault()
                onNext()
              }}
              aria-disabled={!canNext}
              className={cn(
                "hover:bg-primary/10",
                !canNext && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

// ── Cell size presets ──────────────────────────────────────────────────────

const SIZE_PRESETS = {
  xs: { pad: "px-2 py-1", font: "text-xs", rowH: 32 },
  sm: { pad: "px-3 py-2", font: "text-xs", rowH: 36 },
  md: { pad: "px-4 py-2.5", font: "text-sm", rowH: 40 },
  lg: { pad: "px-4 py-3", font: "text-sm", rowH: 48 },
} as const

// ── DataTable ──────────────────────────────────────────────────────────────

export function DataTable<TData extends object>({
  columns,
  data,
  title,
  subtitle,
  footer,
  rowHeight,
  height = 400,
  loading = false,
  width,
  size = "default",
  textSize: _textSize,
  rounded = true,
  paginationRounded,
  showSearch = false,
  pagination = false,
  manualPagination = false,
  pageCount,
  rowCount,
  defaultPageSize = 10,
  defaultGlobalFilter = "",
  pageSizeOptions,
  selectRows = false,
  stickyColumns = 0,
  onPageChange,
  pageIndex,
  toolbar,
  showDownload = false,
  onDownload,
  voiceSearch = false,
  onVoiceStart,
  onVoiceEnd,
  onVoiceError,
  onRowClick,
  onSelectedRowsChange,
  hasMore = false,
  onLoadMore,
  locale,
  labels,
  ariaLabel,
  className,
  ...props
}: DataTableProps<TData>) {
  const textSize = _textSize ?? (size === "compact" ? "sm" : "md")
  const { pad, font, rowH } = SIZE_PRESETS[textSize]
  const actualRowHeight = rowHeight ?? rowH

  // ── Labels ──

  const i18n = locale ? UI_I18N[locale] : null

  const l = {
    searchPlaceholder:
      labels?.searchPlaceholder ??
      i18n?.dataTable.searchPlaceholder ??
      "Search...",
    noData: labels?.noData ?? i18n?.dataTable.noData ?? "No data found",
    noDataDescription:
      labels?.noDataDescription ??
      i18n?.dataTable.noDataDescription ??
      "Data will appear here once available.",
    pagination: {
      of: labels?.pagination?.of ?? i18n?.dataTable.of ?? "of",
      pluralItemName:
        labels?.pagination?.pluralItemName ?? i18n?.dataTable.rows ?? "rows",
      rowsPerPage:
        labels?.pagination?.rowsPerPage ??
        i18n?.dataTable.rowsPerPage ??
        "Rows per page",
      prev: labels?.pagination?.prev ?? i18n?.pagination.previous ?? "Previous",
      next: labels?.pagination?.next ?? i18n?.pagination.next ?? "Next",
    },
    actions: {
      download: labels?.actions?.download ?? "Export",
      clearSearch:
        labels?.actions?.clearSearch ??
        i18n?.combobox.clearSearch ??
        "Clear search",
    },
    selection: {
      selectAll: labels?.selection?.selectAll ?? "Select all",
      selectRow: labels?.selection?.selectRow ?? "Select row",
    },
  }

  // ── TanStack Table state ──

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [pagination_, setPagination] = React.useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: defaultPageSize,
  })

  // Reset page when global filter changes
  const handleGlobalFilter = React.useCallback((value: string) => {
    setGlobalFilter(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }, [])

  // Sync internal pagination when external pageIndex prop changes
  React.useEffect(() => {
    if (pageIndex !== undefined && pageIndex !== pagination_.pageIndex) {
      setPagination((prev) => ({ ...prev, pageIndex }))
    }
  }, [pageIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Selection column ──

  const selectionColumn = React.useMemo<ColumnDef<TData>>(
    () => ({
      id: "__select__",
      meta: { width: 48 },
      enableSorting: false,
      header: ({ table }) => (
        <input
          type="checkbox"
          aria-label={l.selection.selectAll}
          checked={table.getIsAllPageRowsSelected()}
          ref={(el) => {
            if (el) el.indeterminate = table.getIsSomePageRowsSelected()
          }}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="size-4 cursor-pointer accent-primary"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          aria-label={`${l.selection.selectRow} ${row.index + 1}`}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
          className="size-4 cursor-pointer accent-primary"
        />
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tableColumns = React.useMemo(
    () => (selectRows ? [selectionColumn, ...columns] : columns),
    [selectRows, selectionColumn, columns]
  )

  // ── useReactTable ──

  const paginationConfig = React.useMemo(() => {
    if (!pagination) return {}
    if (manualPagination) {
      return {
        manualPagination: true,
        // -1 = TanStack "unknown total, always allow next" — used while meta is loading
        pageCount: pageCount ?? -1,
        ...(rowCount != null && { rowCount }),
        onPaginationChange: setPagination,
      }
    }
    return {
      onPaginationChange: setPagination,
      getPaginationRowModel: getPaginationRowModel(),
    }
  }, [pagination, manualPagination, pageCount, rowCount])

  // Notify parent of pagination changes after render (never during render)
  const prevPageRef = React.useRef(pagination_.pageIndex)
  React.useEffect(() => {
    if (!manualPagination || !onPageChange || !pagination) return
    if (prevPageRef.current !== pagination_.pageIndex) {
      prevPageRef.current = pagination_.pageIndex
      onPageChange(pagination_.pageIndex)
    }
  }, [manualPagination, onPageChange, pagination, pagination_.pageIndex])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      ...(pagination && { pagination: pagination_ }),
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: handleGlobalFilter,
    onRowSelectionChange: setRowSelection,
    ...paginationConfig,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination &&
      !manualPagination && { getPaginationRowModel: getPaginationRowModel() }),
    enableRowSelection: selectRows,
    globalFilterFn: "includesString",
    autoResetPageIndex: !manualPagination,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
  })

  // ── Selection callback ──

  React.useEffect(() => {
    if (!onSelectedRowsChange) return
    onSelectedRowsChange(
      table.getSelectedRowModel().rows.map((r) => r.original)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  // ── Virtualization ──

  const parentRef = React.useRef<HTMLDivElement>(null)
  const rows = table.getRowModel().rows

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => actualRowHeight,
    overscan: 10,
  })

  const virtualItems = virtualizer.getVirtualItems()

  // ── Infinite scroll trigger ──

  React.useEffect(() => {
    if (!hasMore || loading || pagination) return
    const last = virtualItems[virtualItems.length - 1]
    if (last && last.index >= rows.length - 5) onLoadMore?.()
  }, [virtualItems, rows.length, hasMore, loading, pagination, onLoadMore])

  // ── Sticky column left offsets ──

  const stickyLefts = React.useMemo(() => {
    const offsets: number[] = []
    let acc = selectRows ? 48 : 0
    for (let i = 0; i < stickyColumns; i++) {
      offsets.push(acc)
      const col = columns[i]
      acc += (col?.meta as { width?: number })?.width ?? 100
    }
    return offsets
  }, [stickyColumns, columns, selectRows])

  // ── Min table width ──

  const minTableWidth = React.useMemo(() => {
    let total = selectRows ? 48 : 0
    tableColumns.forEach((col) => {
      if (col.id === "__select__") return
      total += (col.meta as { width?: number } | undefined)?.width ?? 100
    })
    return total
  }, [tableColumns, selectRows])

  // ── Skeleton row count ──

  const skeletonRowCount = Math.max(4, Math.floor(height / actualRowHeight) - 1)

  // First-load skeleton
  if (loading && data.length === 0) {
    return (
      <DataTableSkeleton
        columns={columns as ColumnDef<unknown>[]}
        rowCount={skeletonRowCount}
        hasTitle={!!title}
        hasSubtitle={!!subtitle}
        hasFooter={!!footer}
        showSearch={showSearch}
        hasToolbar={!!(toolbar || showDownload)}
        pagination={pagination}
        rounded={rounded}
        className={className}
      />
    )
  }

  const hasToolbarRow = !!(toolbar || showDownload || showSearch)

  return (
    <div
      data-slot="data-table"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    >
      {/* ── Header ── */}
      {(title || subtitle) && (
        <div className="flex flex-col gap-0.5">
          {title && (
            <h3 className="text-sm leading-tight font-semibold text-foreground">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {/* ── Toolbar ── */}
      {hasToolbarRow && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {toolbar}
            {showDownload && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download data-icon="inline-start" />
                {l.actions.download}
              </Button>
            )}
          </div>

          {showSearch && (
            <SearchBar
              value={globalFilter}
              onChange={handleGlobalFilter}
              placeholder={l.searchPlaceholder}
              size="sm"
              rounded="md"
              disabled={loading}
              locale={locale}
              voice={voiceSearch}
              onVoiceStart={onVoiceStart}
              onVoiceEnd={onVoiceEnd}
              onVoiceError={onVoiceError}
              className="mt-2 mr-2 w-72 min-w-[140px]"
            />
          )}
        </div>
      )}

      {/* ── Table wrapper ── */}
      <div
        className={cn(
          "relative w-full overflow-hidden border border-border bg-card shadow-sm",
          rounded && "rounded-xl"
        )}
        style={{ width: width ?? "100%" }}
      >
        {/* Refetch progress bar */}
        {loading && data.length > 0 && (
          <div
            className={cn(
              "absolute inset-x-0 top-0 z-50 h-0.5 overflow-hidden",
              rounded && "rounded-t-xl"
            )}
          >
            <div className="h-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-primary opacity-70" />
          </div>
        )}

        {/* Scrollable viewport */}
        <div
          ref={parentRef}
          className="relative w-full overflow-auto bg-card"
          style={{ height: `${height}px` }}
          tabIndex={0}
          role="region"
          aria-label={ariaLabel ?? `Table with ${data.length} rows`}
          aria-busy={loading}
        >
          <Table className="block w-full" style={{ minWidth: minTableWidth }}>
            {/* ── Sticky header ── */}
            <TableHeader
              sticky
              className="block w-full"
              style={{ minWidth: minTableWidth }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="flex w-full">
                  {headerGroup.headers.map((header, hi) => {
                    const meta = header.column.columnDef.meta
                    const isSelect = header.column.id === "__select__"
                    const colIdx = isSelect ? -1 : hi - (selectRows ? 1 : 0)
                    const isSticky = isSelect || colIdx < stickyColumns
                    const stickyLeft = isSelect
                      ? 0
                      : (stickyLefts[colIdx] ?? undefined)
                    const isSorted = header.column.getIsSorted()
                    const canSort = header.column.getCanSort()

                    const sizedWidth = table.getState().columnSizing[header.id]

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "relative flex items-center gap-1.5 whitespace-nowrap select-none",
                          pad,
                          isSelect && "w-12 shrink-0 justify-center px-0",
                          meta?.align === "center" &&
                            "justify-center text-center",
                          meta?.align === "right" && "justify-end text-right",
                          canSort &&
                            "cursor-pointer hover:bg-primary/10 hover:text-foreground",
                          isSticky &&
                            !isSelect &&
                            "sticky z-20 bg-muted text-foreground",
                          isSelect && "sticky z-30 bg-muted",
                          isSorted &&
                            "border-b-2 border-primary bg-primary/15 text-primary"
                        )}
                        style={{
                          ...(isSelect
                            ? { width: 48, flexGrow: 0, flexShrink: 0 }
                            : colStyle(meta, sizedWidth)),
                          left: stickyLeft,
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <span
                            className={cn(
                              "ml-auto shrink-0",
                              isSorted ? "opacity-100" : "opacity-60"
                            )}
                          >
                            {isSorted === "asc" ? (
                              <ArrowUp className="size-3" />
                            ) : isSorted === "desc" ? (
                              <ArrowDown className="size-3" />
                            ) : (
                              <ChevronsUpDown className="size-3" />
                            )}
                          </span>
                        )}
                        {!isSelect && !!meta?.width && (
                          <div
                            onMouseDown={(e) => {
                              e.stopPropagation()
                              header.getResizeHandler()(e)
                            }}
                            onTouchStart={header.getResizeHandler()}
                            className="group/resizer absolute top-0 right-0 flex h-full w-2 cursor-col-resize touch-none items-center justify-end select-none"
                          >
                            <span
                              className={cn(
                                "block h-4/5 w-px transition-colors",
                                header.column.getIsResizing()
                                  ? "bg-primary"
                                  : "bg-border group-hover/resizer:bg-primary/50"
                              )}
                            />
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* ── Virtualized body ── */}
            <TableBody
              style={{
                display: "block",
                height: `${virtualizer.getTotalSize()}px`,
                position: "relative",
                width: "100%",
                minWidth: minTableWidth,
              }}
            >
              {/* Data rows */}
              {virtualItems.map((vRow) => {
                const row = rows[vRow.index]
                const isSelected = row.getIsSelected()

                return (
                  <TableRow
                    key={row.id}
                    data-selected={isSelected || undefined}
                    clickable={!!onRowClick}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "group absolute top-0 left-0 flex w-full",
                      isSelected && "bg-primary/5",
                      loading && "pointer-events-none opacity-50"
                    )}
                    style={{
                      height: `${vRow.size}px`,
                      transform: `translateY(${vRow.start}px)`,
                      minWidth: minTableWidth,
                    }}
                  >
                    {row.getVisibleCells().map((cell, ci) => {
                      const meta = cell.column.columnDef.meta
                      const isSelect = cell.column.id === "__select__"
                      const colIdx = isSelect ? -1 : ci - (selectRows ? 1 : 0)
                      const isSticky = isSelect || colIdx < stickyColumns
                      const stickyLeft = isSelect
                        ? 0
                        : (stickyLefts[colIdx] ?? undefined)

                      const isCellSorted =
                        !isSelect && cell.column.getIsSorted() !== false

                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "flex items-center whitespace-nowrap",
                            pad,
                            font,
                            isSelect && "w-12 shrink-0 justify-center px-0",
                            meta?.align === "center" &&
                              "justify-center text-center",
                            meta?.align === "right" && "justify-end text-right",
                            isCellSorted && !isSticky && "bg-muted/30",
                            isSticky &&
                              !isSelect &&
                              "sticky z-10 bg-card group-hover:bg-muted group-data-selected:bg-primary/5",
                            isSelect &&
                              "sticky z-20 bg-card group-hover:bg-muted group-data-selected:bg-primary/10",
                            meta?.wrap &&
                              "h-auto items-start py-3 leading-relaxed wrap-break-word whitespace-normal"
                          )}
                          style={{
                            ...(isSelect
                              ? { width: 48, flexGrow: 0, flexShrink: 0 }
                              : colStyle(
                                  meta,
                                  table.getState().columnSizing[cell.column.id]
                                )),
                            left: stickyLeft,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Empty state — outside TableBody so inset-0 is relative to the fixed-height viewport */}
          {!loading && rows.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <DataTableEmpty
                message={l.noData}
                description={l.noDataDescription}
              />
            </div>
          )}
        </div>

        {/* ── Pagination bar ── */}
        {pagination && (
          <PaginationBar
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            totalRows={
              manualPagination && rowCount != null
                ? rowCount
                : table.getFilteredRowModel().rows.length
            }
            pageSize={table.getState().pagination.pageSize}
            pageSizeOptions={pageSizeOptions}
            canPrev={table.getCanPreviousPage()}
            canNext={table.getCanNextPage()}
            onPrev={() => table.previousPage()}
            onNext={() => table.nextPage()}
            onPageChange={(i) => table.setPageIndex(i)}
            onPageSizeChange={
              pageSizeOptions ? (s) => table.setPageSize(s) : undefined
            }
            itemLabel={l.pagination.pluralItemName}
            rowsPerPageLabel={l.pagination.rowsPerPage}
            ofLabel={l.pagination.of}
            prevLabel={l.pagination.prev}
            nextLabel={l.pagination.next}
            rounded={paginationRounded}
          />
        )}
      </div>

      {/* ── Footer ── */}
      {footer && (
        <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}

DataTable.displayName = "DataTable"
