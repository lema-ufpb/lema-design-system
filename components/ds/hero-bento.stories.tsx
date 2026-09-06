import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "./bento-grid"
import { HeroBento } from "./hero-bento"

const meta = {
  title: "Blocks/HeroBento",
  component: HeroBento,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Centered hero followed by a bento grid — composed from HeroSection and BentoGrid.",
      },
    },
  },
  args: {
    kicker: "Everything you need",
    title: "One platform, every workflow.",
    description: "Built to ship, not to demo.",
    actions: <Button>Get started</Button>,
    children: null,
  },
} satisfies Meta<typeof HeroBento>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <HeroBento {...args}>
      <BentoGrid>
        <BentoGridItem
          colSpan={2}
          rowSpan={2}
          icon={Sparkles}
          title="AI-assisted workflows"
          description="Let the assistant draft, summarize, and triage for you."
          titleAs="h2"
        />
        <BentoGridItem icon={BarChart3} title="Insights" titleAs="h2" />
        <BentoGridItem icon={Zap} title="Automation" titleAs="h2" />
        <BentoGridItem
          colSpan={2}
          icon={ShieldCheck}
          title="Security"
          titleAs="h2"
        />
      </BentoGrid>
    </HeroBento>
  ),
}
