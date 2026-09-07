import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkout } from "./checkout"

const meta = {
  title: "Commerce/Checkout",
  component: Checkout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Checkout component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `CheckoutItem[]` | — | - |",
          "| `total` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Checkout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: [{ name: "Shoes", price: "$99", quantity: 1 }], total: "$99" },
}

export const Loading: Story = { args: { items: [], total: "x", loading: true } }
