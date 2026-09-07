import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerApp } from "./banner-app"

const meta = {
  title: "Navigation/BannerApp",
  component: BannerApp,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BannerApp component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `appName` | `string` | — | - |",
          "| `description` | `React.ReactNode` | — | - |",
          "| `iconSrc` | `string` | — | - |",
          "| `iconAlt` | `string` | — | - |",
          "| `rating` | `number` | — | - |",
          "| `ratingCount` | `string` | — | - |",
          "| `appStoreUrl` | `string` | — | - |",
          "| `googlePlayUrl` | `string` | — | - |",
          "| `onDismiss` | `() => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
          '| `position` | `"inline" \| "floating"` | `"inline"` | Variant |',
        ].join("\n"),
      },
    },
  },
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
