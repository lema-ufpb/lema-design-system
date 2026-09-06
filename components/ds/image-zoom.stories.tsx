import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageZoom } from "./image-zoom"

const meta = {
  title: "Kibo/ImageZoom",
  component: ImageZoom,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageZoom>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { src: "https://picsum.photos/600/400" } }
