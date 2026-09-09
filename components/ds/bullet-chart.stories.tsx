import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BulletChart, BulletChartGroup } from "./bullet-chart"

const meta = {
  title: "Charts/BulletChart",
  component: BulletChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A compact bullet chart for comparing a metric against a target and qualitative ranges.",
          "Space-efficient — ideal for dense KPI dashboards.",
          "",
          "Background bands use semantic risk tokens (`bg-risk-1..4`).",
          "The value bar uses `bg-primary`; the target is a vertical tick mark.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
    format: {
      control: "inline-radio",
      options: [undefined, "currency", "percent", "integer", "float"],
    },
  },
} satisfies Meta<typeof BulletChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Revenue",
    value: 72000,
    target: 85000,
    ranges: [40000, 65000, 85000],
    max: 100000,
    format: "currency",
    currency: "USD",
    abbreviate: true,
  },
}

export const AllSizes: Story = {
  args: {
    label: "Metric",
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <BulletChart
          key={size}
          label={`Size ${size}`}
          value={68}
          target={80}
          ranges={[30, 60, 80]}
          max={100}
          size={size}
          format="percent"
          valueFormatter={(v) => `${v}%`}
        />
      ))}
    </div>
  ),
}

export const Loading: Story = {
  args: {
    label: "Loading…",
    value: 0,
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {["sm", "md", "lg"].map((size) => (
        <BulletChart
          key={size}
          label="Loading…"
          value={0}
          size={size as "sm" | "md" | "lg"}
          loading
        />
      ))}
    </div>
  ),
}

export const NoRanges: Story = {
  args: {
    label: "Conversion",
    value: 3.2,
    target: 5,
    max: 8,
    valueFormatter: (v) => `${v.toFixed(1)}%`,
  },
}

export const Group: Story = {
  args: {
    label: "Revenue",
    value: 72000,
  },
  render: () => (
    <BulletChartGroup
      items={[
        {
          label: "Revenue",
          value: 72000,
          target: 85000,
          ranges: [40000, 60000, 80000],
          max: 100000,
          format: "currency",
          currency: "USD",
          abbreviate: true,
        },
        {
          label: "Deals Closed",
          value: 42,
          target: 50,
          ranges: [20, 35, 50],
          max: 60,
          format: "integer",
        },
        {
          label: "NPS Score",
          value: 67,
          target: 75,
          ranges: [30, 55, 75],
          max: 100,
          format: "integer",
        },
        {
          label: "Churn Rate",
          value: 3.1,
          target: 2.5,
          max: 10,
          valueFormatter: (v) => `${v.toFixed(1)}%`,
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Use `BulletChartGroup` to stack multiple metrics efficiently.",
      },
    },
  },
}

export const Locales: Story = {
  args: {
    label: "Locales",
    value: 72000,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <BulletChart
          key={locale}
          label={locale}
          value={72000}
          target={85000}
          ranges={[40000, 60000, 80000]}
          max={100000}
          format="currency"
          currency="USD"
          abbreviate
          locale={locale}
        />
      ))}
    </div>
  ),
}
