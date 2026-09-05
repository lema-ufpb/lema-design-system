import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilterSidebar } from "./filter-sidebar"

const meta = {
  title: "ReUI/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const Loading: Story = { args: { loading: true } }
