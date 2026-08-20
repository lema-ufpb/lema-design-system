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
          "| `variant` | `primary` \\| `emerald` \\| `amber` \\| `rose` \\| `violet` \\| `sky` \\| `white` | `primary` | Background colour variant |",
          "| `description` | `string` | — | Secondary text below the value |",
          "| `trend` | `up` \\| `down` \\| `neutral` \\| `boolean` | — | Trend direction |",
          "| `trendValue` | `string` | — | Trend comparison text |",
          "| `icon` | `React.ElementType` | — | Icon component |",
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
      table: { defaultValue: { summary: "primary" } },
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
  },
} satisfies Meta<typeof CardStatHighlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: 2400000,
    format: "currency",
    decimals: 2,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    trend: "up",
    trendValue: "+18%",
    description: "vs last quarter",
    icon: DollarSignIcon,
    variant: "primary",
    size: "sm",
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
              value={0.964}
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
        value={0.964}
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
        value={0.018}
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

export const ColorTokens: Story = {
  name: "Color Tokens — background & color",
  args: { label: "Custom KPI", value: 12847 },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <CardStatHighlight
        label="Custom Purple"
        value={12847}
        format="integer"
        trend="up"
        trendValue="+847"
        description="new this month"
        icon={StarIcon}
        background="oklch(0.5 0.2 270)"
        color="white"
      />
      <CardStatHighlight
        label="Success Token"
        value={0.964}
        format="percent"
        decimals={1}
        trend="up"
        trendValue="+2.1pts"
        description="NPS this month"
        icon={HeartIcon}
        background="var(--color-success)"
        color="var(--color-success-foreground)"
      />
      <CardStatHighlight
        label="Warning Token"
        value={248}
        format="integer"
        trend="down"
        trendValue="−12%"
        description="processing backlog"
        icon={ShoppingCartIcon}
        background="var(--color-warning)"
        color="var(--color-warning-foreground)"
      />
      <CardStatHighlight
        label="Custom Amber"
        value={2400000}
        format="currency"
        trend="up"
        trendValue="+18%"
        description="vs last quarter"
        icon={DollarSignIcon}
        background="oklch(0.75 0.18 75)"
        color="oklch(0.2 0.05 75)"
      />
      <CardStatHighlight
        label="External Token"
        value={420000}
        format="currency"
        trend="up"
        trendValue="+12%"
        description="YTD performance"
        icon={TrendingUpIcon}
        background="var(--color-brand, oklch(0.4 0.2 240))"
        color="white"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `background` and `color` props accept any CSS color or `var(--my-token)`. They set `--card-highlight-background` and `--card-highlight-color` as CSS custom properties and apply via `bg-(--card-highlight-background)` and `text-(--card-highlight-color)` — escaping the 7-variant enum for per-instance customization.",
      },
    },
  },
}
