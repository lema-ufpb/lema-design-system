import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EventCalendar } from "./event-calendar"

const meta = {
  title: "Dashboard/EventCalendar",
  component: EventCalendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A EventCalendar component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `events` | `CalendarEvent[]` | — | - |",
          "| `month` | `Date` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof EventCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { events: [{ id: "1", title: "Meeting", date: "2026-09-10" }] },
}

export const Loading: Story = { args: { events: [], loading: true } }
