import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ColumnDef } from "@tanstack/react-table"
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  RefreshCw,
  Users,
} from "lucide-react"
import {
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  col,
} from "@/components/custom/data-table"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Data Display/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A high-performance virtualized data table powered by **`@tanstack/react-table`** and **`@tanstack/react-virtual`**.",
          "",
          "Handles **100 k+ rows** smoothly by rendering only the rows visible in the viewport.",
          "TanStack Table manages all state — sorting, global filter, pagination, and row selection.",
          "",
          "## Column API",
          "",
          "Two ways to define columns:",
          "",
          "**1. `col()` helper** — concise, covers most use cases:",
          "```tsx",
          "const columns: ColumnDef<Student>[] = [",
          "  col({ key: 'name',   label: 'Name',   sortable: true }),",
          "  col({ key: 'gpa',    label: 'GPA',    align: 'center', sortable: true }),",
          "  col({ key: 'status', label: 'Status', cell: (_, row) => <Badge>{row.status}</Badge> }),",
          "]",
          "```",
          "",
          "**2. Native `ColumnDef<T>`** — full TanStack Table API for advanced cases:",
          "```tsx",
          "const columns: ColumnDef<Student>[] = [",
          "  { accessorKey: 'name', header: ({ column }) => <SortButton column={column} />, ... },",
          "]",
          "```",
          "",
          "## Sort & Hover Visual Feedback",
          "",
          "Column headers that support sorting respond visually using **semantic theme tokens** — they adapt automatically to light/dark mode and any active theme variant (`.blue`, `.green`, `.violet`, etc.).",
          "",
          "| State | Token applied | Effect |",
          "| --- | --- | --- |",
          "| Hover (sortable header) | `hover:text-foreground` | Text shifts from muted to full contrast |",
          "| Hover (sortable header) | `hover:border-b-2 hover:border-ring` | Subtle 2 px underline in theme accent colour (`--ring` mirrors `--primary`) |",
          "| Column is sorted | `text-primary` | Header text in the active theme primary colour |",
          "| Column is sorted | `border-b-2 border-primary` | 2 px underline in the active theme primary colour |",
          "| Sort icon — active | `opacity-100` | Arrow icon fully visible |",
          "| Sort icon — inactive | `opacity-60` | Chevron icon dimmed |",
          "| Body cells — sorted column | `bg-muted/30` | Subtle tint highlights the active column (non-sticky cells only) |",
          "",
          "> **Never hardcode colours here.** All tokens (`--foreground`, `--muted-foreground`, `--muted`) are resolved at runtime from `globals.css`, so the active theme always applies.",
          "",
          "## Loading States",
          "",
          "| Scenario | Behaviour |",
          "| --- | --- |",
          "| `loading=true` + `data=[]` | Full animated skeleton matching the column layout |",
          "| `loading=true` + `data=[...]` | Data stays visible; a slim progress bar appears at the top |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "compact"],
      table: { defaultValue: { summary: "default" } },
    },
    textSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    height: {
      control: { type: "range", min: 200, max: 800, step: 20 },
      table: { defaultValue: { summary: "400" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showSearch: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showDownload: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    pagination: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    selectRows: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
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
    columns: { table: { disable: true } },
    footer: { table: { disable: true } },
    toolbar: { table: { disable: true } },
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// ── Domain model ───────────────────────────────────────────────────────────

type Status = "Active" | "Suspended" | "Graduating" | "Irregular"

interface Student {
  id: number
  enrollmentId: string
  name: string
  course: string
  semester: number
  gpa: number
  absences: number
  status: Status
  scholarship: boolean
  city: string
  email: string
  phone: string
  birthDate: string
  motherName: string
  address: string
  entryYear: number
  advisor: string
  shift: "Morning" | "Afternoon" | "Evening"
}

// ── Seed data generators ───────────────────────────────────────────────────

const FIRST_NAMES = [
  "Ana",
  "Bruno",
  "Carla",
  "Diego",
  "Elena",
  "Felipe",
  "Gabriela",
  "Henrique",
  "Isabela",
  "João",
  "Karen",
  "Lucas",
  "Mariana",
  "Natan",
  "Olivia",
  "Paulo",
  "Renata",
  "Samuel",
  "Tainá",
  "Uriel",
  "Vanessa",
  "Wagner",
  "Ximena",
  "Yuri",
  "Zara",
]

const LAST_NAMES = [
  "Lima",
  "Costa",
  "Mendes",
  "Souza",
  "Ferreira",
  "Alves",
  "Nunes",
  "Pereira",
  "Rodrigues",
  "Barbosa",
  "Nascimento",
  "Teixeira",
  "Cardoso",
  "Oliveira",
  "Martins",
  "Santos",
  "Almeida",
  "Gomes",
  "Moreira",
  "Silva",
]

const COURSES = [
  "Computer Science",
  "Electrical Engineering",
  "Mathematics",
  "Physics",
  "Statistics",
]

const CITIES = [
  "João Pessoa",
  "Campina Grande",
  "Recife",
  "Natal",
  "Fortaleza",
  "Bayeux",
  "Santa Rita",
  "Patos",
  "Sousa",
  "Cajazeiras",
]

const ADVISORS = [
  "Dr. Ana Lúcia",
  "Dr. Carlos Mendes",
  "Dra. Patrícia Oliveira",
  "Dr. Ricardo Santos",
  "Dr. Marcos Silva",
  "Dra. Fernanda Costa",
  "Dr. Thiago Almeida",
  "Dra. Juliana Martins",
]

const MOTHER_NAMES = [
  "Maria da Silva",
  "Ana Pereira",
  "Rosa Oliveira",
  "Lucia Santos",
  "Teresa Almeida",
  "Sandra Costa",
  "Fatima Rodrigues",
  "Rita Barbosa",
]

const STATUSES: Status[] = ["Active", "Suspended", "Graduating", "Irregular"]
const STATUS_WEIGHTS = [0.65, 0.1, 0.15, 0.1]

function weightedStatus(seed: number): Status {
  const r = ((seed * 1664525 + 1013904223) % 2147483648) / 2147483648
  let cumulative = 0
  for (let i = 0; i < STATUS_WEIGHTS.length; i++) {
    cumulative += STATUS_WEIGHTS[i]
    if (r < cumulative) return STATUSES[i]
  }
  return "Active"
}

function generateStudents(count: number): Student[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i + 1
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
    const lastName = LAST_NAMES[(i * 7 + 3) % LAST_NAMES.length]
    const course = COURSES[i % COURSES.length]
    const semester = (i % 8) + 1
    const gpa = Math.round((5 + ((seed * 9301 + 49297) % 100) / 20) * 10) / 10
    const absences = (seed * 6271 + 11) % 20
    const year = 2018 + (i % 6)
    const enrollmentId = `${year}${String((i % 9999) + 1).padStart(4, "0")}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@academico.ufpb.br`
    const phone = `(83) 9${String(9000 + ((seed * 137 + 59) % 1000)).padStart(4, "0")}-${String((seed * 731 + 23) % 10000).padStart(4, "0")}`
    const day = ((seed * 13 + 7) % 28) + 1
    const month = ((seed * 7 + 3) % 12) + 1
    const birthDate = `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${1990 + (seed % 10)}`
    const motherName = MOTHER_NAMES[i % MOTHER_NAMES.length]
    const address = `Rua ${firstName}, ${100 + ((seed * 73 + 17) % 900)}`
    const entryYear = year
    const advisor = ADVISORS[i % ADVISORS.length]
    const shift = (["Morning", "Afternoon", "Evening"] as const)[i % 3]

    return {
      id: seed,
      enrollmentId,
      name: `${firstName} ${lastName}`,
      course,
      semester,
      gpa: Math.min(10, gpa),
      absences,
      status: weightedStatus(seed),
      scholarship: (seed * 3 + 1) % 5 === 0,
      city: CITIES[i % CITIES.length],
      email,
      phone,
      birthDate,
      motherName,
      address,
      entryYear,
      advisor,
      shift,
    }
  })
}

const STUDENTS_20 = generateStudents(20)
const STUDENTS_200 = generateStudents(200)

// ── Column definitions ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Status,
  {
    variant: "default" | "secondary" | "outline" | "destructive"
    icon: React.ReactNode
  }
> = {
  Active: { variant: "default", icon: <CheckCircle2 className="size-3" /> },
  Graduating: { variant: "secondary", icon: <TrendingUp className="size-3" /> },
  Suspended: { variant: "outline", icon: <Clock className="size-3" /> },
  Irregular: {
    variant: "destructive",
    icon: <AlertCircle className="size-3" />,
  },
}

/** Simple columns — defined with the col() helper */
const SIMPLE_COLUMNS: ColumnDef<Student>[] = [
  col({
    key: "enrollmentId",
    label: "Enrollment ID",
    width: 130,
    sortable: true,
  }),
  col({ key: "name", label: "Name", width: 190, sortable: true }),
  col({ key: "course", label: "Course", width: 220, sortable: true }),
  col({
    key: "semester",
    label: "Sem.",
    width: 70,
    align: "center",
    sortable: true,
  }),
  col({ key: "gpa", label: "GPA", width: 80, align: "center", sortable: true }),
  col({
    key: "absences",
    label: "Absences",
    width: 90,
    align: "center",
    sortable: true,
  }),
  col({ key: "city", label: "City", width: 140, sortable: true }),
]

/** Rich columns — mix of col() helpers and native ColumnDef with custom cells */
const RICH_COLUMNS: ColumnDef<Student>[] = [
  col({ key: "enrollmentId", label: "Enrollment ID", width: 130 }),
  col({ key: "name", label: "Name", width: 190, sortable: true }),
  col({ key: "course", label: "Course", width: 220, sortable: true }),
  col({
    key: "semester",
    label: "Sem.",
    width: 70,
    align: "center",
    sortable: true,
  }),
  {
    id: "gpa",
    accessorKey: "gpa",
    header: "GPA",
    enableSorting: true,
    meta: { width: 80, align: "center" as const },
    cell: ({ getValue }) => {
      const v = getValue<number>()
      return (
        <span
          className={
            v >= 8.5
              ? "font-semibold text-emerald-600 dark:text-emerald-400"
              : v >= 7
                ? "font-medium"
                : "font-medium text-amber-600 dark:text-amber-400"
          }
        >
          {v.toFixed(1)}
        </span>
      )
    },
  },
  {
    id: "absences",
    accessorKey: "absences",
    header: "Absences",
    enableSorting: true,
    meta: { width: 90, align: "center" as const },
    cell: ({ getValue }) => {
      const v = getValue<number>()
      return (
        <span
          className={v >= 10 ? "font-semibold text-destructive" : undefined}
        >
          {v}
        </span>
      )
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    meta: { width: 140 },
    cell: ({ getValue }) => {
      const s = getValue<Status>()
      const { variant, icon } = STATUS_CONFIG[s]
      return (
        <Badge
          variant={variant}
          className="flex items-center gap-1 px-2 py-0.5 text-xs"
        >
          {icon}
          {s}
        </Badge>
      )
    },
  },
  {
    id: "scholarship",
    accessorKey: "scholarship",
    header: "Scholar",
    enableSorting: false,
    meta: { width: 80, align: "center" as const },
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <CheckCircle2 className="size-4 text-emerald-500" />
      ) : (
        <span className="text-muted-foreground/30">—</span>
      ),
  },
]

/** Many columns — for horizontal scroll demonstration */
const MANY_COLUMNS: ColumnDef<Student>[] = [
  col({
    key: "enrollmentId",
    label: "Enrollment ID",
    width: 130,
    sortable: true,
  }),
  col({ key: "name", label: "Name", width: 190, sortable: true }),
  col({ key: "course", label: "Course", width: 220, sortable: true }),
  col({
    key: "semester",
    label: "Sem.",
    width: 70,
    align: "center",
    sortable: true,
  }),
  col({ key: "gpa", label: "GPA", width: 80, align: "center", sortable: true }),
  col({
    key: "absences",
    label: "Absences",
    width: 90,
    align: "center",
    sortable: true,
  }),
  col({ key: "status", label: "Status", width: 110 }),
  col({ key: "scholarship", label: "Scholar", width: 80, align: "center" }),
  col({ key: "email", label: "Email", width: 220 }),
  col({ key: "phone", label: "Phone", width: 150 }),
  col({ key: "birthDate", label: "Birth Date", width: 110, align: "center" }),
  col({ key: "motherName", label: "Mother", width: 180 }),
  col({ key: "address", label: "Address", width: 200 }),
  col({
    key: "entryYear",
    label: "Entry",
    width: 80,
    align: "center",
    sortable: true,
  }),
  col({ key: "advisor", label: "Advisor", width: 180, sortable: true }),
  col({ key: "shift", label: "Shift", width: 100, align: "center" }),
  col({ key: "city", label: "City", width: 140 }),
]

// ── Shared args shorthand ──────────────────────────────────────────────────

const base = {
  data: STUDENTS_20 as unknown as object[],
  columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
  height: 400,
}

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { ...base },
  parameters: {
    docs: {
      description: {
        story:
          "Default data table with simple column definitions and 20 student records.",
      },
    },
  },
}

