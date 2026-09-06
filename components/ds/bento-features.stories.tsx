import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { BentoFeatures } from "./bento-features"

const features = [
  {
    icon: Sparkles,
    title: "AI-assisted workflows",
    description: "Let the assistant draft, summarize, and triage for you.",
    colSpan: 2 as const,
    rowSpan: 2 as const,
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Route work automatically based on rules.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "SSO, audit logs, granular permissions.",
  },
  {
    icon: BarChart3,
    title: "Insights",
    description: "See how your team ships, live.",
    colSpan: 2 as const,
  },
]

const stats = [
  { label: "Customers", value: "4.2K" },
  { label: "Uptime", value: "99.9%" },
]

const meta = {
  title: "Blocks/BentoFeatures",
  component: BentoFeatures,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A bento grid mixing icon-led feature tiles with stat tiles — composed from BentoGrid and CardStat.",
      },
    },
  },
  args: { features, stats },
} satisfies Meta<typeof BentoFeatures>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutStats: Story = {
  args: { stats: [] },
}
