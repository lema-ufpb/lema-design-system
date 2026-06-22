import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlertCircle, TrendingDown } from "lucide-react"
import { BoxPlotChart } from "@/components/ds/boxplot-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/BoxPlotChart",
  component: BoxPlotChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A fully custom SVG box-and-whisker chart with a **`ResizeObserver`** for responsive layout — no recharts dependency.",
          "",
          "Each box encodes five summary statistics: **min**, **Q1**, **median**, **Q3**, and **max**. Enable `showMean` to add a diamond at the mean; enable `showOutliers` to plot individual outlier dots beyond the whisker tips.",
          "",
          "Use `notched` to cut a waist into the box around the median — the notch width represents a 95 % confidence interval, making median comparisons visually immediate.",
          "",
          "Both **vertical** (boxes grow upward, default) and **horizontal** (boxes grow rightward) orientations are supported.",
          "",
          "Hover any box for a detailed five-number summary tooltip.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of box descriptor objects. Each object provides the five-number summary for one box.",
          "",
          "```tsx",
          "const data = [",
          "  {",
          '    name: "Calculus I",',
          "    min: 2, q1: 4.5, median: 6, mean: 5.8, q3: 7.5, max: 10,",
          "    outliers: [0.5, 1],",
          '    color: "var(--chart-1)"',
          "  },",
          "  {",
          '    name: "Physics II",',
          "    min: 1.5, q1: 3, median: 5, q3: 7, max: 9.5",
          "  },",
          "]",
          "```",
          "",
          "#### `BoxPlotItem`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | ✓ | Box label — appears on the category axis and in tooltips |",
          "| `min` | `number` | ✓ | Minimum value (lower whisker tip) |",
          "| `q1` | `number` | ✓ | First quartile (lower box edge) |",
          "| `median` | `number` | ✓ | Median (center line inside the box) |",
          "| `q3` | `number` | ✓ | Third quartile (upper box edge) |",
          "| `max` | `number` | ✓ | Maximum value (upper whisker tip) |",
          "| `mean` | `number` | — | Mean — rendered as a diamond when `showMean` is enabled |",
          "| `outliers` | `number[]` | — | Individual outlier values — plotted beyond whiskers when `showOutliers` is enabled |",
          "| `color` | `string` | — | Any CSS color; defaults to `--chart-N` token |",
          "",
          "> **Type:** `BoxPlotItem[]`",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { BoxPlotChart } from "@/components/ds/boxplot-chart"',
          "",
          "function GradeDistribution() {",
          "  const data = [",
          "    {",
          '      name: "Calculus I",',
          "      min: 2, q1: 4.5, median: 6, q3: 7.5, max: 10",
          "    },",
          "  ]",
          "",
          "  return (",
          "    <BoxPlotChart",
          '      title="Grade Distribution"',
          "      data={data}",
          "      height={300}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "## Color Tokens",
          "",
          "Boxes are filled using `--chart-N` tokens in order, or override per-item via the `color` field.",
          "",
          "| Series | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Grid lines** | `--border` |",
          "| **Axis lines** | `--border` |",
          "| **Axis labels** | `--muted-foreground` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Footer border** | `--border` |",
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `BoxPlotItem[]` | — | (required) Box descriptor data |",
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          '| `orientation` | `BoxPlotOrientation` | `"vertical"` | Box direction |',
          "| `height` | `number` | `320` | Chart height in px |",
          "| `showGrid` | `boolean` | `true` | Show background grid lines |",
          "| `showMean` | `boolean` | `true` | Draw a diamond at the mean value |",
          "| `showOutliers` | `boolean` | `true` | Draw dots for outlier values |",
          "| `notched` | `boolean` | `false` | Notch the box at the median |",
          "| `valueFormatter` | `(value: number) => string` | — | Format value-axis tick labels and tooltip |",
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
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      table: { defaultValue: { summary: "vertical" } },
    },
    showGrid: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showMean: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showOutliers: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    notched: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    height: {
      control: { type: "range", min: 180, max: 600, step: 10 },
      table: { defaultValue: { summary: "320" } },
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
    decimals: {
      control: { type: "number", min: 0, max: 6 },
      table: { defaultValue: { summary: "0" } },
    },
    abbreviate: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    data: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof BoxPlotChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

// Final exam grade distribution per class group
const gradesByClass = [
  {
    name: "Class A",
    min: 42,
    q1: 62,
    median: 74,
    mean: 73.2,
    q3: 84,
    max: 97,
    outliers: [22, 18],
  },
  {
    name: "Class B",
    min: 38,
    q1: 58,
    median: 70,
    mean: 69.8,
    q3: 80,
    max: 95,
    outliers: [15],
  },
  {
    name: "Class C",
    min: 55,
    q1: 72,
    median: 82,
    mean: 81.4,
    q3: 90,
    max: 100,
  },
  {
    name: "Class D",
    min: 30,
    q1: 50,
    median: 63,
    mean: 62.1,
    q3: 76,
    max: 92,
    outliers: [12, 8],
  },
]

// Score distribution per subject — good for horizontal orientation
const gradesBySubject = [
  {
    name: "Calculus",
    min: 28,
    q1: 52,
    median: 66,
    mean: 65.0,
    q3: 80,
    max: 96,
    outliers: [10, 14],
  },
  {
    name: "Physics",
    min: 35,
    q1: 58,
    median: 72,
    mean: 70.8,
    q3: 84,
    max: 98,
  },
  {
    name: "Chemistry",
    min: 30,
    q1: 55,
    median: 68,
    mean: 67.4,
    q3: 82,
    max: 95,
    outliers: [8],
  },
  {
    name: "Portuguese",
    min: 48,
    q1: 68,
    median: 79,
    mean: 78.6,
    q3: 89,
    max: 100,
  },
  {
    name: "History",
    min: 40,
    q1: 62,
    median: 74,
    mean: 72.9,
    q3: 86,
    max: 97,
    outliers: [18],
  },
]

// Study hours per week — comparing two semesters
const studyHoursBySemester = [
  {
    name: "2024.1",
    min: 2,
    q1: 5,
    median: 9,
    mean: 9.4,
    q3: 13,
    max: 22,
    outliers: [28, 30],
    color: "var(--chart-1)",
  },
  {
    name: "2024.2",
    min: 3,
    q1: 6,
    median: 10,
    mean: 10.2,
    q3: 14,
    max: 24,
    color: "var(--chart-2)",
  },
  {
    name: "2025.1",
    min: 4,
    q1: 7,
    median: 12,
    mean: 11.8,
    q3: 16,
    max: 26,
    outliers: [32],
    color: "var(--chart-3)",
  },
]

// Response-time distribution across API endpoints (ms)
const responseTimes = [
  {
    name: "/login",
    min: 38,
    q1: 62,
    median: 82,
    mean: 88,
    q3: 110,
    max: 210,
    outliers: [380, 420, 520],
    color: "var(--chart-1)",
  },
  {
    name: "/dashboard",
    min: 95,
    q1: 140,
    median: 180,
    mean: 195,
    q3: 240,
    max: 460,
    outliers: [720, 850],
    color: "var(--chart-2)",
  },
  {
    name: "/reports",
    min: 210,
    q1: 380,
    median: 510,
    mean: 540,
    q3: 680,
    max: 980,
    outliers: [1400, 1650],
    color: "var(--chart-3)",
  },
  {
    name: "/export",
    min: 450,
    q1: 720,
    median: 940,
    mean: 980,
    q3: 1200,
    max: 1800,
    color: "var(--chart-4)",
  },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default vertical box plot showing grade distribution across four class groups with mean diamonds and outlier dots.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — by Class Group",
    subtitle: "Hover a box for the five-number summary",
    data: gradesByClass,
    orientation: "vertical",
    showGrid: true,
    showMean: true,
    showOutliers: true,
    notched: false,
    decimals: 0,
    abbreviate: false,
    loading: false,
    locale: "en-US",
    height: 320,
  },
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal box plots comparing grade distribution by subject, ideal for long category labels that benefit from horizontal layout.",
      },
    },
  },
  args: {
    title: "Grade Distribution by Subject",
    subtitle: "Horizontal orientation — easier to read long category labels",
    data: gradesBySubject,
    orientation: "horizontal",
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 340,
  },
}