export const TitleAndSubtitle: Story = {
  name: "Title & Subtitle",
  args: {
    ...base,
    title: "Enrolled Students",
    subtitle: "Academic term 2025.1 — Department of Computing · UFPB",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Data table with title and subtitle text displayed above the table.",
      },
    },
  },
}

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Global filter powered by TanStack Table's `getFilteredRowModel`. Searches across all columns simultaneously and resets the page index to 0 on each keystroke.",
      },
    },
  },
  args: {
    ...base,
    title: "Real-time Search",
    subtitle: "Filters across every column as you type",
    showSearch: true,
  },
}

export const Sortable: Story = {
  name: "Sortable Columns",
  parameters: {
    docs: {
      description: {
        story: [
          "Set `enableSorting: true` on a column (or `sortable: true` via `col()`). Clicking the header cycles **asc → desc → none** via TanStack Table's `getSortedRowModel`.",
          "",
          "**Visual feedback uses only semantic tokens — no hardcoded colours:**",
          "",
          "- **Hover** → `hover:text-foreground` + `hover:border-b-2 hover:border-ring`",
          "- **Sorted (asc/desc)** → `text-primary` + `border-b-2 border-primary`",
          "- **Sort icon** → `opacity-100` when active, `opacity-60` when idle",
          "- **Body cells** → `bg-muted/30` tint on the active sorted column (non-sticky only)",
          "",
          "Because every token is resolved from `globals.css` at runtime, the hover and sorted states",
          "adapt automatically to light/dark mode and any theme variant without extra CSS.",
        ].join("\n"),
      },
    },
  },
  args: {
    ...base,
    title: "Sortable columns",
    subtitle:
      "Click a header to sort — click again to reverse, third click to clear",
  },
}

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Uses TanStack Table's `getPaginationRowModel`. Combine with `pageSizeOptions` for a per-page selector. Works seamlessly with the global search filter.",
      },
    },
  },
  args: {
    ...base,
    title: "Students — paginated",
    pagination: true,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 20],
    height: 280,
  },
}

