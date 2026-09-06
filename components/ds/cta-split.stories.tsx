import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CtaSplit } from "./cta-split"

const meta = {
  title: "Blocks/CtaSplit",
  component: CtaSplit,
  tags: ["autodocs"],
} satisfies Meta<typeof CtaSplit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Ship in hours",
    description: "A new way to build pages.",
    imageSrc: "https://picsum.photos/600/600",
    primaryAction: { label: "Get started" },
    secondaryAction: { label: "Learn more" },
  },
}

export const Reverse: Story = {
  args: {
    title: "Reverse layout",
    description: "Image on the right.",
    imageSrc: "https://picsum.photos/600/600",
    reverse: true,
    primaryAction: { label: "Explore" },
  },
}

export const WithoutImage: Story = {
  args: {
    title: "No image CTA",
    description: "Falls back to single column.",
    primaryAction: { label: "Contact" },
  },
}
