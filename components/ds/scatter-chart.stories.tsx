import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlertCircle, TrendingUp, Users } from "lucide-react"
import { ScatterChart } from "@/components/ds/scatter-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive scatter (and bubble) chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Maps two continuous variables on X and Y axes to reveal correlations, clusters, and outliers. Add a **z** value to any point to enable bubble mode — dot area then encodes a third dimension.",
          "",
          "Enable `showTrendLine` to draw a dashed **linear regression line** through each series, making correlation direction and strength immediately visible.",
          "",
          "Each series is an independent `{ name, data, color?, shape? }` object. Multi-series charts support legend toggle: click a legend item to hide or show that series.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `series`",
          "",
          "An array of series objects. Each series has a `name`, an array of `{ x, y, z? }` points, and optional styling.",
          "",
          "```tsx",
          "const series = [",
          "  {",
          '    name: "Computer Science",',
          "    data: [",
          "      { x: 6, y: 8.8 },",
          "      { x: 8, y: 7.2 },",
          "    ],",
          '    color: "var(--chart-1)"',
          "  },",
          "  {",
          '    name: "Engineering",',
          "    data: [",
          "      { x: 5, y: 7.1 },",
          "    ],",
          "  },",
          "]",
          "```",
          "",
          "#### `ScatterSeries`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | ✓ | Series name — appears in legend and tooltip |",
          "| `data` | `ScatterPoint[]` | ✓ | Array of data points |",
          "| `color` | `string` | — | Any CSS color; defaults to `--chart-N` token |",
          '| `shape` | `"circle" \\| "cross" \\| "diamond" \\| "square" \\| "star" \\| "triangle" \\| "wye"` | — | Dot shape; defaults to `"circle"` |',
          "",
          "#### `ScatterPoint`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `x` | `number` | ✓ | Value on the X axis |",
          "| `y` | `number` | ✓ | Value on the Y axis |",
          "| `z` | `number` | — | Bubble size — when set, dot area encodes this third dimension |",
          "",
          "> **Type:** `ScatterSeries[]`",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { ScatterChart } from "@/components/ds/scatter-chart"',
          "",
          "function CorrelationChart() {",
          "  const series = [",
          "    {",
          '      name: "Department A",',
          "      data: [",
          "        { x: 6, y: 8.8 },",
          "      ],",
          "    },",
          "  ]",
          "",
          "  return (",
          "    <ScatterChart",
          '      title="GPA × Semester"',
          "      series={series}",
          '      xLabel="Semester"',
          '      yLabel="GPA"',
          "      height={300}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "## Color Tokens",
          "",
          "Series are colored in order using `--chart-1` → `--chart-5`. Override any series via the `color` field, or redefine the tokens in `globals.css` to retheme all charts at once.",
          "",
          "| Series | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `ScatterSeries` — for example `var(--primary)` or `var(--destructive)`.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Grid lines** | `--border` |",
          "| **Axis lines & labels** | `--border` / `--muted-foreground` |",
          "| **Cursor crosshair** | `--border` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Legend labels** | `--muted-foreground` |",
          "| **Footer border** | `--border` |",
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `series` | `ScatterSeries[]` | — | (required) Series data |",
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          "| `height` | `number` | `320` | Chart height in px |",
          "| `showGrid` | `boolean` | `true` | Show background grid lines |",
          "| `showLegend` | `boolean` | `false` | Show legend |",
          '| `legendPosition` | `LegendPosition` | `"bottom"` | Legend position |',
          "| `showTooltip` | `boolean` | `true` | Show tooltip on hover |",
          "| `showTrendLine` | `boolean` | `false` | Draw linear-regression line through each series |",
          "| `xLabel` | `string` | — | Label below the X axis |",
          "| `yLabel` | `string` | — | Label beside the Y axis |",
          "| `xFormatter` | `(value: number) => string` | — | Format X axis values |",
          "| `yFormatter` | `(value: number) => string` | — | Format Y axis values |",
          "| `valueFormatter` | `(value: number) => string` | — | Unified value formatter |",
          "| `bubbleRange` | `[number, number]` | `[40, 400]` | Point size range for z dimension |",
          "| `showBrush` | `boolean` | `false` | Range brush for panning and zooming |",
          "| `format` | `FormatPreset` | — | Format preset |",
          "| `decimals` | `number` | — | Decimal places |",
          "| `currency` | `string` | — | Currency symbol |",
          "| `abbreviate` | `boolean` | — | Abbreviate large numbers |",
          "| `loading` | `boolean` | `false` | Animated skeleton while data loads |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    showGrid: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showBrush: {
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
    showTrendLine: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    height: {
      control: { type: "range", min: 160, max: 600, step: 10 },
      table: { defaultValue: { summary: "320" } },
    },
    xLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    yLabel: {
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
    series: { table: { disable: true } },
    footer: { table: { disable: true } },
    xFormatter: { table: { disable: true } },
    yFormatter: { table: { disable: true } },
    bubbleRange: { table: { disable: true } },
  },
} satisfies Meta<typeof ScatterChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

