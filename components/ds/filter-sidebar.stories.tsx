import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilterSidebar } from "./filter-sidebar"

const meta = {
  title: "Dashboard/FilterSidebar",
  component: FilterSidebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FilterSidebar component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `categories` | `string[]` | — | - |",
          "| `priceRange` | `[number, number]` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof FilterSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const Loading: Story = { args: { loading: true } }
