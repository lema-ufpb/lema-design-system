import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GridPulse } from "./grid-pulse"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Effects/GridPulse",
  component: GridPulse,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Grid of dots that pulses in size and opacity near the cursor. Stays idle (no RAF) while the pointer is not over the container.",
          "Under `prefers-reduced-motion`, it only draws the static grid and does not listen to pointer events.",
          "Position with `absolute inset-0` behind content (`relative z-10`). Move the cursor over the area to see the effect.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "neutral"` | `"primary"` | Dot color |',
          '| `radius` | `"sm" \\| "md" \\| "lg"` | `"md"` | Grid spacing and cursor influence radius |',
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
    radius: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof GridPulse>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <GridPulse {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Hover over here</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Interactive grid that only consumes CPU while the pointer is over the
          area — idle the rest of the time.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Get started now</Button>
          <Button variant="outline">View documentation</Button>
        </div>
      </div>
    </div>
  ),
  args: { tone: "primary", radius: "md" },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(["primary", "violet", "sky", "neutral"] as const).map((tone) => (
        <div
          key={tone}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <GridPulse tone={tone} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {tone}
          </p>
        </div>
      ))}
    </div>
  ),
}

export const AllRadii: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((radius) => (
        <div
          key={radius}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <GridPulse radius={radius} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {radius}
          </p>
        </div>
      ))}
    </div>
  ),
}
