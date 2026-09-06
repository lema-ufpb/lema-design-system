import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NumberField } from "./number-field"

const meta = {
  title: "Form/NumberField",
  component: NumberField,
  tags: ["autodocs"],
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultValue: 5, min: 0, max: 10 } }
