import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Glow } from "./glow"

const meta: Meta<typeof Glow> = {
  title: "Utilities/Glow",
  component: Glow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Glow component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `color` | `string` | — | - |",
          "| `size` | `number` | — | - |",
          '| `position` | `"top" \| "above" \| "center" \| "below"` | `"top"` | Variant |',
          '| `intensity` | `"subtle" \| "medium" \| "strong"` | `"medium"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    position: {
      control: "inline-radio",
      options: [
        "top",
        "above",
        "above-inner",
        "center",
        "bottom-inner",
        "below",
      ],
    },
    intensity: {
      control: "inline-radio",
      options: ["subtle", "medium", "strong"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Glow>

export const Top: Story = {
  render: (args) => (
    <div className="relative h-64 overflow-hidden border bg-background">
      <Glow {...args} />
      <p className="relative p-6 text-sm">Glow top — atrás do conteúdo</p>
    </div>
  ),
  args: { position: "top" },
}

export const Center: Story = {
  render: (args) => (
    <div className="relative h-64 overflow-hidden border bg-background">
      <Glow {...args} />
      <p className="relative p-6 text-sm">Glow center</p>
    </div>
  ),
  args: { position: "center" },
}

export const AllPositions: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {(["top", "above", "center", "bottom-inner", "below"] as const).map(
        (p) => (
          <div
            key={p}
            className="relative h-40 overflow-hidden rounded-xl border bg-background"
          >
            <Glow position={p} size={360} />
            <span className="relative p-3 text-xs font-medium">{p}</span>
          </div>
        )
      )}
    </div>
  ),
}
