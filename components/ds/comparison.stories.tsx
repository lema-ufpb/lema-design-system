import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Comparison } from "./comparison"

const meta = {
  title: "Kibo/Comparison",
  component: Comparison,
  tags: ["autodocs"],
} satisfies Meta<typeof Comparison>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { before: "https://picsum.photos/600/400?1", after: "https://picsum.photos/600/400?2" } }
