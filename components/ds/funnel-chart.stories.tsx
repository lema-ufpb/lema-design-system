import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FunnelChart } from "./funnel-chart"

const meta = {
  title: "Charts/FunnelChart",
  component: FunnelChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A funnel chart for visualizing conversion rates between sequential stages.",
          "Bars are centered and decrease in width proportionally to the value drop.",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `FunnelStage[]` | — | (required) Array of funnel stages |",
          "| `title` | `string` | — | Card title |",
          "| `subtitle` | `string` | — | Card subtitle |",
          "| `height` | `number` | `300` | Chart height in px |",
          "| `showLabels` | `boolean` | `true` | Show value labels on bars |",
          "| `showPercentage` | `boolean` | `true` | Show conversion rate between stages |",
          "| `format` | `FormatPreset` | — | Number format preset |",
          "| `loading` | `boolean` | `false` | Loading skeleton state |",
          "| `locale` | `UILocale` | `en-US` | Display locale |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
    format: {
      control: "inline-radio",
      options: [undefined, "currency", "percent", "integer", "float"],
    },
  },
} satisfies Meta<typeof FunnelChart>

export default meta
type Story = StoryObj<typeof meta>

const MARKETING_DATA = [
  { name: "Visitors", value: 12400 },
  { name: "Leads", value: 7200 },
  { name: "Qualified", value: 3800 },
  { name: "Proposal", value: 1600 },
  { name: "Closed", value: 480 },
]

export const Default: Story = {
  args: {
    data: MARKETING_DATA,
    title: "Marketing Funnel",
    subtitle: "Q3 2026 conversion pipeline",
    showLabels: true,
    showPercentage: true,
    height: 320,
  },
}

export const WithCurrency: Story = {
  args: {
    data: [
      { name: "Pipeline", value: 2500000 },
      { name: "Qualified", value: 1800000 },
      { name: "Proposal", value: 900000 },
      { name: "Negotiation", value: 400000 },
      { name: "Won", value: 180000 },
    ],
    title: "Revenue Funnel",
    subtitle: "Quarterly revenue pipeline",
    format: "currency",
    currency: "USD",
    abbreviate: true,
    height: 320,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    title: "Marketing Funnel",
    subtitle: "Loading conversion data…",
    loading: true,
    height: 320,
  },
}

export const EmptyData: Story = {
  args: {
    data: [],
    title: "Marketing Funnel",
    height: 320,
  },
}

export const NoLabels: Story = {
  args: {
    data: MARKETING_DATA,
    title: "Clean Funnel",
    showLabels: false,
    showPercentage: false,
    height: 320,
  },
}

export const Locales: Story = {
  args: {
    data: MARKETING_DATA,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <FunnelChart
          key={locale}
          data={MARKETING_DATA}
          title={locale}
          locale={locale}
          height={240}
        />
      ))}
    </div>
  ),
}

export const ThreeStages: Story = {
  args: {
    data: [
      { name: "Awareness", value: 50000 },
      { name: "Interest", value: 18000 },
      { name: "Purchase", value: 4200 },
    ],
    title: "Sales Funnel",
    subtitle: "3-stage simplified view",
    height: 240,
  },
}

export const CustomColors: Story = {
  args: {
    data: [
      { name: "Impressions", value: 100000, color: "var(--color-violet-500)" },
      { name: "Clicks", value: 32000, color: "var(--color-indigo-500)" },
      { name: "Signups", value: 8400, color: "var(--color-blue-500)" },
      { name: "Active", value: 3100, color: "var(--color-cyan-500)" },
    ],
    title: "Product Adoption",
    height: 280,
  },
}
