import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DollarSignIcon, UsersIcon } from "lucide-react"
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
          "## Props",
          "",
          "| Prop | Type | Description |",
          "| --- | --- | --- |",
          "| `label` | `string` | Header label shown above the value |",
          "| `value` | `string \\| number` | The metric value to display |",
          '| `format` | `"currency" \\| "percent" \\| "integer" \\| "float"` | Numeric formatting preset |',
          "| `decimals` | `number` | Number of fraction digits for numeric formats |",
          '| `locale` | `string` | BCP 47 locale string (default: `"en-US"`) |',
          '| `currency` | `string` | ISO 4217 currency code when `format="currency"` (default: `"USD"`) |',
          "| `description` | `string` | Secondary description rendered below the value |",
          '| `trend` | `"up" \\| "down" \\| "neutral" \\| boolean` | Trend direction — `true` is shorthand for `"up"` |',
          "| `icon` | `React.ElementType` | Icon displayed in the card action slot |",
          "| `loading` | `boolean` | Show skeleton placeholder while data is fetching |",
          "| `empty` | `boolean` | Show empty state when no data is available |",
          "| `valueFormatter` | `(value: number \\| string) => string` | Fully custom formatter — overrides `format`, `decimals`, `locale`, and `currency` |",
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
    locale: { control: "text" },
    currency: { control: "text" },
    label: { control: "text" },
    value: { control: "number" },
    description: { control: "text" },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    icon: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CardStat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Revenue",
    value: 45231.89,
    format: "currency",
    description: "+20.1% from last month",
    trend: "up",
    icon: DollarSignIcon,
  },
}

export const Loading: Story = {
  args: {
    label: "Revenue",
    value: 0,
    loading: true,
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
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <CardStat
        label="Receita Total"
        value={98400}
        format="currency"
        locale="pt-BR"
        currency="BRL"
        description="+12,3% em relação ao mês anterior"
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

export const AllTrends: Story = {
  args: {
    label: "Metric",
    value: 0,
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
        value={8.4}
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
