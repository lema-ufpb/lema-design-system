import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ChartConfig } from "./chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./chart"
import {
  BarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line as RechartsLine,
  PieChart,
  Pie as RechartsPie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", revenue: 4200, expenses: 2800, profit: 1400 },
  { month: "Feb", revenue: 3800, expenses: 2600, profit: 1200 },
  { month: "Mar", revenue: 5100, expenses: 3100, profit: 2000 },
  { month: "Apr", revenue: 4900, expenses: 2900, profit: 2000 },
  { month: "May", revenue: 5600, expenses: 3300, profit: 2300 },
  { month: "Jun", revenue: 6200, expenses: 3500, profit: 2700 },
]

const barConfig = {
  revenue: { label: "Revenue", color: "#2563eb" },
  expenses: { label: "Expenses", color: "#dc2626" },
  profit: { label: "Profit", color: "#16a34a" },
} as const

const pieData = [
  { category: "Electronics", value: 35 },
  { category: "Clothing", value: 25 },
  { category: "Books", value: 20 },
  { category: "Home", value: 15 },
  { category: "Other", value: 5 },
]

const pieConfig = {
  electronics: { label: "Electronics", color: "#2563eb" },
  clothing: { label: "Clothing", color: "#16a34a" },
  books: { label: "Books", color: "#f59e0b" },
  home: { label: "Home", color: "#8b5cf6" },
  other: { label: "Other", color: "#6b7280" },
} as const

const meta = {
  title: "Shadcn UI/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A wrapper around Recharts that provides theme-aware styling via CSS custom properties, a shared `ChartConfig` type, and pre-built tooltip and legend content components.",
          "",
          "`ChartContainer` accepts a `config` object (mapping data keys to labels and colors), an optional `initialDimension`, and renders any Recharts chart element (BarChart, LineChart, PieChart, etc.) inside a `ResponsiveContainer`. Use `ChartTooltipContent` and `ChartLegendContent` for styled tooltip and legend layouts with indicator styles (`dot`, `line`, `dashed`).",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Axis tick text** | `--muted-foreground` | X/Y axis label color |",
          "| **Grid lines** | `--border` (at 50%) | Cartesian grid line strokes |",
          "| **Cursor / hover fill** | `--muted` | Tooltip cursor area fill |",
          "| **Tooltip background** | `--popover` | Tooltip card surface |",
          "| **Tooltip text** | `--popover-foreground` | Primary text inside tooltip |",
          "| **Tooltip value text** | `--foreground` | Numeric value display |",
          "| **Tooltip border** | `--foreground` (at 5%) | Subtle ring on tooltip |",
          "| **Legend text** | `--muted-foreground` | Label color for legend items |",
          "| **Series colors** | `--color-<key>` | Custom property per data series (injected via `ChartStyle`) |",
        ].join("\n"),
      },
    },
  },
  args: {
    config: {} as ChartConfig,
    children: <div />,
  },
  argTypes: {
    config: {
      table: { disable: true },
    },
    initialDimension: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

export const BarChartStory: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bar chart comparing monthly revenue and expenses with dot indicator tooltip and legend.",
      },
    },
  },
  render: () => (
    <ChartContainer config={barConfig}>
      <BarChart data={monthlyData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsBar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <RechartsBar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  ),
}

export const LineChartStory: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Line chart tracking profit trends over six months with monotone interpolation and no dots.",
      },
    },
  },
  render: () => (
    <ChartContainer config={barConfig}>
      <LineChart data={monthlyData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsLine
          type="monotone"
          dataKey="profit"
          stroke="var(--color-profit)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
}

export const PieChartStory: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart showing category distribution with custom inner radius and color-coded cells.",
      },
    },
  },
  render: () => (
    <div className="flex justify-center">
      <ChartContainer
        config={pieConfig}
        className="aspect-square max-h-[320px] min-h-[200px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <RechartsPie
            data={pieData}
            dataKey="value"
            nameKey="category"
            innerRadius={60}
            strokeWidth={2}
          >
            {pieData.map((entry) => (
              <Cell
                key={entry.category}
                fill={`var(--color-${entry.category.toLowerCase()})`}
              />
            ))}
          </RechartsPie>
        </PieChart>
      </ChartContainer>
    </div>
  ),
}

export const DashedIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bar chart using the dashed line indicator style in the tooltip for visual distinction.",
      },
    },
  },
  render: () => (
    <ChartContainer config={barConfig}>
      <BarChart data={monthlyData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsBar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <RechartsBar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  ),
}

export const HideLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bar chart tooltip configured with `hideLabel` to display values only without the series label.",
      },
    },
  },
  render: () => (
    <ChartContainer config={barConfig}>
      <BarChart data={monthlyData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsBar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <RechartsBar
          dataKey="expenses"
          fill="var(--color-expenses)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  ),
}
