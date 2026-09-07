import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BorderBeam } from "./border-beam"

const meta = {
  title: "Data Display/BorderBeam",
  component: BorderBeam,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A small glow that travels around the border of its parent via offset-path — correct at any aspect ratio, pure CSS, hidden under prefers-reduced-motion. Place inside a `relative isolate` rounded container, alongside (not wrapping) the real content.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `size` | `number` | — | /** Diameter of the beam's glow, in pixels. */ |",
          '| `tone` | `"primary" \| "violet" \| "sky"` | `"primary"` | Variant |',
          '| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: { tone: "primary", speed: "normal" },
  argTypes: {
    tone: { control: "select", options: ["primary", "violet", "sky"] },
    speed: { control: "select", options: ["slow", "normal", "fast"] },
  },
} satisfies Meta<typeof BorderBeam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative isolate w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card p-6">
      <BorderBeam {...args} />
      <p className="text-sm text-muted-foreground">
        A card with an animated border beam.
      </p>
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["primary", "violet", "sky"] as const).map((tone) => (
        <div
          key={tone}
          className="relative isolate overflow-hidden rounded-2xl border border-border bg-card p-4"
        >
          <BorderBeam tone={tone} />
          <p className="text-xs text-muted-foreground">{tone}</p>
        </div>
      ))}
    </div>
  ),
}
