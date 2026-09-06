import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NotificationCenter,
  type NotificationItem,
} from "./notification-center"
import { fn } from "storybook/test"

const meta = {
  title: "Blocks/NotificationCenter",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popover-based notification center for displaying alerts and messages.",
      },
    },
  },
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New message received",
    description:
      "You have a new message from Sarah Connor regarding the project update.",
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    unread: true,
    onClick: fn(),
  },
  {
    id: "2",
    title: "Server maintenance",
    description: "Scheduled maintenance will occur tonight at 02:00 AM UTC.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: true,
    onClick: fn(),
  },
  {
    id: "3",
    title: "Weekly report ready",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false,
    onClick: fn(),
  },
]

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    onMarkAllAsRead: fn(),
  },
}

export const Empty: Story = {
  args: {
    notifications: [],
    onMarkAllAsRead: fn(),
  },
}
