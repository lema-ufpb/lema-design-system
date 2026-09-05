import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { HeroCycling } from "./hero-cycling"

const meta = {
  title: "Layout/HeroCycling",
  component: HeroCycling,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Centered hero whose title cycles through a list of words — composed from HeroSection and TextRotator.",
      },
    },
  },
  args: {
    kicker: "New",
    titlePrefix: "Built for",
    titleSuffix: "teams.",
    words: ["design", "engineering", "product", "research"],
    description: "One design system, every team speaking the same language.",
    actions: <Button>Get started</Button>,
  },
} satisfies Meta<typeof HeroCycling>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const FastRotation: Story = {
  args: { rotatorInterval: 1200 },
}
