"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
  Bold,
  Code,
  Eye,
  Heading1,
  Italic,
  Link,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Quote,
  SplitSquareHorizontal,
  Type,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// ── Types ──────────────────────────────────────────────────────────────────

export type MarkdownEditorMode = "edit" | "preview" | "split"

export interface MarkdownEditorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  height?: number
  disabled?: boolean
  loading?: boolean
  mode?: MarkdownEditorMode
  showToolbar?: boolean
}

// ── Variants ───────────────────────────────────────────────────────────────

export const markdownEditorContainerVariants = cva(
  "w-full overflow-hidden rounded-xl border border-border bg-card",
  {
    variants: {},
    defaultVariants: {},
  }
)

export const markdownEditorTextareaVariants = cva(
  [
    "w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed",
    "text-foreground placeholder:text-muted-foreground",
    "focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
)

// ── Markdown renderer (regex-based, no deps) ──────────────────────────────

function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Code blocks (must be before inline code)
  html = html.replace(
    /```([a-z]*)\n([\s\S]*?)```/g,
    (_, _lang, code) =>
      `<pre class="rounded-lg bg-muted p-3 text-sm overflow-auto my-3"><code>${code}</code></pre>`
  )

  // Blockquote
  html = html.replace(
    /^&gt; (.+)$/gm,
    '<blockquote class="border-l-4 border-border pl-4 text-muted-foreground my-2">$1</blockquote>'
  )

  // Headings
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-2xl font-bold my-3">$1</h1>'
  )
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-xl font-semibold my-2">$1</h2>'
  )
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-lg font-semibold my-2">$1</h3>'
  )
  html = html.replace(
    /^#### (.+)$/gm,
    '<h4 class="text-base font-semibold my-1">$1</h4>'
  )

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-border my-4"/>')

  // Unordered list
  html = html.replace(
    /^[\*\-] (.+)$/gm,
    '<li class="ml-4 list-disc text-sm">$1</li>'
  )

  // Ordered list
  html = html.replace(
    /^\d+\. (.+)$/gm,
    '<li class="ml-4 list-decimal text-sm">$1</li>'
  )

  // Bold
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold">$1</strong>'
  )

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>')

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">$1</code>'
  )

  // Links
  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-primary underline underline-offset-4 hover:opacity-80" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Paragraphs (double newline = paragraph break)
  html = html
    .split(/\n\n+/)
    .map((block) => {
      if (
        block.startsWith("<h") ||
        block.startsWith("<pre") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<hr") ||
        block.startsWith("<li")
      ) {
        return block
      }
      const trimmed = block.trim()
      if (!trimmed) return ""
      return `<p class="text-sm leading-relaxed my-2">${trimmed.replace(/\n/g, "<br/>")}</p>`
    })
    .join("\n")

  return html
}

// ── Toolbar actions ───────────────────────────────────────────────────────

function insertMarkdown(
  textarea: HTMLTextAreaElement,
  before: string,
  after = "",
  placeholder = ""
) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end) || placeholder
  const newValue =
    textarea.value.substring(0, start) +
    before +
    selected +
    after +
    textarea.value.substring(end)
  return {
    value: newValue,
    cursor: start + before.length + selected.length + after.length,
  }
}

// ── MarkdownEditor ─────────────────────────────────────────────────────────

