import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Cursor } from "./cursor"

const meta = {
  title: "Kibo/Cursor",
  component: Cursor,
  tags: ["autodocs"],
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