export const Notched: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Notched box plots where the waist width represents a 95% confidence interval around the median for significance comparison.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — Notched Boxes",
    subtitle:
      "Notch width ≈ 95% CI around the median — non-overlapping notches → significant difference",
    data: gradesByClass,
    notched: true,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 340,
  },
}

export const SemesterComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Box plots tracking weekly study hours distribution across three semesters with a custom hours value formatter.",
      },
    },
  },
  args: {
    title: "Weekly Study Hours — Semester Trend",
    subtitle:
      "Distribution shifts rightward — students studying more over time",
    data: studyHoursBySemester,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 320,
    valueFormatter: (v) => formatValue(v, "integer") + "h",
  },
}

export const ApiResponseTime: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "API response time box plot showing latency distribution across endpoints with outliers flagged and a footer warning about SLA violations.",
      },
    },
  },
  args: {
    title: "API Response Time Distribution",
    subtitle: "P50 box · whiskers = min/max · circles = outliers",
    data: responseTimes,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 340,
    valueFormatter: (v) => formatValue(v, "integer") + "ms",
    footer: (
      <span className="flex items-center gap-1.5">
        <AlertCircle className="size-3.5 text-amber-500" />
        /reports and /export endpoints exceed SLA — investigate caching
      </span>
    ),
  },
}

