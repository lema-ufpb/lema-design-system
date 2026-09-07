import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Settings } from "./settings"

const meta = {
  title: "Dashboard/Settings",
  component: Settings,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Settings component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `tabs` | `SettingsTab[]` | — | - |",
          "| `defaultTab` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Settings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { id: "general", label: "General", content: "General settings" },
      { id: "security", label: "Security", content: "Security settings" },
    ],
  },
}

export const Loading: Story = { args: { tabs: [], loading: true } }
