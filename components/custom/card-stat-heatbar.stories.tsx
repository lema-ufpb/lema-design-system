import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeartIcon, ZapIcon, ShieldCheckIcon } from "lucide-react"
import { CardStatHeatbar } from "./card-stats"

const meta = {
  title: "Data Display/CardStatHeatbar",
  component: CardStatHeatbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Segmented colour bar with a triangle pointer.",
          "Hover to see value + zone name in a Tooltip. Zone ranges and colours are fully configurable.",
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
    min: { control: "number" },
    max: { control: "number" },
    description: { control: "text" },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    icon: { table: { disable: true } },
    zones: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatHeatbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Customer Satisfaction",
    value: 87,
    description: "Based on 2,847 responses this month",
    icon: HeartIcon,
  },
}

export const Loading: Story = {
  args: {
    label: "Customer Satisfaction",
    value: 0,
    loading: true,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatHeatbar
        label="Customer Satisfaction"
        value={0}
        loading
        icon={HeartIcon}
      />
      <CardStatHeatbar
        label="Page Load Speed"
        value={0}
        loading
        icon={ZapIcon}
      />
      <CardStatHeatbar
        label="Security Score"
        value={0}
        loading
        icon={ShieldCheckIcon}
      />
      <CardStatHeatbar label="SLA Compliance" value={0} loading />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Customer Satisfaction",
    value: 0,
    empty: true,
    icon: HeartIcon,
    description: "Based on survey responses",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatHeatbar
        label="Customer Satisfaction"
        value={0}
        empty
        description="Based on survey responses"
        icon={HeartIcon}
      />
      <CardStatHeatbar
        label="Page Load Speed"
        value={0}
        empty
        description="Core Web Vitals average"
        icon={ZapIcon}
        zones={[
          { label: "Fast", color: "#10b981", max: 25 },
          { label: "OK", color: "#3b82f6", max: 50 },
          { label: "Slow", color: "#f59e0b", max: 75 },
          { label: "Poor", color: "#ef4444", max: 100 },
        ]}
      />
      <CardStatHeatbar
        label="Security Score"
        value={0}
        empty
        description="Last audit pending"
        icon={ShieldCheckIcon}
      />
      <CardStatHeatbar
        label="SLA Compliance"
        value={0}
        empty
        description="Uptime target: 99.5%"
      />
    </div>
  ),
}

export const AllHeatbars: Story = {
  args: {
    label: "Heatbar",
    value: 0,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatHeatbar
        label="Customer Satisfaction"
        value={87}
        description="Based on 2,847 responses this month"
        icon={HeartIcon}
      />
      <CardStatHeatbar
        label="Page Load Speed"
        value={1.4}
        min={0}
        max={5}
        valueFormatter={(v) => `${v}s`}
        description="Core Web Vitals average"
        icon={ZapIcon}
        zones={[
          { label: "Fast", color: "#10b981", max: 25 },
          { label: "OK", color: "#3b82f6", max: 50 },
          { label: "Slow", color: "#f59e0b", max: 75 },
          { label: "Poor", color: "#ef4444", max: 100 },
        ]}
      />
      <CardStatHeatbar
        label="Security Score"
        value={64}
        description="Last audit: 3 medium issues open"
        icon={ShieldCheckIcon}
        zones={[
          { label: "Critical", color: "#ef4444", max: 25 },
          { label: "At risk", color: "#f97316", max: 50 },
          { label: "Fair", color: "#f59e0b", max: 75 },
          { label: "Secure", color: "#10b981", max: 100 },
        ]}
      />
      <CardStatHeatbar
        label="SLA Compliance"
        value={98.7}
        format="percent"
        decimals={1}
        description="Uptime target: 99.5%"
        zones={[
          { label: "Breach", color: "#ef4444", max: 95 },
          { label: "Warning", color: "#f59e0b", max: 99 },
          { label: "On target", color: "#10b981", max: 100 },
        ]}
      />
    </div>
  ),
}
