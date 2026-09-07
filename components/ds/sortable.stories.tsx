import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Sortable } from "./sortable"

const meta = {
  title: "Data Display/Sortable",
  component: Sortable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Sortable component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `SortableItem[]` | — | - |",
          "| `onReorder` | `(items: SortableItem[]) => void` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Sortable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
    ],
  },
}
