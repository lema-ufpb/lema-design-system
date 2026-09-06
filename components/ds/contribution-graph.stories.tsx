import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ContributionGraph } from "./contribution-graph"

const meta = {
  title: "Kibo/ContributionGraph",
  component: ContributionGraph,
  tags: ["autodocs"],
} satisfies Meta<typeof ContributionGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const Loading: Story = { args: { loading: true } }
