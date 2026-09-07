import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MarqueeDuo } from "./marquee-duo"

const meta: Meta<typeof MarqueeDuo> = {
  title: "Data Display/MarqueeDuo",
  component: MarqueeDuo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A MarqueeDuo component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `MarqueeDuoItem[]` | — | - |",
          "| `speed` | `number` | — | - |",
          "| `pauseOnHover` | `boolean` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof MarqueeDuo>

export const Default: Story = {
  args: {},
}

export const Muted: Story = {
  args: { variant: "muted" },
}

export const Fast: Story = {
  args: { speed: 14 },
}

export const Loading: Story = {
  args: { loading: true },
}
