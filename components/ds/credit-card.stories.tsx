import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CreditCard } from "./credit-card"

const meta = {
  title: "Commerce/CreditCard",
  component: CreditCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A CreditCard component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `number` | `string` | — | - |",
          "| `holder` | `string` | — | - |",
          "| `expiry` | `string` | — | - |",
          "| `cvc` | `string` | — | - |",
          '| `brand` | `"visa" \| "mastercard" \| "amex"` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `variant` | `"default" \| "dark" \| "light"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "dark", "light"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof CreditCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    number: "4242 4242 4242 4242",
    holder: "Alex Silva",
    expiry: "12/28",
  },
}

export const AllVariants: Story = {
  args: { holder: "Alex" },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CreditCard
        variant="default"
        number="4242 4242 4242 4242"
        holder="Ana"
        expiry="12/28"
      />
      <CreditCard
        variant="dark"
        number="4242 4242 4242 4242"
        holder="Ana"
        expiry="12/28"
      />
      <CreditCard
        variant="light"
        number="4242 4242 4242 4242"
        holder="Ana"
        expiry="12/28"
      />
    </div>
  ),
}
