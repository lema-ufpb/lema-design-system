import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PricingGrid } from "./pricing-grid"

const plans = [
  {
    name: "Free",
    description: "For hobby",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { label: "1 project", included: true },
      { label: "Community support", included: true },
    ],
  },
  {
    name: "Pro",
    description: "For startups",
    monthlyPrice: 49,
    yearlyPrice: 39,
    originalMonthlyPrice: 59,
    originalYearlyPrice: 49,
    featured: true,
    badge: "Most popular",
    features: [
      { label: "10 projects", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    name: "Enterprise",
    description: "For scale",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      { label: "Unlimited", included: true },
      { label: "SSO", included: true },
    ],
  },
]

const meta = {
  title: "Blocks/PricingGrid",
  component: PricingGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PricingGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { plans, title: "Pricing", description: "Simple transparent pricing." },
}

export const Yearly: Story = { args: { plans, billing: "yearly" } }

export const Loading: Story = { args: { plans, loading: true } }