// Study hours (x) vs. final grade (y) — 20 students
const studyVsGrade = [
  { x: 2, y: 52 },
  { x: 3, y: 61 },
  { x: 4, y: 58 },
  { x: 5, y: 67 },
  { x: 6, y: 72 },
  { x: 6, y: 69 },
  { x: 7, y: 74 },
  { x: 8, y: 78 },
  { x: 8, y: 83 },
  { x: 9, y: 80 },
  { x: 10, y: 85 },
  { x: 10, y: 88 },
  { x: 11, y: 84 },
  { x: 12, y: 91 },
  { x: 12, y: 87 },
  { x: 13, y: 93 },
  { x: 14, y: 90 },
  { x: 15, y: 94 },
  { x: 16, y: 97 },
  { x: 3, y: 45 },
]

// Same chart split by gender
const studyVsGradeMale = [
  { x: 3, y: 55 },
  { x: 5, y: 62 },
  { x: 6, y: 70 },
  { x: 7, y: 73 },
  { x: 8, y: 76 },
  { x: 9, y: 79 },
  { x: 10, y: 83 },
  { x: 11, y: 82 },
  { x: 12, y: 88 },
  { x: 14, y: 91 },
]

const studyVsGradeFemale = [
  { x: 2, y: 58 },
  { x: 4, y: 65 },
  { x: 6, y: 72 },
  { x: 8, y: 81 },
  { x: 9, y: 84 },
  { x: 10, y: 88 },
  { x: 12, y: 93 },
  { x: 13, y: 90 },
  { x: 15, y: 96 },
  { x: 16, y: 98 },
]

// Attendance (x) vs. approval rate (y) — by class group
const attendanceVsApproval = [
  { x: 55, y: 42 },
  { x: 62, y: 51 },
  { x: 68, y: 58 },
  { x: 70, y: 62 },
  { x: 74, y: 69 },
  { x: 76, y: 71 },
  { x: 80, y: 75 },
  { x: 82, y: 79 },
  { x: 85, y: 82 },
  { x: 87, y: 84 },
  { x: 90, y: 89 },
  { x: 92, y: 91 },
  { x: 94, y: 93 },
  { x: 96, y: 95 },
  { x: 98, y: 97 },
]

