import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TrendingDown, TrendingUp } from "lucide-react"
import { HeatmapChart } from "@/components/ds/heatmap-chart"
import { formatValue } from "@/lib/format-utils"

const meta = {
  title: "Data Display/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive heatmap chart built with pure CSS grid and **`color-mix(in oklch, ...)`** for smooth, perceptually-uniform color interpolation.",
          "",
          "Maps two categorical dimensions (X and Y axes) to a cell grid where each cell's background encodes a numeric value on a continuous color scale.",
          "",
          "Hover any cell for a focused tooltip — unhovered cells fade to reduce visual noise. Enable `showValues` to print the value inside every cell.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of cell descriptor objects. Each object represents one cell in the grid, identified by its X (column) and Y (row) coordinates.",
          "",
          "```tsx",
          "const data = [",
          '  { x: "Mon", y: "Morning",   value: 42 },',
          '  { x: "Mon", y: "Afternoon", value: 58 },',
          '  { x: "Tue", y: "Morning",   value: 35 },',
          '  { x: "Tue", y: "Afternoon", value: 61 },',
          "]",
          "```",
          "",
          "#### `HeatmapCell`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `x` | `string` | ✓ | Column label — values in the same `x` share a column |",
          "| `y` | `string` | ✓ | Row label — values in the same `y` share a row |",
          "| `value` | `number` | ✓ | Numeric value — drives the cell's background intensity |",
          "| `label` | `string` | — | Override display text inside the cell (falls back to formatted `value`) |",
          "",
          "> **Type:** `HeatmapCell[]`  •  The grid dimensions are derived automatically from unique `x` and `y` values",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { HeatmapChart } from "@/components/ds/heatmap-chart"',
          "",
          "function AttendanceHeatmap() {",
          "  const data = [",
          '    { x: "Mon", y: "CS101", value: 38 },',
          '    { x: "Mon", y: "CS201", value: 52 },',
          "  ]",
          "",
          "  return (",
          "    <HeatmapChart",
          '      title="Attendance by Course × Day"',
          "      data={data}",
          '      palette="blue"',
          "      height={300}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "## Color Palettes",
          "",
          'Five built-in palettes map from `--card` (low) to a `--chart-N` token (high). Set `palette="custom"` and pass `colorFrom` / `colorTo` for full control.',
          "",
          "| Palette | Low end | High end |",
          "| --- | --- | --- |",
          "| `blue` *(default)* | `--card` | `--chart-1` |",
          "| `green` | `--card` | `--chart-2` |",
          "| `orange` | `--card` | `--chart-3` |",
          "| `purple` | `--card` | `--chart-4` |",
          "| `red` | `--card` | `--chart-5` |",
          "| `custom` | `colorFrom` | `colorTo` |",
          "",
          "Redefine `--chart-N` tokens in `globals.css` to retheme all charts at once.",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Cell (empty)** | `--muted` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Axis labels** | `--muted-foreground` |",
          "| **Scale legend text** | `--muted-foreground` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    palette: {
      control: "select",
      options: ["blue", "green", "orange", "purple", "red", "custom"],
      table: { defaultValue: { summary: "blue" } },
    },
    showValues: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showScale: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    cellSize: {
      control: { type: "range", min: 24, max: 96, step: 4 },
      table: { defaultValue: { summary: "" } },
    },
    cellHeight: {
      control: { type: "range", min: 16, max: 96, step: 4 },
      description:
        "Cell height in px — overrides the square aspect-ratio. Works with or without cellSize.",
      table: { defaultValue: { summary: "" } },
    },
    gap: {
      control: { type: "range", min: 1, max: 12, step: 1 },
      table: { defaultValue: { summary: "3" } },
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
    colorFrom: { table: { disable: true } },
    colorTo: { table: { disable: true } },
  },
} satisfies Meta<typeof HeatmapChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

// Average grade per subject × class group
const subjectVsClass = [
  { y: "Calculus", x: "Class A", value: 72 },
  { y: "Calculus", x: "Class B", value: 68 },
  { y: "Calculus", x: "Class C", value: 81 },
  { y: "Calculus", x: "Class D", value: 58 },
  { y: "Physics", x: "Class A", value: 78 },
  { y: "Physics", x: "Class B", value: 74 },
  { y: "Physics", x: "Class C", value: 85 },
  { y: "Physics", x: "Class D", value: 63 },
  { y: "Chemistry", x: "Class A", value: 65 },
  { y: "Chemistry", x: "Class B", value: 70 },
  { y: "Chemistry", x: "Class C", value: 76 },
  { y: "Chemistry", x: "Class D", value: 55 },
  { y: "Portuguese", x: "Class A", value: 83 },
  { y: "Portuguese", x: "Class B", value: 88 },
  { y: "Portuguese", x: "Class C", value: 91 },
  { y: "Portuguese", x: "Class D", value: 79 },
  { y: "History", x: "Class A", value: 76 },
  { y: "History", x: "Class B", value: 72 },
  { y: "History", x: "Class C", value: 80 },
  { y: "History", x: "Class D", value: 68 },
]

