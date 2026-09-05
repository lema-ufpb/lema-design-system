import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { IntegrationTile } from "./integration-tile"

const meta = {
  title: "Integrations/IntegrationTile",
  component: IntegrationTile,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    status: { control: "select", options: ["connected", "available", "coming"] },
  },
} satisfies Meta<typeof IntegrationTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { name: "Slack", description: "Team communication platform", icon: <BoxIcon />, status: "connected" } }

export const AllSizes: Story = {
  args: { name: "Slack" },
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <IntegrationTile name="Slack" size="sm" description="Small" icon={<BoxIcon />} />
      <IntegrationTile name="Slack" size="md" description="Medium" icon={<BoxIcon />} />
      <IntegrationTile name="Slack" size="lg" description="Large" icon={<BoxIcon />} />
    </div>
  ),
}

export const Statuses: Story = {
  args: { name: "App" },
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <IntegrationTile name="Slack" status="connected" description="Connected" icon={<BoxIcon />} />
      <IntegrationTile name="Figma" status="available" description="Available" icon={<BoxIcon />} />
      <IntegrationTile name="Notion" status="coming" description="Coming soon" icon={<BoxIcon />} />
    </div>
  ),
}

export const Loading: Story = { args: { name: "Loading", loading: true } }
