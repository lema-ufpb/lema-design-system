import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PricingComparison } from "./pricing-comparison"

const meta = {
  title: "Pricing/PricingComparison",
  component: PricingComparison,
  tags: ["autodocs"],
} satisfies Meta<typeof PricingComparison>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    plans: [{ name: "Free" }, { name: "Pro", featured: true, price: "$49" }, { name: "Enterprise", price: "$99" }],
    features: [
      { category: "Features", items: [{ label: "Projects", values: ["1", "10", "Unlimited"] }, { label: "Support", values: [false, true, true] }] },
      { category: "Security", items: [{ label: "SSO", values: [false, true, true] }] },
    ],
  },
}