// Absence rate (%) per subject × month
const absenceByMonth = [
  { y: "Calculus", x: "Feb", value: 12 },
  { y: "Calculus", x: "Mar", value: 9 },
  { y: "Calculus", x: "Apr", value: 15 },
  { y: "Calculus", x: "May", value: 18 },
  { y: "Calculus", x: "Jun", value: 22 },
  { y: "Physics", x: "Feb", value: 8 },
  { y: "Physics", x: "Mar", value: 11 },
  { y: "Physics", x: "Apr", value: 14 },
  { y: "Physics", x: "May", value: 19 },
  { y: "Physics", x: "Jun", value: 25 },
  { y: "Chemistry", x: "Feb", value: 10 },
  { y: "Chemistry", x: "Mar", value: 13 },
  { y: "Chemistry", x: "Apr", value: 17 },
  { y: "Chemistry", x: "May", value: 21 },
  { y: "Chemistry", x: "Jun", value: 28 },
  { y: "Portuguese", x: "Feb", value: 5 },
  { y: "Portuguese", x: "Mar", value: 6 },
  { y: "Portuguese", x: "Apr", value: 8 },
  { y: "Portuguese", x: "May", value: 10 },
  { y: "Portuguese", x: "Jun", value: 12 },
  { y: "History", x: "Feb", value: 7 },
  { y: "History", x: "Mar", value: 9 },
  { y: "History", x: "Apr", value: 11 },
  { y: "History", x: "May", value: 14 },
  { y: "History", x: "Jun", value: 16 },
]

// Correlation matrix — 5 indicators
const indicators = [
  "Attendance",
  "Homework",
  "Participation",
  "Midterm",
  "Final",
]
const corrMatrix = indicators.flatMap((y) =>
  indicators.map((x) => {
    if (x === y) return { x, y, value: 1.0 }
    // Synthetic correlations
    const pairs: Record<string, number> = {
      "Attendance|Homework": 0.62,
      "Attendance|Participation": 0.71,
      "Attendance|Midterm": 0.54,
      "Attendance|Final": 0.58,
      "Homework|Participation": 0.48,
      "Homework|Midterm": 0.76,
      "Homework|Final": 0.8,
      "Participation|Midterm": 0.55,
      "Participation|Final": 0.52,
      "Midterm|Final": 0.88,
    }
    const key = [x, y].sort().join("|")
    return { x, y, value: pairs[key] ?? 0.3 }
  })
)

// Weekly engagement heatmap (day × hour block)
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const hours = ["8h", "10h", "12h", "14h", "16h", "18h", "20h"]
const engagementData = days.flatMap((y) =>
  hours.map((x) => {
    const base: Record<string, Record<string, number>> = {
      Mon: {
        "8h": 320,
        "10h": 580,
        "12h": 420,
        "14h": 640,
        "16h": 510,
        "18h": 280,
        "20h": 190,
      },
      Tue: {
        "8h": 290,
        "10h": 620,
        "12h": 440,
        "14h": 690,
        "16h": 530,
        "18h": 310,
        "20h": 210,
      },
      Wed: {
        "8h": 260,
        "10h": 540,
        "12h": 480,
        "14h": 720,
        "16h": 490,
        "18h": 340,
        "20h": 230,
      },
      Thu: {
        "8h": 300,
        "10h": 600,
        "12h": 460,
        "14h": 680,
        "16h": 520,
        "18h": 290,
        "20h": 200,
      },
      Fri: {
        "8h": 240,
        "10h": 450,
        "12h": 390,
        "14h": 560,
        "16h": 410,
        "18h": 200,
        "20h": 140,
      },
    }
    return { x, y, value: base[y]?.[x] ?? 0 }
  })
)

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default blue-palette heatmap showing average grades across five subjects and four class groups with a color scale legend.",
      },
    },
  },
  args: {
    title: "Average Grade by Subject & Class Group",
    subtitle: "Flat cells (default) — hover a cell for details",
    data: subjectVsClass,
    palette: "blue",
    showScale: true,
    showValues: false,
  },
}

export const WithValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Heatmap with numeric grade values printed inside each cell for precise comparison across subjects and class groups.",
      },
    },
  },
  args: {
    title: "Average Grade by Subject & Class Group",
    subtitle: "Values printed inside each cell",
    data: subjectVsClass,
    palette: "blue",
    showValues: true,
    showScale: true,
  },
}

