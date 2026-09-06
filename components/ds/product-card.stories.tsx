import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProductCard } from "./product-card"

const meta = {
  title: "E-commerce/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Shoes",
    price: "$99",
    imageSrc: "https://picsum.photos/300/200",
  },
}

export const Loading: Story = {
  args: { title: "x", price: "x", loading: true },
}
