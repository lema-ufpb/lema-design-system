import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { KeyboardShortcut } from "./keyboard-shortcut"

const meta = {
  title: "Data Display/KeyboardShortcut",
  component: KeyboardShortcut,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KeyboardShortcut>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    keys: ["command", "k"],
  },
}

export const Sizes: Story = {
  args: {
    keys: [],
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm">Small:</span>
        <KeyboardShortcut keys={["ctrl", "shift", "p"]} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Medium:</span>
        <KeyboardShortcut keys={["command", "enter"]} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Large:</span>
        <KeyboardShortcut keys={["option", "delete"]} size="lg" />
      </div>
    </div>
  ),
}

export const Navigation: Story = {
  args: {
    keys: ["up", "down", "left", "right"],
    size: "md",
  },
}