export const AbsenceRate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Red-palette heatmap showing rising absence rates across subjects from February to June with percentage values and a warning tone.",
      },
    },
  },
  args: {
    title: "Absence Rate by Subject & Month",
    subtitle: "Darker red = higher absence — a warning signal",
    data: absenceByMonth,
    palette: "red",
    showValues: true,
    showScale: true,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const CorrelationMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Purple-palette correlation matrix displaying Pearson r values for five academic indicators with a 0–1 range and fixed cell size.",
      },
    },
  },
  args: {
    title: "Indicator Correlation Matrix",
    subtitle: "Pearson r — values closer to 1 indicate stronger co-movement",
    data: corrMatrix,
    palette: "purple",
    showValues: true,
    showScale: true,
    min: 0,
    max: 1,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 2 }),
    cellSize: 56,
  },
}

export const EngagementByDayAndHour: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Green-palette heatmap showing platform login density across days of the week and hourly time blocks with a login count formatter.",
      },
    },
  },
  args: {
    title: "Platform Logins — Day × Hour",
    subtitle: "Weekly aggregate · darker = more active sessions",
    data: engagementData,
    palette: "green",
    showValues: false,
    showScale: true,
    valueFormatter: (v) => formatValue(v, "integer") + " logins",
  },
}

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Heatmap using `palette="custom"` with `colorFrom` and `colorTo` set to `var(--card)` and `var(--destructive)` for full control.',
      },
    },
  },
  args: {
    title: "Average Grade — Custom Palette",
    subtitle: 'palette="custom" · colorFrom / colorTo as CSS values',
    data: subjectVsClass,
    palette: "custom",
    colorFrom: "var(--card)",
    colorTo: "var(--destructive)",
    showValues: true,
    showScale: true,
  },
}

export const Palettes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grid of five heatmaps displaying all built-in color palettes (blue, green, orange, purple, red) side by side for comparison.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["blue", "green", "orange", "purple", "red"] as const).map((p) => (
        <HeatmapChart
          key={p}
          title={`palette="${p}"`}
          data={subjectVsClass.slice(0, 8)}
          palette={p}
          showScale
          cellSize={36}
        />
      ))}
    </div>
  ),
  args: { data: subjectVsClass },
}

export const SmallCells: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Compact heatmap with `cellSize=28` and reduced gap for a dense day-by-hour engagement density visualization.",
      },
    },
  },
  args: {
    title: "Platform Logins — Compact View",
    subtitle: "cellSize=28 · week × hour density map",
    data: engagementData,
    palette: "blue",
    showScale: true,
    cellSize: 28,
    gap: 2,
  },
}

export const FlatCells: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The default behavior: cells auto-fill the available width at a fixed `32px` height. Pass `cellHeight` to override — smaller for dense grids, larger for readability.",
      },
    },
  },
  args: {
    title: "Absence Rate — Custom Cell Height",
    subtitle: "cellHeight=48 · taller cells for better readability",
    data: absenceByMonth,
    palette: "red",
    showValues: true,
    showScale: true,
    cellHeight: 48,
    valueFormatter: (v) => formatValue(v, "float", { decimals: 0 }) + "%",
  },
}

export const LocalePTBR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Heatmap with Portuguese locale displaying average grade data with localized number formatting.",
      },
    },
  },
  args: {
    title: "Nota Média por Disciplina & Turma",
    subtitle: "Semestre 2025.1 — passe o mouse sobre as células",
    data: subjectVsClass,
    palette: "blue",
    showScale: true,
    showValues: false,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof HeatmapChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <HeatmapChart {...props} loading={loading} />
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
          "Pass `loading={true}` to replace the heatmap with an animated skeleton that mirrors the title, subtitle, and footer structure.",
      },
    },
  },
  args: {
    title: "Average Grade by Subject & Class",
    subtitle: "Semester 2025.1",
    data: subjectVsClass,
    palette: "blue",
    showValues: true,
    showScale: true,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data` is an empty array, the heatmap renders a dashed-border placeholder while preserving the title and subtitle for context.",
      },
    },
  },
  args: {
    title: "Average Grade by Subject & Class",
    subtitle: "Semester 2025.1",
    data: [],
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Orange-palette heatmap showing absence rate trends with a custom footer highlighting the upward trend and best-performing subject.",
      },
    },
  },
  args: {
    title: "Absence Rate — Semester 2025.1",
    subtitle: "Month-over-month trend per subject",
    data: absenceByMonth,
    palette: "orange",
    showValues: true,
    showScale: true,
    valueFormatter: (v) => `${v}%`,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingDown className="size-3.5 text-destructive" />
          Absence climbs from Feb to Jun across all subjects
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <TrendingUp className="size-3.5 text-emerald-500" />
          Portuguese best-performing — under 13%
        </span>
      </div>
    ),
  },
}
