import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Label } from "./label"
import { Input } from "./input"

const meta = {
  title: "Shadcn UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A form label element that handles disabled and peer-disabled styling.",
          "",
          "Built on Radix UI's Label primitive. Automatically dims when its parent group is disabled or when a preceding peer element is disabled.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default text** | `--foreground` | Label text color |",
          "| **Disabled** | `--foreground` / `opacity-50` | Dimmed label when parent is disabled |",
          "| **Peer disabled** | `--foreground` / `opacity-50` | Dimmed label when peer input is disabled |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-60 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-60 gap-2">
      <Label htmlFor="disabled-input">Disabled Label</Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit" />
    </div>
  ),
}
