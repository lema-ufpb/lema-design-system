import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Sortable } from "./sortable"

const meta = {
  title: "ReUI/Sortable",
  component: Sortable,
  tags: ["autodocs"],
} satisfies Meta<typeof Sortable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: [{ id: "1", content: "Item 1" }, { id: "2", content: "Item 2" }, { id: "3", content: "Item 3" }] },
}
