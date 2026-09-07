import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerPromo } from "./banner-promo"

const meta = {
  title: "Navigation/BannerPromo",
  component: BannerPromo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BannerPromo component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `React.ReactNode` | — | - |",
          "| `imageSrc` | `string` | — | - |",
          "| `imageAlt` | `string` | — | - |",
          '| `intent` | `"default" \| "promo" \| "info" \| "success" \| "warning"` | `"promo"` | - |',
          "| `primaryAction` | `{ label: string` | — | - |",
          "| `secondaryAction` | `{ label: string` | — | - |",
          "| `dismissible` | `boolean` | — | - |",
          "| `onDismiss` | `() => void` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "promo", "info", "success", "warning"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof BannerPromo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Ship faster with LEMA DS",
    description:
      "Drop in headers, banners and more — ship in hours, not weeks.",
    primaryAction: { label: "Get access" },
    secondaryAction: { label: "Learn more" },
  },
}

export const WithImage: Story = {
  args: {
    title: "Design without limits",
    description: "A new way to build landing pages with blockus.",
    imageSrc: "https://picsum.photos/600/400",
    primaryAction: { label: "Explore" },
  },
}

export const Loading: Story = { args: { title: "Loading", loading: true } }
