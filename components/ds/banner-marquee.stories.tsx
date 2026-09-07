import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerMarquee } from "./banner-marquee"

const meta = {
  title: "Navigation/BannerMarquee",
  component: BannerMarquee,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BannerMarquee component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `string[]` | — | - |",
          "| `separator` | `React.ReactNode` | — | - |",
          '| `speed` | `"slow" \| "normal" \| "fast"` | — | - |',
          '| `direction` | `"left" \| "right"` | — | - |',
          "| `pauseOnHover` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `intent` | `"default" \| "promo" \| "contrast"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    intent: { control: "select", options: ["default", "promo", "contrast"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    speed: { control: "select", options: ["slow", "normal", "fast"] },
    direction: { control: "inline-radio", options: ["left", "right"] },
  },
} satisfies Meta<typeof BannerMarquee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: ["Deploy fast", "Zero config", "Edge CDN", "Global scale"] },
}

export const Promo: Story = {
  args: {
    items: ["Black Friday 30% OFF", "Limited time", "Upgrade now"],
    intent: "promo",
  },
}

export const Speeds: Story = {
  args: { items: ["Deploy fast", "Zero config", "Edge CDN"] },
  render: () => (
    <div className="flex flex-col gap-3">
      <BannerMarquee items={["Slow — 30s"]} speed="slow" />
      <BannerMarquee items={["Normal — 20s"]} speed="normal" />
      <BannerMarquee items={["Fast — 10s"]} speed="fast" />
    </div>
  ),
}
