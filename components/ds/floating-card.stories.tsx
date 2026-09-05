import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FloatingCard } from "./floating-card"

const meta = {
  title: "Layout/FloatingCard",
  component: FloatingCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A card that tilts subtly in 3D toward the pointer — for showcasing a product screenshot in a hero. Move your cursor over the card.",
      },
    },
  },
} satisfies Meta<typeof FloatingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FloatingCard className="flex h-64 w-96 items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">Product screenshot</p>
    </FloatingCard>
  ),
}

export const CustomIntensity: Story = {
  render: () => (
    <div className="flex gap-8">
      <FloatingCard
        intensity={4}
        className="flex h-48 w-64 items-center justify-center p-6"
      >
        <p className="text-xs text-muted-foreground">intensity=4</p>
      </FloatingCard>
      <FloatingCard
        intensity={16}
        className="flex h-48 w-64 items-center justify-center p-6"
      >
        <p className="text-xs text-muted-foreground">intensity=16</p>
      </FloatingCard>
    </div>
  ),
}
