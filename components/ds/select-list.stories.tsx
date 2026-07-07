import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SelectList } from "@/components/ds/select-list"
import { User, Shield, Zap, Mail, Layout } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const meta = {
  title: "Form/SelectList",
  component: SelectList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A searchable list component with virtual list scrolling, custom item sizes, icons, selection indicators, search filters, and custom badge/button triggers.",
          "",
          "Optimized for rendering large datasets (e.g. 500+ records) efficiently using `@tanstack/react-virtual` virtualization.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of list item descriptor objects. Each object represents one selectable row.",
          "",
          "```tsx",
          "const data = [",
          "  {",
          '    id: 1, name: "Ana Costa",',
          '    icon: <User className="size-4" />,',
          '    iconColor: "text-blue-500",',
          '    group: "Active",',
          "  },",
          "  {",
          '    id: 2, name: "Bruno Lima", slug: "bruno.lima",',
          '    icon: <Shield className="size-4" />,',
          '    group: "Suspended",',
          "  },",
          "]",
          "```",
          "",
          "#### `SelectListItem`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `id` | `string \\| number` | ✓ | Unique identifier — returned in `onSelect` |",
          "| `name` | `string` | ✓ | Primary display text |",
          "| `icon` | `ReactNode` | — | Icon rendered to the left of the name |",
          "| `iconColor` | `string` | — | Tailwind text color class applied to the icon |",
          "| `group` | `string` | — | Section label — items are visually grouped when present |",
          "| `value` | `string \\| number` | — | Used as search target when different from `name` |",
          "| `slug` | `string` | — | Secondary identifier — used for search filtering |",
          "",
          "> **Type:** `SelectListItem[]`  •  **Required**",
          "",
          "### `onSelect`",
          "",
          "Callback fired when a row is clicked or selected via keyboard:",
          "",
          "```tsx",
          "onSelect={(item) => console.log(item.id, item.name)}",
          "```",
          "",
          "> **Type:** `(item: SelectListItem) => void`  •  **Required**",
          "",
          "### `onSearch`",
          "",
          "Callback for external search control. Fired on every keystroke (debounced via `debounce` prop):",
          "",
          "```tsx",
          "<SelectList",
          "  onSearch={(query) => fetchResults(query)}",
          "  debounce={300}",
          "/>",
          "```",
          "",
          "> **Type:** `(value: string) => void`",
          "",
          "---",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Container background** | `--background` | Base color for list card background |",
          "| **Border separator** | `--border` | Dividers between list rows |",
          "| **Default Hover Item** | `--muted/30` | Hover color highlight on item selection |",
          "| **Selected item background** | `bg-primary/10` / `bg-secondary/10` | Accent background overlay on active row |",
          "| **Select button indicator** | `--primary` / `--secondary` / `--destructive` | Primary/Secondary fill color for selection badges |",
          "| **Main user name** | `--foreground` | Main font color for selected items |",
          "| **Secondary metadata** | `--muted-foreground` | Font color for user roles, groups, and icons |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `SelectListItem[]` | — | (required) Array of selectable items |",
          "| `selectedId` | `string \\| number` | — | Currently selected item ID (controlled) |",
          "| `height` | `number` | `300` | Virtual list container height (px) |",
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Row density |',
          "| `debounce` | `number` | `300` | Debounce delay for onSearch (ms) |",
          '| `placeholder` | `string` | `"Search..."` | Search input placeholder |',
          '| `intent` | `"default" \\| "primary" \\| "secondary" \\| "destructive"` | `"primary"` | Selection badge color |',
          "| `disabled` | `boolean` | `false` | Disables all interactions |",
          "| `loading` | `boolean` | `false` | Skeleton loading state |",
          "| `onSelect` | `(item: SelectListItem) => void` | — | (required) Callback on item selection |",
          "| `onSearch` | `(value: string) => void` | — | External search callback |",
          "| `search` | `string` | — | External search value (controlled) |",
          '| `emptyMessage` | `string` | `"No results found"` | Empty state message |',
          '| `locale` | `UILocale` | `"en-US"` | Locale for i18n strings |',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive"],
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    data: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    height: {
      control: "number",
      table: { defaultValue: { summary: "300" } },
    },
  },
} satisfies Meta<typeof SelectList>

export default meta
type Story = StoryObj<typeof meta>

