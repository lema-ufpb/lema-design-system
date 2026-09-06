import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CompareSlider } from "./compare-slider"

const meta = {
  title: "Data Display/CompareSlider",
  component: CompareSlider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A before/after image comparison slider — drag the handle (or use arrow keys on the native range input) to reveal more of either image.",
      },
    },
  },
  args: {
    beforeSrc:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    beforeAlt: "Before",
    afterSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
    afterAlt: "After",
    label: "Before and after comparison",
  },
} satisfies Meta<typeof CompareSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-2xl">
      <CompareSlider {...args} />
    </div>
  ),
}

export const StartAt25: Story = {
  args: { defaultValue: 25 },
  render: (args) => (
    <div className="mx-auto max-w-2xl">
      <CompareSlider {...args} />
    </div>
  ),
}
