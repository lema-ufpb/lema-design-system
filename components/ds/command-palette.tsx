"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface CommandPaletteItem {
  id: string
  title: string
  icon?: React.ReactNode
  shortcut?: string[]
  onSelect: () => void
}

export interface CommandPaletteGroup {
  heading?: string
  items: CommandPaletteItem[]
}

export interface CommandPaletteProps {
  groups: CommandPaletteGroup[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  shortcut?: string // Define which key combined with meta/ctrl opens it, default is "k"
  locale?: UILocale
  className?: string
}

// ── Component ──

export function CommandPalette({
  groups,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placeholder,
  shortcut = "k",
  locale = "en-US",
  className,
}: CommandPaletteProps) {
  const i18n = UI_I18N[locale]
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      setControlledOpen?.(newOpen)
    },
    [isControlled, setControlledOpen]
  )

  React.useEffect(() => {
    if (!shortcut) return

    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target instanceof HTMLElement &&
        /input|textarea|select/i.test(target.tagName)
      )
        return
      // Check if it's meta/ctrl + shortcut key
      if (
        e.key.toLowerCase() === shortcut.toLowerCase() &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [shortcut, open, setOpen])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className={className}>
      <CommandInput placeholder={placeholder ?? i18n.command.placeholder} />
      <CommandList>
        <CommandEmpty>{i18n.command.empty}</CommandEmpty>
        {groups.map((group, groupIdx) => (
          <CommandGroup key={groupIdx} heading={group.heading}>
            {group.items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  item.onSelect()
                  setOpen(false)
                }}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.shortcut && item.shortcut.length > 0 && (
                  <CommandShortcut>{item.shortcut.join("")}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
