import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HowItWorksTimeline } from "./how-it-works-timeline"

const steps = [
  { title: "Discover", description: "Browse our catalog." },
  { title: "Select", description: "Pick the perfect plan." },
  { title: "Enjoy", description: "Start using instantly." },
]

const meta = {
  title: "Marketing/HowItWorksTimeline",
  component: HowItWorksTimeline,
  tags: ["autodocs"],
} satisfies Meta<typeof HowItWorksTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { steps } }

export const WithIcons: Story = { args: { steps: steps.map((s, i) => ({ ...s, icon: <span>{i + 1}</span> })), variant: "icon" } }
