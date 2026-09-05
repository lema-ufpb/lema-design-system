import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Testimonials } from "./testimonials"

const items = Array.from({ length: 3 }).map((_, i) => ({ quote: `Quote ${i + 1}: Amazing design system!`, author: { name: `User ${i + 1}`, role: "CEO" }, rating: 5 }))

const meta = {
  title: "Testimonials/Testimonials",
  component: Testimonials,
  tags: ["autodocs"],
} satisfies Meta<typeof Testimonials>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items } }

export const TwoCols: Story = { args: { items: items.slice(0, 2), columns: 2 } }

export const Loading: Story = { args: { items, loading: true } }
