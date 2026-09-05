import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerApp } from "./banner-app"

const meta = {
  title: "Navigation/BannerApp",
  component: BannerApp,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    position: { control: "inline-radio", options: ["inline", "floating"] },
  },
} satisfies Meta<typeof BannerApp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appName: "LEMA App",
    description: "Get the mobile experience",
    iconSrc: "https://picsum.photos/100/100",
    rating: 4.8,
    ratingCount: "2.4k",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
}

export const WithoutRating: Story = {
  args: {
    appName: "LEMA",
    description: "Available on iOS and Android",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
}

export const Floating: Story = {
  args: {
    appName: "LEMA App",
    description: "Download now",
    rating: 4.9,
    appStoreUrl: "#",
    position: "floating",
  },
}

export const Loading: Story = { args: { appName: "App", loading: true } }
