import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CpuIcon, ShieldCheckIcon } from "lucide-react"
import { CardStatGauge } from "./card-stats"

const meta = {
  title: "Data Display/CardStatGauge",
  component: CardStatGauge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Semi-circular SVG gauge with coloured zone segments.",
          "The filled arc and its dot adopt the zone colour. Custom zones can be passed via the `zones` prop.",
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
} satisfies Meta<typeof CardStatGauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "NPS Score",
    value: 78,
    min: 0,
    max: 100,
    description: "Promoters vs detractors",
  },
}

export const Loading: Story = {
  args: {
    label: "NPS Score",
    value: 0,
    loading: true,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <CardStatGauge label="NPS Score" value={0} loading />
      <CardStatGauge label="CPU Usage" value={0} loading icon={CpuIcon} />
      <CardStatGauge
        label="Quality Score"
        value={0}
        loading
        icon={ShieldCheckIcon}
      />
      <CardStatGauge label="Team Velocity" value={0} loading />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "NPS Score",
    value: 0,
    empty: true,
    description: "Awaiting survey responses",
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <CardStatGauge
        label="NPS Score"
        value={0}
        empty
        description="Awaiting survey responses"
      />
      <CardStatGauge
        label="CPU Usage"
        value={0}
        empty
        description="No metrics collected"
        icon={CpuIcon}
      />
      <CardStatGauge
        label="Quality Score"
        value={0}
        empty
        description="Pipeline not configured"
        icon={ShieldCheckIcon}
      />
      <CardStatGauge
        label="Team Velocity"
        value={0}
        empty
        description="No sprints completed"
      />
    </div>
  ),
}

export const AllGauges: Story = {
  args: {
    label: "Gauge",
    value: 0,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <CardStatGauge
        label="NPS Score"
        value={78}
        min={0}
        max={100}
        description="Promoters vs detractors"
      />
      <CardStatGauge
        label="CPU Usage"
        value={42}
        min={0}
        max={100}
        valueFormatter={(v) => `${v}%`}
        description="Production cluster avg"
        icon={CpuIcon}
        zones={[
          { label: "Low", color: "#10b981", max: 50 },
          { label: "Medium", color: "#f59e0b", max: 80 },
          { label: "High", color: "#f97316", max: 95 },
          { label: "Critical", color: "#ef4444", max: 100 },
        ]}
      />
      <CardStatGauge
        label="Quality Score"
        value={91}
        min={0}
        max={100}
        description="Code review pipeline"
        icon={ShieldCheckIcon}
      />
      <CardStatGauge
        label="Team Velocity"
        value={34}
        min={0}
        max={60}
        valueFormatter={(v) => `${v} pts`}
        description="Story points per sprint"
        zones={[
          { label: "Behind", color: "#ef4444", max: 25 },
          { label: "On track", color: "#f59e0b", max: 50 },
          { label: "Ahead", color: "#10b981", max: 100 },
        ]}
      />
    </div>
  ),
}
