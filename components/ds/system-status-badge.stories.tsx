import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SystemStatusBadge } from "./system-status-badge"

const meta: Meta<typeof SystemStatusBadge> = {
  title: "Feedback/SystemStatusBadge",
  component: SystemStatusBadge,
  tags: ["autodocs"],
  args: {
    status: "operational",
    size: "md",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SystemStatusBadge status="operational" />
      <SystemStatusBadge status="degraded" />
      <SystemStatusBadge status="outage" />
      <SystemStatusBadge status="maintenance" />
    </div>
  ),
}

export const WithUptime: Story = {
  args: {
    status: "operational",
    uptime: "99.98%",
  },
}

export const AsLink: Story = {
  args: {
    status: "operational",
    uptime: "99.99%",
    href: "https://status.ufpb.br",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SystemStatusBadge size="sm" uptime="99.9%" />
      <SystemStatusBadge size="md" uptime="99.9%" />
    </div>
  ),
}
