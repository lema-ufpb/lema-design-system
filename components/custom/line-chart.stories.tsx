import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"
import { LineChart } from "@/components/custom/line-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive line chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Supports plain lines, gradient area fills, and stacked areas — all driven by a single `variant` prop. Add horizontal **reference lines** (targets, SLA thresholds, averages) and mark projected or estimated series with a `dashed` flag on any key.",
          "",
          "Pass `dataKeys` as plain strings for automatic coloring, or as `{ key, label, color, dashed }` objects for per-series control.",
          "",
          "## Color Tokens",
          "",
          "Each series defaults to the next `--chart-N` token in order. These are defined in `globals.css` and adapt to every theme (light, dark, and any color preset) automatically.",
          "",
          "| Series | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st series** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd series** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd series** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th series** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th series** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `LineChartKey` — for example `var(--primary)`, `var(--destructive)`, or a raw `oklch(...)` value. The same color is applied to the stroke, gradient fill, active dot, and legend swatch.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Grid lines** | `--border` |",
          "| **Axis labels** | `--muted-foreground` |",
          "| **Cursor line** | `--border` (dashed) |",
          "| **Active dot ring** | `--card` (stroke) |",
          "| **Reference line default** | `--muted-foreground` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "area", "area-stacked"],
      table: { defaultValue: { summary: "line" } },
    },
    curve: {
      control: "select",
      options: ["linear", "smooth", "step"],
      table: { defaultValue: { summary: "smooth" } },
    },
    dots: {
      control: "select",
      options: ["none", "hover", "always"],
      table: { defaultValue: { summary: "hover" } },
    },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: { defaultValue: { summary: "bottom" } },
    },
    showGrid: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showBrush: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    connectNulls: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    height: {
      control: { type: "range", min: 150, max: 600, step: 10 },
      table: { defaultValue: { summary: "280" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    subtitle: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    xAxisLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    yAxisLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    referenceLines: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const weeklyActiveUsers = [
  { week: "W1", users: 1420 },
  { week: "W2", users: 1680 },
  { week: "W3", users: 1530 },
  { week: "W4", users: 1870 },
  { week: "W5", users: 2100 },
  { week: "W6", users: 1950 },
  { week: "W7", users: 2340 },
  { week: "W8", users: 2580 },
]

const enrollmentTrend = [
  { month: "Jan", undergraduate: 3200, graduate: 820, distance: 540 },
  { month: "Feb", undergraduate: 3150, graduate: 840, distance: 610 },
  { month: "Mar", undergraduate: 3400, graduate: 910, distance: 680 },
  { month: "Apr", undergraduate: 3280, graduate: 890, distance: 720 },
  { month: "May", undergraduate: 3600, graduate: 960, distance: 790 },
  { month: "Jun", undergraduate: 3520, graduate: 1010, distance: 830 },
]

const responseTime = [
  { time: "00h", p50: 82, p95: 210, p99: 380 },
  { time: "04h", p50: 74, p95: 195, p99: 340 },
  { time: "08h", p50: 138, p95: 420, p99: 890 },
  { time: "10h", p50: 164, p95: 510, p99: 1120 },
  { time: "12h", p50: 142, p95: 460, p99: 970 },
  { time: "14h", p50: 155, p95: 490, p99: 1050 },
  { time: "16h", p50: 170, p95: 530, p99: 1180 },
  { time: "20h", p50: 95, p95: 240, p99: 510 },
  { time: "23h", p50: 78, p95: 200, p99: 350 },
]

const revenueVsForecast: Record<string, string | number>[] = [
  { month: "Jan", actual: 42000, forecast: 45000 },
  { month: "Feb", actual: 58000, forecast: 52000 },
  { month: "Mar", actual: 51000, forecast: 55000 },
  { month: "Apr", actual: 73000, forecast: 68000 },
  { month: "May", actual: 66000, forecast: 70000 },
  { month: "Jun", forecast: 82000 },
  { month: "Jul", forecast: 88000 },
]

const stepData = [
  { stage: "Applied", count: 1200 },
  { stage: "Screened", count: 840 },
  { stage: "Interviewed", count: 420 },
  { stage: "Offered", count: 180 },
  { stage: "Enrolled", count: 156 },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default smooth line chart showing weekly active user growth over 8 weeks with hover-activated dots.",
      },
    },
  },
  args: {
    title: "Weekly Active Users",
    subtitle: "Platform engagement over 8 weeks",
    data: weeklyActiveUsers,
    dataKeys: [{ key: "users", label: "Active Users" }],
    categoryKey: "week",
    variant: "line",
    curve: "smooth",
    dots: "hover",
    showGrid: true,
    showTooltip: true,
  },
}

export const Area: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Line chart with a gradient area fill using `var(--chart-1)` for emphasizing the magnitude beneath the curve.",
      },
    },
  },
  args: {
    title: "Weekly Active Users",
    subtitle: "Gradient area fill using var(--chart-1)",
    data: weeklyActiveUsers,
    dataKeys: [{ key: "users", label: "Active Users" }],
    categoryKey: "week",
    variant: "area",
    curve: "smooth",
    showGrid: true,
    showTooltip: true,
  },
}

