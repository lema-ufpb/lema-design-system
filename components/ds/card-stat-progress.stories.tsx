import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DollarSignIcon, UsersIcon, ShoppingCartIcon } from "lucide-react"
import { CardStatProgress } from "./card-stats"

const meta = {
  title: "Data Display/CardStatProgress",
  component: CardStatProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Value displayed against a goal with a colour-coded progress bar.",
          "Bar and percentage text shift from muted → amber → sky → emerald as the value crosses 50 / 75 / 100% of the goal.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | — | (required) Metric label |",
          "| `value` | `number` | — | (required) Current value |",
          "| `goal` | `number` | — | (required) Target goal value |",
          "| `format` | `currency` \\| `percent` \\| `integer` \\| `float` | — | Numeric formatting preset |",
          "| `decimals` | `number` | — | Number of fraction digits |",
          "| `locale` | `string` | `en-US` | BCP 47 locale string |",
          "| `currency` | `string` | `USD` | ISO 4217 currency code |",
          "| `abbreviate` | `boolean` | `false` | Abbreviate large numbers (locale-aware) |",
          "| `valueFormatter` | `(value: number \\| string) => string` | — | Overrides format/decimals/locale/currency |",
          "| `description` | `string` | — | Secondary text below the value |",
          "| `showPercent` | `boolean` | `true` | Show percentage completion |",
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
    goal: { control: "number", table: { defaultValue: { summary: "—" } } },
    description: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    showPercent: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
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
} satisfies Meta<typeof CardStatProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Monthly Orders",
    value: 1284,
    goal: 2000,
    format: "integer",
    decimals: 0,
    locale: "en-US",
    currency: "USD",
    abbreviate: false,
    description: "Target by end of month",
    icon: ShoppingCartIcon,
    size: "sm",
    showPercent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard progress card showing monthly orders at 1,284 out of a 2,000 goal with a color-coded progress bar.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    label: "Monthly Orders",
    value: 0,
    goal: 100,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton state displaying three CardStatProgress placeholders while data is being fetched.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={0}
        goal={100}
        loading
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={0}
        goal={100}
        loading
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={0}
        goal={100}
        loading
        icon={UsersIcon}
      />
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    label: "Monthly Orders",
    value: 0,
    goal: 100,
    empty: true,
    icon: ShoppingCartIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state showing three progress cards with dash placeholders when no data is available.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={0}
        goal={100}
        empty
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={0}
        goal={100}
        empty
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={0}
        goal={100}
        empty
        icon={UsersIcon}
      />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { label: "Goal", value: 0, goal: 100 },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison across sm, md, and lg size presets for the CardStatProgress component with orders, revenue, and customer goals.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">{`size="${size}"`}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <CardStatProgress
              label="Monthly Orders"
              value={1284}
              goal={2000}
              format="integer"
              description="Target by end of month"
              icon={ShoppingCartIcon}
              size={size}
            />
            <CardStatProgress
              label="Revenue Goal"
              value={87500}
              goal={100000}
              format="currency"
              description="Q4 quarterly target"
              icon={DollarSignIcon}
              size={size}
            />
            <CardStatProgress
              label="New Customers"
              value={314}
              goal={500}
              format="integer"
              description="Acquisition campaign"
              icon={UsersIcon}
              size={size}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllGoals: Story = {
  args: {
    label: "Goal",
    value: 0,
    goal: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates three goal progress scenarios — monthly orders at 64%, revenue at 87%, and new customers at 63%.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CardStatProgress
        label="Monthly Orders"
        value={1284}
        goal={2000}
        format="integer"
        description="Target by end of month"
        icon={ShoppingCartIcon}
      />
      <CardStatProgress
        label="Revenue Goal"
        value={87500}
        goal={100000}
        format="currency"
        description="Q4 quarterly target"
        icon={DollarSignIcon}
      />
      <CardStatProgress
        label="New Customers"
        value={314}
        goal={500}
        format="integer"
        description="Acquisition campaign"
        icon={UsersIcon}
      />
    </div>
  ),
}
