import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Award, TrendingUp } from "lucide-react"
import { RadarChart } from "@/components/custom/radar-chart"

const meta = {
  title: "Data Display/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive radar (spider) chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Ideal for comparing multiple entities across the same set of dimensions — performance profiles, competency maps, multi-criteria assessments.",
          "",
          "Pass `dataKeys` as plain strings for automatic coloring, or as `{ key, label, color, filled }` objects for per-series control. Setting `filled` on an individual key overrides the component-level `filled` prop — useful for mixing a filled baseline series with an outlined comparison series.",
          "",
          "## Color Tokens",
          "",
          "Each series defaults to the next `--chart-N` token in order. These are defined in `globals.css` and adapt to every theme automatically.",
          "",
          "| Series | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st series** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd series** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd series** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th series** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th series** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `RadarChartKey` — for example `var(--primary)` or `var(--destructive)`.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Grid lines** | `--border` |",
          "| **Axis spoke labels** | `--muted-foreground` |",
          "| **Radius axis ticks** | `--muted-foreground` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Dot ring** | `--card` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    filled: { control: "boolean" },
    fillOpacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    dots: { control: "boolean" },
    gridShape: {
      control: "radio",
      options: ["polygon", "circle"],
    },
    showRadiusAxis: { control: "boolean" },
    showLegend: { control: "boolean" },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    showTooltip: { control: "boolean" },
    height: { control: { type: "range", min: 200, max: 600, step: 10 } },
    title: { control: "text" },
    subtitle: { control: "text" },
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof RadarChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const studentPerformance = [
  { subject: "Math", alice: 88, bob: 72, carol: 95 },
  { subject: "Physics", alice: 75, bob: 90, carol: 68 },
  { subject: "Chemistry", alice: 82, bob: 65, carol: 88 },
  { subject: "History", alice: 91, bob: 78, carol: 74 },
  { subject: "English", alice: 79, bob: 85, carol: 92 },
  { subject: "Biology", alice: 86, bob: 70, carol: 80 },
]

const departmentCapability = [
  { dimension: "Research", engineering: 82, medicine: 90, law: 55 },
  { dimension: "Teaching", engineering: 78, medicine: 85, law: 92 },
  { dimension: "Innovation", engineering: 95, medicine: 72, law: 60 },
  { dimension: "Outreach", engineering: 60, medicine: 88, law: 75 },
  { dimension: "Publications", engineering: 88, medicine: 94, law: 68 },
]

const currentVsTarget = [
  { skill: "Communication", current: 72, target: 90 },
  { skill: "Analysis", current: 85, target: 95 },
  { skill: "Leadership", current: 60, target: 80 },
  { skill: "Technical", current: 91, target: 95 },
  { skill: "Teamwork", current: 78, target: 85 },
  { skill: "Creativity", current: 65, target: 88 },
]

const semesterComparison = [
  { subject: "Math", sem1: 74, sem2: 82 },
  { subject: "Physics", sem1: 68, sem2: 76 },
  { subject: "English", sem1: 85, sem2: 88 },
  { subject: "History", sem1: 79, sem2: 83 },
  { subject: "Biology", sem1: 72, sem2: 78 },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Student Performance Profile",
    subtitle: "Alice — semester 2025.1 scores",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice" }],
    categoryKey: "subject",
    filled: true,
    showTooltip: true,
  },
}

export const Unfilled: Story = {
  args: {
    title: "Student Performance Profile",
    subtitle: "Outline-only — no fill",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice" }],
    categoryKey: "subject",
    filled: false,
    dots: true,
    showTooltip: true,
  },
}

export const MultiSeries: Story = {
  args: {
    title: "Student Comparison",
    subtitle: "Three students across six subjects",
    data: studentPerformance,
    dataKeys: [
      { key: "alice", label: "Alice" },
      { key: "bob", label: "Bob" },
      { key: "carol", label: "Carol" },
    ],
    categoryKey: "subject",
    filled: true,
    showLegend: true,
    showTooltip: true,
    height: 340,
  },
}

export const CurrentVsTarget: Story = {
  args: {
    title: "Competency Assessment",
    subtitle: "Current level vs. target — filled baseline, outline target",
    data: currentVsTarget,
    dataKeys: [
      {
        key: "current",
        label: "Current",
        color: "var(--chart-1)",
        filled: true,
      },
      {
        key: "target",
        label: "Target",
        color: "var(--chart-2)",
        filled: false,
      },
    ],
    categoryKey: "skill",
    showLegend: true,
    showTooltip: true,
    dots: true,
    height: 340,
  },
}

export const CircleGrid: Story = {
  args: {
    title: "Department Capability",
    subtitle: 'gridShape="circle" — smooth circular grid',
    data: departmentCapability,
    dataKeys: [
      { key: "engineering", label: "Engineering" },
      { key: "medicine", label: "Medicine" },
      { key: "law", label: "Law" },
    ],
    categoryKey: "dimension",
    gridShape: "circle",
    filled: true,
    showLegend: true,
    showTooltip: true,
    height: 340,
  },
}

export const WithRadiusAxis: Story = {
  args: {
    title: "Semester Comparison",
    subtitle: "showRadiusAxis — tick values on the radial axis",
    data: semesterComparison,
    dataKeys: [
      { key: "sem1", label: "Semester 1" },
      { key: "sem2", label: "Semester 2" },
    ],
    categoryKey: "subject",
    filled: true,
    showRadiusAxis: true,
    showLegend: true,
    showTooltip: true,
    height: 320,
  },
}

export const WithDots: Story = {
  args: {
    title: "Department Capability",
    subtitle: "Dots visible at each vertex",
    data: departmentCapability,
    dataKeys: [
      { key: "engineering", label: "Engineering" },
      { key: "medicine", label: "Medicine" },
    ],
    categoryKey: "dimension",
    filled: true,
    dots: true,
    showLegend: true,
    showTooltip: true,
    height: 320,
  },
}

export const WithFooter: Story = {
  args: {
    title: "Student Performance Profile",
    subtitle: "Alice · Semester 2025.1",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice", color: "var(--chart-2)" }],
    categoryKey: "subject",
    filled: true,
    showTooltip: true,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Award className="size-3.5 text-amber-500" />
          <span>Top score: English (91)</span>
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <TrendingUp className="size-3.5" />
          Average: 83.5
        </span>
      </div>
    ),
  },
}

export const LocalePTBR: Story = {
  args: {
    title: "Perfil de Desempenho do Aluno",
    subtitle: "Alice — semestre 2025.1",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice" }],
    categoryKey: "subject",
    filled: true,
    showTooltip: true,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof RadarChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <RadarChart {...props} loading={loading} />
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
    title: "Student Performance Profile",
    subtitle: "Alice — semester 2025.1 scores",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice" }],
    categoryKey: "subject",
    filled: true,
    showTooltip: true,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  args: {
    title: "Student Performance Profile",
    subtitle: "Alice — semester 2025.1 scores",
    data: [],
    dataKeys: ["alice"],
    categoryKey: "subject",
    height: 300,
  },
}

export const LegendPositions: Story = {
  args: {
    data: semesterComparison,
    dataKeys: ["sem1", "sem2"],
    categoryKey: "subject",
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <RadarChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={semesterComparison}
          dataKeys={[
            { key: "sem1", label: "Semester 1" },
            { key: "sem2", label: "Semester 2" },
          ]}
          categoryKey="subject"
          filled
          showLegend
          legendPosition={pos}
          showTooltip
          height={260}
        />
      ))}
    </div>
  ),
}
