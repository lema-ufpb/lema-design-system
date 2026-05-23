import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DollarSignIcon, UsersIcon, ShoppingCartIcon } from "lucide-react"
import { CardStatProgress } from "./card-stats"

const meta = {
  title: "Data Display/CardStatProgress",
  component: CardStatProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Value displayed against a goal with a colour-coded progress bar.",
          "Bar and percentage text shift from muted → amber → sky → emerald as the value crosses 50 / 75 / 100% of the goal.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    format: {
      control: "select",
      options: ["currency", "percent", "integer", "float"],
    },
    label: { control: "text" },
    value: { control: "number" },
    goal: { control: "number" },
    description: { control: "text" },
    showPercent: { control: "boolean" },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Monthly Orders",
    value: 1284,
    goal: 2000,
    format: "integer",
    description: "Target by end of month",
    icon: ShoppingCartIcon,
  },
}

export const Loading: Story = {
  args: {
    label: "Monthly Orders",
    value: 0,
    goal: 100,
    loading: true,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={0}
        goal={100}
        loading
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={0}
        goal={100}
        loading
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={0}
        goal={100}
        loading
        icon={UsersIcon}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Monthly Orders",
    value: 0,
    goal: 100,
    empty: true,
    icon: ShoppingCartIcon,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={0}
        goal={100}
        empty
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={0}
        goal={100}
        empty
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={0}
        goal={100}
        empty
        icon={UsersIcon}
      />
    </div>
  ),
}

export const AllGoals: Story = {
  args: {
    label: "Goal",
    value: 0,
    goal: 100,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={1284}
        goal={2000}
        format="integer"
        description="Target by end of month"
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={87500}
        goal={100000}
        format="currency"
        description="Q4 quarterly target"
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={314}
        goal={500}
        format="integer"
        description="Acquisition campaign"
        icon={UsersIcon}
      />
    </div>
  ),
}
