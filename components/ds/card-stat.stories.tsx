import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DollarSignIcon, TrendingUpIcon, UsersIcon } from "lucide-react"
import { CardStat } from "./card-stats"

const meta = {
  title: "Data Display/CardStat",
  component: CardStat,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "The original KPI card — label, formatted value, trend icon+colour, and description.",
          "Fully configurable locale, currency, and custom formatter.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | — | (required) Header label shown above the value |",
          "| `value` | `string \\| number` | — | (required) The metric value to display |",
          "| `format` | `currency` \\| `percent` \\| `integer` \\| `float` | — | Numeric formatting preset |",
          "| `decimals` | `number` | — | Number of fraction digits for numeric formats |",
          "| `locale` | `string` | `en-US` | BCP 47 locale string |",
          "| `currency` | `string` | `USD` | ISO 4217 currency code |",
          "| `abbreviate` | `boolean` | `false` | Abbreviate large numbers (locale-aware) |",
          "| `description` | `string` | — | Secondary description rendered below the value |",
          "| `trend` | `up` \\| `down` \\| `neutral` \\| `boolean` | `false` | Trend direction — `true` is shorthand for `up` |",
          "| `icon` | `React.ElementType` | — | Icon displayed in the card action slot |",
          "| `size` | `sm` \\| `md` \\| `lg` | `md` | Size preset |",
          "| `variant` | `default` \\| `muted` \\| `flat` | `default` | Card visual variant |",
          "| `loading` | `boolean` | `false` | Show skeleton placeholder while data is fetching |",
          "| `empty` | `boolean` | `false` | Show empty state when no data is available |",
          "| `valueFormatter` | `(value: number \\| string) => string` | — | Fully custom formatter — overrides format/decimals/locale/currency |",
          "| `valueClassName` | `string` | — | Extra classes merged onto the value text — use semantic tokens like `text-destructive` or `text-success` |",
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
      table: { defaultValue: { summary: "false" } },
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
    valueFormatter: { table: { disable: true } },
    valueClassName: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    variant: {
      control: "select",
      options: ["default", "muted", "flat"],
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof CardStat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Revenue",
    value: 45231.89,
    format: "currency",
    decimals: 2,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    description: "+20.1% from last month",
    trend: "up",
    icon: DollarSignIcon,
    size: "sm",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard configuration showing the CardStat component with revenue data, currency formatting, up trend, and a description.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Revenue",
    value: 0,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying four placeholder CardStat cards while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat label="Revenue" value={0} loading />
      <CardStat label="Active Users" value={0} loading />
      <CardStat label="Bounce Rate" value={0} loading />
      <CardStat label="Avg. Response" value={0} loading />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Revenue",
    value: 0,
    empty: true,
    icon: DollarSignIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing four CardStat cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat label="Revenue" value={0} empty icon={DollarSignIcon} />
      <CardStat label="Active Users" value={0} empty icon={UsersIcon} />
      <CardStat label="Bounce Rate" value={0} empty />
      <CardStat label="Avg. Response" value={0} empty />
    </div>
  ),
}

