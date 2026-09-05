import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Autocomplete } from "./autocomplete"

const meta = {
  title: "ReUI/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { options: [{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }] },
}
