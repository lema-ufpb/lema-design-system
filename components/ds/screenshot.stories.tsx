import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Screenshot } from "./screenshot"

const meta: Meta<typeof Screenshot> = {
  title: "Media/Screenshot",
  component: Screenshot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    rounded: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
    },
    shadow: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    aspect: {
      control: "inline-radio",
      options: ["auto", "video", "square", "4/3"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Screenshot>

export const Default: Story = {
  args: {
    src: "https://picsum.photos/seed/screenshot-light/1200/800",
    srcDark: "https://picsum.photos/seed/screenshot-dark/1200/800",
    alt: "Dashboard screenshot",
    width: 1200,
    height: 800,
  },
}

export const LightOnly: Story = {
  args: {
    src: "https://picsum.photos/seed/light-only/1200/800",
    alt: "App screenshot light only",
  },
}

export const Mobile: Story = {
  args: {
    src: "https://picsum.photos/seed/mobile-light/400/800",
    srcDark: "https://picsum.photos/seed/mobile-dark/400/800",
    alt: "Mobile app",
    width: 400,
    height: 800,
    aspect: "auto",
    rounded: "2xl",
  },
  render: (args) => (
    <div className="w-64">
      <Screenshot {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: { src: "", alt: "", loadingState: true, width: 800, height: 600 },
}
