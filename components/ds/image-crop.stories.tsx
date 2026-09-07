import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageCrop } from "./image-crop"

const meta = {
  title: "Media/ImageCrop",
  component: ImageCrop,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ImageCrop component for the LEMA Design System.",
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
          "| `onZoomChange` | `(zoom: number) => void` | — | - |",
          "| `onCrop` | `(data: { x: number` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ImageCrop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { src: "https://picsum.photos/600/400" } }
