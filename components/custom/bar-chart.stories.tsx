import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TrendingUp, Info } from "lucide-react"
import { BarChart } from "@/components/custom/bar-chart"

const meta = {
  title: "Data Display/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive bar chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Supports vertical bars (pointing up) and horizontal bars (pointing right), multi-series side-by-side or stacked, optional title/subtitle header, and a footer slot.",
          "",
          "Pass `dataKeys` as plain strings for automatic coloring, or as `{ key, label, color }` objects for per-series control.",
          "",
          "## Color Tokens",
          "",
          "By default, each series maps to the next `--chart-N` token in order. These tokens are defined in your `globals.css` and adapt automatically to every theme (light, dark, and any color preset).",
          "",
          "| Series | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st series** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd series** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd series** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th series** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th series** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any arbitrary CSS value to `color` on a `BarChartKey` — for example `var(--primary)`, `var(--destructive)`, or a raw `oklch(...)` value.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Grid lines** | `--border` |",
          "| **Axis labels** | `--muted-foreground` |",
          "| **Hover cursor** | `--muted` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showTooltip: { control: "boolean" },
    showBrush: { control: "boolean" },
    stacked: { control: "boolean" },
    rounded: { control: "boolean" },
    height: { control: { type: "range", min: 150, max: 600, step: 10 } },
    barSize: { control: { type: "range", min: 8, max: 60, step: 2 } },
    title: { control: "text" },
    subtitle: { control: "text" },
    xAxisLabel: { control: "text" },
    yAxisLabel: { control: "text" },
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 58000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 73000 },
  { month: "May", revenue: 66000 },
  { month: "Jun", revenue: 89000 },
]

const enrollmentByDept = [
  { dept: "Engineering", enrolled: 320, active: 285 },
  { dept: "Medicine", enrolled: 180, active: 162 },
  { dept: "Law", enrolled: 240, active: 210 },
  { dept: "Letters", enrolled: 150, active: 128 },
  { dept: "Sciences", enrolled: 195, active: 175 },
]

const quarterlyBudget = [
  { quarter: "Q1", planned: 120000, actual: 98000, projected: 115000 },
  { quarter: "Q2", planned: 135000, actual: 142000, projected: 130000 },
  { quarter: "Q3", planned: 110000, actual: 105000, projected: 118000 },
  { quarter: "Q4", planned: 160000, actual: 0, projected: 155000 },
]

const absencesByCourse = [
  { course: "Calculus I", absences: 38 },
  { course: "Physics II", absences: 52 },
  { course: "Portuguese", absences: 21 },
  { course: "History", absences: 15 },
  { course: "Chemistry", absences: 44 },
  { course: "Biology", absences: 29 },
]

const formatUSD = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Monthly Revenue",
    subtitle: "January – June 2025",
    data: monthlyRevenue,
    dataKeys: ["revenue"],
    categoryKey: "month",
    showGrid: true,
    showTooltip: true,
    rounded: true,
    valueFormatter: formatUSD,
  },
}

export const Horizontal: Story = {
  args: {
    title: "Absences by Course",
    subtitle: "Semester 2025.1",
    data: absencesByCourse,
    dataKeys: [{ key: "absences", label: "Absences" }],
    categoryKey: "course",
    orientation: "horizontal",
    showGrid: true,
    rounded: true,
    height: 300,
  },
}

export const MultiSeries: Story = {
  args: {
    title: "Enrollment by Department",
    subtitle: "Enrolled vs. active students",
    data: enrollmentByDept,
    dataKeys: [
      { key: "enrolled", label: "Enrolled" },
      { key: "active", label: "Active" },
    ],
    categoryKey: "dept",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    rounded: true,
    height: 300,
  },
}

export const MultiSeriesHorizontal: Story = {
  args: {
    title: "Enrollment by Department",
    subtitle: "Enrolled vs. active students — horizontal orientation",
    data: enrollmentByDept,
    dataKeys: [
      { key: "enrolled", label: "Enrolled" },
      { key: "active", label: "Active" },
    ],
    categoryKey: "dept",
    orientation: "horizontal",
    showGrid: true,
    showLegend: true,
    rounded: true,
    height: 320,
  },
}

