import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ContributionGraph } from "./contribution-graph"

const meta = {
  title: "Data Display/ContributionGraph",
  component: ContributionGraph,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ContributionGraph component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `number[][]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ContributionGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const Loading: Story = { args: { loading: true } }
