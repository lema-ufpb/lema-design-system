import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RegisterSimple } from "./register-simple"

const meta = {
  title: "Blocks/RegisterSimple",
  component: RegisterSimple,
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterSimple>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const WithBadge: Story = { args: { badge: "New" } }