export const WithAxisLabels: Story = {
  args: {
    data: weeklyActiveUsers,
    dataKeys: [{ key: "users", label: "Active Users" }],
    categoryKey: "week",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `xAxisLabel` and `yAxisLabel` to render centred axis titles. The chart margins are automatically expanded to prevent clipping.",
      },
    },
  },
  render: () => (
    <LineChart
      title="Weekly Active Users"
      subtitle="xAxisLabel + yAxisLabel"
      data={weeklyActiveUsers}
      dataKeys={[{ key: "users", label: "Active Users" }]}
      categoryKey="week"
      variant="line"
      curve="smooth"
      showGrid
      showTooltip
      xAxisLabel="Week"
      yAxisLabel="Number of Users"
      height={320}
    />
  ),
}

export const AreaStacked: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stacked area chart comparing undergraduate, graduate, and distance learning enrollment trends with a legend.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Stacked area — total and breakdown per program type",
    data: enrollmentTrend,
    dataKeys: [
      { key: "undergraduate", label: "Undergraduate" },
      { key: "graduate", label: "Graduate" },
      { key: "distance", label: "Distance Learning" },
    ],
    categoryKey: "month",
    variant: "area-stacked",
    curve: "smooth",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 300,
  },
}

export const MultiSeries: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multi-series line chart comparing three enrollment program trends side by side with a legend for identification.",
      },
    },
  },
  args: {
    title: "Enrollment Trends",
    subtitle: "Three programs compared side-by-side",
    data: enrollmentTrend,
    dataKeys: [
      { key: "undergraduate", label: "Undergraduate" },
      { key: "graduate", label: "Graduate" },
      { key: "distance", label: "Distance Learning" },
    ],
    categoryKey: "month",
    variant: "line",
    curve: "smooth",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 300,
  },
}

export const WithReferenceLines: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "API response time line chart with P50, P95, and P99 latency series and dashed SLA threshold reference lines.",
      },
    },
  },
  args: {
    title: "API Response Time",
    subtitle: "P50 · P95 · P99 latency — with SLA thresholds",
    data: responseTime,
    dataKeys: [
      { key: "p50", label: "P50 (median)" },
      { key: "p95", label: "P95" },
      { key: "p99", label: "P99" },
    ],
    categoryKey: "time",
    variant: "line",
    curve: "smooth",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    referenceLines: [
      {
        value: 200,
        label: "SLA target",
        color: "var(--chart-2)",
        dashed: true,
      },
      {
        value: 1000,
        label: "P99 limit",
        color: "var(--destructive)",
        dashed: false,
      },
    ],
    valueFormatter: (v) => formatValue(v, "integer") + "ms",
    height: 320,
  },
}

export const DashedForecast: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Line chart combining a solid actual revenue line with a dashed forecast line and null-gap connection for missing data points.",
      },
    },
  },
  args: {
    title: "Revenue vs. Forecast",
    subtitle: "Solid line = actual · Dashed line = forecast",
    data: revenueVsForecast,
    dataKeys: [
      { key: "actual", label: "Actual", color: "var(--chart-1)" },
      {
        key: "forecast",
        label: "Forecast",
        color: "var(--chart-2)",
        dashed: true,
      },
    ],
    categoryKey: "month",
    variant: "line",
    curve: "smooth",
    connectNulls: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    valueFormatter: (v) =>
      formatValue(v, "currency", {
        currency: "USD",
        abbreviate: true,
        decimals: 0,
      }),
    height: 300,
  },
}

export const StepCurve: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Step-curve area chart showing the admission funnel from applied through enrolled with always-visible data points.",
      },
    },
  },
  args: {
    title: "Admission Funnel",
    subtitle: "Step curve — discrete stage transitions",
    data: stepData,
    dataKeys: [{ key: "count", label: "Candidates", color: "var(--chart-3)" }],
    categoryKey: "stage",
    variant: "area",
    curve: "step",
    dots: "always",
    showGrid: true,
    showTooltip: true,
    height: 260,
  },
}

export const DotsAlways: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multi-series line chart with data points set to always visible for precise value reading across two programs.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Data points always visible",
    data: enrollmentTrend,
    dataKeys: [
      { key: "undergraduate", label: "Undergraduate" },
      { key: "graduate", label: "Graduate" },
    ],
    categoryKey: "month",
    variant: "line",
    curve: "smooth",
    dots: "always",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 280,
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Area chart with a custom footer showing growth percentage and a scheduled maintenance dip annotation.",
      },
    },
  },
  args: {
    title: "Weekly Active Users",
    subtitle: "Last 8 weeks",
    data: weeklyActiveUsers,
    dataKeys: [
      { key: "users", label: "Active Users", color: "var(--chart-2)" },
    ],
    categoryKey: "week",
    variant: "area",
    curve: "smooth",
    showGrid: true,
    showTooltip: true,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-emerald-500" />
          <span>+81.7% growth since week 1</span>
        </span>
        <span className="flex items-center gap-1 text-muted-foreground/70">
          <AlertCircle className="size-3" />
          W6 dip: scheduled maintenance
        </span>
      </div>
    ),
  },
}

