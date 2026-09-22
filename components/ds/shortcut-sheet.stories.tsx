import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"

import { ShortcutSheet, type ShortcutGroup } from "./shortcut-sheet"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

const sampleGroups: ShortcutGroup[] = [
  {
    name: "General",
    shortcuts: [
      { id: "g1", label: "Open command menu", keys: ["⌘", "K"] },
      { id: "g2", label: "Help and keyboard shortcuts", keys: ["?"] },
      { id: "g3", label: "Toggle light / dark mode", keys: ["⌘", "J"] },
      { id: "g4", label: "Close dialog or window", keys: ["Esc"] },
    ],
  },
  {
    name: "Navigation",
    shortcuts: [
      { id: "n1", label: "Go to Home / Dashboard", keys: ["G", "H"] },
      { id: "n2", label: "Go to Econometric Models", keys: ["G", "M"] },
      { id: "n3", label: "Go to Datasets", keys: ["G", "D"] },
    ],
  },
  {
    name: "Execution & Editing",
    shortcuts: [
      { id: "e1", label: "Run simulation", keys: ["⌘", "Enter"] },
      { id: "e2", label: "Save changes", keys: ["⌘", "S"] },
      { id: "e3", label: "Export data to CSV", keys: ["⌘", "E"] },
    ],
  },
]

const meta = {
  title: "Navigation/ShortcutSheet",
  component: ShortcutSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Keyboard shortcuts sheet modal mapping key combinations grouped by category with live search filter.",
      },
    },
  },
  args: {
    groups: sampleGroups,
  },
  argTypes: {
    enableGlobalListener: {
      control: "boolean",
      description: "Toggles open on '?' keypress.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof ShortcutSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ShortcutSheet
      {...args}
      trigger={
        <Button variant="outline" size="sm">
          <Keyboard data-icon="inline-start" />
          Keyboard Shortcuts (?)
        </Button>
      }
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    const title = await within(document.body).findByText("Keyboard Shortcuts")
    await expect(title).toBeInTheDocument()
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ShortcutSheet
        locale="en-US"
        groups={sampleGroups}
        trigger={<Button size="sm">en-US</Button>}
      />
      <ShortcutSheet
        locale="pt-BR"
        groups={sampleGroups}
        trigger={<Button size="sm">pt-BR</Button>}
      />
    </div>
  ),
}
