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
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | — | (required) Metric label |",
          "| `value` | `number` | — | (required) Current value |",
          "| `format` | `currency` \\| `percent` \\| `integer` \\| `float` | — | Numeric formatting preset |",
          "| `decimals` | `number` | — | Number of fraction digits |",
          "| `locale` | `string` | `en-US` | BCP 47 locale string |",
          "| `currency` | `string` | `USD` | ISO 4217 currency code |",
          "| `abbreviate` | `boolean` | `false` | Abbreviate large numbers (locale-aware) |",
          "| `valueFormatter` | `(value: number \\| string) => string` | — | Overrides format/decimals/locale/currency |",
          "| `min` | `number` | `0` | Minimum gauge value |",
          "| `max` | `number` | `100` | Maximum gauge value |",
          "| `description` | `string` | — | Secondary text below the value |",
          "| `zones` | `CardStatGaugeZone[]` | — | Custom zone segments (label, color, max) |",
          "| `icon` | `React.ElementType` | — | Icon component in the header |",
          "| `size` | `sm` \\| `md` \\| `lg` | `md` | Size preset |",
          "| `loading` | `boolean` | `false` | Show skeleton while data is fetching |",
          "| `empty` | `boolean` | `false` | Show empty state when no data is available |",
          "| `className` | `string` | — | Additional CSS classes |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    format: {
      control: "inline-radio",
      options: ["currency", "percent", "integer", "float"],
      table: { defaultValue: { summary: "—" } },
    },
    decimals: {
      control: { type: "number", min: 0, max: 5 },
      table: { defaultValue: { summary: "—" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    currency: {
      control: "text",
      table: { defaultValue: { summary: "USD" } },
    },
    abbreviate: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: { control: "text", table: { defaultValue: { summary: "—" } } },
    value: { control: "number", table: { defaultValue: { summary: "—" } } },
    min: { control: "number", table: { defaultValue: { summary: "0" } } },
    max: { control: "number", table: { defaultValue: { summary: "100" } } },
    description: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    empty: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
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
    format: "integer",
    decimals: 0,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    min: 0,
    max: 100,
    description: "Promoters vs detractors",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard semi-circular SVG gauge showing an NPS score of 78 out of 100 with default color zones.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "NPS Score",
    value: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying four CardStatGauge placeholders while data is being fetched.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing four gauge cards with dash placeholders when no data is available.",
      },
    },
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

export const AllSizes: Story = {
  args: { label: "Gauge", value: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatGauge component with various metrics.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">{`size="${size}"`}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CardStatGauge
              label="NPS Score"
              value={78}
              min={0}
              max={100}
              description="Promoters vs detractors"
              size={size}
            />
            <CardStatGauge
              label="CPU Usage"
              value={42}
              min={0}
              max={100}
              valueFormatter={(v) => `${v}%`}
              description="Production cluster avg"
              icon={CpuIcon}
              size={size}
            />
            <CardStatGauge
              label="Quality Score"
              value={91}
              min={0}
              max={100}
              description="Code review pipeline"
              icon={ShieldCheckIcon}
              size={size}
            />
            <CardStatGauge
              label="Team Velocity"
              value={34}
              min={0}
              max={60}
              valueFormatter={(v) => `${v} pts`}
              description="Story points per sprint"
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllGauges: Story = {
  args: {
    label: "Gauge",
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates four gauge configurations — NPS score, CPU usage with custom zones, quality score, and team velocity.",
      },
    },
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
