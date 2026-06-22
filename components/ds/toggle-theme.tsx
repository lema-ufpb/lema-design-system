"use client"

import { useSyncExternalStore } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "@/providers/theme"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ── ThemeProvider (re-exported for app-level setup) ────────────────────────

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export { useTheme }

// ── ToggleTheme ────────────────────────────────────────────────────────────

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const

interface ToggleThemeProps {
  locale?: UILocale
  loading?: boolean
}

export function ToggleTheme({ locale = "en-US", loading }: ToggleThemeProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) {
    return <Skeleton className="size-9 rounded-md" />
  }

  const Icon = themeIcons[resolvedTheme as keyof typeof themeIcons] ?? Sun

  const { light, dark, system, trigger } = UI_I18N[locale].toggleTheme

  if (loading) {
    return <Skeleton className="size-9 rounded-md" />
  }

  return (
    <DropdownMenu data-slot="toggle-theme">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={trigger}
          data-slot="toggle-theme-trigger"
        >
          <Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          data-slot="toggle-theme-option"
        >
          <Sun data-icon="inline-start" />
          {light}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          data-slot="toggle-theme-option"
        >
          <Moon data-icon="inline-start" />
          {dark}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          data-slot="toggle-theme-option"
        >
          <Monitor data-icon="inline-start" />
          {system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
