import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Glass } from "./glass"

const meta: Meta<typeof Glass> = {
  title: "Utilities/Glass",
  component: Glass,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["1", "2", "3", "4", "5"] },
  },
}

export default meta
type Story = StoryObj<typeof Glass>

export const Default: Story = {
  render: (args) => (
    <div className="flex gap-3 bg-gradient-to-br from-primary/20 via-background to-muted p-6">
      <Glass {...args} className="size-24" />
      <Glass {...args} variant="2" className="size-24" />
      <Glass {...args} variant="3" className="size-24" />
    </div>
  ),
  args: { variant: "1" },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 bg-gradient-to-br from-primary/15 to-muted p-6">
      {(["1", "2", "3", "4", "5"] as const).map((v) => (
        <Glass
          key={v}
          variant={v}
          className="flex size-28 items-center justify-center text-xs font-medium"
        >
          glass-{v}
        </Glass>
      ))}
    </div>
  ),
}
