import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PricingCalculator } from "./pricing-calculator"

const meta = {
  title: "SaaS/PricingCalculator",
  component: PricingCalculator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingCalculator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    basePrice: 0,
    unitLabel: "users",
    unitPrice: 45.5,
    minUnits: 1,
    maxUnits: 50,
    step: 1,
    discountPercent: 15,
    title: "Corporate Plan",
    description:
      "Drag the slider to simulate the monthly cost for your team.",
    className: "w-full max-w-4xl mx-auto",
  },
}

export const HighVolumeAPI: Story = {
  args: {
    basePrice: 99,
    unitLabel: "million requests",
    unitPrice: 5,
    minUnits: 1,
    maxUnits: 100,
    step: 5,
    discountPercent: 25,
    currency: "$",
    title: "API Platform",
    description:
      "Scale your applications worry-free. The base plan includes 1 million requests.",
    features: [
      "Custom rate limits",
      "99.99% SLA",
      "Dedicated IPs",
      "Slack support",
    ],
    className: "w-full max-w-4xl mx-auto",
  },
}
