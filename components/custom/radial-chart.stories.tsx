import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Award, TrendingUp, Users } from "lucide-react"
import { RadialChart } from "@/components/custom/radial-chart"

const meta = {
  title: "Data Display/RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive radial bar chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Each item in `data` becomes a concentric ring whose arc length represents its value. Great for comparing several metrics at a glance — attendance, approval, completion rates — without the cognitive load of a table.",
          "",
          "Pass `maxValue={100}` to lock all bars to the same 0–100 scale. Use `startAngle`/`endAngle` to switch between full circles (default) and semicircular gauges.",
          "",
          "For **single-metric gauges**, combine `maxValue`, `startAngle`, `endAngle`, and `innerLabel` to create a prominent KPI widget.",
          "",
          "## Color Tokens",
          "",
          "Each bar defaults to the next `--chart-N` token in order. These adapt to every theme automatically.",
          "",
          "| Bar order | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `RadialChartItem` — for example `var(--primary)` or `var(--destructive)`.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Track (background arc)** | `--muted` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Legend labels** | `--muted-foreground` |",
          "| **Center label** | `--foreground` / `--muted-foreground` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    showTrack: { control: "boolean" },
    showLegend: { control: "boolean" },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    showTooltip: { control: "boolean" },
    height: { control: { type: "range", min: 160, max: 500, step: 10 } },
    maxValue: { control: { type: "number" } },
    startAngle: { control: { type: "range", min: -360, max: 360, step: 10 } },
    endAngle: { control: { type: "range", min: -360, max: 360, step: 10 } },
    innerLabel: { control: "text" },
    title: { control: "text" },
    subtitle: { control: "text" },
    data: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof RadialChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const semesterMetrics = [
  { name: "Approval Rate", value: 88 },
  { name: "Attendance", value: 76 },
  { name: "Completion", value: 92 },
  { name: "Satisfaction", value: 81 },
]

const departmentPerformance = [
  { name: "Engineering", value: 84 },
  { name: "Health Sciences", value: 91 },
  { name: "Humanities", value: 73 },
  { name: "Exact Sciences", value: 87 },
  { name: "Arts & Design", value: 79 },
]

const singleAttendance = [
  { name: "Attendance", value: 87, color: "var(--chart-2)" },
]

const customColorMetrics = [
  { name: "Completed", value: 74, color: "var(--chart-2)" },
  { name: "In Progress", value: 18, color: "var(--chart-3)" },
  { name: "Dropped", value: 8, color: "var(--destructive)" },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
  },
}

export const WithLegend: Story = {
  args: {
    title: "Semester Performance",
    subtitle: "Click a legend item to hide / show its bar",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
  },
}

export const GaugeSingle: Story = {
  args: {
    title: "Attendance Rate",
    subtitle: "Semester 2025.1",
    data: singleAttendance,
    maxValue: 100,
    startAngle: 180,
    endAngle: 0,
    innerLabel: "Attendance",
    showTrack: true,
    showTooltip: true,
    height: 220,
    valueFormatter: (v) => `${v}%`,
  },
}

export const FullCircleWithLabel: Story = {
  args: {
    title: "Overall Attendance",
    subtitle: "Full-circle gauge — single metric",
    data: [{ name: "Attendance", value: 87, color: "var(--chart-1)" }],
    maxValue: 100,
    innerLabel: "Attendance",
    showTrack: true,
    showTooltip: true,
    height: 280,
    valueFormatter: (v) => `${v}%`,
  },
}

export const MultiDepartment: Story = {
  args: {
    title: "Average Grade by School",
    subtitle: "All departments · Semester 2025.1",
    data: departmentPerformance,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    height: 360,
    valueFormatter: (v) => `${v}%`,
  },
}

export const CustomColors: Story = {
  args: {
    title: "Course Completion",
    subtitle:
      "Semantic tokens: var(--chart-2), var(--chart-3), var(--destructive)",
    data: customColorMetrics,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
  },
}

export const NoTrack: Story = {
  args: {
    title: "Semester Metrics",
    subtitle: "showTrack={false} — bars only",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: false,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
  },
}

export const WithFooter: Story = {
  args: {
    title: "Department Performance",
    subtitle: "Semester 2025.1 average scores",
    data: departmentPerformance,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    height: 360,
    valueFormatter: (v) => `${v}%`,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Award className="size-3.5 text-amber-500" />
          Top: Health Sciences (91%)
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <TrendingUp className="size-3.5" />
          Avg: 82.8%
        </span>
      </div>
    ),
  },
}

export const GaugeGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {[
        { name: "Approval", value: 88, color: "var(--chart-1)" },
        { name: "Attendance", value: 76, color: "var(--chart-2)" },
        { name: "Completion", value: 92, color: "var(--chart-3)" },
        { name: "Satisfaction", value: 81, color: "var(--chart-4)" },
      ].map((item) => (
        <RadialChart
          key={item.name}
          data={[item]}
          maxValue={100}
          startAngle={180}
          endAngle={0}
          innerLabel={item.name}
          showTrack
          showTooltip
          height={160}
          valueFormatter={(v) => `${v}%`}
        />
      ))}
    </div>
  ),
  args: { data: semesterMetrics },
}

export const LegendPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <RadialChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={semesterMetrics}
          maxValue={100}
          showTrack
          showLegend
          legendPosition={pos}
          showTooltip
          valueFormatter={(v) => `${v}%`}
          height={260}
        />
      ))}
    </div>
  ),
  args: { data: semesterMetrics },
}

export const LocalePTBR: Story = {
  args: {
    title: "Desempenho Semestral",
    subtitle: "Indicadores principais — escala 0–100",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof RadialChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <RadialChart {...props} loading={loading} />
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
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => `${v}%`,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: [],
    height: 320,
  },
}

export const StudentKPIs: Story = {
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-1">
      <p className="mb-2 text-sm font-semibold text-foreground">
        Student KPI Dashboard
      </p>
      <p className="mb-4 text-xs text-muted-foreground">
        4 semicircle gauges — each is an independent RadialChart instance
      </p>
      <div className="grid grid-cols-2 gap-4">
        <RadialChart
          title="Approval Rate"
          data={[{ name: "Approved", value: 88, color: "var(--chart-2)" }]}
          maxValue={100}
          startAngle={210}
          endAngle={-30}
          innerLabel="Approved"
          showTrack
          showTooltip
          height={200}
          valueFormatter={(v) => `${v}%`}
        />
        <RadialChart
          title="Attendance"
          data={[{ name: "Attendance", value: 76, color: "var(--chart-1)" }]}
          maxValue={100}
          startAngle={210}
          endAngle={-30}
          innerLabel="Attendance"
          showTrack
          showTooltip
          height={200}
          valueFormatter={(v) => `${v}%`}
        />
        <RadialChart
          title="Completion"
          data={[{ name: "Completion", value: 92, color: "var(--chart-3)" }]}
          maxValue={100}
          startAngle={210}
          endAngle={-30}
          innerLabel="Completion"
          showTrack
          showTooltip
          height={200}
          valueFormatter={(v) => `${v}%`}
        />
        <RadialChart
          title="Dropout Risk"
          data={[{ name: "At Risk", value: 12, color: "var(--destructive)" }]}
          maxValue={100}
          startAngle={210}
          endAngle={-30}
          innerLabel="At Risk"
          showTrack
          showTooltip
          height={200}
          valueFormatter={(v) => `${v}%`}
        />
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="size-3.5" />
        Based on 9,740 students · Semester 2025.1
      </p>
    </div>
  ),
  args: { data: semesterMetrics },
}
