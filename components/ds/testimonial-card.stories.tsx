import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TestimonialCard } from "./testimonial-card"

const meta = {
  title: "Testimonials/TestimonialCard",
  component: TestimonialCard,
  tags: ["autodocs"],
} satisfies Meta<typeof TestimonialCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { quote: "LEMA DS accelerated our delivery by 3x.", author: { name: "João Costa", role: "CTO" }, rating: 5 } }

export const Loading: Story = { args: { quote: "x", author: { name: "x" }, loading: true } }
