import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  DollarSignIcon,
  UsersIcon,
  ShoppingCartIcon,
  ActivityIcon,
} from "lucide-react"
import { CardStatCompact } from "./card-stats"

const meta = {
  title: "Data Display/CardStatCompact",
  component: CardStatCompact,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Horizontal single-row card with icon, label, value, and trend badge.",
          "Great for dense header bars or small sidebar widgets.",
          "The icon background colour matches the trend — green for up, red for down, neutral grey otherwise.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | — | (required) Metric label |",
          "| `value` | `string \\| number` | — | (required) Metric value |",
          "| `format` | `currency` \\| `percent` \\| `integer` \\| `float` | — | Numeric formatting preset |",
          "| `decimals` | `number` | — | Number of fraction digits |",
          "| `locale` | `string` | `en-US` | BCP 47 locale string |",
          "| `currency` | `string` | `USD` | ISO 4217 currency code |",
          "| `abbreviate` | `boolean` | `false` | Abbreviate large numbers (locale-aware) |",
          "| `valueFormatter` | `(value: number \\| string) => string` | — | Overrides format/decimals/locale/currency |",
          "| `trend` | `up` \\| `down` \\| `neutral` \\| `boolean` | — | Trend direction |",
          "| `trendValue` | `string` | — | Trend comparison text |",
          "| `icon` | `React.ElementType` | — | Icon component |",
          "| `size` | `sm` \\| `md` \\| `lg` | `md` | Size preset |",
          "| `variant` | `default` \\| `muted` \\| `flat` | `default` | Card visual variant |",
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
    trend: {
      control: "select",
      options: ["up", "down", "neutral", true, false],
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
    trendValue: {
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
    variant: {
      control: "inline-radio",
      options: ["default", "muted", "flat"],
      table: { defaultValue: { summary: "default" } },
    },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStatCompact>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: 124500,
    format: "currency",
    decimals: 2,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    trend: "up",
    trendValue: "+26.8%",
    icon: DollarSignIcon,
    size: "md",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard horizontal compact card showing total revenue with currency value and trend badge.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Total Revenue",
    value: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying four CardStatCompact placeholders while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatCompact label="Total Revenue" value={0} loading />
      <CardStatCompact label="Active Users" value={0} loading />
      <CardStatCompact label="Orders" value={0} loading />
      <CardStatCompact label="Churn Rate" value={0} loading />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Total Revenue",
    value: 0,
    empty: true,
    icon: DollarSignIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing four compact cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatCompact
        label="Total Revenue"
        value={0}
        empty
        icon={DollarSignIcon}
      />
      <CardStatCompact label="Active Users" value={0} empty icon={UsersIcon} />
      <CardStatCompact label="Orders" value={0} empty icon={ShoppingCartIcon} />
      <CardStatCompact label="Churn Rate" value={0} empty icon={ActivityIcon} />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Metric", value: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatCompact component with multiple metrics.",
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
            <CardStatCompact
              label="Total Revenue"
              value={124500}
              format="currency"
              trend="up"
              trendValue="+26.8%"
              icon={DollarSignIcon}
              size={size}
            />
            <CardStatCompact
              label="Active Users"
              value={57891}
              format="integer"
              trend="up"
              trendValue="+12.4%"
              icon={UsersIcon}
              size={size}
            />
            <CardStatCompact
              label="Orders"
              value={1847}
              format="integer"
              trend="neutral"
              trendValue="0.0%"
              icon={ShoppingCartIcon}
              size={size}
            />
            <CardStatCompact
              label="Churn Rate"
              value={2.4}
              format="percent"
              decimals={1}
              trend="down"
              trendValue="-0.8%"
              icon={ActivityIcon}
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const MutedVariant: Story = {
  args: { label: "Metric", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          'Use `variant="muted"` para card sem borda, sem sombra e fundo `bg-muted`.',
          "",
          "```tsx",
          '<CardStatCompact variant="muted" label="Revenue" value={124500} format="currency" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatCompact
        variant="muted"
        label="Total Revenue"
        value={124500}
        format="currency"
        trend="up"
        trendValue="+26.8%"
        icon={DollarSignIcon}
      />
      <CardStatCompact
        variant="muted"
        label="Active Users"
        value={57891}
        format="integer"
        trend="up"
        trendValue="+12.4%"
        icon={UsersIcon}
      />
      <CardStatCompact
        variant="muted"
        label="Orders"
        value={1847}
        format="integer"
        trend="neutral"
        trendValue="0.0%"
        icon={ShoppingCartIcon}
      />
      <CardStatCompact
        variant="muted"
        label="Churn Rate"
        value={2.4}
        format="percent"
        decimals={1}
        trend="down"
        trendValue="-0.8%"
        icon={ActivityIcon}
      />
    </div>
  ),
}

export const FlatVariant: Story = {
  args: { label: "Metric", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          'Use `variant="flat"` para card sem borda, sem sombra e fundo branco (`bg-background`).',
          "",
          "```tsx",
          '<CardStatCompact variant="flat" label="Revenue" value={124500} format="currency" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatCompact
        variant="flat"
        label="Total Revenue"
        value={124500}
        format="currency"
        trend="up"
        trendValue="+26.8%"
        icon={DollarSignIcon}
      />
      <CardStatCompact
        variant="flat"
        label="Active Users"
        value={57891}
        format="integer"
        trend="up"
        trendValue="+12.4%"
        icon={UsersIcon}
      />
      <CardStatCompact
        variant="flat"
        label="Orders"
        value={1847}
        format="integer"
        trend="neutral"
        trendValue="0.0%"
        icon={ShoppingCartIcon}
      />
      <CardStatCompact
        variant="flat"
        label="Churn Rate"
        value={2.4}
        format="percent"
        decimals={1}
        trend="down"
        trendValue="-0.8%"
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
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all available variant configurations side by side — revenue, users, orders, and churn rate.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <CardStatCompact
        label="Total Revenue"
        value={124500}
        format="currency"
        trend="up"
        trendValue="+26.8%"
        icon={DollarSignIcon}
      />
      <CardStatCompact
        label="Active Users"
        value={57891}
        format="integer"
        trend="up"
        trendValue="+12.4%"
        icon={UsersIcon}
      />
      <CardStatCompact
        label="Orders"
        value={1847}
        format="integer"
        trend="neutral"
        trendValue="0.0%"
        icon={ShoppingCartIcon}
      />
      <CardStatCompact
        label="Churn Rate"
        value={2.4}
        format="percent"
        decimals={1}
        trend="down"
        trendValue="-0.8%"
        icon={ActivityIcon}
      />
    </div>
  ),
}
