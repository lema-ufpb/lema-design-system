import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Comparison } from "./comparison"

const meta = {
  title: "Data Display/Comparison",
  component: Comparison,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Comparison component for the LEMA Design System.",
          "Supports loading state.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `before` | `string` | — | - |",
          "| `after` | `string` | — | - |",
          "| `beforeLabel` | `string` | — | - |",
          "| `afterLabel` | `string` | — | - |",
          "| `altBefore` | `string` | — | - |",
          "| `altAfter` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Comparison>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    before: "https://picsum.photos/600/400?1",
    after: "https://picsum.photos/600/400?2",
  },
}
