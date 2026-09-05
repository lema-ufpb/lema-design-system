"use client"

import * as React from "react"
import { UploadCloudIcon, FileIcon, XIcon, Loader2Icon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export const fileUploadVariants = cva(
  "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
  {
    variants: {
      isDragActive: {
        true: "border-primary bg-primary/5",
        false: "border-border bg-background hover:bg-muted/50",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
      size: {
        sm: "min-h-32 p-4",
        md: "min-h-48 p-6",
      },
    },
    defaultVariants: {
      isDragActive: false,
      disabled: false,
      size: "md",
    },
  }
)

export interface FileUploadProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop" | "onChange">,
    VariantProps<typeof fileUploadVariants> {
  onUpload: (file: File) => void
  accept?: string
  maxSizeMB?: number
  progress?: number
  disabled?: boolean
  locale?: UILocale
}

// ── Component ──

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onUpload,
      accept = "*/*",
      maxSizeMB = 10,
      progress,
      disabled = false,
      locale = "pt-BR",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragActive, setIsDragActive] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const i18n = UI_I18N[locale].fileUpload
    const t = {
      dragDrop: i18n.dragDrop,
      clickToBrowse: i18n.clickToBrowse,
      maxSize: `${i18n.maxSizeLabel}: ${maxSizeMB}MB`,
      uploading: i18n.uploading,
      fileTooLarge: `${i18n.fileTooLargeLabel} ${maxSizeMB}MB.`,
      remove: i18n.remove,
    }

    const handleFile = (file: File) => {
      setError(null)
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(t.fileTooLarge)
        return
      }
      setSelectedFile(file)
      onUpload(file)
    }

    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return
      setIsDragActive(true)
    }

    const onDragLeave = () => {
      if (disabled) return
      setIsDragActive(false)
    }

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return
      setIsDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0])
      }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0])
      }
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedFile(null)
      setError(null)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const isUploading =
      progress !== undefined && progress >= 0 && progress < 100

    return (
      <div className="w-full">
        {!selectedFile ? (
          <div
            ref={ref}
            aria-label={t.dragDrop}
            aria-describedby="file-upload-hint"
            className={cn(
              fileUploadVariants({ isDragActive, disabled, size }),
              !disabled && "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              className
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            {...props}
          >
            <label className="flex w-full flex-col items-center justify-center">
              <input
                ref={inputRef}
                type="file"
                className="sr-only"
                accept={accept}
                onChange={onChange}
                disabled={disabled}
              />
              <UploadCloudIcon className="mb-4 size-10 text-muted-foreground" />
              <p className="text-center text-sm font-medium text-foreground">
                {t.dragDrop}
              </p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {t.clickToBrowse}
              </p>
              <p id="file-upload-hint" className="mt-4 text-center text-xs text-muted-foreground">
                {t.maxSize} · {accept}
              </p>
            </label>
          </div>
        ) : (
          <div
            ref={ref}
            className={cn(
              "flex flex-col gap-4 rounded-lg border border-border bg-background p-4",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                <FileIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatBytes(selectedFile.size)}
                </span>
              </div>
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={handleRemove}
                  aria-label={t.remove}
                >
                  <XIcon />
                </Button>
              )}
            </div>
            {isUploading && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Loader2Icon className="size-3 animate-spin" />{" "}
                    {t.uploading}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        )}
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"
