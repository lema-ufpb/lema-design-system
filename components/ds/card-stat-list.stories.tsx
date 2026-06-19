import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart2Icon, ZapIcon } from "lucide-react"
import { CardStatList } from "./card-stats"

const meta = {
  title: "Data Display/CardStatList",
  component: CardStatList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Multiple metrics stacked in a single card.",
          "Each row has a hover highlight. Trend icons and values are colour-coded: green / red / muted.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    empty: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    icon: { table: { disable: true } },
    items: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Performance Overview",
    icon: BarChart2Icon,
    size: "md",
    items: [
      {
        label: "Sessions",
        value: 57891,
        format: "integer",
        trend: "up",
        trendValue: "+12%",
      },
      {
        label: "Bounce Rate",
        value: 34.2,
        format: "percent",
        decimals: 1,
        trend: "down",
        trendValue: "−3pts",
      },
      {
        label: "Avg. Duration",
        value: "3m 42s",
        trend: "up",
        trendValue: "+8%",
      },
      {
        label: "Conversions",
        value: 1284,
        format: "integer",
        trend: "up",
        trendValue: "+8%",
      },
      {
        label: "Revenue / Session",
        value: 2.15,
        format: "currency",
        trend: "neutral",
        trendValue: "0%",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard stacked metrics card displaying five performance indicators with trend icons and color-coded values.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Performance Overview",
    items: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying two CardStatList placeholders while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatList
        label="Performance Overview"
        items={[]}
        loading
        icon={BarChart2Icon}
      />
      <CardStatList label="Top Channels" items={[]} loading icon={ZapIcon} />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Performance Overview",
    items: [],
    empty: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing two list cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatList
        label="Performance Overview"
        items={[]}
        empty
        icon={BarChart2Icon}
      />
      <CardStatList label="Top Channels" items={[]} empty icon={ZapIcon} />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Metric", items: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatList component with five performance metrics.",
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
          <CardStatList
            label="Performance Overview"
            icon={BarChart2Icon}
            size={size}
            items={[
              {
                label: "Sessions",
                value: 57891,
                format: "integer",
                trend: "up",
                trendValue: "+12%",
              },
              {
                label: "Bounce Rate",
                value: 34.2,
                format: "percent",
                decimals: 1,
                trend: "down",
                trendValue: "−3pts",
              },
              {
                label: "Avg. Duration",
                value: "3m 42s",
                trend: "up",
                trendValue: "+8%",
              },
              {
                label: "Conversions",
                value: 1284,
                format: "integer",
                trend: "up",
                trendValue: "+8%",
              },
              {
                label: "Revenue / Session",
                value: 2.15,
                format: "currency",
                trend: "neutral",
                trendValue: "0%",
              },
            ]}
          />
        </div>
      ))}
    </div>
  ),
}

export const TopChannels: Story = {
  args: {
    label: "Top Channels",
    icon: ZapIcon,
    items: [
      {
        label: "Organic Search",
        value: 41.2,
        format: "percent",
        decimals: 1,
        trend: "up",
        trendValue: "+4%",
      },
      {
        label: "Direct",
        value: 22.7,
        format: "percent",
        decimals: 1,
        trend: "neutral",
        trendValue: "0%",
      },
      {
        label: "Social Media",
        value: 18.4,
        format: "percent",
        decimals: 1,
        trend: "up",
        trendValue: "+6%",
      },
      {
        label: "Email",
        value: 11.3,
        format: "percent",
        decimals: 1,
        trend: "down",
        trendValue: "−2%",
      },
      {
        label: "Paid Ads",
        value: 6.4,
        format: "percent",
        decimals: 1,
        trend: "down",
        trendValue: "−8%",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates a marketing channels use case with organic search, direct, social media, email, and paid ads breakdown.",
      },
    },
  },
}
