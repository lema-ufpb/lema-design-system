import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { HeroVideo } from "./hero-video"

const meta = {
  title: "Hero/HeroVideo",
  component: HeroVideo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Centered hero with a video thumbnail that opens in a dialog — composed from HeroSection and VideoDialog.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `kicker` | `string` | — | - |",
          "| `title` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `actions` | `React.ReactNode` | — | - |",
          "| `videoSrc` | `string` | — | - |",
          "| `thumbnailSrc` | `string` | — | - |",
          "| `videoTitle` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    kicker: "See it in action",
    title: "Watch how it works.",
    description: "A two-minute tour of the design system in a real app.",
    actions: <Button>Get started</Button>,
    thumbnailSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    videoTitle: "LEMA Design System Presentation",
    locale: "en-US" as const,
  },
} satisfies Meta<typeof HeroVideo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutActions: Story = {
  args: { actions: undefined },
}
