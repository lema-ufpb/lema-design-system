import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PricingCard } from "./pricing-card"

const meta = {
  title: "Pricing/PricingCard",
  component: PricingCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A PricingCard component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `price` | `number` | — | - |",
          "| `originalPrice` | `number` | — | - |",
          '| `period` | `"month" \| "year" \| "lifetime"` | — | - |',
          "| `currency` | `string` | — | - |",
          "| `badge` | `string` | — | - |",
          "| `features` | `PricingFeature[]` | — | - |",
          "| `action` | `{ label: string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `featured` | `"true" \| "false"` | — | Variant |',
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof PricingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Pro",
    description: "For growing teams",
    price: 49,
    period: "month",
    features: [
      { label: "10 seats", included: true },
      { label: "Priority support", included: true },
      { label: "SSO", included: false },
    ],
    action: { label: "Get started" },
  },
}

export const Featured: Story = {
  args: {
    name: "Business",
    description: "Most popular",
    price: 99,
    period: "month",
    featured: true,
    badge: "Most popular",
    features: [
      { label: "Unlimited", included: true },
      { label: "SSO", included: true },
    ],
    action: { label: "Start free trial" },
  },
}

export const WithOriginalPrice: Story = {
  args: {
    name: "Lifetime",
    description: "Pay once",
    price: 119,
    originalPrice: 199,
    period: "lifetime",
    features: [{ label: "All access", included: true }],
    action: { label: "Buy now" },
  },
}

export const Loading: Story = {
  args: { name: "Pro", price: 49, loading: true },
}
