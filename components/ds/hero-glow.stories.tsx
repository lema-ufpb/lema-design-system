import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroGlow } from "./hero-glow"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof HeroGlow> = {
  title: "Hero/HeroGlow",
  component: HeroGlow,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    glow: { control: "inline-radio", options: ["top", "center", "none"] },
  },
}

export default meta
type Story = StoryObj<typeof HeroGlow>

export const Top: Story = {
  args: { glow: "top" },
  render: (args) => (
    <HeroGlow
      {...args}
      actions={
        <>
          <Button className="rounded-full">Get Started</Button>
          <Button variant="outline" className="rounded-full">
            GitHub
          </Button>
        </>
      }
    />
  ),
}

export const Center: Story = {
  args: { glow: "center" },
}

export const Loading: Story = {
  args: { loading: true },
}
