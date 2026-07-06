import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BookOpen, GraduationCap, TrendingUp, Users } from "lucide-react"
import { TreeMapChart } from "@/components/ds/treemap-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/TreeMapChart",
  component: TreeMapChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive treemap chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Visualizes hierarchical or proportional data as nested rectangles — area encodes the numeric value. Best for part-to-whole comparisons across many categories.",
          "",
          "Supports flat and multi-level data. For hierarchical data, clicking a cell **drills down** into its children and a breadcrumb trail lets you navigate back.",
          "",
          "Pass `data` as `{ name, value, color?, children? }` items. The `color` field is optional — omitting it assigns the next `--chart-N` token automatically. Child nodes inherit their parent's color unless overridden.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of rectangle descriptor items. Supports flat and recursive (nested) structures for drill-down.",
          "",
          "```tsx",
          "// Flat data — each item is a leaf rectangle",
          "const data = [",
          '  { name: "Engineering", value: 320, color: "var(--chart-1)" },',
          '  { name: "Medicine",    value: 180 },',
          "]",
          "",
          "// Hierarchical data — items with children enable drill-down",
          "const data = [",
          "  {",
          '    name: "Exact Sciences",',
          "    children: [",
          '      { name: "Engineering", value: 320 },',
          '      { name: "Physics",     value: 145 },',
          "    ],",
          "  },",
          "]",
          "```",
          "",
          "#### `TreeMapItem`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | ✓ | Item name — displayed as a label inside the cell |",
          "| `value` | `number` | — | Numeric value — determines the cell area; required for leaf nodes |",
          "| `color` | `string` | — | Any CSS color; defaults to `--chart-N` token; children inherit parent's color |",
          "| `children` | `TreeMapItem[]` | — | Nested items — when set, clicking the cell drills down one level |",
          "",
          "> **Type:** `TreeMapItem[]`  •  Supports infinite nesting via `children`",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { TreeMapChart } from "@/components/ds/treemap-chart"',
          "",
          "function BudgetTree() {",
          "  const data = [",
          '    { name: "R&D",     value: 240000 },',
          '    { name: "Ops",     value: 180000 },',
          '    { name: "Marketing", value: 96000 },',
          "  ]",
          "",
          "  return (",
          "    <TreeMapChart",
          '      title="Budget Allocation"',
          "      data={data}",
          "      height={400}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "## Color Tokens",
          "",
          "Root nodes are colored in order using `--chart-1` → `--chart-5`. Override any item individually via the `color` field, or redefine the tokens in `globals.css` to retheme all charts at once.",
          "",
          "| Item order | CSS Variable | Override in `globals.css` |",
          "| --- | --- | --- |",
          "| **1st** | `--chart-1` | `--chart-1: oklch(...)` |",
          "| **2nd** | `--chart-2` | `--chart-2: oklch(...)` |",
          "| **3rd** | `--chart-3` | `--chart-3: oklch(...)` |",
          "| **4th** | `--chart-4` | `--chart-4: oklch(...)` |",
          "| **5th** | `--chart-5` | `--chart-5: oklch(...)` |",
          "",
          "You can also pass any CSS value to `color` on a `TreeMapItem` — for example `var(--primary)` or `var(--destructive)`.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Cell separator** | `--card` (stroke between cells) |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Breadcrumb text** | `--muted-foreground` |",
          "| **Breadcrumb hover** | `--accent` / `--accent-foreground` |",
          "| **Footer border** | `--border` |",
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `TreeMapItem[]` | — | (required) Rectangle data |",
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          "| `height` | `number` | `360` | Chart height in px |",
          "| `aspectRatio` | `number` | `4 / 3` | Container aspect ratio |",
          "| `showLabels` | `boolean` | `true` | Show name and value labels inside cells |",
          "| `showTooltip` | `boolean` | `true` | Show tooltip on hover |",
          "| `valueFormatter` | `(value: number) => string` | — | Format numeric values |",
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
    showLabels: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    height: {
      control: { type: "range", min: 160, max: 600, step: 10 },
      table: { defaultValue: { summary: "360" } },
    },
    aspectRatio: {
      control: { type: "range", min: 0.5, max: 4, step: 0.1 },
      table: { defaultValue: { summary: "1.33" } },
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
    data: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof TreeMapChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

const budgetAllocation = [
  { name: "Personnel", value: 58 },
  { name: "Infrastructure", value: 19 },
  { name: "Research", value: 12 },
  { name: "Teaching Materials", value: 7 },
  { name: "Administration", value: 4 },
]

const enrollmentBySchool = [
  {
    name: "Engineering",
    value: 3200,
    children: [
      { name: "Computer Science", value: 980 },
      { name: "Electrical", value: 720 },
      { name: "Mechanical", value: 640 },
      { name: "Civil", value: 860 },
    ],
  },
  {
    name: "Health Sciences",
    value: 2640,
    children: [
      { name: "Medicine", value: 1100 },
      { name: "Nursing", value: 680 },
      { name: "Pharmacy", value: 480 },
      { name: "Nutrition", value: 380 },
    ],
  },
  {
    name: "Humanities",
    value: 1840,
    children: [
      { name: "Law", value: 720 },
      { name: "History", value: 440 },
      { name: "Geography", value: 360 },
      { name: "Education", value: 320 },
    ],
  },
  {
    name: "Exact Sciences",
    value: 1280,
    children: [
      { name: "Mathematics", value: 420 },
      { name: "Physics", value: 340 },
      { name: "Chemistry", value: 300 },
      { name: "Statistics", value: 220 },
    ],
  },
  {
    name: "Arts & Design",
    value: 780,
    children: [
      { name: "Architecture", value: 320 },
      { name: "Fine Arts", value: 260 },
      { name: "Music", value: 200 },
    ],
  },
]

const performanceByDept = [
  { name: "Approved", value: 74, color: "var(--chart-2)" },
  { name: "Recovering", value: 18, color: "var(--chart-3)" },
  { name: "Failing", value: 8, color: "var(--destructive)" },
]

const researchOutput = [
  { name: "Articles", value: 312 },
  { name: "Dissertations", value: 84 },
  { name: "Patents", value: 23 },
  { name: "Books", value: 41 },
  { name: "Conferences", value: 198 },
  { name: "Reports", value: 67 },
  { name: "Posters", value: 55 },
]

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Flat treemap showing budget allocation percentages across five spending categories with labels and tooltips.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Fiscal year 2025 — percentage of total",
    data: budgetAllocation,
    height: 360,
    aspectRatio: 4 / 3,
    showLabels: true,
    showTooltip: true,
    loading: false,
    locale: "en-US",
    format: undefined,
    decimals: 0,
    abbreviate: false,
    currency: undefined,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const Hierarchical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multi-level treemap of enrollment by school with click-to-explore drill-down into individual programs.",
      },
    },
  },
  args: {
    title: "Enrollment by School",
    subtitle: "Click any school to explore its programs",
    data: enrollmentBySchool,
    showLabels: true,
    showTooltip: true,
    height: 420,
    valueFormatter: (v) => formatValue(v, "integer"),
  },
}

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Treemap using semantic color tokens for approved, recovering, and failing student status categories.",
      },
    },
  },
  args: {
    title: "Course Completion Rate",
    subtitle:
      "Semantic tokens: var(--chart-2), var(--chart-3), var(--destructive)",
    data: performanceByDept,
    showLabels: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Treemap with labels hidden, relying entirely on tooltip interaction for identifying research output categories.",
      },
    },
  },
  args: {
    title: "Research Output",
    subtitle: "Hover cells to see details — labels hidden",
    data: researchOutput,
    showLabels: false,
    showTooltip: true,
    height: 300,
  },
}

