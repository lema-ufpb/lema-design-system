import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Award, TrendingUp, Users } from "lucide-react"
import { RadialChart } from "@/components/custom/radial-chart"
import { formatValue } from "@/lib/format-utils"

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
    showTrack: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: { defaultValue: { summary: "bottom" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    height: {
      control: { type: "range", min: 160, max: 500, step: 10 },
      table: { defaultValue: { summary: "320" } },
    },
    maxValue: {
      control: { type: "number" },
      table: { defaultValue: { summary: "" } },
    },
    startAngle: {
      control: { type: "range", min: -360, max: 360, step: 10 },
      table: { defaultValue: { summary: "90" } },
    },
    endAngle: {
      control: { type: "range", min: -360, max: 360, step: 10 },
      table: { defaultValue: { summary: "-270" } },
    },
    innerLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    subtitle: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Four concentric radial bars showing approval rate, attendance, completion, and satisfaction on a 0–100 scale with track and tooltip.",
      },
    },
  },
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radial chart with an interactive legend allowing show/hide toggle for each semester performance metric.",
      },
    },
  },
  args: {
    title: "Semester Performance",
    subtitle: "Click a legend item to hide / show its bar",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const GaugeSingle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Single-metric semicircular gauge showing attendance rate with a center label, track background, and compact height.",
      },
    },
  },
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
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const FullCircleWithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full-circle radial gauge displaying a single attendance metric with center label, track, and a custom color.",
      },
    },
  },
  args: {
    title: "Overall Attendance",
    subtitle: "Full-circle gauge — single metric",
    data: [{ name: "Attendance", value: 87, color: "var(--chart-1)" }],
    maxValue: 100,
    innerLabel: "Attendance",
    showTrack: true,
    showTooltip: true,
    height: 280,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const MultiDepartment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Five-bar radial chart comparing average grades across schools with a legend for identification and tooltips.",
      },
    },
  },
  args: {
    title: "Average Grade by School",
    subtitle: "All departments · Semester 2025.1",
    data: departmentPerformance,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    height: 360,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radial chart using semantic color tokens for completed, in-progress, and dropped course status with a legend.",
      },
    },
  },
  args: {
    title: "Course Completion",
    subtitle:
      "Semantic tokens: var(--chart-2), var(--chart-3), var(--destructive)",
    data: customColorMetrics,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const NoTrack: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radial chart with background tracks hidden, displaying only the active colored bars for a cleaner look.",
      },
    },
  },
  args: {
    title: "Semester Metrics",
    subtitle: "showTrack={false} — bars only",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: false,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Five-bar radial chart with a footer showing the top-performing department and overall average score.",
      },
    },
  },
  args: {
    title: "Department Performance",
    subtitle: "Semester 2025.1 average scores",
    data: departmentPerformance,
    maxValue: 100,
    showTrack: true,
    showLegend: true,
    showTooltip: true,
    height: 360,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
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
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four semicircular gauges showing approval, attendance, completion, and satisfaction as independent KPI widgets.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four radial charts demonstrating all four legend positions (top, right, bottom, left) for semester metrics.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Radial chart with Portuguese locale displaying semester performance indicators in localized number format.",
      },
    },
  },
  args: {
    title: "Desempenho Semestral",
    subtitle: "Indicadores principais — escala 0–100",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
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
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` to replace the radial chart with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: semesterMetrics,
    maxValue: 100,
    showTrack: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the radial chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Semester Performance",
    subtitle: "Key indicators — 0–100 scale",
    data: [],
    height: 320,
  },
}

export const StudentKPIs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dashboard of four semicircular gauges showing approval rate, attendance, completion, and dropout risk as independent RadialChart instances.",
      },
    },
  },
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
