"use client"

import * as React from "react"
import { BellIcon, CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──

export interface NotificationItem {
  id: string
  title: string
  description?: string
  date: Date
  unread: boolean
  onClick?: () => void
}

export interface NotificationCenterProps {
  notifications: NotificationItem[]
  onMarkAllAsRead?: () => void
  emptyText?: string
  title?: string
  locale?: UILocale
  className?: string
}

// ── Component ──

export function NotificationCenter({
  notifications,
  onMarkAllAsRead,
  emptyText,
  title,
  locale = "pt-BR",
  className,
}: NotificationCenterProps) {
  const i18n = UI_I18N[locale].notificationCenter
  const displayTitle = title ?? i18n.title
  const displayEmptyText = emptyText ?? i18n.empty
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("relative", className)}
          aria-label={displayTitle}
        >
          <BellIcon className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex size-2 items-center justify-center rounded-full bg-destructive">
              <span className="sr-only">{unreadCount}</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="end"
        data-slot="ds-notification-center"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">{displayTitle}</p>
          {unreadCount > 0 && onMarkAllAsRead && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={onMarkAllAsRead}
            >
              <CheckIcon className="mr-1 size-3" />
              {i18n.markAllAsRead}
            </Button>
          )}
        </div>
        <div className="flex max-h-96 flex-col overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {displayEmptyText}
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                role="button"
                tabIndex={0}
                onClick={notification.onClick}
                className={cn(
                  "flex cursor-pointer flex-col gap-1 rounded-md p-3 text-sm transition-colors hover:bg-muted",
                  notification.unread && "bg-muted/50"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    notification.onClick?.()
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "leading-none font-medium text-foreground",
                      notification.unread && "font-semibold"
                    )}
                  >
                    {notification.title}
                  </span>
                  {notification.unread && (
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                {notification.description && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                )}
                <span className="mt-1 text-xs text-muted-foreground">
                  {notification.date.toLocaleDateString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
