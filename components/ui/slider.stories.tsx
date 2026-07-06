import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Slider } from "./slider"

const meta = {
  title: "Shadcn UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A range input control for selecting a value or range of values within a defined minimum and maximum.",
          "",
          "Built on Radix Slider. Supports single-value and range (multi-thumb) selection. Accepts `min`, `max`, `defaultValue`, `value`, and `step` props via Radix. The component automatically infers the number of thumbs from the value array.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Track background** | `--input` / `--input/90` | Background of the slider track |",
          "| **Range fill** | `--primary` | Active range color between thumbs |",
          "| **Thumb background** | `--white` | Knob/draggable thumb fill color |",
          "| **Thumb hover/focus** | `--ring` / `--ring/30` | Ring visible on hover and keyboard focus |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    "aria-label": "Slider value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-thumb slider at value 50 within a 0–100 range for selecting one value.",
      },
    },
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    min: 0,
    step: 1,
    "aria-label": "Range slider",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dual-thumb slider with values at 25 and 75 for selecting a range between two points.",
      },
    },
  },
}

export const WithSteps: Story = {
  args: {
    defaultValue: [2],
    max: 10,
    min: 0,
    step: 2,
    "aria-label": "Slider with steps",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [40],
    max: 100,
    min: 0,
    disabled: true,
    "aria-label": "Disabled slider",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-thumb slider at value 40 in a disabled state, preventing user interaction.",
      },
    },
  },
}
