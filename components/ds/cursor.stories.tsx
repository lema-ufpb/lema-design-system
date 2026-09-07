import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Cursor } from "./cursor"

const meta = {
  title: "Effects/Cursor",
  component: Cursor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Cursor component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | — | - |",
          "| `color` | `string` | — | - |",
          "| `x` | `number` | — | - |",
          "| `y` | `number` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Cursor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: "Ana", x: 40, y: 40 },
  render: (args) => (
    <div className="relative h-48 w-full rounded-2xl border bg-card">
      <Cursor {...args} />
    </div>
  ),
}
