import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProductCard } from "./product-card"

const meta = {
  title: "Commerce/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ProductCard component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `price` | `string` | — | - |",
          "| `originalPrice` | `string` | — | - |",
          "| `imageSrc` | `string` | — | - |",
          "| `badge` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
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
