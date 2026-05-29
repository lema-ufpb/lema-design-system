import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DollarSignIcon, ActivityIcon } from "lucide-react"
import { CardStatComparison } from "./card-stats"

const meta = {
  title: "Data Display/CardStatComparison",
  component: CardStatComparison,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Current vs previous period side by side.",
          "Delta is computed automatically — `(current − previous) / |previous|`.",
          "A TrendBadge reflects the direction of change.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    format: {
      control: "select",
      options: ["currency", "percent", "integer", "float"],
    },
    decimals: { control: { type: "number", min: 0, max: 5 } },
    label: { control: "text" },
    current: { control: "number" },
    previous: { control: "number" },
    currentLabel: { control: "text" },
    previousLabel: { control: "text" },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatComparison>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Monthly Revenue",
    current: 124500,
    previous: 98200,
    format: "currency",
    currentLabel: "This month",
    previousLabel: "Last month",
    icon: DollarSignIcon,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard configuration comparing current month revenue against the previous month with automatic delta calculation.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Monthly Revenue",
    current: 0,
    previous: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying two CardStatComparison placeholders while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatComparison
        label="Monthly Revenue"
        current={0}
        previous={0}
        loading
        icon={DollarSignIcon}
      />
      <CardStatComparison
        label="Session Duration"
        current={0}
        previous={0}
        loading
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Monthly Revenue",
    current: 0,
    previous: 0,
    empty: true,
    icon: DollarSignIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing two comparison cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatComparison
        label="Monthly Revenue"
        current={0}
        previous={0}
        empty
        currentLabel="This month"
        previousLabel="Last month"
        icon={DollarSignIcon}
      />
      <CardStatComparison
        label="Session Duration"
        current={0}
        previous={0}
        empty
        currentLabel="This week"
        previousLabel="Last week"
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Comparison", current: 0, previous: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatComparison component.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-mono text-xs text-muted-foreground">
            {`size="${size}"`}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CardStatComparison
              label="Monthly Revenue"
              current={124500}
              previous={98200}
              format="currency"
              currentLabel="This month"
              previousLabel="Last month"
              icon={DollarSignIcon}
              size={size}
            />
            <CardStatComparison
              label="Session Duration"
              current={3.7}
              previous={4.1}
              format="float"
              decimals={1}
              valueFormatter={(v) => `${v} min`}
              currentLabel="This week"
              previousLabel="Last week"
              icon={ActivityIcon}
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllComparisons: Story = {
  args: {
    label: "Comparison",
    current: 0,
    previous: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of monthly revenue and session duration with auto-computed deltas.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatComparison
        label="Monthly Revenue"
        current={124500}
        previous={98200}
        format="currency"
        currentLabel="This month"
        previousLabel="Last month"
        icon={DollarSignIcon}
      />
      <CardStatComparison
        label="Session Duration"
        current={3.7}
        previous={4.1}
        format="float"
        decimals={1}
        valueFormatter={(v) => `${v} min`}
        currentLabel="This week"
        previousLabel="Last week"
        icon={ActivityIcon}
      />
    </div>
  ),
}
