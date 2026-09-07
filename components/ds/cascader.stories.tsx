import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Cascader } from "./cascader"

const meta = {
  title: "Form/Cascader",
  component: Cascader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Cascader component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `options` | `CascaderOption[]` | — | - |",
          "| `value` | `string[]` | — | - |",
          "| `onValueChange` | `(value: string[]) => void` | — | - |",
          "| `placeholder` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Cascader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      {
        label: "Brazil",
        value: "br",
        children: [
          { label: "SP", value: "sp" },
          { label: "RJ", value: "rj" },
        ],
      },
      { label: "USA", value: "us", children: [{ label: "NY", value: "ny" }] },
    ],
  },
}
