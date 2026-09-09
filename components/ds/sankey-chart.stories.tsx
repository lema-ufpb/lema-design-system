import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SankeyChart } from "./sankey-chart"

const meta = {
  title: "Charts/SankeyChart",
  component: SankeyChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A Sankey diagram for visualizing flows between nodes.",
          "Uses a pure SVG layout engine — no external dependencies.",
          "Nodes are placed in BFS columns; links are drawn as cubic bezier curves.",
          "",
          "Best for: user journey flows, budget allocation, energy flows, traffic sources.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof SankeyChart>

export default meta
type Story = StoryObj<typeof meta>

const TRAFFIC_NODES = [
  { id: "organic", name: "Organic" },
  { id: "paid", name: "Paid Ads" },
  { id: "social", name: "Social" },
  { id: "direct", name: "Direct" },
  { id: "landing", name: "Landing Page" },
  { id: "product", name: "Product" },
  { id: "checkout", name: "Checkout" },
  { id: "converted", name: "Converted" },
  { id: "bounced", name: "Bounced" },
]

const TRAFFIC_LINKS = [
  { source: "organic", target: "landing", value: 4200 },
  { source: "paid", target: "landing", value: 3100 },
  { source: "social", target: "landing", value: 1800 },
  { source: "direct", target: "product", value: 900 },
  { source: "landing", target: "product", value: 6200 },
  { source: "landing", target: "bounced", value: 2900 },
  { source: "product", target: "checkout", value: 3800 },
  { source: "product", target: "bounced", value: 3300 },
  { source: "checkout", target: "converted", value: 2400 },
  { source: "checkout", target: "bounced", value: 1400 },
]

export const Default: Story = {
  args: {
    nodes: TRAFFIC_NODES,
    links: TRAFFIC_LINKS,
    title: "Traffic Flow",
    subtitle: "User journey from acquisition to conversion",
    height: 400,
  },
}

export const Loading: Story = {
  args: {
    nodes: [],
    links: [],
    title: "Traffic Flow",
    loading: true,
    height: 400,
  },
}

export const EmptyData: Story = {
  args: {
    nodes: [],
    links: [],
    title: "Sankey Chart",
    height: 400,
  },
}

export const BudgetAllocation: Story = {
  args: {
    nodes: [
      { id: "budget", name: "Total Budget" },
      { id: "ops", name: "Operations" },
      { id: "rnd", name: "R&D" },
      { id: "mkt", name: "Marketing" },
      { id: "infra", name: "Infrastructure" },
      { id: "salaries", name: "Salaries" },
      { id: "tools", name: "Tools" },
      { id: "campaigns", name: "Campaigns" },
    ],
    links: [
      { source: "budget", target: "ops", value: 500000 },
      { source: "budget", target: "rnd", value: 350000 },
      { source: "budget", target: "mkt", value: 200000 },
      { source: "ops", target: "infra", value: 180000 },
      { source: "ops", target: "salaries", value: 320000 },
      { source: "rnd", target: "salaries", value: 280000 },
      { source: "rnd", target: "tools", value: 70000 },
      { source: "mkt", target: "campaigns", value: 200000 },
    ],
    title: "Budget Allocation",
    subtitle: "Annual spend breakdown",
    format: "currency",
    currency: "USD",
    abbreviate: true,
    height: 380,
  },
}

export const SimpleFlow: Story = {
  args: {
    nodes: [
      { id: "a", name: "Source A" },
      { id: "b", name: "Source B" },
      { id: "middle", name: "Processing" },
      { id: "out1", name: "Output 1" },
      { id: "out2", name: "Output 2" },
    ],
    links: [
      { source: "a", target: "middle", value: 300 },
      { source: "b", target: "middle", value: 200 },
      { source: "middle", target: "out1", value: 320 },
      { source: "middle", target: "out2", value: 180 },
    ],
    title: "Simple Flow",
    height: 280,
  },
}
