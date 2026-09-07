import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StatsGrid } from "./stats-grid"

const items = [
  {
    label: "Users",
    value: "12,345",
    trend: { value: "+12%", direction: "up" as const },
    period: "vs last",
  },
  {
    label: "Revenue",
    value: "$48k",
    trend: { value: "-2%", direction: "down" as const },
  },
  {
    label: "Sessions",
    value: "8,901",
    trend: { value: "+5%", direction: "up" as const },
  },
  {
    label: "Bounce",
    value: "32%",
    trend: { value: "-1%", direction: "down" as const },
  },
]

const meta = {
  title: "Stats/StatsGrid",
  component: StatsGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A StatsGrid component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `StatsProps[]` | — | - |",
          "| `columns` | `2 \| 3 \| 4` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof StatsGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items } }

export const ThreeCols: Story = {
  args: { items: items.slice(0, 3), columns: 3 },
}

export const Loading: Story = { args: { items, loading: true } }
