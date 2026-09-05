import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Onboarding } from "./onboarding"

const meta = {
  title: "ReUI/Onboarding",
  component: Onboarding,
  tags: ["autodocs"],
} satisfies Meta<typeof Onboarding>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { steps: [{ title: "Welcome" }, { title: "Setup" }] } }

export const Loading: Story = { args: { steps: [], loading: true } }
