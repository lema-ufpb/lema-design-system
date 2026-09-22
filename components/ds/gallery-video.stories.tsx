import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GalleryVideo } from "./gallery-video"

const thumbnails = [
  "1517245386807-bb43f82c33c4",
  "1518770660439-4636190af475",
  "1522071820081-009f0129c71c",
]

const items = thumbnails.map((id, index) => ({
  videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  thumbnailSrc: `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`,
  title: `Demo video ${index + 1}`,
}))

const meta = {
  title: "Gallery/GalleryVideo",
  component: GalleryVideo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A grid of video tiles, each opening its clip in a dialog on click — composed from VideoDialog.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `GalleryVideoItem[]` | — | - |",
          "| `columns` | `2 \| 3 \| 4` | — | - |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: { items, locale: "en-US" as const },
} satisfies Meta<typeof GalleryVideo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const TwoColumns: Story = {
  args: { columns: 2 },
}