export const NoMeanNoOutliers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Minimal horizontal box plot with mean diamonds and outlier dots disabled, showing only the clean five-number summary.",
      },
    },
  },
  args: {
    title: "Grade Distribution — Minimal View",
    subtitle:
      "showMean=false · showOutliers=false · clean five-number summary only",
    data: gradesBySubject,
    orientation: "horizontal",
    showGrid: true,
    showMean: false,
    showOutliers: false,
    height: 320,
  },
}

export const NotchedHorizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Notched box plots in horizontal orientation combining confidence-interval visualization with publication-style layout.",
      },
    },
  },
  args: {
    title: "Grade Distribution by Subject — Notched Horizontal",
    subtitle:
      "Combining notched and horizontal for publication-style comparison",
    data: gradesBySubject,
    orientation: "horizontal",
    notched: true,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 360,
  },
}

export const LocalePTBR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Box plot chart with Portuguese locale displaying exam grades by class group with localized number formatting.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — by Class Group",
    subtitle: "Hover over a box to see the summary",
    data: gradesByClass,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 320,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof BoxPlotChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <BoxPlotChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the box plot with an animated skeleton layout that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — by Class Group",
    subtitle: "Hover a box for the five-number summary",
    data: gradesByClass,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 320,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the chart renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — by Class Group",
    subtitle: "Hover a box for the five-number summary",
    data: [],
    height: 320,
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Box plot chart with a custom footer highlighting Class D's low median and prompting intervention analysis.",
      },
    },
  },
  args: {
    title: "Final Exam Grades — by Class Group",
    subtitle: "Semester 2025.1 · 4 class groups",
    data: gradesByClass,
    showGrid: true,
    showMean: true,
    showOutliers: true,
    height: 320,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingDown className="size-3.5 text-destructive" />
          Class D median (63) significantly below others — intervention needed
        </span>
        <span className="text-muted-foreground/70">n = 120 students</span>
      </div>
    ),
  },
}
