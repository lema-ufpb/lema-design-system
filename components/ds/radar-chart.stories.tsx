import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Award, TrendingUp } from "lucide-react"
import { RadarChart } from "@/components/ds/radar-chart"
import { formatValue } from "@/lib/format-utils"

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
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of objects where each object represents one spoke (dimension) of the radar.",
          "",
          "```tsx",
          "const data = [",
          '  { skill: "Leadership",    self: 85, manager: 70 },',
          '  { skill: "Communication", self: 72, manager: 65 },',
          '  { skill: "Technical",     self: 90, manager: 88 },',
          "]",
          "```",
          "",
          "> **Type:** `Record<string, string | number>[]`",
          "",
          "### `categoryKey`",
          "",
          "The object key used for **spoke labels** around the radar.",
          "",
          "```tsx",
          'categoryKey="skill"  // "Leadership", "Communication" → each becomes a spoke',
          "```",
          "",
          "> **Type:** `string`  •  **Required**",
          "",
          "### `dataKeys`",
          "",
          "Which object keys to render as radar polygons. Accepts two shapes:",
          "",
          "**1. Plain strings:**",
          "```tsx",
          'dataKeys={["self", "manager"]}',
          "```",
          "",
          "**2. Objects `{ key, label?, color?, filled? }`:**",
          "```tsx",
          "dataKeys=[",
          '  { key: "self",    label: "Self-assessment", filled: true },',
          '  { key: "manager", label: "Manager review",  color: "var(--chart-3)" },',
          "]",
          "```",
          "",
          "| Field | Type | Description |",
          "| --- | --- | --- |",
          "| `key` | `string` | Object key in each row of `data` |",
          "| `label` | `string` | Legend/tooltip label; falls back to `key` |",
          "| `color` | `string` | Any CSS color; defaults to `--chart-N` token |",
          "| `filled` | `boolean` | Overrides the component-level `filled` for this series |",
          "",
          "> **Type:** `RadarChartKey[] | string[]`  •  **Required**",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { RadarChart } from "@/components/ds/radar-chart"',
          "",
          "function SkillsRadar() {",
          "  const data = [",
          '    { skill: "Leadership", self: 85, manager: 70 },',
          "  ]",
          "",
          "  return (",
          "    <RadarChart",
          '      title="Competency Profile"',
          "      data={data}",
          '      categoryKey="skill"',
          '      dataKeys={["self", "manager"]}',
          "      height={300}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
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
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `Record<string, string \\| number>[]` | — | (required) Chart data |",
          "| `dataKeys` | `RadarChartKey[] \\| string[]` | — | (required) Keys to render as radar polygons |",
          "| `categoryKey` | `string` | — | (required) Object key for spoke labels |",
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          "| `filled` | `boolean` | `true` | Fill each radar area with semi-transparent color |",
          "| `fillOpacity` | `number` | `0.18` | Fill opacity for each series |",
          "| `dots` | `boolean` | `false` | Show a dot at each data vertex |",
          '| `gridShape` | `RadarGridShape` | `"polygon"` | Background grid shape |',
          "| `showRadiusAxis` | `boolean` | `false` | Show the radial value axis ticks |",
          "| `height` | `number` | `300` | Chart height in px |",
          "| `showLegend` | `boolean` | `false` | Show legend |",
          '| `legendPosition` | `LegendPosition` | `"bottom"` | Legend position |',
          "| `showTooltip` | `boolean` | `true` | Show tooltip on hover |",
          "| `valueFormatter` | `(value: number) => string` | — | Format radial axis ticks and tooltip |",
          "| `loading` | `boolean` | `false` | Animated skeleton while data loads |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
          "| `format` | `FormatPreset` | — | Format preset |",
          "| `decimals` | `number` | — | Decimal places |",
          "| `currency` | `string` | — | Currency symbol |",
          "| `abbreviate` | `boolean` | — | Abbreviate large numbers |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    filled: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    fillOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
      table: { defaultValue: { summary: "0.18" } },
    },
    dots: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    gridShape: {
      control: "radio",
      options: ["polygon", "circle"],
      table: { defaultValue: { summary: "polygon" } },
    },
    showRadiusAxis: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    legendPosition: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
      table: { defaultValue: { summary: "bottom" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    height: {
      control: { type: "range", min: 200, max: 600, step: 10 },
      table: { defaultValue: { summary: "300" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    subtitle: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    categoryKey: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    format: {
      control: "inline-radio",
      options: ["number", "currency", "percent", "compact"],
      table: { defaultValue: { summary: "" } },
    },
    decimals: {
      control: { type: "range", min: 0, max: 6, step: 1 },
      table: { defaultValue: { summary: "" } },
    },
    currency: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    abbreviate: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Default filled radar chart showing a single student's performance profile across six academic subjects.",
      },
    },
  },
  args: {
    title: "Student Performance Profile",
    subtitle: "Alice — semester 2025.1 scores",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice" }],
    categoryKey: "subject",
    filled: true,
    fillOpacity: 0.18,
    dots: false,
    gridShape: "polygon",
    showRadiusAxis: false,
    height: 300,
    showLegend: false,
    legendPosition: "bottom",
    showTooltip: true,
    loading: false,
    locale: "en-US",
    format: undefined,
    decimals: 0,
    abbreviate: false,
    currency: undefined,
    valueFormatter: (v) => formatValue(v, "integer"),
  },
}

export const Unfilled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Outline-only radar chart with dots at each vertex for a clean, minimal single-series comparison.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Three-series radar chart comparing Alice, Bob, and Carol across six academic subjects with a legend.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Radar chart combining a filled current-level series with an outlined target series for competency gap analysis.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Radar chart with circular grid lines comparing three departments across five capability dimensions.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Radar chart with radial axis tick values enabled, comparing semester 1 and semester 2 scores across subjects.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Two-series radar chart with visible vertex dots for precise value comparison across department capabilities.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Single-series radar chart with a footer showing the top score and average performance across all subjects.",
      },
    },
  },
  args: {
    title: "Student Performance Profile",
    subtitle: "Alice · Semester 2025.1",
    data: studentPerformance,
    dataKeys: [{ key: "alice", label: "Alice", color: "var(--chart-2)" }],
    categoryKey: "subject",
    filled: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "integer"),
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
  parameters: {
    docs: {
      description: {
        story:
          "Radar chart with Portuguese locale displaying a student performance profile in localized number format.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` to replace the radar chart with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the radar chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four radar charts demonstrating all four legend positions with semester comparison data.",
      },
    },
  },
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
