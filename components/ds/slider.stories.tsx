import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Slider } from "./slider"

const meta = {
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A slider built on the Radix `Slider` primitive with optional tooltips, step marks, custom formatting, range selection, and loading state.",
          "",
          "## Props",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `orientation` | `"horizontal" \\| "vertical"` | `"horizontal"` | Layout direction |',
          "| `min` | `number` | `0` | Minimum value |",
          "| `max` | `number` | `100` | Maximum value |",
          "| `step` | `number` | `1` | Step increment |",
          "| `showTooltip` | `boolean` | `false` | Shows a tooltip on the thumb |",
          "| `showMarks` | `boolean` | `false` | Shows min/mid/max marks |",
          "| `loading` | `boolean` | `false` | Shows skeleton placeholders |",
          "| `disabled` | `boolean` | `false` | Disables the slider |",
          "| `label` | `string` | — | Label above the slider |",
          "| `formatValue` | `(value: number) => string` | — | Custom value formatter |",
          "| `marks` | `SliderMark[]` | — | Custom marks array |",
          "",
          "---",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showMarks: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    min: {
      control: "number",
      table: { defaultValue: { summary: "0" } },
    },
    max: {
      control: "number",
      table: { defaultValue: { summary: "100" } },
    },
    step: {
      control: "number",
      table: { defaultValue: { summary: "1" } },
    },
    marks: { table: { disable: true } },
    formatValue: { table: { disable: true } },
    label: { control: "text" },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    showTooltip: false,
    showMarks: false,
    loading: false,
    orientation: "horizontal",
  },
}

export const Range: Story = {
  args: {
    defaultValue: [30, 70],
    min: 0,
    max: 100,
  },
}

export const WithMarks: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    showMarks: true,
  },
}

export const CustomMarks: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 100,
    marks: [
      { value: 0, label: "0%" },
      { value: 25, label: "25%" },
      { value: 50, label: "50%" },
      { value: 75, label: "75%" },
      { value: 100, label: "100%" },
    ],
  },
}

export const WithTooltip: Story = {
  args: {
    defaultValue: [60],
    min: 0,
    max: 100,
    showTooltip: true,
  },
}

export const Vertical: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    orientation: "vertical",
    showMarks: true,
  },
}

export const VerticalRange: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    orientation: "vertical",
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    label: "Volume",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [45],
    min: 0,
    max: 100,
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {
    defaultValue: [75],
    min: 0,
    max: 100,
    label: "Volume",
    showTooltip: true,
  },
}

export const PriceRange: Story = {
  args: {
    defaultValue: [50, 200],
    min: 0,
    max: 500,
    step: 10,
    label: "Price range",
    showTooltip: true,
    formatValue: (v) => `$${v}`,
  },
}
