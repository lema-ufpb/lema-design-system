import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BentoMetrics } from "./bento-metrics"

const chartData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 58000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 67000 },
]

const stats = [
  { label: "Revenue", value: "$67K" },
  { label: "Growth", value: "+21%" },
]

const meta = {
  title: "Layout/BentoMetrics",
  component: BentoMetrics,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A bento grid pairing a bar chart tile with a strip of stat tiles — composed from BentoGrid, BarChart and CardStat.",
      },
    },
  },
  args: {
    chartTitle: "Monthly revenue",
    chartData,
    chartDataKeys: ["revenue"],
    chartCategoryKey: "month",
    stats,
  },
} satisfies Meta<typeof BentoMetrics>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
