import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MeteorShower } from "./meteor-shower"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Effects/MeteorShower",
  component: MeteorShower,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "100% CSS meteor shower for hero backgrounds — no canvas, no RAF, no `use client`. Positions generated deterministically (no hydration mismatch).",
          "`motion-reduce:hidden` removes meteors under `prefers-reduced-motion`.",
          "Position with `absolute inset-0` behind content (`relative z-10`).",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "neutral"` | `"primary"` | Meteor color |',
          '| `density` | `"sm" \\| "md" \\| "lg"` | `"md"` | Number of simultaneous meteors |',
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
} satisfies Meta<typeof MeteorShower>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 p-8 text-white">
      <MeteorShower {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Launches in free fall
        </h2>
        <p className="mt-3 text-sm text-white/70">
          Pure CSS effect, virtually no CPU cost — ideal for high-traffic
          heroes.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get started now</Button>
          <Button
            variant="outline"
            className="bg-white text-zinc-900 hover:bg-white/90"
          >
            View documentation
          </Button>
        </div>
      </div>
    </div>
  ),
  args: { tone: "sky", density: "md" },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(["primary", "violet", "sky", "neutral"] as const).map((tone) => (
        <div
          key={tone}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <MeteorShower tone={tone} />
          <p className="relative z-10 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
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
          <MeteorShower density={density} />
          <p className="relative z-10 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
            {density}
          </p>
        </div>
      ))}
    </div>
  ),
}