export const DenseData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Treemap displaying seven research output categories where labels only appear on larger cells to avoid overcrowding.",
      },
    },
  },
  args: {
    title: "Research Output by Type",
    subtitle: "Many categories — labels appear only on larger cells",
    data: researchOutput,
    showLabels: true,
    showTooltip: true,
    height: 320,
  },
}

export const WideAspectRatio: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Treemap with `aspectRatio={2}` producing wider, shorter cells for an alternative layout of budget allocation data.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "aspectRatio={2} — wider, shorter cells",
    data: budgetAllocation,
    aspectRatio: 2,
    showLabels: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
    height: 260,
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Hierarchical treemap with a footer showing total enrollment, school count, and year-over-year growth percentage.",
      },
    },
  },
  args: {
    title: "Enrollment by School",
    subtitle: "Semester 2025.1 — 9,740 students total",
    data: enrollmentBySchool,
    showLabels: true,
    showTooltip: true,
    height: 380,
    valueFormatter: (v) => formatValue(v, "integer"),
    footer: (
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-3.5 text-muted-foreground" />
            <span>9,740 enrolled</span>
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-muted-foreground" />
            <span>5 schools</span>
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <TrendingUp className="size-3 text-success" />
          +4.2% vs. 2024.2
        </span>
      </div>
    ),
  },
}

export const FlatComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of four treemaps comparing different aspect ratios and label visibility settings side by side for the same budget data.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <TreeMapChart
        title="Budget Allocation"
        subtitle="aspectRatio={4/3} (default)"
        data={budgetAllocation}
        aspectRatio={4 / 3}
        showLabels
        showTooltip
        valueFormatter={(v) => `${v}%`}
        height={260}
      />
      <TreeMapChart
        title="Budget Allocation"
        subtitle="aspectRatio={1} — square grid"
        data={budgetAllocation}
        aspectRatio={1}
        showLabels
        showTooltip
        valueFormatter={(v) => `${v}%`}
        height={260}
      />
      <TreeMapChart
        title="Budget Allocation"
        subtitle="aspectRatio={2} — wide cells"
        data={budgetAllocation}
        aspectRatio={2}
        showLabels
        showTooltip
        valueFormatter={(v) => `${v}%`}
        height={260}
      />
      <TreeMapChart
        title="Budget Allocation"
        subtitle="showLabels={false} — tooltip only"
        data={budgetAllocation}
        aspectRatio={4 / 3}
        showLabels={false}
        showTooltip
        valueFormatter={(v) => `${v}%`}
        height={260}
      />
    </div>
  ),
  args: { data: budgetAllocation },
}

export const LocalePTBR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Treemap with Portuguese locale displaying budget allocation with localized percentage formatting.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Fiscal year 2025 — percentage of total",
    data: budgetAllocation,
    showLabels: true,
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof TreeMapChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <TreeMapChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the treemap with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Fiscal year 2025 — percentage of total",
    data: budgetAllocation,
    showLabels: true,
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
          "When `data` is an empty array, the treemap renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Budget Allocation",
    subtitle: "Fiscal year 2025",
    data: [],
    height: 360,
  },
}

export const DrillDown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Hierarchical enrollment treemap with explicit breadcrumb navigation for drill-down exploration through schools and programs.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        Click any colored rectangle to drill into its sub-categories. Use the
        breadcrumb at the top to navigate back.
      </p>
      <TreeMapChart
        title="Enrollment by School & Program"
        subtitle="Click a school to see its programs"
        data={enrollmentBySchool}
        showLabels
        showTooltip
        height={400}
        valueFormatter={(v) => v.toLocaleString("en-US")}
        footer={
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            9,740 students across 5 schools · 20 programs
          </span>
        }
      />
    </div>
  ),
  args: { data: enrollmentBySchool },
}
