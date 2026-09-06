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
  { title: "Início", icon: <HomeIcon />, href: "#" },
  { title: "Buscar", icon: <SearchIcon />, href: "#" },
  { title: "Notificações", icon: <BellIcon />, href: "#" },
  { title: "Perfil", icon: <UserIcon />, href: "#" },
  { title: "Configurações", icon: <SettingsIcon />, href: "#" },
  { title: "Destaques", icon: <SparklesIcon />, href: "#" },
]

const meta: Meta<typeof FloatingDock> = {
  title: "Navigation/FloatingDock",
  component: FloatingDock,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
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
