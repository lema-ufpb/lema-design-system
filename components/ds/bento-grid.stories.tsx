import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { BentoGrid, BentoGridItem } from "./bento-grid"

const meta = {
  title: "Bento/BentoGrid",
  component: BentoGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An asymmetric grid layout for feature or media tiles, with configurable column/row spans per item.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `React.ReactNode` | — | - |",
          "| `description` | `React.ReactNode` | — | - |",
          "| `icon` | `React.ElementType` | — | - |",
          "| `media` | `React.ReactNode` | — | /** Background layer rendered behind the content (image, gradient, chart). */ |",
          '| `titleAs` | `"h2" \| "h3" \| "h4"` | — | /** Heading level for `title` — adjust to keep document heading order valid when the grid sits right below an `h1`/`h... |',
          "| `loading` | `boolean` | — | - |",
          '| `colSpan` | `"1" \| "2" \| "3" \| "4"` | — | Variant |',
          '| `rowSpan` | `"1" \| "2" \| "3" \| "4"` | — | Variant |',
        ].join("\n"),
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
