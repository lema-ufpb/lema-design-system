import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Stepper } from "./stepper"

const meta = {
  title: "ReUI/Stepper",
  component: Stepper,
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { currentId: "1", steps: [{ id: "1", title: "Account" }, { id: "2", title: "Details" }, { id: "3", title: "Confirm" }] },
}