const mockData = [
  {
    id: 1,
    name: "John Smith",
    group: "Engineering",
    value: "Senior",
    icon: <User className="size-4" />,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    group: "Design",
    value: "Mid-level",
    icon: <Shield className="size-4" />,
  },
  {
    id: 3,
    name: "Michael Brown",
    group: "Product",
    value: "Junior",
    icon: <Zap className="size-4" />,
  },
  {
    id: 4,
    name: "Emily Davis",
    group: "Marketing",
    value: "Specialist",
    icon: <Mail className="size-4" />,
  },
  {
    id: 5,
    name: "David Wilson",
    group: "Engineering",
    value: "Intern",
    icon: <User className="size-4" />,
  },
]

export const Default: Story = {
  args: {
    data: mockData,
    placeholder: "Search by name...",
    height: 350,
    onSelect: (item) => console.log("Selected:", item),
    debounce: 300,
    intent: "primary",
    size: "md",
    disabled: false,
    loading: false,
    locale: "en-US",
    emptyMessage: "No results found",
  },
  parameters: {
    docs: {
      description: {
        story: "Default select list with five user entries and a search bar.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    data: [
      {
        id: 1,
        name: "João Silva",
        group: "Engineering",
        value: "Senior",
        icon: <User className="size-4" />,
      },
      {
        id: 2,
        name: "Maria Santos",
        group: "Design",
        value: "Mid-level",
        icon: <Shield className="size-4" />,
      },
      {
        id: 3,
        name: "Carlos Oliveira",
        group: "Product",
        value: "Junior",
        icon: <Zap className="size-4" />,
      },
    ],
    placeholder: "Search by name...",
    height: 350,
    locale: "pt-BR",
    onSelect: (item) => console.log("Selected:", item),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization with translated user data and placeholder.",
      },
    },
  },
}

export const Controlled: Story = {
  args: { data: mockData, onSelect: () => {} },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | number>(1)
    return (
      <div className="max-w-md">
        <SelectList
          data={mockData}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          height={300}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled select list — selectedId managed externally with onChange handler.",
      },
    },
  },
}

export const Intents: Story = {
  args: { data: mockData, onSelect: () => {} },
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {(["primary", "secondary", "destructive", "default"] as const).map(
        (intent) => (
          <div key={intent} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {intent}
            </span>
            <SelectList
              data={mockData}
              selectedId={1}
              intent={intent}
              height={250}
              onSelect={() => {}}
            />
          </div>
        )
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all four intent colors — default, primary, secondary, and destructive.",
      },
    },
  },
}

export const Loading: Story = {
  args: { data: [], loading: true, height: 300, onSelect: () => {} },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state with skeleton placeholders in place of list rows.",
      },
    },
  },
}

export const Empty: Story = {
  args: { data: [], loading: false, height: 200, onSelect: () => {} },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state displayed when no data is provided and loading is false.",
      },
    },
  },
}

export const Virtualized: Story = {
  args: { data: [], onSelect: () => {} },
  parameters: {
    docs: {
      description: {
        story:
          "500 items rendered with `@tanstack/react-virtual`. Only the visible rows are mounted in the DOM at any time — scroll performance stays flat regardless of list size.",
      },
    },
  },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<
      string | number | undefined
    >()

    const largeData = React.useMemo(() => {
      const groups = [
        "Engineering",
        "Design",
        "Product",
        "Marketing",
        "Operations",
      ]
      const levels = ["Junior", "Mid-level", "Senior", "Lead", "Principal"]
      return Array.from({ length: 500 }, (_, i) => ({
        id: i + 1,
        name: `User ${String(i + 1).padStart(3, "0")}`,
        group: groups[i % groups.length],
        value: levels[i % levels.length],
      }))
    }, [])

    return (
      <div className="flex max-w-md flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          {largeData.length} items — only visible rows are in the DOM
        </p>
        <SelectList
          data={largeData}
          selectedId={selectedId}
          onSelect={(item) => setSelectedId(item.id)}
          height={400}
          placeholder="Search 500 items..."
        />
      </div>
    )
  },
}

export const InModal: Story = {
  args: { data: mockData, onSelect: () => {} },
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | number>(1)
    const selectedItem = mockData.find((item) => item.id === selectedId)

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Layout className="mr-2 size-4" />
            {selectedItem
              ? `Selected: ${selectedItem.name}`
              : "Open Selection List"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select User</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <SelectList
              data={mockData}
              selectedId={selectedId}
              onSelect={(item) => setSelectedId(item.id)}
              height={300}
              intent="primary"
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select list rendered inside a Dialog modal for user selection workflows.",
      },
    },
  },
}