export const PaginationPtBR: Story = {
  name: "Pagination — pt-BR",
  parameters: {
    docs: {
      description: {
        story:
          'Paginated table with `locale="pt-BR"` — buttons render as "Anterior" / "Próximo" and the counter shows "X–Y de N linhas", all resolved from `UI_I18N["pt-BR"]` with no manual `labels` prop.',
      },
    },
  },
  args: {
    data: STUDENTS_200 as unknown as object[],
    columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
    title: "Alunos — paginado",
    subtitle: 'locale="pt-BR" — labels resolvidos automaticamente do UI_I18N',
    pagination: true,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20],
    height: 400,
    locale: "pt-BR",
  },
}

export const SearchAndPagination: Story = {
  name: "Search + Pagination",
  args: {
    ...base,
    title: "Students",
    subtitle: "Search + pagination in a single table",
    showSearch: true,
    pagination: true,
    defaultPageSize: 8,
    pageSizeOptions: [5, 8, 15, 20],
    height: 380,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combined global search and pagination — filtering resets the page index on each keystroke.",
      },
    },
  },
}

export const WithCustomCells: Story = {
  name: "Custom Cell Renderers",
  parameters: {
    docs: {
      description: {
        story: [
          "Mix `col()` helpers with native `ColumnDef` objects for full control.",
          "",
          "- **GPA** — colour-coded: green ≥ 8.5, amber < 7",
          "- **Absences** — red when ≥ 10",
          "- **Status** — `Badge` with an icon derived from a status map",
          "- **Scholar** — checkmark icon or em dash",
        ].join("\n"),
      },
    },
  },
  args: {
    data: STUDENTS_20 as unknown as object[],
    columns: RICH_COLUMNS as unknown as ColumnDef<object>[],
    title: "Student Overview",
    subtitle: "Colour-coded GPA · status badge · scholarship icon",
    showSearch: true,
    height: 420,
  },
}

