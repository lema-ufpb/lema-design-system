import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { HeroTerminal } from "./hero-terminal"

const meta = {
  title: "Blocks/HeroTerminal",
  component: HeroTerminal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Split hero with a terminal/browser preview — composed from HeroSection, BackgroundGlow and BrowserMockup.",
      },
    },
  },
  args: {
    kicker: "v2.0 is here",
    title: "Ship great interfaces faster.",
    description:
      "A design system built on shadcn/ui, ready to drop into your Next.js app.",
    actions: (
      <>
        <Button>Get started</Button>
        <Button variant="outline">View docs</Button>
      </>
    ),
    browserUrl: "https://lema.ufpb.br/app",
  },
} satisfies Meta<typeof HeroTerminal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <HeroTerminal {...args}>
      <div className="flex h-64 items-center justify-center p-6 font-mono text-sm text-zinc-400">
        $ npx shadcn add ds-hero-terminal
      </div>
    </HeroTerminal>
  ),
}

export const VioletGlow: Story = {
  args: { glowTone: "violet", browserVariant: "default" },
  render: (args) => (
    <HeroTerminal {...args}>
      <div className="flex h-64 items-center justify-center p-6 text-sm text-muted-foreground">
        Preview content
      </div>
    </HeroTerminal>
  ),
}
