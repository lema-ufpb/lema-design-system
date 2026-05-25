import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Kbd, KbdGroup } from "./kbd"

const meta = {
  title: "Shadcn UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A styled keyboard shortcut indicator typically used inside menus, tooltips, or command palettes.",
          "",
          "Renders an inline `<kbd>` element with muted styling. Use `KbdGroup` to cluster multiple keys together (e.g. ⌘ + Shift + P).",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Background** | `--muted` | Key badge background |",
          "| **Text** | `--muted-foreground` | Key label text color |",
          "| **Input group bg** | `--input` | Background when nested in input groups |",
          "| **Tooltip bg** | `--background` | Background when nested in tooltips |",
          "| **Tooltip text** | `--foreground` | Text color when nested in tooltips |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "⌘K",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single keyboard shortcut ⌘K rendered as an inline kbd element with muted background styling.",
      },
    },
  },
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>Shift</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const SingleKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Kbd>⌘K</Kbd>
      <Kbd>⌘S</Kbd>
      <Kbd>⌘⇧P</Kbd>
      <Kbd>⌘⌫</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>⌥F4</Kbd>
    </div>
  ),
}