export const RowSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Enable `selectRows` to inject a checkbox column managed by TanStack Table's `rowSelection` state. The header checkbox selects/deselects the entire current page and shows an indeterminate state when partially selected. Scroll horizontally to observe the selection column staying fixed on the left with an opaque background.",
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={STUDENTS_20}
      columns={MANY_COLUMNS}
      title="Row Selection"
      subtitle="Scroll horizontally to see the selection column stay fixed on the left"
      selectRows
      height={400}
    />
  ),
}

export const StickyColumns: Story = {
  name: "Sticky Columns — First Two",
  parameters: {
    docs: {
      description: {
        story:
          "The `stickyColumns` prop pins the first N columns to the left during horizontal scroll. Here, the first two columns (Enrollment ID and Name) stay fixed while the remaining columns scroll. The selection column can be combined with sticky columns — it always takes precedence at the far left.",
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={STUDENTS_20}
      columns={MANY_COLUMNS}
      title="Sticky Columns"
      subtitle="First two columns stay fixed — scroll horizontally to see them pinned"
      stickyColumns={2}
      height={400}
    />
  ),
}

export const StickyColumnsWithSelection: Story = {
  name: "Sticky Columns + Row Selection",
  parameters: {
    docs: {
      description: {
        story:
          "Combines `stickyColumns={2}` with `selectRows`. The selection checkbox is always the first sticky column (leftmost), followed by the two configured sticky columns. Scroll horizontally to see all three columns pinned on the left.",
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={STUDENTS_20}
      columns={MANY_COLUMNS}
      title="Sticky Columns + Selection"
      subtitle="Selection checkbox + first two data columns stay fixed on the left"
      stickyColumns={2}
      selectRows
      height={400}
    />
  ),
}

export const SquareBorders: Story = {
  name: "Square Borders (no rounded corners)",
  parameters: {
    docs: {
      description: {
        story:
          "Set `rounded={false}` to render the table with straight corners instead of the default `rounded-xl`. Useful when embedding the table in a container that already provides its own border-radius or when a sharper aesthetic is desired.",
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={STUDENTS_20}
      columns={MANY_COLUMNS}
      title="Square Borders"
      subtitle="rounded={false} — no rounded corners on the table wrapper"
      rounded={false}
      height={400}
    />
  ),
}

export const ClickableRows: Story = {
  args: { data: [], columns: [] },
  render: () => {
    const [selected, setSelected] = React.useState<Student | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          title="Click a Row"
          subtitle="onRowClick receives the original row object"
          data={STUDENTS_20}
          columns={RICH_COLUMNS}
          height={360}
          onRowClick={(row) => setSelected(row as Student)}
        />
        {selected && (
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
            <span className="font-semibold">{selected.name}</span>
            {" — "}
            <span className="text-muted-foreground">
              {selected.course}, semester {selected.semester}
            </span>
            <span className="ml-2 font-medium">
              GPA {selected.gpa.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Row click handler — clicking a row displays the selected student's details below the table.",
      },
    },
  },
}

export const CompactSize: Story = {
  args: {
    ...base,
    title: "Compact mode",
    subtitle: 'size="compact" — useful for dashboards and sidebars',
    size: "compact",
    showSearch: true,
    height: 380,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compact table variant with tighter padding — ideal for dashboards and sidebars.",
      },
    },
  },
}

export const WithDownload: Story = {
  name: "Download Button",
  args: {
    ...base,
    title: "Export Data",
    showDownload: true,
    showSearch: true,
    onDownload: () => alert("Exporting..."),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Download button in the toolbar that triggers an onDownload callback.",
      },
    },
  },
}

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `footer` prop accepts any `ReactNode` rendered below the table wrapper in a muted text row.",
      },
    },
  },
  args: {
    data: STUDENTS_20 as unknown as object[],
    columns: RICH_COLUMNS as unknown as ColumnDef<object>[],
    title: "Enrolled Students",
    subtitle: "Source: SIGAA — 2025.1",
    height: 400,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Users className="size-3.5" />
          {STUDENTS_20.length} students enrolled
        </span>
        <span className="flex items-center gap-1 opacity-60">
          <Info className="size-3" />
          Updated today at 08:30
        </span>
      </div>
    ),
  },
}

