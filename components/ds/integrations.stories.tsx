import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { Integrations } from "./integrations"

const tiles = Array.from({ length: 6 }).map((_, i) => ({
  name: `App ${i + 1}`,
  description: "Description for integration tile.",
  icon: <BoxIcon />,
  status: (i % 3 === 0 ? "connected" : "available") as
    "connected" | "available",
}))

const meta = {
  title: "Blocks/Integrations",
  component: Integrations,
  tags: ["autodocs"],
} satisfies Meta<typeof Integrations>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { integrations: tiles } }

export const Searchable: Story = {
  args: { integrations: tiles, searchable: true },
}

export const Loading: Story = { args: { integrations: tiles, loading: true } }

export const Empty: Story = { args: { integrations: [] } }
