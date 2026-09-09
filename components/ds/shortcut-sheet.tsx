"use client"

import * as React from "react"
import { Search, Keyboard } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface ShortcutItem {
  id: string
  label: string
  keys: string[]
  description?: string
}

export interface ShortcutGroup {
  name: string
  shortcuts: ShortcutItem[]
}

export interface ShortcutSheetProps {
  /**
   * Controlled open state.
   */
  open?: boolean
  /**
   * Callback fired on open state change.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Categorized shortcut groups.
   */
  groups: ShortcutGroup[]
  /**
   * Whether pressing '?' globally toggles this sheet open.
   */
  enableGlobalListener?: boolean
  /**
   * Optional custom trigger button.
   */
  trigger?: React.ReactNode
  /**
   * Locale for titles and search placeholder.
   */
  locale?: UILocale
  /**
   * Modal content className.
   */
  className?: string
}

// ── Component ──

export function ShortcutSheet({
  open,
  onOpenChange,
  groups,
  enableGlobalListener = true,
  trigger,
  locale = "pt-BR",
  className,
}: ShortcutSheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  const [search, setSearch] = React.useState("")
  const t = UI_I18N[locale].shortcutSheet

  React.useEffect(() => {
    if (!enableGlobalListener) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setIsOpen?.(!isOpen)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enableGlobalListener, isOpen, setIsOpen])

  const filteredGroups = React.useMemo(() => {
    if (!search.trim()) return groups

    const query = search.toLowerCase()
    return groups
      .map((group) => ({
        ...group,
        shortcuts: group.shortcuts.filter(
          (s) =>
            s.label.toLowerCase().includes(query) ||
            s.description?.toLowerCase().includes(query) ||
            s.keys.some((k) => k.toLowerCase().includes(query))
        ),
      }))
      .filter((group) => group.shortcuts.length > 0)
  }, [groups, search])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn("gap-0 overflow-hidden p-0 sm:max-w-xl", className)}
      >
        <DialogHeader className="border-b border-border bg-muted/20 p-4">
          <div className="flex items-center gap-2.5">
            <Keyboard className="size-5 shrink-0 text-muted-foreground" />
            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-base font-semibold">
                {t.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {t.description}
              </DialogDescription>
            </div>
          </div>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-8 bg-background pl-8 text-xs"
            />
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] p-4">
          {filteredGroups.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              {t.noShortcuts}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredGroups.map((group) => (
                <div key={group.name} className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {group.name}
                  </span>
                  <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
                    {group.shortcuts.map((shortcut) => (
                      <div
                        key={shortcut.id}
                        className="flex items-center justify-between p-2.5 transition-colors hover:bg-muted/30"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-foreground">
                            {shortcut.label}
                          </span>
                          {shortcut.description && (
                            <span className="text-[11px] text-muted-foreground">
                              {shortcut.description}
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          {shortcut.keys.map((key, i) => (
                            <Kbd key={i} className="font-mono text-[10px]">
                              {key}
                            </Kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
