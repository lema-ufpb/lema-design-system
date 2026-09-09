import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { Confetti, useConfetti, type ConfettiVariant } from "./confetti"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Feedback/Confetti",
  component: Confetti,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Triggers a confetti animation on user events.",
          "Supports 4 preset variants: `burst`, `fireworks`, `rain`, and `sides`.",
          "",
          "Two usage patterns:",
          "1. **`<Confetti trigger>`** — declarative wrapper, fires when `trigger` changes to `true`",
          "2. **`useConfetti()`** — imperative hook, call `fire(variant)` directly",
          "",
          "Canvas-confetti is lazy-loaded via dynamic import — zero impact on initial bundle.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["burst", "fireworks", "rain", "sides"],
    },
  },
} satisfies Meta<typeof Confetti>

export default meta
type Story = StoryObj<typeof meta>

// ── Hook usage (recommended) ───────────────────────────────────────────────

export const WithHook: Story = {
  render: () => {
    const { fire } = useConfetti()
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">Click a button to fire</p>
        <div className="flex flex-wrap justify-center gap-2">
          {(["burst", "fireworks", "rain", "sides"] as ConfettiVariant[]).map(
            (v) => (
              <Button key={v} onClick={() => fire(v)} variant="outline">
                🎉 {v}
              </Button>
            )
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Use the `useConfetti()` hook for programmatic control.",
      },
    },
  },
}

// ── Declarative wrapper ────────────────────────────────────────────────────

export const Declarative: Story = {
  render: () => {
    const [trigger, setTrigger] = React.useState(false)
    return (
      <Confetti
        trigger={trigger}
        variant="burst"
        onAnimationEnd={() => setTrigger(false)}
      >
        <Button
          onClick={() => {
            setTrigger(false)
            requestAnimationFrame(() => setTrigger(true))
          }}
        >
          🎊 Celebrate!
        </Button>
      </Confetti>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Wrap a child element with `<Confetti trigger={bool}>` — fires when `trigger` flips to `true`.",
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => {
    const { fire } = useConfetti()
    return (
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => fire("burst")}>
          🎉 Burst
        </Button>
        <Button variant="outline" onClick={() => fire("fireworks")}>
          🎆 Fireworks (2s)
        </Button>
        <Button variant="outline" onClick={() => fire("rain")}>
          🌧️ Rain
        </Button>
        <Button variant="outline" onClick={() => fire("sides")}>
          🎊 Sides
        </Button>
      </div>
    )
  },
}

export const CustomColors: Story = {
  render: () => {
    const { fire } = useConfetti()
    return (
      <Button
        onClick={() =>
          fire("burst", {
            colors: ["#6366f1", "#8b5cf6", "#a78bfa"],
            particleCount: 120,
            spread: 90,
          })
        }
      >
        💜 LEMA Colors
      </Button>
    )
  },
}
