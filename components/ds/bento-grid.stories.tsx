import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { BentoGrid, BentoGridItem } from "./bento-grid"

const meta = {
  title: "Layout/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An asymmetric grid layout for feature or media tiles, with configurable column/row spans per item.",
      },
    },
  },
} satisfies Meta<typeof BentoGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BentoGrid>
      <BentoGridItem
        colSpan={2}
        rowSpan={2}
        icon={Sparkles}
        title="AI-assisted workflows"
        description="Let the assistant draft, summarize, and triage for you."
      />
      <BentoGridItem
        icon={BarChart3}
        title="Real-time insights"
        description="See how your team ships, live."
      />
      <BentoGridItem
        icon={Zap}
        title="Automation"
        description="Route work automatically."
      />
      <BentoGridItem
        colSpan={2}
        icon={ShieldCheck}
        title="Enterprise-grade security"
        description="SSO, audit logs, and granular permissions out of the box."
      />
    </BentoGrid>
  ),
}

export const AllSpans: Story = {
  render: () => (
    <BentoGrid>
      <BentoGridItem colSpan={1} title="Span 1" description="col-span-1" />
      <BentoGridItem colSpan={2} title="Span 2" description="col-span-2" />
      <BentoGridItem colSpan={3} title="Span 3" description="col-span-3" />
      <BentoGridItem colSpan={4} title="Span 4" description="col-span-4" />
    </BentoGrid>
  ),
}

export const Loading: Story = {
  render: () => (
    <BentoGrid>
      <BentoGridItem colSpan={2} rowSpan={2} loading />
      <BentoGridItem loading />
      <BentoGridItem loading />
    </BentoGrid>
  ),
}
