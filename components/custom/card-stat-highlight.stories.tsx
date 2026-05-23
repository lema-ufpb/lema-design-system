import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  DollarSignIcon,
  HeartIcon,
  StarIcon,
  ShoppingCartIcon,
  PackageIcon,
  ActivityIcon,
  TrendingUpIcon,
} from "lucide-react"
import { CardStatHighlight } from "./card-stats"

const meta = {
  title: "Data Display/CardStatHighlight",
  component: CardStatHighlight,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Hero KPI card with a solid coloured background.",
          "Six built-in variants — `primary`, `emerald`, `amber`, `rose`, `violet`, `sky`.",
          "Two decorative circles add depth. Trend and description appear below the value.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    format: {
      control: "select",
      options: ["currency", "percent", "integer", "float"],
    },
    variant: {
      control: "select",
      options: ["primary", "emerald", "amber", "rose", "violet", "sky"],
    },
    trend: {
      control: "select",
      options: ["up", "down", "neutral", true, false],
    },
    decimals: { control: { type: "number", min: 0, max: 5 } },
    label: { control: "text" },
    value: { control: "number" },
    trendValue: { control: "text" },
    description: { control: "text" },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatHighlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: 2400000,
    format: "currency",
    trend: "up",
    trendValue: "+18%",
    description: "vs last quarter",
    icon: DollarSignIcon,
    variant: "primary",
  },
}

export const Loading: Story = {
  args: {
    label: "Total Revenue",
    value: 0,
    loading: true,
    variant: "primary",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <CardStatHighlight
        label="Total Revenue"
        value={0}
        loading
        variant="primary"
        icon={DollarSignIcon}
      />
      <CardStatHighlight
        label="Satisfaction"
        value={0}
        loading
        variant="emerald"
        icon={HeartIcon}
      />
      <CardStatHighlight
        label="Subscriptions"
        value={0}
        loading
        variant="violet"
        icon={StarIcon}
      />
      <CardStatHighlight
        label="Avg. Order"
        value={0}
        loading
        variant="sky"
        icon={ShoppingCartIcon}
      />
      <CardStatHighlight
        label="Shipments"
        value={0}
        loading
        variant="amber"
        icon={PackageIcon}
      />
      <CardStatHighlight
        label="Refund Rate"
        value={0}
        loading
        variant="rose"
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Total Revenue",
    value: 0,
    empty: true,
    variant: "primary",
    icon: DollarSignIcon,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <CardStatHighlight
        label="Total Revenue"
        value={0}
        empty
        variant="primary"
        icon={DollarSignIcon}
      />
      <CardStatHighlight
        label="Satisfaction"
        value={0}
        empty
        variant="emerald"
        icon={HeartIcon}
      />
      <CardStatHighlight
        label="Subscriptions"
        value={0}
        empty
        variant="violet"
        icon={StarIcon}
      />
      <CardStatHighlight
        label="Avg. Order"
        value={0}
        empty
        variant="sky"
        icon={ShoppingCartIcon}
      />
      <CardStatHighlight
        label="Shipments"
        value={0}
        empty
        variant="amber"
        icon={PackageIcon}
      />
      <CardStatHighlight
        label="Refund Rate"
        value={0}
        empty
        variant="rose"
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const AllVariants: Story = {
  args: {
    label: "Metric",
    value: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <CardStatHighlight
        label="Total Revenue"
        value={2400000}
        format="currency"
        trend="up"
        trendValue="+18%"
        description="vs last quarter"
        icon={DollarSignIcon}
        variant="primary"
      />
      <CardStatHighlight
        label="Customer Satisfaction"
        value={96.4}
        format="percent"
        decimals={1}
        trend="up"
        trendValue="+2.1pts"
        description="NPS this month"
        icon={HeartIcon}
        variant="emerald"
      />
      <CardStatHighlight
        label="Active Subscriptions"
        value={12847}
        format="integer"
        trend="up"
        trendValue="+847"
        description="new this month"
        icon={StarIcon}
        variant="violet"
      />
      <CardStatHighlight
        label="Avg. Order Value"
        value={67.4}
        format="currency"
        trend="up"
        trendValue="+$4.20"
        description="vs last month"
        icon={ShoppingCartIcon}
        variant="sky"
      />
      <CardStatHighlight
        label="Pending Shipments"
        value={248}
        format="integer"
        trend="down"
        trendValue="−12%"
        description="processing backlog"
        icon={PackageIcon}
        variant="amber"
      />
      <CardStatHighlight
        label="Refund Rate"
        value={1.8}
        format="percent"
        decimals={1}
        trend="up"
        trendValue="+0.3%"
        description="needs attention"
        icon={ActivityIcon}
        variant="rose"
      />
    </div>
  ),
}

export const BannerKPI: Story = {
  args: {
    label: "Total Revenue — Q4 2024",
    value: 2400000,
    format: "currency",
    trend: "up",
    trendValue: "+18% YoY",
    description: "ahead of forecast",
    icon: TrendingUpIcon,
    variant: "emerald",
  },
}
