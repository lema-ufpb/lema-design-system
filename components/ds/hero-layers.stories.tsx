import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroLayers } from "./hero-layers"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof HeroLayers> = {
  title: "Hero/HeroLayers",
  component: HeroLayers,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof HeroLayers>

export const Default: Story = {
  args: {},
  render: (args) => (
    <HeroLayers
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

export const Inset: Story = {
  args: { inset: true },
  render: (args) => (
    <div className="bg-muted/30 p-6">
      <HeroLayers
        {...args}
        actions={<Button className="rounded-full">Get Started</Button>}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true },
}
