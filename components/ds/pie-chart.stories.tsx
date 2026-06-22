import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BookOpen, GraduationCap, Users } from "lucide-react"
import { PieChart } from "@/components/ds/pie-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive pie and donut chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "The **donut variant** features an interactive center label: at rest it shows the total value; hover any slice to see that slice's value, name, and percentage — no tooltip required.",
          "",
          "Pass `data` as `{ label, value, color? }` objects. The `color` field is optional — omitting it assigns the next `--chart-N` token automatically.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of slice descriptor objects. Each object represents one slice of the pie.",
          "",
          "```tsx",
          "const data = [",
          '  { label: "Engineering", value: 320, color: "var(--chart-1)" },',
          '  { label: "Medicine",    value: 180 },',
          '  { label: "Law",         value: 240 },',
          "]",
          "```",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | ✓ | Slice name — appears in legend, tooltip, and outer labels |",
          "| `value` | `number` | ✓ | Numeric value — determines the slice arc length |",
          "| `color` | `string` | — | Any CSS color; defaults to the next `--chart-N` token |",
          "",
          "> **Type:** `PieChartItem[]`",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { PieChart } from "@/components/ds/pie-chart"',
          "",
          "function DistributionChart() {",
          "  const data = [",
          '    { label: "Active",  value: 285 },',
          '    { label: "Inactive", value: 120 },',
          "  ]",
          "",
          "  return (",
          "    <PieChart",
          '      title="Student Distribution"',
          "      data={data}",
          '      variant="donut"',
          "      height={300}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "## Color Tokens",
          "",
          "Slices are colored in order using `--chart-1` → `--chart-5`. Override any slice individually via the `color` field, or redefine the tokens in `globals.css` to retheme all charts at once.",
          "",
          "| Slice order | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `PieChartItem` — for example `var(--primary)`, `var(--destructive)`, or a raw `oklch(...)` value.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Slice separator** | `--card` (stroke between slices) |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Legend labels** | `--muted-foreground` |",
          "| **Center value** | `--foreground` |",
          "| **Center label / percent** | `--muted-foreground` |",
          "| **Outer label line** | `--muted-foreground` |",
          "| **Footer border** | `--border` |",
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `PieChartItem[]` | — | (required) Slice data |",
          '| `variant` | `PieChartVariant` | `"pie"` | Chart variant |',
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          "| `height` | `number` | `280` | Chart height in px |",
          "| `showLegend` | `boolean` | `true` | Show legend |",
          '| `legendPosition` | `LegendPosition` | `"bottom"` | Legend position |',
          "| `showTooltip` | `boolean` | `true` | Show tooltip on hover |",
          "| `showLabels` | `boolean` | `false` | Show percentage labels outside slices |",
          "| `innerLabel` | `string` | — | Center label text (donut only) |",
          "| `paddingAngle` | `number` | `0` | Gap between slices in degrees |",
          "| `valueFormatter` | `(value: number) => string` | — | Format slice values |",
          "| `format` | `FormatPreset` | — | Format preset |",
          "| `decimals` | `number` | — | Decimal places |",
          "| `currency` | `string` | — | Currency symbol |",
          "| `abbreviate` | `boolean` | — | Abbreviate large numbers |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
          "| `loading` | `boolean` | `false` | Animated skeleton while data loads |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["pie", "donut"],
      table: { defaultValue: { summary: "pie" } },
    },
    legendPosition: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
      table: { defaultValue: { summary: "bottom" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showLabels: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    paddingAngle: {
      control: { type: "range", min: 0, max: 8, step: 1 },
      table: { defaultValue: { summary: "0" } },
    },
    height: {
      control: { type: "range", min: 160, max: 500, step: 10 },
      table: { defaultValue: { summary: "280" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    innerLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Locale used for formatting numbers and percentages.",
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
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof PieChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const enrollmentByProgram = [
  { label: "Undergraduate", value: 4820 },
  { label: "Graduate", value: 1340 },
  { label: "Distance Learning", value: 960 },
  { label: "Extension", value: 420 },
]

const budgetAllocation = [
  { label: "Personnel", value: 58 },
  { label: "Infrastructure", value: 19 },
  { label: "Research", value: 12 },
  { label: "Teaching Materials", value: 7 },
  { label: "Administration", value: 4 },
]

const absencesByReason = [
  { label: "Health", value: 340 },
  { label: "Personal", value: 215 },
  { label: "Transport", value: 178 },
  { label: "Unnotified", value: 92 },
]

const completionRate = [
  { label: "Completed", value: 74, color: "var(--chart-2)" },
  { label: "In Progress", value: 18, color: "var(--chart-3)" },
  { label: "Dropped", value: 8, color: "var(--destructive)" },
]

const formatStudents = (v: number) => formatValue(v, "integer")
const formatPct = (v: number) => formatValue(v, "float", { decimals: 0 }) + "%"

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Standard pie chart showing enrollment distribution across four program types with legend and tooltip.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Semester 2025.1 — 7,540 students total",
    data: enrollmentByProgram,
    variant: "pie",
    height: 280,
    showLegend: true,
    legendPosition: "bottom",
    showTooltip: true,
    showLabels: false,
    paddingAngle: 0,
    loading: false,
    locale: "en-US",
    format: undefined,
    decimals: 0,
    abbreviate: false,
    currency: undefined,
    valueFormatter: formatStudents,
  },
}

export const Donut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with an interactive center label showing the total student count; hover a slice to see its breakdown.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Hover a slice to see its breakdown in the center",
    data: enrollmentByProgram,
    variant: "donut",
    showLegend: true,
    showTooltip: false,
    innerLabel: "Students",
    valueFormatter: formatStudents,
  },
}

export const DonutBudget: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart showing budget allocation percentages with a Budget center label and percentage value formatter.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Fiscal year 2025 — percentage of total",
    data: budgetAllocation,
    variant: "donut",
    showLegend: true,
    showTooltip: false,
    innerLabel: "Budget",
    valueFormatter: formatPct,
    height: 300,
  },
}

