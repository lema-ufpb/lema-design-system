import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { HeroStats } from "./hero-stats"

const stats = [
  { label: "Customers", value: "4.2K" },
  { label: "Uptime", value: "99.9%" },
  { label: "Countries", value: 38 },
  { label: "Avg. response", value: "<20s" },
]

const meta = {
  title: "Hero/HeroStats",
  component: HeroStats,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Centered hero followed by a stats strip — composed from HeroSection and CardStat.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `kicker` | `string` | — | - |",
          "| `title` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `actions` | `React.ReactNode` | — | - |",
          "| `stats` | `HeroStatsItem[]` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    kicker: "Trusted by teams",
    title: "Ship great interfaces faster.",
    description: "Started in a single repo. Stayed there.",
    actions: <Button>Get started</Button>,
    stats,
  },
} satisfies Meta<typeof HeroStats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ThreeStats: Story = {
  args: { stats: stats.slice(0, 3) },
}
