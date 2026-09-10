"use client"

import React, { useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export const keyboardShortcutVariants = cva(
  "inline-flex items-center justify-center rounded border border-b-2 border-border bg-muted font-sans font-medium text-muted-foreground transition-all",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-xs",
        md: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-8 min-w-8 px-2 text-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

export interface KeyboardShortcutProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof keyboardShortcutVariants> {
  /**
   * Array de teclas. Ex: ["command", "k"], ["ctrl", "shift", "p"]
   */
  keys: string[]
}

// ── Component ──

const iconMap: Record<string, string> = {
  command: "⌘",
  cmd: "⌘",
  shift: "⇧",
  option: "⌥",
  opt: "⌥",
  alt: "⌥", // Geralmente no Mac alt é renderizado como option
  ctrl: "⌃",
  control: "⌃",
  enter: "↵",
  return: "↵",
  esc: "⎋",
  escape: "⎋",
  delete: "⌫",
  backspace: "⌫",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  tab: "⇥",
}

export const KeyboardShortcut = React.forwardRef<
  HTMLSpanElement,
  KeyboardShortcutProps
>(({ keys, size, className, ...props }, ref) => {
  const [isMac, setIsMac] = useState(true)

  // Detectar SO no client-side para ajustar Alt/Ctrl vs Option/Command se necessário
  useEffect(() => {
    const platform = navigator?.userAgent || navigator?.platform || "unknown"
    setIsMac(/Mac|iPod|iPhone|iPad/.test(platform))
  }, [])

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {keys.map((keyStr, idx) => {
        const lowerKey = keyStr.toLowerCase()

        // Se for Windows/Linux e for "command", trocamos por "ctrl" na exibição
        let resolvedKey = lowerKey
        if (!isMac) {
          if (lowerKey === "command" || lowerKey === "cmd") resolvedKey = "ctrl"
          if (lowerKey === "option" || lowerKey === "opt") resolvedKey = "alt"
        }

        const displayStr = iconMap[resolvedKey] || keyStr.toUpperCase()

        return (
          <kbd
            key={`${keyStr}-${idx}`}
            className={cn(keyboardShortcutVariants({ size }))}
            title={keyStr}
            aria-label={keyStr}
          >
            {displayStr}
          </kbd>
        )
      })}
    </span>
  )
})

KeyboardShortcut.displayName = "KeyboardShortcut"
