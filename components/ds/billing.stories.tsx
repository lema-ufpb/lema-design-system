import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Billing } from "./billing"

const meta = {
  title: "Blocks/Billing",
  component: Billing,
  tags: ["autodocs"],
} satisfies Meta<typeof Billing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    plan: "Pro",
    price: "$49/mo",
    nextBilling: "Oct 10",
    status: "active",
  },
}

export const Loading: Story = { args: { plan: "x", price: "x", loading: true } }
