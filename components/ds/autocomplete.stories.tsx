import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Autocomplete } from "./autocomplete"

const meta = {
  title: "Form/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Autocomplete component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `options` | `AutocompleteOption[]` | — | - |",
          "| `value` | `string` | — | - |",
          "| `onValueChange` | `(value: string) => void` | — | - |",
          "| `placeholder` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ],
  },
}
