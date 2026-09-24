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
          "| `min` | `number` | `0` | Minimum bar value |",
          "| `max` | `number` | `100` | Maximum bar value |",
          "| `description` | `string` | — | Secondary text below the value |",
          "| `zones` | `CardStatHeatbarZone[]` | — | Custom zone segments (label, color, max) |",
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
} satisfies Meta<typeof CardStatHeatbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Customer Satisfaction",
    value: 87,
    format: "integer",
    decimals: 0,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    description: "Based on 2,847 responses this month",
    icon: HeartIcon,
    size: "sm",
    min: 0,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard segmented color bar showing customer satisfaction at 87 with a triangle pointer and tooltip on hover.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Customer Satisfaction",
    value: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying four CardStatHeatbar placeholders while data is being fetched.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing four heatbar cards with dash placeholders when no data is available.",
      },
    },
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

export const AllSizes: Story = {
  args: { label: "Heatbar", value: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatHeatbar component with custom zone configurations.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">{`size="${size}"`}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CardStatHeatbar
              label="Customer Satisfaction"
              value={87}
              description="Based on 2,847 responses this month"
              icon={HeartIcon}
              size={size}
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
              size={size}
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
              size={size}
            />
            <CardStatHeatbar
              label="SLA Compliance"
              value={0.987}
              min={0}
              max={1}
              format="percent"
              decimals={1}
              description="Uptime target: 99.5%"
              zones={[
                { label: "Breach", color: "#ef4444", max: 95 },
                { label: "Warning", color: "#f59e0b", max: 99 },
                { label: "On target", color: "#10b981", max: 100 },
              ]}
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const PercentLocale: Story = {
  args: {
    label: "Escore de Risco",
    value: 0.992,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regression check: `value` is a 0-1 fraction rendered with `format="percent"`. The two cards use the same value with different `locale` — the headline must respect the decimal separator ("99,2%" for pt-BR vs "99.2%" for en-US), matching the sibling CardStatProgress component. Before the fix, `locale` was dropped when formatting the headline and both always rendered with a period regardless of the `locale` prop.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <CardStatHeatbar
        label="Risk Score"
        value={0.992}
        min={0}
        max={1}
        format="percent"
        decimals={1}
        locale="pt-BR"
        description="Segment average: 59.7%"
        icon={ShieldCheckIcon}
        zones={[
          { label: "Low", color: "#10b981", max: 25 },
          { label: "Moderate", color: "#f59e0b", max: 50 },
          { label: "High", color: "#f97316", max: 75 },
          { label: "Critical", color: "#ef4444", max: 100 },
        ]}
      />
      <CardStatHeatbar
        label="Risk Score"
        value={0.992}
        min={0}
        max={1}
        format="percent"
        decimals={1}
        locale="en-US"
        description="Segment average: 59.7%"
        icon={ShieldCheckIcon}
        zones={[
          { label: "Low", color: "#10b981", max: 25 },
          { label: "Moderate", color: "#f59e0b", max: 50 },
          { label: "High", color: "#f97316", max: 75 },
          { label: "Critical", color: "#ef4444", max: 100 },
        ]}
      />
    </div>
  ),
}

export const AllHeatbars: Story = {
  args: {
    label: "Heatbar",
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates four heatbar configurations — customer satisfaction, page load speed, security score, and SLA compliance.",
      },
    },
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
        value={0.987}
        min={0}
        max={1}
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