export const Locales: Story = {
  args: {
    label: "Revenue",
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates locale-aware formatting with Brazilian Portuguese (pt-BR), German (de-DE), and English (en-US) locales.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <CardStat
        label="Total Revenue"
        value={98400}
        format="currency"
        locale="pt-BR"
        currency="BRL"
        description="+12.3% vs last month"
        trend="up"
        icon={DollarSignIcon}
      />
      <CardStat
        label="Umsatz"
        value={34290}
        format="currency"
        locale="de-DE"
        currency="EUR"
        description="+8,7% gegenüber Vormonat"
        trend="up"
        icon={DollarSignIcon}
      />
      <CardStat
        label="Avg. Ticket"
        value={89.4}
        format="float"
        decimals={2}
        description="+$3.20 vs last month"
        trend="up"
      />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Revenue", value: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStat component.",
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
          <CardStat
            label="Total Revenue"
            value={45231.89}
            format="currency"
            description="+20.1% from last month"
            trend="up"
            icon={DollarSignIcon}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
}

export const ValueClassName: Story = {
  args: {
    label: "Delayed Orders",
    value: 748,
    format: "integer",
    description: "15.02% delay rate",
    icon: TrendingUpIcon,
    valueClassName: "text-destructive",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "Use `valueClassName` to apply semantic color tokens directly to the value.",
          "Common use case: highlight a KPI in `text-destructive` (red) or `text-success` (green) when it represents a negative or positive threshold.",
          "",
          "```tsx",
          '<CardStat label="Delayed Orders" value={748} valueClassName="text-destructive" />',
          '<CardStat label="Recovered" value={1204} valueClassName="text-success" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <CardStat
        label="Delayed Orders"
        value={748}
        format="integer"
        description="15.02% delay rate"
        icon={TrendingUpIcon}
        size="sm"
        valueClassName="text-destructive"
      />
      <CardStat
        label="Recovered Revenue"
        value={204941}
        format="integer"
        description="above monthly target"
        icon={DollarSignIcon}
        size="sm"
        valueClassName="text-success"
      />
      <CardStat
        label="Active Users"
        value={15309}
        format="integer"
        description="no change this week"
        icon={UsersIcon}
        size="sm"
      />
    </div>
  ),
}

export const Abbreviated: Story = {
  args: { label: "Revenue", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          "Set `abbreviate` to shorten large numbers with locale-aware suffixes.",
          "English uses T/B/M/K; Portuguese uses tri/bi/mi/mil.",
          "",
          "```tsx",
          '<CardStat label="Market Cap" value={1570000000} format="currency" abbreviate locale="en-US" currency="USD" />',
          '<CardStat label="Valor de Mercado" value={1570000000} format="currency" abbreviate locale="pt-BR" currency="BRL" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat
        label="Market Cap"
        value={1570000000}
        format="currency"
        abbreviate
        locale="en-US"
        currency="USD"
        icon={DollarSignIcon}
        description="+12.4% this quarter"
        trend="up"
      />
      <CardStat
        label="Market Cap"
        value={1570000000}
        format="currency"
        abbreviate
        locale="pt-BR"
        currency="BRL"
        icon={DollarSignIcon}
        description="+12.4% this quarter"
        trend="up"
      />
      <CardStat
        label="Total Users"
        value={2847500}
        format="integer"
        abbreviate
        locale="en-US"
        icon={UsersIcon}
        description="+843K new this month"
        trend="up"
      />
      <CardStat
        label="Total Users"
        value={2847500}
        format="integer"
        abbreviate
        locale="pt-BR"
        icon={UsersIcon}
        description="+843K new this month"
        trend="up"
      />
    </div>
  ),
}

export const AbbreviatedCompact: Story = {
  args: { label: "Label", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          "Dense grid demonstrating abbreviation across different orders of magnitude — thousands, millions, billions, trillions.",
          'All cards use `locale="en-US"` with `abbreviate` and format-specific formatting.',
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat
        label="Total Revenue"
        value={45231890}
        format="currency"
        abbreviate
        description="+12.3% vs last year"
        trend="up"
      />
      <CardStat
        label="Quarterly Profit"
        value={2100000000}
        format="currency"
        abbreviate
        description="+8.7% vs last quarter"
        trend="up"
      />
      <CardStat
        label="Page Views"
        value={8750000000}
        format="float"
        decimals={2}
        abbreviate
        description="7.2B organic"
        trend="up"
      />
      <CardStat
        label="National Debt"
        value={35700000000000}
        format="currency"
        abbreviate
        description="+2.1% this year"
        trend="up"
      />
    </div>
  ),
}

export const MutedVariant: Story = {
  args: { label: "Revenue", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          'Use `variant="muted"` for a flat card — no border, no shadow, `bg-muted` background.',
          "Ideal for embedding KPIs inside panels or cards where the outer container already provides elevation.",
          "",
          "```tsx",
          '<CardStat variant="muted" label="Revenue" value={45231.89} format="currency" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat
        variant="muted"
        label="Revenue"
        value={45231.89}
        format="currency"
        description="+20.1% from last month"
        trend="up"
        icon={DollarSignIcon}
      />
      <CardStat
        variant="muted"
        label="Active Users"
        value={15309}
        format="integer"
        description="No change this week"
        trend="neutral"
        icon={UsersIcon}
      />
      <CardStat
        variant="muted"
        label="Bounce Rate"
        value={0.084}
        format="percent"
        description="−1.3% this week"
        trend="down"
      />
      <CardStat
        variant="muted"
        label="Avg. Response"
        value={127}
        valueFormatter={(v) => `${v} ms`}
        description="−12 ms vs yesterday"
        trend="up"
      />
    </div>
  ),
}

export const FlatVariant: Story = {
  args: { label: "Revenue", value: 0 },
  parameters: {
    docs: {
      description: {
        story: [
          'Use `variant="flat"` for a borderless, shadowless card with a white background (`bg-background`).',
          "Ideal for areas where the container already has a colored background and the card needs to stand out in white.",
          "",
          "```tsx",
          '<CardStat variant="flat" label="Revenue" value={45231.89} format="currency" />',
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat
        variant="flat"
        label="Revenue"
        value={45231.89}
        format="currency"
        description="+20.1% from last month"
        trend="up"
        icon={DollarSignIcon}
      />
      <CardStat
        variant="flat"
        label="Active Users"
        value={15309}
        format="integer"
        description="No change this week"
        trend="neutral"
        icon={UsersIcon}
      />
      <CardStat
        variant="flat"
        label="Bounce Rate"
        value={0.084}
        format="percent"
        description="−1.3% this week"
        trend="down"
      />
      <CardStat
        variant="flat"
        label="Avg. Response"
        value={127}
        valueFormatter={(v) => `${v} ms`}
        description="−12 ms vs yesterday"
        trend="up"
      />
    </div>
  ),
}

export const AllTrends: Story = {
  args: {
    label: "Metric",
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all trend directions — up, down, and neutral — side by side with different metrics.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <CardStat
        label="Revenue"
        value={45231.89}
        format="currency"
        description="+20.1% from last month"
        trend="up"
        icon={DollarSignIcon}
      />
      <CardStat
        label="Bounce Rate"
        value={0.084}
        format="percent"
        description="−1.3% this week"
        trend="down"
      />
      <CardStat
        label="Active Users"
        value={15309}
        format="integer"
        description="No change this week"
        trend="neutral"
        icon={UsersIcon}
      />
      <CardStat
        label="Avg. Response Time"
        value={127}
        valueFormatter={(v) => `${v} ms`}
        description="−12 ms vs yesterday"
        trend="up"
      />
    </div>
  ),
}
