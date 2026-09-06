import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Cascader } from "./cascader"

const meta = {
  title: "Form/Cascader",
  component: Cascader,
  tags: ["autodocs"],
} satisfies Meta<typeof Cascader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      {
        label: "Brazil",
        value: "br",
        children: [
          { label: "SP", value: "sp" },
          { label: "RJ", value: "rj" },
        ],
      },
      { label: "USA", value: "us", children: [{ label: "NY", value: "ny" }] },
    ],
  },
}
