import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { ImageGallery, type ImageGalleryItem } from "./image-gallery"
import { Lightbox } from "./lightbox"

const photoIds = [
  "1517245386807-bb43f82c33c4",
  "1518770660439-4636190af475",
  "1522071820081-009f0129c71c",
  "1531482615713-2afd69097998",
  "1534528741775-53994a69daeb",
  "1550745165-9bc0b252726f",
  "1581091226825-a6a2a5aee158",
  "1618005182384-a83a8bd57fbe",
]

function photoUrl(id: string, w = 800) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`
}

const items: ImageGalleryItem[] = photoIds.map((id, index) => ({
  src: photoUrl(id),
  alt: `Photo ${index + 1}`,
}))

const meta = {
  title: "Gallery/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A flexible image gallery — grid, masonry (CSS columns) or a horizontal scroll-snap row — with an optional bottom-scrim caption/overlay per item.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `ImageGalleryItem[]` | — | - |",
          '| `aspect` | `"square" \| "video" \| "portrait" \| "auto"` | — | - |',
          "| `loading` | `boolean` | — | - |",
          "| `skeletonCount` | `number` | — | /** Number of skeleton tiles shown while loading. */ |",
          '| `layout` | `"grid" \| "masonry" \| "row"` | `"grid"` | Variant |',
          '| `columns` | `"2" \| "3" \| "4"` | — | Variant |',
          '| `interactive` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
  },
  args: { items },
  argTypes: {
    layout: { control: "select", options: ["grid", "masonry", "row"] },
    columns: { control: "select", options: [2, 3, 4] },
    aspect: {
      control: "select",
      options: ["square", "video", "portrait", "auto"],
    },
  },
} satisfies Meta<typeof ImageGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Masonry: Story = {
  args: { layout: "masonry", aspect: "auto" },
}

export const Row: Story = {
  args: { layout: "row", aspect: "video" },
}

export const WithCaptions: Story = {
  args: {
    items: items.map((item, index) => ({
      ...item,
      caption: `Caption for photo ${index + 1}`,
    })),
  },
}

export const FourColumns: Story = {
  args: { columns: 4 },
}

export const Loading: Story = {
  args: { loading: true, skeletonCount: 6 },
}

export const WithLightbox: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    return (
      <>
        <ImageGallery
          {...args}
          items={items.map((item, i) => ({
            ...item,
            onClick: () => {
              setIndex(i)
              setOpen(true)
            },
          }))}
        />
        <Lightbox
          images={items}
          index={index}
          open={open}
          onOpenChange={setOpen}
          onIndexChange={setIndex}
        />
      </>
    )
  },
}
