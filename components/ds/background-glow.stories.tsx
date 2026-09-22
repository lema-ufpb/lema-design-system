import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BackgroundGlow } from "./background-glow"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Data Display/BackgroundGlow",
  component: BackgroundGlow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BackgroundGlow component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `"aurora" \| "spotlight" \| "beam"` | `"aurora"` | Variant |',
          '| `tone` | `"primary" \| "violet" \| "sky" \| "neutral"` | `"primary"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["aurora", "spotlight", "beam", "grid-dots"],
    },
    tone: {
      control: "select",
      options: ["primary", "violet", "sky", "neutral"],
    },
  },
} satisfies Meta<typeof BackgroundGlow>

export default meta
type Story = StoryObj<typeof meta>

export const AuroraDefault: Story = {
  render: (args) => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Soft Aurora Effect
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Soft organic diffused lighting positioned at the top to enrich
          contrast and focus of the hero.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get Started Now</Button>
          <Button variant="outline">Documentation</Button>
        </div>
      </div>
    </div>
  ),
}

export const Spotlight: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="spotlight" tone="violet" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Spotlight Beam
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Conical directional focus bringing a sense of depth and elegance
          to the product.
        </p>
      </div>
    </div>
  ),
}

export const GridDots: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="grid-dots" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Technological Grid Mesh
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Mathematically precise texture radially attenuated at the edges.
        </p>
      </div>
    </div>
  ),
}

export const Beam: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="beam" tone="sky" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Linear Light Axis
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Ethereal central line to guide the eye through the visual flow.
        </p>
      </div>
    </div>
  ),
}
