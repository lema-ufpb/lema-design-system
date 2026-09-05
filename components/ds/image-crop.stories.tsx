import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageCrop } from "./image-crop"

const meta = {
  title: "Kibo/ImageCrop",
  component: ImageCrop,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCrop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { src: "https://picsum.photos/600/400" } }
