import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Billing } from "./billing"

const meta = {
  title: "Dashboard/Billing",
  component: Billing,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Billing component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `plan` | `string` | — | - |",
          "| `price` | `string` | — | - |",
          "| `nextBilling` | `string` | — | - |",
          '| `status` | `"active" \| "past_due" \| "canceled"` | — | - |',
          "| `loading` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
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
