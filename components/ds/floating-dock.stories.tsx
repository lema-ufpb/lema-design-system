import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react"
import { FloatingDock } from "./floating-dock"

const items = [
  { title: "Home", icon: <HomeIcon />, href: "#" },
  { title: "Search", icon: <SearchIcon />, href: "#" },
  { title: "Notifications", icon: <BellIcon />, href: "#" },
  { title: "Perfil", icon: <UserIcon />, href: "#" },
  { title: "Settings", icon: <SettingsIcon />, href: "#" },
  { title: "Destaques", icon: <SparklesIcon />, href: "#" },
]

const meta: Meta<typeof FloatingDock> = {
  title: "Navigation/FloatingDock",
  component: FloatingDock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FloatingDock component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `FloatingDockItem[]` | — | - |",
          "| `desktopClassName` | `string` | — | - |",
          "| `mobileClassName` | `string` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof FloatingDock>

export const Default: Story = {
  args: { items },
}

export const Small: Story = {
  args: { items, size: "sm" },
}

export const Muted: Story = {
  args: { items, variant: "muted" },
}
