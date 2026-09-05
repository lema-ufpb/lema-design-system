import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Settings } from "./settings"

const meta = {
  title: "ReUI/Settings",
  component: Settings,
  tags: ["autodocs"],
} satisfies Meta<typeof Settings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tabs: [{ id: "general", label: "General", content: "General settings" }, { id: "security", label: "Security", content: "Security settings" }] },
}

export const Loading: Story = { args: { tabs: [], loading: true } }