export const Stacked: Story = {
  args: {
    title: "Quarterly Budget",
    subtitle: "Planned · Actual · Projected",
    data: quarterlyBudget,
    dataKeys: [
      { key: "planned", label: "Planned" },
      { key: "actual", label: "Actual" },
      { key: "projected", label: "Projected" },
    ],
    categoryKey: "quarter",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    rounded: true,
    valueFormatter: formatUSD,
    height: 300,
  },
}

export const StackedHorizontal: Story = {
  args: {
    title: "Quarterly Budget",
    subtitle: "Cumulative by quarter — horizontal",
    data: quarterlyBudget,
    dataKeys: [
      { key: "planned", label: "Planned" },
      { key: "actual", label: "Actual" },
      { key: "projected", label: "Projected" },
    ],
    categoryKey: "quarter",
    orientation: "horizontal",
    stacked: true,
    showGrid: true,
    showLegend: true,
    rounded: true,
    valueFormatter: formatUSD,
    height: 260,
  },
}

export const WithFooter: Story = {
  args: {
    title: "Monthly Revenue",
    subtitle: "Year-to-date 2025",
    data: monthlyRevenue,
    dataKeys: [{ key: "revenue", label: "Revenue", color: "var(--chart-2)" }],
    categoryKey: "month",
    showGrid: true,
    showTooltip: true,
    rounded: true,
    valueFormatter: formatUSD,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-emerald-500" />
          <span>Up 18% over the last 3 months</span>
        </span>
        <span className="flex items-center gap-1 text-muted-foreground/70">
          <Info className="size-3" />
          Updated today
        </span>
      </div>
    ),
  },
}

export const CustomColors: Story = {
  args: {
    title: "Enrollment by Department",
    subtitle: "Using var(--primary) and var(--chart-3) as series colors",
    data: enrollmentByDept,
    dataKeys: [
      { key: "enrolled", label: "Enrolled", color: "var(--primary)" },
      { key: "active", label: "Active", color: "var(--chart-3)" },
    ],
    categoryKey: "dept",
    showGrid: true,
    showLegend: true,
    rounded: true,
    height: 300,
  },
}

export const NoDecoration: Story = {
  args: {
    data: monthlyRevenue,
    dataKeys: ["revenue"],
    categoryKey: "month",
    showGrid: false,
    showTooltip: false,
    rounded: false,
    barSize: 24,
    height: 200,
  },
}

export const WithAxisLabels: Story = {
  args: {
    data: monthlyRevenue,
    dataKeys: ["revenue"],
    categoryKey: "month",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `xAxisLabel` and `yAxisLabel` to render centred axis titles. The chart bottom and left margins are automatically expanded to prevent clipping. Works in both `vertical` and `horizontal` orientations.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <BarChart
        title="Vertical — with axis labels"
        subtitle="xAxisLabel + yAxisLabel"
        data={monthlyRevenue}
        dataKeys={[{ key: "revenue", label: "Revenue" }]}
        categoryKey="month"
        showGrid
        showTooltip
        rounded
        valueFormatter={formatUSD}
        xAxisLabel="Month"
        yAxisLabel="Revenue (USD)"
        height={300}
      />
      <BarChart
        title="Horizontal — with axis labels"
        subtitle="xAxisLabel + yAxisLabel in horizontal orientation"
        data={absencesByCourse}
        dataKeys={[{ key: "absences", label: "Absences" }]}
        categoryKey="course"
        orientation="horizontal"
        showGrid
        rounded
        xAxisLabel="Number of Absences"
        yAxisLabel="Course"
        height={300}
      />
    </div>
  ),
}

