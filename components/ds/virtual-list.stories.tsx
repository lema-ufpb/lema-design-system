import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VirtualList } from "./virtual-list"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Data Display/VirtualList",
  component: VirtualList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A virtualized list for rendering thousands of items without performance degradation.",
          "Only the items visible in the viewport are rendered in the DOM.",
          "",
          "Uses `@tanstack/react-virtual` under the hood.",
          "",
          "## Props",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `T[]` | — | (required) Array of items to render |",
          "| `renderItem` | `(item, index) => ReactNode` | — | (required) Render function |",
          "| `estimateSize` | `number` | size-dependent | Estimated item height in px |",
          "| `height` | `number` | `400` | Container height in px |",
          "| `overscan` | `number` | `5` | Extra items to render beyond the viewport |",
          "| `loading` | `boolean` | `false` | Show skeleton rows |",
          "| `loadingCount` | `number` | `12` | Number of skeleton rows |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    height: { control: { type: "number", min: 100, max: 800, step: 50 } },
    loadingCount: { control: { type: "number", min: 1, max: 30 } },
  },
} satisfies Meta<typeof VirtualList>

export default meta
type Story = StoryObj<typeof meta>

// Generate demo data
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${(i + 1).toString().padStart(4, "0")}`,
    category: ["Alpha", "Beta", "Gamma", "Delta"][i % 4]!,
    value: Math.round(Math.random() * 10000),
    status: (["active", "inactive", "pending"] as const)[i % 3]!,
  }))

const ITEMS = generateItems(10000)
type Item = (typeof ITEMS)[0]

const statusVariant = {
  active: "default" as const,
  inactive: "secondary" as const,
  pending: "outline" as const,
}

export const Default: Story = {
  args: {
    items: ITEMS,
    height: 400,
    renderItem: (rawItem) => {
      const item = rawItem as Item
      return (
        <div className="flex h-8 items-center gap-3 border-b border-border px-4 text-sm">
          <span className="w-12 font-mono text-xs text-muted-foreground tabular-nums">
            #{item.id}
          </span>
          <span className="flex-1 truncate font-medium">{item.name}</span>
          <span className="text-xs text-muted-foreground">{item.category}</span>
          <span className="w-16 text-right tabular-nums">
            {item.value.toLocaleString()}
          </span>
          <Badge variant={statusVariant[item.status]} className="shrink-0">
            {item.status}
          </Badge>
        </div>
      )
    },
  },
  parameters: {
    docs: {
      description: {
        story: "10,000 items rendered virtually. Scroll smoothly.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    height: 400,
    loadingCount: 8,
    renderItem: () => null,
  },
}

export const EmptyState: Story = {
  args: {
    items: [],
    height: 300,
    renderItem: () => null,
    emptyContent: (
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-sm font-medium text-foreground">
          No results found
        </span>
        <span className="text-xs text-muted-foreground">
          Try adjusting your filters
        </span>
      </div>
    ),
  },
}

export const AllSizes: Story = {
  args: {
    items: [],
    renderItem: () => null,
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <VirtualList
          key={size}
          items={generateItems(1000)}
          size={size}
          height={300}
          renderItem={(rawItem) => {
            const item = rawItem as Item
            return (
              <div
                className={`flex items-center gap-2 border-b border-border px-3 ${
                  size === "sm"
                    ? "h-7 text-xs"
                    : size === "lg"
                      ? "h-9 text-base"
                      : "h-8 text-sm"
                }`}
              >
                <span className="truncate font-medium">{item.name}</span>
                <span className="ml-auto text-muted-foreground tabular-nums">
                  {item.value}
                </span>
              </div>
            )
          }}
        />
      ))}
    </div>
  ),
}

export const FewItems: Story = {
  args: {
    items: generateItems(5),
    height: 400,
    renderItem: (rawItem) => {
      const item = rawItem as Item
      return (
        <div className="flex h-8 items-center gap-3 border-b border-border px-4 text-sm">
          <span className="flex-1 font-medium">{item.name}</span>
          <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
        </div>
      )
    },
  },
}