export const KitchenSink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All features active at once: title, subtitle, search, sortable columns, row selection, pagination, download, and footer.",
      },
    },
  },
  args: {
    data: STUDENTS_200 as unknown as object[],
    columns: RICH_COLUMNS as unknown as ColumnDef<object>[],
    title: "Faculty Portal — Student Progress",
    subtitle: "UFPB · Department of Computing · 2025.1",
    showSearch: true,
    showDownload: true,
    selectRows: true,
    pagination: true,
    defaultPageSize: 7,
    pageSizeOptions: [5, 7, 10, 20, 50],
    height: 380,
    onDownload: () => alert("Exporting CSV..."),
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-emerald-500" />
          Average GPA: 7.9
        </span>
        <span className="flex items-center gap-1 opacity-60">
          <Info className="size-3" />
          Source: SIGAA
        </span>
      </div>
    ),
  },
}

// ── Performance ────────────────────────────────────────────────────────────

export const TenThousandRows: Story = {
  name: "10 000 Rows — Virtualized",
  parameters: {
    docs: {
      description: {
        story: [
          "**10 000 rows** rendered without pagination.",
          "",
          "Only the rows visible inside the scrollable viewport are mounted in the DOM.",
          "`@tanstack/react-virtual` measures the container, calculates a virtual window,",
          "and updates it on scroll — keeping frame-rate smooth even at this scale.",
          "",
          "> Data is generated lazily on first mount — not at module load — to avoid blocking Storybook on import.",
        ].join("\n"),
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => {
    const [data] = React.useState(() => generateStudents(10_000))
    return (
      <DataTable
        data={data as unknown as object[]}
        columns={SIMPLE_COLUMNS as unknown as ColumnDef<object>[]}
        title="10 000 Rows"
        subtitle="Scroll to see virtualization in action — only visible rows are in the DOM"
        showSearch
        height={480}
      />
    )
  },
}

export const HundredThousandRows: Story = {
  name: "100 000 Rows — Virtualized",
  parameters: {
    docs: {
      description: {
        story: [
          "**100 000 rows** in a single scrollable viewport.",
          "",
          "The total virtual height of all rows is pre-calculated, so the browser's",
          "native scrollbar reflects the correct proportion — but only a tiny DOM window",
          "of real `<tr>` elements is ever mounted at once.",
          "",
          "> Data is generated lazily on first mount — not at module load — to avoid blocking Storybook on import.",
        ].join("\n"),
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => {
    const [data] = React.useState(() => generateStudents(100_000))
    return (
      <DataTable
        data={data as unknown as object[]}
        columns={SIMPLE_COLUMNS as unknown as ColumnDef<object>[]}
        title="100 000 Rows"
        subtitle="Virtual DOM window: ~15 rows regardless of dataset size"
        height={480}
      />
    )
  },
}

export const VirtualizedWithPagination: Story = {
  name: "10 000 Rows + Pagination",
  parameters: {
    docs: {
      description: {
        story:
          "Pagination and virtualization work together: TanStack Table slices the filtered rows into pages; the virtualizer renders only the visible rows within that page.",
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => {
    const [data] = React.useState(() => generateStudents(10_000))
    return (
      <DataTable
        data={data as unknown as object[]}
        columns={SIMPLE_COLUMNS as unknown as ColumnDef<object>[]}
        title="10 000 Rows with Pagination"
        showSearch
        pagination
        defaultPageSize={50}
        pageSizeOptions={[20, 50, 100, 200]}
        height={480}
      />
    )
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function SimulateFirstLoad(props: React.ComponentProps<typeof DataTable>) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="flex flex-col gap-4">
      <DataTable {...props} loading={loading} />
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={() => setLoading(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <RefreshCw className="size-3" />
          Simulate reload
        </button>
        <span className="text-xs text-muted-foreground">
          {loading ? "Fetching data…" : "Data loaded"}
        </span>
      </div>
    </div>
  )
}

export const LoadingSkeleton: Story = {
  name: "Loading — Skeleton (first load)",
  parameters: {
    docs: {
      description: {
        story:
          "When `loading=true` and `data=[]`, the table renders an animated skeleton that mirrors the exact column layout. Placeholders are only shown for slots you actually pass (`title`, `subtitle`, `showSearch`, `pagination`, `footer`).",
      },
    },
  },
  args: {
    data: [],
    columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
    title: "Enrolled Students",
    subtitle: "Academic term 2025.1",
    showSearch: true,
    pagination: true,
    height: 380,
    footer: <span>Source: SIGAA</span>,
  },
  render: (args) => <SimulateFirstLoad {...args} />,
}

function SimulateRefetch(props: React.ComponentProps<typeof DataTable>) {
  const [loading, setLoading] = React.useState(false)

  const trigger = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable {...props} loading={loading} />
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={trigger}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw className={loading ? "size-3 animate-spin" : "size-3"} />
          Refetch
        </button>
        <span className="text-xs text-muted-foreground">
          {loading ? "Refreshing…" : "Up to date"}
        </span>
      </div>
    </div>
  )
}

export const LoadingRefetch: Story = {
  name: "Loading — Refetch (data visible)",
  parameters: {
    docs: {
      description: {
        story:
          "When `loading=true` and `data` already has rows, the existing data stays visible while a slim progress bar at the top signals an in-flight request. Rows dim to reinforce the pending state.",
      },
    },
  },
  args: {
    data: STUDENTS_20 as unknown as object[],
    columns: RICH_COLUMNS as unknown as ColumnDef<object>[],
    title: "Enrolled Students",
    subtitle: "Background refresh in progress",
    showSearch: true,
    height: 380,
  },
  render: (args) => <SimulateRefetch {...args} />,
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `data=[]` and `loading=false`, the body shows a centred empty-state with a `Table2` icon. Customise the message and description via the `labels` prop.",
      },
    },
  },
  args: {
    data: [],
    columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
    title: "No results",
    subtitle: "Try adjusting your filters or check back later",
    height: 340,
  },
}

export const EmptyAfterSearch: Story = {
  name: "Empty — No Search Results",
  parameters: {
    docs: {
      description: {
        story:
          "The same empty state is shown when a search term matches no rows. The search field stays interactive so the user can clear the filter. `defaultGlobalFilter` pre-fills the search bar on mount.",
      },
    },
  },
  args: {
    data: STUDENTS_20 as unknown as object[],
    columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
    title: "No results for this search",
    showSearch: true,
    defaultGlobalFilter: "zzz_no_match",
    height: 340,
    labels: {
      noData: "No students match your search",
      noDataDescription: "Try searching by name, course, or enrollment ID.",
    },
  },
}

export const EmptyStatePtBR: Story = {
  name: "Empty State — pt-BR",
  parameters: {
    docs: {
      description: {
        story:
          'Empty state with `locale="pt-BR"` — the built-in message and description resolve automatically from `UI_I18N["pt-BR"]` without any `labels` override.',
      },
    },
  },
  args: {
    data: [],
    columns: SIMPLE_COLUMNS as unknown as ColumnDef<object>[],
    title: "Sem resultados",
    subtitle: "Tente ajustar os filtros ou volte mais tarde",
    height: 340,
    locale: "pt-BR",
  },
}

// ── col() helper showcase ──────────────────────────────────────────────────

export const ColHelper: Story = {
  name: "col() Helper — API Showcase",
  parameters: {
    docs: {
      description: {
        story: [
          "The exported `col<T>()` function converts a simple descriptor into a full `ColumnDef<T>`.",
          "",
          "```tsx",
          "import { col } from '@/components/custom/data-table'",
          "",
          "const columns: ColumnDef<Student>[] = [",
          "  // Sortable plain column",
          "  col({ key: 'name', label: 'Name', sortable: true }),",
          "",
          "  // Fixed-width centred column with number formatting",
          "  col({ key: 'gpa', label: 'GPA', width: 80, align: 'center', format: 'number' }),",
          "",
          "  // Custom cell renderer — receives (value, row)",
          "  col({",
          "    key: 'status',",
          "    label: 'Status',",
          "    cell: (_, row) => <Badge>{row.status}</Badge>,",
          "  }),",
          "]",
          "```",
        ].join("\n"),
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      title="col() Helper Demo"
      subtitle="All columns below are defined via col()"
      data={STUDENTS_20}
      columns={[
        col<Student>({
          key: "name",
          label: "Name",
          width: 190,
          sortable: true,
        }),
        col<Student>({
          key: "course",
          label: "Course",
          width: 220,
          sortable: true,
        }),
        col<Student>({
          key: "semester",
          label: "Semester",
          width: 90,
          align: "center",
          sortable: true,
        }),
        col<Student>({
          key: "gpa",
          label: "GPA",
          width: 80,
          align: "center",
          format: "number",
          sortable: true,
        }),
        col<Student>({
          key: "absences",
          label: "Absences",
          width: 90,
          align: "center",
          sortable: true,
        }),
        col<Student>({
          key: "status",
          label: "Status",
          width: 120,
          cell: (v) => <span className="capitalize">{String(v)}</span>,
        }),
        col<Student>({ key: "city", label: "City", width: 140 }),
      ]}
      showSearch
      pagination
      defaultPageSize={8}
      pageSizeOptions={[5, 8, 10, 20]}
      height={380}
    />
  ),
}

// ── Column Resizing ─────────────────────────────────────────────────────────

export const ResizableColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "Hover the right edge of any column header to reveal the resize handle, then drag left or right to adjust the width.",
          "",
          "**How it works:**",
          "",
          "- `columnResizeMode: 'onChange'` updates widths in real time as you drag",
          "- `header.getResizeHandler()` from TanStack Table manages the drag lifecycle (mouse + touch)",
          "- `header.column.getIsResizing()` drives the handle colour: `bg-border` at rest → `bg-primary/50` on hover → `bg-primary` while dragging",
          "- Only columns with an explicit `width` in `col()` get a resize handle — flex-grow columns are excluded to avoid an initial-width jump",
          "- Width overrides live in TanStack's internal `columnSizing` state and are passed as `override` to `colStyle`, switching those columns from flex to fixed-width",
        ].join("\n"),
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={STUDENTS_20}
      columns={[
        col<Student>({
          key: "enrollmentId",
          label: "Enrollment ID",
          width: 130,
          sortable: true,
        }),
        col<Student>({
          key: "name",
          label: "Name",
          width: 200,
          sortable: true,
        }),
        col<Student>({
          key: "course",
          label: "Course",
          width: 200,
          sortable: true,
        }),
        col<Student>({
          key: "semester",
          label: "Sem.",
          width: 70,
          align: "center",
          sortable: true,
        }),
        col<Student>({
          key: "gpa",
          label: "GPA",
          width: 80,
          align: "center",
          sortable: true,
        }),
        col<Student>({
          key: "absences",
          label: "Absences",
          width: 90,
          align: "center",
          sortable: true,
        }),
        col<Student>({
          key: "city",
          label: "City",
          width: 150,
          sortable: true,
        }),
      ]}
      title="Resizable Columns"
      subtitle="Drag the right edge of any column header to resize it"
      showSearch
      height={400}
    />
  ),
}

// ── Number Formatting ───────────────────────────────────────────────────────

interface Grant {
  id: string
  project: string
  agency: string
  totalBudget: number
  disbursed: number
  executionRate: number
  costPerItem: number
  items: number
}

const GRANTS: Grant[] = [
  {
    id: "PIBIC-001",
    project: "Redes Neurais Aplicadas ao Diagnóstico Médico",
    agency: "CNPq",
    totalBudget: 48000,
    disbursed: 31200,
    executionRate: 0.65,
    costPerItem: 1066.666,
    items: 45,
  },
  {
    id: "PIBIC-002",
    project: "Modelagem Climática do Semiárido Nordestino",
    agency: "CAPES",
    totalBudget: 120000,
    disbursed: 118560,
    executionRate: 0.988,
    costPerItem: 2412.244,
    items: 49,
  },
  {
    id: "PIBEX-003",
    project: "Alfabetização Digital em Comunidades Rurais",
    agency: "MEC",
    totalBudget: 35000,
    disbursed: 12250,
    executionRate: 0.35,
    costPerItem: 350,
    items: 35,
  },
  {
    id: "PIBIC-004",
    project: "Bioinformática e Sequenciamento Genômico",
    agency: "FAPESQ",
    totalBudget: 85000,
    disbursed: 76500,
    executionRate: 0.9,
    costPerItem: 1020.833,
    items: 75,
  },
  {
    id: "PIBEX-005",
    project: "Empreendedorismo Social no Agreste Paraibano",
    agency: "SEBRAE",
    totalBudget: 22000,
    disbursed: 8580,
    executionRate: 0.39,
    costPerItem: 572,
    items: 15,
  },
  {
    id: "PIBIC-006",
    project: "Inteligência Artificial para Educação Inclusiva",
    agency: "CNPq",
    totalBudget: 195000,
    disbursed: 175500,
    executionRate: 0.9,
    costPerItem: 3900,
    items: 45,
  },
  {
    id: "PIBEX-007",
    project: "Segurança Alimentar em Áreas de Vulnerabilidade",
    agency: "MDS",
    totalBudget: 67500,
    disbursed: 45562.5,
    executionRate: 0.675,
    costPerItem: 1518.75,
    items: 30,
  },
  {
    id: "PIBIC-008",
    project: "Energias Renováveis no Semiárido",
    agency: "ANEEL",
    totalBudget: 310000,
    disbursed: 272800,
    executionRate: 0.88,
    costPerItem: 5166.666,
    items: 60,
  },
  {
    id: "PIBEX-009",
    project: "Arte e Cultura na Periferia de João Pessoa",
    agency: "MinC",
    totalBudget: 18000,
    disbursed: 6300,
    executionRate: 0.35,
    costPerItem: 450,
    items: 14,
  },
  {
    id: "PIBIC-010",
    project: "Farmacologia de Plantas Medicinais da Caatinga",
    agency: "FAPESQ",
    totalBudget: 140000,
    disbursed: 112000,
    executionRate: 0.8,
    costPerItem: 2333.333,
    items: 48,
  },
]

export const NumberFormats: Story = {
  name: "Number Formatting — pt-BR",
  parameters: {
    docs: {
      description: {
        story: [
          "Demonstrates the built-in number formatting via `format` + the new `locale` and `formatOptions` props on `col()`.",
          "",
          "| Column | `format` | `locale` | `formatOptions` override |",
          "| --- | --- | --- | --- |",
          "| Total Budget | `currency` | `pt-BR` (default) | — |",
          "| Disbursed | `currency` | `pt-BR` (default) | — |",
          "| Execution | `percent` | `pt-BR` | `minimumFractionDigits: 1` |",
          "| Avg Cost/Item | `number` | `pt-BR` | `minimumFractionDigits: 2, maximumFractionDigits: 2` |",
          "| Items | `number` | `pt-BR` | `maximumFractionDigits: 0` |",
          "",
          "**`locale` and `formatOptions` are spread into `Intl.NumberFormat`**, so any combination the browser supports works:",
          "",
          "```tsx",
          "// BRL — default, no extra config needed",
          "col({ key: 'budget', label: 'Budget', format: 'currency' })",
          "",
          "// USD — override currency",
          "col({ key: 'budget', label: 'Budget', format: 'currency', locale: 'en-US',",
          "      formatOptions: { currency: 'USD' } })",
          "",
          "// Percent with 1 decimal in pt-BR",
          "col({ key: 'rate', label: 'Execution Rate', format: 'percent', locale: 'pt-BR',",
          "      formatOptions: { minimumFractionDigits: 1 } })",
          "",
          "// Fixed 2 decimals in pt-BR",
          "col({ key: 'cost', label: 'Cost', format: 'number', locale: 'pt-BR',",
          "      formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 } })",
          "```",
        ].join("\n"),
      },
    },
  },
  args: { data: [], columns: [] },
  render: () => (
    <DataTable
      data={GRANTS}
      columns={[
        col<Grant>({
          key: "id",
          label: "Process #",
          width: 110,
          sortable: true,
        }),
        col<Grant>({
          key: "project",
          label: "Project",
          width: 360,
          sortable: true,
        }),
        col<Grant>({
          key: "agency",
          label: "Agency",
          width: 90,
          align: "center",
          sortable: true,
        }),
        col<Grant>({
          key: "totalBudget",
          label: "Total Budget",
          width: 180,
          align: "right",
          sortable: true,
          format: "currency",
        }),
        col<Grant>({
          key: "disbursed",
          label: "Disbursed",
          width: 140,
          align: "right",
          sortable: true,
          format: "currency",
        }),
        col<Grant>({
          key: "executionRate",
          label: "Execution",
          width: 120,
          align: "right",
          sortable: true,
          format: "percent",
          locale: "pt-BR",
          formatOptions: { minimumFractionDigits: 1 },
        }),
        col<Grant>({
          key: "costPerItem",
          label: "Avg Cost/Item",
          width: 170,
          align: "right",
          sortable: true,
          format: "number",
          locale: "pt-BR",
          formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
        }),
        col<Grant>({
          key: "items",
          label: "Items",
          width: 70,
          align: "center",
          sortable: true,
          format: "number",
          locale: "pt-BR",
          formatOptions: { maximumFractionDigits: 0 },
        }),
      ]}
      title="Research & Extension Projects — UFPB"
      subtitle="Budget execution by project · fiscal year 2025"
      showSearch
      height={420}
    />
  ),
}

// ── Table Primitives ────────────────────────────────────────────────────────

export const Primitives: Story = {
  name: "Table Primitives",
  args: { data: [], columns: [] },
  parameters: {
    docs: {
      description: {
        story:
          "The `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` primitives are exported for fully custom layouts — no DataTable state management or virtualization.",
      },
    },
  },
  render: () => {
    type CourseRow = {
      course: string
      enrolled: number
      avgGpa: number
      status: "ok" | "alert"
    }
    const rows: CourseRow[] = [
      { course: "Computer Science", enrolled: 6, avgGpa: 8.8, status: "ok" },
      {
        course: "Electrical Engineering",
        enrolled: 5,
        avgGpa: 7.1,
        status: "alert",
      },
      { course: "Mathematics", enrolled: 5, avgGpa: 7.2, status: "ok" },
      { course: "Physics", enrolled: 4, avgGpa: 8.2, status: "ok" },
      { course: "Statistics", enrolled: 3, avgGpa: 7.7, status: "ok" },
    ]

    return (
      <div className="overflow-hidden rounded-xl border border-border shadow-sm">
        <Table>
          <TableHeader sticky>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead className="text-center">Enrolled</TableHead>
              <TableHead className="text-center">Avg GPA</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.course} clickable>
                <TableCell className="font-medium">{row.course}</TableCell>
                <TableCell className="text-center">{row.enrolled}</TableCell>
                <TableCell className="text-center">
                  {row.avgGpa.toFixed(1)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      row.status === "alert" ? "destructive" : "secondary"
                    }
                  >
                    {row.status === "alert" ? (
                      <>
                        <TrendingDown className="mr-1 size-3" />
                        at risk
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-1 size-3" />
                        on track
                      </>
                    )}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}
