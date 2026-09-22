import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VideoDialog } from "./video-dialog"

const meta = {
  title: "Media/VideoDialog",
  component: VideoDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A VideoDialog component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `videoSrc` | `string` | — | - |",
          "| `thumbnailSrc` | `string` | — | - |",
          "| `thumbnailAlt` | `string` | — | - |",
          "| `title` | `string` | — | - |",
          '| `aspectRatio` | `"16` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "minimal" \| "glow"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "glow"],
    },
    aspectRatio: {
      control: "select",
      options: ["16/9", "4/3", "1/1", "21/9"],
    },
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof VideoDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "LEMA Design System Presentation",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    thumbnailAlt: "Thumbnail with elegant abstract shapes",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "default",
    aspectRatio: "16/9",
    locale: "en-US",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-6">
      <VideoDialog {...args} />
    </div>
  ),
}

export const GlowVariant: Story = {
  args: {
    title: "Component Architecture Overview",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "glow",
    aspectRatio: "16/9",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-8">
      <VideoDialog {...args} />
    </div>
  ),
}

export const MinimalVariant: Story = {
  args: {
    title: "Quick 30-second demo",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "minimal",
    aspectRatio: "16/9",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-6">
      <VideoDialog {...args} />
    </div>
  ),
}