export const LegendPositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four line charts demonstrating all four legend positions (top, right, bottom, left) with enrollment data.",
      },
    },
  },
  args: {
    data: enrollmentTrend,
    dataKeys: ["undergraduate", "graduate", "distance"],
    categoryKey: "month",
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <LineChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={enrollmentTrend}
          dataKeys={[
            { key: "undergraduate", label: "Undergraduate" },
            { key: "graduate", label: "Graduate" },
            { key: "distance", label: "Distance" },
          ]}
          categoryKey="month"
          variant="line"
          curve="smooth"
          showLegend
          legendPosition={pos}
          showGrid
          showTooltip
          height={240}
        />
      ))}
    </div>
  ),
}

// 52-week dataset — a full academic year at weekly resolution
const weeklyPlatformUsage = Array.from({ length: 52 }, (_, i) => {
  const week = `W${String(i + 1).padStart(2, "0")}`
  // Simulate two semesters with peaks around midterm/finals (weeks 8,16,30,44)
  const peak = (w: number) =>
    80 * Math.exp(-0.5 * (((w % 26) - 8) / 3) ** 2) +
    60 * Math.exp(-0.5 * (((w % 26) - 16) / 2) ** 2)
  const base = 1200 + peak(i) * 10
  return {
    week,
    logins: Math.round(base + Math.random() * 120 - 60),
    downloads: Math.round(base * 0.4 + Math.random() * 60 - 30),
  }
})

export const WithBrush: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multi-series area chart with a brush slider for interactive zoom across 52 weeks of login and download data.",
      },
    },
  },
  args: {
    title: "Platform Usage — Full Academic Year",
    subtitle: "Drag the handles to zoom in on any stretch of weeks",
    data: weeklyPlatformUsage,
    dataKeys: [
      { key: "logins", label: "Logins" },
      { key: "downloads", label: "Downloads" },
    ],
    categoryKey: "week",
    variant: "area",
    curve: "smooth",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    height: 340,
  },
}

export const WithBrushArea: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stacked area chart with a brush slider combining area-stacked series and interactive range zoom for weekly totals.",
      },
    },
  },
  args: {
    title: "Stacked Area + Brush",
    subtitle: "showBrush + area-stacked — scroll to explore weekly totals",
    data: weeklyPlatformUsage,
    dataKeys: [
      { key: "logins", label: "Logins" },
      { key: "downloads", label: "Downloads" },
    ],
    categoryKey: "week",
    variant: "area-stacked",
    curve: "smooth",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    height: 340,
  },
}

export const LocalePTBR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Line chart with Portuguese locale displaying weekly active users and platform engagement in localized format.",
      },
    },
  },
  args: {
    title: "Usuários Ativos Semanais",
    subtitle: "Engajamento na plataforma — 8 semanas",
    data: weeklyActiveUsers,
    dataKeys: [{ key: "users", label: "Usuários Ativos" }],
    categoryKey: "week",
    variant: "line",
    curve: "smooth",
    dots: "hover",
    showGrid: true,
    showTooltip: true,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof LineChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <LineChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the line chart with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Weekly Active Users",
    subtitle: "Platform engagement over 8 weeks",
    data: weeklyActiveUsers,
    dataKeys: [{ key: "users", label: "Active Users" }],
    categoryKey: "week",
    variant: "line",
    curve: "smooth",
    showGrid: true,
    showTooltip: true,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the line chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Weekly Active Users",
    subtitle: "Platform engagement over 8 weeks",
    data: [],
    dataKeys: ["users"],
    categoryKey: "week",
    height: 280,
  },
}

export const NegativeTrend: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Area chart showing a declining dropout rate with a dashed target reference line and a footer confirming the target was reached.",
      },
    },
  },
  args: {
    title: "Dropout Rate",
    subtitle: "Monthly dropout percentage — target below 5%",
    data: [
      { month: "Jan", rate: 8.2 },
      { month: "Feb", rate: 7.6 },
      { month: "Mar", rate: 9.1 },
      { month: "Apr", rate: 6.8 },
      { month: "May", rate: 5.4 },
      { month: "Jun", rate: 4.9 },
    ],
    dataKeys: [
      { key: "rate", label: "Dropout %", color: "var(--destructive)" },
    ],
    categoryKey: "month",
    variant: "area",
    curve: "smooth",
    showGrid: true,
    showTooltip: true,
    referenceLines: [
      { value: 5, label: "Target", color: "var(--chart-2)", dashed: true },
    ],
    valueFormatter: (v) => formatValue(v, "float", { decimals: 1 }) + "%",
    footer: (
      <span className="flex items-center gap-1.5">
        <TrendingDown className="size-3.5 text-emerald-500" />
        Down from 8.2% to 4.9% — target reached in June
      </span>
    ),
  },
}
