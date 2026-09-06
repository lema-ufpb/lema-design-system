import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScrollReveal } from "./scroll-reveal"

const meta = {
  title: "Data Display/ScrollReveal",
  component: ScrollReveal,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Fades/slides children in the first time they enter the viewport via IntersectionObserver. Renders fully visible up front under prefers-reduced-motion. Scroll the canvas to see the effect trigger.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["up", "down", "left", "right", "none"],
    },
  },
} satisfies Meta<typeof ScrollReveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="h-64 shrink-0 rounded-2xl border border-dashed border-border" />
      <ScrollReveal
        {...args}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <p className="text-sm text-muted-foreground">
          Scroll down — I fade/slide in when I enter the viewport.
        </p>
      </ScrollReveal>
    </div>
  ),
}

export const AllDirections: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="h-64 shrink-0 rounded-2xl border border-dashed border-border" />
      <div className="grid grid-cols-2 gap-4">
        {(["up", "down", "left", "right"] as const).map((direction) => (
          <ScrollReveal
            key={direction}
            direction={direction}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground">{direction}</p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  ),
}
