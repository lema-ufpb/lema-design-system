"use client"

import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
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
  labels?: {
    light?: string
    dark?: string
    system?: string
    trigger?: string
  }
}

export function ToggleTheme({ labels = {} }: ToggleThemeProps) {
  const { theme = "system", setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const Icon = mounted
    ? (themeIcons[theme as keyof typeof themeIcons] ?? Monitor)
    : Monitor

  const {
    light = "Light",
    dark = "Dark",
    system = "System",
    trigger = "Toggle theme",
  } = labels

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={trigger}>
          <Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun data-icon="inline-start" />
          {light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon data-icon="inline-start" />
          {dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor data-icon="inline-start" />
          {system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
