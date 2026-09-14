import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { WaterfallChart } from "./waterfall-chart"

const meta = {
  title: "Charts/WaterfallChart",
  component: WaterfallChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A waterfall chart for showing cumulative effects of sequential positive and negative values.",
          "Bars float at the correct position using the stacked bar technique.",
          "Ideal for financial P&L, budget variance, or revenue bridge analysis.",
          "",
          "## Entry Types",
          "- `start` — first total bar (e.g. opening balance)",
          "- `positive` — upward value change",
          "- `negative` — downward value change",
          "- `end` — final total bar (e.g. net profit)",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
    format: {
      control: "inline-radio",
      options: [undefined, "currency", "integer", "float"],
    },
  },
} satisfies Meta<typeof WaterfallChart>

export default meta
type Story = StoryObj<typeof meta>

const PNL_DATA = [
  { name: "Revenue", value: 500000, type: "start" as const },
  { name: "COGS", value: -180000, type: "negative" as const },
  { name: "Gross Profit", value: 320000, type: "end" as const },
  { name: "OpEx", value: -95000, type: "negative" as const },
  { name: "R&D", value: -42000, type: "negative" as const },
  { name: "Other Income", value: 18000, type: "positive" as const },
  { name: "Net Profit", value: 201000, type: "end" as const },
]

export const Default: Story = {
  args: {
    data: PNL_DATA,
    title: "P&L Waterfall",
    subtitle: "Q3 2026 — income statement bridge",
    format: "currency",
    currency: "USD",
    abbreviate: true,
    height: 360,
  },
}

export const BudgetVariance: Story = {
  args: {
    data: [
      { name: "Budget", value: 1200000, type: "start" as const },
      { name: "Extra Sales", value: 85000, type: "positive" as const },
      { name: "Returns", value: -23000, type: "negative" as const },
      { name: "New Costs", value: -67000, type: "negative" as const },
      { name: "Savings", value: 31000, type: "positive" as const },
      { name: "Actual", value: 1226000, type: "end" as const },
    ],
    title: "Budget Variance",
    subtitle: "Planned vs Actual",
    format: "currency",
    currency: "BRL",
    abbreviate: true,
    locale: "pt-BR",
    height: 320,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    title: "P&L Waterfall",
    subtitle: "Loading financial data…",
    loading: true,
    height: 360,
  },
}

export const EmptyData: Story = {
  args: {
    data: [],
    title: "Waterfall Chart",
    height: 320,
  },
}

export const NoGrid: Story = {
  args: {
    data: PNL_DATA,
    title: "Clean P&L",
    showGrid: false,
    format: "currency",
    abbreviate: true,
    height: 360,
  },
}
