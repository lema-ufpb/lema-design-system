import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  AlertTriangleIcon,
  CalendarIcon,
  CheckCircleIcon,
  FileTextIcon,
  LayersIcon,
  StarIcon,
  TagIcon,
  XCircleIcon,
} from "lucide-react"
import { useState } from "react"
import { PillGroup } from "@/components/ds/pill-group"

// ── Datasets ───────────────────────────────────────────────────────────────

const AUDIT_ITEMS = [
  { value: "all", label: "All", count: 120 },
  { value: "normal", label: "Normal Audit", count: 45 },
  { value: "malha", label: "Tax Mesh", count: 38 },
  { value: "both", label: "Permanent Track", count: 37 },
]

const PRIORITY_ITEMS = [
  { value: "all", label: "All", count: 95 },
  {
    value: "critical",
    label: "Critical",
    count: 8,
    intent: "destructive" as const,
  },
  { value: "high", label: "High", count: 22, intent: "warning" as const },
  { value: "medium", label: "Medium", count: 41, intent: "default" as const },
  { value: "low", label: "Low", count: 24, intent: "success" as const },
]

const STATUS_ITEMS = [
  { value: "all", label: "All", count: 200 },
  { value: "open", label: "Open", count: 74, icon: FileTextIcon },
  { value: "scheduled", label: "Scheduled", count: 48, icon: CalendarIcon },
  {
    value: "resolved",
    label: "Resolved",
    count: 63,
    icon: CheckCircleIcon,
    intent: "success" as const,
  },
  {
    value: "closed",
    label: "Closed",
    count: 15,
    icon: XCircleIcon,
    intent: "destructive" as const,
  },
]

const MANY_ITEMS = [
  { value: "all", label: "All", count: 500 },
  { value: "a", label: "Category A", count: 120 },
  { value: "b", label: "Category B", count: 95 },
  { value: "c", label: "Category C", count: 84 },
  { value: "d", label: "Category D", count: 73 },
  { value: "e", label: "Category E", count: 61 },
  { value: "f", label: "Category F", count: 47 },
  { value: "g", label: "Category G", count: 20 },
]

const PARTIAL_ITEMS = [
  { value: "all", label: "All", count: 150 },
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done", count: 63 },
  { value: "blocked", label: "Blocked" },
]

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: "Forms/PillGroup",
  component: PillGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A horizontal pill-shaped filter bar where each pill represents a filter option.",
          "",
          "Designed to sit above data tables, lists, or chart panels as a compact category selector.",
          "Supports single-select and multi-select modes, optional item counts, per-item icons,",
          "per-item intent colors, and automatic scroll overflow with fade indicators.",
          "",
          "## Features",
          "- **Single / multi-select** — controlled or uncontrolled",
          "- **Intent colors** — per-item active color: `default`, `success`, `warning`, `destructive`",
          "- **Scroll overflow** — gradient fades appear automatically when items exceed container width",
          "- **Icon support** — any Lucide icon component per item",
          "- **Count display** — locale-aware numeric suffix, auto-enabled when items have counts",
          "- **Loading state** — skeleton pills matching the real layout",
          "",
          "## Design Tokens",
          "",
          "| Element | Token |",
          "| --- | --- |",
          "| Track background | `--muted/30` |",
          "| Inactive text | `--muted-foreground` |",
          "| Active (default) | `--foreground` / `--background` |",
          "| Active success | `--success` / `--success-foreground` |",
          "| Active warning | `--warning` / `--warning-foreground` |",
          "| Active destructive | `--destructive` / `--destructive-foreground` |",
          "| Scroll fade | `--background/80` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    multiple: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showCount: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
  args: {
    items: AUDIT_ITEMS,
  },
} satisfies Meta<typeof PillGroup>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: AUDIT_ITEMS,
    defaultValue: "all",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default single-select filter bar. The first item acts as an "All" option. Counts are shown automatically because the items include `count` fields.',
      },
    },
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 shrink-0 text-xs font-medium text-muted-foreground">
            {size}
          </span>
          <PillGroup {...args} size={size} defaultValue="all" />
        </div>
      ))}
    </div>
  ),
  args: { items: AUDIT_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of the three size presets. Typography and pill height scale together following the design system size convention.",
      },
    },
  },
}

export const WithIntents: Story = {
  args: {
    items: PRIORITY_ITEMS,
    defaultValue: "critical",
    label: "Filter by priority",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Each item carries its own `intent` field. When active, the pill fills with the corresponding semantic color — useful for risk-matrix and status filters.",
      },
    },
  },
}

export const WithIcons: Story = {
  args: {
    items: STATUS_ITEMS,
    defaultValue: "all",
    label: "Filter by status",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items can include a Lucide icon component via the `icon` field. The icon scales with the `size` prop and is always hidden from assistive technology.",
      },
    },
  },
}

