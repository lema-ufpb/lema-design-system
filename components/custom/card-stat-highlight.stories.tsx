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
          "Seven built-in variants — `primary`, `emerald`, `amber`, `rose`, `violet`, `sky`, `white`.",
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
      options: [
        "primary",
        "emerald",
        "amber",
        "rose",
        "violet",
        "sky",
        "white",
      ],
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
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
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
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard hero KPI card with primary variant showing total revenue, up trend, and quarterly comparison.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Total Revenue",
    value: 0,
    loading: true,
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying six CardStatHighlight placeholders across all color variants while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      <CardStatHighlight
        label="Net Profit"
        value={0}
        loading
        variant="white"
        icon={TrendingUpIcon}
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
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing six hero cards across all color variants with dash placeholders when no data is available.",
      },
    },
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

export const AllSizes: Story = {
  args: { label: "Metric", value: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatHighlight component with primary, emerald, and violet variants.",
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <CardStatHighlight
              label="Total Revenue"
              value={2400000}
              format="currency"
              trend="up"
              trendValue="+18%"
              description="vs last quarter"
              icon={DollarSignIcon}
              variant="primary"
              size={size}
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
              size={size}
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
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllVariants: Story = {
  args: {
    label: "Metric",
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all seven built-in variants — primary, emerald, violet, sky, amber, rose, and white — side by side.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      <CardStatHighlight
        label="Net Profit"
        value={420000}
        format="currency"
        trend="up"
        trendValue="+12%"
        description="YTD performance"
        icon={TrendingUpIcon}
        variant="white"
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
  parameters: {
    docs: {
      description: {
        story:
          "Full-width hero KPI in emerald variant showing Q4 total revenue with 18% year-over-year growth and a trend description.",
      },
    },
  },
}
