import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NumberField } from "./number-field"

const meta = {
  title: "Form/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A NumberField component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `number` | — | - |",
          "| `defaultValue` | `number` | — | - |",
          "| `min` | `number` | — | - |",
          "| `max` | `number` | — | - |",
          "| `step` | `number` | — | - |",
          "| `onChange` | `(value: number) => void` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultValue: 5, min: 0, max: 10 } }
