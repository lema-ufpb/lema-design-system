import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RegisterSplit } from "./register-split"

const meta = {
  title: "Auth/RegisterSplit",
  component: RegisterSplit,
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterSplit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { testimonial: { quote: "LEMA DS accelerated our onboarding.", author: "Ana Silva", role: "Design Lead", avatarUrl: "https://picsum.photos/100/100" } } }

export const WithoutTestimonial: Story = { args: {} }