// Three departments: x = research output, y = teaching score, z = faculty count (bubble)
const engineering = [
  { x: 88, y: 78, z: 320 },
  { x: 92, y: 82, z: 410 },
  { x: 76, y: 90, z: 210 },
  { x: 95, y: 74, z: 540 },
  { x: 80, y: 85, z: 280 },
]
const healthSciences = [
  { x: 90, y: 92, z: 480 },
  { x: 84, y: 88, z: 360 },
  { x: 96, y: 94, z: 620 },
  { x: 78, y: 86, z: 190 },
  { x: 88, y: 90, z: 410 },
]
const humanities = [
  { x: 62, y: 94, z: 150 },
  { x: 70, y: 88, z: 210 },
  { x: 58, y: 96, z: 120 },
  { x: 74, y: 90, z: 180 },
  { x: 66, y: 92, z: 160 },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default scatter plot of study hours versus final grade with each dot representing one student and axis labels.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle: "Each dot represents one student — semester 2025.1",
    series: [{ name: "Students", data: studyVsGrade }],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    height: 320,
    showGrid: true,
    showLegend: false,
    legendPosition: "bottom",
    showTooltip: true,
    showTrendLine: false,
    bubbleRange: [40, 400],
    showBrush: false,
    loading: false,
    locale: "en-US",
    format: undefined,
    decimals: 0,
    abbreviate: false,
    currency: undefined,
  },
}

export const WithTrendLine: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot with a dashed linear regression line revealing a strong positive correlation between study hours and grades.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle:
      "Dashed line shows linear regression — strong positive correlation",
    series: [{ name: "Students", data: studyVsGrade }],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showTooltip: true,
    showTrendLine: true,
    height: 320,
  },
}

export const MultiSeries: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Two-series scatter plot comparing male and female study patterns with separate trend lines and an interactive legend.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Grade — by Gender",
    subtitle: "Click a legend item to hide or show a series",
    series: [
      { name: "Male", data: studyVsGradeMale },
      { name: "Female", data: studyVsGradeFemale },
    ],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showTrendLine: true,
    height: 340,
  },
}

export const AttendanceVsApproval: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot showing the positive correlation between attendance rate and approval rate with percentage axis formatters.",
      },
    },
  },
  args: {
    title: "Attendance Rate vs. Approval Rate",
    subtitle: "Class groups — each dot is a course section",
    series: [
      {
        name: "Course sections",
        data: attendanceVsApproval,
        color: "var(--chart-3)",
      },
    ],
    xLabel: "Attendance (%)",
    yLabel: "Approval rate (%)",
    showGrid: true,
    showTooltip: true,
    showTrendLine: true,
    xFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
    yFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
    height: 320,
  },
}

export const BubbleChart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bubble chart encoding faculty count as bubble area for three schools compared by research output and teaching score.",
      },
    },
  },
  args: {
    title: "Research Output vs. Teaching Score",
    subtitle: "Bubble size = faculty count · 3 schools compared",
    series: [
      { name: "Engineering", data: engineering },
      { name: "Health Sciences", data: healthSciences },
      { name: "Humanities", data: humanities },
    ],
    xLabel: "Research output",
    yLabel: "Teaching score",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    bubbleRange: [60, 600],
    height: 360,
  },
}

export const CustomShapes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four scatter plots demonstrating circle, diamond, triangle, and square point marker shapes with custom colors.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(
        [
          { shape: "circle", color: "var(--chart-1)" },
          { shape: "diamond", color: "var(--chart-2)" },
          { shape: "triangle", color: "var(--chart-3)" },
          { shape: "square", color: "var(--chart-4)" },
        ] as const
      ).map(({ shape, color }) => (
        <ScatterChart
          key={shape}
          title={`shape="${shape}"`}
          series={[{ name: "Students", data: studyVsGrade, color, shape }]}
          showGrid
          showTooltip
          height={220}
        />
      ))}
    </div>
  ),
  args: { series: [{ name: "Students", data: studyVsGrade }] },
}

