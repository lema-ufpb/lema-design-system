import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FeatureSticky } from "./feature-sticky"

const meta: Meta<typeof FeatureSticky> = {
  title: "Layout/FeatureSticky",
  component: FeatureSticky,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FeatureSticky component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `badge` | `string` | — | - |",
          "| `heading` | `string` | — | - |",
          "| `subheading` | `string` | — | - |",
          "| `items` | `FeatureStickyItem[]` | — | - |",
          "| `media` | `React.ReactNode` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `sticky` | `"left" \| "right"` | `"left"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    sticky: { control: "inline-radio", options: ["left", "right"] },
  },
}

export default meta
type Story = StoryObj<typeof FeatureSticky>

export const Left: Story = {
  args: { sticky: "left" },
}

export const Right: Story = {
  args: { sticky: "right" },
}

export const Loading: Story = {
  args: { loading: true },
}
