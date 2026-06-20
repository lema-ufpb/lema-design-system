"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export type ColorTheme = "default" | "blue" | "green" | "violet"

const ColorThemeContext = React.createContext<{
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}>({
  colorTheme: "default",
  setColorTheme: () => null,
})

export function useColorTheme() {
  return React.useContext(ColorThemeContext)
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>("default")

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove("blue", "green", "violet")
    if (colorTheme !== "default") {
      root.classList.add(colorTheme)
    }
  }, [colorTheme])

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        <ThemeHotkey />
        {children}
      </NextThemesProvider>
    </ColorThemeContext.Provider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
export { useTheme }
