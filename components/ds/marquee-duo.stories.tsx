import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MarqueeDuo } from "./marquee-duo"

const meta: Meta<typeof MarqueeDuo> = {
  title: "Marketing/MarqueeDuo",
  component: MarqueeDuo,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof MarqueeDuo>

export const Default: Story = {
  args: {},
}

export const Muted: Story = {
  args: { variant: "muted" },
}

export const Fast: Story = {
  args: { speed: 14 },
}

export const Loading: Story = {
  args: { loading: true },
}
