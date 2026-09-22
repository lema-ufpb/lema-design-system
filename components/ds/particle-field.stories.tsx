import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ParticleField } from "./particle-field"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Effects/ParticleField",
  component: ParticleField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Constellation background (particles connected by lines) for hero sections, rendered on 2D canvas.",
          "Pauses via `IntersectionObserver` out of viewport and via `visibilitychange` when tab is hidden; DPR capped at 2x; becomes static frame under `prefers-reduced-motion`.",
          "Position with `absolute inset-0` behind content (`relative z-10`).",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "neutral"` | `"primary"` | Particle and line color |',
          '| `density` | `"sm" \\| "md" \\| "lg"` | `"md"` | Max particles and connection distance |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "violet", "sky", "neutral"],
    },
    density: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof ParticleField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <ParticleField {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Connect dots, build products
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Particle network light enough to run behind any hero
          without janking scroll.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get started now</Button>
          <Button variant="outline">View documentation</Button>
        </div>
      </div>
    </div>
  ),
  args: { tone: "primary", density: "md" },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(["primary", "violet", "sky", "neutral"] as const).map((tone) => (
        <div
          key={tone}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <ParticleField tone={tone} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {tone}
          </p>
        </div>
      ))}
    </div>
  ),
}

export const AllDensities: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((density) => (
        <div
          key={density}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <ParticleField density={density} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {density}
          </p>
        </div>
      ))}
    </div>
  ),
}
