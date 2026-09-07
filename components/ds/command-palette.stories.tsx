import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState, useEffect } from "react"
import { CommandPalette, type CommandPaletteGroup } from "./command-palette"
import {
  CalendarIcon,
  SmileIcon,
  CalculatorIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react"

const sampleGroups: CommandPaletteGroup[] = [
  {
    heading: "Suggestions",
    items: [
      {
        id: "calendar",
        title: "Calendar",
        icon: <CalendarIcon />,
        onSelect: () => console.log("Calendar selected"),
      },
      {
        id: "search-emoji",
        title: "Search Emoji",
        icon: <SmileIcon />,
        onSelect: () => console.log("Search Emoji selected"),
      },
      {
        id: "calculator",
        title: "Calculator",
        icon: <CalculatorIcon />,
        onSelect: () => console.log("Calculator selected"),
      },
    ],
  },
  {
    heading: "Settings",
    items: [
      {
        id: "profile",
        title: "Profile",
        icon: <UserIcon />,
        shortcut: ["⌘", "P"],
        onSelect: () => console.log("Profile selected"),
      },
      {
        id: "settings",
        title: "Settings",
        icon: <SettingsIcon />,
        shortcut: ["⌘", "S"],
        onSelect: () => console.log("Settings selected"),
      },
    ],
  },
]

const meta = {
  title: "Navigation/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A high-level command palette component triggered by `Cmd/Ctrl + K` or a custom shortcut.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `groups` | `CommandPaletteGroup[]` | — | - |",
          "| `open` | `boolean` | — | - |",
          "| `onOpenChange` | `(open: boolean) => void` | — | - |",
          "| `placeholder` | `string` | — | - |",
          "| `shortcut` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `className` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])

    return (
      <div>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
            <span className="text-xs">⌘</span>J
          </kbd>{" "}
          to open the command palette.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          (We use Cmd+J here to avoid colliding with Storybook&apos;s own Cmd+K
          shortcut)
        </p>
        <CommandPalette
          {...args}
          groups={sampleGroups}
          open={open}
          onOpenChange={setOpen}
          shortcut="j"
        />
      </div>
    )
  },
  args: {
    groups: sampleGroups,
  },
}
