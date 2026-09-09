"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  Download,
  Eye,
  File,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  FileArchive,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Types ──────────────────────────────────────────────────────────────────

export type FilePreviewSize = "sm" | "md" | "lg"

export type FilePreviewVariant = "card" | "row" | "thumbnail"

export interface FilePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName: string
  fileSize?: number
  fileType?: string
  /** URL for image previews */
  previewUrl?: string
  onDownload?: () => void
  onPreview?: () => void
  onRemove?: () => void
  size?: FilePreviewSize
  variant?: FilePreviewVariant
  loading?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const filePreviewContainerVariants = cva(
  "group relative flex items-center rounded-lg border border-border bg-card transition-colors hover:bg-accent/40",
  {
    variants: {
      size: {
        sm: "gap-2 p-2",
        md: "gap-3 p-3",
        lg: "gap-4 p-4",
      },
      variant: {
        card: "flex-col items-start",
        row: "flex-row",
        thumbnail: "flex-col items-center",
      },
    },
    defaultVariants: { size: "md", variant: "row" },
  }
)

export const filePreviewIconVariants = cva("shrink-0 rounded-md", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-9",
      lg: "size-12",
    },
  },
  defaultVariants: { size: "md" },
})

export const filePreviewNameVariants = cva(
  "truncate font-medium text-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export const filePreviewMetaVariants = cva(
  "text-muted-foreground tabular-nums",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
)

// ── Skeleton dims ─────────────────────────────────────────────────────────

const skeletonDims: Record<
  FilePreviewSize,
  { icon: string; name: string; meta: string }
> = {
  sm: { icon: "size-7", name: "h-3 w-32", meta: "h-3 w-16" },
  md: { icon: "size-9", name: "h-4 w-40", meta: "h-3 w-20" },
  lg: { icon: "size-12", name: "h-5 w-48", meta: "h-4 w-24" },
}

// ── File type mapping ─────────────────────────────────────────────────────

interface FileTypeConfig {
  Icon: React.ElementType
  color: string
  bgColor: string
}

function getFileConfig(fileName: string, fileType?: string): FileTypeConfig {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? ""
  const mime = fileType?.toLowerCase() ?? ""

  if (
    mime.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(ext)
  ) {
    return {
      Icon: FileImage,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    }
  }
  if (ext === "pdf" || mime.includes("pdf")) {
    return { Icon: FileText, color: "text-red-500", bgColor: "bg-red-500/10" }
  }
  if (["xls", "xlsx", "csv"].includes(ext) || mime.includes("spreadsheet")) {
    return {
      Icon: FileSpreadsheet,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    }
  }
  if (
    ["mp4", "mov", "avi", "mkv", "webm"].includes(ext) ||
    mime.startsWith("video/")
  ) {
    return {
      Icon: FileVideo,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    }
  }
  if (
    [
      "js",
      "ts",
      "tsx",
      "jsx",
      "py",
      "rs",
      "go",
      "java",
      "json",
      "yml",
      "yaml",
    ].includes(ext)
  ) {
    return {
      Icon: FileCode,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    }
  }
  if (["doc", "docx", "txt", "md", "rtf"].includes(ext)) {
    return { Icon: FileText, color: "text-foreground", bgColor: "bg-muted" }
  }
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) {
    return {
      Icon: FileArchive,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    }
  }
  return { Icon: File, color: "text-muted-foreground", bgColor: "bg-muted" }
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return ""
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`
}

// ── FilePreview ────────────────────────────────────────────────────────────

export function FilePreview({
  fileName,
  fileSize,
  fileType,
  previewUrl,
  onDownload,
  onPreview,
  onRemove,
  size = "md",
  variant = "row",
  loading = false,
  className,
  ...props
}: FilePreviewProps) {
  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    const d = skeletonDims[size]
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border border-border p-3",
          className
        )}
        aria-hidden="true"
      >
        <Skeleton className={cn("shrink-0 rounded-md", d.icon)} />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className={d.name} />
          <Skeleton className={d.meta} />
        </div>
      </div>
    )
  }

  const { Icon, color, bgColor } = getFileConfig(fileName, fileType)
  const formattedSize = formatFileSize(fileSize)
  const isImage =
    fileType?.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].some((e) =>
      fileName.toLowerCase().endsWith(`.${e}`)
    )

  const ext = fileName.split(".").pop()?.toUpperCase()

  return (
    <div
      className={cn(filePreviewContainerVariants({ size, variant }), className)}
      {...props}
    >
      {/* File icon or thumbnail */}
      {isImage && previewUrl ? (
        <div
          className={cn(
            "shrink-0 overflow-hidden rounded-md",
            filePreviewIconVariants({ size })
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={fileName}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md",
            filePreviewIconVariants({ size }),
            bgColor
          )}
        >
          <Icon className={cn("size-4", color)} />
        </div>
      )}

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={filePreviewNameVariants({ size })} title={fileName}>
          {fileName}
        </span>
        <div className="flex items-center gap-2">
          {ext && (
            <Badge variant="secondary" className="h-4 px-1 text-xs">
              {ext}
            </Badge>
          )}
          {formattedSize && (
            <span className={filePreviewMetaVariants({ size })}>
              {formattedSize}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ml-auto flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {onPreview && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onPreview}
            aria-label="Preview file"
          >
            <Eye className="size-3.5" />
          </Button>
        )}
        {onDownload && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={onDownload}
            aria-label="Download file"
          >
            <Download className="size-3.5" />
          </Button>
        )}
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-destructive hover:text-destructive"
            onClick={onRemove}
            aria-label="Remove file"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}

// ── FilePreviewList ────────────────────────────────────────────────────────

export interface FilePreviewListProps extends React.HTMLAttributes<HTMLDivElement> {
  files: Omit<FilePreviewProps, "size" | "variant">[]
  size?: FilePreviewSize
  variant?: FilePreviewVariant
  loading?: boolean
  loadingCount?: number
}

export function FilePreviewList({
  files,
  size = "md",
  variant = "row",
  loading = false,
  loadingCount = 3,
  className,
  ...props
}: FilePreviewListProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {loading
        ? Array.from({ length: loadingCount }).map((_, i) => (
            <FilePreview
              key={i}
              fileName=""
              size={size}
              variant={variant}
              loading
            />
          ))
        : files.map((file, i) => (
            <FilePreview key={i} {...file} size={size} variant={variant} />
          ))}
    </div>
  )
}
