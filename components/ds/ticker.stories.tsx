import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Ticker } from "./ticker"

const items = [
  { symbol: "AAPL", price: "$182.52", change: "+1.2%", direction: "up" as const },
  { symbol: "TSLA", price: "$248.50", change: "-0.8%", direction: "down" as const },
  { symbol: "BTC", price: "$67,000", change: "+3.4%", direction: "up" as const },
]

const meta = {
  title: "Kibo/Ticker",
  component: Ticker,
  tags: ["autodocs"],
} satisfies Meta<typeof Ticker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items } }