export const MultiSelect: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(["normal", "malha"])
    return (
      <div className="flex flex-col gap-3">
        <PillGroup
          {...args}
          multiple
          value={selected}
          onChange={(v) => setSelected(v as string[])}
        />
        <p className="text-xs text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">
            {selected.length > 0 ? selected.join(", ") : "none"}
          </span>
        </p>
      </div>
    )
  },
  args: {
    items: AUDIT_ITEMS.filter((i) => i.value !== "all"),
    label: "Audit types",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `multiple` to allow selecting any combination of items. Each pill toggles independently. The `onChange` callback receives a `string[]`.",
      },
    },
  },
}

export const ScrollOverflow: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">
        Constrained to 360px — scroll to see fade indicators
      </p>
      <div className="w-[360px]">
        <PillGroup {...args} defaultValue="all" />
      </div>
    </div>
  ),
  args: { items: MANY_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "When items overflow the container width, gradient fade indicators appear on the overflowing edges. The bar scrolls horizontally while the fades update reactively via `ResizeObserver`.",
      },
    },
  },
}

export const NoCount: Story = {
  args: {
    items: AUDIT_ITEMS,
    defaultValue: "all",
    showCount: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `showCount={false}` to suppress counts globally — useful when the numbers are not meaningful in a given context.",
      },
    },
  },
}

export const PartialCounts: Story = {
  args: {
    items: PARTIAL_ITEMS,
    defaultValue: "all",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items without a `count` field simply show no count, while others display their number. `showCount` is still auto-enabled because at least one item has a count.",
      },
    },
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>("all")
    return (
      <div className="flex flex-col gap-3">
        <PillGroup
          {...args}
          value={value}
          onChange={(v) => setValue(v as string | null)}
        />
        <p className="text-xs text-muted-foreground">
          Active filter:{" "}
          <span className="font-medium text-foreground">
            {value ?? "none (click active pill to deselect)"}
          </span>
        </p>
      </div>
    )
  },
  args: { items: PRIORITY_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled mode — value and setter are managed externally. Clicking the active pill deselects it (value becomes `null`).",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Group disabled (all items)
        </p>
        <PillGroup items={AUDIT_ITEMS} defaultValue="all" disabled />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Individual items disabled
        </p>
        <PillGroup
          items={[
            { value: "all", label: "All", count: 120 },
            { value: "normal", label: "Normal Audit", count: 45 },
            { value: "malha", label: "Tax Mesh", count: 38, disabled: true },
            { value: "both", label: "Permanent", count: 37, disabled: true },
          ]}
          defaultValue="all"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `disabled` prop disables the entire group. Individual items can be disabled via their own `disabled` field on the item object.",
      },
    },
  },
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 shrink-0 text-xs font-medium text-muted-foreground">
            {size}
          </span>
          <PillGroup items={AUDIT_ITEMS} size={size} loading />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` while data is fetching. Skeleton pills matching the real layout prevent layout shift when data arrives. The number of skeleton pills matches `items.length` when items are known.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Locale: pt-BR — contagens formatadas com separador brasileiro
        </p>
        <PillGroup
          locale="pt-BR"
          items={[
            { value: "todos", label: "Todos", count: 1234 },
            { value: "normal", label: "Auditoria Normal", count: 456 },
            { value: "malha", label: "Malha Fiscal", count: 389 },
            { value: "permanente", label: "Acomp. Permanente", count: 389 },
          ]}
          defaultValue="todos"
          label="Filtrar por tipo de auditoria"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `locale` prop is forwarded to `Intl.NumberFormat` for count formatting and to the i18n dictionary for the group's accessible label.",
      },
    },
  },
}

export const RiskMatrixExample: Story = {
  render: () => {
    const [filter, setFilter] = useState<string | null>(null)
    const items = [
      { value: "all", label: "All Entries", count: 95 },
      {
        value: "critical",
        label: "Critical",
        count: 8,
        icon: AlertTriangleIcon,
        intent: "destructive" as const,
      },
      {
        value: "high",
        label: "High",
        count: 22,
        icon: StarIcon,
        intent: "warning" as const,
      },
      {
        value: "medium",
        label: "Medium",
        count: 41,
        icon: LayersIcon,
        intent: "default" as const,
      },
      {
        value: "low",
        label: "Low",
        count: 24,
        icon: TagIcon,
        intent: "success" as const,
      },
    ]
    return (
      <div className="flex flex-col gap-3 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Risk Matrix</span>
          <span className="text-xs text-muted-foreground">
            Showing:{" "}
            {filter ? (items.find((i) => i.value === filter)?.count ?? 0) : 95}{" "}
            entries
          </span>
        </div>
        <PillGroup
          items={items}
          value={filter}
          onChange={(v) => setFilter(v as string | null)}
          label="Filter by risk level"
        />
        <div className="flex h-24 items-center justify-center rounded-lg bg-muted/40">
          <span className="text-xs text-muted-foreground">
            {filter
              ? `Showing ${items.find((i) => i.value === filter)?.label} entries`
              : "Showing all entries"}
          </span>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Realistic usage above a data panel — mirrors the original `RiskMatrixFilterBar` use case with intent-colored pills and live count feedback.",
      },
    },
  },
}
