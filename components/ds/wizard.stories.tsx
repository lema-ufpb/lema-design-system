import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Wizard } from "./wizard"

const meta = {
  title: "ReUI/Wizard",
  component: Wizard,
  tags: ["autodocs"],
} satisfies Meta<typeof Wizard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { steps: [{ id: "1", title: "Account", content: "Form 1" }, { id: "2", title: "Details", content: "Form 2" }] },
}

export const Loading: Story = { args: { steps: [], loading: true } }
