import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CreditCard } from "./credit-card"

const meta = {
  title: "Kibo/CreditCard",
  component: CreditCard,
  tags: ["autodocs"],
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
