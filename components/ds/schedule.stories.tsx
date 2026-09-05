import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Schedule } from "./schedule"

const meta = {
  title: "ReUI/Schedule",
  component: Schedule,
  tags: ["autodocs"],
} satisfies Meta<typeof Schedule>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { slots: [[{ time: "09:00", title: "Standup" }, {}, { time: "09:00" }], [{ time: "10:00" }, { time: "10:00", title: "Review" }]] },
}

export const Loading: Story = { args: { slots: [], loading: true } }
