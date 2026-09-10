import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageZoom } from "./image-zoom"

const meta = {
  title: "Media/ImageZoom",
  component: ImageZoom,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ImageZoom component for the LEMA Design System.",
          "Supports loading state.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `src` | `string` | — | - |",
          "| `alt` | `string` | — | - |",
          "| `zoom` | `number` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ImageZoom>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { src: "https://picsum.photos/600/400", alt: "Demo zoom image" },
}
