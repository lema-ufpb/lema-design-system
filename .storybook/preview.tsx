import type { Preview } from "@storybook/nextjs-vite"
import { useEffect } from "react"
import { Inter, Geist_Mono } from "next/font/google"

import "../app/globals.css"
import "./storybook.css"
import MockDate from "mockdate"
import { initialize, mswLoader } from "msw-storybook-addon"

initialize({ onUnhandledRequest: "bypass" })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

const ThemeDecorator = ({
  children,
  colorTheme,
  darkMode,
}: {
  children: React.ReactNode
  colorTheme: string
  darkMode: string
}) => {
  useEffect(() => {
    const root = document.documentElement

    root.classList.add(
      inter.variable,
      fontMono.variable,
      "font-sans",
      "antialiased"
    )

    root.classList.remove("blue", "green", "violet")
    if (colorTheme && colorTheme !== "default") {
      root.classList.add(colorTheme)
    }

    if (darkMode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [colorTheme, darkMode])

  return <>{children}</>
}

const preview: Preview = {
  globalTypes: {
    colorTheme: {
      description: "Color theme",
      defaultValue: "default",
      toolbar: {
        title: "Color Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default", icon: "circlehollow" },
          { value: "blue", title: "Blue", icon: "circle" },
          { value: "green", title: "Green", icon: "circle" },
          { value: "violet", title: "Violet", icon: "circle" },
        ],
        dynamicTitle: true,
      },
    },
    darkMode: {
      description: "Dark mode",
      defaultValue: "light",
      toolbar: {
        title: "Dark Mode",
        icon: "moon",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (StoryFn, context) => {
      const { colorTheme, darkMode } = context.globals

      return (
        <ThemeDecorator colorTheme={colorTheme} darkMode={darkMode}>
          <div className="min-h-[inherit] bg-background text-foreground">
            <StoryFn />
          </div>
        </ThemeDecorator>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "landmark-unique", enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
          { id: "scope-attr-valid", enabled: false },
        ],
      },
    },
  },
  beforeEach() {
    MockDate.set("2024-04-01T12:00:00Z")
  },
}

export default preview
