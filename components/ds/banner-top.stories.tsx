import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerTop } from "./banner-top"

const meta = {
  title: "Navigation/BannerTop",
  component: BannerTop,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "info", "success", "promo"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof BannerTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    badge: "New",
    title: "v1.2 shipped",
    description: "Explore headers and banners.",
    action: { label: "Read more", href: "#" },
  },
}

export const Promo: Story = {
  args: {
    title: "Summer sale",
    description: "30% off all plans",
    intent: "promo",
    action: { label: "Upgrade" },
  },
}

export const Dismissible: Story = {
  args: {
    title: "Maintenance",
    description: "Scheduled down-time 02:00 UTC",
    intent: "warning",
    dismissible: true,
  },
}