// 24-month dataset — enough data to make the brush worth dragging
const enrollmentTwoYears = [
  { month: "Jan/24", enrolled: 3100, graduated: 210 },
  { month: "Feb/24", enrolled: 3250, graduated: 195 },
  { month: "Mar/24", enrolled: 3480, graduated: 230 },
  { month: "Apr/24", enrolled: 3310, graduated: 245 },
  { month: "May/24", enrolled: 3620, graduated: 260 },
  { month: "Jun/24", enrolled: 3540, graduated: 280 },
  { month: "Jul/24", enrolled: 3190, graduated: 190 },
  { month: "Aug/24", enrolled: 3720, graduated: 220 },
  { month: "Sep/24", enrolled: 3850, graduated: 270 },
  { month: "Oct/24", enrolled: 3780, graduated: 255 },
  { month: "Nov/24", enrolled: 3640, graduated: 240 },
  { month: "Dec/24", enrolled: 3500, graduated: 300 },
  { month: "Jan/25", enrolled: 3200, graduated: 225 },
  { month: "Feb/25", enrolled: 3380, graduated: 210 },
  { month: "Mar/25", enrolled: 3590, graduated: 250 },
  { month: "Apr/25", enrolled: 3420, graduated: 265 },
  { month: "May/25", enrolled: 3740, graduated: 285 },
  { month: "Jun/25", enrolled: 3660, graduated: 295 },
  { month: "Jul/25", enrolled: 3300, graduated: 200 },
  { month: "Aug/25", enrolled: 3890, graduated: 240 },
  { month: "Sep/25", enrolled: 4020, graduated: 290 },
  { month: "Oct/25", enrolled: 3950, graduated: 275 },
  { month: "Nov/25", enrolled: 3810, graduated: 260 },
  { month: "Dec/25", enrolled: 3680, graduated: 320 },
]

export const WithBrush: Story = {
  args: {
    title: "Enrollment & Graduations — 2024–2025",
    subtitle: "Drag the handles at the bottom to zoom in on a time range",
    data: enrollmentTwoYears,
    dataKeys: [
      { key: "enrolled", label: "Enrolled" },
      { key: "graduated", label: "Graduated", color: "var(--chart-3)" },
    ],
    categoryKey: "month",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    rounded: true,
    height: 340,
  },
}

export const WithBrushStacked: Story = {
  args: {
    title: "Enrollment & Graduations — stacked view",
    subtitle: "showBrush + stacked — scroll to compare semester peaks",
    data: enrollmentTwoYears,
    dataKeys: [
      { key: "enrolled", label: "Enrolled" },
      { key: "graduated", label: "Graduated", color: "var(--chart-3)" },
    ],
    categoryKey: "month",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    rounded: true,
    height: 340,
  },
}

export const LocalePTBR: Story = {
  args: {
    title: "Receita Mensal",
    subtitle: "Janeiro – Junho 2025",
    data: monthlyRevenue,
    dataKeys: ["revenue"],
    categoryKey: "month",
    showGrid: true,
    showTooltip: true,
    rounded: true,
    valueFormatter: (v) =>
      v >= 1000
        ? `R$${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}k`
        : `R$${v.toLocaleString("pt-BR")}`,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof BarChart>) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="space-y-3">
      <BarChart {...props} loading={loading} />
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={() => setLoading(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          ↺ Simulate reload
        </button>
        <span className="text-xs text-muted-foreground">
          {loading ? "Fetching data…" : "Data loaded"}
        </span>
      </div>
    </div>
  )
}

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` to replace the chart with an animated skeleton. Each bar pulses in a wave cascade (left → right) with staggered delays. The skeleton mirrors the presence of `title`, `subtitle`, and `footer` props — only the sections you pass are included in the skeleton layout.\n\nClick **Simulate reload** to replay the transition.",
      },
    },
  },
  args: {
    title: "Monthly Revenue",
    subtitle: "January – June 2025",
    data: monthlyRevenue,
    dataKeys: [{ key: "revenue", label: "Revenue" }],
    categoryKey: "month",
    showGrid: true,
    showTooltip: true,
    rounded: true,
    valueFormatter: formatUSD,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-emerald-500" />
          <span>Up 18% over the last 3 months</span>
        </span>
        <span className="flex items-center gap-1 text-muted-foreground/70">
          <Info className="size-3" />
          Updated today
        </span>
      </div>
    ),
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the chart renders a placeholder with a dashed border instead of an empty axes grid. The `title`, `subtitle`, and `footer` slots remain visible so the card context is preserved.",
      },
    },
  },
  args: {
    title: "Monthly Revenue",
    subtitle: "January – June 2025",
    data: [],
    dataKeys: ["revenue"],
    categoryKey: "month",
    height: 280,
  },
}

export const LegendPositions: Story = {
  args: {
    data: enrollmentByDept,
    dataKeys: ["enrolled", "active"],
    categoryKey: "dept",
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <BarChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={enrollmentByDept}
          dataKeys={[
            { key: "enrolled", label: "Enrolled" },
            { key: "active", label: "Active" },
          ]}
          categoryKey="dept"
          showLegend
          legendPosition={pos}
          showGrid
          showTooltip
          rounded
          height={240}
        />
      ))}
    </div>
  ),
}