export function MarkdownEditor({
  value = "",
  onChange,
  placeholder = "Write your content here…",
  height = 360,
  disabled = false,
  loading = false,
  mode: modeProp = "split",
  showToolbar = true,
  className,
  ...props
}: MarkdownEditorProps) {
  const [internalValue, setInternalValue] = React.useState(value)
  const [mode, setMode] = React.useState<MarkdownEditorMode>(modeProp)
  const [fullscreen, setFullscreen] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const currentValue = onChange ? value : internalValue

  const handleChange = React.useCallback(
    (newVal: string) => {
      if (!onChange) setInternalValue(newVal)
      onChange?.(newVal)
    },
    [onChange]
  )

  const applyFormat = React.useCallback(
    (before: string, after = "", placeholder = "") => {
      const ta = textareaRef.current
      if (!ta) return
      const result = insertMarkdown(ta, before, after, placeholder)
      handleChange(result.value)
      // Restore cursor
      requestAnimationFrame(() => {
        ta.focus()
        ta.setSelectionRange(result.cursor, result.cursor)
      })
    },
    [handleChange]
  )

  const toolbarItems = React.useMemo(
    () => [
      {
        icon: Heading1,
        label: "Heading",
        before: "# ",
        after: "",
        placeholder: "Heading",
      },
      {
        icon: Bold,
        label: "Bold",
        before: "**",
        after: "**",
        placeholder: "bold text",
      },
      {
        icon: Italic,
        label: "Italic",
        before: "*",
        after: "*",
        placeholder: "italic text",
      },
      {
        icon: Code,
        label: "Code",
        before: "`",
        after: "`",
        placeholder: "code",
      },
      {
        icon: Link,
        label: "Link",
        before: "[",
        after: "](url)",
        placeholder: "link text",
      },
      {
        icon: List,
        label: "List",
        before: "- ",
        after: "",
        placeholder: "item",
      },
      {
        icon: ListOrdered,
        label: "Ordered list",
        before: "1. ",
        after: "",
        placeholder: "item",
      },
      {
        icon: Quote,
        label: "Quote",
        before: "> ",
        after: "",
        placeholder: "quote",
      },
    ],
    []
  )

  const effectiveHeight = fullscreen ? "100vh" : height

  // ── Loading ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={cn(markdownEditorContainerVariants(), className)}>
        <div className="flex h-10 items-center gap-1 border-b border-border px-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="size-7 rounded" />
          ))}
        </div>
        <Skeleton className="m-4 rounded" style={{ height: height - 60 }} />
      </div>
    )
  }

  const preview = (
    <div
      className="prose prose-sm max-w-none flex-1 overflow-auto p-4 text-foreground"
      style={{ minHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(currentValue) }}
    />
  )

  const editor = (
    <textarea
      ref={textareaRef}
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(markdownEditorTextareaVariants(), "flex-1")}
      style={{ minHeight: 0 }}
      aria-label="Markdown editor"
      aria-multiline="true"
    />
  )

  return (
    <div
      className={cn(
        markdownEditorContainerVariants(),
        fullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      style={{ height: effectiveHeight }}
      {...props}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex h-10 items-center gap-0.5 border-b border-border bg-muted/40 px-2">
          {toolbarItems.map(
            ({ icon: Icon, label, before, after, placeholder }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => applyFormat(before, after, placeholder)}
                disabled={disabled || mode === "preview"}
                aria-label={label}
                title={label}
              >
                <Icon className="size-3.5" />
              </Button>
            )
          )}
          <Separator orientation="vertical" className="mx-1 h-5" />
          {/* Mode switcher */}
          <ToggleGroup
            type="single"
            size="sm"
            value={mode}
            onValueChange={(v) => v && setMode(v as MarkdownEditorMode)}
            className="ml-auto"
          >
            <ToggleGroupItem
              value="edit"
              className="h-7 px-2 text-xs"
              aria-label="Edit mode"
            >
              <Type className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="split"
              className="h-7 px-2 text-xs"
              aria-label="Split mode"
            >
              <SplitSquareHorizontal className="size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="preview"
              className="h-7 px-2 text-xs"
              aria-label="Preview mode"
            >
              <Eye className="size-3" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 size-7"
            onClick={() => setFullscreen((f) => !f)}
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </Button>
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "flex",
          mode === "split" && "divide-x divide-border",
          "overflow-hidden"
        )}
        style={{ height: `calc(100% - ${showToolbar ? "2.5rem" : "0px"})` }}
      >
        {(mode === "edit" || mode === "split") && editor}
        {(mode === "preview" || mode === "split") && preview}
      </div>
    </div>
  )
}
