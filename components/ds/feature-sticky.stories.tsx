import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FeatureSticky } from "./feature-sticky"

const meta: Meta<typeof FeatureSticky> = {
  title: "Layout/FeatureSticky",
  component: FeatureSticky,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    sticky: { control: "inline-radio", options: ["left", "right"] },
  },
}

export default meta
type Story = StoryObj<typeof FeatureSticky>

export const Left: Story = {
  args: { sticky: "left" },
}

export const Right: Story = {
  args: { sticky: "right" },
}

export const Loading: Story = {
  args: { loading: true },
}
