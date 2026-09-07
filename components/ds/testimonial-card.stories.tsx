import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TestimonialCard } from "./testimonial-card"

const meta = {
  title: "Testimonials/TestimonialCard",
  component: TestimonialCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TestimonialCard component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `quote` | `string` | — | - |",
          "| `author` | `{ name: string` | — | - |",
          "| `rating` | `number` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof TestimonialCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    quote: "LEMA DS accelerated our delivery by 3x.",
    author: { name: "João Costa", role: "CTO" },
    rating: 5,
  },
}

export const Loading: Story = {
  args: { quote: "x", author: { name: "x" }, loading: true },
}
