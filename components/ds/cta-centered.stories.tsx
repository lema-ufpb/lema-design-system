import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CtaCentered } from "./cta-centered"

const meta = {
  title: "Blocks/CtaCentered",
  component: CtaCentered,
  tags: ["autodocs"],
} satisfies Meta<typeof CtaCentered>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Build faster",
    description: "Drop in blocks and ship.",
    primaryAction: { label: "Get access" },
    secondaryAction: { label: "Learn more" },
    tone: "glow",
    badge: "New",
  },
}

export const Primary: Story = {
  args: {
    title: "Start today",
    description: "Trusted by 1k+ teams.",
    primaryAction: { label: "Try free" },
    tone: "primary",
  },
}