export const LegendPositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four scatter plots placing the legend at top, right, bottom, and left for series identification.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <ScatterChart
          key={pos}
          title={`legendPosition="${pos}"`}
          series={[
            { name: "Male", data: studyVsGradeMale },
            { name: "Female", data: studyVsGradeFemale },
          ]}
          showGrid
          showLegend
          legendPosition={pos}
          showTooltip
          height={240}
        />
      ))}
    </div>
  ),
  args: { series: [{ name: "Male", data: studyVsGradeMale }] },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Two-series scatter plot with trend lines and a footer showing the correlation coefficient and sample size.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle: "Semester 2025.1 — 20 students sampled",
    series: [
      { name: "Male", data: studyVsGradeMale },
      { name: "Female", data: studyVsGradeFemale },
    ],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showTrendLine: true,
    height: 340,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-success" />
          Strong positive correlation (r ≈ 0.91)
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <Users className="size-3" />
          20 students · CS-101
        </span>
      </div>
    ),
  },
}

// Dense dataset spanning a wide X range — makes the brush genuinely useful
const absenceVsGrade = Array.from({ length: 80 }, (_, i) => ({
  x: Math.round(i * 1.8 + Math.random() * 8), // absences 0–150
  y: Math.round(Math.max(20, 100 - i * 0.65 + (Math.random() * 20 - 10))), // grade 20–100
}))

// Split at absence midpoint to create two clusters
const lowAbsence = absenceVsGrade.filter((p) => p.x <= 75)
const highAbsence = absenceVsGrade.filter((p) => p.x > 75)

export const WithBrush: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot with a brush slider for interactive zoom on an 80-student absence versus grade dataset with trend line.",
      },
    },
  },
  args: {
    title: "Absences vs. Final Grade",
    subtitle:
      "80 students — drag the handles below to zoom in on an absence range",
    series: [
      { name: "Students", data: absenceVsGrade, color: "var(--chart-1)" },
    ],
    xLabel: "Absences",
    yLabel: "Final grade",
    showGrid: true,
    showTooltip: true,
    showTrendLine: true,
    showBrush: true,
    height: 320,
  },
}

export const WithBrushMultiSeries: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Two-series scatter plot with brush showing low-absence versus high-absence student clusters with separate trend lines.",
      },
    },
  },
  args: {
    title: "Absences vs. Grade — Low vs. High Absenteeism",
    subtitle:
      "Drag handles to compare ranges · drag the bar between them to pan",
    series: [
      { name: "≤ 75 absences", data: lowAbsence, color: "var(--chart-2)" },
      { name: "> 75 absences", data: highAbsence, color: "var(--destructive)" },
    ],
    xLabel: "Absences",
    yLabel: "Final grade",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showTrendLine: true,
    showBrush: true,
    height: 340,
  },
}

export const LocalePTBR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot with Portuguese locale displaying study hours versus final grade in localized number format.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle: "Each dot represents one student — semester 2025.1",
    series: [{ name: "Students", data: studyVsGrade }],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showTooltip: true,
    height: 320,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof ScatterChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <ScatterChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the scatter chart with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle: "Each dot represents one student — semester 2025.1",
    series: [{ name: "Students", data: studyVsGrade }],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showTooltip: true,
    height: 320,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `series` is an empty array, the scatter chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Study Hours vs. Final Grade",
    subtitle: "Each dot represents one student",
    series: [],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    height: 320,
  },
}

export const OutlierDetection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scatter plot with deliberate outlier points added and flagged in the footer, demonstrating trend-line-based outlier detection.",
      },
    },
  },
  args: {
    title: "Outlier Detection — Study vs. Grade",
    subtitle: "Trend line makes outliers (low study, high grade) easy to spot",
    series: [
      {
        name: "Students",
        data: [
          ...studyVsGrade,
          // deliberate outliers
          { x: 2, y: 90 },
          { x: 14, y: 48 },
        ],
        color: "var(--chart-1)",
      },
    ],
    xLabel: "Hours / week",
    yLabel: "Final grade",
    showGrid: true,
    showTooltip: true,
    showTrendLine: true,
    height: 340,
    footer: (
      <span className="flex items-center gap-1.5">
        <AlertCircle className="size-3.5 text-warning" />
        Two outliers added manually — points far from the trend line warrant
        review
      </span>
    ),
  },
}
