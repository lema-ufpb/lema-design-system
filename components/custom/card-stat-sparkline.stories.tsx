import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  DollarSignIcon,
  ShoppingCartIcon,
  ActivityIcon,
  EyeIcon,
} from "lucide-react"
import { CardStatSparkline } from "./card-stats"

const WEEKLY_SESSIONS = [32400, 38100, 35600, 41200, 39800, 48500, 57891]
const WEEKLY_REVENUE = [18200, 21500, 19800, 24100, 22900, 28400, 31750]
const WEEKLY_ORDERS = [310, 365, 340, 398, 381, 452, 521]
const WEEKLY_BOUNCE = [42, 39, 41, 36, 38, 34, 32]

const meta = {
  title: "Data Display/CardStatSparkline",
  component: CardStatSparkline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Value + a smooth Catmull-Rom sparkline rendered in pure SVG (no extra deps).",
          "The line colour and area-fill gradient respond to trend — green for up, red for down.",
          "A dot marks the last data point.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    format: {
      control: "select",
      options: ["currency", "percent", "integer", "float"],
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
    data: { table: { disable: true } },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatSparkline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Weekly Sessions",
    value: 57891,
    format: "integer",
    data: WEEKLY_SESSIONS,
    trend: "up",
    trendValue: "+5.2% vs last week",
    icon: EyeIcon,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard sparkline card showing weekly sessions with an upward Catmull-Rom SVG line chart and trend badge.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Weekly Sessions",
    value: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying four CardStatSparkline placeholders while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatSparkline
        label="Weekly Sessions"
        value={0}
        loading
        icon={EyeIcon}
      />
      <CardStatSparkline
        label="Revenue"
        value={0}
        loading
        icon={DollarSignIcon}
      />
      <CardStatSparkline
        label="Orders"
        value={0}
        loading
        icon={ShoppingCartIcon}
      />
      <CardStatSparkline
        label="Bounce Rate"
        value={0}
        loading
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Weekly Sessions",
    value: 0,
    empty: true,
    icon: EyeIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing four sparkline cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatSparkline
        label="Weekly Sessions"
        value={0}
        empty
        icon={EyeIcon}
      />
      <CardStatSparkline
        label="Revenue"
        value={0}
        empty
        icon={DollarSignIcon}
      />
      <CardStatSparkline
        label="Orders"
        value={0}
        empty
        icon={ShoppingCartIcon}
      />
      <CardStatSparkline
        label="Bounce Rate"
        value={0}
        empty
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Metric", value: 0, data: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatSparkline component with sessions, revenue, orders, and bounce rate.",
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CardStatSparkline
              label="Weekly Sessions"
              value={57891}
              format="integer"
              data={WEEKLY_SESSIONS}
              trend="up"
              trendValue="+5.2% vs last week"
              icon={EyeIcon}
              size={size}
            />
            <CardStatSparkline
              label="Revenue"
              value={31750}
              format="currency"
              data={WEEKLY_REVENUE}
              trend="up"
              trendValue="+11.8% vs last week"
              icon={DollarSignIcon}
              size={size}
            />
            <CardStatSparkline
              label="Orders"
              value={521}
              format="integer"
              data={WEEKLY_ORDERS}
              trend="up"
              trendValue="+15.2% vs last week"
              icon={ShoppingCartIcon}
              size={size}
            />
            <CardStatSparkline
              label="Bounce Rate"
              value={32.4}
              format="percent"
              decimals={1}
              data={WEEKLY_BOUNCE}
              trend="down"
              trendValue="−5.9% vs last week"
              icon={ActivityIcon}
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllMetrics: Story = {
  args: {
    label: "Metric",
    value: 0,
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates four sparkline metrics — weekly sessions, revenue, orders, and bounce rate — with up and down trends.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatSparkline
        label="Weekly Sessions"
        value={57891}
        format="integer"
        data={WEEKLY_SESSIONS}
        trend="up"
        trendValue="+5.2% vs last week"
        icon={EyeIcon}
      />
      <CardStatSparkline
        label="Revenue"
        value={31750}
        format="currency"
        data={WEEKLY_REVENUE}
        trend="up"
        trendValue="+11.8% vs last week"
        icon={DollarSignIcon}
      />
      <CardStatSparkline
        label="Orders"
        value={521}
        format="integer"
        data={WEEKLY_ORDERS}
        trend="up"
        trendValue="+15.2% vs last week"
        icon={ShoppingCartIcon}
      />
      <CardStatSparkline
        label="Bounce Rate"
        value={32.4}
        format="percent"
        decimals={1}
        data={WEEKLY_BOUNCE}
        trend="down"
        trendValue="−5.9% vs last week"
        icon={ActivityIcon}
      />
    </div>
  ),
}
