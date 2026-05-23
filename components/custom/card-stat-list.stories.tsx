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
    loading: { control: "boolean" },
    empty: { control: "boolean" },
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
}

export const Loading: Story = {
  args: {
    label: "Performance Overview",
    items: [],
    loading: true,
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
}
