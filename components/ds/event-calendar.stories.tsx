import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EventCalendar } from "./event-calendar"

const meta = {
  title: "Blocks/EventCalendar",
  component: EventCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof EventCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { events: [{ id: "1", title: "Meeting", date: "2026-09-10" }] },
}

export const Loading: Story = { args: { events: [], loading: true } }
