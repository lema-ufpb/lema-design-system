import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkout } from "./checkout"

const meta = {
  title: "ReUI/Checkout",
  component: Checkout,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items: [{ name: "Shoes", price: "$99", quantity: 1 }], total: "$99" } }

export const Loading: Story = { args: { items: [], total: "x", loading: true } }