export const WithSliceLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pie chart with percentage labels rendered outside each slice showing the breakdown of absence reasons.",
      },
    },
  },
  args: {
    title: "Absences by Reason",
    subtitle: "Labels show percentage per category",
    data: absencesByReason,
    variant: "pie",
    showLegend: true,
    showTooltip: true,
    showLabels: true,
    height: 300,
  },
}

export const DonutWithLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart combining a center label with outer slice labels for a comprehensive absence reason breakdown.",
      },
    },
  },
  args: {
    title: "Absences by Reason",
    subtitle: "Donut + outer labels — both at once",
    data: absencesByReason,
    variant: "donut",
    showLegend: false,
    showTooltip: true,
    showLabels: true,
    innerLabel: "Absences",
    height: 300,
  },
}

export const PaddedSlices: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with `paddingAngle={4}` creating visible gaps between enrollment program slices for visual separation.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "paddingAngle={4} — visible gap between slices",
    data: enrollmentByProgram,
    variant: "donut",
    paddingAngle: 4,
    showLegend: true,
    showTooltip: true,
    innerLabel: "Students",
    valueFormatter: formatStudents,
  },
}

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart using semantic color tokens for completed, in-progress, and dropped course status with padding between slices.",
      },
    },
  },
  args: {
    title: "Course Completion Rate",
    subtitle:
      "Semantic tokens: var(--chart-2), var(--chart-3), var(--destructive)",
    data: completionRate,
    variant: "donut",
    showLegend: true,
    showTooltip: true,
    innerLabel: "Students",
    valueFormatter: formatPct,
    paddingAngle: 3,
  },
}

export const NoLegend: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pie chart relying solely on tooltips for slice identification, with the legend hidden for a cleaner presentation.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Tooltip only — no legend",
    data: budgetAllocation,
    variant: "pie",
    showLegend: false,
    showTooltip: true,
    height: 300,
  },
}

export const WithLocale: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pie chart using Portuguese locale to format percentage values with a comma as the decimal separator and outer labels.",
      },
    },
  },
  args: {
    title: "Budget (BR Locale)",
    subtitle: "locale='pt-BR' formats percentages with a comma",
    data: budgetAllocation,
    variant: "pie",
    showLegend: true,
    showTooltip: true,
    showLabels: true,
    locale: "pt-BR",
    height: 300,
  },
}

export const LegendPositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four donut charts placing the legend at top, right, bottom, and left positions for comparison.",
      },
    },
  },
  args: { data: enrollmentByProgram },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <PieChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={enrollmentByProgram}
          variant="donut"
          showLegend
          legendPosition={pos}
          showTooltip={false}
          innerLabel="Students"
          valueFormatter={formatStudents}
          height={300}
        />
      ))}
    </div>
  ),
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof PieChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <PieChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the pie chart with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Semester 2025.1 — 7,540 students total",
    data: enrollmentByProgram,
    variant: "pie",
    showLegend: true,
    showTooltip: true,
    valueFormatter: formatStudents,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the pie chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Semester 2025.1",
    data: [],
    variant: "pie",
    height: 280,
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with a footer showing total enrollment count, number of courses, and an update timestamp.",
      },
    },
  },
  args: {
    title: "Enrollment by Program",
    subtitle: "Semester 2025.1",
    data: enrollmentByProgram,
    variant: "donut",
    showLegend: true,
    showTooltip: false,
    innerLabel: "Students",
    valueFormatter: formatStudents,
    footer: (
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-3.5 text-muted-foreground" />
            <span>7,540 enrolled</span>
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-muted-foreground" />
            <span>48 courses</span>
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <Users className="size-3" />
          Updated today
        </span>
      </div>
    ),
  },
}
